'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Icon, Avatar, colors, normalize } from 'react-native-elements';
import LocaleStrings from '../../resource/localeStrings';
import { formatLicense } from './trainingDetail';

// I had to fix the flex directives on iOS
// I'm keeping the old android code as is with xxxOnly guards
// but maybe they can be removed after testing the iOS settings on android.
function only(platform, val) {
    return Platform.OS === platform ? val : undefined;
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: only('ios', 'space-between'),
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: '#ffffff',
    },
    leftSide: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        flex: only('android', 1),
        flexDirection: 'row',
    },
    avatarCheck: {
        flexDirection: only('android', 'row'),
    },
    title: {
        fontSize: normalize(14),
        color: colors.grey1,
    },
    subtitle: {
        color: colors.grey3,
        fontSize: normalize(12),
        marginTop: 1,
        ...Platform.select({
            ios: {
                fontWeight: '600',
            },
            android: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
            },
        }),
    },
    titleSubtitleContainer: {
        marginLeft: 10,
        justifyContent: 'center',
        flex: only('android', 1),
    },
    detailCheck: {
        borderLeftColor: '#cccccc',
        borderLeftWidth: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 15,
        marginRight: 15,
    },
});

class TrainingRow extends Component {
    onShowDetail = () => {
        this.props.onShowDetail(this.props.index);
    };
    onCheckPress = () => {
        this.props.onCheckPress(this.props.index);
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.present != this.props.present || nextProps.playerLicense != this.props.playerLicense) {
            return true;
        }
        return false;
    }
    render() {
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        return (
            <View style={styles.row}>
                <Touchable onPress={this.onCheckPress}>
                    <View style={styles.leftSide}>
                        <View style={styles.avatarCheck} width={34} height={34}>
                            <Icon
                                size={34}
                                color="#2196F3"
                                name={this.props.present ? 'check-box' : 'check-box-outline-blank'}
                            />
                            {this.props.picture && (
                                <Avatar rounded={true} source={{ uri: this.props.picture.thumbnail }} />
                            )}
                        </View>
                        <View style={styles.titleSubtitleContainer}>
                            <View>
                                <Text style={styles.title}>{this.props.playerName.toUpperCase()}</Text>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>
                                    {LocaleStrings.training_license.toUpperCase() +
                                        ' ' +
                                        formatLicense(this.props.playerLicense)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Touchable>
                <Touchable onPress={this.onShowDetail}>
                    <View style={styles.detailCheck} width={64}>
                        <Icon size={34} name="chevron-right" />
                    </View>
                </Touchable>
            </View>
        );
    }
}

export default class TrainingList extends Component {
    dirty = 0;
    renderItem = item => {
        let player = item.item;
        return (
            <TrainingRow
                index={item.index}
                playerName={player.playerName}
                present={player.present}
                playerLicense={player.playerLicense}
                picture={player.picture}
                onShowDetail={this.props.onPlayerShowDetail}
                onCheckPress={this.props.onPlayerCheckPress}
            />
        );
    };
    _keyExtractor = item => {
        return item.playerLicense;
    };
    render() {
        return (
            <FlatList
                data={this.props.players}
                extraData={{
                    dirty: ++this.dirty,
                }}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderItem}
            />
        );
    }
}

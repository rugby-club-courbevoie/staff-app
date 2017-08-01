import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableNativeFeedback, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Icon, Avatar, colors, normalize } from 'react-native-elements';
import LocaleStrings from '../../resource/localeStrings';

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: '#ffffff'
    },
    avatarCheck: {
        flexDirection: 'row',
    },
    checkbox: {
        width: 24,
        height: 24,
        marginRight: 5,
        color: '#2196F3'
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
        flex: 1,
    }
})
let index = 1;
class TrainingRow extends Component {
    onRowPress = () => {
        this.props.onShowDetail(this.props.player, this.props.index);
    }
    onCheckPress = (player) => {
        this.props.onCheckPress(this.props.player, this.props.index);
    }
    render() {
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        return <TouchableWithoutFeedback onPress={this.onRowPress}>
            <View style={styles.row}>
                <Touchable onPress={this.onCheckPress}>
                    <View style={styles.avatarCheck}>
                        <Icon size={24}
                            color="#2196F3"
                            name={this.props.player.present ? "check-box" : "check-box-outline-blank"} />
                        {this.props.player.picture && <Avatar
                            rounded={true}
                            source={{ uri: this.props.player.picture.thumbnail }}
                        />}
                    </View>
                </Touchable>
                <View style={styles.titleSubtitleContainer}>
                    <View>
                        <Text style={styles.title}>{this.props.player.playerName.toUpperCase()}</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>{LocaleStrings.training_license.toUpperCase() + " " + this.props.player.playerLicense}</Text>
                    </View>
                </View>
                <Icon
                    size={28}
                    name='chevron-right'
                />
            </View>
        </TouchableWithoutFeedback>;
    }
}

export default class TrainingList extends Component {
    renderItem = (item) => {
        return <TrainingRow
            player={item.item}
            index={index++}
            onShowDetail={this.props.onPlayerShowDetail}
            onCheckPress={this.props.onPlayerCheckPress} />;
    }
    render() {
        return <FlatList
            data={this.props.players}
            keyExtractor={(player, index) => index} //item.playerLicense
            renderItem={this.renderItem} />;
    }
}
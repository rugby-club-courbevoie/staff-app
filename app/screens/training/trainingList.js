"use strict";
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
    },
    detailCheck: {
        marginRight: 15
    }
})

class TrainingRow extends Component {
    onShowDetail = () => {
        this.props.onShowDetail(this.props.index);
    }
    onCheckPress = () => {
        this.props.onCheckPress(this.props.index);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if ((nextProps.present != this.props.present) || (nextProps.playerLicense != this.props.playerLicense)) {
            return true;
        }
        return false;
    }
    render() {
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        return <View style={styles.row}>
            <TouchableWithoutFeedback onPress={this.onCheckPress}>
                <View style={styles.avatarCheck} width={34} height={34}>
                    <Icon size={34}
                        color="#2196F3"
                        name={this.props.present ? "check-box" : "check-box-outline-blank"} />
                    {this.props.picture && <Avatar
                        rounded={true}
                        source={{ uri: this.props.picture.thumbnail }}
                    />}
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.titleSubtitleContainer}>
                <View>
                    <Text style={styles.title}>{this.props.playerName.toUpperCase()}</Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>{LocaleStrings.training_license.toUpperCase() + " " + this.props.playerLicense}</Text>
                </View>
            </View>
            <Touchable onPress={this.onShowDetail}>
                <View style={styles.detailCheck} width={44}>
                    <Icon
                        size={34}
                        name='chevron-right'
                    />
                </View>
            </Touchable>
        </View>;
    }
}

export default class TrainingList extends Component {
    dirty = 0;
    renderItem = (item) => {
        let player = item.item;
        return <TrainingRow
            index={item.index}
            playerName={player.playerName}
            present={player.present}
            playerLicense={player.playerLicense}
            picture={player.picture}
            onShowDetail={this.props.onPlayerShowDetail}
            onCheckPress={this.props.onPlayerCheckPress} />;
    }
    _keyExtractor = (item) => {
        return item.playerLicense;
    }
    render() {
        return <FlatList
            data={this.props.players}
            extraData={{
                dirty: ++this.dirty
            }}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem} />;
    }
}
"use strict";
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export class Diagnose extends Component {
    render() {
        return <View style={styles.diagView}>
            <Icon name='error' color='#FFF' style={styles.diagIcon} size={32} /><Text style={styles.diagText}>{this.props.message}</Text>
        </View>;
    }
}

export class LoadingMessage extends Component {
    render() {
        return <View style={styles.info}>
            <Icon name='hourglass-full' color='#03a9f4' style={styles.infoIcon} /><Text style={styles.infoText}>{this.props.message}</Text>
        </View>;
    }
}


const styles = StyleSheet.create({
    diagView: {
        backgroundColor: "#C12127",
        padding: 20,
        flexDirection: "row",
        alignItems: 'center'
    },
    diagIcon: {
        marginLeft: 20
    },
    diagText: {
        flex: 1,
        marginLeft: 10,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 1,
        color: '#FFF',
        fontSize: 18
    },
    info: {
        backgroundColor: "#FFF",
        padding: 20,
        flexDirection: "row",
        alignItems: 'center'
    },
    infoIcon: {
        marginLeft: 20
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 1,
        color: '#03a9f4',
        fontSize: 12,
    },
});
'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const diagnoseTypes = {
    error: {
        view: {
            backgroundColor: '#C12127',
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
        },
        icon: {
            name: 'error',
            color: '#FFF',
            style: {
                marginLeft: 20,
            },
        },
        text: {
            flex: 1,
            marginLeft: 10,
            marginRight: 20,
            marginTop: 5,
            marginBottom: 1,
            color: '#FFF',
            fontSize: 18,
        },
    },
    info: {
        view: {
            backgroundColor: '#FFF',
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
        },
        icon: {
            name: 'info',
            color: '#03a9f4',
            style: {
                marginLeft: 20,
            },
        },
        text: {
            flex: 1,
            marginLeft: 10,
            marginRight: 20,
            marginTop: 5,
            marginBottom: 1,
            color: '#03a9f4',
            fontSize: 18,
        },
    },
};

export class Diagnose extends Component {
    render() {
        let config = diagnoseTypes[this.props.severity || 'error'];
        return (
            <View style={config.view}>
                <Icon name={config.icon.name} color={config.icon.color} style={config.icon.style} size={32} />
                <Text style={config.text}>{this.props.message}</Text>
            </View>
        );
    }
}

export class LoadingMessage extends Component {
    render() {
        return (
            <View style={styles.info}>
                <Icon name="hourglass-full" color="#03a9f4" style={styles.infoIcon} />
                <Text style={styles.infoText}>{this.props.message}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    info: {
        backgroundColor: '#FFF',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIcon: {
        marginLeft: 20,
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

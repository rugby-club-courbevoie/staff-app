'use strict';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default class MatchCheck extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={{ margin: 10, fontSize: 18, fontWeight: 'bold' }}>Pointage des matchs</Text>
                <Text style={{ margin: 10, fontSize: 12 }}>Fonction non implémentée</Text>
            </SafeAreaView>
        );
    }
}

'use strict';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default class PlayerSelect extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={{ margin: 10, fontSize: 22, fontWeight: 'bold' }}>Selection des joueurs</Text>
                <Text style={{ margin: 10, fontSize: 18 }}>Fonction non implémentée</Text>
            </SafeAreaView>
        );
    }
}

'use strict';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import * as css from '../../resource/styles';

export default class NavHeader extends Component {
    render() {
        return (
            <View style={css.header.container}>
                <Icon name={this.props.icon} color={css.colors.text_light} />
                <Text style={css.header.text}>{this.props.title}</Text>
                <Image style={css.header.logo} source={require('../../resource/logo.png')} />
            </View>
        );
    }
}

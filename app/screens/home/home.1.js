"use strict";
import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import LocaleStrings from '../../resource/localeStrings';
import * as LoginController from '../login/loginController';

export default class Home extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: LocaleStrings.home_title,
    });
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (!LoginController.credential) {
            this.props.navigation.navigate('Login');
        }
    }
    render() {
        if (LoginController.credential) {
            const list = [
                {
                    name: 'Amy Farha',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    subtitle: 'Vice President'
                },
                {
                    name: 'Chris Jackson',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    subtitle: 'Vice Chairman'
                }];
            return < List containerStyle={{ marginBottom: 20 }
            }>
                {
                    list.map((l, i) => (
                        <ListItem
                            roundAvatar
                            avatar={{ uri: l.avatar_url }}
                            key={i}
                            title={l.name}
                        />
                    ))
                }
            </List >
        }
        else {
            return <View/>;
        }
    }
}
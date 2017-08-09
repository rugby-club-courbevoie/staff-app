"use strict";
import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import LocaleStrings from '../../resource/localeStrings';
import * as SettingsController from '../common/settingsController';
import { View } from 'react-native';

const screens = [
    {
        title: LocaleStrings.training_title,
        route: "Training",
        icon: "school"
    },
    {
        title: LocaleStrings.training_title + " old",
        route: "TrainingOld",
        icon: "school"
    },
    {
        title: LocaleStrings.playerSelect_title,
        route: "PlayerSelect",
        icon: "assignment-ind"
    }, {
        title: LocaleStrings.matchCheck_title,
        route: "MatchCheck",
        icon: "assignment-turned-in"
    },/* {
        title: LocaleStrings.contacts_title,
        route: "ContactsRoute",
        icon: "group"
    }*/];

export default class Home extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: LocaleStrings.home_title,
    });
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (!SettingsController.authenticated()) {
            this.props.navigation.navigate('Login');
        }
    }
    onGoTo(screen) {
        this.props.navigation.navigate(screen.route);
    }
    render() {
        if (SettingsController.authenticated()) {
            return < List containerStyle={{ marginBottom: 20 }}>
                {
                    screens.map((item) =>
                        <ListItem
                            key={item.route}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                            onPress={() => this.onGoTo(item)}
                        />
                    )}
            </List >
        }
        else {
            return <View />;
        }
    }
}

"use strict";
import React, { Component } from 'react';
import * as LoginController from './loginController';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import LoginForm from '../login/loginForm';
import LocaleStrings from '../../resource/localeStrings';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credential: LoginController.credential
        };
    }
    onAuthenticate = (credential) => {
        this.setState({
            credential: credential
        });
        credential && this.props.navigation.navigate('HomeRoute');
    }
    onLogout = () => {
        LoginController.reset();
        this.onAuthenticate(null);
    }
    render() {
        if (this.state.credential) {
            return <View>
                <Text>{this.state.credential.email}</Text>
                <Text>{this.state.credential.password}</Text>
                <Button
                    onPress={this.onLogout}
                    raised
                    icon={{ name: 'done', size: 32 }}
                    buttonStyle={{ backgroundColor: '#03a9f4' }}
                    textStyle={{ textAlign: 'center' }}
                    title={LocaleStrings.login_disconnection}
                />
            </View>;
        }
        return <LoginForm onAuthenticate={this.onAuthenticate} />;
    }
}
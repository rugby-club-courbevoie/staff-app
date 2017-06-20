"use strict";
import React, { Component } from 'react';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import LocaleStrings from '../../resource/localeStrings';
import * as LoginController from './loginController';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            init: false,
            error: "",
            email: "",
            password: ""
        };
    }
    componentDidMount() {
        LoginController.read((credential) => {
            if (credential) {
                this.props.onAuthenticate(credential);
            }
            else {
                this.setState({
                    init: true
                });
            }
        });
    }
    onSubmit(event) {
        let credential = {
            email: this.state.email,
            password: this.state.password,
        };
        let error = "";
        if (!credential.email) {
            error += LocaleStrings.login_email_error + "\n";
        }
        if (!credential.password) {
            error += LocaleStrings.login_password_error;
        }
        if (error) {
            this.setState({
                error: error
            });
        }
        else {
            LoginController.save(credential);
            this.props.onAuthenticate(credential);
        }
        event.preventDefault();
    }
    render() {
        if (this.state.init) {
            return <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <FormInput
                            placeholder={LocaleStrings.login_email}
                            autoCapitalize='none'
                            autoCorrect={false}
                            autoFocus={true}
                            keyboardType='email-address'
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        <FormInput
                            placeholder={LocaleStrings.login_password}
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                        <FormValidationMessage>{this.state.error}</FormValidationMessage>
                        <Button
                            onPress={(e) => this.onSubmit(e)}
                            raised
                            buttonStyle={{ backgroundColor: '#03a9f4' }}
                            textStyle={{ textAlign: 'center' }}
                            title={LocaleStrings.login_ok}
                        />
                    </View>
                </View>
            </View>;
        }
        return <View><Text>{LocaleStrings.login_read}</Text></View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    form: {
        justifyContent: "flex-start"
    }
});
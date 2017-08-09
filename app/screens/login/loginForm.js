"use strict";
import React, { Component } from 'react';
import { Button, FormLabel, FormInput, FormValidationMessage, Icon } from 'react-native-elements';
import LocaleStrings from '../../resource/localeStrings';
import * as SettingsController from '../common/settingsController';
import { StyleSheet, Text, View } from 'react-native';
import * as Request from '../common/request';
import { LoadingMessage } from '../common/diagnose';

const mode_debug = true;

const DEFAULT_SERVER = "http://54.213.132.224";
const DEFAULT_EMAIL = mode_debug ? "daniel.coz@sage.com" : "";
const DEFAULT_PASSWORD = mode_debug ? "RCC-92200" : "";
const DEFAULT_COACH = mode_debug ? "2001091046249" : "";


export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
        if (mode_debug) {
            SettingsController.write(this.initState());
        }
        this.state.init = false;
        this.state.error = "";
    }
    initState() {
        let settings = SettingsController.settings;
        let state = {
            email: (settings && settings.email) || DEFAULT_EMAIL,
            password: (settings && settings.password) || DEFAULT_PASSWORD,
            confirmPassword: DEFAULT_PASSWORD,
            server: (settings && settings.server) || DEFAULT_SERVER,
            coachLicense: (settings && settings.coachLicense) || DEFAULT_COACH
        }
        return state;
    }
    componentDidMount() {
        if (!this.state.init) {
            SettingsController.read((settings) => {
                if (SettingsController.authenticated()) {
                    this.onAuthenticate();
                }
                else {
                    let state = this.initState();
                    state.init = true;
                    this.setState(state);
                }
            });
        }
    }
    onSubmit(event) {
        let settings = {
            server: this.state.server,
            email: this.state.email,
            password: this.state.password,
        };
        let error = "";
        if (!settings.server) {
            error += LocaleStrings.login_server_error + "\n";
        }
        if (!settings.email) {
            error += LocaleStrings.login_email_error + "\n";
        }
        if (!settings.password) {
            error += LocaleStrings.login_password_error;
        }
        else {
            if (settings.password != this.state.confirmPassword) {
                error += LocaleStrings.login_confirm_password_error;
            }
        }
        if (error) {
            this.setState({
                error: error
            });
        }
        else {
            this.save(settings);
        }
        event.preventDefault();
    }
    onAuthenticate() {
        Request.setSettings(SettingsController.settings);
        this.props.navigation.navigate('HomeRoute');
    }
    save(newsettings) {
        this.setState({
            authenticationRequested: true,
            error: ""
        });
        Request.setSettings(newsettings);
        Request.post("/changePassword", undefined, (result, error) => {
            let errorMessage = error && error.message;
            if (errorMessage) {
                this.setState({
                    authenticationRequested: false,
                    error: errorMessage
                });
            }
            else {
                newsettings.coachLicense = result.license;
                SettingsController.write(newsettings);
                this.onAuthenticate();
            }
        });
    }
    renderMessage() {
        if (this.state.authenticationRequested || !this.state.init) {
            return <LoadingMessage message={LocaleStrings.login_validation}/>;
        }
        else {
            return <FormValidationMessage>{this.state.error}</FormValidationMessage>;
        }
    }
    render() {
        if (this.state.init) {
            return <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Rugby Club Courbevoie</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <FormLabel>{LocaleStrings.login_server}</FormLabel>
                        <FormInput
                            disabled={this.state.authenticationRequested}
                            autoCapitalize='none'
                            autoCorrect={false}
                            autoFocus={true}
                            keyboardType='email-address'
                            value={this.state.server}
                            onChangeText={(text) => this.setState({ server: text })}
                        />
                        <FormLabel>{LocaleStrings.login_email}</FormLabel>
                        <FormInput
                            disabled={this.state.authenticationRequested}
                            autoCapitalize='none'
                            autoCorrect={false}
                            autoFocus={true}
                            keyboardType='email-address'
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        <FormLabel>{LocaleStrings.login_password}</FormLabel>
                        <FormInput
                            disabled={this.state.authenticationRequested}
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                        <FormLabel>{LocaleStrings.login_confirm_password}</FormLabel>
                        <FormInput
                            disabled={this.state.authenticationRequested}
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            value={this.state.confirmPassword}
                            onChangeText={(text) => this.setState({ confirmPassword: text })}
                        />
                        {this.renderMessage()}
                        <Button
                            onPress={(e) => this.onSubmit(e)}
                            disabled={this.state.authenticationRequested}
                            raised
                            buttonStyle={styles.button}
                            textStyle={{ textAlign: 'center' }}
                            title={LocaleStrings.login_ok}
                        />
                    </View>
                </View>
            </View>;
        }
        return this.renderMessage();
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
    },
    title: {
    },
    titleText: {
        margin: 20,
        color: '#03a9f4',
        fontWeight: "bold",
        fontSize: 22,
        textAlign: "center"
    },
    info: {
        flexDirection: "row"
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
    button: {
        backgroundColor: '#03a9f4',
        marginTop: 20
    }
});
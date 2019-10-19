'use strict';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button, Input, Icon } from 'react-native-elements';
import LocaleStrings from '../../resource/localeStrings';
import { rccConfig } from '../common/config';
import * as Request from '../common/request';
import { LoadingMessage } from '../common/diagnose';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.buildState(rccConfig.authenticated);
    }
    buildState(init) {
        let state = {
            init: init,
            error: '',
            email: rccConfig.email,
            password: rccConfig.password,
            confirmPassword: rccConfig.modeDebug ? rccConfig.password : '',
            server: rccConfig.server,
            coachLicense: rccConfig.coachLicense,
        };
        return state;
    }
    componentDidMount() {
        if (!this.state.init) {
            rccConfig.read(() => {
                if (rccConfig.authenticated) {
                    this.onAuthenticate();
                } else {
                    this.setState(this.buildState(true));
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
        let error = '';
        if (!settings.server) {
            error += LocaleStrings.login_server_error + '\n';
        }
        if (!settings.email) {
            error += LocaleStrings.login_email_error + '\n';
        }
        if (!settings.password) {
            error += LocaleStrings.login_password_error;
        } else {
            if (settings.password != this.state.confirmPassword) {
                error += LocaleStrings.login_confirm_password_error;
            }
        }
        if (error) {
            this.setState({
                error: error,
            });
        } else {
            this.save(settings);
        }
        event.preventDefault();
    }
    onCancel() {
        this.props.navigation.navigate('HomeRoute');
    }
    onAuthenticate() {
        Request.setSettings(rccConfig);
        this.props.navigation.navigate('HomeRoute');
    }
    save(data) {
        this.setState({
            authenticationRequested: true,
            error: '',
        });
        Request.setSettings(data);
        Request.post('/changePassword', undefined, (result, error) => {
            let errorMessage = error && error.message;
            if (errorMessage) {
                this.setState({
                    authenticationRequested: false,
                    error: errorMessage,
                });
            } else {
                rccConfig.server = data.server;
                rccConfig.email = data.email;
                rccConfig.password = data.password;
                rccConfig.coachLicense = result.license;
                rccConfig.write();
                this.onAuthenticate();
            }
        });
    }
    renderMessage() {
        if (this.state.authenticationRequested || !this.state.init) {
            return <LoadingMessage message={LocaleStrings.login_validation} />;
        } else {
            return <Text color="red">{this.state.error}</Text>;
        }
    }
    renderButtons() {
        let ok = (
            <Button
                raised
                onPress={e => this.onSubmit(e)}
                disabled={this.state.authenticationRequested}
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="#03a9f4"
                color="#FFF"
                title={(rccConfig.authenticated ? LocaleStrings.login_ok : LocaleStrings.login_logon).toUpperCase()}
            />
        );
        let cancel = rccConfig.authenticated && (
            <Button
                raised
                onPress={e => this.onCancel(e)}
                disabled={this.state.authenticationRequested}
                buttonStyle={{ marginTop: 20, marginBottom: 20 }}
                borderColor="#03a9f4"
                backgroundColor="#FFF"
                color="#03a9f4"
                title={LocaleStrings.login_cancel.toUpperCase()}
            />
        );
        return (
            <View>
                {ok}
                {cancel}
            </View>
        );
    }
    render() {
        if (this.state.init) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.title}>
                        <Image style={styles.titleLogo} source={require('../../resource/logo.png')} />
                        <Text style={styles.titleText}>Rugby Club Courbevoie</Text>
                    </View>

                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.content}>
                            <View>
                                <Input
                                    label={LocaleStrings.login_email}
                                    disabled={this.state.authenticationRequested}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoFocus={true}
                                    keyboardType="email-address"
                                    value={this.state.email}
                                    onChangeText={text => this.setState({ email: text })}
                                />
                                <Input
                                    label={LocaleStrings.login_password}
                                    disabled={this.state.authenticationRequested}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={text => this.setState({ password: text })}
                                />
                                <Input
                                    label={LocaleStrings.login_confirm_password}
                                    disabled={this.state.authenticationRequested}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    value={this.state.confirmPassword}
                                    onChangeText={text => this.setState({ confirmPassword: text })}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    {this.renderMessage()}
                    {this.renderButtons()}
                </SafeAreaView>
            );
        }
        return this.renderMessage();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    form: {
        justifyContent: 'flex-start',
    },
    title: {
        flexDirection: 'row',
    },
    titleLogo: {
        margin: 8,
        width: 48,
        height: 48,
        resizeMode: 'contain',
        borderRadius: 24,
        borderWidth: 1,
    },
    titleText: {
        margin: 20,
        color: '#03a9f4',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
    },
    info: {
        flexDirection: 'row',
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

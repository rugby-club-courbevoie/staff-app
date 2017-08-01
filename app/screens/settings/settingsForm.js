"use strict";
import React, { Component } from 'react';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import LocaleStrings from '../../resource/localeStrings';
import { StyleSheet, Text, View } from 'react-native';
import * as SettingsController from './settingsController';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            server: ""
        };
    }
    componentDidMount() {
        SettingsController.read((settings) => {
            this.setState({
                server: settings.server
            });
        });
    }
    onSubmit(event) {
        event.preventDefault();
        let settings = {
            server: this.state.server
        };
        let error = "";
        if (!settings.server) {
            error += LocaleStrings.settings_server_error + "\n";
        }
        if (error) {
            this.setState({
                error: error
            });
        }
        else {
            SettingsController.write(settings);
            this.props.navigation.navigate('HomeRoute');
        }
    }
    onCancel() {
        this.props.navigation.navigate('HomeRoute')
    }
    render() {
        return <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.form}>
                    <FormInput
                        placeholder={LocaleStrings.settings_server}
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus={true}
                        keyboardType='url'
                        value={this.state.server}
                        onChangeText={(text) => this.setState({ server: text })}
                    />
                    <FormValidationMessage>{this.state.error}</FormValidationMessage>
                    <View style={styles.buttons}>
                        <Button
                            onPress={(e) => this.onSubmit(e)}
                            raised
                            buttonStyle={{ backgroundColor: '#03a9f4' }}
                            textStyle={{ textAlign: 'center' }}
                            title={LocaleStrings.settings_ok}
                        />
                        <Button
                            onPress={(e) => this.onCancel(e)}
                            raised
                            buttonStyle={{ backgroundColor: '#03a9f4' }}
                            textStyle={{ textAlign: 'center' }}
                            title={LocaleStrings.settings_cancel}
                        />
                    </View>
                </View>
            </View>
        </View>;
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
    buttons: {

    }
});
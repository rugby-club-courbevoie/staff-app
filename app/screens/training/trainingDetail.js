'use strict';
import React, { Component } from 'react';
import { ScrollView, View, Linking, Text, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';
import { Tile, Card, Icon } from 'react-native-elements';
import * as Controller from './trainingController';
import { Diagnose, LoadingMessage } from '../common/diagnose';
import LocaleStrings from '../../resource/localeStrings';
import * as css from '../../resource/styles';
import NavHeader from '../common/navHeader';

export function formatLicense(playerLicense) {
    const s = '' + playerLicense;
    return s.substring(0, 4) + ' ' + s.substring(4, 6) + ' ' + s.substring(6);
}

function formatText(value, limit, sepValue) {
    let formatted = '',
        sep = 1;
    value = value || '';
    for (let ii = value.length - 1; ii >= 0; ii--) {
        formatted = value[ii] + formatted;
        if (sep == limit && ii != 0) {
            sep = 1;
            formatted = sepValue + formatted;
        } else {
            sep++;
        }
    }
    return formatted;
}

class CallButton extends Component {
    onCall = () => {
        Linking.canOpenURL(this.props.url).then(supported => {
            if (supported) {
                Linking.openURL(this.props.url);
            } else {
                console.log("Don't know how to open URI: " + this.props.url);
            }
        });
    };
    render() {
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        return (
            <Touchable onPress={this.onCall}>
                <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <Icon name={this.props.icon} color="#0091ea" />
                    <Text style={{ color: '#0091ea', marginLeft: 15 }}>{this.props.title}</Text>
                </View>
            </Touchable>
        );
    }
}

class Email extends Component {
    render() {
        if (this.props.email) {
            return <CallButton url={'mailto:' + this.props.email} icon="mail" title={this.props.email || ''} />;
        }
        return null;
    }
}

class Phone extends Component {
    render() {
        if (this.props.phone) {
            return (
                <CallButton url={'tel:' + this.props.phone} icon="phone" title={formatText(this.props.phone, 2, '.')} />
            );
        }
        return null;
    }
}

class License extends Component {
    render() {
        let color, activeText;
        if (this.props.active) {
            color = '#4CAF50';
            activeText = 'Active';
        } else {
            color = '#FF9800';
            activeText = 'Non active';
        }
        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                <Icon name="assignment-ind" color={color} />
                <Text style={{ marginLeft: 15, flex: 1 }}>{formatLicense(this.props.license)} </Text>
                <Text style={{ marginLeft: 15, marginRight: 15, color: color }}>{activeText}</Text>
            </View>
        );
    }
}

export default class TrainingDetail extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: <NavHeader icon="person" title={navigation.state.params.playerName.toUpperCase()} />,
        ...css.header,
    });
    player;
    renderPicture(picture, playerName, playerLicense) {
        if (picture) {
            return <Tile imageSrc={{ uri: picture.large }} featured title={playerName} caption={playerLicense} />;
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            loadingMessage: 'Chargement en cours',
        };
    }
    componentDidMount() {
        Controller.fetchPlayer(this.props.navigation.state.params.playerLicense, (player, error) => {
            if (error) {
                this.setState({
                    loadingMessage: null,
                    error: error.message,
                });
            } else {
                this.player = player;
                this.setState({
                    loadingMessage: null,
                });
            }
        });
    }
    //{this.renderPicture(picture, playerName, playerLicense)}
    capitalize(str) {
        if (str) {
            return str.substr(0, 1).toUpperCase() + str.substr(1);
        }
        return '';
    }
    renderParent(firstName, lastName, email, phone) {
        if (firstName || lastName) {
            return (
                <Card title={this.capitalize(firstName) + ' ' + (lastName || '').toUpperCase()}>
                    <Email email={email} />
                    <Phone phone={phone} />
                </Card>
            );
        }
    }
    renderDetail() {
        if (this.state) {
            if (this.player) {
                return (
                    <ScrollView>
                        <Card>
                            <License license={this.player.license} active={this.player.active} />
                            <Email email={this.player.email} />
                            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                                <Icon name="home" />
                                <Text style={{ marginLeft: 15 }}>
                                    {(this.player.street || '') + ' , ' + this.capitalize(this.player.city)}{' '}
                                </Text>
                            </View>
                        </Card>
                        {this.renderParent(
                            this.player.parent1FirstName,
                            this.player.parent1LastName,
                            this.player.parent1Email,
                            this.player.parent1Phone,
                        )}
                        {this.renderParent(
                            this.player.parent2FirstName,
                            this.player.parent2LastName,
                            this.player.parent2Email,
                            this.player.parent2Phone,
                        )}
                    </ScrollView>
                );
            }
        }
    }
    renderMessage() {
        if (this.state.error) {
            return <Diagnose message={this.state.error} />;
        } else {
            if (this.state.loadingMessage) {
                return <LoadingMessage message={this.state.loadingMessage} />;
            }
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderDetail()}
                {this.renderMessage()}
            </View>
        );
    }
}

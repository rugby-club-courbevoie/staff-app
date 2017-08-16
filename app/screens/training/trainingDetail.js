"use strict";
import React, { Component } from 'react';
import { ScrollView, View, Linking } from 'react-native';
import { Tile, List, ListItem, Card } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import * as css from '../../resource/styles';
import * as Controller from './trainingController';
import { Diagnose, LoadingMessage } from '../common/diagnose';
import LocaleStrings from '../../resource/localeStrings';

class Email extends Component {
    onCall = () => {
        let url = "mailto:" + this.props.email;
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });
    }
    render() {
        return <ListItem
            onPress={this.onCall}
            title="Email"
            rightTitle={this.props.email || ""}
            hideChevron
            leftIcon={{ name: "mail" }} />
    }
}

class Phone extends Component {
    onCall = () => {
        let url = "tel:" + this.props.phone;
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });
    }
    render() {
        let phone = this.props.phone || "";
        let formatted = "", sep = 0;
        for (let ii = phone.length - 1; ii >= 0; ii--) {
            formatted = phone[ii] + formatted;
            if (++sep == 2) {
                sep = 0;
                formatted = "." + formatted;
            }
        }
        phone = formatted;
        return <ListItem
            onPress={this.onCall}
            title="Téléphone"
            rightTitle={phone}
            hideChevron
            leftIcon={{ name: "phone" }} />
    }
}

export default class TrainingDetail extends Component {
    renderPicture(picture, playerName, playerLicense) {
        if (picture) {
            return <Tile
                imageSrc={{ uri: picture.large }}
                featured
                title={playerName}
                caption={playerLicense}
            />;
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            loadingMessage: "Chargement en cours"
        };
    }
    componentDidMount() {
        Controller.fetchPlayer(this.props.navigation.state.params.playerLicense, (player, error) => {
            console.log("Palyer" + JSON.stringify(player));
            if (error) {
                this.setState({
                    loadingMessage: null,
                    error: error.message
                });
            }
            else {
                this.setState({
                    loadingMessage: null,
                    player: player
                });
            }
        });
    }
    //{this.renderPicture(picture, playerName, playerLicense)}
    capitalize(str) {
        if (str) {
            return str.substr(0, 1).toUpperCase() + str.substr(1);
        }
        return "";
    }
    renderParent(firstName, lastName, email, phone) {
        if (firstName || lastName) {
            return <Card title={this.capitalize(firstName) + " " + (lastName || "").toUpperCase()}>
                <Email email={email} />
                <Phone phone={phone} />
            </Card>;
        }
    }
    renderDetail() {
        if (this.state) {
            let player = this.state.player;
            if (player) {
                return <ScrollView>
                    <List>
                        <ListItem
                            title="Licence"
                            rightTitle={player.license || ""}
                            hideChevron />
                        <ListItem
                            title="Active"
                            rightIcon={{ name: player.active ? "check-box" : "check-box-outline-blank" }} />
                    </List>
                    <List>
                        <Email email={player.email} />
                        <ListItem
                            title="Rue"
                            rightTitle={player.street || ""}
                            hideChevron />
                        <ListItem
                            title="Ville"
                            rightTitle={this.capitalize(player.city)}
                            hideChevron />
                    </List>
                    {this.renderParent(player.parent1FirstName, player.parent1LastName, player.parent1Email, player.parent1Phone)}
                    {this.renderParent(player.parent2FirstName, player.parent2LastName, player.parent2Email, player.parent2Phone)}
                </ScrollView>;
            }
        }
    }
    renderMessage() {
        if (this.state.error) {
            return <Diagnose message={this.state.error} />;
        }
        else {
            if (this.state.loadingMessage) {
                return <LoadingMessage message={this.state.loadingMessage} />;
            }
        }
    }
    render() {
        return <View style={{ flex: 1 }}>
            {this.renderDetail()}
            {this.renderMessage()}
        </View >;
    }
}
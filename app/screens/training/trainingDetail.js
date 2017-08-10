"use strict";
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import * as css from '../../resource/styles';
import * as Controller from './trainingController';
import { Diagnose, LoadingMessage } from '../common/diagnose';
import LocaleStrings from '../../resource/localeStrings';

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
    renderParent(firstName, lastName, email, phone) {
        if (firstName || lastName) {
            return <List>
                <ListItem
                    title="Prénom"
                    rightTitle={firstName || ""}
                    hideChevron />
                <ListItem
                    title="Nom"
                    rightTitle={lastName || ""}
                    hideChevron />
                <ListItem
                    title="Email"
                    rightTitle={email || ""}
                    hideChevron />
                <ListItem
                    title="Téléphone"
                    rightTitle={phone || ""}
                    hideChevron />
            </List>;
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
                        <ListItem
                            title="Prénom"
                            rightTitle={player.firstName || ""}
                            hideChevron />
                        <ListItem
                            title="Licence"
                            rightTitle={player.lastName || ""}
                            hideChevron />
                        <ListItem
                            title="Email"
                            rightTitle={player.email || ""}
                            hideChevron />
                        <ListItem
                            title="Rue"
                            rightTitle={player.street || ""}
                            hideChevron />
                        <ListItem
                            title="Ville"
                            rightTitle={player.city || ""}
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
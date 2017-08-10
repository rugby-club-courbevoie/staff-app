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
            loadingMessage: LocaleStrings.training_categories_load_in_progress
        };
    }
    componentDidMount() {
        Controller.fetchPlayer(this.props.navigation.state.params.playerLicense, (player, error) => {
            if (error) {
                this.setState({
                    loadingMessage: null,
                    error: error.message,
                });
            }
            else {
                this.setState({
                    player: player
                });
            }
        });
    }
    //{this.renderPicture(picture, playerName, playerLicense)}
    renderDetail() {
        if (this.state) {
            let player = this.state.player;
            if (player) {
                return <ScrollView>
                    <List>
                        <ListItem
                            title="Présent"
                            rightIcon={{ name: player.present ? "check-box" : "check-box-outline-blank" }} />
                        <ListItem
                            title="Licence"
                            rightTitle={player.playerLicense || ""}
                            hideChevron />
                    </List>
                    <List>
                        <ListItem
                            title="Entraîneur"
                            rightTitle={player.coachName || ""}
                            hideChevron />
                    </List>
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
    renderrr() {
        const { picture, playerName, present, playerLicense, coachName, excusedBy, excusedReason } = this.props.navigation.state.params;
        return <ScrollView>
            <ListItem
                title="Raison"
                rightTitle={excusedReason || ""}
                hideChevron />

        </ScrollView>;
    }
}
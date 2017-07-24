"use strict";
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import * as css from '../../resource/styles';

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
    //{this.renderPicture(picture, playerName, playerLicense)}
    render() {
        const { picture, playerName, present, playerLicense, coachName, excusedBy, excusedReason } = this.props.navigation.state.params;
        return <ScrollView>
            <List>
                <ListItem
                    title="Présent"
                    rightIcon={{ name: present ? "check-box" : "check-box-outline-blank" }}
                />
                <ListItem
                    title="Licence"
                    rightTitle={playerLicense || ""}
                    hideChevron
                />
            </List>
            <List>
                <ListItem
                    title="Entraîneur"
                    rightTitle={coachName || ""}
                    hideChevron
                />
            </List>
            <List>
                <ListItem
                    title="Excusé par"
                    rightTitle={excusedBy || ""}
                    hideChevron
                />
                <ListItem
                    title="Raison"
                    rightTitle={excusedReason || ""}
                    hideChevron
                />
            </List>
        </ScrollView>;
    }
}
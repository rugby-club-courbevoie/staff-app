"use strict";
import React, { Component } from 'react';
import LocaleStrings from '../../resource/localeStrings';
import { StyleSheet, View, Text, ScrollView, Picker, FormInput } from 'react-native';
import { List, ListItem, Icon, Button } from 'react-native-elements';
import NavHeader from '../common/navHeader';
import * as css from '../../resource/styles';
import TrainingList from './trainingList';
import * as Controller from './trainingController';
import { Diagnose, LoadingMessage } from '../common/diagnose';

import Category from './category';

export default class Training extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: LocaleStrings.training_title,
        headerTitle: (<NavHeader icon="school" title={LocaleStrings.training_title} />),
        ...css.header
    });
    allPlayers;
    restoreAllPlayers;
    players;
    restorePlayers;
    categories;

    constructor(props) {
        super(props);
        this.state = {
            dirty: false,
            loadingMessage: LocaleStrings.training_categories_load_in_progress
        };
    }
    componentDidMount() {
        Controller.fetchCategories((categories, error) => {
            if (error) {
                this.setState({
                    loadingMessage: null,
                    diagnose: {
                        message: error.message
                    }
                });
            }
            else {
                this.onCategoryChange(Controller.getDefaultCategory(categories), categories);
            }
        });
    }
    onCancel = () => {
        this.allPlayers = Controller.clone(this.restoreAllPlayers);
        this.filterByYear(this.state.selectedYear, false);
    }
    onSubmit = () => {
        Controller.postSelection(this.players, (success, error) => {
            if (error) {
                this.setState({
                    diagnose: {
                        message: error.message
                    }
                });
            }
            else {
                this.restoreAllPlayers = Controller.clone(this.allPlayers);
                this.setState({
                    diagnose: null,
                    dirty: false
                });
            }
        });
    }
    onPlayerShowDetail = (index) => {
        let player = this.players[index];
        this.props.navigation.navigate('TrainingDetail', {
            playerLicense: player.playerLicense,
            playerName: player.playerName
        });
    }
    onPlayerCheckPress = (index) => {
        let player = this.players[index];
        player.present = !player.present;
        player.presentStamp = new Date().toISOString();
        this.setState({
            diagnose: null,
            dirty: true,

        });
    }
    onCategoryChange = (seletectedCategory, categories) => {
        let selectedYear = Controller.saveSelectedCategory(seletectedCategory);
        this.allPlayers = [];
        this.restoreAllPlayers = [];
        this.players = [];
        this.categories =  categories || this.categories;
        this.setState({
            loadingMessage: LocaleStrings.training_load_in_progress,
            diagnose: null,            
            seletectedCategory: seletectedCategory,
            selectedYear: selectedYear
        });
        Controller.fetchPlayers(seletectedCategory.name, (players, error) => {
            if (error) {
                this.setState({
                    loadingMessage: null,
                    diagnose: {
                        message: error.message
                    }
                });
            }
            else {
                this.restoreAllPlayers = Controller.clone(this.allPlayers = players);
                this.filterByYear(this.state.selectedYear);
            }
        });
    }
    onYearChange = (selectedYear) => {
        this.filterByYear(selectedYear);
    }
    filterByYear(selectedYear, dirty) {
        this.players = Controller.filterByYear(selectedYear, this.allPlayers);
        this.restorePlayers = Controller.filterByYear(selectedYear, this.restoreAllPlayers);
        Controller.saveSelectedYear(selectedYear);
        let diagnose = null;
        if (!this.players || !this.players.length) {
            let msg = LocaleStrings.training_no_players_for_cat.replace("{0}", this.state.seletectedCategory.name);
            diagnose = {
                severity: "info",
                message: msg.replace("{1}", state.selectedYear)
            };
        }
        this.setState({
            dirty: dirty,
            selectedYear: selectedYear,
            loadingMessage: null,
            diagnose: diagnose
        });
    }
    renderCategory() {
        if (this.categories) {
            return <Category
                categories={this.categories}
                seletectedCategory={this.state.seletectedCategory}
                selectedYear={this.state.selectedYear}
                onCategoryChange={this.onCategoryChange}
                onYearChange={this.onYearChange} />
        }
    }
    countPresents(players) {
        let presents = 0;
        for (let player of players) {
            if (player.present) {
                presents++;
            }
        }
        return presents;
    }
    renderList() {
        if (this.categories && this.players && this.players.length) {
            let saveTitle = "Sauver    ( " + this.countPresents(this.players) + " / " + this.players.length + " )";
            let cancelTitle = "Annuler    ( " + this.countPresents(this.restorePlayers) + " / " + this.restorePlayers.length + " )";

            return <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <TrainingList players={this.players}
                        onPlayerShowDetail={this.onPlayerShowDetail}
                        onPlayerCheckPress={this.onPlayerCheckPress} />
                </ScrollView>
                {this.renderMessage()}
                <View style={{ marginTop: 20, flexDirection: 'row' }}>
                    <Button title={saveTitle}
                        raised
                        icon={{ name: "done", color: "#FFF" }}
                        backgroundColor="#0D47A1"
                        color="#FFF"
                        onPress={this.onSubmit}
                        disabled={!this.state.dirty} />
                    <Button title={cancelTitle}
                        raised
                        icon={{ name: "undo", color: (this.state.dirty ? "#0D47A1" : "#FFF") }}
                        boderColor="#0D47A1"
                        backgroundColor="#FFF"
                        color={this.state.dirty ? "#0D47A1" : "#FFF"}
                        onPress={this.onCancel}
                        disabled={!this.state.dirty} />
                </View>
            </View>;
        }
        return this.renderMessage();
    }
    renderMessage() {
        if (this.state.diagnose) {
            return <Diagnose message={this.state.diagnose.message} severity={this.state.diagnose.severity} />;
        }
        else {
            if (this.state.loadingMessage) {
                return <LoadingMessage message={this.state.loadingMessage} />;
            }
        }
    }
    render() {
        return <View style={{ flex: 1 }}>
            {this.renderCategory()}
            {this.renderList()}
        </View >;
    }
}

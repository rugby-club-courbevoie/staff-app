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

class YearFilter {
    constructor(year, allPlayers) {
        this.originalStatus = {};
        this.players = Controller.filterByYear(year, allPlayers);
        this.dirty = false;
    }
    changePlayerStatus(index, end) {
        let player = this.players[index];
        if (this.originalStatus[index] === undefined) {
            this.originalStatus[index] = player.present;
        }
        player.present = !player.present;
        player.presentStamp = new Date().toISOString();
        this.dirty = true;
        end({
            diagnose: null
        });
    }
    cancel() {
        for (let index in this.originalStatus) {
            this.players[index].present = this.originalStatus[index];
        }
        this.dirty = false;
    }
    submit(end) {
        Controller.postSelection(this.players, (success, error) => {
            if (error) {
                end({
                    diagnose: {
                        message: error.message
                    }
                });
            }
            else {
                this.originalStatus = {};
                this.dirty = false;
                end({
                    diagnose: null
                });
            }
        });
    }
    dispose() {
        this.players = null;
    }
}

export default class Training extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: (<NavHeader icon="school" title={LocaleStrings.training_title} />),
        ...css.header
    });
    allPlayers;
    originalStatus;
    players;
    categories;
    activeFilter;
    filters;

    constructor(props) {
        super(props);
        this.state = {
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
        this.activeFilter.cancel();
        this.filterByYear(this.state.selectedYear);
    }
    onSubmit = () => {
        this.activeFilter.submit((state) => this.setState(state));
    }
    onPlayerShowDetail = (index) => {
        let player = this.activeFilter.players[index];
        this.props.navigation.navigate('TrainingDetail', {
            playerLicense: player.playerLicense,
            playerName: player.playerName
        });
    }
    onPlayerCheckPress = (index) => {
        this.activeFilter.changePlayerStatus(index, (state) => this.setState(state));
    }
    resetFilters() {
        if (this.filters) {
            for (let key in this.filters) {
                this.filters[key].dispose();
            }
        }
        this.filters = {};
        this.activeFilter = null;
    }
    onCategoryChange = (seletectedCategory, categories) => {
        let selectedYear = Controller.saveSelectedCategory(seletectedCategory);
        this.allPlayers = [];
        this.resetFilters();
        this.categories = categories || this.categories;
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
                this.allPlayers = players;
                this.originalStatus = {};
                this.filterByYear(this.state.selectedYear);
            }
        });
    }
    onYearChange = (selectedYear) => {
        this.filterByYear(selectedYear);
    }
    filterByYear(selectedYear) {
        this.activeFilter = this.filters[selectedYear];
        if (!this.activeFilter) {
            this.filters[selectedYear] = this.activeFilter = new YearFilter(selectedYear, this.allPlayers);
        }
        Controller.saveSelectedYear(selectedYear);
        let diagnose = null;
        if (!this.activeFilter.players.length) {
            let msg = LocaleStrings.training_no_players_for_cat.replace("{0}", this.state.seletectedCategory.name);
            diagnose = {
                severity: "info",
                message: msg.replace("{1}", selectedYear)
            };
        }
        let state = {
            selectedYear: selectedYear,
            loadingMessage: null,
            diagnose: diagnose
        };
        this.setState(state);
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
        if (this.categories) {
            let players = this.activeFilter && this.activeFilter.players;
            if (players && players.length) {
                let saveTitle = "Sauver ( " + this.countPresents(players) + " / " + players.length + " )";
                let cancelTitle = "Annuler";

                return <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <TrainingList players={players}
                            onPlayerShowDetail={this.onPlayerShowDetail}
                            onPlayerCheckPress={this.onPlayerCheckPress} />
                    </ScrollView>
                    {this.renderMessage()}
                    <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button title={saveTitle}
                            raised
                            icon={{ name: "done", color: "#FFF" }}
                            backgroundColor="#0D47A1"
                            color="#FFF"
                            style={{ flex: 1 }}
                            onPress={this.onSubmit}
                            disabled={!this.activeFilter.dirty} />
                        <Button title={cancelTitle}
                            raised
                            icon={{ name: "undo", color: (this.activeFilter.dirty ? "#0D47A1" : "#FFF") }}
                            boderColor="#0D47A1"
                            backgroundColor="#FFF"
                            color={this.activeFilter.dirty ? "#0D47A1" : "#FFF"}
                            onPress={this.onCancel}
                            disabled={!this.activeFilter.dirty} />
                    </View>
                </View>;
            }
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

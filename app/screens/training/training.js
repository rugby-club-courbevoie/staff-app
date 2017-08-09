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
                    error: error.message,
                });
            }
            else {
                this.onCategoryChange(Controller.getDefaultCategory(categories), categories);
            }
        });
    }
    onSubmit = () => {
        Controller.postSelection(this.state.players, (success, error) => {
            if (error) {
                this.setState({
                    error: error.message
                });
            }
        });
    }
    onPlayerShowDetail = (player) => {
        console.log("onPlayerShowDetail " + JSON.stringify(player));
        this.props.navigation.navigate('TrainingDetail', { ...player });
    }
    onPlayerCheckPress = (player) => {
        player.present = !player.present;
        player.presentStamp = new Date().toISOString();
        this.setState({
            players: this.state.players.slice()
        });
    }
    onCategoryChange = (seletectedCategory, categories) => {
        let selectedYear = Controller.saveSelectedCategory(seletectedCategory);
        this.setState({
            loadingMessage: LocaleStrings.training_load_in_progress,
            categories: categories || this.state.categories,
            seletectedCategory: seletectedCategory,
            selectedYear: selectedYear,
            players: []
        });
        Controller.fetchPlayers(seletectedCategory.name, (players, error) => {
            let state = {
                loadingMessage: null
            };
            if (error) {
                state.error = error.message;
            }
            else {
                state.allPlayers = players;
                state.players = Controller.filterByYear(this.state.selectedYear, players);
            }
            this.setState(state);
        });
    }
    onYearChange = (selectedYear) => {
        this.setState({
            selectedYear: selectedYear,
            players: Controller.filterByYear(selectedYear, this.state.allPlayers)
        });
    }
    renderCategory() {
        if (this.state.categories) {
            return <Category
                categories={this.state.categories}
                seletectedCategory={this.state.seletectedCategory}
                selectedYear={this.state.selectedYear}
                onCategoryChange={this.onCategoryChange}
                onYearChange={this.onYearChange} />
        }
    }
    renderList() {
        if (this.state.categories) {
            if (this.state.players && this.state.players.length) {
                return <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <TrainingList players={this.state.players}
                            onPlayerShowDetail={this.onPlayerShowDetail}
                            onPlayerCheckPress={this.onPlayerCheckPress} />
                    </ScrollView>
                    <View>
                        <Button title="Submit" onPress={this.onSubmit} disabled={!(this.state.players && this.state.players.length > 0)} />
                    </View>
                </View>;
            }
            else {
                let msg = LocaleStrings.training_no_players_for_cat.replace("{0}", this.state.seletectedCategory.name);
                return <View><Text>{msg.replace("{1}", this.state.selectedYear)}</Text></View>;
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
            {this.renderCategory()}
            {this.renderList()}
            {this.renderMessage()}
        </View >;
    }
}

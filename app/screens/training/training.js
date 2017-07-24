"use strict";
import React, { Component } from 'react';
import LocaleStrings from '../../resource/localeStrings';
import { StyleSheet, View, Text, ScrollView, Picker, FormInput } from 'react-native';
import { List, ListItem, Icon, Button } from 'react-native-elements';
import NavHeader from '../common/navHeader';
import { players } from '../../resource/data/players';
import * as css from '../../resource/styles';
import TrainingList from './trainingList';
import Category from './category';

const categories = [
    {
        name: "Cat 2000",
        year1: "2000",
        year2: "2001"
    },
    {
        name: "Cat 2010",
        year1: "2010",
        year2: "2011",
        year3: "2012"
    }
];

const mode_debug = true;

export default class Training extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: LocaleStrings.training_title,
        headerTitle: (<NavHeader icon="school" title={LocaleStrings.training_title} />),
        ...css.header
    });
    constructor(props) {
        super(props);
        this.state = {
            loadingMessage: "Chargement des catégories en cours"
        };
    }
    componentDidMount() {
        if (mode_debug) {
            setTimeout(() => this.onCategoryChange(categories[0], categories), 200);
        }
        else {
            fetch('http://172.16.169.40:8099/categories', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    this.onCategoryChange(response[0], response);
                })
                .catch((error) => {
                    this.setState({
                        loadingMessage: null,
                        error: error,
                    });
                });
        }
    }
    onSubmit = () => {

    }
    onPlayerShowDetail = (player) => {
        this.props.navigation.navigate('TrainingDetail', { ...player });
    }
    onPlayerCheckPress = (player) => {
        player.present = !player.present;
        this.setState({
            players: this.state.players.slice()
        });
    }
    onCategoryChange = (seletectedCategory, categories) => {
        this.setState({
            loadingMessage: "Chargement des participants en cours...",
            categories: categories || this.state.categories,
            seletectedCategory: seletectedCategory,
            seletectedYear: seletectedCategory.year1,
            players: []
        });
        if (mode_debug) {
            setTimeout(() => {
                this.setState({
                    players: players
                });
            }, 200);
        }
        else {
            let url = 'http://172.16.169.40:8099/participants?event=training&date=2017-07-24&category=' + seletectedCategory.name + '&coachLicense=2001091046249';
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        loadingMessage: null,
                        players: response
                    });
                })
                .catch((error) => {
                    this.setState({
                        loadingMessage: null,
                        error: error,
                    });
                });
        }
    }
    onYearChange = (selectedYear) => {
        console.log("onYearChange " + selectedYear);
        this.setState({
            selectedYear: selectedYear
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
        else {
            return <View><Text>{this.state.error ? "Chargement échoué" : this.state.loadingMessage}</Text></View>;
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
                return <View><Text>{"Aucun partipant pour la catégorie '" + this.state.seletectedCategory.name + "' et l'année " + this.state.seletectedYear}</Text></View>;
            }
        }
    }
    render() {
        if (!this.state.error) {
            return <View style={{ flex: 1 }}>
                {this.renderCategory()}
                {this.renderList()}
            </View >;
        }
        return <View><Text>{this.state.error ? "Chargement échoué" : this.state.loadingMessage}</Text></View>;
    }
}

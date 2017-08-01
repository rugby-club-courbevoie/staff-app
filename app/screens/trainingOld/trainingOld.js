"use strict";
import React, { Component } from 'react';
import LocaleStrings from '../../resource/localeStrings';
import { View, Text, ScrollView, Picker,FormInput } from 'react-native';
import { List, ListItem, Icon, Button } from 'react-native-elements';
import NavHeader from '../common/navHeader';
import { defined_players } from '../../resource/data/players';
import * as css from '../../resource/styles';

const categories = [
    {
        label: "Java",
        value: "java"
    },
    {
        label: "JavaScript",
        value: "js"
    }
];

export default class TrainingOld extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: LocaleStrings.training_title,
        headerTitle: (<NavHeader icon="school" title={LocaleStrings.training_title} />),
        ...css.header
    });
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            category: "js"
        };
    }
    onLearnMore = (player) => {
        this.props.navigation.navigate('TrainingDetail', { ...player });
    };
    componentDidMount() {
        if (true) {
            this.setState({
                isLoading: false,
                players: players
            });
        }
        else {
            fetch('/participants?event=training/match&date=yyyy-mm-dd&category=Unn', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        isLoading: false,
                        players: response
                    });
                })
                .catch((error) => {
                    this.setState({
                        isLoading: false,
                    });
                    console.warn(error);
                });
        }
    }
    onSubmit = () => {

    }
    onCategoryChange = (value) => {
        this.setState({ category: value })
    }
    render() {
        if (!this.state.isLoading && !this.state.error) {
            return <View style={{ flex: 1 }}>
                <View>
                    <Picker
                        selectedValue={this.state.category}
                        onValueChange={this.onCategoryChange}>
                        {
                            categories.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)
                        }
                    </Picker>
                </View >
                <ScrollView style={{ flex: 1 }}>
                    <List>
                        {this.state.players.map((player, index) => (
                            <ListItem
                                key={index}
                                roundAvatar
                                avatar={{ uri: player.picture.thumbnail }}
                                title={player.playerName.toUpperCase()}
                                subtitle={LocaleStrings.training_license.toUpperCase() + " " + player.playerLicense}
                                onPress={() => this.onLearnMore(player)}
                            />
                        ))}
                    </List>
                </ScrollView>
                <View>
                    <Button title="Submit" onPress={this.onSubmit} />
                </View>
            </View >;
        }
        return <View><Text>{this.state.error ? "Chargement échoué" : "Chargement en cours"}</Text></View>;
    }
}
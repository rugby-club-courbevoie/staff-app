"use strict";
import React, { Component } from 'react';
import LocaleStrings from '../../resource/localeStrings';
import { View, Text, ScrollView } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { users } from '../../resource/data';
import * as css from '../../resource/styles';

const titleAndIcon =
    <View style={css.header.container}>
        <Icon name="group" color={css.colors.text_light} />
        <Text style={css.header.text}>{LocaleStrings.contacts_title}</Text>
    </View>;

export default class Contacts extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: LocaleStrings.contacts_title,
        headerTitle: titleAndIcon,
        ...css.header
    });
    onLearnMore = (user) => {
        this.props.navigation.navigate('Details', { ...user });
    };
    render() {
        return (
            <ScrollView>
                <List>
                    {users.map((user) => (
                        <ListItem
                            key={user.login.username}
                            roundAvatar
                            avatar={{ uri: user.picture.thumbnail }}
                            title={`${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}`}
                            subtitle={user.email}
                            onPress={() => this.onLearnMore(user)}
                        />
                    ))}
                </List>
            </ScrollView>
        );
    }
}
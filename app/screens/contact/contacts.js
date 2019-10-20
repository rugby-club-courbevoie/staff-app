'use strict';
import React, { Component } from 'react';
import LocaleStrings from '../../resource/localeStrings';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import NavHeader from '../common/navHeader';
import { users } from '../../resource/data/users';
import * as css from '../../resource/styles';

export default class Contacts extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: LocaleStrings.contacts_title,
        headerTitle: <NavHeader icon="group" title={LocaleStrings.contacts_title} />,
        ...css.header,
    });
    onLearnMore = user => {
        this.props.navigation.navigate('Details', { ...user });
    };
    render() {
        return (
            <SafeAreaView>
                <Text style={{ margin: 10, fontSize: 22, fontWeight: 'bold' }}>Contacts</Text>
                <View>
                    {users.map(user => (
                        <ListItem
                            key={user.login && user.login.username}
                            roundAvatar
                            avatar={{ uri: user.picture && user.picture.thumbnail }}
                            title={`${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}`}
                            subtitle={user.email}
                            onPress={() => this.onLearnMore(user)}
                        />
                    ))}
                </View>
            </SafeAreaView>
        );
    }
}

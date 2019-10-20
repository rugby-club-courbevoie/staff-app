'use strict';
import React, { Component } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Tile, ListItem } from 'react-native-elements';

export default class ContactDetail extends Component {
    render() {
        const { picture, name, email, phone, login, dob, location } = this.props.navigation.state.params;

        return (
            <SafeAreaView>
                <Tile
                    imageSrc={{ uri: picture && picture.large }}
                    featured
                    title={`${name.first.toUpperCase()} ${name.last.toUpperCase()}`}
                    caption={email}
                />
                <View>
                    <ListItem title="Email" rightTitle={email} hideChevron />
                    <ListItem title="Phone" rightTitle={phone} hideChevron />
                </View>
                <View>
                    <ListItem title="Username" rightTitle={login && login.username} hideChevron />
                </View>
                <View>
                    <ListItem title="Birthday" rightTitle={dob} hideChevron />
                    <ListItem title="City" rightTitle={location && location.city} hideChevron />
                </View>
            </SafeAreaView>
        );
    }
}

'use strict';
import React, { Component, View } from 'react';
import { ScrollView } from 'react-native';
import { Tile, ListItem } from 'react-native-elements';

export default class ContactDetail extends Component {
    render() {
        const { picture, name, email, phone, login, dob, location } = this.props.navigation.state.params;

        return (
            <ScrollView>
                <Tile
                    imageSrc={{ uri: picture.large }}
                    featured
                    title={`${name.first.toUpperCase()} ${name.last.toUpperCase()}`}
                    caption={email}
                />

                <View>
                    <ListItem title="Email" rightTitle={email} hideChevron />
                    <ListItem title="Phone" rightTitle={phone} hideChevron />
                </View>

                <View>
                    <ListItem title="Username" rightTitle={login.username} hideChevron />
                </View>

                <View>
                    <ListItem title="Birthday" rightTitle={dob} hideChevron />
                    <ListItem title="City" rightTitle={location.city} hideChevron />
                </View>
            </ScrollView>
        );
    }
}

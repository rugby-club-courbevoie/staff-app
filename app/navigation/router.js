import React from 'react';
import { Image, View } from 'react-native';
import * as css from '../resource/styles';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../screens/home/home';
import LoginForm from '../screens/login/loginForm';
import Contacts from '../screens/contact/contacts';
import ContactDetail from '../screens/contact/contactDetail';
import MatchCheck from '../screens/matchCheck/matchCheck';
import Training from '../screens/training/training';
import TrainingDetail from '../screens/training/trainingDetail';
import PlayerSelect from '../screens/playerSelect/playerSelect';
import { ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import LocaleStrings from '../resource/localeStrings';

const navigatorOptions = {
    tabBarOptions: {
        style: {
            //padding: 10,
            //height: 20,
            //verticalAlign: 'top',
        },
    },
};

export const ContactStack = createBottomTabNavigator(
    {
        Contacts: {
            screen: Contacts,
            navigationOptions: { title: 'Contacts' },
        },
        Details: {
            screen: ContactDetail,
            navigationOptions: { title: 'Détails' },
            //navigationOptions: ({ navigation }) => ({
            //  title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
            //}),
        },
    },
    navigatorOptions,
);

export const TrainingStack = createBottomTabNavigator(
    {
        Training: {
            screen: Training,
            navigationOptions: { title: 'Joueurs' },
        },
        TrainingDetail: {
            screen: TrainingDetail,
            navigationOptions: { title: 'Détails' },
        },
    },
    navigatorOptions,
);

export const RootStack = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
        },
        Training: {
            screen: TrainingStack,
            navigationOptions: { title: 'Entraînements' },
        },
        PlayerSelect: {
            screen: PlayerSelect,
            navigationOptions: { title: 'Sélections' },
        },
        MatchCheck: {
            screen: MatchCheck,
            navigationOptions: { title: 'Matchs' },
        },
        Contacts: {
            screen: ContactStack,
            navigationOptions: { title: 'Contacts' },
        },
    },
    navigatorOptions,
);

const customDrawerComponent = props => (
    <View
        style={{
            flex: 1,
            backgroundColor: css.drawer.style.backgroundColor,
        }}
    >
        <ScrollView
            style={{
                flex: 1,
            }}
        >
            <DrawerNavigatorItems {...props} />
        </ScrollView>
        <View
            style={{
                flex: 3,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                style={{
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    width: 216,
                    height: 216,
                    borderRadius: 108,
                    borderWidth: 1,
                }}
                source={require('../resource/xxl_logo.png')}
            />
        </View>
    </View>
);

export const RootDrawer = createDrawerNavigator(
    {
        Login: {
            screen: LoginForm,
            navigationOptions: {
                drawerLabel: LocaleStrings.route_connection,
                drawerIcon: ({ tintColor }) => <Icon name="person" color={tintColor} />,
            },
        },
        HomeRoute: {
            screen: RootStack,
            navigationOptions: {
                drawerLabel: LocaleStrings.route_home,
                drawerIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />,
            },
        },
    },
    {
        contentComponent: customDrawerComponent,
        drawerPosition: 'left',
        // styling for for DrawerView.Items in contentOptions
        contentOptions: css.drawer,
    },
);

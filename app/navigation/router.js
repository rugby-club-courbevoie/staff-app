import React from 'react';
import { Image, View } from 'react-native';
import * as css from '../resource/styles';
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
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

export const ContactStack = StackNavigator({
  Contacts: {
    screen: Contacts
  },
  Details: {
    screen: ContactDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    }),
  },
}, { headerMode: 'none' });

export const TrainingStack = StackNavigator({
  Training: {
    screen: Training
  },
  TrainingDetail: {
    screen: TrainingDetail
  },
}, { headerMode: 'none' });

export const RootStack = StackNavigator({
  Home: {
    screen: Home,
  },
  Training: {
    screen: TrainingStack,
  },
  PlayerSelect: {
    screen: PlayerSelect,
  },
  MatchCheck: {
    screen: MatchCheck,
  },
  ContactsRoute: {
    screen: ContactStack,
  }
});

const customDrawerComponent = (props) =>
  <View style={{
    flex: 1,
    backgroundColor: css.drawer.style.backgroundColor,
  }}>
    <ScrollView
      style={{
        flex: 1
      }}>
      <DrawerItems {...props} />
    </ScrollView>
    <View style={{
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Image style={{
        resizeMode: "contain",
        alignSelf: "center",
        width: 216,
        height: 216,
        borderRadius:108,
        borderWidth:1
      }} source={require('../resource/xxl_logo.png')} />
    </View>
  </View>

export const RootDrawer = DrawerNavigator({
  Login: {
    screen: LoginForm,
    navigationOptions: {
      drawerLabel: LocaleStrings.route_connection,
      drawerIcon: ({ tintColor }) => <Icon name="person" color={tintColor} />,
    }
  },
  HomeRoute: {
    screen: RootStack,
    navigationOptions: {
      drawerLabel: LocaleStrings.route_home,
      drawerIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />,
    },
  }
}, {
    contentComponent: customDrawerComponent,
    drawerPosition: 'left',
    // styling for for DrawerView.Items in contentOptions
    contentOptions: css.drawer,
  },
);



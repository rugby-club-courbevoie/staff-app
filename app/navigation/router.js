import React from 'react';
import * as css from '../resource/styles';
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import Home from '../screens/home/home';
import Login from '../screens/login/login';
import SettingsForm from '../screens/settings/settingsForm';
import Contacts from '../screens/contact/contacts';
import ContactDetail from '../screens/contact/contactDetail';
import MatchCheck from '../screens/matchCheck/matchCheck';
import Training from '../screens/training/training';
import TrainingDetail from '../screens/training/trainingDetail';
import TrainingOld from '../screens/trainingOld/trainingOld';
import TrainingOldDetail from '../screens/trainingOld/trainingOldDetail';
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
    screen: TrainingDetail,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.playerName.toUpperCase()
    }),
  },
}, { headerMode: 'none' });

export const TrainingOldStack = StackNavigator({
  TrainingOld: {
    screen: TrainingOld
  },
  TrainingOldDetail: {
    screen: TrainingOldDetail,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.playerName.toUpperCase()
    }),
  },
}, { headerMode: 'none' });
export const RootStack = StackNavigator({
  Home: {
    screen: Home,
  },
  Training : {
    screen: TrainingStack,
  },
  TrainingOld: {
    screen: TrainingOldStack,
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
  <ScrollView
    style={{
      flex: 1,
      backgroundColor: css.drawer.style.backgroundColor,
    }}>
    <DrawerItems {...props} />
  </ScrollView>;

export const RootDrawer = DrawerNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      drawerLabel: LocaleStrings.route_connection,
      drawerIcon: ({ tintColor }) => <Icon name="person" color={tintColor} />,
    }
  },
  SettingsForm: {
    screen: SettingsForm,
    navigationOptions: {
      drawerLabel: LocaleStrings.settings,
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



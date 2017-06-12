/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Landing, LandingMenu } from './landing/landing';
import { Training } from './training/training'
import { LoginForm } from './login/loginForm'
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

interface IProps { }
interface IState {
  logon?: boolean,
  menu?: LandingMenu
}

export default class RccStaff extends Component<IProps, IState> {
  constructor(props: IProps, context: any) {
    super(props, context);
    this.state = {

    };
  }
  onLandingCick = (menu: LandingMenu) => {
    this.setState({
      menu: menu
    });
  }
  onAuthenticate = () => {
    this.setState({
      logon: true
    });
  }
  route() {
    if (this.state.menu == LandingMenu.training) {
      return <Training />;
    }
    return <Landing onGoTo={this.onLandingCick} />;
  }
  render() {
    return (
      <View style={styles.container}>
        {!this.state.logon ? <LoginForm email="email a bruno" password="dsds" onAuthenticate={this.onAuthenticate} /> :
          this.route()}
      </View>
    );
  }
}

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('RccStaff', () => RccStaff);

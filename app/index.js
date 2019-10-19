import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { RootDrawer } from './navigation/router';

const AppContainer = createAppContainer(RootDrawer);

export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}

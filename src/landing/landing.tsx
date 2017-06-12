import { View, Button } from 'react-native';
import React from 'react';

interface IProps {
    onGoTo: (screen: LandingMenu) => void
}

interface IState {
}

export enum LandingMenu {
    training,
    select,
    tally,
    membo
}


export class Landing extends React.Component<IProps, IState> {
    constructor(props: IProps, context: any) {
        super(props, context);
        this.state = {

        };
    }
    render() {
        return <View > 
            <Button
                onPress={() => this.props.onGoTo(LandingMenu.training)}
                title="Entraînement"
            />
            <Button
                onPress={() => this.props.onGoTo(LandingMenu.select)}
                title="Sélection match"
                color="#841584"
            />
            <Button
                onPress={() => this.props.onGoTo(LandingMenu.tally)}
                title="Pointage match"
                color="#841584"
            />
            <Button
                onPress={() => this.props.onGoTo(LandingMenu.select)}
                title="Membo contacts"
                color="#841584"
            />
        </View>
    }
}

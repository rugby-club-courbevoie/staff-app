import React from 'react';
import { View, ScrollView, Text } from 'react-native';

interface IProps {

}

class Player {
    name: string
    lastName: string
}
interface IState {
    players: Player[]
}


export class Training extends React.Component<IProps, IState> {
    constructor(props: IProps, context: any) {
        super(props, context);
        let players: Player[] = [];
        for (let ii = 0; ii < 100; ii++) {
            players.push({
                name: "name " + ii,
                lastName: "lastName " + ii
            });
        }players
        this.state = {
            players: players
        };
    }
    render() {
        let rows: any[] = [];
        for (let player of this.state.players) {
            rows.push(<View key={rows.length} style={{flex: 1, flexDirection: 'row'}}>
                <Text>{player.name}</Text><Text>{player.lastName}</Text>
            </View>);
        }
        return <View>
            <ScrollView>
                {rows}
            </ScrollView>
        </View>;
    }
}


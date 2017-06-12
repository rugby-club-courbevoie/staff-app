import { View, TextInput, Button } from 'react-native';
import React from 'react';

interface IProps {
    email: string,
    password: string,
    onAuthenticate:()=>void
}

interface IState {
    emailText: string,
    passwordText: string
}


export class LoginForm extends React.Component<IProps, IState> {
    constructor(props: IProps, context: any) {
        super(props, context);
        this.state = {
            emailText: props.email,
            passwordText: props.password
        };
    }
    onEmailChange = () => {

    }
    onPwdChange = () => {

    }
    onSubmit = () => {
        this.props.onAuthenticate();
    }
    render() {
        return <View >
            <View >
                <TextInput
                    placeholder="Email"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text: string) => this.setState({ emailText: text })}
                    value={this.state.emailText}
                />
                <TextInput
                    placeholder="Password"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ passwordText: text })}
                    secureTextEntry
                    value={this.state.passwordText}
                />
            </View>
            <Button
                onPress={this.onSubmit}
                title="Validate"
                color="#841584"
            />
        </View>;
    }
}
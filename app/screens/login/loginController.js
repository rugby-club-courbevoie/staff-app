"use strict";
import { AsyncStorage } from 'react-native';

const LOGIN_KEY = "RCC_APP_LOGIN";

export function read(onRead) {
    AsyncStorage.getItem(LOGIN_KEY).then((value) => {
        onRead(value ? (credential = JSON.parse(value)) : null);
    }).done();
}

export function save(newCredential) {
    /*fetch('./login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCredential)
    }).then((response) => {
        AsyncStorage.setItem(LOGIN_KEY, JSON.stringify(newCredential));
    }).catch((error) => {
        console.warn(error);
    });*/
    AsyncStorage.setItem(LOGIN_KEY, JSON.stringify(credential = newCredential));
}

export function reset() {
    AsyncStorage.removeItem(LOGIN_KEY, credential = null);
}


export let credential;
import { AsyncStorage } from 'react-native';

const SERVER_KEY = "RCC_APP_SETTINGS";

export let settings;

export function read(onRead) {
    if (!settings) {
        AsyncStorage.getItem(SERVER_KEY, (value) => {
            settings = (value && JSON.parse(value)) || {};           
            onRead(settings);
        });
    }
    else {
        onRead(settings);
    }
}

export function write(newSettings) {
    AsyncStorage.setItem(SERVER_KEY, JSON.stringify(settings = newSettings));
}

export function authenticated() {
    return !!(settings && settings.email && settings.password);
}
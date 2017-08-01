import { AsyncStorage } from 'react-native';

const SERVER_KEY = "RCC_APP_SETTINGS";
const DEFAULT_SERVER = "http://54.213.132.224";

let settings;

export function read(onRead) {
    if (!settings) {
        AsyncStorage.getItem(SERVER_KEY, (value) => {
            settings = (value && JSON.parse(value)) || {};
            settings.server = settings.server || DEFAULT_SERVER;
            onRead(settings);
        });
    }
    else {
        onRead(settings);
    }
}

export function write(newSettings) {
    settings = newSettings;
    AsyncStorage.setItem(SERVER_KEY, JSON.stringify(settings));
}
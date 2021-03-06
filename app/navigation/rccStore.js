import { AsyncStorage } from 'react-native';

const SERVER_KEY = "RCC_APP_SETTINGS";
const DEFAULT_SERVER = "http://54.213.132.224";

class RccStore {
    data = {};
    read(onRead) {
        AsyncStorage.getItem(SERVER_KEY, (error, value) => {
            this.data = value && JSON.parse(value);
            if (!this.data) {
                    this.data = {
                        server: DEFAULT_SERVER
                    };                
            }
            onRead();
        });
    }
    write() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            AsyncStorage.setItem(SERVER_KEY, JSON.stringify(this.data));
        }, 2000);
    }
    get training() {
        if (!this.data.training) {
            this.data.training = {};
        }
        return this.data.training;
    }
    get authenticated() {
        return !!(this.data.email && this.data.password);
    }
}


export const rccStore = new RccStore();
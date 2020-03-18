import { AsyncStorage } from 'react-native';

const SERVER_KEY = "RCC_APP_SETTINGS";
const DEFAULT_SERVER = "http://54.213.132.224";

class Config {
    data = {};
    get modeDebug() {
        return false;
    }
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
    get email() {
        return this.data.email || "";
    }
    set email(value) {
        this.data.email = value;
    }
    get password() {
        return this.data.password || "";
    }
    set password(value) {
        this.data.password = value;
    }
    get server() {
        return this.data.server || "";
    }
    set server(value) {
        this.data.server = value;
    }
    get coachLicense() {
        return this.data.coachLicense || "";
    }
    set coachLicense(value) {
        this.data.coachLicense = value;
    }
    get training() {
        if (!this.data.training) {
            this.data.training = {};
        }
        return this.data.training;
    }
    get authenticated() {
        return !!(this.email && this.password);
    }
}


export const rccConfig = new Config();
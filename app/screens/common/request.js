"use strict";
import { Buffer } from 'buffer';
let settings;

export function setSettings(newSettings) {
    settings = newSettings;
}

function getAuthorization() {
    return "Basic " + (new Buffer(settings.email + ":" + settings.password).toString('base64'));
}

export function get(url, end) {
    send(url, null, end);
}

export function post(url, data, end) {
    let props = {
        method: 'POST'
    };
    if (data) {
        props.body = JSON.stringify(data);
    }
    send(url, props, end);
}
export function put(url, data, end) {
    let props = {
        method: 'PUT'
    };
    if (data) {
        props.body = JSON.stringify(data);
        console.log("PUT"  + props.body);
    }
    send(url, props, end);
}

function send(url, props, end) {
    if (!props) {
        props = {}
    };
    props.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': getAuthorization()
    };
    fetch(settings.server + url, props)
        .then((response) => {
            switch (response.status) {
                case 200:
                    response.json().then((data) =>end(data));
                    break;
                case 401:
                    response.json().then((data) => {
                        end(null, {
                            status: 401,
                            message: data.error
                        });
                    });
                    break;
                default:
                    response.text().then((text) => {
                        console.log("send " + url + ": " + response.status + " body=" + text);
                    });
                    throw new Error("Appel échoué (" + response.status + ") à " + url);
                    break;
            }
        })
        .catch((error) => end(null, error));
}
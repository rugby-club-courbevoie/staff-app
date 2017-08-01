import * as SettingsController from '../settings/settingsController';
import { defined_players } from '../../resource/data/players';
import { Buffer } from 'buffer';

const defined_categories = [
    {
        name: "Cat 2000",
        year1: "2000",
        year2: "2001"
    },
    {
        name: "Cat 2010",
        year1: "2010",
        year2: "2011",
        year3: "2012"
    }
];

export let settings;
const mode_debug = false;

function getAuthorization() {
    let user = "chabal";
    let pwd = "RCC-92400-rocks!";
    return "Basic " + (new Buffer(user + ":" + pwd).toString('base64'));
}
export function fetchCategories(end) {
    SettingsController.read((curSettings) => {
        settings = curSettings;
        if (mode_debug) {
            setTimeout(() => end(defined_categories), 1000);
        }
        else {
            fetch(settings.server + '/categories', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': getAuthorization()
                }
            })
                .then((response) => response.json())
                .then((categories) => end(categories))
                .catch((error) => end(null, error));
        }
    });
}

export function fetchPlayers(params, end) {
    if (mode_debug) {
        setTimeout(() => end(defined_players), 1000);
        return;
    }
    let today = new Date();
    let todayParam = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let url = settings.server + '/participants?event=training'
        + '&date=' + todayParam
        + '&category=' + params.category
        + '&coachLicense=' + params.coachLicense;
    console.log("fetchPlayers" + url);  
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': getAuthorization()
        }
    }).then((response) => response.json())
        .then((players) => end(players))
        .catch((error) => end(null, error));
}

let postTimeOut;
export function postSelection(players, end) {
    clearTimeout(postTimeOut);
    let presents = [];
    for (let player of players) {
        if (player.present) {
            presents.push(player);
        }
    }
    if (mode_debug) {
        setTimeout(() => end(defined_players), 1000);
        return;
    }
    fetch(settings.server + './participants', {
        timeout: 1000,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(presents)
    }).then((response) => {
        end(true)
    })
        .catch((error) => {
            end(null, error)
        });
}
export function filterByYear(year, players) {
    let filtered = [];
    saveSelectedYear(year);
    if (players) {
        for (player of players) {
            console.log(year + JSON.stringify(player));  
            if (player.playerLicense && player.playerLicense.indexOf(year) == 0) {
                filtered.push(player);
            }
        }
    }    
    return filtered;
}

export function getDefaultCategory(categories) {
    let training = settings.training = settings.training || {};
    if (training.category) {
        for (let category of categories) {
            if (training.category == category.name) {
                return category;
            }
        }
    }
    return categories[0];
}
export function getDefaultYear(category) {
    let defYear;
    if (settings.training && settings.training.category) {
        defYear = settings.training.year;
        if (defYear
            && ((defYear == category.year1)
                || (defYear == category.year2)
                || (defYear == category.year3))) {
            return defYear;
        }
    }
    return category.year1;
}
export function saveSelectedCategory(category) {
    let training = settings.training = settings.training || {};
    if (training.category != category) {
        training.category = category.name;
        training.year = getDefaultYear(category);
        SettingsController.write(settings);
    }
    return training.year;
}
function saveSelectedYear(year) {
    let training = settings.training = settings.training || {};
    if (training.year != year) {
        training.year = year;
        SettingsController.write(settings);
    }
}

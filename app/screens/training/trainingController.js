import * as SettingsController from '../common/settingsController';
import * as Request from '../common/request';

export let settings;

export function fetchCategories(end) {
    SettingsController.read((curSettings) => {
        settings = curSettings;
        Request.get('/categories', end);
    });
}

export function fetchPlayers(params, end) {
    let url = '/presences?event=training'
        + '&date=' + new Date().toISOString().substring(0, 10)
        + '&category=' + params.category
        + '&coachLicense=' + params.coachLicense;
    Request.get(url, end);
}

let postTimeOut;

export function postSelection(players, end) {
    clearTimeout(postTimeOut);
    let delta = [];
    for (let player of players) {
        delta.push({
            playerLicense: player.playerLicense,
            date: player.date,
            present: player.present,
            presentStamp: player.presentStamp
        });
    }
    Request.put('/presences', delta, end);
}
export function filterByYear(year, players) {
    let filtered = [];
    saveSelectedYear(year);
    if (players) {
        for (player of players) {
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

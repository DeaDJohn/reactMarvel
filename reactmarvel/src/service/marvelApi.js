import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';

const config = {
    API_PUBLIC: 'e250641ee1d462b8a2a5d68ad58e5869',
    API_PRIVATE: 'dda24246421a52feec1dfc5c5db3b66a7b673bdd',
    BASE_URL: `${window.location.protocol || 'https'}//gateway.marvel.com`
};

export const getCharacters = (currentPage) => {
    const URI = '/v1/public/characters';
    const url = `${config.BASE_URL}${URI}`;
    const timeStamp = moment().unix();
    const offset = (currentPage > 1) ? 21 * currentPage : 0;
    console.log(offset);
    const queryParams = {
        ts: timeStamp,
        apikey: config.API_PUBLIC,
        hash: CryptoJS.MD5(timeStamp + config.API_PRIVATE + config.API_PUBLIC).toString(CryptoJS.enc.Hex),
        limit: 21,
        offset: offset
    };

    return axios
        .get(url, { params: queryParams })
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
};


export const getCharacterInfo = (characterId = null) => {
    if (characterId) {
        const URI = '/v1/public/characters';
        const url = `${config.BASE_URL}${URI}/${characterId}`;
        const timeStamp = moment().unix();

        const queryParams = {
            ts: timeStamp,
            apikey: config.API_PUBLIC,
            hash: CryptoJS.MD5(timeStamp + config.API_PRIVATE + config.API_PUBLIC).toString(CryptoJS.enc.Hex)
        };

        return axios
            .get(url, { params: queryParams })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    }
    return Promise.reject({ message: 'characterId is not defined' });
};

export const getComics = (currentPage) => {
    const URI = '/v1/public/comics';
    const url = `${config.BASE_URL}${URI}`;
    const timeStamp = moment().unix();
    const offset = (currentPage > 1) ? 21 * currentPage : 0;
    const queryParams = {
        ts: timeStamp,
        apikey: config.API_PUBLIC,
        hash: CryptoJS.MD5(timeStamp + config.API_PRIVATE + config.API_PUBLIC).toString(CryptoJS.enc.Hex),
        limit: 21,
        offset: offset
    };

    return axios
        .get(url, { params: queryParams })
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
};

export const getComicInfo = (comicId = null) => {
    if (comicId) {
        const URI = '/v1/public/comics';
        const url = `${config.BASE_URL}${URI}/${comicId}`;
        const timeStamp = moment().unix();

        const queryParams = {
            ts: timeStamp,
            apikey: config.API_PUBLIC,
            hash: CryptoJS.MD5(timeStamp + config.API_PRIVATE + config.API_PUBLIC).toString(CryptoJS.enc.Hex)
        };

        return axios
            .get(url, { params: queryParams })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    }
    return Promise.reject({ message: 'characterId is not defined' });
};

export const getComicsByCharacters = (heroeId = null) => {

    const URI = '/v1/public/characters/';
    const url = `${config.BASE_URL}${URI}${heroeId}/comics`;
    const timeStamp = moment().unix();
    const queryParams = {
        ts: timeStamp,
        apikey: config.API_PUBLIC,
        hash: CryptoJS.MD5(timeStamp + config.API_PRIVATE + config.API_PUBLIC).toString(CryptoJS.enc.Hex),
        limit: 21,
    };

    return axios
        .get(url, { params: queryParams })
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
};

export const getSeriesByCharacters = (heroeId = null) => {

    const URI = '/v1/public/characters/';
    const url = `${config.BASE_URL}${URI}${heroeId}/series`;
    const timeStamp = moment().unix();
    const queryParams = {
        ts: timeStamp,
        apikey: config.API_PUBLIC,
        hash: CryptoJS.MD5(timeStamp + config.API_PRIVATE + config.API_PUBLIC).toString(CryptoJS.enc.Hex),
        limit: 21,
    };

    return axios
        .get(url, { params: queryParams })
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
};

export const getStoriesByCharacters = (heroeId = null) => {

    const URI = '/v1/public/characters/';
    const url = `${config.BASE_URL}${URI}${heroeId}/stories`;
    const timeStamp = moment().unix();
    const queryParams = {
        ts: timeStamp,
        apikey: config.API_PUBLIC,
        hash: CryptoJS.MD5(timeStamp + config.API_PRIVATE + config.API_PUBLIC).toString(CryptoJS.enc.Hex),
        limit: 21,
    };

    return axios
        .get(url, { params: queryParams })
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
};
export const getEventsByCharacters = (heroeId = null) => {

    const URI = '/v1/public/characters/';
    const url = `${config.BASE_URL}${URI}${heroeId}/events`;
    const timeStamp = moment().unix();
    const queryParams = {
        ts: timeStamp,
        apikey: config.API_PUBLIC,
        hash: CryptoJS.MD5(timeStamp + config.API_PRIVATE + config.API_PUBLIC).toString(CryptoJS.enc.Hex),
        limit: 21,
    };

    return axios
        .get(url, { params: queryParams })
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
};

export const getCreatorsByUrl = (creatorUrl = null) => {

    const url = creatorUrl;
    const timeStamp = moment().unix();
    const queryParams = {
        ts: timeStamp,
        apikey: config.API_PUBLIC,
        hash: CryptoJS.MD5(timeStamp + config.API_PRIVATE + config.API_PUBLIC).toString(CryptoJS.enc.Hex),
        limit: 21,
    };

    return axios
        .get(url, { params: queryParams })
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
};

export const getEvents = (currentPage) => {
    const URI = '/v1/public/events';
    const url = `${config.BASE_URL}${URI}`;
    const timeStamp = moment().unix();
    const offset = (currentPage > 1) ? 21 * currentPage : 0;
    const queryParams = {
        ts: timeStamp,
        apikey: config.API_PUBLIC,
        hash: CryptoJS.MD5(timeStamp + config.API_PRIVATE + config.API_PUBLIC).toString(CryptoJS.enc.Hex),
        limit: 21,
        offset: offset
    };

    return axios
        .get(url, { params: queryParams })
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
};

export const getEventsInfo = (eventoid = null) => {
    if (eventoid) {
        const URI = '/v1/public/events';
        const url = `${config.BASE_URL}${URI}/${eventoid}`;
        const timeStamp = moment().unix();

        const queryParams = {
            ts: timeStamp,
            apikey: config.API_PUBLIC,
            hash: CryptoJS.MD5(timeStamp + config.API_PRIVATE + config.API_PUBLIC).toString(CryptoJS.enc.Hex)
        };

        return axios
            .get(url, { params: queryParams })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    }
    return Promise.reject({ message: 'characterId is not defined' });
};
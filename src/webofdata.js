"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('isomorphic-form-data');
class WebOfDataClient {
    constructor(_serviceUrl) {
        this._serviceUrl = _serviceUrl;
    }
    setStoreId(storeId) {
        this._storeId = storeId;
    }
    getJwt() {
        return this._jwtToken;
    }
    setJwt(jwt) {
        this._jwtToken = jwt;
    }
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    getJwtFromCookie() {
        let authCookie = this.getCookie("Authorization");
        if (authCookie && authCookie.startsWith("Bearer")) {
            this._jwtToken = authCookie.substring(7);
        }
    }
    getBaseHeaders() {
        return { "Authorization": "Bearer " + this._jwtToken };
    }
    async getStores() {
        try {
            let url = this._serviceUrl + "stores";
            let response = await fetch(url, { headers: this.getBaseHeaders() });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                let stores = await response.json();
                return stores;
            }
            else {
                throw new Error("Error getting stores. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to get stores");
        }
    }
    async createStore(name, storeEntity) {
        try {
            let url = this._serviceUrl + "stores";
            let createStoreRequestBody = { name: name, storeEntity: storeEntity };
            let headers = this.getBaseHeaders();
            headers['Content-Type'] = 'application/json';
            let response = await fetch(url, { method: "post", headers: headers, body: JSON.stringify(createStoreRequestBody) });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 201) {
                let store = await response.json();
                return store;
            }
            else {
                throw new Error("Error creating store. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to create store");
        }
    }
    async deleteStore(name) {
        try {
            let url = this._serviceUrl + "stores/" + name;
            let headers = this.getBaseHeaders();
            let response = await fetch(url, { method: "delete" });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                return;
            }
            else {
                throw new Error("Error deleting store. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to delete ark");
        }
    }
}
exports.WebOfDataClient = WebOfDataClient;

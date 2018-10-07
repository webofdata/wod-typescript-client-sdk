"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('isomorphic-form-data');
class QueryResponse {
}
exports.QueryResponse = QueryResponse;
class GetEntitiesResponse {
}
exports.GetEntitiesResponse = GetEntitiesResponse;
class GetChangesResponse {
}
exports.GetChangesResponse = GetChangesResponse;
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
            throw new Error("Unable to delete store");
        }
    }
    async UpdateStore(name, storeEntity) {
        try {
            let url = this._serviceUrl + "stores/" + name;
            let headers = this.getBaseHeaders();
            headers['Content-Type'] = 'application/json';
            let response = await fetch(url, { method: "put", headers: headers, body: JSON.stringify(storeEntity) });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                return;
            }
            else {
                throw new Error("Error updating store. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to update store");
        }
    }
    async GetStore(storeName) {
        try {
            let url = this._serviceUrl + "stores/" + name;
            let headers = this.getBaseHeaders();
            let response = await fetch(url, { method: "get", headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                let store = await response.json();
                return store;
            }
            else {
                throw new Error("Error getting store. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to get store");
        }
    }
    async GetDatasets(storeName) {
        try {
            let url = this._serviceUrl + "stores/" + storeName + "/datasets";
            let headers = this.getBaseHeaders();
            let response = await fetch(url, { method: "get", headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                let datasets = await response.json();
                return datasets;
            }
            else {
                throw new Error("Error getting datasets. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to get datasets");
        }
    }
    async GetDataset(storeName, datasetName) {
        try {
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName;
            let headers = this.getBaseHeaders();
            let response = await fetch(url, { method: "get", headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                let dataset = await response.json();
                return dataset;
            }
            else {
                throw new Error("Error getting dataset. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to get dataset");
        }
    }
    async CreateDataset(storeName, datasetName, datasetEntity) {
        try {
            let url = this._serviceUrl + "stores/" + storeName + "/datasets";
            let createDatasetRequestBody = { name: datasetName, entity: datasetEntity };
            let headers = this.getBaseHeaders();
            headers['Content-Type'] = 'application/json';
            let response = await fetch(url, { method: "post", headers: headers, body: JSON.stringify(createDatasetRequestBody) });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 201) {
                let dataset = await response.json();
                return dataset;
            }
            else {
                throw new Error("Error creating dataset. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to create dataset");
        }
    }
    async UpdateDataset(storeName, datasetName, datasetEntity) {
        try {
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName;
            let headers = this.getBaseHeaders();
            headers['Content-Type'] = 'application/json';
            let response = await fetch(url, { method: "put", headers: headers, body: JSON.stringify(datasetEntity) });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                return;
            }
            else {
                throw new Error("Error updating dataset. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to update dataset");
        }
    }
    async DeleteDataset(storeName, datasetName) {
        try {
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName;
            let headers = this.getBaseHeaders();
            let response = await fetch(url, { method: "delete", headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                return;
            }
            else {
                throw new Error("Error deleting dataset. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to delete dataset");
        }
    }
    async DeleteDatasetEntities(storeName, datasetName) {
        try {
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName + "/entities";
            let headers = this.getBaseHeaders();
            let response = await fetch(url, { method: "delete", headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                return;
            }
            else {
                throw new Error("Error deleting dataset. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to delete dataset");
        }
    }
    async GetEntities(storeName, datasetName, nextDataToken, take) {
        try {
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName + "/entities";
            if (nextDataToken != null) {
                url += "?token=" + nextDataToken + "&take=" + take;
            }
            else {
                url += "?take=" + take;
            }
            let headers = this.getBaseHeaders();
            let response = await fetch(url, { method: "get", headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                let responseJson = await response.json();
                console.log(responseJson);
                // loop and build result object
                let result = new GetEntitiesResponse();
                result.context = responseJson[0]; // maybe add a check here.
                let lastEntity = responseJson[responseJson.length - 1];
                if (lastEntity["@id"] === "@continuation") {
                    result.next_data_token = lastEntity["wod:next-data"];
                    result.data = responseJson.slice(1, responseJson.length - 1);
                }
                else {
                    result.data = responseJson.slice(1, responseJson.length);
                    console.log(result.data);
                }
                return result;
            }
            else {
                throw new Error("Error getting entities. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to get entities");
        }
    }
    async GetEntitiesPartitions(storeName, datasetName, partitionCount) {
        try {
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName + "/entities/partitions";
            let headers = this.getBaseHeaders();
            let response = await fetch(url, { method: "get", headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                let result = await response.json();
                return result;
            }
            else {
                throw new Error("Error getting entity partitions. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to get entity partitions");
        }
    }
    async GetChangesPartitions(storeName, datasetName, partitionCount) {
        try {
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName + "/changes/partitions?count=" + partitionCount;
            let headers = this.getBaseHeaders();
            let response = await fetch(url, { method: "get", headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                let result = await response.json();
                return result;
            }
            else {
                throw new Error("Error getting changes partitions. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to get changes partitions");
        }
    }
    async GetChanges(storeName, datasetName, nextDataToken, take) {
        try {
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName + "/changes";
            if (nextDataToken != null) {
                url += "?token=" + nextDataToken + "&take=" + take;
            }
            else {
                url += "?take=" + take;
            }
            let headers = this.getBaseHeaders();
            let response = await fetch(url, { method: "get", headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                let responseJson = await response.json();
                console.log(responseJson);
                // loop and build result object
                let result = new GetChangesResponse();
                result.context = responseJson[0]; // maybe add a check here.
                let lastEntity = responseJson[responseJson.length - 1];
                if (lastEntity["@id"] === "@continuation") {
                    result.next_data_token = lastEntity["wod:next-data"];
                    result.data = responseJson.slice(1, responseJson.length - 1);
                }
                else {
                    result.data = responseJson.slice(1, responseJson.length);
                    console.log(result.data);
                }
                return result;
            }
            else {
                throw new Error("Error getting changes. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to get changes");
        }
    }
    async UpdateEntities(storeName, datasetName, entities) {
        try {
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName + "/entities";
            let headers = this.getBaseHeaders();
            headers['Content-Type'] = 'application/json';
            let response = await fetch(url, { method: "post", headers: headers, body: JSON.stringify(entities) });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                return;
            }
            else {
                throw new Error("Error updating dataset entities. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            throw new Error("Unable to update dataset entities");
        }
    }
    async GetEntity(storeName, subjectIdentifier, datasets) {
        try {
            let url = this._serviceUrl + "stores/" + storeName + "/query?subject=" + subjectIdentifier;
            for (let ds in datasets) {
                url += "&dataset=" + ds;
            }
            let headers = this.getBaseHeaders();
            let response = await fetch(url, { method: "get", headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                let responseJson = await response.json();
                let result = new QueryResponse();
                result.context = responseJson[0]; // maybe add a check here.
                result.data = [];
                result.data.push(responseJson[1]);
                return result;
            }
            else {
                throw new Error("Error getting changes. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to get changes");
        }
    }
    async GetRelatedEntities(storeName, subjectIdentifier, property, inverse, datasets) {
        try {
            let url = this._serviceUrl + "stores/" + storeName + "/query?subject=" + subjectIdentifier;
            for (let ds in datasets) {
                url += "&dataset=" + ds;
            }
            let headers = this.getBaseHeaders();
            let response = await fetch(url, { method: "get", headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            }
            else if (response.status == 200) {
                let responseJson = await response.json();
                let result = new QueryResponse();
                result.context = responseJson[0]; // maybe add a check here.
                result.data = [];
                result.data.push(responseJson[1]);
                return result;
            }
            else {
                throw new Error("Error getting changes. Code: " + response.status + " : " + response.statusText);
            }
        }
        catch (err) {
            console.log(err.message);
            throw new Error("Unable to get changes");
        }
    }
}
exports.WebOfDataClient = WebOfDataClient;

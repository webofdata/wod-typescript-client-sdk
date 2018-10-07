
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('isomorphic-form-data');

export interface IStore {
    name: string;
    entity: Object;
}

export interface IDataset {
    name: string;    
    entity: Object;
}

export class QueryResponse {
    next_data_token: string;
    data: Array<Object>;
    context: Object;
}

export class GetEntitiesResponse {
    next_data_token: string;
    data: Array<Object>;
    context: Object;
}

export class GetChangesResponse {
    next_data_token: string;
    data: Array<Object>;
    context: Object;
}

export class WebOfDataClient {

    private _jwtToken: string; // used when talking to secure services
    private _storeId: string // can be set after retrieving stores

    constructor(private _serviceUrl : string) {}

    public setStoreId(storeId: string) {
        this._storeId = storeId;
    }

    public getJwt() : string {
        return this._jwtToken;
    }

    public setJwt(jwt: string) {
        this._jwtToken = jwt;
    }

    private getBaseHeaders() {
        return { "Authorization" : "Bearer " + this._jwtToken};
    }
    
    public async getStores(): Promise<Array<IStore>> {
        try{
            let url = this._serviceUrl + "stores"; 
            let response: Response = await fetch(url, { headers: this.getBaseHeaders() });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {
                let stores: Array<IStore> = await response.json();
                return stores;    
            } else {
                throw new Error("Error getting stores. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to get stores");
        }
    }

    public async createStore(name:string, storeEntity:object) : Promise<IStore> {
        try{
            let url = this._serviceUrl + "stores";
            let createStoreRequestBody = { name: name, storeEntity: storeEntity };

            let headers = this.getBaseHeaders();
            headers['Content-Type'] =  'application/json';
            let response: Response = await fetch(url, {method: "post" , headers: headers, body: JSON.stringify(createStoreRequestBody) });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 201) {
                let store = <IStore> await response.json();
                return store;    
            } else {
                throw new Error("Error creating store. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to create store");
        }
    }

    public async deleteStore(name: string) {
        try{
            let url = this._serviceUrl + "stores/" + name;
            let headers = this.getBaseHeaders();
            let response: Response = await fetch(url, {method: "delete" });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {                
                return;    
            } else {
                throw new Error("Error deleting store. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to delete store");
        }
    }

    public async UpdateStore(name: string, storeEntity: Object) {
        try{
            let url = this._serviceUrl + "stores/" + name;
            let headers = this.getBaseHeaders();
            headers['Content-Type'] =  'application/json';
            let response: Response = await fetch(url, {method: "put" , headers: headers, body: JSON.stringify(storeEntity) });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {
                return;    
            } else {
                throw new Error("Error updating store. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to update store");
        }
    }

    public async GetStore(storeName:string) : Promise<IStore> {
        try{
            let url = this._serviceUrl + "stores/" + name;
            let headers = this.getBaseHeaders();
            let response: Response = await fetch(url, {method: "get" , headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {
                let store = <IStore> await response.json();
                return store;        
            } else {
                throw new Error("Error getting store. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to get store");
        }
    }

    public async GetDatasets(storeName: string) : Promise<Array<IDataset>> {
        try{
            let url = this._serviceUrl + "stores/" + storeName + "/datasets";
            let headers = this.getBaseHeaders();
            let response: Response = await fetch(url, {method: "get" , headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {
                let datasets = <Array<IDataset>> await response.json();
                return datasets;        
            } else {
                throw new Error("Error getting datasets. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to get datasets");
        }
    }

    public async GetDataset(storeName:string, datasetName: string) : Promise<IDataset> {
        try{
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName;
            let headers = this.getBaseHeaders();
            let response: Response = await fetch(url, {method: "get" , headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {
                let dataset = <IDataset> await response.json();
                return dataset;        
            } else {
                throw new Error("Error getting dataset. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to get dataset");
        }    
    }

    public async CreateDataset(storeName: string, datasetName: string, datasetEntity: Object) : Promise<IDataset> {
        try{
            let url = this._serviceUrl + "stores/" + storeName + "/datasets";
            let createDatasetRequestBody = { name: datasetName, entity: datasetEntity };

            let headers = this.getBaseHeaders();
            headers['Content-Type'] =  'application/json';
            let response: Response = await fetch(url, {method: "post" , headers: headers, body: JSON.stringify(createDatasetRequestBody) });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 201) {
                let dataset = <IDataset> await response.json();
                return dataset;    
            } else {
                throw new Error("Error creating dataset. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to create dataset");
        }
    }

    public async UpdateDataset(storeName:string, datasetName: string, datasetEntity: Object) {
        try{
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName;
            let headers = this.getBaseHeaders();
            headers['Content-Type'] =  'application/json';
            let response: Response = await fetch(url, {method: "put" , headers: headers, body: JSON.stringify(datasetEntity) });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {
                return;    
            } else {
                throw new Error("Error updating dataset. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to update dataset");
        }
    }

    public async DeleteDataset(storeName:string, datasetName:string) {
        try{
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName;
            let headers = this.getBaseHeaders();
            let response: Response = await fetch(url, {method: "delete", headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {                
                return;    
            } else {
                throw new Error("Error deleting dataset. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to delete dataset");
        }
    }

    public async DeleteDatasetEntities(storeName:string, datasetName:string) {
        try{
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName + "/entities";
            let headers = this.getBaseHeaders();
            let response: Response = await fetch(url, {method: "delete", headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {                
                return;    
            } else {
                throw new Error("Error deleting dataset. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to delete dataset");
        }
    }

    public async GetEntities(storeName: string, datasetName:string, nextDataToken: string, take: number) : Promise<GetEntitiesResponse> {
        try{
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName + "/entities";

            if (nextDataToken != null) {
                url += "?token=" + nextDataToken + "&take=" + take;
            } else {
                url += "?take=" + take;
            }

            let headers = this.getBaseHeaders();
            let response: Response = await fetch(url, {method: "get" , headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {
                let responseJson = <Array<Object>> await response.json();
                console.log(responseJson);
                
                // loop and build result object
                let result = new GetEntitiesResponse();
                result.context = responseJson[0]; // maybe add a check here.

                let lastEntity = responseJson[responseJson.length - 1];
                if (lastEntity["@id"] === "@continuation") {
                    result.next_data_token = lastEntity["wod:next-data"];
                    result.data = responseJson.slice(1, responseJson.length - 1);
                } else {
                    result.data = responseJson.slice(1, responseJson.length);
                    console.log(result.data);
                }

                return result;
            } else {
                throw new Error("Error getting entities. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to get entities");
        }    
    }

    public async GetEntitiesPartitions(storeName: string, datasetName:string, partitionCount: number) : Promise<Array<string>> {
        try{
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName + "/entities/partitions";
            let headers = this.getBaseHeaders();
            let response: Response = await fetch(url, {method: "get" , headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {
                let result = <Array<string>> await response.json();                
                return result;
            } else {
                throw new Error("Error getting entity partitions. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to get entity partitions");
        }    
    }

    public async GetChangesPartitions(storeName: string, datasetName:string, partitionCount: number) : Promise<Array<string>> {
        try{
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName + "/changes/partitions?count=" + partitionCount;
            let headers = this.getBaseHeaders();
            let response: Response = await fetch(url, {method: "get" , headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {
                let result = <Array<string>> await response.json();                
                return result;
            } else {
                throw new Error("Error getting changes partitions. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to get changes partitions");
        }    
    }

    public async GetChanges(storeName: string, datasetName:string, nextDataToken: string, take: number) : Promise<GetChangesResponse> {
        try{
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName + "/changes";

            if (nextDataToken != null) {
                url += "?token=" + nextDataToken + "&take=" + take;
            } else {
                url += "?take=" + take;
            }

            let headers = this.getBaseHeaders();
            let response: Response = await fetch(url, {method: "get" , headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {
                let responseJson = <Array<Object>> await response.json();
                console.log(responseJson);
                
                // loop and build result object
                let result = new GetChangesResponse();
                result.context = responseJson[0]; // maybe add a check here.

                let lastEntity = responseJson[responseJson.length - 1];
                if (lastEntity["@id"] === "@continuation") {
                    result.next_data_token = lastEntity["wod:next-data"];
                    result.data = responseJson.slice(1, responseJson.length - 1);
                } else {
                    result.data = responseJson.slice(1, responseJson.length);
                    console.log(result.data);
                }

                return result;
            } else {
                throw new Error("Error getting changes. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to get changes");
        }    
    }

    public async UpdateEntities(storeName: string, datasetName: string, entities: Array<Object>) {
        try{
            let url = this._serviceUrl + "stores/" + storeName + "/datasets/" + datasetName + "/entities";
            let headers = this.getBaseHeaders();
            headers['Content-Type'] =  'application/json';
            let response: Response = await fetch(url, {method: "post" , headers: headers, body: JSON.stringify(entities) });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {
                return;    
            } else {
                throw new Error("Error updating dataset entities. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            throw new Error("Unable to update dataset entities");
        }
    }

    public async GetEntity(storeName: string, subjectIdentifier: string, datasets: Array<string>) : Promise<QueryResponse>
    {
        try{
            let url = this._serviceUrl + "stores/" + storeName + "/query?subject=" + subjectIdentifier;

            for (let ds in datasets) {
                url += "&dataset=" + ds;
            }

            let headers = this.getBaseHeaders();
            let response: Response = await fetch(url, {method: "get" , headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {
                let responseJson = <Array<Object>> await response.json();
                
                let result = new QueryResponse();
                result.context = responseJson[0]; // maybe add a check here.
                result.data = [];
                result.data.push(responseJson[1]);
                return result;
            } else {
                throw new Error("Error getting changes. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to get changes");
        } 
    }

    public async GetRelatedEntities(storeName: string, subjectIdentifier: string, property:string, inverse: boolean, datasets: Array<string>) : Promise<QueryResponse>
    {
        try{
            let url = this._serviceUrl + "stores/" + storeName + "/query?subject=" + subjectIdentifier;

            for (let ds in datasets) {
                url += "&dataset=" + ds;
            }

            let headers = this.getBaseHeaders();
            let response: Response = await fetch(url, {method: "get" , headers: headers });
            if (response.status == 401) {
                throw new Error("Not Authorised");
            } else if (response.status == 200) {
                let responseJson = <Array<Object>> await response.json();
                
                let result = new QueryResponse();
                result.context = responseJson[0]; // maybe add a check here.
                result.data = [];
                result.data.push(responseJson[1]);
                return result;
            } else {
                throw new Error("Error getting changes. Code: " + response.status + " : " + response.statusText);
            }
        } catch (err) {
            console.log(err.message);
            throw new Error("Unable to get changes");
        } 
    }

}

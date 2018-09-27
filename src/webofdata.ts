
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('isomorphic-form-data');

export interface IStore {
    name: string;
}

export interface IDataset {
    name: string;    
}

export interface IEntity
{
    id: string;
    deleted: boolean;    
}

export interface NamespaceContext {

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

    private getCookie(cname : string) {
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

    public getJwtFromCookie() {
        let authCookie = this.getCookie("Authorization");
        if (authCookie && authCookie.startsWith("Bearer")) {
            this._jwtToken = authCookie.substring(7);
        }
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
            throw new Error("Unable to get stores")
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
            throw new Error("Unable to create store")
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
            throw new Error("Unable to delete ark")
        }
    }
}


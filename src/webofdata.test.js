"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const assert = require("assert");
const wod = require("./webofdata");
const gen = require("uuid");
var fs = require('fs');
chai_1.should();
describe('WebOfData Test Suite', function () {
    it('Can create new client', function () {
        const result = new wod.WebOfDataClient("http://localhost:8888/");
        assert.ok(result != null);
    });
    it('Can get stores', async function () {
        let client = new wod.WebOfDataClient("http://localhost:8888/");
        let stores = await client.getStores();
        assert.ok(stores != null);
    });
    it('Can create new store', async function () {
        let client = new wod.WebOfDataClient("http://localhost:8888/");
        let storeName = gen.v1();
        let store = await client.createStore(storeName, null);
        assert.ok(store != null);
        assert.ok(store.name == storeName);
    });
    it('Can create new dataset', async function () {
        let client = new wod.WebOfDataClient("http://localhost:8888/");
        let storeName = gen.v1();
        let store = await client.createStore(storeName, null);
        assert.ok(store != null);
        assert.ok(store.name == storeName);
        let dataset = await client.CreateDataset(storeName, "people", null);
        assert.ok(dataset != null);
        assert.ok(dataset.name == "people");
    });
    it('Can store entities in dataset', async function () {
        let client = new wod.WebOfDataClient("http://localhost:8888/");
        let storeName = gen.v1();
        let store = await client.createStore(storeName, null);
        assert.ok(store != null);
        assert.ok(store.name == storeName);
        let dataset = await client.CreateDataset(storeName, "people", null);
        assert.ok(dataset != null);
        assert.ok(dataset.name == "people");
        let data = [
            { "@id": "@context", "namespaces": { "_": "http://data.wedbofdata.io/testing/" } },
            { "@id": "gra", "name": "graham moore" }
        ];
        await client.UpdateEntities(storeName, "people", data);
    });
    it('Can get entities from dataset', async function () {
        let client = new wod.WebOfDataClient("http://localhost:8888/");
        let storeName = gen.v1();
        let store = await client.createStore(storeName, null);
        assert.ok(store != null);
        assert.ok(store.name == storeName);
        let dataset = await client.CreateDataset(storeName, "people", null);
        assert.ok(dataset != null);
        assert.ok(dataset.name == "people");
        let data = [
            { "@id": "@context", "namespaces": { "_": "http://data.wedbofdata.io/testing/" } },
            { "@id": "gra", "name": "graham moore" },
            { "@id": "bob", "name": "bobby moore" },
            { "@id": "kal", "name": "kal" }
        ];
        await client.UpdateEntities(storeName, "people", data);
        let entities = await client.GetEntities(storeName, "people", null, -1);
        assert.ok(entities.context != null);
        assert.ok(entities.data.length == 3);
    });
    it('Can get paged entities from dataset', async function () {
        let client = new wod.WebOfDataClient("http://localhost:8888/");
        let storeName = gen.v1();
        let store = await client.createStore(storeName, null);
        assert.ok(store != null);
        assert.ok(store.name == storeName);
        let dataset = await client.CreateDataset(storeName, "people", null);
        assert.ok(dataset != null);
        assert.ok(dataset.name == "people");
        let data = [
            { "@id": "@context", "namespaces": { "_": "http://data.wedbofdata.io/testing/" } },
            { "@id": "gra", "name": "graham moore" },
            { "@id": "bob", "name": "bobby moore" },
            { "@id": "kal", "name": "kal" }
        ];
        await client.UpdateEntities(storeName, "people", data);
        let entities = await client.GetEntities(storeName, "people", null, 1);
        assert.ok(entities.context != null);
        assert.ok(entities.data.length == 1);
        entities = await client.GetEntities(storeName, "people", entities.next_data_token, 1);
        assert.ok(entities.context != null);
        assert.ok(entities.data.length == 1);
        entities = await client.GetEntities(storeName, "people", entities.next_data_token, 1);
        assert.ok(entities.context != null);
        assert.ok(entities.data.length == 1);
        entities = await client.GetEntities(storeName, "people", entities.next_data_token, 1);
        assert.ok(entities.context != null);
        assert.ok(entities.data.length == 0);
    });
    it('Can get paged entities from dataset in parallel', async function () {
        let client = new wod.WebOfDataClient("http://localhost:8888/");
        let storeName = gen.v1();
        let store = await client.createStore(storeName, null);
        assert.ok(store != null);
        assert.ok(store.name == storeName);
        let dataset = await client.CreateDataset(storeName, "people", null);
        assert.ok(dataset != null);
        assert.ok(dataset.name == "people");
        let data = [
            { "@id": "@context", "namespaces": { "_": "http://data.wedbofdata.io/testing/" } },
            { "@id": "gra", "name": "graham moore" },
            { "@id": "bob", "name": "bobby moore" },
            { "@id": "kal", "name": "kal" }
        ];
        await client.UpdateEntities(storeName, "people", data);
        let partitions = await client.GetEntitiesPartitions(storeName, "people", 4);
        assert.ok(4 == partitions.length);
        let partitionOneEntities = await client.GetEntities(storeName, "people", partitions[0], -1);
        assert.ok(partitionOneEntities.context != null);
        assert.ok(partitionOneEntities.data.length == 1);
        let partitionTwoEntities = await client.GetEntities(storeName, "people", partitions[1], -1);
        assert.ok(partitionTwoEntities.context != null);
        assert.ok(partitionTwoEntities.data.length == 1);
        let partitionThreeEntities = await client.GetEntities(storeName, "people", partitions[2], -1);
        assert.ok(partitionThreeEntities.context != null);
        assert.ok(partitionThreeEntities.data.length == 1);
        let partitionFourEntities = await client.GetEntities(storeName, "people", partitions[3], -1);
        assert.ok(partitionFourEntities.context != null);
        assert.ok(partitionFourEntities.data.length == 0);
    });
    it('Can get changes from dataset', async function () {
        let client = new wod.WebOfDataClient("http://localhost:8888/");
        let storeName = gen.v1();
        let store = await client.createStore(storeName, null);
        assert.ok(store != null);
        assert.ok(store.name == storeName);
        let dataset = await client.CreateDataset(storeName, "people", null);
        assert.ok(dataset != null);
        assert.ok(dataset.name == "people");
        let data = [
            { "@id": "@context", "namespaces": { "_": "http://data.wedbofdata.io/testing/" } },
            { "@id": "gra", "name": "graham moore" },
            { "@id": "bob", "name": "bobby moore" },
            { "@id": "kal", "name": "kal" }
        ];
        await client.UpdateEntities(storeName, "people", data);
        let entities = await client.GetChanges(storeName, "people", null, -1);
        assert.ok(entities.context != null);
        assert.ok(entities.data.length == 3);
    });
    it('Can get pages of changes from dataset', async function () {
        let client = new wod.WebOfDataClient("http://localhost:8888/");
        let storeName = gen.v1();
        let store = await client.createStore(storeName, null);
        assert.ok(store != null);
        assert.ok(store.name == storeName);
        let dataset = await client.CreateDataset(storeName, "people", null);
        assert.ok(dataset != null);
        assert.ok(dataset.name == "people");
        let data = [
            { "@id": "@context", "namespaces": { "_": "http://data.wedbofdata.io/testing/" } },
            { "@id": "gra", "name": "graham moore" },
            { "@id": "bob", "name": "bobby moore" },
            { "@id": "kal", "name": "kal" }
        ];
        await client.UpdateEntities(storeName, "people", data);
        let entities = await client.GetChanges(storeName, "people", null, 1);
        assert.ok(entities.context != null);
        assert.ok(entities.data.length == 1);
        entities = await client.GetChanges(storeName, "people", entities.next_data_token, 1);
        assert.ok(entities.context != null);
        assert.ok(entities.data.length == 1);
        entities = await client.GetChanges(storeName, "people", entities.next_data_token, 1);
        assert.ok(entities.context != null);
        assert.ok(entities.data.length == 1);
        entities = await client.GetChanges(storeName, "people", entities.next_data_token, 1);
        assert.ok(entities.context != null);
        assert.ok(entities.data.length == 0);
        data =
            [
                { "@id": "@context", "namespaces": { "_": "http://data.wedbofdata.io/testing/" } },
                { "@id": "gra", "name": "graham david moore" },
                { "@id": "kal", "name": "kal" }
            ];
        await client.UpdateEntities(storeName, "people", data);
        entities = await client.GetChanges(storeName, "people", entities.next_data_token, 2);
        assert.ok(entities.context != null);
        assert.ok(entities.data.length == 1);
    });
});

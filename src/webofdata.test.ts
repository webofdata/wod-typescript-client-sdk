import { should } from 'chai';
import * as assert from 'assert';
import * as wod from './webofdata';
import * as gen from 'uuid';
var fs = require('fs');

should();

describe('WebOfData Test Suite', function() {

  it('Can create new client', function() {
    const result = new wod.WebOfDataClient("http://localhost:8888/");
    assert.ok(result != null);
  });

  it('Can get stores', async function() {
    let client = new wod.WebOfDataClient("http://localhost:8888/");
    let stores = await client.getStores();
    assert.ok(stores != null);
  });

  it('Can create new store', async function() {
    let client = new wod.WebOfDataClient("http://localhost:8888/");
    let storeName = gen.v1();
    let store = await client.createStore(storeName, null);
    assert.ok(store != null);
    assert.ok(store.name == storeName);
  });

  it('Can create new dataset', async function() {
    let client = new wod.WebOfDataClient("http://localhost:8888/");
    let storeName = gen.v1();
    let store = await client.createStore(storeName, null);
    assert.ok(store != null);
    assert.ok(store.name == storeName);
  });


});

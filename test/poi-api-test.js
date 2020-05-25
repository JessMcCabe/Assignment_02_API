'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('POI API tests', function () {

    let pois = fixtures.pois;
    let newPOI = fixtures.newPoi;
    let newPOIWithAuthor = fixtures.newPoiWithAuthor;
    let id = "5eca9b446ddd3a0740738bb0"

    const poiService = new PoiService(fixtures.poiService);

    setup(async function () {
        await poiService.deleteAllPOIs();
    });

    teardown(async function () {
        await poiService.deleteAllPOIs();
    });

    test('create a poi', async function () {
        const returnedPOI = await poiService.submitPoi(id, newPOI);
        assert(_.some([returnedPOI], newPOI), 'returnedPOI must be a superset of newPOI');
        assert.isDefined(returnedPOI._id);
    });

    test('get poi', async function () {
        const p1 = await poiService.submitPoi(id, newPOIWithAuthor);
        const p2 = await poiService.findByID(p1._id);
        assert.deepEqual(p1, p2);
    });

    //test('get invalid poi', async function () {
      //  const p1 = await poiService.findByAuthor('1234');
      //  assert.isNull(u1);
      //  const p2 = await poiService.findByAuthor('012345678901234567890123');
       // assert.isNull(p2);
    //});


    test('delete a poi', async function () {
        let p = await poiService.submitPoi(id, newPOI);
        assert(p._id != null);
        await poiService.deleteOnePOI(p._id);
        let p2 = await poiService.findByID(p._id);
        assert(p2 == null);
    });

    test('get all pois', async function () {
        for (let p of pois) {
            await poiService.submitPoi(id, p);
        }

        const allPOIs = await poiService.findAll();
        assert.equal(allPOIs.length, pois.length);
    });

    test('get poi detail', async function () {
        for (let p of pois) {
            await poiService.submitPoi(id, p);
        }

        const allPOIs = await poiService.findAll();
        for (var i = 0; i < pois.length; i++) {
            assert(_.some([allPOIs[i]], pois[i]), 'returnedPoi must be a superset of newPOI');
        }
    });

    test('get all pois empty', async function () {
        const allPOIs = await poiService.findAll();
        assert.equal(allPOIs.length, 0);
    });

});
'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const utils = require('../app/api/utils.js');

suite('Authentication API tests', function () {

    let users = fixtures.users;
    let newUser = fixtures.newUser;

    const poiService = new PoiService(fixtures.poiService);



    suiteSetup(async function() {
        await poiService.deleteAllUsers();
        const returnedUser = await poiService.createUser(newUser);
        const response = await poiService.authenticate(newUser);
    });

    suiteTeardown(async function() {
        await poiService.deleteAllUsers();
        poiService.clearAuth();
    });
    test('authenticate', async function () {
        const returnedUser = await poiService.createUser(newUser);
        const response = await poiService.authenticate(newUser);
        assert(response.success);
        assert.isDefined(response.token);
    });

    test('verify Token', async function () {
        const returnedUser = await poiService.createUser(newUser);
        const response = await poiService.authenticate(newUser);

        const userInfo = utils.decodeToken(response.token);
        assert.equal(userInfo.email, returnedUser.user.email);
        assert.equal(userInfo.userId, returnedUser.user._id);
    });
});
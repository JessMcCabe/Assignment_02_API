'use strict';

const Accounts = require('./app/controllers/accounts');
const Poi = require('./app/controllers/poi');
const Gallery = require('./app/controllers/gallery');


module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },
    { method: 'GET', path: '/settings',config: Accounts.showSettings},
    { method: 'POST', path: '/settings',config: Accounts.updateSettings},

    { method: 'GET', path: '/home', config: Poi.home },
    { method: 'GET', path: '/list', config: Poi.list },
    { method: 'POST', path: '/submit', config: Poi.submit },
    { method: 'GET', path: '/poi/{id}',config: Poi.poiDetails},


    { method: 'GET', path: '/gallery', config: Gallery.index },
    { method: 'POST', path: '/uploadfile', config: Gallery.uploadFile },
    { method: 'GET', path: '/deleteimage/{id}', config: Gallery.deleteImage },

    { method: 'GET', path: '/poi/deletePoi/{id}', config: Poi.deletePOI },
    { method: 'GET', path: '/poi/editPoi/{id}', config: Poi.editPOI },

    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        },
        options: { auth: false }
    }
];
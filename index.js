'use strict';
const ImageStore = require('./app/utils/image-store');
const Hapi = require('@hapi/hapi');

require('dotenv').config()


const fsConfig = {
    cookie_password: process.env.COOKIE_PASSWORD
};

const server = Hapi.server({
    port: process.env.PORT || 3000,
});

const credentials = {
    cloud_name: process.env.name,
    api_key: process.env.key,
    api_secret: process.env.secret
};

require('./app/models/db');

async function init() {
    await server.register(require('@hapi/inert'));
    await server.register(require('@hapi/vision'));
    await server.register(require('@hapi/cookie'));

    ImageStore.configure(credentials);

    server.views({
        engines: {
            hbs: require('handlebars'),
        },
        relativeTo: __dirname,
        path: './app/views',
        layoutPath: './app/views/layouts',
        partialsPath: './app/views/partials',
        layout: true,
        isCached: false,
    });


    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'poi',
            password: fsConfig.cookie_password,
            isSecure: false
        },
        redirectTo: '/',
    });

    server.auth.default('session');

    server.route(require('./routes'));
    server.route(require('./routes-api'));
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}


process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

init();
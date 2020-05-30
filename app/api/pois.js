'use strict';

const Poi = require('../models/poi');
const Boom = require('@hapi/boom');
const User = require('../models/user');

const Pois = {
    findAll: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            const pois = await Poi.find();
            return pois;
        }
    },
    findByAuthor: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            const pois = await Poi.find({ author: request.params.id });
            return pois;
        }
    },
    findByID: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            const pois = await Poi.findOne({ _id: request.params.id });
            return pois;
        }
    },
    submitPoi: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            let poi = new Poi(request.payload);
            const user = await User.findOne({ _id: request.params.id });
            if (!user) {
                return Boom.notFound('No User with this id');
            }
            poi.author = user._id;
            poi = await poi.save();
            return poi;
        }
    },
    deleteAll: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            await Poi.deleteMany({});
            return { success: true };
        }

    }, deleteOne: {
        auth: {
            strategy: 'jwt',
        },

        handler: async function(request, h) {
            await Poi.deletePOI({});
            return { success: true };
        }
    }
};

module.exports = Pois;

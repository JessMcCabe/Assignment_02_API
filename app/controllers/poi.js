'use strict';



const POI = require('../models/poi');
const User = require('../models/user');
const ImageStore = require('../utils/image-store');

const POIList = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Points Of Interest' });
        }
    },
    list: {
        handler: async function(request, h) {
            const id = request.auth.credentials.id;
            const user = await User.findById(id);
            const pois = await POI.findByAuthor(user._id).populate('author').lean();
            return h.view('listpois', {
                title: "POI''s to Date",
                pois: pois
            });
        }
    },
    poiDetails: {
        handler: async function(request, h) {
            const id = request.auth.credentials.id;
            const user = await User.findById(id);
            const data = request.params;
            const poi = await POI.findById(data.id).populate('poi').lean();
            const image = await ImageStore.getSingleImage(poi.link);
            return h.view('poiDetail', {
                title: "POI Details",
                pois: poi,
                image: image
            });
        }
    },
    submit: {
        handler: async function (request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const data = request.payload;
                const newPOI = new POI({
                    name: data.name,
                    description: data.description,
                    author: user._id
                });
                await newPOI.save();
                return h.redirect('/list');
            } catch (err) {
                return h.view('main', {errors: [{message: err.message}]});

            }
        }
    },

    editPOI: {
        handler: async function (request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const idData = request.params;
                const editPOI = POI.findById(idData.id);
                const data = request.payload;
                editPOI.name = data.name;
                editPOI.description = data.description;
                await editPOI.save();
                return h.redirect('/list');
            } catch (err) {
                return h.view('main', {errors: [{message: err.message}]});

            }
        }
    },

        deletePOI: {
            handler: async function (request, h) {
                try {
                    const id = request.auth.credentials.id;
                    const user = await User.findById(id);
                    const data = request.params;
                    const deletePOI = POI.findById(data.id);
                    await POI.deleteOne(deletePOI)

                    return h.redirect('/list');
                } catch (err) {
                    return h.view('main', {errors: [{message: err.message}]});

                }
            }
        }


};

module.exports = POIList;
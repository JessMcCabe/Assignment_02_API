'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
    name: String,
    description: String,
    category: String,
    link: String,
    location:{
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }});




poiSchema.statics.findByName = function(name) {
    return this.findOne({ name : name});
};

    poiSchema.statics.findByAuthor = function(author){
        return this.find({author: author});

    };


module.exports = Mongoose.model('Poi', poiSchema);
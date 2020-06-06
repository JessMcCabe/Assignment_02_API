'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');          // ADDED


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    admin: String
});

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email });
};

userSchema.statics.deleteOne = function(user) {
    return this.deleteOne({user: user});
};

userSchema.methods.comparePassword = async function(candidatePassword) {        // EDITED
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = Mongoose.model('User', userSchema);
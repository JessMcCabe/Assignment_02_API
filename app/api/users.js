'use strict';

const User = require('../models/user');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');
const utils = require('../api/utils')
const bcrypt = require('bcrypt');
const saltRounds = 10;




const Users = {


    authenticate: {
        auth: false,
        handler: async function(request, h) {
            try {
                const user = await User.findOne({ email: request.payload.email });
                if (!user) {
                    return Boom.notFound('Authentication failed. User not found');
                }
                const token = utils.createToken(user);
                return h.response({ success: true, token: token }).code(201);
            } catch (err) {
                return Boom.notFound('internal db failure');
            }
        }
    },

    find: {
        auth: false,
        handler: async function(request, h) {
            const users = await User.find();
            return users;
        }
    },

    findOne: {
        auth: false,
        handler: async function(request, h) {
            try {
                const user = await User.findOne({ _id: request.params.id });
                if (!user) {
                    return Boom.notFound('No User with this id');
                }
                return user;
            } catch (err) {
                return Boom.notFound('No User with this id');
            }
        }
    },
    findByEmail: {
        auth: false,
        handler: async function(request, h) {
            try {
                const email = request.params.email;
                const user = await User.findByEmail(email);
                if (!user) {
                    return Boom.notFound('No User with this email');
                }
                return user;
            } catch (err) {
                return Boom.notFound('No User with this email');
            }
        }
    },

    create: {
        auth: false,
        handler: async function(request, h) {
            const payload = request.payload;
            const hash = await bcrypt.hash(payload.password, saltRounds);    // ADDED
            const newUser = new User({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: hash                             // EDITED
            });
            let user = await newUser.save();
            if (user) {
                return h.response(user).code(201);
            }
        }
    },

    auth: {
        auth: false,
        handler: async function(request, h) {
            //const payload = request.payload;
            const { email, password } = request.payload;
            try {
                let user = await User.findByEmail(email);
                if (!user) {
                    const message = 'Email address is not registered';
                    throw Boom.unauthorized(message);
                }
                if (!await user.comparePassword(password)) {         // EDITED (next few lines)
                    const message = 'Password mismatch';
                    throw Boom.unauthorized(message);
                } const token = utils.createToken(user);
                return h.response({ success: true, token: token }).code(201);
            } catch (err) {
                return Boom.notFound('internal db failure');
            }
        }
    },


    deleteAll: {
        auth: false,
        handler: async function(request, h) {
            await User.deleteMany({});
            return { success: true };
        }
    },

    deleteOne: {
        auth: false,
        handler: async function(request, h) {
            const user = await User.deleteOne({ _id: request.params.id });
            if (user) {
                return { success: true };
            }
            return Boom.notFound('id not found');
        }
    }
};

module.exports = Users
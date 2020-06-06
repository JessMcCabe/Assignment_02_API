'use strict';

const User = require('../models/user');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');
const utils = require('../api/utils')
const bcrypt = require('bcrypt');
const saltRounds = 10;




const Users = {


    authAdmin: {
        auth: false,
        handler: async function(request, h) {
            //const payload = request.payload;
            const { email, password } = request.payload;
            try {
                let user = await User.findByEmail(email);
                if (user.admin == "false") {
                    const message = 'Not a recognised administrator. Please try user log-in above';
                    throw Boom.unauthorized(message);
                }
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
                password: hash,
                admin: "false"// EDITED
            });
            let user = await newUser.save();
            if (user) {
                return h.response(user).code(201);
            }
        }
    },
    update: {//Update here - do not edit email, used to look up the user for now
        auth: false,
        handler: async function(request, h) {
            const payload = request.payload;
            const emailAdd = payload.email;
            const email = emailAdd
            const user = await User.findByEmail(emailAdd);//find the current user by ID
            //check if details differ, if they do, update with new details sent in request
            if(payload.firstName !== user.firstName){
                //update first name
                user.firstName = payload.firstName;
            }
            if(payload.lastName !== user.lastName){
                //update last name
                user.lastName = payload.lastName;
            }

            const newHash = await bcrypt.hash(payload.password, saltRounds);
            //const origHash = await bcrypt.hash(payload.password, saltRounds);
            if(!await user.comparePassword(payload.password)){
                //update password name
                user.password = newHash;
            }
            user.save();

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

    deleteUser: {
        auth: false,
        handler: async function(request, h) {
            const payload = request.payload;
            const email = payload.email;
            let user = await User.findByEmail(email);//find the current user by ID
            let userId = user._id;
             await User.deleteOne(user);
            if (!user) {
                return { success: true };
            }
            return Boom.notFound('id not found');
        }
    }
};

module.exports = Users
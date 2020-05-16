'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3000';

class PoiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    async getUsers() {
        try {
            const response = await axios.get(this.baseUrl + '/api/users');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getUser(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/users/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createUser(newUser) {
        try {
            const response = await axios.post(this.baseUrl + '/api/users', newUser);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllUsers() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/users');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneUser(id) {
        try {
            const response = await axios.delete(this.baseUrl + '/api/users/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }
    async findAll() {
        try {
            const response = await axios.get(this.baseUrl + '/api/poi');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async submitPoi(id, poi) {
        try {
            const response = await axios.post(this.baseUrl + '/api/user/' + id + '/poi', poi);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async findByAuthor(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/user/' + id + '/poi');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async findByID(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/poi/' +id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllPOIs() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/pois');
            return response.data;
        } catch (e) {
            return null;
        }
    }
    async deleteOnePOI() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/poi/' +id);
            return response.data;
        } catch (e) {
            return null;
        }
    }


}

module.exports = PoiService;
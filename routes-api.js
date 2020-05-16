const Users = require('./app/api/users');
const Pois = require('./app/api/pois');
module.exports = [

    { method: 'GET', path: '/api/users', config: Users.find },
    { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
    { method: 'POST', path: '/api/users', config: Users.create },
    { method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
    { method: 'DELETE', path: '/api/users', config: Users.deleteAll },

    { method: 'GET', path: '/api/poi', config: Pois.findAll },
    { method: 'GET', path: '/api/user/{id}/poi', config: Pois.findByAuthor },
    { method: 'POST', path: '/api/user/{id}/poi', config: Pois.submitPoi },
    { method: 'DELETE', path: '/api/pois', config: Pois.deleteAll },
    { method: 'DELETE', path: '/api/poi/{id}', config: Pois.deleteOne }

];
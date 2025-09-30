'use strict';

const register = require('./register');
const config = require('./config');
const services = require('./services');

module.exports = () => ({
	config,
	services,
	register,
});

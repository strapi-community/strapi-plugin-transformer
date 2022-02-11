'use strict';

const bootstrap = require('./bootstrap');
const config = require('./config');
const services = require('./services');

module.exports = () => ({
	config,
	services,
	bootstrap,
});

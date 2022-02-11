'use strict';

const transformMiddleware = require('./middleware/transform');

module.exports = ({ strapi }) => {
	// bootstrap phase
	transformMiddleware({ strapi });
};

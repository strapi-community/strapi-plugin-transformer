'use strict';

const { pluginId } = require('../util/pluginId');

module.exports = ({ strapi }) => ({
	get() {
		return strapi.config.get(`plugin.${pluginId}`);
	},
});

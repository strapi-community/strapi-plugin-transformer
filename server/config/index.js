'use strict';

const { pluginConfigSchema } = require('./schema');

module.exports = {
	default: () => ({ prefix: '/api/' }),
	validator: async (config) => {
		await pluginConfigSchema.validate(config);
	},
};

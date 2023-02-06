'use strict';

const { pluginConfigSchema } = require('./schema');

module.exports = {
	default: () => ({
		hooks: {
			preResponseTransform: () => {},
			postResponseTransform: () => {},
		},
	}),
	validator: async (config) => {
		await pluginConfigSchema.validate(config);
	},
};

'use strict';

const { pluginConfigSchema } = require('./schema');

module.exports = {
	default: () => ({
		hooks: {
			preResponseTransform: (ctx) => {},
			postResponseTransform: (ctx) => {},
		},
	}),
	validator: async (config) => {
		await pluginConfigSchema.validate(config);
	},
};

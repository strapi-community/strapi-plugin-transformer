'use strict';

const { pluginConfigSchema } = require('./schema');

module.exports = {
	default: () => ({
		hooks: {
			preResponseTransform: () => {},
			postResponseTransform: () => {},
		},
	}),
	validator: (config) => {
		pluginConfigSchema.validateSync(config);
	},
};

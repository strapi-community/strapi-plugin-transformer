'use strict';

const { pluginConfigSchema } = require('./schema');

module.exports = {
	default: () => ({
		responseTransforms: {
			removeAttributesKey: false,
			removeDataKey: false,
		},
		requestTransforms: {
			wrapBodyWithDataKey: false,
		},
		hooks: {
			preResponseTransform: () => {},
			postResponseTransform: () => {},
		},
		contentTypeFilter: {
			uids: {},
		},
		plugins: {
			ids: {},
		},
	}),
	validator: (config) => {
		pluginConfigSchema.validateSync(config);
	},
};

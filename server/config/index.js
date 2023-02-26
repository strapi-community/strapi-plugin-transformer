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
			mode: 'none',
			uids: {},
		},
	}),
	validator: (config) => {
		pluginConfigSchema.validateSync(config);
	},
};

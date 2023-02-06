'use strict';

const yup = require('yup');

const pluginConfigSchema = yup.object().shape({
	responseTransforms: yup.object().shape({
		removeAttributesKey: yup.bool(),
		removeDataKey: yup.bool(),
	}),
	hooks: yup.object().shape({
		preResponseTransform: yup.object().test({
			name: 'preResponseTransform',
			exclusive: true,
			message: '${path} must be an object or function',
			test: (value) => typeof value === 'function',
		}),
		postResponseTransform: yup.object().test({
			name: 'postResponseTransform',
			exclusive: true,
			message: '${path} must be an object or function',
			test: (value) => typeof value === 'function',
		}),
	}),
});

module.exports = {
	pluginConfigSchema,
};

'use strict';

const yup = require('yup');

const pluginConfigSchema = yup.object().shape({
	responseTransforms: yup.object().shape({
		removeAttributesKey: yup.bool(),
		removeDataKey: yup.bool(),
	}),
	requestTransforms: yup.object().shape({
		wrapBodyWithDataKey: yup.bool(),
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
	contentTypeFilter: yup.object().shape({
		mode: yup.string().oneOf(['allow', 'deny', 'none']),
		uids: yup.object(),
	}),
});

module.exports = {
	pluginConfigSchema,
};

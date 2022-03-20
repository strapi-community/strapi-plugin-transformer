'use strict';

const yup = require('yup');

const pluginConfigSchema = yup.object().shape({
	prefix: yup.string(),
	responseTransforms: yup.object().shape({
		removeAttributesKey: yup.bool(),
		removeDataKey: yup.bool(),
	}),
});

module.exports = {
	pluginConfigSchema,
};

'use strict';

const yup = require('yup');

const pluginConfigSchema = yup.object().shape({
	prefix: yup.string(),
});

module.exports = {
	pluginConfigSchema,
};

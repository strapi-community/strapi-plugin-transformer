'use strict';

const _ = require('lodash');

const { transformResponse } = require('./response');

module.exports = () => ({
	response(settings, ctx) {
		if (_.has(settings, ['responseTransforms'])) {
			transformResponse(settings.responseTransforms, ctx);
		}
	},
});

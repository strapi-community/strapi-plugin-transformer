'use strict';

const _ = require('lodash');
const { transformRequest } = require('./request');
const { transformResponse } = require('./response');

module.exports = () => ({
	response(settings, ctx) {
		if (_.has(settings, ['responseTransforms'])) {
			transformResponse(settings.responseTransforms, ctx);
		}
	},
	request(settings, ctx) {
		if (_.has(settings, ['requestTransforms'])) {
			transformRequest(settings.requestTransforms, ctx);
		}
	},
});

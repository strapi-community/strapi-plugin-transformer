'use strict';

const _ = require('lodash');
const { getPluginService } = require('../util/getPluginService');
const { isAPIRequest } = require('../util/isAPIRequest');

const transform = async (strapi, ctx, next) => {
	const settings = getPluginService('settingsService').get();

	const method = ctx.request.method;

	// TODO: need to recognize Content APIs
	//   -- `isAPIRequest()` not working here due to `ctx` is incomplete before Strapi handle the request

	if (method === 'PUT' || method === 'POST') {
		let reqBody = ctx.request.body;

		// TODO: get real config
		if ('wrapBodyWithDataKey') {
			reqBody = { data: reqBody };
			ctx.request.body = reqBody;
		}
	}

	await next();

	// skip any requests that have ignore header
	const transformIgnoreHeader = _.get(ctx, ['headers', 'strapi-transformer-ignore'], 'false');
	if (transformIgnoreHeader === 'true') {
		return;
	}

	// ensure body exists, occurs on non existent route
	if (!ctx.body) {
		return;
	}

	// only process api requests.
	if (isAPIRequest(ctx)) {
		const { data } = ctx.body;

		// ensure no error returned.
		if (data) {
			ctx.body['data'] = getPluginService('transformService').response(settings, data);
		}
	}
};

module.exports = ({ strapi }) => {
	strapi.server.use((ctx, next) => transform(strapi, ctx, next));
};

'use strict';

const _ = require('lodash');
const { getPluginService } = require('../util/getPluginService');
const { isAPIRequest } = require('../util/isAPIRequest');

const transform = async (strapi, ctx, next) => {
	const settings = getPluginService('settingsService').get();

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
	if (!isAPIRequest(ctx)) {
		return;
	}

	// ensure no error returned.
	if (!ctx.body.data) {
		return;
	}

	// execute response transforms
	settings.hooks.preResponseTransform(ctx);
	ctx.body['data'] = getPluginService('transformService').response(settings, ctx.body.data);
	settings.hooks.postResponseTransform(ctx);
};

module.exports = ({ strapi }) => {
	strapi.server.use((ctx, next) => transform(strapi, ctx, next));
};

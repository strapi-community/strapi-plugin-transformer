'use strict';

const _ = require('lodash');
const { getPluginService } = require('../util/getPluginService');

const transform = async (strapi, ctx, next) => {
	const settings = getPluginService('settingsService').get();

	// skip any requests that have ignore header
	const transformIgnoreHeader = _.get(ctx, ['headers', 'strapi-transformer-ignore'], 'false');
	if (transformIgnoreHeader === 'true') {
		return next();
	}

	// execute request transforms
	getPluginService('transformService').request(settings, ctx);

	await next();

	// ensure body exists, occurs on non existent route
	if (!ctx.body) {
		return;
	}

	// ensure no error returned.
	if (!ctx.body.data) {
		return;
	}

	// execute response transforms
	settings.hooks.preResponseTransform(ctx);
	getPluginService('transformService').response(settings, ctx);
	settings.hooks.postResponseTransform(ctx);
};

module.exports = { transform };

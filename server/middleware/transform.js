'use strict';

const { getPluginService } = require('../util/getPluginService');
const { isAPIRequest } = require('../util/isAPIRequest');
const { pluginId } = require('../util/pluginId');

const transform = async (strapi, ctx, next) => {
	const settings = strapi.config.get(`plugin.${pluginId}`);

	await next();

	// only process api requests.
	if (isAPIRequest(ctx, settings.prefix)) {
		console.log('processing');
		const { data } = ctx.body;

		// ensure no error returned.
		if (data) {
			ctx.body['data'] = getPluginService(strapi, 'transformService').index(data);
		}
	}
};

module.exports = ({ strapi }) => {
	strapi.server.use((ctx, next) => transform(strapi, ctx, next));
};

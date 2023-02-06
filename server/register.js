'use strict';

const _ = require('lodash');

const { transform } = require('./middleware/transform');
const { getPluginService } = require('./util/getPluginService');

module.exports = ({ strapi }) => {
	const settings = getPluginService('settingsService').get();

	// register transforms on all api routes
	const apis = _.get(strapi, ['api'], {});
	for (const ct in apis) {
		if (!Object.hasOwnProperty.call(apis, ct)) {
			continue;
		}

		// skip any uids in denylist that are completely denied
		const uid = apis[ct].contentTypes[ct].uid;
		const isDeniedUID = _.get(settings, ['denyList', uid], false);
		if (isDeniedUID && typeof isDeniedUID === 'boolean') {
			continue;
		}

		const apiRoutes = _.get(apis, [ct, 'routes', ct, 'routes'], []);
		for (let i = 0; i < apiRoutes.length; i++) {
			// skip any methods in deny list for this uid
			const method = apiRoutes[i].method;
			const isDeniedMethod = _.get(settings, ['denyList', uid, method], false);
			if (isDeniedMethod) {
				continue;
			}

			// ensure path exists
			if (!_.has(apiRoutes[i], 'config')) {
				_.set(strapi, ['api', ct, 'routes', ct, 'routes', i, 'config'], {});
			}

			if (!_.has(apiRoutes[i], ['config', 'middlewares'])) {
				_.set(strapi, ['api', ct, 'routes', ct, 'routes', i, 'config', 'middlewares'], []);
			}

			// register route middleware
			strapi.api[ct].routes[ct].routes[i].config.middlewares.push((ctx, next) =>
				transform(strapi, ctx, next)
			);
		}
	}
};

'use strict';

const _ = require('lodash');

const { transform } = require('./middleware/transform');

module.exports = ({ strapi }) => {
	// register transforms on all api routes
	const apis = _.get(strapi, ['api'], {});
	for (const ct in apis) {
		if (!Object.hasOwnProperty.call(apis, ct)) {
			continue;
		}

		const apiRoutes = _.get(apis, [ct, 'routes'], []);
		for (let i = 0; i < apiRoutes.length; i++) {
			// ensure path exists
			if (!_.has(apiRoutes[i], 'config')) {
				_.set(strapi, ['api', ct, 'routes', ct, 'routes', i, 'config'], {});
			}

			if (!_.has(apiRoutes[i], 'config', 'middlewares')) {
				_.set(strapi, ['api', ct, 'routes', ct, 'routes', i, 'config', 'middleware'], []);
			}

			// register route middleware
			strapi.api[ct].routes[ct].routes[i].config.middlewares.push((ctx, next) =>
				transform(strapi, ctx, next)
			);
		}
	}
};

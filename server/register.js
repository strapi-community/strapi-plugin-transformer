'use strict';

const _ = require('lodash');

const { transform } = require('./middleware/transform');
const { getPluginService } = require('./util/getPluginService');

module.exports = ({ strapi }) => {
	const settings = getPluginService('settingsService').get();
	let ctFilterMode = _.get(settings, ['contentTypeFilter', 'mode'], 'none');
	const ctFilterUIDs = _.get(settings, ['contentTypeFilter', 'uids'], {});

	// default uid list to all apis
	if (_.size(ctFilterUIDs) === 0) {
		ctFilterMode = 'none';
	}

	// register transforms on all api routes
	const apis = _.get(strapi, ['api'], {});
	for (const ct in apis) {
		// ensure we are only processing direct properties
		if (!Object.hasOwnProperty.call(apis, ct)) {
			continue;
		}

		const uid = _.get(apis, [ct, 'contentTypes', ct, 'uid'], false);

		// skip routes that do not have an associated content type (i.e. routes not using createCoreRouter)
		if (!uid) {
			continue;
		}

		// respect ct uid filter
		const filterUID = _.get(settings, ['contentTypeFilter', 'uids', uid], false);
		if (ctFilterMode === 'allow' && !filterUID && _.isBoolean(filterUID)) {
			continue;
		} else if (ctFilterMode === 'deny' && filterUID && _.isBoolean(filterUID)) {
			continue;
		}

		const apiRoutes = _.get(apis, [ct, 'routes', ct, 'routes'], []);
		for (let i = 0; i < apiRoutes.length; i++) {
			// respect ct uid method filter
			const method = apiRoutes[i].method;
			const filterMethod = _.get(settings, ['contentTypeFilter', 'uids', uid, method], false);
			if (ctFilterMode === 'allow' && !filterMethod) {
				continue;
			} else if (ctFilterMode === 'deny' && filterMethod) {
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

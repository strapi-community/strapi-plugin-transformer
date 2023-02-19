'use strict';

const _ = require('lodash');

const { transform } = require('./middleware/transform');
const { getPluginService } = require('./util/getPluginService');

module.exports = ({ strapi }) => {
	const settings = getPluginService('settingsService').get();
	let ctFilterMode = _.get(settings, ['contentTypeFilter', 'mode'], 'allow');
	const ctFilterUIDs = _.get(settings, ['contentTypeFilter', 'uids'], {});

	// default uid list to all apis
	if (_.size(ctFilterUIDs) === 0) {
		ctFilterMode = 'none';
	}

	// register transforms on all api routes
	const apis = _.get(strapi, ['api'], {});
	for (const ct in apis) {
		if (!Object.hasOwnProperty.call(apis, ct)) {
			continue;
		}
		
		if(Object.keys(apis[ct].contentTypes).length === 0){
			console.log("skipping due to being a custom controller type, most likely", ct)
			continue;
		}

		// respect ct uid filter
		const uid = apis[ct].contentTypes[ct].uid;
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

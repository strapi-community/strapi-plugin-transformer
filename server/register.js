'use strict';

const _ = require('lodash');

const { transform } = require('./middleware/transform');
const { getPluginService } = require('./util/getPluginService');

function addTransformMiddleware(route) {
	// ensure path exists
	if (!_.has(route, ['config', 'middlewares'])) {
		_.set(route, ['config', 'middlewares'], []);
	}

	// register route middleware
	route.config.middlewares.push((ctx, next) => transform(strapi, ctx, next));
}

function isAllowableAPI({ mode, uid, filterValues }) {
	// respect ct uid filter
	const filterUID = _.get(filterValues, [uid], false);
	if (mode === 'allow' && !filterUID && _.isBoolean(filterUID)) {
		return false;
	} else if (mode === 'deny' && filterUID && _.isBoolean(filterUID)) {
		return false;
	}

	return true;
}

function isAllowableMethod({ mode, uid, method, filterValues }) {
	// respect ct uid method filter
	const filterMethod = _.get(filterValues, [uid, method], null);
	if (mode === 'allow' && !filterMethod && _.isBoolean(filterMethod)) {
		return false;
	} else if (mode === 'deny' && filterMethod && _.isBoolean(filterMethod)) {
		return false;
	}

	return true;
}

function register({ strapi }) {
	const settings = getPluginService('settingsService').get();
	let ctFilterMode = _.get(settings, ['contentTypeFilter', 'mode'], 'none');
	let pluginFilterMode = _.get(settings, ['plugins', 'mode'], 'allow');
	const ctFilterUIDs = _.get(settings, ['contentTypeFilter', 'uids'], {});
	const pluginFilterIDs = _.get(settings, ['plugins', 'ids'], {});
	const apiTypes = ['api'];

	// default uid list to all apis
	if (_.size(ctFilterUIDs) === 0) {
		ctFilterMode = 'none';
	}

	// default plugins list to none
	if (_.size(pluginFilterIDs) !== 0) {
		apiTypes.push('plugins');
	}

	_.forEach(apiTypes, (apiType) => {
		const mode = apiType === 'api' ? ctFilterMode : pluginFilterMode;
		const filterValues = apiType === 'api' ? ctFilterUIDs : pluginFilterIDs;
		_.forEach(strapi[apiType], (api, apiName) => {
			const uid = _.get(api, ['contentTypes', apiName, 'uid'], apiName);
			if (!isAllowableAPI({ uid, mode, filterValues })) {
				return;
			}

			_.forEach(api.routes, (router) => {
				// skip admin routes
				if (router.type && router.type === 'admin') {
					return;
				}

				if (router.routes) {
					// process routes
					_.forEach(router.routes, (route) => {
						if (!isAllowableMethod({ uid, mode, filterValues, method: route.method })) {
							return;
						}

						addTransformMiddleware(route);
					});
					return;
				}

				if (!isAllowableMethod({ uid, mode, filterValues, method: router.method })) {
					return;
				}

				// process route
				addTransformMiddleware(router);
			});
		});
	});
}

module.exports = register;

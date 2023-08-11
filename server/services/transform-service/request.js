'use strict';

const _ = require('lodash');
const { matchRule } = require('./util');

/**
 *
 * @param {object} transforms
 * @param {boolean} transforms.wrapBodyWithDataKey
 * @param {object} ctx
 */
function transformRequest(transforms = {}, ctx) {
	// wrapBodyWithDataKey
	if (transforms.wrapBodyWithDataKey) {
		let wrap = true
		if (transforms.ignoredRoutes !== undefined) {
			wrap = transforms.ignoredRoutes.filter((r) => matchRule(ctx.request.url, r) === true ).length === 0
		};
		wrap &&	wrapBodyWithDataKey(ctx)
	}
}

function wrapBodyWithDataKey(ctx) {
	if (ctx.method !== 'POST' && ctx.method !== 'PUT') {
		return;
	}

	if (!_.has(ctx, ['request', 'body'])) {
		return;
	}

	if (_.has(ctx, ['request', 'body', 'data']) && _.size(ctx.request.body) == 1) {
		return;
	}

	ctx.request.body = { data: ctx.request.body };
}

module.exports = {
	transformRequest,
	wrapBodyWithDataKey,
};

'use strict';

const _ = require('lodash');

/**
 *
 * @param {object} transforms
 * @param {boolean} transforms.wrapBodyWithDataKey
 * @param {object} ctx
 */
function transformRequest(transforms = {}, ctx) {
	// wrapBodyWithDataKey
	if (transforms.wrapBodyWithDataKey) {
		wrapBodyWithDataKey(ctx);
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

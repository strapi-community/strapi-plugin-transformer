'use strict';

const isAPIRequest = (ctx, prefix = '/api/') =>
	ctx.request && ctx.request.url && ctx.request.url.indexOf(prefix) !== -1;

module.exports = {
	isAPIRequest,
};

'use strict';

const isAPIRequest = (ctx) =>
	ctx.state &&
	ctx.state.route &&
	ctx.state.route.info &&
	ctx.state.route.info.type === 'content-api';

module.exports = {
	isAPIRequest,
};

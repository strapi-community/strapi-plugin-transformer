'use strict';

module.exports = {
	nonMutationGETContext: {
		method: 'GET',
	},
	nonMutationDELETEContext: {
		method: 'DELETE',
	},
	noBodyRequestContext: {
		method: 'POST',
		request: {},
	},
	wrappedRequestContext: {
		method: 'POST',
		request: {
			body: {
				data: {
					title: 'lorem',
				},
			},
		},
	},
	wrappableRequestContext: {
		method: 'PUT',
		request: {
			body: {
				data: {},
				title: 'lorem',
			},
		},
	},
};

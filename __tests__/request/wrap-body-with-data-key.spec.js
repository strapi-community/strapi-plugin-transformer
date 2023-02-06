'use strict';

const { wrapBodyWithDataKey } = require('../../server/services/transform-service/request');
const mock = require('../mock/request');

describe('wrapBodyWithDataKey', () => {
	test('non PUT or POST requests', () => {
		const getContextResult = mock.initial.nonMutationGETContext;
		wrapBodyWithDataKey(getContextResult);
		expect(getContextResult).toBeDefined();
		expect(getContextResult).toEqual(mock.initial.nonMutationGETContext);

		const deleteContextResult = mock.initial.nonMutationDELETEContext;
		wrapBodyWithDataKey(deleteContextResult);
		expect(deleteContextResult).toBeDefined();
		expect(deleteContextResult).toEqual(mock.initial.nonMutationDELETEContext);
	});

	test('requests with no body', () => {
		const noBodyRequestContext = mock.initial.noBodyRequestContext;
		wrapBodyWithDataKey(noBodyRequestContext);
		expect(noBodyRequestContext).toBeDefined();
		expect(noBodyRequestContext).toEqual(mock.initial.noBodyRequestContext);
	});

	test('requests with only one top level data property', () => {
		const wrappedRequestContext = mock.initial.wrappedRequestContext;
		wrapBodyWithDataKey(wrappedRequestContext);
		expect(wrappedRequestContext).toBeDefined();
		expect(wrappedRequestContext).toEqual(mock.initial.wrappedRequestContext);
	});

	test('wrappable request', () => {
		const wrappableRequestContext = mock.initial.wrappableRequestContext;
		wrapBodyWithDataKey(wrappableRequestContext);
		expect(wrappableRequestContext).toBeDefined();
		expect(wrappableRequestContext).toEqual(mock.wrapBodyWithDataKey.wrappableRequestContext);
	});
});

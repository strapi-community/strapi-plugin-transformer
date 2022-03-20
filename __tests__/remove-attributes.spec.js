'use strict';

const transformService = require('../server/services/transform-service');
const { initial, removeAttributesKey } = require('./mock');

const { transformResponse } = transformService();
const transformOptions = { removeAttributesKey: true };

describe('removeAttributesKey', () => {
	// single relation
	test('object with data property of type object', () => {
		const result = transformResponse(transformOptions, initial.dataObject);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.dataObject);
	});

	// multiple relation
	test('object with data property of type array', () => {
		const result = transformResponse(transformOptions, initial.dataArray);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.dataArray);
	});

	// single component
	test('object with id property', () => {
		const result = transformResponse(transformOptions, initial.id);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.id);
	});

	// multiple components
	// dynamic zone
	test('array of objects containing an id property', () => {
		const result = transformResponse(transformOptions, initial.arrayWithIds);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.arrayWithIds);
	});

	// skip single media
	test('object with provider property', () => {
		const result = transformResponse(transformOptions, initial.provider);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.provider);
	});

	// skip multi media
	test('array of objects containing a provider property', () => {
		const result = transformResponse(transformOptions, initial.arrayWithProviders);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.arrayWithProviders);
	});
});

'use strict';

const transformService = require('../server/services/transform-service');
const { initial, allResponseTransforms } = require('./mock');

const { transformResponse } = transformService();
const transformOptions = { removeAttributesKey: true, removeDataKey: true };

describe('All response transforms', () => {
	// single relation
	test('object with data property of type object', () => {
		const result = transformResponse(transformOptions, initial.dataObject);
		expect(result).toBeDefined();
		expect(result).toEqual(allResponseTransforms.dataObject);
	});

	test('object with data property of type null', () => {
		const result = transformResponse(transformOptions, initial.dataWithNull);
		expect(result).toBeDefined();
		expect(result).toEqual(allResponseTransforms.dataWithNull);
	});

	// multiple relation
	test('object with data property of type array', () => {
		const result = transformResponse(transformOptions, initial.dataArray);
		expect(result).toBeDefined();
		expect(result).toEqual(allResponseTransforms.dataArray);
	});

	test('object with data property of type array with no length', () => {
		const result = transformResponse(transformOptions, initial.dataWithEmptyArray);
		expect(result).toBeDefined();
		expect(result).toEqual(allResponseTransforms.dataWithEmptyArray);
	});

	// single component
	test('object with id property', () => {
		const result = transformResponse(transformOptions, initial.id);
		expect(result).toBeDefined();
		expect(result).toEqual(allResponseTransforms.id);
	});

	// multiple components
	// dynamic zone
	test('array of objects containing an id property', () => {
		const result = transformResponse(transformOptions, initial.arrayWithIds);
		expect(result).toBeDefined();
		expect(result).toEqual(allResponseTransforms.arrayWithIds);
	});

	// skip single media
	test('object with provider property', () => {
		const result = transformResponse(transformOptions, initial.provider);
		expect(result).toBeDefined();
		expect(result).toEqual(allResponseTransforms.provider);
	});

	// skip multi media
	test('array of objects containing a provider property', () => {
		const result = transformResponse(transformOptions, initial.arrayWithProviders);
		expect(result).toBeDefined();
		expect(result).toEqual(allResponseTransforms.arrayWithProviders);
	});
});

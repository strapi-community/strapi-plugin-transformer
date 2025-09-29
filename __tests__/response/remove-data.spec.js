'use strict';

const { modifyResponseBodyData } = require('../../server/services/transform-service/response');
const { initial, removeDataKey } = require('../mock/response');

const transformOptions = { removeDataKey: true, ignoreResponseKeys: [] };

describe('removeDataKey', () => {
	// single relation
	test('object with data property of type object', () => {
		const result = modifyResponseBodyData(transformOptions, initial.dataObject);
		expect(result).toBeDefined();
		expect(result).toEqual(removeDataKey.dataObject);
	});

	test('object with data property of type null', () => {
		const result = modifyResponseBodyData(transformOptions, initial.dataWithNull);
		expect(result).toBeDefined();
		expect(result).toEqual(removeDataKey.dataWithNull);
	});

	// multiple relation
	test('object with data property of type array', () => {
		const result = modifyResponseBodyData(transformOptions, initial.dataArray);
		expect(result).toBeDefined();
		expect(result).toEqual(removeDataKey.dataArray);
	});

	test('object with data property of type array with no length', () => {
		const result = modifyResponseBodyData(transformOptions, initial.dataWithEmptyArray);
		expect(result).toBeDefined();
		expect(result).toEqual(removeDataKey.dataWithEmptyArray);
	});

	// single component
	test('object with id property', () => {
		const result = modifyResponseBodyData(transformOptions, initial.id);
		expect(result).toBeDefined();
		expect(result).toEqual(removeDataKey.id);
	});

	// multiple components
	// dynamic zone
	test('array of objects containing an id property', () => {
		const result = modifyResponseBodyData(transformOptions, initial.arrayWithIds);
		expect(result).toBeDefined();
		expect(result).toEqual(removeDataKey.arrayWithIds);
	});

	// skip single media
	test('object with provider property', () => {
		const result = modifyResponseBodyData(transformOptions, initial.provider);
		expect(result).toBeDefined();
		expect(result).toEqual(removeDataKey.provider);
	});

	// skip multi media
	test('array of objects containing a provider property', () => {
		const result = modifyResponseBodyData(transformOptions, initial.arrayWithProviders);
		expect(result).toBeDefined();
		expect(result).toEqual(removeDataKey.arrayWithProviders);
	});
});

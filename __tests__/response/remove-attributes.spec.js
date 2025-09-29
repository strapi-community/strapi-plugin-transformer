'use strict';

const { modifyResponseBodyData } = require('../../server/services/transform-service/response');
const { initial, removeAttributesKey } = require('../mock/response');

const transformOptions = { removeAttributesKey: true, ignoreResponseKeys: [] };

describe('removeAttributesKey', () => {
	// single relation
	test('object with data property of type object', () => {
		const result = modifyResponseBodyData(transformOptions, initial.dataObject);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.dataObject);
	});

	test('object with data property of type null', () => {
		const result = modifyResponseBodyData(transformOptions, initial.dataWithNull);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.dataWithNull);
	});

	// multiple relation
	test('object with data property of type array', () => {
		const result = modifyResponseBodyData(transformOptions, initial.dataArray);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.dataArray);
	});

	test('object with data property of type array with no length', () => {
		const result = modifyResponseBodyData(transformOptions, initial.dataWithEmptyArray);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.dataWithEmptyArray);
	});

	// single component
	test('object with id property', () => {
		const result = modifyResponseBodyData(transformOptions, initial.id);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.id);
	});

	// multiple components
	// dynamic zone
	test('array of objects containing an id property', () => {
		const result = modifyResponseBodyData(transformOptions, initial.arrayWithIds);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.arrayWithIds);
	});

	// skip single media
	test('object with provider property', () => {
		const result = modifyResponseBodyData(transformOptions, initial.provider);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.provider);
	});

	// skip multi media
	test('array of objects containing a provider property', () => {
		const result = modifyResponseBodyData(transformOptions, initial.arrayWithProviders);
		expect(result).toBeDefined();
		expect(result).toEqual(removeAttributesKey.arrayWithProviders);
	});
});

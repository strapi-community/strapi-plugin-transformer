'use strict';

const transformService = require('../server/services/transform-service');
const { dataWithRelationsDataKey, dataWithoutRelationsDataKey } = require('./mock');

const serviceWithRelationsDataKey = transformService({ keepRelationsDataAttribute: true });
const serviceWithoutRelationsDataKey = transformService({ keepRelationsDataAttribute: false });

describe('removeAttributes with data key in relations', () => {
	// single
	test('object with attributes property', () => {
		const result = serviceWithRelationsDataKey.removeAttributeKey(
			dataWithRelationsDataKey.attribute.initial
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithRelationsDataKey.attribute.expect);
	});

	// collection
	test('array of of objects containing an attributes property', () => {
		const result = serviceWithRelationsDataKey.removeAttributeKey(
			dataWithRelationsDataKey.arrayWithAttributes.initial
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithRelationsDataKey.arrayWithAttributes.expect);
	});

	// single relation
	test('object with data property of type object', () => {
		const result = serviceWithRelationsDataKey.removeAttributeKey(
			dataWithRelationsDataKey.dataObject.initial
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithRelationsDataKey.dataObject.expect);
	});

	// multiple relation
	test('object with data property of type array', () => {
		const result = serviceWithRelationsDataKey.removeAttributeKey(
			dataWithRelationsDataKey.dataArray.initial
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithRelationsDataKey.dataArray.expect);
	});

	// single component
	test('object with id property', () => {
		const result = serviceWithRelationsDataKey.removeAttributeKey(
			dataWithRelationsDataKey.id.initial
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithRelationsDataKey.id.expect);
	});

	// multiple components
	// dynamic zone
	test('array of objects containing an id property', () => {
		const result = serviceWithRelationsDataKey.removeAttributeKey(
			dataWithRelationsDataKey.arrayWithIds.initial
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithRelationsDataKey.arrayWithIds.expect);
	});

	// skip single media
	test('object with provider property', () => {
		const result = serviceWithRelationsDataKey.removeAttributeKey(
			dataWithRelationsDataKey.provider.initial
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithRelationsDataKey.provider.expect);
	});

	// skip multi media
	test('array of objects containing a provider property', () => {
		const result = serviceWithRelationsDataKey.removeAttributeKey(
			dataWithRelationsDataKey.arrayWithProviders.initial
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithRelationsDataKey.arrayWithProviders.expect);
	});
});

describe('removeAttributes without data key in relations', () => {
	// single
	test('object with attributes property', () => {
		const result = serviceWithoutRelationsDataKey.removeAttributeKey(
			dataWithoutRelationsDataKey.attribute.initial,
			{
				keepRelationsDataAttribute: false,
			}
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithoutRelationsDataKey.attribute.expect);
	});

	// collection
	test('array of of objects containing an attributes property', () => {
		const result = serviceWithoutRelationsDataKey.removeAttributeKey(
			dataWithoutRelationsDataKey.arrayWithAttributes.initial,
			{
				keepRelationsDataAttribute: false,
			}
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithoutRelationsDataKey.arrayWithAttributes.expect);
	});

	// single relation
	test('object with data property of type object', () => {
		const result = serviceWithoutRelationsDataKey.removeAttributeKey(
			dataWithoutRelationsDataKey.dataObject.initial,
			{
				keepRelationsDataAttribute: false,
			}
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithoutRelationsDataKey.dataObject.expect);
	});

	// multiple relation
	test('object with data property of type array', () => {
		const result = serviceWithoutRelationsDataKey.removeAttributeKey(
			dataWithoutRelationsDataKey.dataArray.initial,
			{
				keepRelationsDataAttribute: false,
			}
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithoutRelationsDataKey.dataArray.expect);
	});

	// single component
	test('object with id property', () => {
		const result = serviceWithoutRelationsDataKey.removeAttributeKey(
			dataWithoutRelationsDataKey.id.initial,
			{
				keepRelationsDataAttribute: false,
			}
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithoutRelationsDataKey.id.expect);
	});

	// multiple components
	// dynamic zone
	test('array of objects containing an id property', () => {
		const result = serviceWithoutRelationsDataKey.removeAttributeKey(
			dataWithoutRelationsDataKey.arrayWithIds.initial,
			{
				keepRelationsDataAttribute: false,
			}
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithoutRelationsDataKey.arrayWithIds.expect);
	});

	// skip single media
	test('object with provider property', () => {
		const result = serviceWithoutRelationsDataKey.removeAttributeKey(
			dataWithoutRelationsDataKey.provider.initial,
			{
				keepRelationsDataAttribute: false,
			}
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithoutRelationsDataKey.provider.expect);
	});

	// skip multi media
	test('array of objects containing a provider property', () => {
		const result = serviceWithoutRelationsDataKey.removeAttributeKey(
			dataWithoutRelationsDataKey.arrayWithProviders.initial,
			{
				keepRelationsDataAttribute: false,
			}
		);
		expect(result).toBeDefined();
		expect(result).toEqual(dataWithoutRelationsDataKey.arrayWithProviders.expect);
	});
});

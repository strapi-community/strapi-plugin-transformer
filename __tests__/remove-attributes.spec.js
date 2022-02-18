const transformService = require('../server/services/transform-service');

const { removeAttributeKey } = transformService();
const { data } = require('./mock');

describe('removeAttributes', () => {
	// single
	test('object with attributes property', () => {
		const result = removeAttributeKey(data.attribute.initial);
		expect(result).toBeDefined();
		expect(result).toEqual(data.attribute.expect);
	});

	// collection
	test('array of of objects containing an attributes property', () => {
		const result = removeAttributeKey(data.arrayWithAttributes.initial);
		expect(result).toBeDefined();
		expect(result).toEqual(data.arrayWithAttributes.expect);
	});

	// single relation
	test('object with data property of type object', () => {
		const result = removeAttributeKey(data.dataObject.initial);
		expect(result).toBeDefined();
		expect(result).toEqual(data.dataObject.expect);
	});

	// multiple relation
	test('object with data property of type array', () => {
		const result = removeAttributeKey(data.dataArray.initial);
		expect(result).toBeDefined();
		expect(result).toEqual(data.dataArray.expect);
	});

	// single component
	test('object with id property', () => {
		const result = removeAttributeKey(data.id.initial);
		expect(result).toBeDefined();
		expect(result).toEqual(data.id.expect);
	});

	// multiple components
	// dynamic zone
	test('array of objects containing an id property', () => {
		const result = removeAttributeKey(data.arrayWithIds.initial);
		expect(result).toBeDefined();
		expect(result).toEqual(data.arrayWithIds.expect);
	});

	// skip single media
	test('object with provider property', () => {
		const result = removeAttributeKey(data.provider.initial);
		expect(result).toBeDefined();
		expect(result).toEqual(data.provider.expect);
	});

	// skip multi media
	test('array of objects containing a provider property', () => {
		const result = removeAttributeKey(data.arrayWithProviders.initial);
		expect(result).toBeDefined();
		expect(result).toEqual(data.arrayWithProviders.expect);
	});
});

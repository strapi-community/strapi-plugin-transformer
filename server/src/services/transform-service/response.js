const _ = require('lodash');
const { removeObjectKey } = require('./util');

/**
 *
 * @param {object} transforms
 * @param {boolean} transforms.removeAttributesKey
 * @param {boolean} transforms.removeDataKey
 * @param {object} ctx
 */
function transformResponse(transforms = {}, ctx) {
	// transform data
	if (transforms.removeAttributesKey || transforms.removeDataKey) {
		ctx.body.data = modifyResponseBodyData(transforms, ctx.body.data);
	}
}

/**
 * Modify the response body according to reponse transform settings
 *
 * @param {object} transforms
 * @param {boolean} transforms.removeAttributesKey
 * @param {boolean} transforms.removeDataKey
 * @param {object} data
 * @returns {object} transformed body data
 */
function modifyResponseBodyData(transforms = {}, data) {
	// removeAttributeKey specific transformations
	if (transforms.removeAttributesKey) {
		// single
		if (_.has(data, 'attributes')) {
			return modifyResponseBodyData(transforms, removeObjectKey(data, 'attributes'));
		}

		// collection
		if (_.isArray(data) && data.length && _.has(_.head(data), 'attributes')) {
			return data.map((e) => modifyResponseBodyData(transforms, e));
		}
	}

	// fields
	_.forEach(data, (value, key) => {
		if (!value) {
			return;
		}

		// removeDataKey specific transformations
		if (transforms.removeDataKey) {
			// single
			if (_.isObject(value)) {
				data[key] = modifyResponseBodyData(transforms, value);
			}

			// many
			if (_.isArray(value)) {
				data[key] = value.map((field) => modifyResponseBodyData(transforms, field));
			}
		}

		// relation(s)
		if (_.has(value, 'data')) {
			let relation = null;
			// single
			if (_.isObject(value.data)) {
				relation = modifyResponseBodyData(transforms, value.data);
			}

			// many
			if (_.isArray(value.data)) {
				relation = value.data.map((e) => modifyResponseBodyData(transforms, e));
			}

			if (transforms.removeDataKey) {
				data[key] = relation;
			} else {
				data[key]['data'] = relation;
			}
		}

		// single component
		if (_.has(value, 'id')) {
			data[key] = modifyResponseBodyData(transforms, value);
		}

		// repeatable component & dynamic zone
		if (_.isArray(value) && _.has(_.head(value), 'id')) {
			data[key] = value.map((p) => modifyResponseBodyData(transforms, p));
		}

		// single media
		if (_.has(value, 'provider')) {
			return;
		}

		// multi media
		if (_.isArray(value) && _.has(_.head(value), 'provider')) {
			return;
		}
	});

	return data;
}

module.exports = {
	transformResponse,
	modifyResponseBodyData,
};

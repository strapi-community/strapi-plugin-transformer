'use strict';

const _ = require('lodash');
const { removeObjectKey } = require('../util/removeObjectKey');

module.exports = () => ({
	/**
	 *
	 * @param {object} transforms
	 * @param {boolean} transforms.removeAttributesKey
	 * @param {boolean} transforms.removeDataKey
	 * @param {object} data
	 * @returns {object} transformed data
	 */
	transformResponse: function traverse(transforms, data) {
		// removeAttributeKey specific transformations
		if (transforms.removeAttributesKey) {
			// single
			if (_.has(data, 'attributes')) {
				return traverse(transforms, removeObjectKey(data, 'attributes'));
			}

			// collection
			if (_.isArray(data) && data.length && _.has(_.head(data), 'attributes')) {
				return data.map((e) => traverse(transforms, e));
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
					data[key] = traverse(transforms, value);
				}

				// many
				if (_.isArray(value)) {
					data[key] = value.map((field) => traverse(transforms, field));
				}
			}

			// relation(s)
			if (_.has(value, 'data')) {
				let relation = null;
				// single
				if (_.isObject(value.data)) {
					relation = traverse(transforms, value.data);
				}

				// many
				if (_.isArray(value.data)) {
					relation = value.data.map((e) => traverse(transforms, e));
				}

				if (transforms.removeDataKey) {
					data[key] = relation;
				} else {
					data[key]['data'] = relation;
				}
			}

			// single component
			if (_.has(value, 'id')) {
				data[key] = traverse(transforms, value);
			}

			// repeatable component & dynamic zone
			if (_.isArray(value) && _.has(_.head(value), 'id')) {
				data[key] = value.map((p) => traverse(transforms, p));
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
	},

	response(settings, data) {
		if (settings && settings.responseTransforms) {
			data = this.transformResponse(settings.responseTransforms, data);
		}

		return data;
	},
});

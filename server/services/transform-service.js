'use strict';

const _ = require('lodash');
const { removeObjectKey } = require('../util/removeObjectKey');

const defaultOptions = {
	keepRelationsDataAttribute: true,
};

module.exports = (options = defaultOptions) => ({
	removeAttributeKey: function transform(data) {
		// single
		if (_.has(data, 'attributes')) {
			return transform(removeObjectKey(data, 'attributes'));
		}

		// collection
		if (_.isArray(data) && data.length && _.has(_.head(data), 'attributes')) {
			return data.map((e) => transform(e));
		}

		// fields
		_.forEach(data, (value, key) => {
			if (!value) {
				return;
			}

			// relation(s)
			if (_.has(value, 'data')) {
				// single
				if (_.isObject(value.data)) {
					if (options.keepRelationsDataAttribute) {
						data[key]['data'] = transform(value.data);
					} else {
						data[key] = transform(value.data);
					}
				}

				// many
				if (_.isArray(value.data)) {
					if (options.keepRelationsDataAttribute) {
						data[key]['data'] = value.data.map((e) => transform(e));
					} else {
						data[key] = value.data.map((e) => transform(e));
					}
				}

				// null data
				if (!options.keepRelationsDataAttribute && value.data === null) {
					data[key] = null;
				}
			}

			// single component
			if (_.has(value, 'id')) {
				data[key] = transform(value);
			}

			// repeatable component & dynamic zone
			if (_.isArray(value) && _.has(_.head(value), 'id')) {
				data[key] = value.map((p) => transform(p));
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
});

const _ = require('lodash');
const { removeObjectKey } = require('../util/removeObjectKey');

module.exports = () => ({
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
					data[key]['data'] = transform(value.data);
				}

				// many
				if (_.isArray(value.data)) {
					data[key]['data'] = value.data.map((e) => transform(e));
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

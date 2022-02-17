const _ = require('lodash');

module.exports = () => ({
	index: function transform(data) {
		// collection
		if (Array.isArray(data) && data.length && data[0].attributes) {
			return data.map((e) => transform(e));
		}

		// single / attributes
		if (_.has(data, 'attributes')) {
			return transform({
				id: data.id,
				...data.attributes,
			});
		}

		// relation(s)
		_.forEach(data, (value, key) => {
			if (value && !Array.isArray(value) && value.data) {
				data[key] = transform(value.data);
			}
		});

		return data;
	},
});

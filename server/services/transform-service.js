const _ = require('lodash');

module.exports = () => ({
	index: function transform(data) {
		// array
		if (Array.isArray(data) && data.length && data[0].attributes) {
			return data.map((e) => transform(e));
		}

		// attributes
		if (_.has(data, 'attributes')) {
			return transform({
				id: data.id,
				...data.attributes,
			});
		}

		// relation
		const key = _.findKey(data, (p) => p && !Array.isArray(p) && p.data);
		if (key) {
			data[key] = transform(data[key].data);
		}

		return data;
	},
});

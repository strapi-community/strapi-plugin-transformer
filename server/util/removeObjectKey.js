'use strict';

const removeObjectKey = (object, key) => ({
	id: object.id,
	...object[key],
});

module.exports = {
	removeObjectKey,
};

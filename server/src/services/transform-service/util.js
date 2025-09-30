function removeObjectKey(object, key) {
	return {
		id: object.id,
		...object[key],
	};
}

module.exports = {
	removeObjectKey,
};

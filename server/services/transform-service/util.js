function removeObjectKey(object, key) {
	return {
		id: object.id,
		...object[key],
	};
}

const matchRule = (str, rule) => {
	const escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
  }

module.exports = {
	removeObjectKey,
	matchRule
};

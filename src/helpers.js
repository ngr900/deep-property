const DeepPropertyError = require('./DeepPropertyError');


function validateKeyPath(keyPath) {
	const isArray = keyPath instanceof Array;
	const isString = typeof keyPath === 'string';

	if (!isArray && !isString) {
		throw new DeepPropertyError(
			`keyPath must be an array or a string, got ${typeof keyPath}`
		);
	}

	if (isArray) {
		let nonStringValue;
		const foundNonString = keyPath.some((value) => {
			if (typeof value !== 'string') {
				nonStringValue = value;
				return true;
			}
		});
		if (foundNonString) {
			throw new DeepPropertyError(
				`keyPath array may only contain strings, got ${typeof nonStringValue}`
			);
		}
	}

	if (isString && keyPath.indexOf('.') !== -1) {
		return keyPath.split('.');
	}

	return isArray ? [...keyPath] : [keyPath];
}

module.exports = {validateKeyPath};
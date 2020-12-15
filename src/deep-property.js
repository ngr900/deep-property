const {validateKeyPath} = require('./helpers');
const DeepPropertyError = require('./DeepPropertyError');

function ensureValidStep(position, step, traversed, create = false) {
	if (!Object.keys(position).includes(step)) {
		if (create) {
			position[step] = {};
		} else {
			throw new Error();
		}
	} else if (typeof position[step] !== 'object') {
		throw new Error();
	}
}

function traverseObject(dataObject, keyPath, create = false) {
	keyPath = [...keyPath];
	let position = dataObject;
	const traversed = [];
	while (keyPath.length > 1) {
		const step = keyPath.shift();
		ensureValidStep(position, step, traversed, create);
		traversed.push(step);
		position = position[step];
	}
	return position;
}

function setDeepProperty(dataObject, keyPath, value) {
	keyPath = validateKeyPath(keyPath);

	try {
		const target = traverseObject(dataObject, keyPath, true);
		target[keyPath.pop()] = value;
	} catch (error) {
		return dataObject;
	}
	return dataObject;
}

function extractDeepProperty(dataObject, keyPath) {
	keyPath = validateKeyPath(keyPath);

	try {
		const target = traverseObject(dataObject, keyPath);
		const key = keyPath.pop();
		if (!Object.keys(target).includes(key)) {
			return [false, undefined];
		}
		const value = target[key];
		return [true, value];
	} catch (error) {
		return [false, undefined];
	}
}

function getDeepProperty(dataObject, keyPath) {
	keyPath = validateKeyPath(keyPath);
	try {
		return extractDeepProperty(dataObject, keyPath)[1];
	} catch (error) {
		return undefined;
	}
}

function hasDeepProperty(dataObject, keyPath) {
	keyPath = validateKeyPath(keyPath);
	try {
		return extractDeepProperty(dataObject, keyPath)[0];
	} catch (error) {
		return false;
	}
}

module.exports = {
	setDeepProperty,
	getDeepProperty,
	hasDeepProperty,
	extractDeepProperty,
	set: setDeepProperty,
	get: getDeepProperty,
	has: hasDeepProperty,
	extract: extractDeepProperty,
	DeepPropertyError
};

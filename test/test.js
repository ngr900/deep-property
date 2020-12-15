const { expect } = require('chai');
const {
	setDeepProperty,
	getDeepProperty,
	hasDeepProperty,
	extractDeepProperty,
	DeepPropertyError,
} = require('./../src/deep-property.js');
const { validateKeyPath } = require('./../src/helpers');

const getTestCases = require('./testCases');

describe('validateKeyPath', function () {
	it('accepts strings or arrays of strings', function () {
		const { validPaths } = getTestCases();
		for (const validKeyPath of validPaths) {
			expect(function () {
				validateKeyPath(validKeyPath);
			}).to.not.throw;
		}
	});
	it('and throws a DeepPropertyError otherwise', function () {
		const { invalidPaths } = getTestCases();
		for (const invalidKeyPath of invalidPaths) {
			expect(function () {
				validateKeyPath(invalidKeyPath);
			}).to.throw(DeepPropertyError);
		}
	});
	it('does not mutate the keyPath array', function () {
		const keyPath = ['one', 'two', 'three'];
		const originalKeyPath = [...keyPath];
		validateKeyPath(keyPath);
		for (const [index, value] of keyPath.entries()) {
			expect(value).to.equal(originalKeyPath[index]);
		}
	});
	it('transforms dot path strings into arrays', function () {
		const { dotPaths } = getTestCases();
		for (const { path: dotKeyPathString } of dotPaths) {
			expect(validateKeyPath(dotKeyPathString)).to.have.all.members(
				dotKeyPathString.split('.')
			);
		}
	});
});

describe('extractDeepProperty', function () {
	it('returns [true, value] for existing property paths', function () {
		const { dataObject, validPaths } = getTestCases();
		for (const { path: keyPath, value: expectedValue } of validPaths) {
			const [exists, value] = extractDeepProperty(dataObject, keyPath);
			expect(exists).to.be.true;
			expect(value).to.equal(expectedValue);
		}
	});
	it('returns [false, undefined] for non-existant property paths', function () {
		const { dataObject, nonexistantPaths } = getTestCases();
		for (const keyPath of nonexistantPaths) {
			const [exists, value] = extractDeepProperty(dataObject, keyPath);
			expect(exists).to.be.false;
			expect(value).to.equal(undefined);
		}
	});
	it('returns [true, undefined] if the property value is set but equal to undefined', function () {
		const { dataObjectWithUndefined, pathToUndefined } = getTestCases();
		const [exists, value] = extractDeepProperty(
			dataObjectWithUndefined,
			pathToUndefined
		);
		expect(exists).to.be.true;
		expect(value).to.equal(undefined);
	});
});

describe('getDeepProperty', function () {
	it('returns the value of existing property paths', function () {
		const { dataObject, validPaths } = getTestCases();
		for (const { path: keyPath, value: expectedValue } of validPaths) {
			const value = getDeepProperty(dataObject, keyPath);
			expect(value).to.equal(expectedValue);
		}
	});
	it('returns undefined for non-existant property paths', function () {
		const { dataObject, nonexistantPaths } = getTestCases();
		for (const keyPath of nonexistantPaths) {
			const value = getDeepProperty(dataObject, keyPath);
			expect(value).to.equal(undefined);
		}
	});
	it('returns undefined if the property value is set but equal to undefined', function () {
		const { dataObjectWithUndefined, pathToUndefined } = getTestCases();
		const value = getDeepProperty(dataObjectWithUndefined, pathToUndefined);
		expect(value).to.equal(undefined);
	});
});

describe('hasDeepProperty', function () {
	it('returns true for existing property paths', function () {
		const { dataObject, validPaths } = getTestCases();
		for (const { path: keyPath } of validPaths) {
			const exists = hasDeepProperty(dataObject, keyPath);
			expect(exists).to.be.true;
		}
	});
	it('returns false for non-existant property paths', function () {
		const { dataObject, nonexistantPaths } = getTestCases();
		for (const keyPath of nonexistantPaths) {
			const exists = hasDeepProperty(dataObject, keyPath);
			expect(exists).to.be.false;
		}
	});
	it('returns true if the property value is set but equal to undefined', function () {
		const { dataObjectWithUndefined, pathToUndefined } = getTestCases();
		const exists = hasDeepProperty(dataObjectWithUndefined, pathToUndefined);
		expect(exists).to.be.true;
	});
});

describe('setDeepProperty', function () {
	it('sets new values of deep properties', function () {
		const { propertiesToSet, dataObject } = getTestCases();
		for (const { path: keyPath, value, retrieveValue } of propertiesToSet) {
			setDeepProperty(dataObject, keyPath, value);
			expect(value).to.equal(retrieveValue(dataObject));
		}
	});
	it('overwrites existing values of deep properties', function () {
		const { propertiesToOverwrite, dataObject } = getTestCases();
		for (const {
			path: keyPath,
			value: valueToSet,
			retrieveValue,
		} of propertiesToOverwrite) {
      const oldValue = retrieveValue(dataObject);
      expect(oldValue).to.not.equal(valueToSet);
			setDeepProperty(dataObject, keyPath, valueToSet);
			const newValue = retrieveValue(dataObject);
			expect(newValue).to.equal(valueToSet);
			expect(newValue).to.not.equal(oldValue);
		}
  });
  it('returns the modified object', function() {
    const objectToModify = {};
    const keyPath = ['one', 'two', 'three'];
    const returnedObject = setDeepProperty(objectToModify, keyPath, 'some value');
    expect(returnedObject).to.equal(objectToModify);
  })
});

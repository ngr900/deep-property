const deep = require('./src/deep-property');

const data = {};

// works with dot paths and arrays
deep.set(data, 'name', 'Pembroke Welsh Corgi');
deep.set(data, 'traits.coat.length', 'medium');
deep.set(data, ['traits', 'coat', 'thickness'], 'thick');
deep.set(data, 'traits.lifeSpan', [12, 15]);

deep.get(data, ['traits', 'coat', 'length']) // "medium"
deep.get(data, 'traits.coat.thickness') // "thick"

deep.has(data, 'traits.coat.thickness') // true
deep.has(data, 'traits.weight') // false

deep.extract(data, 'traits.coat.length') // [true, "medium"]
deep.extract(data, 'traits.weight') // [false, undefined]

// alternatively

const {
  setDeepProperty,
  getDeepProperty,
  hasDeepProperty,
  extractDeepProperty
} = require ('./src/deep-property');

setDeepProperty(data, 'traits.butt.cuteness', 'very');
hasDeepProperty(data, 'traits.butt.cuteness') // true
getDeepProperty(data, 'traits.butt.cuteness') // "very"
extractDeepProperty(data, 'traits.butt.cuteness') // [true, "very"]

console.log(data);


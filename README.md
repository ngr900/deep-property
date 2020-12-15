# deep-property

Simple, tiny, fully tested library for setting and retrieving deep properties from objects. While there are already multiple libraries designed to do this, none of them fit my use case perfectly so I wrote another one.

# Usage

```
npm install @ngr900/deep-property
```

```javascript
const deep = require('@ngr900/deep-property');

const breed = {};

// works with dot paths and arrays
deep.set(breed, 'name', 'Pembroke Welsh Corgi');
deep.set(breed, 'traits.coat.length', 'medium');
deep.set(breed, ['traits', 'coat', 'thickness'], 'thick');
deep.set(breed, 'traits.lifeSpan', [12, 15]);

deep.get(breed, ['traits', 'coat', 'length']) // "medium"
deep.get(breed, 'traits.coat.thickness') // "thick"

deep.has(breed, 'traits.coat.thickness') // true
deep.has(breed, 'traits.weight') // false

deep.extract(breed, 'traits.coat.length') // [true, "medium"]
deep.extract(breed, 'traits.weight') // [false, undefined]

// alternatively

const {
  setDeepProperty,
  getDeepProperty,
  hasDeepProperty,
  extractDeepProperty
} = require ('@ngr900/deep-property');

setDeepProperty(breed, 'traits.butt.cuteness', 'very');
hasDeepProperty(breed, 'traits.butt.cuteness') // true
getDeepProperty(breed, 'traits.butt.cuteness') // "very"
extractDeepProperty(breed, 'traits.butt.cuteness') // [true, "very"]
```
Result:
```javascript
{
  name: 'Pembroke Welsh Corgi',
  traits: {
    coat: {
      length: 'medium',
      thickness: 'thick'
    },
    lifeSpan: [ 12, 15 ],
    butt: {
      cuteness: 'very'
    }
  }
}
```

# API

As the first two arguments all functions accept:
- `dataObject` - target object
- `keyPath` - path to the target property, given as a dot path or an array of strings

In addition, `setDeepProperty` accepts a `value` for the property as its third argument.

As demonstrated above, all functions are exported by their full names (e.g. `getDeepProperty`) as well as by shorthand (e.g. `get` or `has`).

## setDeepProperty(dataObject, keyPath, value)

Sets the property at `keyPath` on `dataObject` to `value`. Returns the modified object.

## getDeepProperty(dataObject, keyPath)

Returns the value of the property at `keyPath` on `dataObject`.

## hasDeepProperty(dataObject, keyPath)

Returns `true` if the property at `keyPath` on `dataObject` is set, and `false` if it is not. 

If the property at `keyPath` is explicitly set to `undefined` (e.g. `{foo: undefined}`), this function will return `true`.

## extractDeepProperty(dataObject, keyPath)

Returns an array containing a `boolean` representing the existance of the property at `keyPath` and its value (e.g. `[true, "some value"]` or `[false, undefined]`).

If the property at `keyPath` is explicitly set to `undefined` (e.g. `{foo: undefined}`), this function will return `[true, undefined]`.

# License

Copyright 2020 Kamil Szydlowski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
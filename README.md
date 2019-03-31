# @h-Reser/deep-assign
[![Build Status](https://travis-ci.com/h-Reser/deep-assign.png?branch=master)](https://travis-ci.com/h-Reser/deep-assign)
[![npm version](https://badge.fury.io/js/%40h-reser%2Fdeep-assign.svg)](https://badge.fury.io/js/%40h-reser%2Fdeep-assign)
[![dependencies Status](https://david-dm.org/h-Reser/deep-assign/status.svg)](https://david-dm.org/h-Reser/deep-assign)
[![devDependencies Status](https://david-dm.org/h-Reser/deep-assign/dev-status.svg)](https://david-dm.org/h-Reser/deep-assign?type=dev)

Deep-clones and deep-merges objects. Behaves as close as possible to Object.assign() for objects with a depth of 1.

## Installation

```
npm i @h-reser/deep-assign
```

## Usage
### Example 1
Deep-merging of 2 objects
```
import deepAssign from "@h-reser/deep-assign";

const object1 = {
  a: 1,
  b: {
    c: 3,
    d: 4,
    e: [1, 2]
  }
};

const object2 = {
  b: {
    c: 33,
    e: [11]
  }
};

const res = deepAssign<object>(object1, object2);
console.log(res); // Returns: { a: 1, b: { c: 33, d: 4, e: [ 11, 2 ] } }
```
### Example 2
Deep-merging 2 arrays
```
import deepAssign from "../deep-assign";

const array1 = [
  1,
  {
    b: 2,
    c: 3
  },
  4
];

const array2 = [
  11,
  {
    c: 33
  }
];

const res = deepAssign(array1, array2);
console.log(res); // Returns: [ 11, { b: 2, c: 33 }, 4 ]
```
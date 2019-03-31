const deepAssign = require("..").default;
const assert = require('chai').assert;

function isPlainObject(value) {
  return !!value && value.constructor === Object;
}

describe("deepAssign", () => {
  it("should behave like Object.assign with a number as target and no source", () => {
    const res = deepAssign(1);
    const ObjAssign = Object.assign(1);
    function evaluate(x) {
      return !isPlainObject(x) && x.constructor === Number;
    }
    assert.equal(evaluate(res), evaluate(ObjAssign));
  });
  it("should behave like Object.assign with an object as target and a number as source", () => {
    const res = deepAssign({}, 1);
    const ObjAssign = Object.assign({}, 1);
    function evaluate(x) {
      return isPlainObject(x) && Object.keys(x).length === 0 && x.constructor !== Number;
    }
    assert.equal(evaluate(res), evaluate(ObjAssign));
  });
  it("should behave like Object.assign with a string as target and no source", () => {
    const str = "asdf";
    const res = deepAssign(str);
    const ObjAssign = Object.assign(str);
    function evaluate(x) {
      return x.constructor === String;
    }
    const evaluation = evaluate(res) && evaluate(ObjAssign);
    assert.equal(evaluation, true);
  });
  it("should behave like Object.assign with an object as target and a string as source", () => {
    const str = "asdf";
    const res = deepAssign({}, str);
    const ObjAssign = Object.assign({}, str);
    function evaluate(x) {
      return isPlainObject(x) && Object.keys(x).length === str.length;
    }
    const evaluation = evaluate(res) && evaluate(ObjAssign);
    assert.equal(evaluation, true);
  });
  it("should behave like Object.assign with an array as target and a string as source", () => {
    const str = "asdf";
    const res = deepAssign([], str);
    const ObjAssign = Object.assign([], str);
    function evaluate(x) {
      return Array.isArray(x) && Object.keys(x).length === str.length;
    }
    const evaluation = evaluate(res) && evaluate(ObjAssign);
    assert.equal(evaluation, true);
  });
  it("should behave like Object.assign with an object as target and two objects as a source", () => {
    const sample1 = { a: 1 };
    const sample2 = { b: 2 };
    const res = deepAssign({}, sample1, sample2);
    const ObjAssign = Object.assign({}, sample1, sample2);
    function evaluate(x) {
      return JSON.stringify(x);
    }
    const evaluation = evaluate(res) === evaluate(ObjAssign);
    assert.equal(evaluation, true);
  });
  it("should behave like Object.assign with an array as target and two objects as a source", () => {
    const sample1 = { a: 1 };
    const sample2 = { b: 2 };
    const res = deepAssign([], sample1, sample2);
    const ObjAssign = Object.assign([], sample1, sample2);
    function evaluate(x) {
      return JSON.stringify(x);
    }
    const evaluation = evaluate(res) === evaluate(ObjAssign);
    assert.equal(evaluation, true);
  });
  it("should merge nested objects", () => {
    const sample1 = { a: 1, b: { c: 3 } };
    const sample2 = { b: { d: 4 } };
    const res = deepAssign({}, sample1, sample2);
    function evaluate(x) {
      return Object.keys(x).length === 2 && isPlainObject(x.b) && x.b.c === 3 && x.b.d === 4;
    }
    const evaluation = evaluate(res);
    assert.equal(evaluation, true);
  });
  it("should have created a copy", () => {
    const sample1 = { a: 1, b: { c: 3 } };
    const sample2 = { b: { d: 4 } };
    const res = deepAssign({}, sample1, sample2);
    sample1.a = 11;
    sample1.b.c = 33;
    function evaluate(x) {
      return Object.keys(x).length === 2 && isPlainObject(x.b) && x.b.c === 3 && x.b.d === 4;
    }
    const evaluation = evaluate(res);
    assert.equal(evaluation, true);
  });
  it("should overwrite previous properties", () => {
    const sample1 = { a: 1, b: { c: 3 } };
    const sample2 = { b: { c: 4 } };
    const res = deepAssign({}, sample1, sample2);
    function evaluate(x) {
      return Object.keys(x).length === 2 && isPlainObject(x.b) && x.b.c === 4;
    }
    const evaluation = evaluate(res);
    assert.equal(evaluation, true);
  });
  it("should merge nested arrays", () => {
    const sample1 = [1, [2, 3]];
    const sample2 = [1, [22]];
    const res = deepAssign([], sample1, sample2);
    function evaluate(x) {
      return x.length === 2 && x[1].length === 2 && x[1][0] === 22 && x[1][1] === 3;
    }
    const evaluation = evaluate(res);
    assert.equal(evaluation, true);
  });
  it("should have created a copy when merging to an array", () => {
    const sample1 = [1, [2, 3]];
    const sample2 = [1, [22]];
    const res = deepAssign([], sample1, sample2);
    sample1[1][2] = 33;
    function evaluate(x) {
      return x.length === 2 && x[1][1] === 3;
    }
    const evaluation = evaluate(res);
    assert.equal(evaluation, true);
  });
  it("should overwrite previous properties when merging to an array", () => {
    const sample1 = [1, [2, 3]];
    const sample2 = [1, [22]];
    const res = deepAssign([], sample1, sample2);
    function evaluate(x) {
      return x.length === 2 && x[1][0] === 22;
    }
    const evaluation = evaluate(res);
    assert.equal(evaluation, true);
  });
  it("should have created a copy of a Map object", () => {
    const sample = { a: new Map() };
    const res = deepAssign({}, sample);
    sample.a.set("a", 1);
    function evaluate(x) {
      return !x.a.has("a");
    }
    const evaluation = evaluate(res);
    assert.equal(evaluation, true);
  });
  it("should have merged the two Map objects", () => {
    const sample1 = { a: new Map() };
    sample1.a.set("a", 1);
    const sample2 = { a: new Map() };
    sample2.a.set("b", 2);
    const res = deepAssign({}, sample1, sample2);
    function evaluate(x) {
      return x.a.size === 2;
    }
    const evaluation = evaluate(res);
    assert.equal(evaluation, true);
  });
  it("should overwrite previous properties of a Map object", () => {
    const sample1 = { a: new Map() };
    sample1.a.set("a", 1);
    const sample2 = { a: new Map() };
    sample2.a.set("a", 11);
    const res = deepAssign({}, sample1, sample2);
    function evaluate(x) {
      return x.a.get("a") === 11;
    }
    const evaluation = evaluate(res);
    assert.equal(evaluation, true);
  });
  it("should have created a copy of a Set object", () => {
    const sample = { a: new Set() };
    const res = deepAssign({}, sample);
    sample.a.add(1);
    function evaluate(x) {
      return !x.a.has(1);
    }
    const evaluation = evaluate(res);
    assert.equal(evaluation, true);
  });
  it("should have merged the two Set objects", () => {
    const sample1 = { a: new Set() };
    sample1.a.add(1);
    sample1.a.add(3);
    const sample2 = { a: new Set() };
    sample2.a.add(2);
    const res = deepAssign({}, sample1, sample2);
    function evaluate(x) {
      return x.a.size === 3;
    }
    const evaluation = evaluate(res);
    assert.equal(evaluation, true);
  });
  it("should have kept the original date", () => {
    const sample = { a: new Date('December 17, 1995 03:24:00') };
    const res = deepAssign({}, sample);
    sample.a = new Date('December 18, 1995 03:24:00');
    function evaluate(x) {
      return x.a.getTime() == 819167040000;
    }
    const evaluation = evaluate(res);
    assert.equal(evaluation, true);
  });
});
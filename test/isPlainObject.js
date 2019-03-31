const Fn = require("../dist/isPlainObject").default;
const expect = require('chai').expect;

describe("isPlainObject", () => {
  it("should return true for a plain object", () => {
    expect(Fn({})).to.be.true;
  });
  it("should return false for another kind of object", () => {
    expect(Fn(new Map())).to.be.false;
  });
});
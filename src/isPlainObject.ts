function isPlainObject<T>(value: T) {
  return !!value && value.constructor === Object;
}

export default isPlainObject;
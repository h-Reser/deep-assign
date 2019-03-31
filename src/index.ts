import isPlainObject from "./isPlainObject";

function deepAssign<T>(target: any, ...sources: any[]): T {

  if (!sources.length) {
    return Object(target);
  }

  const to = Array.isArray(target)
    ? Object.assign([], target)
    : Object.assign({}, target);

  sources.forEach((source) => {

    (Object.keys(source)).forEach((prop) => {

      if (isPlainObject(source[prop])) {
        to[prop] = deepAssign(to[prop], source[prop]);
        return;
      }

      if (Array.isArray(source[prop])) {
        to[prop] = typeof to[prop] === "undefined" || to[prop] === null
          ? source[prop]
          : deepAssign(to[prop], source[prop]);
        return;
      }

      if (to[prop] instanceof Map && source[prop] instanceof Map) {
        source[prop].forEach((value: any, key: any) => {
          to[prop].set(key, value);
        });
        return;
      }

      if (source[prop] instanceof Map) {
        to[prop] = new Map(source[prop]);
        return;
      }

      if (to[prop] instanceof Set && source[prop] instanceof Set) {
        source[prop].forEach((value: any) => {
          to[prop].add(value);
        });
        return;
      }

      if (source[prop] instanceof Set) {
        to[prop] = new Set(source[prop]);
        return;
      }

      if (source[prop] instanceof Date) {
        to[prop] = new Date(source[prop].getTime());
        return;
      }

      to[prop] = source[prop];
    });

  });

  return to;
}

export default deepAssign;
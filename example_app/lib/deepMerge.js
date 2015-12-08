function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function isObject(arg) {
  return typeof arg === 'object';
}

/**
 * Deep merge objects.
 */
export default function deepMerge() {
  const target = {...arguments[0]};

  Object.keys(arguments).forEach(index => {
    if (index === 0) {
      return;
    }

    const obj = arguments[index];

    for (const key in obj) {
      if (!hasOwn(obj, key)) {
        continue;
      }

      const val = obj[key];

      if (val instanceof Array) {
        target[key] = val;
      }
      else if (isObject(val) && isObject(target[key])) {
        target[key] = deepMerge(target[key], val);
      }
      else {
        target[key] = val;
      }
    }
  });

  return target;
}

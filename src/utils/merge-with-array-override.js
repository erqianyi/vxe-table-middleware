import { isPlainObject } from 'xe-utils';
export const mergeWithArrayOverride = (target, source) => {
  for (const key in source) {
    if (target.hasOwnProperty(key)) {
      if (isPlainObject(source[key])) {
        mergeWithArrayOverride(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    } else {
      target[key] = source[key];
    }
  }
  return target;
};

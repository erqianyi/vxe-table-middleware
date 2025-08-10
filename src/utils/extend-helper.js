/*
 * @Description  : 扩展辅助函数
 */
import { isFunction, isEmpty } from 'xe-utils';
// option拓展
export const optionExtend = {};

// column拓展
export const columnExtend = {};

// formItem拓展
export const formItemExtend = {};

// 装饰器处理
export function decoratorHandler(ins, extension) {
  if (isEmpty(extension)) return ins;
  for (let key in extension) {
    if (!ins[key]) ins[key] = extension[key].bind(ins);
  }
  return ins;
}

/**
 * 扩展辅助函数
 * @param {string} type 拓展类型
 * @param {object} extension 拓展方法
 */
export function helpersDecorator(type = '', extension = {}) {
  const methods = {};
  Object.entries(extension).forEach(([key, fn]) => {
    if (fn && isFunction(fn)) {
      methods[key] = fn;
    } else {
      console.error(`[helpersDecorator] 目前仅支持拓展实例方法！`);
    }
  });
  if (type === 'option') {
    Object.assign(optionExtend, methods);
  } else if (type === 'column') {
    Object.assign(columnExtend, methods);
  } else if (type === 'formItem') {
    Object.assign(formItemExtend, methods);
  } else {
    throw new Error(`[helpersDecorator] 拓展类型${type}参数异常`);
  }
}

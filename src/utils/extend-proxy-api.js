/*
 * @Description  : 拓展和代理gridApi
 */

import { isFunction } from 'xe-utils';

export class ExtendAndProxyAPI {
  constructor(VxeGridWrapIns) {
    this.gridComp = VxeGridWrapIns;
  }

  _getFn(fnName, ...args) {
    if (!this.gridComp.$children[0]) {
      throw new Error('[useVxeGrid] Grid尚未准备完成！尝试添加 $nextTick');
    }
    const fn = this.gridComp.$children[0][fnName];
    if (fn && isFunction(fn)) {
      return fn(...args);
    } else {
      throw new Error(`[useVxeGrid] gridApi.${fnName} is not a function`);
    }
  }

  /**
   * 更新修改配置项
   * @params {OptionsHelperIns} options 配置项实例
   * @returns Promise
   */
  updateOptions(options) {
    return this.gridComp.updateOptions(options);
  }
  /**
   * 更新修改列配置项
   * @params {ColumnsHelperIns} columns 配置项实例
   * @returns Promise
   */
  updateColumns(columns) {
    return this.gridComp.updateColumns(columns);
  }

  // 实现动态方法，代理所有访问的方法
  get(target, prop) {
    if (typeof prop === 'string' && !(prop in this)) {
      return (...args) => this._getFn(prop, ...args);
    }
    return this[prop];
  }
}

/*
 * @Description  : 拓展和代理gridApi
 */

import { isFunction } from 'xe-utils';
import { VxeGrid } from 'vxe-table/es/grid';

const gridMethods = Object.keys(VxeGrid.methods) || [];

class GridProxyAPI {
  constructor(VxeGridWrapIns) {
    this.VxeGridWrapIns = VxeGridWrapIns;
    gridMethods.forEach((method) => {
      this[method] = (...args) => this._getFn(method, ...args);
    });
  }

  _getFn(fnName, ...args) {
    if (!this.VxeGridWrapIns.$children[0]) {
      throw new Error('[useVxeGrid] Grid尚未准备完成！尝试添加 $nextTick');
    }
    const fn = this.VxeGridWrapIns.$children[0][fnName];
    if (fn && isFunction(fn)) {
      return fn(...args);
    } else {
      throw new Error(`[useVxeGrid] gridApi.${fnName} is not a function`);
    }
  }
}

export class ExtendAndProxyAPI extends GridProxyAPI {
  constructor(VxeGridWrapIns) {
    super(VxeGridWrapIns);
    this.gridComp = VxeGridWrapIns;
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
}

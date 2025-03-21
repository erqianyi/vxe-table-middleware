/*
 * @Description  : 拓展和代理gridApi
 * @version      : 1.0.0
 * @Author       : 34786
 * @Date         : 2025-02-21 16:45:49
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2025-03-07 15:48:03
 */
import { isFunction } from 'xe-utils';
export class ExtendAndProxyAPI {
  constructor(CommonGridIns) {
    this.gridComp = CommonGridIns;
  }

  _getFn(fnName, ...args) {
    if (!this.gridComp.$children[0]) {
      throw new Error('[useCommonGrid] Grid尚未准备完成！尝试添加 $nextTick');
    }
    const fn = this.gridComp.$children[0][fnName];
    if (fn && isFunction(fn)) {
      return fn(...args);
    } else {
      throw new Error(`[useCommonGrid] gridApi.${fnName} is not a function`);
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
  // 代理所有访问的方法
  [fnName](...args) {
    return this._getFn(fnName, ...args);
  }

  // async loadData(data) {
  //   await this.gridComp.$nextTick();
  //   return this._getFn('loadData', data);
  // }
}

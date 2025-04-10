/*
 * @Description  : 拓展和代理gridApi
 */

import { VxeGrid } from 'vxe-table/es/grid';

const gridMethods = Object.keys(VxeGrid.methods || {}) || [];

class GridProxyAPI {
  constructor(VxeGridWrapIns) {
    this.VxeGridWrapIns = VxeGridWrapIns;
    this.initGridMethods();
  }

  initGridMethods() {
    gridMethods.forEach((method) => {
      this[method] = (...args) => this.proxyGridMethods(method, ...args);
    });
  }

  proxyGridMethods(method, ...args) {
    return this.VxeGridWrapIns._callGridAPI(method, ...args);
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

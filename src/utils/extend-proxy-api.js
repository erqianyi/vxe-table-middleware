/*
 * @Description  : 拓展和代理gridApi
 */

import { VxeGrid } from 'vxe-table/es/grid';

const vxeGridMethods = Object.keys(VxeGrid.methods || {}) || [];
// 批量添加getter
function addGetters(cls, fnNames = []) {
  fnNames.forEach((fnName) => {
    Object.defineProperty(cls.prototype, fnName, {
      get() {
        return this.getMethod(fnName);
      },
    });
  });
}
// 代理VxeGrid实例方法（**注意目前未区分是否对外抛出的**）
class GridProxyAPI {
  constructor() {} // eslint-disable-line
  getMethod(method) {
    if (this.gridComp && this.gridComp._callGridAPI) {
      return this.gridComp._callGridAPI(method);
    } else {
      throw new Error('[GridProxyAPI] 子类必须实现 `gridComp`！');
    }
  }
}
addGetters(GridProxyAPI, vxeGridMethods);

// 拓展和代理VxeGridWrap实例方法
export class ExtendAndProxyAPI extends GridProxyAPI {
  constructor(VxeGridWrapIns) {
    super();
    this.gridComp = VxeGridWrapIns.$children[0];
  }

  /**
   * 更新修改配置项
   * @param {object} options 配置项实例 - OptionsHelperIns
   * @returns Promise
   */
  updateOptions(options) {
    return this.gridComp.updateOptions(options);
  }
  /**
   * 更新修改列配置项
   * @param {object} columns 配置项实例 - ColumnsHelperIns
   * @returns Promise
   */
  updateColumns(columns) {
    return this.gridComp.updateColumns(columns);
  }
  /**
   * 更新修改表单配置项
   * @param {object} formItems 配置项实例 - FormItemsHelperIns
   * @returns Promise
   */
  updateFormItems(formItems) {
    return this.gridComp.updateFormItems(formItems);
  }
}

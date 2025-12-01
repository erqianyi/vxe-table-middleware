/*
 * @Description  : 创建Grid
 */

import { FLAG_NAME, FLAG_ATTR } from '../utils/constant';
import { GridConstructor } from '../utils/grid-constructor';
import { ExtendAndProxyAPI } from '../utils/extend-proxy-api';
import { isElement, isPlainObject, has } from 'xe-utils';

// 缓存表格实例对应的methods代理对象
export const gridApiMaps = new WeakMap();

// 是否为VxeGridWrap组件实例
function isVxeGridWrap(obj) {
  return obj.$el && isElement(obj.$el) && obj.$el.getAttribute(FLAG_ATTR) === FLAG_NAME;
}
// 创建Grid的参数是否合法
function validCreateParams(params) {
  return isPlainObject(params) && has(params, 'columns');
}

// 创建Grid实例，单例避免重复创建
class CreateGrid {
  constructor({ columns, options, events, formItems }) {
    this.columns = columns;
    this.options = options;
    this.events = events;
    this.formItems = formItems;
  }

  createGrid() {
    // TODO 是否考虑是否重复创建
    const grid = new GridConstructor({
      columns: this.columns,
      options: this.options,
      events: this.options,
      formItems: this.formItems,
    });
    return grid.create();
  }
}

/**
 * 获取表格实例和表格api
 * @param {(object|Element)} params 创建表格的参数或表格组件DOM元素
 * @returns {(function|object)} 表格构造函数 或 表格methods对象
 */
function useVxeGrid(params) {
  if (!params) throw new Error('[useVxeGrid] params is required');
  if (isVxeGridWrap(params)) {
    // 返回api代理
    if (params._isMounted) {
      if (gridApiMaps.has(params)) return gridApiMaps.get(params);
      const gridApi = new ExtendAndProxyAPI(params);
      gridApiMaps.set(params, gridApi);
      return gridApi;
    } else {
      throw new Error('[useVxeGrid] Grid实例尚未创建');
    }
  }
  if (validCreateParams(params)) {
    const grid = new CreateGrid(params);
    const gridConstructor = grid.createGrid();
    // 返回组件构造函数
    return gridConstructor;
  }
}

export default useVxeGrid;

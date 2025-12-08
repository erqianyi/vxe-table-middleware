/*
 * @Description  : 创建Grid
 */

import { FLAG_NAME, FLAG_ATTR } from '../utils/constant';
import { GridConstructor } from '../utils/grid-constructor';
import { ExtendAndProxyAPI } from '../utils/extend-proxy-api';
import { isElement, isPlainObject, has } from 'xe-utils';

// 缓存表格实例对应的methods代理对象
export const gridApiMaps = new WeakMap();

// 判断是否为vue实例
function isVueInstance(obj) {
  if (!obj || typeof obj !== 'object') return false;
  const mustHave = ['$el', '$watch', '$on', '$emit', '$data'];
  return mustHave.every((key) => key in obj && typeof obj[key] !== 'undefined');
}
// 是否为VxeGridWrap组件实例
function isVxeGridWrap(params) {
  return params.$el && isElement(params.$el) && params.$el.getAttribute(FLAG_ATTR) === FLAG_NAME;
}
function validVxeGridWrap(params, ins) {
  if (typeof params === 'string') {
    if (isVueInstance(ins)) {
      const tarComp = ins.$refs[params];
      if (!tarComp) throw new Error(`[useVxeGrid] 未能根据${params}找到对应的ref引用`);
      if (isVxeGridWrap(tarComp)) {
        return tarComp;
      } else {
        throw new Error(`[useVxeGrid] ${params}的ref引用需要为 VxeGridWrap组件实例`);
      }
    } else {
      throw Error(`[useVxeGrid] 若第一个参数为ref引用名称，则第二个参数必传且为Vue组件实例`);
    }
  } else {
    return isVxeGridWrap(params);
  }
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
      events: this.events,
      formItems: this.formItems,
    });
    return grid.create();
  }
}

/**
 * 获取表格实例和表格api
 * @param {(object|string|Element)} params 创建表格的参数、ref引用名称或表格组件DOM元素
 * @param {object} vueInstance? 当前包含该ref索引的vue组件实例this
 * @returns {(function|object)} 表格构造函数 或 表格methods对象
 */
function useVxeGrid(params, vueInstance) {
  if (!params) throw new Error('[useVxeGrid] params is required');
  const valid = validVxeGridWrap(params, vueInstance);
  if (valid) {
    const compIns = typeof valid === 'boolean' ? params : valid;
    // 返回api代理
    if (compIns._isMounted) {
      if (gridApiMaps.has(compIns)) return gridApiMaps.get(compIns);
      const gridApi = new ExtendAndProxyAPI(compIns);
      gridApiMaps.set(compIns, gridApi);
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

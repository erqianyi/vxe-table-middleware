/*
 * @Description  : 创建Grid
 */

import { FLAG_NAME, FLAG_ATTR } from '../components/vxe-grid-wrap';
import { GridInstance } from '../utils/grid-instance';
import { ExtendAndProxyAPI } from '../utils/extend-proxy-api';
import { isElement, isPlainObject, has } from 'xe-utils';
// 是否为CommonGrid组件实例
function isCommonGrid(obj) {
  if (obj.$el) {
    return isElement(obj.$el) && obj.$el.getAttribute(FLAG_ATTR) === FLAG_NAME;
  }
  return !isPlainObject(obj) && isElement(obj) && obj.getAttribute(FLAG_NAME) === FLAG_NAME;
}
// 创建Grid的参数是否合法
function validCreateParams(params) {
  return isPlainObject(params) && has(params, 'columns');
}

// 创建Grid实例，单例避免重复创建
class CreateGridIns {
  constructor({ columns, options, events }) {
    this.createGridInstance(columns, options, events);
  }

  createGridInstance(columns, options, events) {
    const columnsConfig = columns ? columns._getColumns() : [];
    const optionsConfig = options ? options._getOptions() : {};
    const eventsConfig = events ? events._getEvents() : {};

    if (CreateGridIns.instance) {
      // TODO 考虑是销毁重建 还是 直接返回
      CreateGridIns.gridApi = null;
      CreateGridIns.instance.$destroy();
      CreateGridIns.instance = null;
    } else {
      const insConstructor = new GridInstance({
        columns: columnsConfig,
        options: optionsConfig,
        events: eventsConfig,
      });
      const ins = insConstructor.create();
      CreateGridIns.instance = ins;
      CreateGridIns.gridApi = new ExtendAndProxyAPI(ins);
    }
  }
}
CreateGridIns.instance = null;
CreateGridIns.gridApi = null;

/**
 * 获取表格实例和表格api
 * @param {(object|Element)} params 创建表格的参数或表格组件DOM元素
 * @returns {(array|object)} 表格实例和表格api 或 表格api
 */
function useVxeGrid(params) {
  if (!params) throw new Error('[useVxeGrid] params is required');
  if (isCommonGrid(params)) {
    // 返回api
    if (CreateGridIns.gridApi) return CreateGridIns.gridApi;
    else throw new Error('[useVxeGrid] Grid实例尚未创建');
  }
  if (validCreateParams(params)) {
    new CreateGridIns(params);
    return [CreateGridIns.instance, CreateGridIns.gridApi]; // 返回实例和api
  }
}

export default useVxeGrid;

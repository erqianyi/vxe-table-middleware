/*
 * @Description  : 创建Grid
 */

import { FLAG_NAME, FLAG_ATTR } from '../utils/constant';
import { GridInstance } from '../utils/grid-instance';
import { ExtendAndProxyAPI } from '../utils/extend-proxy-api';
import { isElement, isPlainObject, has } from 'xe-utils';
// 是否为VxeGridWrap组件实例
function isVxeGridWrap(obj) {
  return (
    obj.$el &&
    isElement(obj.$el) &&
    obj.$el.getAttribute(FLAG_ATTR) === FLAG_NAME
  );
  /*
  if (obj.$el) {
    return isElement(obj.$el) && obj.$el.getAttribute(FLAG_ATTR) === FLAG_NAME;
  }
  return (
    !isPlainObject(obj) &&
    isElement(obj) &&
    obj.getAttribute(FLAG_NAME) === FLAG_NAME
  );
  */
}
// 创建Grid的参数是否合法
function validCreateParams(params) {
  return isPlainObject(params) && has(params, 'columns');
}

// 创建Grid实例，单例避免重复创建
class CreateGridIns {
  constructor({ columns, options, events }) {
    this.columns = columns;
    this.options = options;
    this.events = events;
  }

  createGridInstance() {
    const columnsConfig = this.columns ? this.columns._getColumns() : [];
    const optionsConfig = this.options ? this.options._getOptions() : {};
    const eventsConfig = this.events ? this.events._getEvents() : {};

    // TODO 考虑是否重复创建
    const insConstructor = new GridInstance({
      columns: columnsConfig,
      options: optionsConfig,
      events: eventsConfig,
    });
    const instance = insConstructor.create();
    const gridApi = new ExtendAndProxyAPI(instance);
    return { instance, gridApi };
  }
}

/**
 * 获取表格实例和表格api
 * @param {(object|Element)} params 创建表格的参数或表格组件DOM元素
 * @returns {(array|object)} 表格实例和表格api 或 表格api
 */
function useVxeGrid(params) {
  if (!params) throw new Error('[useVxeGrid] params is required');
  if (isVxeGridWrap(params)) {
    // 返回api
    if (params.$children && params.$children[0]) {
      return new ExtendAndProxyAPI(params.$children[0]);
    } else {
      throw new Error('[useVxeGrid] Grid实例尚未创建');
    }
  }
  if (validCreateParams(params)) {
    const gridInstance = new CreateGridIns(params);
    const { instance, gridApi } = gridInstance.createGridInstance(); // 返回实例和api
    return [instance, gridApi];
  }
}

export default useVxeGrid;

/*
 * @Description: 创建FormItem配置项
 */

import { formItemExtend, decoratorHandler } from '../utils/extend-helper';
import { isEmpty } from 'xe-utils';
class FormItemHelperClass {
  constructor() {
    this._data = {};
    this._items = [];
    this._rules = {};
    this._restCurrent();
  }

  // 私有方法，获取表单配置
  _getConfig() {
    return {
      data: this._data,
      items: this._items,
      rules: this._rules,
    };
  }
  // 私有方法，重置当前配置
  _restCurrent() {
    this._current = {
      item: {},
      rules: [],
    };
  }

  // 以下公共方法
  /**
   * 合并其他由表单项配置工具函数实例创建的列配置
   * @param {object} formItemHelperIns 配置工具函数实例
   * @returns this
   */
  merge(formItemHelperIns) {
    if (formItemHelperIns && formItemHelperIns instanceof FormItemHelperClass) {
      const { data, items, rules } = formItemHelperIns._getConfig();
      Object.assign(this._data, data);
      this._items.push(...items);
      Object.assign(this._rules, rules);
    }
    return this;
  }
  /**
   * 配置表单项字段
   * @param {string} field 字段名
   * @param {any} defaultValue 默认值
   * @returns this
   */
  field(field, defaultValue) {
    this._current['field'] = field;
    this._current['defaultValue'] = defaultValue;
    return this;
  }
  title(title) {
    this._current.item['title'] = title;
    return this;
  }
  span(span) {
    this._current.item['span'] = span;
    return this;
  }
  align(align) {
    this._current.item['align'] = align;
    return this;
  }
  verticalAlign(verticalAlign) {
    this._current.item['verticalAlign'] = verticalAlign;
    return this;
  }
  titleBackground(titleBackground) {
    this._current.item['titleBackground'] = titleBackground;
    return this;
  }
  titleAlign(titleAlign) {
    this._current.item['titleAlign'] = titleAlign;
    return this;
  }
  titleWidth(titleWidth) {
    this._current.item['titleWidth'] = titleWidth;
    return this;
  }
  titleColon(titleColon) {
    this._current.item['titleColon'] = titleColon;
    return this;
  }
  titleAsterisk(titleAsterisk) {
    this._current.item['titleAsterisk'] = titleAsterisk;
    return this;
  }
  titleOverflow(titleOverflow) {
    this._current.item['titleOverflow'] = titleOverflow;
    return this;
  }
  showTitle(showTitle) {
    this._current.item['showTitle'] = showTitle;
    return this;
  }
  padding(padding) {
    this._current.item['padding'] = padding;
    return this;
  }
  vertical(vertical) {
    this._current.item['vertical'] = vertical;
    return this;
  }
  className(className) {
    this._current.item['className'] = className;
    return this;
  }
  contentClassName(className) {
    this._current.item['contentClassName'] = className;
    return this;
  }
  contentStyle(style) {
    this._current.item['contentStyle'] = style;
    return this;
  }
  visible(visible) {
    this._current.item['visible'] = visible;
    return this;
  }
  visibleMethod(method) {
    this._current.item['visibleMethod'] = method;
    return this;
  }
  folding(folding) {
    this._current.item['folding'] = folding;
    return this;
  }
  collapseNode(collapseNode) {
    this._current.item['collapseNode'] = collapseNode;
    return this;
  }
  titlePrefix(config) {
    this._current.item['titlePrefix'] = config;
    return this;
  }
  titleSuffix(config) {
    this._current.item['titleSuffix'] = config;
    return this;
  }
  resetValue(resetValue) {
    this._current.item['resetValue'] = resetValue;
    return this;
  }
  formatter(formatter) {
    this._current.item['formatter'] = formatter;
    return this;
  }
  params(params) {
    this._current.item['params'] = params;
    return this;
  }
  itemRender(name, renderOptions = {}) {
    if (name) {
      const options = { ...renderOptions, name };
      this._current.item['itemRender'] = options;
    }
    return this;
  }
  /**
   * 插槽配置
   * @param {object} slots {[slotName:string]: string | function }
   * @returns this
   */
  slots(slots = {}) {
    this._current.item['slots'] = slots;
    return this;
  }
  rule(config = {}) {
    if (!isEmpty(config)) this._current.rules.push(config);
    return this;
  }
  /**
   * 完成当前表单项的配置，开始下一项的配置
   */
  end() {
    const { field, defaultValue, rules, ...itemConfig } = this._current;
    this._data[field] = defaultValue;
    this._items.push({ ...itemConfig, field });
    this._rules[field] = rules;
    this._restCurrent();
  }
}

function formItemHelper() {
  const ins = new FormItemHelperClass();
  return decoratorHandler(ins, formItemExtend);
}

export default formItemHelper;

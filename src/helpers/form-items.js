/*
 * @Description: 创建FormItem配置项
 */

import { formItemExtend, decoratorHandler } from '../utils/extend-helper';
import { isEmpty } from 'xe-utils';
class FormItemsHelperClass {
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
    if (formItemHelperIns && formItemHelperIns instanceof FormItemsHelperClass) {
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
  /**
   * 标题（支持开启国际化）
   * @param {string} title 标题
   * @returns this
   */
  title(title) {
    this._current.item['title'] = title;
    return this;
  }
  /**
   * 栅格占据的列数（共 24 分栏）
   * @param {(string|number)} span 列数
   * @returns this
   */
  span(span) {
    this._current.item['span'] = span;
    return this;
  }
  /**
   * 内容对齐方式
   * @param {string} align 对齐方式
   * @returns this
   */
  align(align) {
    this._current.item['align'] = align;
    return this;
  }
  /**
   * 垂直的对齐方式
   * @param {string} verticalAlign 对齐方式，可选值 center
   * @returns this
   */
  verticalAlign(verticalAlign) {
    this._current.item['verticalAlign'] = verticalAlign;
    return this;
  }
  /**
   * 显示标题背景
   * @param {boolean} titleBackground
   * @returns this
   */
  titleBackground(titleBackground) {
    this._current.item['titleBackground'] = titleBackground;
    return this;
  }
  /**
   * 标题对齐方式
   * @param {string} titleAlign
   * @returns this
   */
  titleAlign(titleAlign) {
    this._current.item['titleAlign'] = titleAlign;
    return this;
  }
  /**
   * 标题宽度
   * @param {(string|number)} titleWidth 宽度(auto,px,%)
   * @returns this
   */
  titleWidth(titleWidth) {
    this._current.item['titleWidth'] = titleWidth;
    return this;
  }
  /**
   * 是否显示标题冒号
   * @param {boolean} titleColon 继承全局配置
   * @returns this
   */
  titleColon(titleColon) {
    this._current.item['titleColon'] = titleColon;
    return this;
  }
  /**
   * 是否显示必填字段的红色星号
   * @param {boolean} titleAsterisk 继承全局配置
   * @returns this
   */
  titleAsterisk(titleAsterisk) {
    this._current.item['titleAsterisk'] = titleAsterisk;
    return this;
  }
  /**
   * 标题内容过长时显示为省略号
   * @param {(string|boolean)} titleOverflow 继承全局配置，可选值 ellipsis|title|tooltip
   * @returns this
   */
  titleOverflow(titleOverflow) {
    this._current.item['titleOverflow'] = titleOverflow;
    return this;
  }
  /**
   * 是否显示标题
   * @param {boolean} showTitle 默认 true
   * @returns this
   */
  showTitle(showTitle) {
    this._current.item['showTitle'] = showTitle;
    return this;
  }
  /**
   * 显示边距
   * @param {boolean} padding 继承全局配置
   * @returns this
   */
  padding(padding) {
    this._current.item['padding'] = padding;
    return this;
  }
  /**
   * 使用垂直布局
   * @param {boolean} vertical 继承全局配置
   * @returns this
   */
  vertical(vertical) {
    this._current.item['vertical'] = vertical;
    return this;
  }
  /**
   * 给表单项附加className
   * @param {(string|function)} className 类名, string | (({ field, data }) => string)
   * @returns this
   */
  className(className) {
    this._current.item['className'] = className;
    return this;
  }
  /**
   * 给表单项内容附加className
   * @param {(string|function)} className 类名, string | (({ field, data }) => string)
   * @returns this
   */
  contentClassName(className) {
    this._current.item['contentClassName'] = className;
    return this;
  }
  /**
   * 给表单项内容附加样式
   * @param {(object|function)} style 样式对象，{ [name: string]: string } | (({ field, data }) => string)
   * @returns this
   */
  contentStyle(style) {
    this._current.item['contentStyle'] = style;
    return this;
  }
  /**
   * 默认是否显示
   * @param {boolean} visible 是否显示，默认 true
   * @returns this
   */
  visible(visible) {
    this._current.item['visible'] = visible;
    return this;
  }
  /**
   * 该方法的返回值用来决定该项是否显示
   * @param {function} method 方法，({ data }) => boolean
   * @returns this
   */
  visibleMethod(method) {
    this._current.item['visibleMethod'] = method;
    return this;
  }
  /**
   * 默认收起
   * @param {boolean} folding 是否折叠，默认值false
   * @returns this
   */
  folding(folding) {
    this._current.item['folding'] = folding;
    return this;
  }
  /**
   * 折叠节点
   * @param {boolean} collapseNode 是否折叠，默认值false
   * @returns this
   */
  collapseNode(collapseNode) {
    this._current.item['collapseNode'] = collapseNode;
    return this;
  }
  /**
   * 前缀配置项
   * @param {object} config 配置项
   * @returns this
   */
  titlePrefix(config) {
    this._current.item['titlePrefix'] = config;
    return this;
  }
  /**
   * 后缀配置项
   * @param {object} config 配置项
   * @returns this
   */
  titleSuffix(config) {
    this._current.item['titleSuffix'] = config;
    return this;
  }
  /**
   * 重置时的默认值
   * @param {any} resetValue 重置值，any | ((params: { item, field, data }) => any)，默认undefined
   * @returns this
   */
  resetValue(resetValue) {
    this._current.item['resetValue'] = resetValue;
    return this;
  }
  /**
   * 格式化显示内容
   * @param {(string|function)} formatter 显示的内容，string | ((params: { itemValue, item, field, data }) => string)
   * @returns this
   */
  formatter(formatter) {
    this._current.item['formatter'] = formatter;
    return this;
  }
  /**
   * 额外的参数（可以用来存放一些私有参数）
   * @param {any} params 参数
   * @returns this
   */
  params(params) {
    this._current.item['params'] = params;
    return this;
  }
  /**
   * 项渲染器配置项
   * @param {string} name 渲染器名称
   * @param {object} renderOptions? 针对该渲染器的配置项
   * @returns this
   */
  itemRender(name, renderOptions = {}) {
    if (name) {
      const options = { ...renderOptions, name };
      this._current.item['itemRender'] = options;
    }
    return this;
  }
  /**
   * 插槽配置
   * @param {object} slots? {[slotName:string]: string | function }
   * @returns this
   */
  slots(slots = {}) {
    this._current.item['slots'] = slots;
    return this;
  }
  /**
   * 校验规则配置项，如果有多个校验规则，需要配置多次调用该方法
   * @param {object} config 校验规则
   * @returns this
   * @example
   * formItemIns.rule({ required: true, message: '请输入' }).rule({max: 30, message: '最多输入30个字'})
   */
  rule(config = {}) {
    if (!isEmpty(config)) this._current.rules.push(config);
    return this;
  }
  /**
   * 完成当前表单项的配置，开始下一项的配置
   */
  end() {
    const { field, defaultValue, rules, item } = this._current;
    if (field) {
      this._data[field] = defaultValue;
      this._items.push({ ...item, field });
      this._rules[field] = rules;
    } else {
      this._items.push({ ...item });
    }
    this._restCurrent();
  }
}

function formItemsHelper() {
  const ins = new FormItemsHelperClass();
  return decoratorHandler(ins, formItemExtend);
}

export default formItemsHelper;

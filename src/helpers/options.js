/*
 * @Description  : 创建Grid配置项 - props
 */

import { isPlainObject } from 'xe-utils';

class OptionsHelperClass {
  constructor() {
    this._options = {};
  }
  // 私有方法，获取配置项
  _getOptions() {
    return this._options || {};
  }
  /**
   * 唯一标识（被某些特定的功能所依赖）
   * @param {string} id 标识值
   * @returns this
   */
  id(id) {
    this._options['id'] = id;
    return this;
  }
  /**
   * 高度设置 或者 最大高度/最小高度设置
   * @param {(string | number | object)} height 高度配置
   * @returns this
   */
  height(height) {
    if (isPlainObject(height)) {
      const { maxHeight, minHeight } = height;
      if (maxHeight) this._options['maxHeight'] = maxHeight;
      if (minHeight) this._options['minHeight'] = minHeight;
      return this;
    }
    this._options['height'] = height;
    return this;
  }
  /**
   * 自动监听父元素的变化去重新计算表格（对于父元素可能存在动态变化、显示隐藏的容器中、列宽异常等场景中的可能会用到）
   * @param {boolean} autoResize 默认false
   * @returns this
   */
  autoResize(autoResize) {
    this._options['autoResize'] = autoResize;
    return this;
  }
  /**
   * 自动跟随某个属性的变化去重新计算表格，和手动调用 recalculate 方法是一样的效果（对于通过某个属性来控制显示/隐藏切换时可能会用到）
   * @param {(boolean|string|number)} syncResize 默认false
   * @returns this
   */
  syncResize(syncResize) {
    this._options['syncResize'] = syncResize;
    return this;
  }
  /**
   * 是否带有斑马纹（需要注意的是，在可编辑表格场景下，临时插入的数据不会有斑马纹样式）
   * @param {boolean} stripe 继承全局配置
   * @returns this
   */
  stripe(stripe) {
    this._options['stripe'] = stripe;
    return this;
  }
  /**
   * 是否带有边框
   * @param {(boolean|string)} border 默认false，继承全局配置，default（默认）, full（完整边框）, outer（外边框）, inner（内边框）, none（无边框）
   * @returns this
   */
  border(border) {
    this._options['border'] = border;
    return this;
  }
  /**
   * 是否为圆角边框
   * @param {boolean} round 默认false，继承全局配置
   * @returns this
   */
  round(round) {
    this._options['round'] = round;
    return this;
  }
  /**
   * 表格的尺寸
   * @param {string} size 尺寸，继承上下文，'medium' | 'small' | 'mini'
   * @returns this
   */
  size(size) {
    this._options['size'] = size;
    return this;
  }
  /**
   * 表格是否显示加载中
   * @param {boolean} loading 默认true
   * @returns this
   */
  loading(loading) {
    this._options['loading'] = loading;
    return this;
  }
  /**
   * 所有的列对齐方式
   * @param {string} align 对齐方式 'left' | 'center' | 'right'
   * @param {object} [extra={}] 单独配置所有列的headerAlign、footerAlign
   * @returns this
   */
  align(align, extra = {}) {
    if (align) this._options['align'] = align;
    if (extra.headerAlign) this._options['headerAlign'] = extra.headerAlign;
    if (extra.footerAlign) this._options['footerAlign'] = extra.footerAlign;
    return this;
  }
  /**
   * 表格是否显示表头
   * @param {boolean} showHeader 默认true
   * @returns this
   */
  showHeader(showHeader) {
    this._options['showHeader'] = showHeader;
    return this;
  }
  /**
   * 给行/列/表头/表尾附加类名
   * @param {string} type 类名位置类型，row | cell | header-row | header-cell | footer-row | footer-cell
   * @param {(string | function)} className 类名或返回类名的方法
   * @returns this
   */
  addClassName(type, className) {
    const types = ['row', 'cell', 'header-row', 'header-cell', 'footer-row', 'footer-cell'];
    if (!type || !types.includes(type)) {
      throw new Error(`addClassName 'type' must be one of ${types}`);
    }
    this._options[`${type}-class-name`] = className;
    return this;
  }
  /**
   * 表格是否显示表尾
   * @param {boolean} showFooter 默认false
   * @returns this
   */
  showFooter(showFooter) {
    this._options['showFooter'] = showFooter;
    return this;
  }
  /**
   * 表尾数据
   * @param {array} footerData 表尾数据
   * @returns this
   */
  footerData(footerData = []) {
    this._options['footerData'] = footerData;
    return this;
  }
  /**
   * 临时合并指定的单元格 (不能用于展开行，不建议用于固定列、树形结构)
   * @param {array} mergeCells Array<{ row: number, col: number, rowspan: number, colspan: number }>
   * @returns this
   */
  mergeCells(mergeCells = []) {
    this._options['mergeCells'] = mergeCells;
    return this;
  }
  /**
   * 临时合并表尾 (不能用于展开行，不建议用于固定列、树形结构)
   * @param {array} items Array<{ row: number, col: number, rowspan: number, colspan: number }>
   * @returns this
   */
  mergeFooterItems(items = []) {
    this._options['mergeFooterItems'] = items;
    return this;
  }
  /**
   * 设置所有内容过长时显示为省略号（如果是固定列建议设置该值，提升渲染速度）
   * @param {(boolean|string)} showOverflow boolean | 'ellipsis' | 'title' | 'tooltip'
   * @param {object} [extra={}] 单独配置header、footer是否显示省略及表现
   * @returns this
   */
  showOverflow(showOverflow, extra = {}) {
    this._options['showOverflow'] = showOverflow;
    if (extra.header) this._options['showHeaderOverflow'] = extra.header;
    if (extra.footer) this._options['showFooterOverflow'] = extra.footer;
    return this;
  }
  /**
   * 保持原始值的状态，被某些功能所依赖，比如编辑状态、还原数据等（开启后影响性能，具体取决于数据量）
   * @param {boolean} keepSource 默认false，继承全局配置
   * @returns this
   */
  keepSource(keepSource) {
    this._options['keepSource'] = keepSource;
    return this;
  }
  /**
   * 列配置信息
   * @param {object} columnConfig 配置项，继承全局配置
   * @returns this
   */
  columnConfig(columnConfig) {
    this._options['columnConfig'] = { ...columnConfig };
    return this;
  }
  /**
   * 单元格配置项，表头表尾单元格配置项
   * @param {object} cellConfig 配置项，继承全局配置
   * @param {object} [extra={}] 单独配置header-cell-config、footer-cell-config，{ header: {}, footer: {} }
   * @returns this
   */
  cellConfig(cellConfig, extra = {}) {
    this._options['cellConfig'] = { ...cellConfig };
    if (extra.header) this._options['headerCellConfig'] = { ...extra.header };
    if (extra.footer) this._options['footerCellConfig'] = { ...extra.footer };
    return this;
  }
  /**
   * 行配置信息
   * @param {object} rowConfig 配置项，继承全局配置
   * @returns this
   */
  rowConfig(rowConfig) {
    this._options['rowConfig'] = { ...rowConfig };
    return this;
  }
  /**
   * 列宽拖动配置项
   * @param {object} resizableConfig 配置项，继承全局配置
   * @returns this
   */
  resizableConfig(resizableConfig) {
    this._options['resizableConfig'] = { ...resizableConfig };
    return this;
  }
  /**
   * 序号配置项
   * @param {object} seqConfig 配置项，继承全局配置
   * @returns this
   */
  seqConfig(seqConfig) {
    this._options['seqConfig'] = { ...seqConfig };
    return this;
  }
  /**
   * 排序配置项
   * @param {object} sortConfig 配置项，继承全局配置
   * @returns this
   */
  sortConfig(sortConfig) {
    this._options['sortConfig'] = { ...sortConfig };
    return this;
  }
  /**
   * 行拖拽配置项
   * @param {object} rowDragConfig 配置项，继承全局配置
   * @returns this
   */
  rowDragConfig(rowDragConfig) {
    this._options['rowDragConfig'] = { ...rowDragConfig };
    return this;
  }
  /**
   * 列拖拽配置项
   * @param {object} columnDragConfig 配置项，继承全局配置
   * @returns this
   */
  columnDragConfig(columnDragConfig) {
    this._options['columnDragConfig'] = { ...columnDragConfig };
    return this;
  }
  /**
   * 筛选配置项
   * @param {object} filterConfig 配置项，继承全局配置
   * @returns this
   */
  filterConfig(filterConfig) {
    this._options['filterConfig'] = { ...filterConfig };
    return this;
  }
}

function optionsHelper() {
  return new OptionsHelperClass();
}

export default optionsHelper;

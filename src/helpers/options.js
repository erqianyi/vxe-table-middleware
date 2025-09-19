/*
 * @Description  : 创建Grid配置项 - props
 */

import { optionExtend, decoratorHandler } from '../utils/extend-helper';
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
   * 合并其他由选项配置工具函数实例创建的配置项
   * @param {object} optionsHelperIns 选项配置工具函数实例
   * @returns this
   */
  merge(optionsHelperIns) {
    if (optionsHelperIns && optionsHelperIns instanceof OptionsHelperClass) {
      this._options = { ...this._options, ...optionsHelperIns._getOptions() };
    }
    return this;
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
    if (extra.header) this._options['headerAlign'] = extra.header;
    if (extra.footer) this._options['footerAlign'] = extra.footer;
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
   * 用于分组表头，显示为自定义列头，配合 mergeHeaderCells 灵活实现自定义合并
   * @version vxe-table@3.18.2
   * @param {boolean} isShow 默认false
   * @returns this
   */
  showCustomHeader(isShow = false) {
    this._options['showCustomHeader'] = isShow;
    return this;
  }
  /**
   * 临时合并指定的表头单元格
   * @param {array} mergeCells Array<{ row: number, col: number, rowspan: number, colspan: number }>
   * @returns this
   */
  mergeCells(mergeCells = []) {
    this._options['mergeCells'] = mergeCells;
    return this;
  }
  /**
   * 临时合并表头 (不能用于展开行，不建议用于固定列、树形结构)
   * @version vxe-table@3.18.2
   * @param {array} items Array<{ row: number, col: number, rowspan: number, colspan: number }>
   * @returns this
   */
  mergeHeaderCells(items = []) {
    this._options['mergeHeaderCells'] = items;
    return this;
  }
  /**
   * 临时合并指定的表尾单元格
   * @version vxe-table@3.18.2
   * @param {array} items Array<{ row: number, col: number, rowspan: number, colspan: number }>
   * @returns this
   */
  mergeFooterCells(items = []) {
    this._options['mergeFooterCells'] = items;
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
   * 当前列配置信息
   * @version vxe-table@3.14.0
   * @param {object} config 配置项，继承全局配置
   * @returns this
   */
  currentColumnConfig(config) {
    this._options['currentColumnConfig'] = { ...config };
    return this;
  }
  /**
   * 单元格配置项，表头表尾单元格配置项
   * @version vxe-table@3.10.0/@3.12.10
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
   * 当前行配置信息
   * @version vxe-table@3.15.0
   * @param {object} config 配置项，继承全局配置
   * @returns this
   */
  currentRowConfig(config) {
    this._options['currentRowConfig'] = { ...config };
    return this;
  }
  /**
   * 数据聚合配置项
   * @version vxe-table@3.15.35
   * @param {object} config 配置项，继承全局配置
   * @returns this
   */
  aggregateConfig(config) {
    this._options['aggregateConfig'] = { ...config };
    return this;
  }
  /**
   * vxe-table版本已废弃，请使用 aggregateConfig
   * @deprecated
   * @version vxe-table@3.15.6
   * @param {object} config 配置项，继承全局配置
   * @returns this
   */
  rowGroupConfig() {
    console.error(`[optionsHelper] rowGroupConfig is deprecated, please use aggregateConfig!`);
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
   * @version vxe-table@3.11.0
   * @param {object} rowDragConfig 配置项，继承全局配置
   * @returns this
   */
  rowDragConfig(rowDragConfig) {
    this._options['rowDragConfig'] = { ...rowDragConfig };
    return this;
  }
  /**
   * 列拖拽配置项
   * @version vxe-table@3.11.0
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
  /**
   * 导出配置项
   * @param {object} exportConfig 配置项，继承全局配置
   * @returns this
   */
  exportConfig(exportConfig) {
    this._options['exportConfig'] = { ...exportConfig };
    return this;
  }
  /**
   * 导入配置项
   * @param {object} importConfig 配置项，继承全局配置
   * @returns this
   */
  importConfig(importConfig) {
    this._options['importConfig'] = { ...importConfig };
    return this;
  }
  /**
   * 打印配置项
   * @param {object} printConfig 配置项，继承全局配置
   * @returns this
   */
  printConfig(printConfig) {
    this._options['printConfig'] = { ...printConfig };
    return this;
  }
  /**
   * 单选配置项
   * @param {object} radioConfig 配置项，继承全局配置
   * @returns this
   */
  radioConfig(radioConfig) {
    this._options['radioConfig'] = { ...radioConfig };
    return this;
  }
  /**
   * 复选配置项
   * @param {object} checkboxConfig 配置项，继承全局配置
   * @returns this
   */
  checkboxConfig(checkboxConfig) {
    this._options['checkboxConfig'] = { ...checkboxConfig };
    return this;
  }
  /**
   * tooltip 配置项
   * @param {object} tooltipConfig 配置项，继承全局配置
   * @returns this
   */
  tooltipConfig(tooltipConfig) {
    this._options['tooltipConfig'] = { ...tooltipConfig };
    return this;
  }
  /**
   * 表头提示信息配置项
   * @version vxe-table@3.16.11
   * @param {object} config 配置项，继承全局配置
   * @returns this
   */
  headerTooltipConfig(config = {}) {
    this._options['headerTooltipConfig'] = { ...config };
    return this;
  }
  /**
   * 表尾提示信息配置项
   * @version vxe-table@3.16.11
   * @param {object} config 配置项，继承全局配置
   * @returns this
   */
  footerTooltipConfig(config = {}) {
    this._options['footerTooltipConfig'] = { ...config };
    return this;
  }
  /**
   * 展开行配置项（不支持虚拟滚动）
   * @param {object} expandConfig 配置项，继承全局配置
   * @returns this
   */
  expandConfig(expandConfig) {
    this._options['expandConfig'] = { ...expandConfig };
    return this;
  }
  /**
   * 树形结构配置项
   * @param {object} treeConfig 配置项，继承全局配置
   * @returns this
   */
  treeConfig(treeConfig) {
    this._options['treeConfig'] = { ...treeConfig };
    return this;
  }
  /**
   * 菜单配置项
   * @param {object} menuConfig 配置项，继承全局配置
   * @returns this
   */
  menuConfig(menuConfig) {
    this._options['menuConfig'] = { ...menuConfig };
    return this;
  }
  /**
   * 鼠标配置项
   * @param {object} mouseConfig 配置项，继承全局配置
   * @returns this
   */
  mouseConfig(mouseConfig) {
    this._options['mouseConfig'] = { ...mouseConfig };
    return this;
  }
  /**
   * 键盘配置项
   * @param {object} keyboardConfig 配置项，继承全局配置
   * @returns this
   */
  keyboardConfig(keyboardConfig) {
    this._options['keyboardConfig'] = { ...keyboardConfig };
    return this;
  }
  /**
   * 可编辑配置项
   * @param {object} editConfig 配置项，继承全局配置
   * @returns this
   */
  editConfig(editConfig) {
    this._options['editConfig'] = { ...editConfig };
    return this;
  }
  /**
   * 验证配置项
   * @param {object} validConfig 配置项，继承全局配置
   * @returns this
   */
  validConfig(validConfig) {
    this._options['validConfig'] = { ...validConfig };
    return this;
  }
  /**
   * 校验规则配置项
   * @param {object} editRules 配置项，继承全局配置
   * @returns this
   */
  editRules(editRules) {
    this._options['editRules'] = { ...editRules };
    return this;
  }
  /**
   * 空数据时显示的内容
   * @param {object} emptyText 配置项，继承全局配置
   * @returns this
   */
  emptyText(emptyText) {
    this._options['emptyText'] = emptyText;
    return this;
  }
  /**
   * 空数据时显示的内容
   * @param {object} emptyRender 配置项，继承全局配置
   * @returns this
   */
  emptyRender(emptyRender) {
    this._options['emptyRender'] = emptyRender;
    return this;
  }
  /**
   * 加载配置项
   * @param {object} loadingConfig 配置项，继承全局配置
   * @returns this
   */
  loadingConfig(loadingConfig) {
    this._options['loadingConfig'] = { ...loadingConfig };
    return this;
  }
  /**
   * 自定义配置项
   * @param {object} customConfig 配置项，继承全局配置
   * @returns this
   */
  customConfig(customConfig) {
    this._options['customConfig'] = { ...customConfig };
    return this;
  }
  /**
   * 横向虚拟滚动配置项
   * @version vxe-table@3.12.10
   * @param {object} virtualXConfig 配置项，继承全局配置
   * @returns this
   */
  virtualXConfig(virtualXConfig) {
    this._options['virtualXConfig'] = { ...virtualXConfig };
    return this;
  }
  /**
   * 纵向虚拟滚动配置项
   * @version vxe-table@3.12.10
   * @param {object} virtualYConfig 配置项，继承全局配置
   * @returns this
   */
  virtualYConfig(virtualYConfig) {
    this._options['virtualYConfig'] = { ...virtualYConfig };
    return this;
  }
  /**
   * 滚动条配置项
   * @version vxe-table@3.12.10
   * @param {object} scrollbarConfig 配置项，继承全局配置
   * @returns this
   */
  scrollbarConfig(scrollbarConfig) {
    this._options['scrollbarConfig'] = { ...scrollbarConfig };
    return this;
  }
  /**
   * 自定义参数（可以用来存放一些自定义的数据）
   * @param {any} params
   * @returns this
   */
  params(params) {
    this._options['params'] = params;
    return this;
  }
  /**
   * 表单配置项
   * @param {object} formConfig 配置项，继承全局配置
   * @returns this
   */
  formConfig(formConfig) {
    this._options['formConfig'] = { ...formConfig };
    return this;
  }
  /**
   * 工具栏配置项
   * @param {object} toolbarConfig 配置项，继承全局配置
   * @returns this
   */
  toolbarConfig(toolbarConfig) {
    this._options['toolbarConfig'] = { ...toolbarConfig };
    return this;
  }
  /**
   * 分页配置项
   * @param {object} pagerConfig 配置项，继承全局配置
   * @returns this
   */
  pagerConfig(pagerConfig) {
    this._options['pagerConfig'] = { ...pagerConfig };
    return this;
  }
  /**
   * 缩放配置项
   * @param {object} zoomConfig 配置项，继承全局配置
   * @returns this
   */
  zoomConfig(zoomConfig) {
    this._options['zoomConfig'] = { ...zoomConfig };
    return this;
  }
  /**
   * 自定义布局
   * @param {object} layouts 配置项，继承全局配置
   * @returns this
   */
  layouts(layouts) {
    this._options['layouts'] = { ...layouts };
    return this;
  }
  /**
   * 代理配置项
   * @param {object} proxyConfig 配置项，继承全局配置
   * @returns this
   */
  proxyConfig(proxyConfig) {
    this._options['proxyConfig'] = {
      ...(this._options['proxyConfig'] || {}),
      ...proxyConfig,
    };
    return this;
  }
  /**
   * 代理处理函数，同 proxyConfig.ajax 配置项，目的仅为减少配置层级
   * @param {object} proxyHandlers 配置项
   * @returns this
   */
  proxyHandlers(proxyHandlers) {
    const { ajax = {} } = this._options['proxyConfig'] || {};
    Object.assign(ajax, proxyHandlers);
    this._options['proxyConfig'] = {
      ...(this._options['proxyConfig'] || {}),
      ...{ ajax },
    };
    return this;
  }
}

function optionsHelper() {
  const ins = new OptionsHelperClass();
  return decoratorHandler(ins, optionExtend);
}

export default optionsHelper;

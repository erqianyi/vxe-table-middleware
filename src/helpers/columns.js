/*
 * @Description: 创建Grid列配置项
 */

class ColumnsHelperClass {
  constructor() {
    this.columns = [];
    this.column = {}; // 当前列配置
  }
  // 私有方法，获取列配置
  _getColumns() {
    return this.columns || [];
  }
  // 公共方法，添加列配置
  /**
   * 合并其他由列配置工具函数实例创建的列配置
   * @param {object} columnsHelperIns 列配置工具函数实例
   */
  merge(columnsHelperIns) {
    if (columnsHelperIns && columnsHelperIns instanceof ColumnsHelperClass) {
      this.columns = this.columns.concat(columnsHelperIns._getColumns());
    }
  }
  /**
   * 列的类型
   * @param {string} type 类型名称 'seq' | 'radio' | 'checkbox' | 'expand' | 'html'
   * @returns this
   */
  type(type) {
    if (type) this.column['type'] = type;
    return this;
  }
  /**
   * 列的字段名
   * @param {string} field 标识值
   * @returns this
   */
  field(field) {
    if (field) this.column['field'] = field;
    return this;
  }
  /**
   * 列的标题
   * @param {string} title 标题值
   * @returns this
   */
  title(title) {
    this.column['title'] = title || '';
    return this;
  }
  /**
   * 列宽度（如果为空则均匀分配剩余宽度，如果全部列固定了，可能会存在宽屏下不会铺满，可以配合 "%" 或者 "min-width" 布局）
   * @param {(string | number)} width 宽度
   * @returns this
   */
  width(width) {
    this.column['width'] = width;
    return this;
  }
  /**
   * 最小列宽度；会自动将剩余空间按比例分配
   * @param {(string | number)} minWidth 最小宽度
   * @returns this
   */
  minWidth(minWidth) {
    this.column['minWidth'] = minWidth;
    return this;
  }
  /**
   * 列是否允许拖动列宽调整大小
   * @param {boolean} resizable 是否可调整大小
   * @returns this
   */
  resizable(resizable) {
    this.column['resizable'] = resizable;
    return this;
  }
  /**
   * 列是否显示
   * @param {boolean} visible 是否显示
   * @returns this
   */
  visible(visible) {
    this.column['visible'] = visible;
    return this;
  }
  /**
   * 列是否固定
   * @param {string} fixed 固定位置 'left' | 'right'
   * @returns this
   */
  fixed(fixed) {
    this.column['fixed'] = fixed;
    return this;
  }
  /**
   * 列对其方式
   * @param {string} align 对齐方式 'left' | 'center' | 'right'
   * @param {object} [extra={}] 单独配置headerAlign、footerAlign
   * @returns this
   */
  align(align, extra = {}) {
    if (align) this.column['align'] = align;
    if (extra.headerAlign) this.column['headerAlign'] = extra.headerAlign;
    if (extra.footerAlign) this.column['footerAlign'] = extra.footerAlign;
    return this;
  }
  /**
   * 当内容过长时显示为省略号
   * @param {(string | boolean)} showOverflow 是否/如何(tooltip|ellipsis|title)显示溢出省略
   * @param {object} [extra={}] 单独配置showHeaderOverflow、showFooterOverflow
   * @returns this
   */
  showOverflow(showOverflow, extra = {}) {
    if (showOverflow) this.column['showOverflow'] = showOverflow;
    if (extra.showHeaderOverflow)
      this.column['showHeaderOverflow'] = extra.showHeaderOverflow;
    if (extra.showFooterOverflow)
      this.column['showFooterOverflow'] = extra.showFooterOverflow;
    return this;
  }
  /**
   * 给单元格附加 className
   * @param {(string | function)} className 样式类名
   * @param {object} [extra={}] 单独配置headerClassName、footerClassName
   * @returns this
   */
  className(className, extra = {}) {
    if (className) this.column['className'] = className;
    if (extra.headerClassName)
      this.column['headerClassName'] = extra.headerClassName;
    if (extra.footerClassName)
      this.column['footerClassName'] = extra.footerClassName;
    return this;
  }
  /**
   * 垂直对齐方式
   * @param {string} verticalAlign 垂直对齐方式 'top' | 'center'
   * @returns this
   */
  verticalAlign(verticalAlign) {
    this.column['verticalAlign'] = verticalAlign;
    return this;
  }
  /**
   * 格式化显示内容
   * @param {(function|array|string)} formatter 格式化处理参数
   * @returns this
   */
  formatter(formatter) {
    this.column['formatter'] = formatter;
    return this;
  }
  /**
   * 数据排序
   * @param {object} param 排序配置
   * @param {string} param.sortType 排序的字段类型 auto | number | string
   * @param {(string|function)} param.sortBy 指定排序的字段（当值 formatter 格式化后，可以设置该字段，使用值进行排序）
   * @returns this
   */
  sort({ sortType, sortBy }) {
    if (sortType || sortBy) this.column['sortable'] = true;
    if (sortType) this.column['sortType'] = sortType;
    if (sortBy) this.column['sortBy'] = sortBy;
    return this;
  }
  /**
   * 数据筛选，配置筛选条件（注：筛选只能用于列表，如果是树结构则过滤根节点）
   * @param {array} filtersConf 筛选配置,{label:string;value:string;checked:boolean;resetValue:any;data:any;}[]
   * @param {boolean} multiple 是否多选
   * @returns this
   */
  filters(filtersConf, multiple) {
    if (filtersConf) this.column['filters'] = filtersConf;
    if (typeof multiple === 'boolean') this.column['filterMultiple'] = multiple;
    return this;
  }
  /**
   * 列的筛选方法，该方法的返回值用来决定该行是否显示
   * @param {function} filterMethod: ({ value, option, cellValue, row, column }) => boolean
   * @returns this
   */
  filterMethod(filterMethod) {
    if (filterMethod) this.column['filterMethod'] = filterMethod;
    return this;
  }
  /**
   * 数据筛选，筛选渲染器配置项
   * @param {string} name 渲染器名称
   * @param {object} renderOptions?: {props?:object; events":object; content?:string}
   * @returns this
   */
  filterRender(name, renderOptions = {}) {
    if (name) {
      const options = { name };
      const { props, events, content } = renderOptions;
      if (props) options['props'] = props;
      if (events) options['events'] = events;
      if (content) options['content'] = content;
      this.column['filterRender'] = options;
    }
    return this;
  }
  /**
   * 自定义筛选重置方法
   * @param {function} filterResetMethod: ({ options, column }) => void
   * @returns this
   */
  filterResetMethod(filterResetMethod) {
    if (filterResetMethod) this.column['filterResetMethod'] = filterResetMethod;
    return this;
  }
  /**
   * 自定义筛选复原方法（使用自定义筛选时可能会用到）
   * @param {function} filterRecoverMethod: ({ options, column }) => void
   * @returns this
   */
  filterRecoverMethod(filterRecoverMethod) {
    if (filterRecoverMethod)
      this.column['filterRecoverMethod'] = filterRecoverMethod;
    return this;
  }
  /**
   * 标题前缀图标配置项
   * @param {object} prefix: {content?:string; icon?:string;}
   * @returns this
   */
  titlePrefix(prefix) {
    const { content, icon, useHTML } = prefix;
    const options = {};
    if (content) options['content'] = content;
    if (icon) options['icon'] = icon;
    this.column['titlePrefix'] = options;
    if (useHTML)
      console.error(
        `[columnsHelper] titlePrefix不建议使用useHTML，如有需要可使用slots`
      );
    return this;
  }
  /**
   * 标题后缀图标配置项
   * @param {object} suffix: {content?:string; icon?:string;}
   * @returns this
   */
  titleSuffix(suffix) {
    const { content, icon, useHTML } = suffix;
    const options = {};
    if (content) options['content'] = content;
    if (icon) options['icon'] = icon;
    this.column['titleSuffix'] = options;
    if (useHTML)
      console.error(
        `[columnsHelper] titleSuffix不建议使用useHTML，如有需要可使用slots`
      );
    return this;
  }
  /**
   * 默认的渲染器配置项
   * @param {string} name 渲染器名称
   * @param {object} renderOptions 渲染器配置项
   * @returns this
   */
  cellRender(name, renderOptions = {}) {
    if (name) {
      const options = { ...renderOptions, name };
      this.column['cellRender'] = options;
    }
    return this;
  }
  /**
   * 可编辑渲染器配置项
   * @param {string} name 渲染器名称
   * @param {object} renderOptions? 渲染器配置项
   * @returns this
   */
  editRender(name, renderOptions = {}) {
    if (name) {
      const options = { ...renderOptions, name };
      this.column['editRender'] = options;
    }
    return this;
  }
  /**
   * 内容渲染器配置项
   * @param {string} name 渲染器名称
   * @param {object} renderOptions? 渲染器配置项
   * @returns this
   */
  contentRender(name, renderOptions = {}) {
    if (name) {
      const options = { ...renderOptions, name };
      this.column['contentRender'] = options;
    }
    return this;
  }
  /**
   * 指定为树节点，只对 tree-config 配置时有效
   * @param {boolean} isTreeNode 默认值 false
   * @returns this
   */
  treeNode(isTreeNode) {
    this.column['treeNode'] = isTreeNode;
  }
  /**
   * 额外的参数（可以用来存放一些私有参数）
   * @param {object} params 额外的参数
   * @returns this
   */
  params(params = {}) {
    const valid =
      params && Object.prototype.toString.call(params) === '[object Object]';
    if (valid) this.column['params'] = Object.assign({}, params);
    return this;
  }
  /**
   * 子列配置
   * @param {ColumnsHelperClass} columnsIns 子列配置实例
   * @returns this
   */
  children(columnsIns) {
    if (columnsIns instanceof ColumnsHelperClass) {
      this.column['children'] = columnsIns._getColumns();
    } else {
      throw new Error('children 参数异常');
    }
    return this;
  }
  /**
   * 插槽配置
   * @param {object} slots {[slotName:string]: string | function }
   * @returns this
   */
  slots(slots = {}) {
    this.column['slots'] = slots;
    return this;
  }
  /**
   * 完成当前列的配置，开始下一列的配置
   * @returns this
   */
  end() {
    this.columns.push(this.column);
    this.column = {};
  }
}

/**
 * 列配置工具函数
 * @returns columnsHelperIns 列配置工具函数实例
 */
function columnsHelper() {
  return new ColumnsHelperClass();
}

export default columnsHelper;

import type { VxeColumnPropTypes } from 'vxe-table';

/**
 * 列配置实例
 */
export interface columnsHelperIns {
  /**
   * 合并其他由列配置工具函数实例创建的列配置
   * @param {object} columnsHelperIns 列配置工具函数实例
   */
  merge(columnsHelperIns: columnsHelperIns): void;
  /**
   * 列的类型（部分功能需要设置 column-config.useKey 或 row-config.useKey）
   * @params {string} type 列类型
   * @returns columnsHelperIns
   */
  type(type: VxeColumnPropTypes.Type): columnsHelperIns;
  /**
   * 列的字段名
   * @params {string} field 字段名
   * @returns columnsHelperIns
   */
  field(field: VxeColumnPropTypes.Field): columnsHelperIns;
  /**
   * 列的标题
   * @params {string} title 标题
   * @returns columnsHelperIns
   */
  title(title: VxeColumnPropTypes.Title): columnsHelperIns;
  /**
   * 列是否允许拖动列宽调整大小
   * @params {boolean} resizable 是否可调整大小
   * @returns columnsHelperIns
   */
  resizable(resizable: VxeColumnPropTypes.Resizable): columnsHelperIns;
  /**
   * 列是否显示
   * @params {boolean} visible 是否显示
   * @returns columnsHelperIns
   */
  visible(visible: VxeColumnPropTypes.Visible): columnsHelperIns;
  /**
   * 列是否固定
   * @params {string} fixed 固定位置 'left' | 'right'
   * @returns columnsHelperIns
   */
  fixed(fixed: VxeColumnPropTypes.Fixed): columnsHelperIns;
  /**
   * 列对其方式
   * @params {string} align 对齐方式 'left' | 'center' | 'right'
   * @params {object} [extra={}] 单独配置headerAlign、footerAlign
   * @returns columnsHelperIns
   */
  align(
    align: VxeColumnPropTypes.Align,
    extra?: { headerAlign?: VxeColumnPropTypes.HeaderAlign; footerAlign?: VxeColumnPropTypes.FooterAlign },
  ): columnsHelperIns;
  /**
   * 当内容过长时显示为省略号
   * @params {(string | boolean)} showOverflow 是否/如何(tooltip|ellipsis|title)显示溢出省略
   * @params {object} [extra={}] 单独配置showHeaderOverflow、showFooterOverflow
   * @returns columnsHelperIns
   */
  showOverflow(
    showOverflow: VxeColumnPropTypes.ShowOverflow,
    extra?: { showHeaderOverflow?: VxeColumnPropTypes.ShowHeaderOverflow; showFooterOverflow?: VxeColumnPropTypes.ShowFooterOverflow },
  ): columnsHelperIns;
  /**
   * 给单元格附加 className
   * @params {(string | function)} className 样式类名
   * @params {object} [extra={}] 单独配置headerClassName、footerClassName
   * @returns columnsHelperIns
   */
  className(
    className: VxeColumnPropTypes.ClassName<string>,
    extra?: { headerClassName?: VxeColumnPropTypes.HeaderClassName<string>; footerClassName?: VxeColumnPropTypes.FooterClassName<string> },
  ): columnsHelperIns;
  /**
   * 垂直对齐方式
   * @params {string} verticalAlign 垂直对齐方式 'top' | 'center'
   * @returns columnsHelperIns
   */
  verticalAlign(verticalAlign: VxeColumnPropTypes.VerticalAlign): columnsHelperIns;
  /**
   * 格式化显示内容
   * @params {(function|array|string)} formatter
   * @returns columnsHelperIns
   */
  formatter(formatter: VxeColumnPropTypes.Formatter): columnsHelperIns;
  /**
   * 数据排序
   * @params {object} sortConf 排序配置
   * @params {string} sortConf.sortType 排序的字段类型 auto | number | string
   * @params {(string|function)} sortConf.sortBy 指定排序的字段（当值 formatter 格式化后，可以设置该字段，使用值进行排序）
   * @returns columnsHelperIns
   */
  sort(sortConf: { sortType?: VxeColumnPropTypes.SortType; sortBy?: VxeColumnPropTypes.SortBy }): columnsHelperIns;
  /**
   * 数据筛选，配置筛选条件（注：筛选只能用于列表，如果是树结构则过滤根节点）
   * @params {array} filters 筛选配置,{label?:string;value?:string;checked?:boolean;resetValue?:any;data?:any;}[]
   * @params {boolean} multiple? 是否多选, 默认true
   * @returns columnsHelperIns
   */
  filters(filters: VxeColumnPropTypes.Filters, multiple?: VxeColumnPropTypes.FilterMultiple): columnsHelperIns;
  /**
   * 列的筛选方法，该方法的返回值用来决定该行是否显示
   * @params {function} filterMethod: ({ value, option, cellValue, row, column }) => boolean
   * @returns columnsHelperIns
   */
  filterMethod(filterMethod: VxeColumnPropTypes.FilterMethod): columnsHelperIns;
  /**
   * 自定义筛选重置方法
   * @params {function} filterResetMethod: ({ options, column }) => void
   * @returns columnsHelperIns
   */
  filterResetMethod(filterResetMethod: VxeColumnPropTypes.FilterResetMethod): columnsHelperIns;
  /**
   * 自定义筛选复原方法（使用自定义筛选时可能会用到）
   * @params {function} filterRecoverMethod: ({ options, column }) => void
   * @returns columnsHelperIns
   */
  filterRecoverMethod(filterRecoverMethod: VxeColumnPropTypes.FilterRecoverMethod): columnsHelperIns;
  /**
   * 数据筛选，筛选渲染器配置项
   * @params {string} name 渲染器名称
   * @params {object} renderOptions?: {props?:object; events":object; content?:string}
   * @returns columnsHelperIns
   */
  filterRender(name: string, renderOptions?: VxeColumnPropTypes.FilterRender): columnsHelperIns;
  /**
   * 标题前缀图标配置项
   * @params {object} prefix: {content?:string; icon?:string;}
   * @returns columnsHelperIns
   */
  titlePrefix(prefix: VxeColumnPropTypes.TitlePrefix): columnsHelperIns;
  /**
   * 标题后缀图标配置项
   * @params {object} suffix: {content?:string; icon?:string;}
   * @returns columnsHelperIns
   */
  titleSuffix(suffix: VxeColumnPropTypes.TitleSuffix): columnsHelperIns;
  /**
   * 默认的渲染器配置项
   * @params {string} name 渲染器名称
   * @params {object} renderOptions? 渲染器配置项
   * @returns columnsHelperIns
   */
  cellRender(name: string, renderOptions?: VxeColumnPropTypes.CellRender): columnsHelperIns;
  /**
   * 可编辑渲染器配置项
   * @params {string} name 渲染器名称
   * @params {object} renderOptions? 渲染器配置项
   * @returns columnsHelperIns
   */
  editRender(name: string, renderOptions?: VxeColumnPropTypes.EditRender): columnsHelperIns;
  /**
   * 内容渲染器配置项
   * @params {string} name 渲染器名称
   * @params {object} renderOptions? 渲染器配置项
   * @returns columnsHelperIns
   */
  contentRender(name: string, renderOptions?: VxeColumnPropTypes.ContentRender): columnsHelperIns;
  /**
   * 指定为树节点，只对 tree-config 配置时有效
   * @params {boolean} isTreeNode 默认值 false
   */
  treeNode(isTreeNode: VxeColumnPropTypes.TreeNode): columnsHelperIns;
  /**
   * 额外的参数（可以用来存放一些私有参数）
   * @param params: {[key:string]: any}
   * @returns columnsHelperIns
   */
  params(params: { [key: string]: any }): columnsHelperIns;
  /**
   * 子列配置
   * @params {columnsHelperIns} columnsIns 子列配置实例
   * @returns columnsHelperIns
   */
  children(columnsIns: columnsHelperIns): columnsHelperIns;
  /**
   * 插槽配置
   * @params {object} slots {[slotName:string]: string | function }
   * @returns columnsHelperIns
   */
  slots(slots: VxeColumnPropTypes.Slots): columnsHelperIns;
  /**
   * 完成当前列的配置，开始下一列的配置
   * @returns void
   */
  end(): void;
}

/**
 * 列配置工具函数
 * @returns columnsHelperIns
 */
export function columnsHelper(): columnsHelperIns;

import type { VxeColumnPropTypes } from 'vxe-table';

/**
 * 列配置实例
 */
export interface ColumnsHelperIns {
  /**
   * 合并其他由列配置工具函数实例创建的列配置
   * @params {object} columnsHelperIns 列配置工具函数实例
   */
  merge(columnsHelperIns: ColumnsHelperIns): void;
  /**
   * 列的类型（部分功能需要设置 column-config.useKey 或 row-config.useKey）
   * @params {string} type 列类型
   * @returns ColumnsHelperIns
   */
  type(type: VxeColumnPropTypes.Type): ColumnsHelperIns;
  /**
   * 列的字段名
   * @params {string} field 字段名
   * @returns ColumnsHelperIns
   */
  field(field: VxeColumnPropTypes.Field): ColumnsHelperIns;
  /**
   * 列的标题
   * @params {string} title 标题
   * @returns ColumnsHelperIns
   */
  title(title: VxeColumnPropTypes.Title): ColumnsHelperIns;
  /**
   * 列宽度（如果为空则均匀分配剩余宽度，如果全部列固定了，可能会存在宽屏下不会铺满，可以配合 "%" 或者 "min-width" 布局）
   * @params {(string | number)} width 宽度
   * @returns ColumnsHelperIns
   */
  width(width: VxeColumnPropTypes.Width): ColumnsHelperIns;
  /**
   * 最小列宽度；会自动将剩余空间按比例分配
   * @params {(string | number)} minWidth 最小宽度
   * @returns ColumnsHelperIns
   */
  minWidth(minWidth: VxeColumnPropTypes.MinWidth): ColumnsHelperIns;
  /**
   * 列是否允许拖动列宽调整大小
   * @params {boolean} resizable 是否可调整大小
   * @returns ColumnsHelperIns
   */
  resizable(resizable: VxeColumnPropTypes.Resizable): ColumnsHelperIns;
  /**
   * 列是否显示
   * @params {boolean} visible 是否显示
   * @returns ColumnsHelperIns
   */
  visible(visible: VxeColumnPropTypes.Visible): ColumnsHelperIns;
  /**
   * 列是否固定
   * @params {string} fixed 固定位置 'left' | 'right'
   * @returns ColumnsHelperIns
   */
  fixed(fixed: VxeColumnPropTypes.Fixed): ColumnsHelperIns;
  /**
   * 列对其方式
   * @params {string} align 对齐方式 'left' | 'center' | 'right'
   * @params {object} [extra={}] 单独配置headerAlign、footerAlign
   * @returns ColumnsHelperIns
   */
  align(
    align: VxeColumnPropTypes.Align,
    extra?: {
      header?: VxeColumnPropTypes.HeaderAlign;
      footer?: VxeColumnPropTypes.FooterAlign;
    }
  ): ColumnsHelperIns;
  /**
   * 当内容过长时显示为省略号
   * @params {(string | boolean)} showOverflow 是否/如何(tooltip|ellipsis|title)显示溢出省略
   * @params {object} [extra={}] 单独配置showHeaderOverflow、showFooterOverflow
   * @returns ColumnsHelperIns
   */
  showOverflow(
    showOverflow: VxeColumnPropTypes.ShowOverflow,
    extra?: {
      header?: VxeColumnPropTypes.ShowHeaderOverflow;
      footer?: VxeColumnPropTypes.ShowFooterOverflow;
    }
  ): ColumnsHelperIns;
  /**
   * 给单元格附加 className
   * @params {(string | function)} className 样式类名
   * @params {object} [extra={}] 单独配置headerClassName、footerClassName
   * @returns ColumnsHelperIns
   */
  className(
    className: VxeColumnPropTypes.ClassName<string>,
    extra?: {
      header?: VxeColumnPropTypes.HeaderClassName<string>;
      footer?: VxeColumnPropTypes.FooterClassName<string>;
    }
  ): ColumnsHelperIns;
  /**
   * 显示边距
   * @version vxe-table@3.12.10
   * @param {boolean} hasPadding 是否显示边距
   * @returns ColumnsHelperIns
   */
  padding(hasPadding: VxeColumnPropTypes.Padding): ColumnsHelperIns;
  /**
   * 垂直对齐方式
   * @version vxe-table@3.12.10
   * @params {string} verticalAlign 垂直对齐方式 'top' | 'center'
   * @returns ColumnsHelperIns
   */
  verticalAlign(verticalAlign: VxeColumnPropTypes.VerticalAlign): ColumnsHelperIns;
  /**
   * 格式化显示内容
   * @params {(function|array|string)} formatter
   * @returns ColumnsHelperIns
   */
  formatter(formatter: VxeColumnPropTypes.Formatter): ColumnsHelperIns;
  /**
   * 数据排序
   * @params {object} sortConf 排序配置
   * @params {string} sortConf.sortType 排序的字段类型 auto | number | string
   * @params {(string|function)} sortConf.sortBy 指定排序的字段（当值 formatter 格式化后，可以设置该字段，使用值进行排序）
   * @returns ColumnsHelperIns
   */
  sort(sortConf: {
    sortType?: VxeColumnPropTypes.SortType;
    sortBy?: VxeColumnPropTypes.SortBy;
  }): ColumnsHelperIns;
  /**
   * 数据筛选，配置筛选条件（注：筛选只能用于列表，如果是树结构则过滤根节点）
   * @params {array} filters 筛选配置,{label?:string;value?:string;checked?:boolean;resetValue?:any;data?:any;}[]
   * @params {boolean} multiple? 是否多选, 默认true
   * @returns ColumnsHelperIns
   */
  filters(
    filters: VxeColumnPropTypes.Filters,
    multiple?: VxeColumnPropTypes.FilterMultiple
  ): ColumnsHelperIns;
  /**
   * 列的筛选方法，该方法的返回值用来决定该行是否显示
   * @params {function} filterMethod: ({ value, option, cellValue, row, column }) => boolean
   * @returns ColumnsHelperIns
   */
  filterMethod(filterMethod: VxeColumnPropTypes.FilterMethod): ColumnsHelperIns;
  /**
   * 自定义筛选重置方法
   * @params {function} filterResetMethod: ({ options, column }) => void
   * @returns ColumnsHelperIns
   */
  filterResetMethod(filterResetMethod: VxeColumnPropTypes.FilterResetMethod): ColumnsHelperIns;
  /**
   * 自定义筛选复原方法（使用自定义筛选时可能会用到）
   * @params {function} filterRecoverMethod: ({ options, column }) => void
   * @returns ColumnsHelperIns
   */
  filterRecoverMethod(
    filterRecoverMethod: VxeColumnPropTypes.FilterRecoverMethod
  ): ColumnsHelperIns;
  /**
   * 数据筛选，筛选渲染器配置项
   * @params {string} name 渲染器名称
   * @params {object} renderOptions?: {props?:object; events":object; content?:string}
   * @returns ColumnsHelperIns
   */
  filterRender(name: string, renderOptions?: VxeColumnPropTypes.FilterRender): ColumnsHelperIns;
  /**
   * 标题前缀图标配置项
   * @params {object} prefix: {content?:string; icon?:string;}
   * @returns ColumnsHelperIns
   */
  titlePrefix(prefix: VxeColumnPropTypes.TitlePrefix): ColumnsHelperIns;
  /**
   * 标题后缀图标配置项
   * @params {object} suffix: {content?:string; icon?:string;}
   * @returns ColumnsHelperIns
   */
  titleSuffix(suffix: VxeColumnPropTypes.TitleSuffix): ColumnsHelperIns;
  /**
   * 默认的渲染器配置项
   * @params {string} name 渲染器名称
   * @params {object} renderOptions? 渲染器配置项
   * @returns ColumnsHelperIns
   */
  cellRender(name: string, renderOptions?: VxeColumnPropTypes.CellRender): ColumnsHelperIns;
  /**
   * 可编辑渲染器配置项
   * @params {string} name 渲染器名称
   * @params {object} renderOptions? 渲染器配置项
   * @returns ColumnsHelperIns
   */
  editRender(name: string, renderOptions?: VxeColumnPropTypes.EditRender): ColumnsHelperIns;
  /**
   * 内容渲染器配置项
   * @params {string} name 渲染器名称
   * @params {object} renderOptions? 渲染器配置项
   * @returns ColumnsHelperIns
   */
  contentRender(name: string, renderOptions?: VxeColumnPropTypes.ContentRender): ColumnsHelperIns;
  /**
   * 指定为树节点，只对 tree-config 配置时有效
   * @params {boolean} isTreeNode 默认值 false
   */
  treeNode(isTreeNode: VxeColumnPropTypes.TreeNode): ColumnsHelperIns;
  /**
   * 额外的参数（可以用来存放一些私有参数）
   * @param params: {[key:string]: any}
   * @returns ColumnsHelperIns
   */
  params(params: { [key: string]: any }): ColumnsHelperIns;
  /**
   * 子列配置
   * @params {columnsHelperIns | (param: ColumnsHelperIns) => void} columnsInsOrFn 子列配置实例或子列配置函数
   * @returns ColumnsHelperIns
   */
  children(
    columnsInsOrFn: ColumnsHelperIns | ((param: ColumnsHelperIns) => void)
  ): ColumnsHelperIns;
  /**
   * 插槽配置
   * @params {object} slots {[slotName:string]: string | function }
   * @returns ColumnsHelperIns
   */
  slots(slots: VxeColumnPropTypes.Slots): ColumnsHelperIns;
  /**
   * 完成当前列的配置，开始下一列的配置
   * @returns void
   */
  end(): void;
}

/**
 * 列配置工具函数
 * @returns ColumnsHelperIns
 */
export function columnsHelper(): ColumnsHelperIns;

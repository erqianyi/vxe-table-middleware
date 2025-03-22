import type { VxeTablePropTypes } from 'vxe-table';
type OptionsHeight = VxeTablePropTypes.Height | { minHeight?: VxeTablePropTypes.MinHeight; maxHeight?: VxeTablePropTypes.MaxHeight };
type ClassNameTypes = 'row' | 'cell' | 'header-row' | 'header-cell' | 'footer-row' | 'footer-cell';
type ClassName<T> = T extends 'row'
  ? VxeTablePropTypes.RowClassName
  : T extends 'cell'
  ? VxeTablePropTypes.CellClassName
  : T extends 'header-row'
  ? VxeTablePropTypes.HeaderRowClassName
  : T extends 'header-cell'
  ? VxeTablePropTypes.HeaderCellClassName
  : T extends 'footer-row'
  ? VxeTablePropTypes.FooterRowClassName
  : T extends 'footer-cell'
  ? VxeTablePropTypes.FooterCellClassName
  : never;

export interface OptionsHelperIns {
  /**
   * 唯一标识（被某些特定的功能所依赖）
   * @params {string} id 标识值
   * @returns OptionsHelperIns
   */
  id(id: VxeTablePropTypes.ID): OptionsHelperIns;
  /**
   * 高度设置 或者 最大高度/最小高度设置
   * @params {number | string | { minHeight?: number | string; maxHeight?: number | string }} height 高度值
   * @returns OptionsHelperIns
   */
  height(height: OptionsHeight): OptionsHelperIns;
  /**
   * 自动监听父元素的变化去重新计算表格（对于父元素可能存在动态变化、显示隐藏的容器中、列宽异常等场景中的可能会用到）
   * @params {boolean} autoResize 默认false
   * @returns OptionsHelperIns
   */
  autoResize(autoResize: VxeTablePropTypes.AutoResize): OptionsHelperIns;
  /**
   * 自动跟随某个属性的变化去重新计算表格，和手动调用 recalculate 方法是一样的效果（对于通过某个属性来控制显示/隐藏切换时可能会用到）
   * @params {(boolean|string|number)} syncResize 默认false
   * @returns OptionsHelperIns
   */
  syncResize(syncResize: VxeTablePropTypes.SyncResize): OptionsHelperIns;
  /**
   * 是否带有斑马纹（需要注意的是，在可编辑表格场景下，临时插入的数据不会有斑马纹样式）
   * @params {boolean} stripe 默认false,继承全局配置
   * @returns OptionsHelperIns
   */
  stripe(stripe: VxeTablePropTypes.Stripe): OptionsHelperIns;
  /**
   * 是否带有边框
   * @params {(boolean|string)} border 默认false，继承全局配置，default（默认）, full（完整边框）, outer（外边框）, inner（内边框）, none（无边框）
   * @returns OptionsHelperIns
   */
  border(border: VxeTablePropTypes.Border): OptionsHelperIns;
  /**
   * 是否为圆角边框
   * @params {boolean} round 默认false，继承全局配置
   * @returns OptionsHelperIns
   */
  round(round: VxeTablePropTypes.Round): OptionsHelperIns;
  /**
   * 表格的尺寸
   * @params {string} size 继承上下文，'medium' | 'small' | 'mini'
   * @returns OptionsHelperIns
   */
  size(size: VxeTablePropTypes.Size): OptionsHelperIns;
  /**
   * 表格是否显示加载中
   * @params {boolean} loading 默认true
   * @returns OptionsHelperIns
   */
  loading(loading: VxeTablePropTypes.Loading): OptionsHelperIns;
  /**
   * 所有的列对齐方式
   * @params {string} align 对齐方式 'left' | 'center' | 'right'
   * @params {object} [extra={}] 单独配置所有列的headerAlign、footerAlign
   * @returns OptionsHelperIns
   */
  align(
    align: VxeTablePropTypes.Align,
    extra?: { headerAlign?: VxeTablePropTypes.HeaderAlign; footerAlign?: VxeTablePropTypes.FooterAlign },
  ): OptionsHelperIns;
  /**
   * 表格是否显示表头
   * @params {boolean} showHeader 默认true
   * @returns OptionsHelperIns
   */
  showHeader(showHeader: VxeTablePropTypes.ShowHeader): OptionsHelperIns;
  /**
   * 给行/列/表头/表尾附加类名
   * @params {string} type 类名位置类型，row | cell | header-row | header-cell | footer-row | footer-cell
   * @params {(string | function)} className 类名或返回类名的方法
   * @returns OptionsHelperIns
   */
  addClassName<T extends ClassNameTypes>(type: T, className: ClassName<T>): OptionsHelperIns;
  /**
   * 表格是否显示表尾
   * @params {boolean} showFooter 默认false
   * @returns OptionsHelperIns
   */
  showFooter(showFooter: VxeTablePropTypes.ShowFooter): OptionsHelperIns;
  /**
   * 表尾数据
   * @params {array} footerData?: any[] 表尾数据
   * @returns OptionsHelperIns
   */
  footerData(footerData: VxeTablePropTypes.FooterData): OptionsHelperIns;
  /**
   * 临时合并指定的单元格 (不能用于展开行，不建议用于固定列、树形结构)
   * @params {array} mergeCells Array<{ row: number, col: number, rowspan: number, colspan: number }>
   * @returns OptionsHelperIns
   */
  mergeCells(mergeCells: VxeTablePropTypes.MergeCells): OptionsHelperIns;
  /**
   * 临时合并表尾 (不能用于展开行，不建议用于固定列、树形结构)
   * @params {array} mergeFooterItems Array<{ row: number, col: number, rowspan: number, colspan: number }>
   * @returns OptionsHelperIns
   */
  mergeFooterItems(mergeFooterItems: VxeTablePropTypes.MergeFooterItems): OptionsHelperIns;
  /**
   * 设置所有内容过长时显示为省略号（如果是固定列建议设置该值，提升渲染速度）
   * @params {(boolean|string)} showOverflow: boolean | 'ellipsis' | 'title' | 'tooltip'
   * @params {object} [extra={}] 单独配置header、footer是否显示省略及表现
   * @returns OptionsHelperIns
   */
  showOverflow(
    showOverflow: VxeTablePropTypes.ShowOverflow,
    extra?: { header?: VxeTablePropTypes.ShowHeaderOverflow; footer?: VxeTablePropTypes.ShowFooterOverflow },
  ): OptionsHelperIns;
  /**
   * 保持原始值的状态，被某些功能所依赖，比如编辑状态、还原数据等（开启后影响性能，具体取决于数据量）
   * @params {boolean} keepSource 默认 false
   * @returns OptionsHelperIns
   */
  keepSource(keepSource: VxeTablePropTypes.KeepSource): OptionsHelperIns;
  /**
   * 列配置信息
   * @params {object} columnConfig 配置项，继承全局配置
   * @returns OptionsHelperIns
   */
  columnConfig(columnConfig: VxeTablePropTypes.ColumnConfig): OptionsHelperIns;
  /**
   * 单元格配置项，表头表尾单元格配置项
   * @params {object} cellConfig 配置项，继承全局配置
   * @params {object} [extra={}] 单独配置header-cell-config、footer-cell-config，{ header: {}, footer: {} }
   * @returns OptionsHelperIns
   */
  cellConfig(
    cellConfig: VxeTablePropTypes.CellConfig,
    extra?: { header?: VxeTablePropTypes.HeaderCellConfig; footer?: VxeTablePropTypes.FooterCellConfig },
  ): OptionsHelperIns;
  /**
   * 行配置信息
   * @params {object} rowConfig 配置项，继承全局配置
   * @returns OptionsHelperIns
   */
  rowConfig(rowConfig: VxeTablePropTypes.RowConfig): OptionsHelperIns;
  /**
   * 列宽拖动配置项
   * @params {object} resizableConfig 配置项，继承全局配置
   * @returns OptionsHelperIns
   */
  resizableConfig(resizableConfig: VxeTablePropTypes.ResizableConfig): OptionsHelperIns;
  /**
   * 序号配置项
   * @params {object} seqConfig 配置项，继承全局配置
   * @returns OptionsHelperIns
   */
  seqConfig(seqConfig: VxeTablePropTypes.SeqConfig): OptionsHelperIns;
  /**
   * 排序配置项
   * @params {object} sortConfig 配置项，继承全局配置
   * @returns OptionsHelperIns
   */
  sortConfig(sortConfig: VxeTablePropTypes.SortConfig): OptionsHelperIns;
  /**
   * 行拖拽配置项
   * @params {object} rowDragConfig 配置项，继承全局配置
   * @returns OptionsHelperIns
   */
  rowDragConfig(rowDragConfig: VxeTablePropTypes.RowDragConfig): OptionsHelperIns;
  /**
   * 列拖拽配置项
   * @params {object} columnDragConfig 配置项，继承全局配置
   * @returns OptionsHelperIns
   */
  columnDragConfig(columnDragConfig: VxeTablePropTypes.ColumnDragConfig): OptionsHelperIns;
  /**
   * 筛选配置项
   * @params {object} filterConfig 配置项，继承全局配置
   * @returns OptionsHelperIns
   */
  filterConfig(filterConfig: VxeTablePropTypes.FilterConfig): OptionsHelperIns;
}

// 工具函数
export function optionsHelper(): OptionsHelperIns;

import type { VxeFormItemPropTypes, VxeFormDefines } from 'vxe-table';

export interface FormItemHelperIns {
  /**
   * 合并其他由表单项配置工具函数实例创建的列配置
   * @params {object} formItemHelperIns 配置工具函数实例
   */
  merge(formItemHelperIns: FormItemHelperIns): void;
  /**
   * 配置表单项字段
   * @params {string} field 字段名
   * @params {any} defaultValue 默认值
   * @returns FormItemHelperIns
   */
  field(field: VxeFormItemPropTypes.Field, defaultValue: any): FormItemHelperIns;
  /**
   * 配置表单项标题
   * @params {string} title 标题
   * @returns FormItemHelperIns
   */
  title(title: VxeFormItemPropTypes.Title): FormItemHelperIns;
  /**
   * 配置表单项栅格占据的列数（共 24 分栏）
   * @params {(string|number)} span 列数
   * @returns FormItemHelperIns
   */
  span(span: VxeFormItemPropTypes.Span): FormItemHelperIns;
  /**
   * 配置表单项内容对齐方式
   * @params {string} align 对齐方式
   * @returns FormItemHelperIns
   */
  align(align: VxeFormItemPropTypes.Align): FormItemHelperIns;
  /**
   * 垂直的对齐方式
   * @params {string} verticalAlign 对齐方式
   * @returns FormItemHelperIns
   */
  verticalAlign(verticalAlign: VxeFormItemPropTypes.VerticalAlign): FormItemHelperIns;
  /**
   * 显示标题背景
   * @params {boolean} titleBackground
   * @returns FormItemHelperIns
   */
  titleBackground(titleBackground: VxeFormItemPropTypes.TitleBackground): FormItemHelperIns;
  /**
   * 标题对齐方式
   * @params {string} titleAlign
   * @returns FormItemHelperIns
   */
  titleAlign(titleAlign: VxeFormItemPropTypes.TitleAlign): FormItemHelperIns;
  /**
   * 标题宽度
   * @params {(string|number)} titleWidth 宽度(auto,px,%)
   * @returns FormItemHelperIns
   */
  titleWidth(titleWidth: VxeFormItemPropTypes.TitleWidth): FormItemHelperIns;
  /**
   * 是否显示标题冒号
   * @params {boolean} titleColon 继承全局配置
   * @returns FormItemHelperIns
   */
  titleColon(titleColon: VxeFormItemPropTypes.TitleColon): FormItemHelperIns;
  /**
   * 是否显示必填字段的红色星号
   * @params {boolean} titleAsterisk 继承全局配置
   * @returns FormItemHelperIns
   */
  titleAsterisk(titleAsterisk: VxeFormItemPropTypes.TitleAsterisk): FormItemHelperIns;
  /**
   * 标题内容过长时显示为省略号
   * @params {(string|boolean)} titleOverflow 继承全局配置
   * @returns FormItemHelperIns
   */
  titleOverflow(titleOverflow: VxeFormItemPropTypes.TitleOverflow): FormItemHelperIns;
  /**
   * 是否显示标题
   * @params {boolean} showTitle 默认 true
   * @returns FormItemHelperIns
   */
  showTitle(showTitle: VxeFormItemPropTypes.ShowTitle): FormItemHelperIns;
  /**
   * 显示边距
   * @params {boolean} padding 继承全局配置
   * @returns FormItemHelperIns
   */
  padding(padding: VxeFormItemPropTypes.Padding): FormItemHelperIns;
  /**
   * 使用垂直布局
   * @params {boolean} vertical 继承全局配置
   * @returns FormItemHelperIns
   */
  vertical(vertical: VxeFormItemPropTypes.Vertical): FormItemHelperIns;
  /**
   * 给表单项附加className
   * @params {(string|function)} className 类名, string | (({ field, data }) => string)
   * @returns FormItemHelperIns
   */
  className(className: VxeFormItemPropTypes.ClassName): FormItemHelperIns;
  /**
   * 给表单项内容附加className
   * @params {(string|function)} className 类名, string | (({ field, data }) => string)
   * @returns FormItemHelperIns
   */
  contentClassName(className: VxeFormItemPropTypes.ContentClassName): FormItemHelperIns;
  /**
   * 给表单项内容附加样式
   * @params {(object|function)} style 样式对象，{ [name: string]: string } | (({ field, data }) => string)
   * @returns FormItemHelperIns
   */
  contentStyle(style: VxeFormItemPropTypes.ContentStyle): FormItemHelperIns;
  /**
   * 默认是否显示
   * @params {boolean} visible 是否显示，默认 true
   * @returns FormItemHelperIns
   */
  visible(visible: VxeFormItemPropTypes.Visible): FormItemHelperIns;
  /**
   * 该方法的返回值用来决定该项是否显示
   * @params {function} method 方法，({ data }) => boolean
   * @returns FormItemHelperIns
   */
  visibleMethod(method: VxeFormItemPropTypes.VisibleMethod): FormItemHelperIns;
  /**
   * 默认收起
   * @params {boolean} folding 是否折叠，默认值false
   * @returns FormItemHelperIns
   */
  folding(folding: VxeFormItemPropTypes.Folding): FormItemHelperIns;
  /**
   * 折叠节点
   * @params {boolean} collapseNode 是否折叠，默认值false
   * @returns FormItemHelperIns
   */
  collapseNode(collapseNode: VxeFormItemPropTypes.CollapseNode): FormItemHelperIns;
  /**
   * 前缀配置项
   * @params {object} config 配置项
   * @returns FormItemHelperIns
   */
  titlePrefix(config: VxeFormItemPropTypes.TitlePrefix): FormItemHelperIns;
  /**
   * 后缀配置项
   * @params {object} config 配置项
   * @returns FormItemHelperIns
   */
  titleSuffix(config: VxeFormItemPropTypes.TitleSuffix): FormItemHelperIns;
  /**
   * 重置时的默认值
   * @params {any} resetValue 重置值，any | ((params: { item, field, data }) => any)，默认undefined
   * @returns FormItemHelperIns
   */
  resetValue(resetValue: VxeFormItemPropTypes.ResetValue): FormItemHelperIns;
  /**
   * 格式化显示内容
   * @params {(string|function)} formatter 显示的内容，string | ((params: { itemValue, item, field, data }) => string)
   * @returns FormItemHelperIns
   */
  formatter(formatter: VxeFormItemPropTypes.Formatter): FormItemHelperIns;
  /**
   * 额外的参数（可以用来存放一些私有参数）
   * @params {any} params 参数
   * @returns this
   */
  params(params: VxeFormItemPropTypes.Params): FormItemHelperIns;
  /**
   * 项渲染器配置项
   * @param {string} name 渲染器名称
   * @param {object} renderOptions 针对该渲染器的配置项
   * @returns this
   */
  itemRender(name: string, renderOptions?: VxeFormItemPropTypes.ItemRender): FormItemHelperIns;
  /**
   * 插槽配置
   * @param {object} slots? {[slotName:string]: string | function }
   * @returns this
   */
  slots(slots: VxeFormItemPropTypes.Slots): FormItemHelperIns;
  /**
   * 校验规则配置项，如果有多个校验规则，需要配置多次调用该方法
   * @params {object} config 校验规则
   * @returns FormItemHelperIns
   * @example
   * formItemIns.rule({ required: true, message: '请输入' }).rule({max: 30, message: '最多输入30个字'})
   */
  rule(config: VxeFormDefines.FormRule): FormItemHelperIns;
  /**
   * 完成当前项的配置，开始下一项的配置
   */
  end(): void;
}

/**
 * 表单项配置工具函数
 * @returns FormItemHelperIns
 */
export function formItemHelper(): FormItemHelperIns;

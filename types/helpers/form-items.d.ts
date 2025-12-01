import type { VxeFormItemPropTypes, VxeFormDefines, VxeFormProps } from 'vxe-table';

type FormItemsHelperParam = Omit<VxeFormProps, 'data' | 'items' | 'rules'>;

export interface FormItemsHelperIns {
  /**
   * 合并其他由表单项配置工具函数实例创建的列配置
   * @params {object} formItemHelperIns 配置工具函数实例
   */
  merge(formItemHelperIns: FormItemsHelperIns): void;
  /**
   * 配置表单项字段
   * @params {string} field 字段名
   * @params {any} defaultValue 默认值
   * @returns FormItemsHelperIns
   */
  field(field: VxeFormItemPropTypes.Field, defaultValue: any): FormItemsHelperIns;
  /**
   * 配置表单项标题
   * @params {string} title 标题
   * @returns FormItemsHelperIns
   */
  title(title: VxeFormItemPropTypes.Title): FormItemsHelperIns;
  /**
   * 配置表单项栅格占据的列数（共 24 分栏）
   * @params {(string|number)} span 列数
   * @returns FormItemsHelperIns
   */
  span(span: VxeFormItemPropTypes.Span): FormItemsHelperIns;
  /**
   * 配置表单项内容对齐方式
   * @params {string} align 对齐方式
   * @returns FormItemsHelperIns
   */
  align(align: VxeFormItemPropTypes.Align): FormItemsHelperIns;
  /**
   * 垂直的对齐方式
   * @params {string} verticalAlign 对齐方式
   * @returns FormItemsHelperIns
   */
  verticalAlign(verticalAlign: VxeFormItemPropTypes.VerticalAlign): FormItemsHelperIns;
  /**
   * 显示标题背景
   * @params {boolean} titleBackground
   * @returns FormItemsHelperIns
   */
  titleBackground(titleBackground: VxeFormItemPropTypes.TitleBackground): FormItemsHelperIns;
  /**
   * 标题对齐方式
   * @params {string} titleAlign
   * @returns FormItemsHelperIns
   */
  titleAlign(titleAlign: VxeFormItemPropTypes.TitleAlign): FormItemsHelperIns;
  /**
   * 标题宽度
   * @params {(string|number)} titleWidth 宽度(auto,px,%)
   * @returns FormItemsHelperIns
   */
  titleWidth(titleWidth: VxeFormItemPropTypes.TitleWidth): FormItemsHelperIns;
  /**
   * 是否显示标题冒号
   * @params {boolean} titleColon 继承全局配置
   * @returns FormItemsHelperIns
   */
  titleColon(titleColon: VxeFormItemPropTypes.TitleColon): FormItemsHelperIns;
  /**
   * 是否显示必填字段的红色星号
   * @params {boolean} titleAsterisk 继承全局配置
   * @returns FormItemsHelperIns
   */
  titleAsterisk(titleAsterisk: VxeFormItemPropTypes.TitleAsterisk): FormItemsHelperIns;
  /**
   * 标题内容过长时显示为省略号
   * @params {(string|boolean)} titleOverflow 继承全局配置
   * @returns FormItemsHelperIns
   */
  titleOverflow(titleOverflow: VxeFormItemPropTypes.TitleOverflow): FormItemsHelperIns;
  /**
   * 是否显示标题
   * @params {boolean} showTitle 默认 true
   * @returns FormItemsHelperIns
   */
  showTitle(showTitle: VxeFormItemPropTypes.ShowTitle): FormItemsHelperIns;
  /**
   * 显示边距
   * @params {boolean} padding 继承全局配置
   * @returns FormItemsHelperIns
   */
  padding(padding: VxeFormItemPropTypes.Padding): FormItemsHelperIns;
  /**
   * 使用垂直布局
   * @params {boolean} vertical 继承全局配置
   * @returns FormItemsHelperIns
   */
  vertical(vertical: VxeFormItemPropTypes.Vertical): FormItemsHelperIns;
  /**
   * 给表单项附加className
   * @params {(string|function)} className 类名, string | (({ field, data }) => string)
   * @returns FormItemsHelperIns
   */
  className(className: VxeFormItemPropTypes.ClassName): FormItemsHelperIns;
  /**
   * 给表单项内容附加className
   * @params {(string|function)} className 类名, string | (({ field, data }) => string)
   * @returns FormItemsHelperIns
   */
  contentClassName(className: VxeFormItemPropTypes.ContentClassName): FormItemsHelperIns;
  /**
   * 给表单项内容附加样式
   * @params {(object|function)} style 样式对象，{ [name: string]: string } | (({ field, data }) => string)
   * @returns FormItemsHelperIns
   */
  contentStyle(style: VxeFormItemPropTypes.ContentStyle): FormItemsHelperIns;
  /**
   * 默认是否显示
   * @params {boolean} visible 是否显示，默认 true
   * @returns FormItemsHelperIns
   */
  visible(visible: VxeFormItemPropTypes.Visible): FormItemsHelperIns;
  /**
   * 该方法的返回值用来决定该项是否显示
   * @params {function} method 方法，({ data }) => boolean
   * @returns FormItemsHelperIns
   */
  visibleMethod(method: VxeFormItemPropTypes.VisibleMethod): FormItemsHelperIns;
  /**
   * 默认收起
   * @params {boolean} folding 是否折叠，默认值false
   * @returns FormItemsHelperIns
   */
  folding(folding: VxeFormItemPropTypes.Folding): FormItemsHelperIns;
  /**
   * 折叠节点
   * @params {boolean} collapseNode 是否折叠，默认值false
   * @returns FormItemsHelperIns
   */
  collapseNode(collapseNode: VxeFormItemPropTypes.CollapseNode): FormItemsHelperIns;
  /**
   * 前缀配置项
   * @params {object} config 配置项
   * @returns FormItemsHelperIns
   */
  titlePrefix(config: VxeFormItemPropTypes.TitlePrefix): FormItemsHelperIns;
  /**
   * 后缀配置项
   * @params {object} config 配置项
   * @returns FormItemsHelperIns
   */
  titleSuffix(config: VxeFormItemPropTypes.TitleSuffix): FormItemsHelperIns;
  /**
   * 重置时的默认值
   * @params {any} resetValue 重置值，any | ((params: { item, field, data }) => any)，默认undefined
   * @returns FormItemsHelperIns
   */
  resetValue(resetValue: VxeFormItemPropTypes.ResetValue): FormItemsHelperIns;
  /**
   * 格式化显示内容
   * @params {(string|function)} formatter 显示的内容，string | ((params: { itemValue, item, field, data }) => string)
   * @returns FormItemsHelperIns
   */
  formatter(formatter: VxeFormItemPropTypes.Formatter): FormItemsHelperIns;
  /**
   * 额外的参数（可以用来存放一些私有参数）
   * @params {any} params 参数
   * @returns FormItemsHelperIns
   */
  params(params: VxeFormItemPropTypes.Params): FormItemsHelperIns;
  /**
   * 项渲染器配置项
   * @params {string} name 渲染器名称
   * @params {object} renderOptions 针对该渲染器的配置项
   * @returns FormItemsHelperIns
   */
  itemRender(name: string, renderOptions?: VxeFormItemPropTypes.ItemRender): FormItemsHelperIns;
  /**
   * 插槽配置
   * @params {object} slots? {[slotName:string]: string | function }
   * @returns FormItemsHelperIns
   */
  slots(slots: VxeFormItemPropTypes.Slots): FormItemsHelperIns;
  /**
   * 校验规则配置项，如果有多个校验规则，需要配置多次调用该方法
   * @params {object} config 校验规则
   * @returns FormItemsHelperIns
   * @example
   * formItemIns.rule({ required: true, message: '请输入' }).rule({max: 30, message: '最多输入30个字'})
   */
  rule(config: VxeFormDefines.FormRule): FormItemsHelperIns;
  /**
   * 完成当前项的配置，开始下一项的配置
   */
  end(): void;
}

/**
 * 表单项配置工具函数
 * @params {object} formConfig? 表单配置
 * @returns FormItemsHelperIns
 */
export function formItemsHelper(formConfig: FormItemsHelperParam): FormItemsHelperIns;

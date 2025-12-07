import Vue from 'vue';
import type { VueConstructor } from 'vue';
import type { VxeGridMethods } from 'vxe-table';
import type { OptionsHelperIns } from './options';
import type { ColumnsHelperIns } from './columns';
import type { EventsHelperIns } from './events';
import type { FormItemsHelperIns } from './form-items';

type InstanceOrFn<T> = T | ((param: T) => void);

export class VxeGridWrapComponent extends Vue {}

export interface VxeGridWrapApi extends VxeGridMethods {
  /**
   * 更新修改配置项
   * @params optionsOrFn 配置项实例或方法
   * @returns Promise
   */
  updateOptions(optionsOrFn: InstanceOrFn<OptionsHelperIns>): Promise<any>;
  /**
   * 更新修改列配置项
   * @params {ColumnsHelperIns} columnsOrFn 配置项实例或方法
   * @returns Promise
   */
  updateColumns(columnsOrFn: InstanceOrFn<ColumnsHelperIns>): Promise<any>;
  /**
   * 更新修改表单配置项
   * @params {FormItemsHelperIns} formItemsOrFn 配置项实例或方法
   * @returns Promise
   */
  updateFormItems(formItemsOrFn: InstanceOrFn<FormItemsHelperIns>): Promise<any>;
}

type GridConstructor = VueConstructor;

type CreateOpinions = {
  columns: ColumnsHelperIns;
  options?: OptionsHelperIns;
  events?: EventsHelperIns;
  formItems?: FormItemsHelperIns;
};
type GridElement = HTMLElement | typeof VxeGridWrapComponent;

/** 函数重载 */
/**
 * 创建表格
 * @params {CreateOpinions} params 配置项
 * @returns {GridConstructor} 获取表格构造函数
 */
export function useVxeGrid(params: CreateOpinions): GridConstructor;
/**
 * 对已经创建过的表格只获取api工具
 * @params {string} params ref引用名称
 * @params {Vue} vueInstance Vue组件实例
 */
export function useVxeGrid(params: string, vueInstance: Vue): VxeGridWrapApi;
/**
 * 对已经创建过的表格只获取api工具
 * @params {GridElement} params 通过$refs获取的表格实例
 * @returns {VxeGridWrapApi} 获取gridApi
 */
export function useVxeGrid(params: GridElement | any): VxeGridWrapApi;

import Vue from 'vue';
import type { VueConstructor } from 'vue';
import type { VxeGridMethods } from 'vxe-table';
import type { OptionsHelperIns } from './options';
import type { ColumnsHelperIns } from './columns';
import type { EventsHelperIns } from './events';
import { FormItemsHelperIns } from './form-items';

export class VxeGridWrapComponent extends Vue {}

export interface VxeGridWrapApi extends VxeGridMethods {
  /**
   * 更新修改配置项
   * @params {OptionsHelperIns} options 配置项实例
   * @returns Promise
   */
  updateOptions(options: OptionsHelperIns): Promise<any>;
  /**
   * 更新修改列配置项
   * @params {ColumnsHelperIns} columns 配置项实例
   * @returns Promise
   */
  updateColumns(columns: ColumnsHelperIns): Promise<any>;
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
 * @params {GridElement} params 通过$refs获取的表格实例
 * @returns {VxeGridWrapApi} 获取gridApi
 */
export function useVxeGrid(params: GridElement | any): VxeGridWrapApi;

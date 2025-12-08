/*
 * @Description  : 创建Grid实例
 */

import Vue from 'vue';
import { isFunction, isUndefined, isEmpty } from 'xe-utils';
import { mergeWithArrayOverride } from './merge-with-array-override';
import { FLAG_OPTIONS_ATTR, FLAG_NAME } from './constant';

const VXE_GRID_COMPONENT_REF = '__VXE_GRID_REF__';
export class GridConstructor {
  constructor({ columns, options, events, formItems }) {
    this.columns = columns;
    this.options = options;
    this.events = events;
    this.formItems = formItems;
  }

  create() {
    const originOptionIns = this.options;
    const originColumnsIns = this.columns;
    const originEventsIns = this.events;
    const originFormItemsIns = this.formItems;
    const columnsConfig = this.columns ? this.columns._getColumns() : [];
    const optionsConfig = this.options ? this.options._getOptions() : {};
    const eventsConfig = this.events ? this.events._getEvents() : {};
    const formItemsConfig = this.formItems ? this.formItems._getConfig() : {};
    const Grid = Vue.extend({
      data() {
        return {
          // 保存原始实例
          originOptionIns,
          originColumnsIns,
          originEventsIns,
          originFormItemsIns,
          // 实例配置
          optionsConfig,
          columnsConfig,
          formItemsConfig,
        };
      },
      computed: {
        gridProps() {
          return {
            ...this.optionsConfig,
            ...{ formConfig: this.formItemsConfig }, // 合并到props.formConfig
            columns: this.columnsConfig,
          };
        },
      },
      methods: {
        /**
         * 更新修改配置项
         * @params {OptionsHelperInsOrFn} optionsOrFn 配置项实例或方法
         * @returns Promise
         */
        updateOptions(optionsOrFn) {
          if (!optionsOrFn) return;
          let opts;
          if (isFunction(optionsOrFn)) {
            if (this.originOptionIns) {
              optionsOrFn(this.originOptionIns);
              opts = this.originOptionIns._getOptions();
            } else {
              throw new Error(
                '[useVxeGrid] `updateOptions`方法参数为方法时，确保在表格初始化时已注入OptionsHelper实例'
              );
            }
          } else if (optionsOrFn._getOptions) {
            opts = optionsOrFn._getOptions();
          } else {
            throw new Error('[useVxeGrid] `updateOptions`方法参数为方法或optionsHelper实例');
          }
          this.optionsConfig = { ...mergeWithArrayOverride(this.optionsConfig, opts) };
          return this.$nextTick();
        },
        /**
         * 更新修改列配置项
         * @params {ColumnsHelperInsOrFn} columnsOrFn 配置项实例或方法
         * @returns Promise
         */
        updateColumns(columnsOrFn) {
          if (!columnsOrFn) return;
          let cols;
          if (isFunction(columnsOrFn)) {
            if (this.originColumnsIns) {
              columnsOrFn(this.originColumnsIns);
              cols = this.originColumnsIns._getColumns();
            } else {
              throw new Error(
                '[useVxeGrid] `updateColumns`方法参数为方法时，确保在表格初始化时已注入ColumnsHelper实例'
              );
            }
          } else if (columnsOrFn._getColumns) {
            cols = columnsOrFn._getColumns();
          } else {
            throw new Error('[useVxeGrid] `updateColumns`方法参数为方法或columnsHelper实例');
          }
          // if (cols.some((col) => !col.field)) {
          //   console.error('[useVxeGrid] 更新列失败，列配置项必须包含field属性');
          //   return;
          // }
          cols.forEach((col) => {
            const column = this.columnsConfig.find((item) => item.field === col.field);
            if (column) mergeWithArrayOverride(column, col);
            else throw new Error(`[useVxeGrid] 更新列失败，原配置项未找到${col.field}列`);
          });
          this.columnsConfig = [...this.columnsConfig];
          return this.$nextTick();
        },
        /**
         * 更新修改表单配置项
         * @params {FormItemsHelperInsOrFn} formItemsOrFn 配置项实例或方法
         * @returns Promise
         */
        updateFormItems(formItemsOrFn) {
          if (!formItemsOrFn) return;
          let formItemsConf;
          if (isFunction(formItemsOrFn)) {
            if (this.originFormItemsIns) {
              formItemsOrFn(this.originFormItemsIns);
              formItemsConf = this.originFormItemsIns._getConfig();
            } else {
              throw new Error(
                '[useVxeGrid] `updateFormItems`方法参数为方法时，确保在表格初始化时已注入FormItemsHelper实例'
              );
            }
          } else if (formItemsOrFn._getConfig) {
            formItemsConf = formItemsOrFn._getConfig();
          } else {
            throw new Error('[useVxeGrid] `updateFormItems`方法参数为方法或formItemsHelper实例');
          }
          const { items, ...others } = this.formItemsConfig;
          const { items: newItems, ...newOthers } = formItemsConf;
          newItems.forEach((item) => {
            const index = items.findIndex((i) => i.field === item.field);
            if (index !== -1) items[index] = { ...mergeWithArrayOverride(items[index], item) };
            else throw new Error(`[useVxeGrid] 更新列失败，原配置项未找到${item.field}表单项`);
          });
          const othersConf = { ...mergeWithArrayOverride(others, newOthers) };
          this.formItemsConfig = { ...othersConf, items };
          return this.$nextTick();
        },
        // 调用VxeGrid组件的api
        _callGridAPI(fnName) {
          const grid = this.$refs[VXE_GRID_COMPONENT_REF];
          if (grid) {
            const fn = grid[fnName];
            if (fn && isFunction(fn)) {
              return fn;
            } else {
              throw new Error(`[useVxeGrid] ${fnName} is not a function`);
            }
          } else {
            throw new Error('[useVxeGrid] Grid尚未准备完成！尝试添加 $nextTick');
          }
        },
      },
      render(h) {
        const { gridProps, $parent = {} } = this;
        const hasEventConfig = eventsConfig && !isEmpty(eventsConfig);
        const parentProps = {};
        for (const [key, prop] of Object.entries($parent.$props || {})) {
          if (!isUndefined(prop) && key !== 'grid') parentProps[key] = prop; // 过滤掉grid和undefined的属性
        }
        return h('vxe-grid', {
          ref: VXE_GRID_COMPONENT_REF,
          props: { ...gridProps, ...parentProps },
          scopedSlots: { ...($parent.$scopedSlots || {}) },
          // 工具函数定义的事件 权重 高于 标签上定义的事件
          on: hasEventConfig ? eventsConfig : { ...($parent.$listeners || {}) },
        });
      },
    });
    Grid[FLAG_OPTIONS_ATTR] = FLAG_NAME; // 添加标识，用于判断是否为create工具创建
    return Grid;
  }
}

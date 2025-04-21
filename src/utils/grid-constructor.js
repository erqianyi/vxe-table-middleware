/*
 * @Description  : 创建Grid实例
 */

import Vue from 'vue';
import { isFunction, isUndefined } from 'xe-utils';
import { mergeWithArrayOverride } from './merge-with-array-override';
import { FLAG_OPTIONS_ATTR, FLAG_NAME } from './constant';

const VXE_GRID_COMPONENT_REF = '__VXE_GRID_REF__';
export class GridConstructor {
  constructor({ columns, options, events }) {
    this.columns = columns;
    this.options = options;
    this.events = events;
  }

  create() {
    const options = this.options;
    const columns = this.columns;
    const events = this.events;
    const Grid = Vue.extend({
      data() {
        return {
          optionsConfig: options,
          columnsConfig: columns,
        };
      },
      computed: {
        gridProps() {
          return {
            ...this.optionsConfig,
            columns: this.columnsConfig,
          };
        },
      },
      methods: {
        /**
         * 更新修改配置项
         * @params {OptionsHelperIns} options 配置项实例
         * @returns Promise
         */
        updateOptions(options) {
          if (options && options._getOptions) {
            const opts = options._getOptions();
            this.optionsConfig = {
              ...mergeWithArrayOverride(this.optionsConfig, opts),
            };
          } else {
            throw new Error('[useVxeGrid] `updateOptions`方法参数必须为 optionsHelper实例');
          }
          return this.$nextTick();
        },
        /**
         * 更新修改列配置项
         * @params {ColumnsHelperIns} columns 配置项实例
         * @returns Promise
         */
        updateColumns(columns) {
          if (columns && columns._getColumns) {
            const cols = columns._getColumns();
            if (cols.some((col) => !col.field)) {
              console.error('[useVxeGrid] 更新列失败，列配置项必须包含field属性');
              return;
            }
            cols.forEach((col) => {
              const column = this.columnsConfig.find((item) => item.field === col.field);
              if (column) mergeWithArrayOverride(column, col);
              else console.error(`[useVxeGrid] 更新列失败，原配置项未找到${col.field}列`);
            });
            this.columnsConfig = [...this.columnsConfig];
          } else {
            throw new Error('[useVxeGrid] `updateColumns`方法参数必须为 columnsHelper实例');
          }
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
        const hasEventConfig = events && Object.keys(events).length;
        const parentProps = {};
        for (const [key, prop] of Object.entries($parent.$props || {})) {
          if (!isUndefined(prop) && key !== 'grid') parentProps[key] = prop; // 过滤掉grid和undefined的属性
        }
        return h('vxe-grid', {
          ref: VXE_GRID_COMPONENT_REF,
          props: { ...gridProps, ...parentProps },
          scopedSlots: { ...($parent.$scopedSlots || {}) },
          // 工具函数定义的事件 权重 高于 标签上定义的事件
          on: hasEventConfig ? events : { ...($parent.$listeners || {}) },
        });
      },
    });
    Grid[FLAG_OPTIONS_ATTR] = FLAG_NAME; // 添加标识，用于判断是否为create工具创建
    return Grid;
  }
}

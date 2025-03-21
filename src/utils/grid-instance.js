/*
 * @Description  : 创建Grid实例
 * @version      : 1.0.0
 * @Author       : 34786
 * @Date         : 2025-02-21 16:45:49
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2025-03-21 17:27:14
 */
import Vue from 'vue';
import { mergeWithArrayOverride } from './merge-with-array-override';
export class GridInstance {
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
            this.optionsConfig = { ...mergeWithArrayOverride(this.optionsConfig, opts) };
          } else {
            throw new Error('[useCommonGrid] `updateOptions`方法参数必须为 optionsHelper实例');
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
            if (cols.some(col => !col.field)) {
              console.error('[useCommonGrid] 更新列失败，列配置项必须包含field属性');
              return;
            }
            cols.forEach(col => {
              const column = this.columnsConfig.find(item => item.field === col.field);
              if (column) mergeWithArrayOverride(column, col);
              else console.error(`[useCommonGrid] 更新列失败，原配置项未找到${col.field}列`);
            });
            this.columnsConfig = [...this.columnsConfig];
          } else {
            throw new Error('[useCommonGrid] `updateColumns`方法参数必须为 columnsHelper实例');
          }
          return this.$nextTick();
        },
      },
      render(h) {
        const { gridProps, $parent = {} } = this;
        const hasEventConfig = events && Object.keys(events).length;
        return h('vxe-grid', {
          props: { ...gridProps },
          scopedSlots: { ...($parent.$scopedSlots || {}) },
          // 工具函数定义的事件 权重 高于 标签上定义的事件
          on: hasEventConfig ? events : { ...($parent.$listeners || {}) },
        });
      },
    });
    return new Grid();
  }
}

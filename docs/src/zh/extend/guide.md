# 说明

::: tip
`vxe-table-middleware`配置构建方法已提供了绝大部分场景的配置方案，如果尚未能满足使用需求，本工具提供了一个`helpersDecorator`方法，用于全局拓展`OptionsHelperIns`和`ColumnsHelperIns`的方法。
:::

::: warning
目前仅支持拓展`OptionsHelperIns`和`ColumnsHelperIns`的方法。
:::

## 方法说明

`helpersDecorator`方法接收两个参数：

- type: 拓展的类型
- extension: 拓展的方法 map

具体参考 `HelpersDecoratorHandler`类型定义：

<<< ../types/extend-helper.d.ts#extendHelperType

## 应用示例

在入口文件（如 main.js）中引入`helpersDecorator`方法：

```js
import { helpersDecorator } from 'vxe-table-middleware';

// 拓展OptionsHelperIns的方法
helpersDecorator('option', {
  // 定义原实例中不存在该方法，如：独立设置表头对齐方式
  headerAlign(align) {
    if (align) this._options['headerAlign'] = align; // 说明：_options 为实例中存放配置的对象
    return this; // 返回实例对象，用于链式调用
  },
});

// 拓展ColumnsHelperIns的方法
helpersDecorator('column', {
  // 新定义一个方法名实现原实例中存在的方法，如 data 方法实现原 field 方法
  data(field) {
    // 说明：column 为实例中存放当前列配置的对象，columns 为实例中存放所有列配置项的对象
    if (field) this.column['field'] = field;
    return this; // 返回实例对象，用于链式调用
  },
});
```

在 Vue 组件中使用：

::: demo 经过以上示例拓展后，`optionsHelper`和`columnsHelper`工具分别可以使用拓展后的方法`headerAlign`和`data`了。

```vue {26,30-32}
<template>
  <vxe-grid-wrap :grid="grid" ref="gridRef" />
</template>
<script>
import { optionsHelper, columnsHelper, useVxeGrid } from 'vxe-table-middleware';
export default {
  data() {
    return {
      grid: null,
    };
  },
  mounted() {
    this.initGrid();
  },
  methods: {
    async setGridData() {
      await this.$nextTick();
      const gridApi = useVxeGrid(this.$refs.gridRef);
      gridApi.loadData([
        { name: '张三', age: 18, address: '北京市' },
        { name: '李四', age: 20, address: '上海市' },
      ]);
    },
    initGrid() {
      const options = optionsHelper();
      options.height(300).headerAlign('center');
      // 构造列配置
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').width(60).end();
      columns.data('name').title('名称').end();
      columns.data('age').title('年龄').end();
      columns.data('address').title('地址').end();
      // 构造表格
      this.grid = useVxeGrid({ options, columns });

      this.setGridData();
    },
  },
};
</script>
```

:::

### 类型支持

对于用户拓展的方法，如果徐需要类型提示，需要用户自行拓展接口，以下针对上面的举例拓展类型参考（以下文件地址根据自己项目实际情况）：

1. 项目根目录创建`types/index.d.ts`目录和文件，定义拓展方法类型：

```TypeScript
import type { OptionsHelperIns, ColumnsHelperIns } from 'vxe-table-middleware';
import type { VxeTablePropTypes, VxeColumnPropTypes } from 'vxe-table';
declare module 'vxe-table-middleware' {
  export interface OptionsHelperIns {
    /**
     * 拓展方法-独立设置表头对齐方式
     * @params {string} align 对齐方式 'left' | 'center' | 'right'
     * @returns OptionsHelperIns
     */
    headerAlign(align: VxeTablePropTypes.Align): OptionsHelperIns;
  }

  export interface ColumnsHelperIns {
    /**
     * 拓展方法-新增data方法实现原field方法
     * @params {string} field 字段名
     * @returns ColumnsHelperIns
     */
    data(data: VxeColumnPropTypes.Field): ColumnsHelperIns;
  }
}
```

2. 项目跟目录`package.json`文件中添加`typings`字段：

```json
{
  // ...
  "typings": "types/index.d.ts"
  // ...
}
```

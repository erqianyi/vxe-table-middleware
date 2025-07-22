# 案例

::: tip

组件除了继承`VxeGrid`的所有方法外，还拓展了`updateOptions`和`updateColumns`两个方法，用于更新由`optionsHelper`创建的表格配置项和`columnsHelper`创建的列配置项。

:::

## 使用举例

::: demo

```vue {44-55}
<template>
  <div>
    <div style="margin-bottom: 8px">
      <vxe-button status="primary" @click="updateOptions">设置表格居中对齐</vxe-button>
      <vxe-button status="primary" @click="updateColumns">设置年龄列宽</vxe-button>
    </div>
    <vxe-grid-wrap :grid="grid" ref="gridRef" />
  </div>
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
      options.height(300).border(true).align('left');
      // 构造列配置
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').width(60).end();
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();
      // 构造表格
      this.grid = useVxeGrid({ options, columns });

      this.setGridData();
    },
    updateOptions() {
      const options = optionsHelper();
      options.align('center');
      const gridApi = useVxeGrid(this.$refs.gridRef);
      gridApi.updateOptions(options);
    },
    updateColumns() {
      const columns = columnsHelper();
      columns.field('age').width(80).end();
      const gridApi = useVxeGrid(this.$refs.gridRef);
      gridApi.updateColumns(columns);
    },
  },
};
</script>
```

:::

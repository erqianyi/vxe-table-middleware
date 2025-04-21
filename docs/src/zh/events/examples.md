# 案例

## 配置工具监听

::: demo

```vue
<template>
  <vxe-grid-wrap ref="gridRef" :grid="grid" />
</template>
<script>
import { columnsHelper, eventsHelper, useVxeGrid } from 'vxe-table-middleware';
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
    checkboxChangeEvent({ checked, row }) {
      alert(checked ? `选中了${row.name}` : `取消选中了${row.name}`);
    },
    checkboxAllEvent({ checked }) {
      alert(checked ? '全选' : '取消全选');
    },
    setGridData() {
      // ！！！ 如果使用useVxeGrid构造表格后立马调用grid方法时需要使用$nextTick
      this.$nextTick(() => {
        const gridApi = useVxeGrid(this.$refs.gridRef);
        gridApi.loadData([
          { name: '张三', age: 18, address: '北京市' },
          { name: '李四', age: 20, address: '上海市' },
        ]);
      });
    },
    initGrid() {
      // 构造列配置
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').end();
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();
      // 事件监听
      const events = eventsHelper();
      events.on('checkbox-change', this.checkboxChangeEvent);
      events.on('checkbox-all', this.checkboxAllEvent);
      // 构造表格
      this.grid = useVxeGrid({ columns, events });
      this.setGridData();
    },
  },
};
</script>
```

:::

## 组件模板监听

::: demo

```vue
<template>
  <vxe-grid-wrap
    ref="gridRef"
    :grid="grid"
    @checkbox-change="checkboxChangeEvent"
    @checkbox-all="checkboxAllEvent"
  />
</template>
<script>
import { columnsHelper, useVxeGrid } from 'vxe-table-middleware';
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
    checkboxChangeEvent({ checked, row }) {
      alert(checked ? `选中了${row.name}` : `取消选中了${row.name}`);
    },
    checkboxAllEvent({ checked }) {
      alert(checked ? '全选' : '取消全选');
    },
    setGridData() {
      // ！！！ 如果使用useVxeGrid构造表格后立马调用grid方法时需要使用$nextTick
      this.$nextTick(() => {
        const gridApi = useVxeGrid(this.$refs.gridRef);
        gridApi.loadData([
          { name: '张三', age: 18, address: '北京市' },
          { name: '李四', age: 20, address: '上海市' },
        ]);
      });
    },
    initGrid() {
      // 构造列配置
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').end();
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();

      // 构造表格
      this.grid = useVxeGrid({ columns });
      this.setGridData();
    },
  },
};
</script>
```

:::

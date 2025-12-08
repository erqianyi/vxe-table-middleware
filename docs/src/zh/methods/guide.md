# 说明

::: tip
`useVxeGrid`工具函数根据传入的参数有两个作用，参数传入属性、列、事件、表单等 grid 构造配置时，返回 grid 构造函数，可传入`VxeGridWrap`组件创建 Grid；参数传入 grid 实例时，返回调用 grid 的 API 方法的接口对象。第一个作用不多介绍，本节主要介绍`useVxeGrid`工具函数的第二个作用。
:::

::: warning 其他说明
假设 grid 实例的 ref 引用名称为`gridRef`：
如果将 `useVxeGrid(this.$refs.gridRef)` 的结果赋值给 data 中的属性使用时会丢失 TS 类型提示，所以推荐赋值给作用域的变量或直接调用方法。
另外支持两种相对简便的方式：

1. 第一个参数传入 ref 引用名称，第二个参数传入当前组件实例，如 `useVxeGrid('gridRef', this)`;
2. **确保 `useVxeGrid` 创建的实例挂在完成后**，将 `this.$refs.gridRef` 赋值给 data 的属性，如 `$gridWrap`，后续均可以通过 `useVxeGrid(this.$gridWrap)`来获取 Api 实例。
   :::

## 使用

### 引入

```js
import { useVxeGrid } from 'vxe-table-middleware';
```

### 调用

**需要注意的是：如果使用 useVxeGrid 构造表格后立马调用获取 gridAPI 方法时需要使用$nextTick 来确保 grid 已经挂载完成**

```vue {18-19,23-29}
<template>
  <div>
    <vxe-button status="primary" @click="getSelected">获取选中数据</vxe-button>
    <vxe-grid-wrap ref="gridRef" :grid="grid" />
  </div>
</template>
<script>
import { useVxeGrid } from 'vxe-table-middleware';
export default {
  data() {
    return { grid: null };
  },
  mounted() {
    this.initGrid();
  },
  methods: {
    getSelected() {
      const gridApi = useVxeGrid(this.$refs.gridRef);
      const selected = gridApi.getCheckboxRecords();
      alert(`选择了 ${selected.length} 条数据！`);
    },
    async setGridData() {
      // ！！！ 如果使用useVxeGrid构造表格后立马调用grid方法时需要使用$nextTick
      await this.$nextTick();
      const gridApi = useVxeGrid(this.$refs.gridRef);
      gridApi.loadData([
        { name: '张三', age: 18, address: '北京市' },
        { name: '李四', age: 20, address: '上海市' },
      ]);
    },
    initGrid() {
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left');
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();

      this.grid = useVxeGrid({ columns });
      this.setGridData();
    },
  },
};
</script>
```

## VxeGridWrap 组件实例方法

/autodoc ../src/utils/extend-proxy-api.js

其他方法请参考 [vxe-grid 文档](https://vxetable.cn/v3/#/grid/api?apiKey=grid) Methods 部分

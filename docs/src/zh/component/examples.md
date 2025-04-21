# 案例

## 使用举例

::: demo 以`height`和`loading`属性为例

```html
<template>
  <div>
    <vxe-button status="primary" @click="isLoading = !isLoading">显示/隐藏loading</vxe-button>
    <vxe-grid-wrap ref="gridRef" :grid="grid" :loading="isLoading" height="300px" />
  </div>
</template>
<script>
  import { columnsHelper, useVxeGrid } from 'vxe-table-middleware';
  export default {
    data() {
      return {
        grid: null,
        isLoading: false,
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
      // 构造表格
      initGrid() {
        const columns = columnsHelper();
        columns.type('checkbox').fixed('left').end();
        columns.field('name').title('姓名').end();
        columns.field('age').title('年龄').end();
        columns.field('address').title('地址').end();

        this.grid = useVxeGrid({ columns });
        this.setGridData();
      },
    },
  };
</script>
```

:::

## 事件监听举例

**注意：介绍中提过还是建议通过`eventsHelper`工具来监听事件！**

::: demo 以`checkbox-change`事件为例

```html
<template>
  <div>
    <vxe-grid-wrap ref="gridRef" :grid="grid" @checkbox-change="onCheckboxChange" />
  </div>
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
      onCheckboxChange({ checked, row }) {
        const str1 = checked ? '选中' : '取消选中';
        const str2 = `${row.name}`;
        alert(`${str1}：${str2}`);
      },
      async setGridData() {
        await this.$nextTick();
        const gridApi = useVxeGrid(this.$refs.gridRef);
        gridApi.loadData([
          { name: '张三', age: 18, address: '北京市' },
          { name: '李四', age: 20, address: '上海市' },
        ]);
      },
      // 构造表格
      initGrid() {
        const columns = columnsHelper();
        columns.type('checkbox').fixed('left').end();
        columns.field('name').title('姓名').end();
        columns.field('age').title('年龄').end();
        columns.field('address').title('地址').end();

        this.grid = useVxeGrid({ columns });
        this.setGridData();
      },
    },
  };
</script>
```

:::

## 插槽举例

::: demo 以空状态`empty`插槽为例

```html
<template>
  <vxe-grid-wrap ref="gridRef" :grid="grid">
    <template #empty>
      <div class="empty-content">自定义空状态</div>
    </template>
  </vxe-grid-wrap>
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
      async setGridData() {
        await this.$nextTick();
        const gridApi = useVxeGrid(this.$refs.gridRef);
        gridApi.loadData([]);
      },
      // 构造表格
      initGrid() {
        const columns = columnsHelper();
        columns.field('name').title('姓名').end();
        columns.field('age').title('年龄').end();
        columns.field('address').title('地址').end();
        this.grid = useVxeGrid({ columns });
        this.setGridData();
      },
    },
  };
</script>
```

:::

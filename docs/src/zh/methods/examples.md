# 案例

::: tip

组件除了继承`VxeGrid`的所有方法外，还拓展了`updateOptions`、`updateColumns`和`updateFormItems`等方法，用于更新由`optionsHelper`创建的表格配置项、`columnsHelper`创建的列配置项，以及`formItemsHelper`创建的表单配置项。

:::

## 使用举例

::: demo

```vue {64-72,75-83,86-94}
<template>
  <div>
    <div style="margin-bottom: 8px">
      <vxe-button status="primary" @click="updateOptions">设置表格居中对齐</vxe-button>
      <vxe-button status="primary" @click="updateColumns">设置年龄列宽</vxe-button>
      <vxe-button status="primary" @click="updateFormItems">设置查询名称必填</vxe-button>
    </div>
    <vxe-grid-wrap :grid="grid" ref="gridRef" />
  </div>
</template>
<script>
import { optionsHelper, columnsHelper, formItemsHelper, useVxeGrid } from 'vxe-table-middleware';
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
      // 查询表单配置
      const formItems = formItemsHelper();
      formItems.field('name', '').title('名称').itemRender('VxeInput').end();
      formItems
        .field('age', '')
        .title('年龄')
        .itemRender('VxeNumberInput', { props: { min: 0, digits: 0 } })
        .end();
      formItems
        .itemRender('VxeButtonGroup', {
          props: {
            options: [
              { type: 'submit', content: '搜索', status: 'primary' },
              { type: 'reset', content: '重置' },
            ],
          },
        })
        .end();
      // 构造表格
      this.grid = useVxeGrid({ options, columns, formItems });

      this.setGridData();
    },
    updateOptions() {
      const gridApi = useVxeGrid(this.$refs.gridRef);
      /* 方式1: */
      // const options = optionsHelper();
      // options.align('center');
      // gridApi.updateOptions(options);
      /* 方式2: */
      gridApi.updateOptions((options) => {
        options.align('center');
      });
    },
    updateColumns() {
      const gridApi = useVxeGrid(this.$refs.gridRef);
      /* 方式1: */
      // const columns = columnsHelper();
      // columns.field('age').width(80).end();
      // gridApi.updateColumns(columns);
      /* 方式2: */
      gridApi.updateColumns((columns) => {
        columns.field('age').width(80).end();
      });
    },
    updateFormItems() {
      const gridApi = useVxeGrid(this.$refs.gridRef);
      /* 方式1: */
      // const formItems = formItemsHelper();
      // formItems.field('name').rule({ required: true, message: '请输入名称' }).end();
      // gridApi.updateFormItems(formItems);
      /* 方式2: */
      gridApi.updateFormItems((formItems) => {
        formItems.field('name').rule({ required: true, message: '请输入名称' }).end();
      });
    },
  },
};
</script>
```

:::

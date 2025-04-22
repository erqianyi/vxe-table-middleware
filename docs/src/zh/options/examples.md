# 案例

::: tip
调用`optionsHelper`方法，返回配置实例，可以通过链式调用方法的方式来配置`vxe-grid` props 属性，大部分的实例方法名与`vxe-grid`的 props 属性名一致（封装工具时的 3.9 版本），少部分做了调整，后续会介绍，以下案例主要体现调整的。
:::

## 新增的

### merge 合并配置

`merge`实例方法用于合并配置（需为`optionsHelper`创建的实例）。

如，`options-examples-merge.js`文件中定义了一些配置，在以下案例中，通过`merge`方法将`options-examples-merge.js`文件中定义的配置合并到当前配置中。

options-examples-merge.js

<<< src/.vuepress/assets/js/options-examples-merge.js

::: demo

```vue {6,25-26}
<template>
  <vxe-grid-wrap ref="gridRef" :grid="grid" />
</template>
<script>
import { optionsHelper, columnsHelper, useVxeGrid } from 'vxe-table-middleware';
import someCommonOptions from '@doc/assets/js/options-examples-merge.js'; // 导入公共配置
export default {
  data() {
    return { grid: null };
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
      // 合并公共配置，如果需要覆盖公共配置，可以在`merge`方法之后调用需要覆盖的属性的方法
      options.height(360).merge(someCommonOptions);

      // 列配置，详见文档描述
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').align('center').width(60).end();
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();
      // ...

      this.grid = useVxeGrid({ options, columns });

      this.setGridData();
    },
  },
};
</script>
```

:::

## 调整的

1. `height`、`min-height`、`max-height`合并为`height`方法，因为考虑 min 和 max 不会和 height 同时设置；
2. `align`、`header-align`、`footer-align`合并为`align`方法，header 和 footer 的配置作为 align 方法的第二个对象参数；
3. `row-class-name`、`cell-class-name`、`header-row-class-name`、`header-cell-class-name`、`footer-row-class-name`、`footer-cell-class-name`通过`addClassName`方法来配置，第一个参数为 class 的类型，第二个参数为 class 名称；
4. `show-overflow`、`show-header-overflow`、`show-footer-overflow`合并为`showOverflow`方法，header 和 footer 的配置作为 showOverflow 方法的第二个对象参数；
5. `cell-config`、`header-cell-config`、`footer-cell-config`合并为`cellConfig`方法，header 和 footer 的配置作为 cellConfig 方法的第二个对象参数；
6. `proxyConfig.ajax`的配置通过`proxyHandlers`方法配置，当然也可以通过`proxyConfig`方法配置，新增`proxyHandlers`方法主要为了减少配置层级；

::: demo

```vue
<template>
  <vxe-grid-wrap ref="gridRef" :grid="grid" />
</template>
<script>
import { optionsHelper, columnsHelper, useVxeGrid } from 'vxe-table-middleware';
const testQuery = () => {
  // 模拟后台返回数据
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        listData: [
          { name: '张三', age: 18, address: '北京市' },
          { name: '李四', age: 20, address: '上海市' },
        ],
      });
    }, 2000);
  });
};
export default {
  data() {
    return { grid: null };
  },
  mounted() {
    this.initGrid();
  },
  methods: {
    initGrid() {
      const options = optionsHelper();
      // 合并公共配置，如果需要覆盖公共配置，可以在`merge`方法之后调用需要覆盖的属性的方法
      options
        .height({ minHeight: '360px' })
        .align('center', { headerAlign: 'left', footerAlign: 'right' })
        .addClassName('row', 'custom-row-class')
        .addClassName('cell', 'custom-cell-class')
        .showOverflow(false, { header: 'tooltip', footer: 'tooltip' })
        .cellConfig({ padding: false }, { header: { padding: false }, footer: { padding: false } })
        .proxyConfig({ response: { list: 'listData' } })
        .proxyHandlers({ query: () => testQuery() });

      // 列配置，详见文档描述
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').align('center').width(60).end();
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();
      // ...

      this.grid = useVxeGrid({ options, columns });
    },
  },
};
</script>
```

:::

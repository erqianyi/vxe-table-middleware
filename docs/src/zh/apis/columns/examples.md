# 案例

::: tip
调用`columnsHelper`方法，返回配置实例，可以通过链式调用方法的方式来构建`vxe-grid` 的列配置。实例大部分方法名与`vxe-grid`的列配置属性一致（封装工具时的 3.9 版本），少数调整。
:::

## 新增的

### merge 合并配置

`merge`实例方法用于合并配置（需为`columnsHelper`创建的实例）。

如，`columns-examples-merge.js`文件中定义了一些通用列配置，在以下案例中，通过`merge`方法来合并到当前实例中。

columns-examples-merge.js

<<< src/.vuepress/assets/js/columns-examples-merge.js

somePage.vue

::: demo

```vue {6,49-50}
<template>
  <vxe-grid-wrap ref="gridRef" :grid="grid" />
</template>
<script>
import { columnsHelper, useVxeGrid } from 'vxe-table-middleware';
import someCommonColumns from '@doc/assets/js/columns-examples-merge.js'; // 导入公共配置
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
    setGridData() {
      // ！！！ 如果使用useVxeGrid构造表格后立马调用grid方法时需要使用$nextTick
      this.$nextTick(() => {
        const gridApi = useVxeGrid(this.$refs.gridRef);
        gridApi.loadData([
          {
            name: '张三',
            age: 18,
            address: '北京市',
            createUser: 'admin',
            createTime: '2025-01-01',
            updateUser: 'user1',
            updateTime: '2025-01-02',
          },
          {
            name: '李四',
            age: 20,
            address: '上海市',
            createUser: 'admin',
            createTime: '2025-01-01',
            updateUser: 'user1',
            updateTime: '2025-01-02',
          },
        ]);
      });
    },
    initGrid() {
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').width(80).end();
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();
      // 合并公共列配置
      columns.merge(someCommonColumns);

      this.grid = useVxeGrid({ columns });

      this.setGridData();
    },
  },
};
</script>
```

:::

### end

::: warning
`end`实例方法用于结束每一列的配置，在链式最后调用，否则列配置会发生异常！！！。
:::

```javascript {3}
// ...
const columns = columnsHelper();
columns.field('name').title('名称').width(100).end();
// ...
```

## 调整的

1. `align`、`headerAlign`、`footerAlign`合并为`align`方法，header 和 footer 的配置作为 align 方法的第二个对象参数；
2. `showOverflow`、`showHeaderOverflow`、`showFooterOverflow`合并为`showOverflow`方法，header 和 footer 的配置作为 showOverflow 方法的第二个对象参数；
3. `className`、`headerClassName`、`footerClassName`合并为`className`方法，header 和 footer 的配置作为 className 方法的第二个对象参数；
4. `sortable`、`sortBy`、`sortType`合并为`sort`方法；
5. `filterMultiple`作为`filters`方法的第二个参数；
6. `filterRender`、`cellRender`、`editRender`、`contentRender`方法第一个参数为渲染器名称，第二个参数为配置对象；
7. `params`方法参数只允许对象类型；
8. `titlePrefix`、`titleSuffix`方法参数拦截`useHTML`配置。

::: demo

```vue
<template>
  <vxe-grid-wrap ref="gridRef" :grid="grid" />
</template>
<script>
import { optionsHelper, columnsHelper, useVxeGrid } from 'vxe-table-middleware';
export default {
  data() {
    return {
      grid: null,
      filterData: [
        { value: '1', label: '帅气' },
        { value: '2', label: '美丽' },
        { value: '3', label: '乐观' },
        { value: '4', label: '沉稳' },
      ],
    };
  },
  mounted() {
    this.initGrid();
  },
  methods: {
    setGridData() {
      // ！！！ 如果使用useVxeGrid构造表格后立马调用grid方法时需要使用$nextTick
      this.$nextTick(() => {
        const gridApi = useVxeGrid(this.$refs.gridRef);
        gridApi.loadData([
          {
            name: '张三',
            age: 18,
            address: '北京市',
            feature: '1',
            remark: '备注1',
          },
          {
            name: '李四',
            age: 20,
            address: '上海市',
            feature: '2',
            remark: '备注2',
          },
        ]);
      });
    },
    initGrid() {
      const options = optionsHelper();
      options.height('300px').editConfig({ trigger: 'click', mode: 'cell' });

      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').width(80).end();
      columns
        .field('name')
        .title('姓名')
        .align('center', { headerAlign: 'left', footerAlign: 'right' })
        .end();
      columns.field('age').title('年龄').className('age-class').sort({ sortType: 'number' }).end();
      columns
        .field('address')
        .title('地址')
        .width(100)
        .showOverflow(false, { header: 'tooltip' })
        .end();
      columns
        .field('feature')
        .title('特点')
        .formatter(({ cellValue }) => {
          return (this.filterData.find((item) => item.value === cellValue) || {}).label;
        })
        .filters(this.filterData, true)
        .end();
      columns
        .field('remark')
        .title('备注')
        .editRender('VxeInput', { props: { clearable: true } })
        .end();

      this.grid = useVxeGrid({ options, columns });
      this.setGridData();
    },
  },
};
</script>
```

:::

## 分组表头

使用`children`实例方法创建分组表头。

::: tip
`children`方法有两种使用方式:

- 一种是传入由`columnsHelper`创建的实例
- 一种是接收一个函数（函数第一个参数为子级构造器的实例，第二个参数为当前构造器的实例）
  :::

### 方式 1: 传入`columnsHelper`实例

**注：子级实例配置可以和父级再一个文件中，也可以根据实际情况在单独的 js 文件中定义再导入，以提高父级配置方法的可读性！**

::: demo

```vue {33-36,39-47}
<template>
  <vxe-grid-wrap ref="gridRef" :grid="grid" />
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
    this.createTable();
  },
  methods: {
    setGridData() {
      this.$nextTick(() => {
        const gridApi = useVxeGrid(this.$refs.gridRef);
        gridApi.loadData([
          { name: '张三', age: 18, address: '北京市', phone: '13888888888' },
          { name: '李四', age: 20, address: '上海市', phone: '13999999999' },
        ]);
      });
    },
    createTable() {
      const options = optionsHelper();
      options.border(true).height(500);

      const columns = columnsHelper();
      columns.width(80).type('checkbox').fixed('left').end();
      columns.width(100).type('seq').title('序号').end();
      // 基本信息分组 start
      const baseInfoColumn = columnsHelper();
      baseInfoColumn.field('name').title('姓名').end();
      baseInfoColumn.field('age').title('年龄').end();
      columns.title('基本信息').field('baseInfo').align('center').children(baseInfoColumn).end();
      // 基本信息分组 end
      // 详细信息分组 start
      const detailInfoColumn = columnsHelper();
      detailInfoColumn.field('address').title('地址').end();
      detailInfoColumn.field('phone').title('电话').end();
      columns
        .title('详细信息')
        .field('detailInfo')
        .align('center')
        .children(detailInfoColumn)
        .end();
      // 详细信息分组 end

      this.grid = useVxeGrid({ options, columns });

      this.setGridData();
    },
  },
};
</script>
```

:::

### 方式 2: 传入函数

::: demo

```vue {37-40,48-51}
<template>
  <vxe-grid-wrap ref="gridRef" :grid="grid" />
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
    this.createTable();
  },
  methods: {
    setGridData() {
      this.$nextTick(() => {
        const gridApi = useVxeGrid(this.$refs.gridRef);
        gridApi.loadData([
          { name: '张三', age: 18, address: '北京市', phone: '13888888888' },
          { name: '李四', age: 20, address: '上海市', phone: '13999999999' },
        ]);
      });
    },
    createTable() {
      const options = optionsHelper();
      options.border(true).height(500);

      const columns = columnsHelper();
      columns.width(80).type('checkbox').fixed('left').end();
      columns.width(100).type('seq').title('序号').end();
      // 基本信息分组 start
      columns
        .title('基本信息')
        .field('baseInfo')
        .align('center')
        .children((baseInfoColumn) => {
          baseInfoColumn.field('name').title('姓名').end();
          baseInfoColumn.field('age').title('年龄').end();
        })
        .end();
      // 基本信息分组 end
      // 详细信息分组 start
      columns
        .title('详细信息')
        .field('detailInfo')
        .align('center')
        .children((detailInfoColumn) => {
          detailInfoColumn.field('address').title('地址').end();
          detailInfoColumn.field('phone').title('电话').end();
        })
        .end();
      // 详细信息分组 end

      this.grid = useVxeGrid({ options, columns });

      this.setGridData();
    },
  },
};
</script>
```

:::

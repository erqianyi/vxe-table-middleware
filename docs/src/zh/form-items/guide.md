# 说明

::: tip
`formItemsHelper`是帮助构建表单项的工具。核心目的是实现`form-config.items`、`form-config.data`、`form-config.rules`三部分配置转化为函数编程方式，提供一定的 TS 类型提示，提高效率。
方法名基本与`form-config.items`配置属性名相同，少量的修改。
:::

## 基本使用

### 引入

```javascript
import { formItemsHelper } from 'vxe-table-middleware';
```

### 使用

1. 调用`formItemsHelper`方法，返回配置实例，可以通过链式调用方法的方式来配置`vxe-grid`的查询表单项的配置。
2. 最后将实例对象传递给 grid 构建工具`useVxeGrid`。

```javascript
// ...
const formItems = formItemsHelper();
formItems.field('name', '').title('名称').itemRender('VxeInput').end();
formItems
  .field('status', '1')
  .resetValue('1')
  .title('状态')
  .itemRender('VxeSelect', {
    props: {
      options: [
        { label: '正常', value: '1' },
        { label: '禁用', value: '0' },
      ],
    },
  })
  .end();
formItems
  .itemRender('VxeButtonGroup', {
    options: [
      { type: 'submit', content: '搜索', status: 'primary' },
      { type: 'reset', content: '重置' },
    ],
  })
  .end();
// ...
this.grid = useVxeGrid({ formItems });
```

## 合并配置场景

实例提供一个`merge`方法，可以将其他查询表单配置对象合并到当前实例，比如一些通用的查询表单配置。

以下是以复用查询表单按钮配置为例：

someFormItemsConfig.js

```javascript
import { formItemsHelper } from 'vxe-table-middleware';
const formItems = formItemsHelper();
formItems
  .itemRender('VxeButtonGroup', {
    options: [
      { type: 'submit', content: '搜索', status: 'primary' },
      { type: 'reset', content: '重置' },
    ],
  })
  .end();
export default formItems;
```

somePage.vue

```vue {33}
<template>
  <vxe-grid-wrap :grid="grid" ref="gridRef" />
</template>
<script>
import { columnsHelper, formItemsHelper, useVxeGrid } from 'vxe-table-middleware';
import someFormItemsConfig from './someFormItemsConfig.js';
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
    initGrid() {
      // 配置列
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').width(80).end();
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();

      // 配置表单
      const formItems = formItemsHelper();
      formItems.field('name', '').title('名称').itemRender('VxeInput').end();
      formItems
        .field('age', '')
        .title('年龄')
        .itemRender('VxeNumberInput', { props: { min: 0, digits: 0 } })
        .end();
      formItems.merge(someFormItemsConfig);

      this.grid = useVxeGrid({ columns, formItems });
    },
  },
};
</script>
```

## formItemsHelper 实例方法

/autodoc ../src/helpers/form-items.js

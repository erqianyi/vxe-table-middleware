# 说明

::: tip
`columnsHelper`是帮助构建列配置的工具，将`props.columns`配置转化为函数编程的方式，提供一定的 TS 类型提示，方法名称基本与`props.columns`配置属性名相同（当前 3.9 版本），少量调整。
:::

## 基本使用

### 引入

```js
import { columnsHelper } from 'vxe-table-middleware';
```

### 使用

1. 调用`columnsHelper`方法，返回配置实例，可以通过链式调用方法的方式来配置`vxe-grid` 的列配置
2. 最后将实例对象传递给 grid 构建工具`useVxeGrid`
3. **注意：每列配置完都需要最后调用`end`方法**

```js
const columns = columnsHelper();
columns.title('某一列').field('data1').width('80px').align('left', { headerAlign: 'center' }).end();
```

## 合并配置场景

实例提供一个`merge`方法，可以将其他列配置对象合并到当前实例，比如一些通用的列配置。

someCommonColumns.js

```js
import { columnsHelper } from 'vxe-table-middleware';
const columns = columnsHelper();
columns.title('创建人').field('createUser').width('80px').end();
columns.title('创建时间').field('createTime').width('120px').end();
columns.title('更新人').field('updateUser').width('80px').end();
columns.title('更新时间').field('updateTime').width('120px').end();

export default columns; // 导出列配置实例
```

somePage.vue

```vue {6,21-22}
<template>
  <vxe-grid-wrap ref="gridRef" :grid="grid" />
</template>
<script>
import { columnsHelper, useVxeGrid } from 'vxe-table-middleware';
import someCommonColumns from './someCommonColumns';
export default {
  data() {
    return { grid: null };
  },
  mounted() {
    this.initGrid();
  },
  methods: {
    initGrid() {
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left');
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();
      // 合并公共列配置
      columns.merge(someCommonColumns);

      this.grid = useVxeGrid({ columns });
    },
  },
};
</script>
```

## columnsHelper 实例方法

/autodoc ../src/helpers/columns.js

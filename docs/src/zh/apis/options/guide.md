# 说明

::: tip
`optionsHelper` 是帮助构建 `vxe-grid` props 属性配置的工具，核心是将对象配置转化为函数式编程方式，以提供一定的 TS 类型支持。大部分实例方法名与`vxe-grid` props 属性名保持一致，少数做了整合，如将 `height`、`min-height`、`max-height` 合并为 `height`方法，其他整合或拓展详见文档描述。
:::

## 基本使用

### 引入

```js
import { optionsHelper } from 'vxe-table-middleware';
```

### 使用

1. 调用`optionsHelper`方法，返回配置实例，可以通过链式调用方法的方式来配置`vxe-grid` props 属性。
2. 最后将实例对象传递给 grid 构建工具`useVxeGrid`

```js
const options = optionsHelper();
options.height('300px').border(true).align('left', { headerAlign: 'center' });
```

## 合并配置场景

实例提供一个`merge`方法，可以将多个配置对象合并到当前实例，比如一些局部场景的公共配置。

someCommonOptions.js

```js
import { optionsHelper } from 'vxe-table-middleware';

const options = optionsHelper();
options.height({ maxHeight: '500px' }).border(true).stripe(false).align('center');

export default options; // 导出实例对象
```

somePage.vue

```vue {6,17}
<template>
  <vxe-grid-wrap ref="gridRef" :grid="grid" />
</template>
<script>
import { optionsHelper, columnsHelper, useVxeGrid } from 'vxe-table-middleware';
import someCommonOptions from './someCommonOptions'; // 导入公共配置
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
      options.showFooter(true).merge(someCommonOptions); // 合并公共配置，如果需要覆盖公共配置，可以在`merge`方法之后调用需要覆盖的属性的方法

      // 列配置，详见文档描述
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left');
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

## 其他说明

如果一个表格场景基本使用全局配置，应用时只为设置表格高度等，可以考虑使用`VxeGridWrap`组件属性配置，这样会更简单。

## optionsHelper 实例方法

/autodoc ../src/helpers/options.js

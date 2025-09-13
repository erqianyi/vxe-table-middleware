# 案例

::: tip
调用`formItemsHelper`方法，返回配置实例，可以通过链式调用方法的方式来构建`vxe-grid` 中`form-config`的表单项配置。实例大部分方法名与`form-config.items`的配置属性一致，少数新增和调整，以下详细说明。
:::

## 新增的

### merge 合并配置

`merge`实例方法用于合并配置（需为`formItemsHelper`创建的实例）。

如，`form-items-examples-merge.js`文件中定义了一些通用列配置，在以下案例中，通过`merge`方法来合并到当前实例中。

form-items-examples-merge.js

<<< src/.vuepress/assets/js/form-items-examples-merge.js

somePage.vue

::: demo

```vue {6,27}
<template>
  <vxe-grid-wrap ref="gridRef" :grid="grid" />
</template>
<script>
import { columnsHelper, formItemsHelper, useVxeGrid } from 'vxe-table-middleware';
import someCommonFormItems from '@doc/assets/js/form-items-examples-merge.js'; // 导入公共配置
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
      // 配置表单
      const formItems = formItemsHelper();
      formItems.field('name', '').title('名称').itemRender('VxeInput').span(8).end();
      formItems
        .field('age', '')
        .title('年龄')
        .itemRender('VxeNumberInput', { props: { min: 0, digits: 0 } })
        .span(8)
        .end();
      formItems.merge(someCommonFormItems);
      formItems
        .itemRender('VxeButtonGroup', {
          options: [
            { type: 'submit', content: '搜索', status: 'primary' },
            { type: 'reset', content: '重置' },
          ],
        })
        .align('center')
        .span(24)
        .end();

      // 配置列
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').width(80).end();
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();
      columns.field('creator').title('创建人').end();
      columns.field('createDate').title('创建日期').end();

      this.grid = useVxeGrid({ columns, formItems });
    },
  },
};
</script>
```

:::

### rule

`rule`实例方法用于添加校验规则，参数为校验规则对象。即如果一个表单配置项有多条校验规则则需要多次调用`rule`方法配置。该方法即实现`form-config.rules`。

```javascript {7-14}
// ...
const formItems = formItemsHelper();
formItems
  .field('orderNo', '')
  .title('订单号')
  .itemRender('VxeInput')
  .rule({ required: true, message: '请输入订单号查询' })
  .rule({
    validator({ cellValue }) {
      if (cellValue && cellValue.length !== 8) {
        return new Error('订单号长度必须为 8 位');
      }
    },
  })
  .end();
// ...
```

### end

::: warning
`end`实例方法用于结束每一列的配置，在链式最后调用，否则列配置会发生异常！！！。
:::

```javascript {3}
// ...
const formItems = formItemsHelper();
formItems.field('name', '').title('名称').itemRender('VxeInput').end();
// ...
```

## 调整的

1. `field`方法，新增第二个参数，用于指定字段的初始值，即`form-config.data[fieldName]`的初始值。
2. `itemRender`方法，第一个参数为渲染器名称，第二个参数为配置对象。

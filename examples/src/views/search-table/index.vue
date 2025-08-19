<template>
  <PageCard title="分组表头">
    <vxe-grid-wrap ref="gridRef" :grid="grid" height="360" />
  </PageCard>
</template>
<script>
import { columnsHelper, formItemsHelper, useVxeGrid } from 'vxe-table-middleware';
export default {
  name: 'SearchTable',
  data() {
    return {
      grid: null,
    };
  },
  mounted() {
    this.createTable();
  },
  methods: {
    createTable() {
      // 配置列
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').width(80).end();
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();
      columns.field('email').title('邮箱').end();
      columns.field('phone').title('电话').end();
      columns.field('status').title('状态').end();
      columns.field('action').title('操作').end();
      // 配置表单
      const formItems = formItemsHelper();
      formItems.field('name', '').title('名称').itemRender('VxeInput').end();
      formItems
        .field('age', '')
        .title('年龄')
        .itemRender('VxeNumberInput', { props: { min: 0, digits: 0 } })
        .end();
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

      this.grid = useVxeGrid({ columns, formItems });
    },
  },
};
</script>
<style lang="scss" scoped></style>

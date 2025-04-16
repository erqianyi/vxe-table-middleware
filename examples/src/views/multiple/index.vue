<template>
  <PageCard title="一页多个表格">
    <div class="multiple-demo">
      <h2>表格1</h2>
      <vxe-grid-wrap ref="grid1Ref" :grid="grid1"></vxe-grid-wrap>
    </div>
    <div class="multiple-demo">
      <h2>表格2</h2>
      <vxe-grid-wrap ref="grid2Ref" :grid="grid2"></vxe-grid-wrap>
    </div>
  </PageCard>
</template>

<script>
import { optionsHelper, columnsHelper, useVxeGrid } from 'vxe-table-middleware';
export default {
  name: 'MultipleDemo',
  data() {
    return {
      grid1: null,
      grid2: null,
    };
  },
  mounted() {
    this.createTable1();
    this.createTable2();
  },
  methods: {
    createTable1() {
      const options = optionsHelper();
      options.height(200).border(true);

      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').width(80).end();
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();
      columns.field('email').title('邮箱').end();
      columns.field('phone').title('电话').end();
      columns.field('status').title('状态').end();
      columns.field('action').title('操作').end();

      this.grid1 = useVxeGrid({ options, columns });
      this.$nextTick(() => {
        const gridApi = useVxeGrid(this.$refs.grid1Ref);
        gridApi.loadData([
          {
            name: '张三',
            age: 18,
            address: '北京市海淀区',
            email: 'zhangsan@163.com',
            phone: '12345678901',
          },
        ]);
      });
    },
    createTable2() {
      const options = optionsHelper();
      options.height(400);

      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').width(80).end();
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();
      columns.field('email').title('邮箱').end();
      columns.field('phone').title('电话').end();
      columns.field('status').title('状态').end();
      columns.field('action').title('操作').end();
      this.grid2 = useVxeGrid({ options, columns });
      this.$nextTick(() => {
        const gridApi = useVxeGrid(this.$refs.grid2Ref);
        gridApi.loadData([
          {
            name: '李四',
            age: 19,
            address: '北京市朝阳区',
            email: 'lisi@163.com',
            phone: '12345678901',
          },
        ]);
      });
    },
  },
};
</script>

<style scoped>
.multiple-demo {
  margin-bottom: 20px;
}
.multiple-demo h2 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>

<template>
  <PageCard title="BaseDemo">
    <vxe-button status="primary" @click="getSelected">获取选中数据</vxe-button>
    <vxe-grid-wrap ref="gridRef" :grid="grid">
      <template #empty>
        <div class="empty-content">自定义空状态</div>
      </template>
    </vxe-grid-wrap>
  </PageCard>
</template>

<script>
import { columnsHelper, useVxeGrid } from '../../../../src/index';
export default {
  name: 'BaseDemo',
  data() {
    return {
      grid: null,
    };
  },
  mounted() {
    this.createTable();
  },
  methods: {
    getSelected() {
      const gridApi = useVxeGrid(this.$refs.gridRef);
      alert(`选择了 ${gridApi.getCheckboxRecords().length} 条数据！`);
    },
    createTable() {
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').width(80).end();
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();
      columns.field('email').title('邮箱').end();
      columns.field('phone').title('电话').end();
      columns.field('status').title('状态').end();
      columns.field('action').title('操作').end();

      this.grid = useVxeGrid({ columns });
      this.$nextTick(() => {
        const gridApi = useVxeGrid(this.$refs.gridRef);
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
  },
};
</script>

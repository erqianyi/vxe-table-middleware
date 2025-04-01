<template>
  <PageCard title="BaseDemo">
    <vxe-grid-wrap :instance="ins"></vxe-grid-wrap>
  </PageCard>
</template>

<script>
import VxeGridWrap, {
  columnsHelper,
  useVxeGrid,
} from '@2100/vxe-table-middleware';
export default {
  name: 'BaseDemo',
  components: { VxeGridWrap },
  data() {
    return {
      ins: null,
    };
  },
  mounted() {
    this.createTable();
  },
  methods: {
    createTable() {
      const columns = columnsHelper();
      columns.type('checkbox').fixed('left');
      columns.field('name').title('名称').end();
      columns.field('age').title('年龄').end();
      columns.field('address').title('地址').end();
      columns.field('email').title('邮箱').end();
      columns.field('phone').title('电话').end();
      columns.field('status').title('状态').end();
      columns.field('action').title('操作').end();

      const [instance, gridApi] = useVxeGrid({ columns });
      this.ins = instance;
      this.$nextTick(() => {
        console.log(gridApi);
      });
    },
  },
};
</script>

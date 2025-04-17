<template>
  <PageCard title="分组表头">
    <vxe-grid-wrap ref="gridRef" :grid="grid" />
  </PageCard>
</template>

<script>
import { optionsHelper, columnsHelper, useVxeGrid } from 'vxe-table-middleware';
export default {
  name: 'GroupDemo',
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
      columns
        .title('基本信息')
        .field('baseInfo')
        .align('center')
        .children(baseInfoColumn)
        .end();
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

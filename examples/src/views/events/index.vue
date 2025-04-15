<template>
  <PageCard title="EventsDemo">
    <vxe-grid-wrap ref="gridRef" :grid="grid"></vxe-grid-wrap>
  </PageCard>
</template>

<script>
import {
  optionsHelper,
  columnsHelper,
  eventsHelper,
  useVxeGrid,
} from '@2100/vxe-table-middleware';
export default {
  name: 'EventsDemo',
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
          { name: '张三', age: 18, address: '北京市' },
          { name: '李四', age: 20, address: '上海市' },
        ]);
      });
    },
    initGrid() {
      const options = optionsHelper();
      options.border(true).stripe(true).editConfig({ trigger: 'click' });

      const columns = columnsHelper();
      columns.type('checkbox').fixed('left').width(80).end();
      columns.field('name').title('名称').end();
      columns
        .field('age')
        .title('年龄')
        .editRender('VxeInput', { props: { type: 'number' } })
        .end();
      columns.field('address').title('地址').end();

      const events = eventsHelper();
      events.on('checkbox-change', ({ checked, row }) => {
        const str1 = checked ? '选中' : '取消选中';
        const str2 = `${row.name}`;
        alert(`${str1}：${str2}`);
      });

      this.grid = useVxeGrid({ options, columns, events });

      this.setGridData();
    },
  },
};
</script>

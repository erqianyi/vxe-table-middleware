<template>
  <PageCard title="常规搜索表格">
    <vxe-grid-wrap ref="gridRef" :grid="grid" />
  </PageCard>
</template>
<script>
import { useVxeGrid } from 'vxe-table-middleware';
import { options, columns, formItems } from './schema';
export default {
  name: 'RegularSearchTable',
  components: {},
  props: {},
  data() {
    return {
      grid: null,
    };
  },
  computed: {},
  mounted() {
    this.createTable();
  },
  methods: {
    createTable() {
      this.grid = useVxeGrid({ options, columns, formItems });
    },
  },
};
</script>
<style lang="scss" scoped></style>

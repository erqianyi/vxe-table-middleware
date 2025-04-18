import 'vxe-pc-ui/lib/style.css';
import 'vxe-table/lib/style.css';

export default async ({ Vue, isServer }) => {
  if (!isServer) {
    const VxeUIAll = await import('vxe-pc-ui');
    const VxeUITable = await import('vxe-table');
    const VxeGridWrap = await import('vxe-table-middleware');
    Vue.use(VxeUIAll.default);
    Vue.use(VxeUITable.default);
    Vue.use(VxeGridWrap.default);
  }
};

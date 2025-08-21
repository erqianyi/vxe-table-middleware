import 'vxe-pc-ui/lib/style.css';
import 'vxe-table/lib/style.css';

export default async ({ Vue, isServer }) => {
  if (!isServer) {
    const VxeUIAll = await import('vxe-pc-ui');
    const VxeUITable = await import('vxe-table');
    const VxeGridWrap = await import('vxe-table-middleware');
    const { helpersDecorator } = await import('vxe-table-middleware');
    // 拓展OptionsHelperIns的方法
    helpersDecorator('option', {
      // 定义原实例中不存在该方法，如：独立设置表头对齐方式
      headerAlign(align) {
        if (align) this._options['headerAlign'] = align; // 说明：_options 为实例中存放配置的对象
        return this; // 返回实例对象，用于链式调用
      },
    });

    // 拓展ColumnsHelperIns的方法
    helpersDecorator('column', {
      // 新定义一个方法名实现原实例中存在的方法，如 data 方法实现原 field 方法
      data(field) {
        // 说明：column 为实例中存放当前列配置的对象，columns 为实例中存放所有列配置项的对象
        if (field) this.column['field'] = field;
        return this; // 返回实例对象，用于链式调用
      },
    });

    // 拓展FormItemsHelperIns的方法
    helpersDecorator('formItem', {
      // 定义原实例中不存在该方法，如：通过数组方式定义rules
      rules(rules = []) {
        this._current.rules = rules; // 说明：_current.rules 为实例中存放当前表单验证规则
        return this; // 返回实例对象，用于链式调用
      },
    });

    Vue.use(VxeUIAll.default);
    Vue.use(VxeUITable.default);
    Vue.use(VxeGridWrap.default);
  }
};

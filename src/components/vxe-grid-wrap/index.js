import { FLAG_NAME, FLAG_ATTR } from '../../utils/constant';
const REF_NAME = '__GRID_CORE_REF__';

const VxeGridWrap = {
  name: 'VxeGridWrap',
  props: {
    /**
     * Grid 实例
     * @type {Object}
     */
    instance: [Object],
  },
  beforeDestroy() {
    this.instance && this.instance.$destroy();
  },
  render(h) {
    const { instance, _e } = this;
    // TODO 这里需要判断实例是否为create工具创建，考虑创建时添加特定属性
    if (instance) instance.$parent = this; // 关联父级组件
    return h(
      'div',
      {
        ref: REF_NAME,
        attrs: { [FLAG_ATTR]: FLAG_NAME },
      },
      [
        h('div', { ref: 'rootGrid' }, [
          instance ? instance.$mount(this.$refs.rootGrid) : _e(),
        ]),
      ]
    );
  },
};

export default VxeGridWrap;

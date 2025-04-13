import { FLAG_NAME, FLAG_ATTR } from '../../utils/constant';
const REF_NAME = '__GRID_CORE_REF__';
import { gridApiMaps } from '../../helpers/create';

const VxeGridWrap = {
  name: 'VxeGridWrap',
  props: {
    /**
     * useVxeGrid创建的构造函数
     * @type {Function}
     */
    grid: [Function],
  },
  beforeDestroy() {
    // 销毁时删除缓存
    if (gridApiMaps.has(this)) gridApiMaps.delete(this);
  },
  render(h) {
    const { grid, _e } = this;
    // TODO 这里需要判断grid是否为create工具创建，考虑创建时添加特定属性
    return h(
      'div',
      {
        ref: REF_NAME,
        attrs: { [FLAG_ATTR]: FLAG_NAME },
      },
      [grid ? h(grid) : _e()]
    );
  },
};

export default VxeGridWrap;

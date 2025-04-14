import { FLAG_NAME, FLAG_ATTR, FLAG_OPTIONS_ATTR } from '../../utils/constant';
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
    return h(
      'div',
      {
        ref: REF_NAME,
        attrs: { [FLAG_ATTR]: FLAG_NAME },
      },
      [grid && grid[FLAG_OPTIONS_ATTR] === FLAG_NAME ? h(grid) : _e()]
    );
  },
};

export default VxeGridWrap;

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
    /**
     * 表格的高度；支持铺满父容器或者固定高度，如果设置 auto 为铺满父容器（如果设置为 auto，则必须确保存在父节点且不允许存在相邻元素）
     * @type {(number|string)}
     */
    height: [Number, String],
    /**
     * 表格最小高度,继承 setConfig.table.minHeight
     * @type {(number|string)}
     */
    minHeight: [Number, String],
    /**
     * 表格的最大高度
     * @type {(number|string)}
     */
    maxHeight: [Number, String],
    /**
     * 表格是否显示加载中
     * @type {boolean}
     */
    loading: { type: Boolean, default: undefined },
    /**
     * 保持原始值的状态，被某些功能所依赖，比如编辑状态、还原数据等（开启后影响性能，具体取决于数据量）
     * 继承 setConfig.table.keepSource
     * @type {boolean}
     */
    keepSource: { type: Boolean, default: undefined },
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
        style: { height: '100%' },
      },
      [grid && grid[FLAG_OPTIONS_ATTR] === FLAG_NAME ? h(grid) : _e()]
    );
  },
};

export default VxeGridWrap;

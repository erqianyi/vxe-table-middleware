import WrapComponent from './components/vxe-grid-wrap';
import { helpersDecorator } from './utils/extend-helper';

export const VxeGridWrap = Object.assign({}, WrapComponent, {
  install(Vue) {
    Vue.component(WrapComponent.name, WrapComponent);
  },
});

export * from './helpers';

export { helpersDecorator };

export default VxeGridWrap;

import WrapComponent from './components/vxe-grid-wrap';

export const VxeGridWrap = Object.assign({}, WrapComponent, {
  install(Vue) {
    Vue.component(WrapComponent.name, WrapComponent);
  },
});

export * from './helpers';

export default VxeGridWrap;

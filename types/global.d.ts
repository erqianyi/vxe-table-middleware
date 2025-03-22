import Vue from 'vue';

export function install(app: typeof Vue): void;

declare class VxeGridWrapComp extends Vue {
  static install: typeof install;
}

export declare const VxeGridWrap: typeof VxeGridWrapComp;

export interface PluginObject {
  install(VxeGridWrap: typeof VxeGridWrapComp): void;
  [key: string]: any;
}

export * from './helpers/options';
export * from './helpers/columns';
export * from './helpers/events';
export * from './helpers/create';

export default VxeGridWrap;

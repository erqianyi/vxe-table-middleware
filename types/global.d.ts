import Vue from 'vue';
import type { HelpersDecoratorHandler } from './extend-helper';

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
export * from './helpers/form-items';
export * from './helpers/create';

export const helpersDecorator: HelpersDecoratorHandler;

export default VxeGridWrap;

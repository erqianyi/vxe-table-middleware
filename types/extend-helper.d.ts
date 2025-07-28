import type { OptionsHelperIns } from './helpers/options';
import type { ColumnsHelperIns } from './helpers/columns';

// #region extendHelperType
type HelperType = 'option' | 'column';
type InstanceType<T> = T extends 'option'
  ? OptionsHelperIns
  : T extends 'column'
  ? ColumnsHelperIns
  : Record<string, any>;
type ExtensionMethods<T> = {
  [key: string]: (this: InstanceType<T>, ...args: any[]) => InstanceType<T>;
};

export type HelpersDecoratorHandler = <T extends HelperType>(
  type: T,
  extension: ExtensionMethods<T>
) => void;
// #endregion extendHelperType

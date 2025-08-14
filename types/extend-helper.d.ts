import type { OptionsHelperIns } from './helpers/options';
import type { ColumnsHelperIns } from './helpers/columns';
import type { FormItemsHelperIns } from './helpers/form-items';

// #region extendHelperType
type HelperType = 'option' | 'column' | 'formItem';
type InstanceType<T> = T extends 'option'
  ? OptionsHelperIns
  : T extends 'column'
  ? ColumnsHelperIns
  : T extends 'formItem'
  ? FormItemsHelperIns
  : Record<string, any>;
type ExtensionMethods<T> = {
  [key: string]: (this: InstanceType<T>, ...args: any[]) => InstanceType<T>;
};

export type HelpersDecoratorHandler = <T extends HelperType>(
  type: T,
  extension: ExtensionMethods<T>
) => void;
// #endregion extendHelperType

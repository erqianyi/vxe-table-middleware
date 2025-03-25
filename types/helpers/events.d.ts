import type { ValueOf, VxeTableEmits } from 'vxe-table';

type NoProEmits = Exclude<ValueOf<VxeTableEmits>, 'update:data'>;
type GridExtraEmits =
  | 'page-change'
  | 'form-submit'
  | 'form-submit-invalid'
  | 'form-reset'
  | 'form-collapse'
  | 'proxy-query'
  | 'proxy-delete'
  | 'proxy-save'
  | 'toolbar-button-click'
  | 'toolbar-tool-click'
  | 'zoom';
type GridEmits = NoProEmits | GridExtraEmits;

type EventsHelperIns = {
  on(event: GridEmits, callback: Function): void;
  off(event: GridEmits): void;
};

export function eventsHelper(): EventsHelperIns;

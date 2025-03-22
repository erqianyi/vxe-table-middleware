import type { ValueOf, VxeTableEmits, VxeTableProEmits } from 'vxe-table';

type NoProEmits = Exclude<Exclude<ValueOf<VxeTableEmits>, ValueOf<VxeTableProEmits>>, 'update:data'>;
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

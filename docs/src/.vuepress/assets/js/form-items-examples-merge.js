import { formItemsHelper } from 'vxe-table-middleware';

const formItems = formItemsHelper();
formItems.field('creator', '').title('创建人').itemRender('VxeInput').span(8).end();
formItems
  .field('createDate', [])
  .title('创建日期')
  .itemRender('VxeDateRangePicker', { props: { valueType: 'array' } })
  .span(8)
  .end();

export default formItems;

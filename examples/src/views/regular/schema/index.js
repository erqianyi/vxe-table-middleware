import { optionsHelper, columnsHelper, formItemsHelper } from 'vxe-table-middleware';
import { GENDER_MAP, ROLE_MAP, STATUS_MAP } from './constants';
import { dataList as mockDataList } from './mock-data';
import { commafy, toNumber } from 'xe-utils';

function getTableMockData({ page, form }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { pageSize, currentPage } = page;
      console.log('form: ', form);
      const res = {
        result: mockDataList.slice((currentPage - 1) * pageSize, currentPage * pageSize),
        page: {
          total: mockDataList.length,
        },
      };
      resolve(res);
    }, 1000);
  });
}

// search form
const formItems = formItemsHelper();
formItems.field('name', '').title('用户名').itemRender('VxeInput').span(8).end();
formItems
  .field('gender', '')
  .title('性别')
  .itemRender('VxeSelect', { options: GENDER_MAP })
  .span(8)
  .end();
formItems
  .field('role', '')
  .title('角色')
  .itemRender('VxeSelect', { options: ROLE_MAP })
  .span(8)
  .end();
formItems
  .field('status', '')
  .title('状态')
  .itemRender('VxeSelect', { options: STATUS_MAP })
  .span(8)
  .folding(true)
  .end();
formItems
  .collapseNode(true)
  .itemRender('VxeButtonGroup', {
    options: [
      { type: 'submit', content: '搜索', status: 'primary' },
      { type: 'reset', content: '重置' },
    ],
  })
  .align('center')
  .span(24)
  .end();

// table options
const options = optionsHelper();
options
  .border(true)
  .stripe(true)
  .height(700)
  .pagerConfig()
  .proxyHandlers({ query: getTableMockData });

// table columns
const columns = columnsHelper();
columns.type('seq').width(60).end();
columns.field('name').title('用户名').width(100).end();
columns
  .field('gender')
  .title('性别')
  .width(100)
  .formatter(({ cellValue }) => GENDER_MAP.find((item) => item.value === cellValue)?.label)
  .end();
columns.field('age').title('年龄').width(100).end();
columns
  .field('role')
  .title('角色')
  .width(150)
  .formatter(({ cellValue }) => ROLE_MAP.find((item) => item.value === cellValue)?.label)
  .end();
columns
  .field('amount')
  .title('金额')
  .width(150)
  .align('right')
  .formatter(({ cellValue }) => commafy(toNumber(cellValue, { digits: 2 })))
  .end();
columns.field('address').title('地址').width(150).end();
columns
  .field('status')
  .title('状态')
  .width(100)
  .slots({
    default: ({ row, column, $grid }) => {
      const val = row[column.field];
      const item = STATUS_MAP.find((item) => item.value === val);
      const h = $grid.$createElement; // 此处场景可以借用$grid实例里的h函数，如果是在组件里使用，需要用this.$createElement
      return h('VxeTag', { props: { status: item.status, content: item.label } });
    },
  })
  .end();

export { options, columns, formItems };

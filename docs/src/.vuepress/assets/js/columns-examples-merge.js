// columns-examples-merge.js

import { columnsHelper } from 'vxe-table-middleware';

const columns = columnsHelper();
columns.title('创建人').field('createUser').width('80px').end();
columns.title('创建时间').field('createTime').width('120px').end();
columns.title('更新人').field('updateUser').width('80px').end();
columns.title('更新时间').field('updateTime').width('120px').end();

export default columns;

// options-examples-merge.js

import { optionsHelper } from 'vxe-table-middleware';

const options = optionsHelper();
options.border(true).align('left', { header: 'center' }).emptyText('这是合并配置里定义的空状态');

export default options;

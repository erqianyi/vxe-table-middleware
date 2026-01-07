const path = require('path');

module.exports = {
  base: '/vxe-table-middleware/docs/',
  title: 'VxeTableMiddleware',
  description:
    '应用vxe-table时的一个中间件，提供一个创建表格和配置的方案，让Vue2开发的项目支持一定的类型提示，提升开发体验',
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  port: 9527,
  dest: 'dist',
  locales: {
    '/zh/': {
      lang: 'zh-CN',
      title: 'vxe-table-middleware',
      description: 'VxeTable表格中间件说明文档',
    },
  },
  themeConfig: {
    logo: '/avatar.png',
    author: '2100',
    sidebarDepth: 0,
    locales: {
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        serviceWorker: {
          updatePopup: {
            message: '发现新内容可用.',
            buttonText: '刷新',
          },
        },
        nav: [
          {
            text: '介绍',
            link: '/zh/guide/about',
          },
          {
            text: '组件',
            link: '/zh/component/guide',
          },
          {
            text: 'APIs',
            link: '/zh/apis/options/guide',
          },
          {
            text: '拓展',
            link: '/zh/extend/guide',
          },
          {
            text: '更新日志',
            link: 'https://github.com/erqianyi/vxe-table-middleware/blob/master/CHANGELOG.md',
            target: '_blank',
          },
          {
            text: 'Github',
            link: 'https://github.com/erqianyi/vxe-table-middleware',
            target: '_blank',
          },
          {
            text: '其他案例',
            link: 'http://2100.wang/vxe-table-middleware/examples/',
            target: '_blank',
          },
        ],
        sidebar: {
          '/zh/guide/': ['about', 'start'],
          '/zh/component/': ['guide', 'examples'],
          '/zh/apis/': [
            {
              title: 'optionsHelper',
              collapsable: false,
              children: ['options/guide', 'options/examples'],
            },
            {
              title: 'columnsHelper',
              collapsable: false,
              children: ['columns/guide', 'columns/examples'],
            },
            {
              title: 'eventsHelper',
              collapsable: false,
              children: ['events/guide', 'events/examples'],
            },
            {
              title: 'formItemsHelper',
              collapsable: false,
              children: ['form-items/guide', 'form-items/examples'],
            },
            {
              title: 'useVxeGrid',
              collapsable: false,
              children: ['methods/guide', 'methods/examples'],
            },
          ],
          '/zh/exted/': [
            {
              title: '拓展',
              collapsable: false,
              children: ['guide'],
            },
          ],
        },
        lastUpdated: '上次更新',
        smoothScroll: true,
      },
    },
  },
  plugins: [
    [
      'demo-container-v2',
      {
        locales: [
          {
            lang: 'zh-CN',
            'demo-block': {
              'hide-text': '隐藏',
              'show-text': '显示',
              'copy-text': '复制',
              'copy-success': '复制成功',
            },
          },
          {
            lang: 'en-US',
            'demo-block': {
              'hide-text': 'Hide',
              'show-text': 'Expand',
              'copy-text': 'Copy',
              'copy-success': 'Successful',
            },
          },
        ],
      },
    ],
    ['vuepress-plugin-autodoc'],
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, '../../src/'),
        '@doc': path.resolve(__dirname, './'),
      },
    },
  },
  markdown: {
    lineNumbers: true,
  },
};

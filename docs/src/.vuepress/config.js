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
          '/zh/': [
            'about',
            'start',
            {
              title: '组件',
              collapsable: false,
              children: ['component/guide', 'component/examples'],
            },
            {
              title: 'Grid配置',
              collapsable: false,
              children: ['options/guide', 'options/examples'],
            },
            {
              title: '列配置',
              collapsable: false,
              children: ['columns/guide', 'columns/examples'],
            },
            {
              title: '事件配置',
              collapsable: false,
              children: ['events/guide', 'events/examples'],
            },
            {
              title: 'Grid方法',
              collapsable: false,
              children: ['methods/guide', 'methods/examples'],
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

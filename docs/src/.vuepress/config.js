module.exports = {
  base: '/docs-vxe-table-middleware/',
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
    locales: {
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        nav: [
          {
            text: 'Github',
            link: 'https://github.com/erqianyi/vxe-table-middleware',
            target: '_blank',
          },
        ],
        sidebar: {
          '/zh/': ['about'],
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
  ],
};

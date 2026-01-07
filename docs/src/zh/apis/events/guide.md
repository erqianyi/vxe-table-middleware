# 说明

::: tip
`eventsHelper`是帮助做事件监听的工具，也可以通过`VxeGridWrap`组件监听`vxe-grid`的事件。
:::

## 基本使用

### 引入

```js
import { eventsHelper } from 'vxe-table-middleware';
```

### 使用

1. 调用`eventsHelper`方法，返回配置实例，通过实例的`on`方法注册监听事件
2. 最后将实例对象传递给 grid 构建工具`useVxeGrid`

## eventsHelper 实例方法

/autodoc ../src/helpers/events.js

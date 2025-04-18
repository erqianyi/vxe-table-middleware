# VxeGridWrap 组件

## 介绍

`VxeGridWrap`组件简单讲就是挂载`vxe-grid`的壳子，用于配合构造工具和进行拓展。

### 提供少量属性配置 grid

本中间件传递给`vxe-grid`的属性配置均可以通过`optionsHelper`工具构建，但是在通过`setConfig`配置全局参数的配合下，一般企业级项目由于统一性的特点，大部分场景不再需要配置，所以我提取了几个会常用到的属性配置（如：height）来支持，用户可以在一些场景下不需要引入`optionsHelper`来构建，简化开发。

**注意：** 组件属性配置的权限高于`optionsHelper`工具配置，组件属性配置会覆盖`optionsHelper`工具配置。

| 属性名     | 类型             | 说明                      | 默认值 |
| ---------- | ---------------- | ------------------------- | ------ |
| height     | number \| string | 表格高度                  | -      |
| minHeight  | number \| string | 表格最小高度              | -      |
| maxHeight  | number \| string | 表格的最大高度            | -      |
| loading    | boolean          | 表格是否显示加载中        | -      |
| keepSource | boolean          | 保持原始值的状态          | -      |
| grid       | function         | useVxeGrid 创建的构造函数 | -      |

### 事件监听

组件可以监听`vxe-grid`的事件，具体事件可以查看`vxe-grid`文档。

**注意：** 虽然可以在组件模板上直接监听`vxe-grid`的事件，但是还是建议通过`eventsHelper`工具来监听事件，因为通过`eventsHelper`工具除了可以提供类型提示还可以借助中间件应对一定的破坏性更新。

### 插槽

`vxe-grid`的插槽都可以使用。

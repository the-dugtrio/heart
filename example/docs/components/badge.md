---
imports:
    import Badge from 'main/components/badge';
---

## Badge 标记

出现在按钮、图标旁的数字或状态标记。

### 基础用法

展示新消息数量。

::: demo
```jsx
<div>
    <Badge value={ 12 }>
    </Badge>
    <Badge value={ 3 }>
    </Badge>
</div>

```
:::


### Attributes

| 参数  | 说明                                                       | 类型           | 可选值 | 默认值 |
| ----- | ---------------------------------------------------------- | -------------- | ------ | ------ |
| value | 显示值                                                     | string, number | —      | —      |
| max   | 最大值，超过最大值会显示 'max+'，要求 value 是 number 类型 | number         | —      | —      |
| isDot | 小圆点                                                     | boolean        | —      | false  |

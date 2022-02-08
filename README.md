# base react + typescript + react-dnd + antd build
- 引入dva状态管理
- 引入flvjs 视频模仿
- 引入react-cropper实现图像裁剪

## 一些配置问题
- 开启装饰器```yarn add @babel/plugin-proposal-decorators customize-cra react-app-rewired``` 
- Unexpected token 相关低版本语法问题， 尝试babel解决一下```yarn add @babel/core --dev```
  + 最新转码规则```yarn add @babel/preset-env --dev```
  + react 转码规则```yarn add @babel/preset-react --dev ```

# vue3-ts

## 关键字
* [vue3](https://v3.cn.vuejs.org/)
* [vue-router@4](https://router.vuejs.org/zh/)
* [vuex@next](https://vuex.vuejs.org/zh/)
* [element-plus](https://element-plus.gitee.io/zh-CN/)
* [webpack5](https://webpack.docschina.org/)
* [typescript](https://www.tslang.cn/)
* [node](https://nodejs.org/zh-cn/)

## 运行项目
###### 开发环境运行
```shell script
yarn start
```
###### 生产环境打包
```shell script
yarn build
```

## webpack全局定义的方法
*无需引用，直接在代码中使用。可通过webpack.ProvidePlugin继续添加*

| 方法名 | 说明 |
| ---- | ---- |
| cloneDeep | 深拷贝 |
| throttle | 节流 |
| debounce | 防抖 |

## process.env下的环境变量
*可在config中配置*

| 变量名 | 说明 | 可能的值 |
| ---- | ---- | ---- |
| NODE_ENV | 区分开发环境与生产环境 | **development** 、 **production** |
| APP_NODE_ENV | 区分production下的自定义环境 | **dev** 、 **prod** 、 **sit** 、 **uat** |
| PUBLIC_PATH | 项目资源基础路径 | **/** 、 **/app/** 、 **//app.cdn.com** |
| BASE_URL | http请求目标 | **/** 、 **[https:tanghaoo.com](https:tanghaoo.com)** |

## 目录结构
```
├── .husky    [git hooks，用于在git commit成功前进行eslint检测，规范即将提交的代码风格]      
├── config    [项目配置文件]
│   ├── config.js    [项目基础配置]
│   ├── webpack.base.config.js    [webpack公共基础配置]
│   ├── webpack.dev.config.js    [webpack开发环境配置]
│   └── webpack.prod.config.js    [webpack生产环境配置]
├── node_modules
├── public
│   └── index.html
├── scripts    [项目配置脚本]
│   ├── build.js    [生产环境打包脚本]
│   ├── env.js    [处理config里的环境变量]
│   ├── start.js    [开发环境运行脚本]
│   └── utils.js    [脚本所需公共方法]
├── src    [项目源代码 快捷目录(@/)]
│   ├── api
│   ├── assets    [项目使用的公共资源]
│   │   ├── iconfont    [字体库]
│   │   ├── image    [图片 快捷目录(img/)]
│   │   └── styles    [公共样式]
│   ├── components    [公共组件]
│   ├── hooks
│   ├── pages    [非常用业务组件]
│   │   ├── access    [账号相关页]
│   │   └── error    [错误页]
│   ├── request    [http请求]
│   ├── router    [页面路由]
│   │   ├── views    [业务页面route]
│   │   ├── pages.routes.ts    [非常用业务页面route组合]
│   │   └── views.routes.ts    [业务页面route组合]
│   ├── store    [状态]
│   │   ├── modules    [不同模块状态]
│   │   └── mutation.types.ts    [mutation方法名定义]
│   ├── types    [类型定义]
│   ├── utils    [公共方法]
│   ├── views    [业务组件]
│   └── works    [webwork]
```

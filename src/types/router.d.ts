import { _RouteRecordBase, RouteMeta } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string // 页面title
    header: boolean // 是否需要Header组件
    menu: boolean // 是否需要Menu组件
    tag: boolean // 是否需要nav tag
    footer: boolean // 是否需要Footer组件
    auth: boolean // 是否需要登录
    keepAlive?: boolean // 是否需要缓存组件
    icon?: string // 主菜单iconfont类名
  }
  // interface _RouteRecordBase {
  //   meta: RouteMeta
  // }
}

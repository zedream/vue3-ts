import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'
import businessRoute from '@/router/views/business'
import customerRoute from '@/router/views/customer'
import systemRoute from '@/router/views/system'
import settledRoute from '@/router/views/settled'
import goodsRoute from '@/router/views/goods'
import orderRoute from '@/router/views/order'
import logisticsRoute from '@/router/views/logistics'
import contractRoute from '@/router/views/contract'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Layout,
    children: [
      {
        path: '/',
        meta: {
          title: '首页',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "index" */ '@/views/MyHome.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: settledRoute
  },
  ...businessRoute,
  ...customerRoute,
  ...systemRoute,
  ...goodsRoute,
  ...orderRoute,
  ...logisticsRoute,
  ...contractRoute
]

export default routes

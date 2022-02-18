import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/order',
    redirect: '/orderManage',
    name: 'Order',
    meta: {
      title: '订单管理',
      header: true,
      menu: true,
      tag: false,
      footer: false,
      auth: true,
      icon: 'icon-order-manage'
    },
    component: () => import(/* webpackChunkName: "order" */ '@/components/Layout/index.vue'),
    children: [
      {
        path: '/orderManage',
        name: 'OrderManage',
        meta: {
          title: '订单管理',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "order" */ '@/views/order/OrderManage.vue')
      },
      {
        path: '/extractManage',
        name: 'ExtractManage',
        meta: {
          title: '提油管理',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "order" */ '@/views/order/ExtractManage.vue')
      }
    ]
  }
]

export default routes

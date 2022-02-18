import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/customer',
    redirect: '/stockManage',
    name: 'Customer',
    meta: {
      title: '客户管理',
      header: true,
      menu: true,
      tag: false,
      footer: false,
      auth: true,
      icon: 'icon-customer-manage'
    },
    component: () => import(/* webpackChunkName: "customer" */ '@/components/Layout/index.vue'),
    children: [
      {
        path: '/stockManage',
        name: 'StockManage',
        meta: {
          title: '客户库存管理',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "customer" */ '@/views/customer/StockManage.vue')
      },
      {
        path: '/purchaseRecord',
        name: 'PurchaseRecord',
        meta: {
          title: '油品进出明细 采购记录',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "customer" */ '@/views/customer/PurchaseRecord.vue')
      },
      {
        path: '/carryOilRecord',
        name: 'CarryOilRecord',
        meta: {
          title: '油品进出明细 提油记录',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "customer" */ '@/views/customer/CarryOilRecord.vue')
      }
    ]
  }
]

export default routes

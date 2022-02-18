import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/logistics',
    redirect: '/logisticsManage',
    name: 'Logistics',
    meta: {
      title: '物流管理',
      header: true,
      menu: true,
      tag: false,
      footer: false,
      auth: true,
      icon: 'icon-logistics-manage'
    },
    component: () => import(/* webpackChunkName: "logistics" */ '@/components/Layout/index.vue'),
    children: [
      {
        path: '/logisticsManage',
        name: 'LogisticsManage',
        meta: {
          title: '物流订单管理',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "logistics" */ '@/views/logistics/LogisticsManage.vue')
      },
      {
        path: '/logisticsManage/:orderId',
        name: 'LogisticsDetail',
        meta: {
          title: '',
          header: true,
          menu: true,
          tag: false,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "logistics" */ '@/views/logistics/LogisticsDetail.vue')
      }
    ]
  }
]

export default routes

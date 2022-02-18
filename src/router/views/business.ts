import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/business',
    redirect: '/businessInfo',
    name: 'Business',
    meta: {
      title: '商家信息',
      header: true,
      menu: true,
      tag: false,
      footer: false,
      auth: true,
      icon: 'icon-business-info'
    },
    component: () => import(/* webpackChunkName: "business" */ '@/components/Layout/index.vue'),
    children: [
      {
        path: '/businessInfo',
        name: 'BusinessInfo',
        meta: {
          title: '商家信息',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "business" */ '@/views/business/BusinessInfo.vue')
      },
      {
        path: '/withdrawalRecord',
        name: 'WithdrawalRecord',
        meta: {
          title: '账户提现记录',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "business" */ '@/views/business/WithdrawalRecord.vue')
      },
      {
        path: '/incomeRecord',
        name: 'IncomeRecord',
        meta: {
          title: '收入明细记录',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "business" */ '@/views/business/IncomeRecord.vue')
      }
    ]
  }
]

export default routes

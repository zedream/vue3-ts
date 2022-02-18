import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: 'settled',
    redirect: '/settled/signup',
    name: 'Settled',
    meta: {
      title: '商家入驻',
      header: true,
      menu: false,
      tag: false,
      footer: false,
      auth: true
    },
    component: () => import(/* webpackChunkName: "settled" */ '@/views/settled/index.vue'),
    children: [
      {
        path: 'signUp',
        name: 'SignUp',
        component: () => import(/* webpackChunkName: "settled" */ '@/views/settled/SignUp.vue')
      },
      {
        path: 'realAuth',
        name: 'RealAuth',
        component: () => import(/* webpackChunkName: "settled" */ '@/views/settled/RealAuth.vue')
      },
      {
        path: 'platformAudit',
        name: 'PlatformAudit',
        component: () => import(/* webpackChunkName: "settled" */ '@/views/settled/PlatformAudit.vue')
      },
      {
        path: 'onlineSign',
        name: 'OnlineSign',
        component: () => import(/* webpackChunkName: "settled" */ '@/views/settled/OnlineSign.vue')
      },
      {
        path: 'settledDone',
        name: 'SettledDone',
        component: () => import(/* webpackChunkName: "settled" */ '@/views/settled/SettledDone.vue')
      }
    ]
  }
]

export default routes

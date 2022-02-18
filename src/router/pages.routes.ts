import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'
import Storage from '@/utils/storage'
import { StorageTypes } from '@/types/storage'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Access',
    component: Layout,
    children: [
      {
        path: 'login',
        meta: {
          title: '登录',
          header: true,
          menu: false,
          tag: false,
          footer: false,
          auth: false,
          keepAlive: false
        },
        beforeEnter: (to, from, next) => {
          if (Storage.Local.get(StorageTypes.APP_STORE_TOKEN_LOCAL)) {
            next('/')
          } else {
            next()
          }
        },
        component: () => import(/* webpackChunkName: "access" */ '@/pages/access/TheLogin.vue')
      },
      {
        path: 'security',
        meta: {
          title: '修改密码',
          header: true,
          menu: false,
          tag: false,
          footer: false,
          auth: true,
          keepAlive: false
        },
        component: () => import(/* webpackChunkName: "access" */ '@/pages/access/TheSecurity.vue')
      }
    ]
  },
  {
    path: '/lock',
    name: 'Lock',
    meta: {
      title: '屏幕锁定',
      header: false,
      menu: false,
      tag: false,
      footer: false,
      auth: true
    },
    beforeEnter: (to, from, next) => {
      if (+Storage.Local.get(StorageTypes.APP_STORE_COMMON_LOCK) !== 1) {
        next(from.path)
      } else {
        next()
      }
    },
    component: () => import(/* webpackChunkName: "lock" */ '@/pages/lock/index.vue')
  },
  {
    path: '/401',
    name: 'NotAuthorized',
    meta: {
      title: 'Unauthorized',
      header: false,
      menu: false,
      tag: false,
      footer: false,
      auth: false
    },
    component: () => import(/* webpackChunkName: "error" */ '@/pages/error/NotAuthorized.vue')
  },
  {
    path: '/403',
    name: 'NotAccess',
    meta: {
      title: 'Forbidden',
      header: false,
      menu: false,
      tag: false,
      footer: false,
      auth: false
    },
    component: () => import(/* webpackChunkName: "error" */ '@/pages/error/NotAccess.vue')
  },
  {
    path: '/500',
    name: 'ServerError',
    meta: {
      title: 'Server Error',
      header: false,
      menu: false,
      tag: false,
      footer: false,
      auth: false
    },
    component: () => import(/* webpackChunkName: "error" */ '@/pages/error/ServerError.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    // path: '/:catchAll*',
    name: 'NotFound',
    meta: {
      title: 'Not Found',
      header: false,
      menu: false,
      tag: false,
      footer: false,
      auth: false
    },
    component: () => import(/* webpackChunkName: "error" */ '@/pages/error/NotFound.vue')
  }
]

export default routes

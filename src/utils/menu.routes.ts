import businessRoute from '@/router/views/business'
import customerRoute from '@/router/views/customer'
import systemRoute from '@/router/views/system'
import goodsRoute from '@/router/views/goods'
import orderRoute from '@/router/views/order'
import logisticsRoute from '@/router/views/logistics'
import contractRoute from '@/router/views/contract'

interface Menu {
  title: string
  path: string
  name?: string
  children?: Menu
}

const routes = [
  ...businessRoute,
  ...customerRoute,
  ...orderRoute,
  ...goodsRoute,
  ...logisticsRoute,
  ...contractRoute,
  ...systemRoute
]

// const menu: Array<Menu> = []
//
// function loopRoutes(routes) {
//   routes.forEach(route => {
//     const r = {
//       title: route.meta.title,
//       path: route.path,
//       name: route.name || '',
//       children: route.children || []
//     }
//     menu.push(r)
//     if (route.children) {
//       return loopRoutes(route.children)
//     }
//     return menu
//   })
// }
//
// loopRoutes(routes)

export default routes

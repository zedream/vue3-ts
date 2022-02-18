import request from '@/request'
/**
 * 获取商品列表
 */
export const GetGoods = data => new Promise<PageData<GoodsListData>[]>((resolve, reject) => {
  request.post('/mall/oilResource/getOilResourceList', data).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取商品详情
 */
export const GetGoodsDetail = data => new Promise<GoodsDetailData>((resolve, reject) => {
  request.get('/mall/oilResource/getOilResourceInfo', data).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 商品新增
 */
export const GoodsAdd = data => new Promise<void>((resolve, reject) => {
  request.post('/mall/oilResource/addOilResource', data).then((res) => {
    resolve()
  }).catch(error => {
    reject(error)
  })
})
/**
 * 商品编辑
 */
export const GoodEdit = data => new Promise((resolve, reject) => {
  request.post('/mall/oilResource/updateOilResource', data).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})

import request from '@/request'
/**
 * 获取商家详情
 */
export const GetSellerDetail = data => new Promise<SellerDetailData>((resolve, reject) => {
  request.get('/mall/seller/detail', data).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 判断商家全称是否存在
 */
export const IsSellerExist = data => new Promise<void>((resolve, reject) => {
  request.get('/mall/seller/exist', data).then((res) => {
    if (res.data) {
      reject(res.data)
    } else {
      resolve()
    }
  })
})
/**
 * 获取银行列表
 */
export const GetAllBanks = data => new Promise<BankListData[]>((resolve) => {
  request.get(`/mall/dict/data/type/${data}`, data).then((res) => {
    resolve(res.data)
  })
})
/**
 * 商家入驻表单（实名认证表单提交）
 */
export const SellerJoin = data => new Promise<void>((resolve, reject) => {
  request.post('/mall/seller/enter', data).then(res => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})

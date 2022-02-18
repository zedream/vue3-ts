import request from '@/request'
/**
 * 获取物流订单列表
 */
export const GetLogistics = data => new Promise<PageData<LogisticsListData>[]>((resolve, reject) => {
  request.get('/mall/logisticOrder/listByPage', data).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取物流订单详情
 */
export const GetLogisticsDetail = data => new Promise<LogisticsDetailData>((resolve, reject) => {
  request.get(`/mall/logisticOrder/getDetail/${data}`).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 物流派单
 */
export const LogisticsDispatch = data => new Promise<void>((resolve, reject) => {
  request.post('/mall/logisticOrder/dispatch', data).then((res) => {
    resolve()
  }).catch(error => {
    reject(error)
  })
})
/**
 * 物流派单详情
 */
export const LogisticsDispatchDetail = data => new Promise<LogisticsDispatchDetailData>((resolve, reject) => {
  request.get(`/mall/logisticOrder/getDeliveryDetail/${data}`).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 物流公司列表
 */
export const GetLogisticsCorps = () => new Promise<LogisticsCorpsData[]>((resolve, reject) => {
  request.get('/mall/logisticOrder/getLogisticUserList').then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 物流公司车辆列表
 */
export const GetLogisticsCorpsVehicles = data => new Promise<LogisticsCorpsVehiclesData[]>((resolve, reject) => {
  request.get(`/mall/logisticOrder/getLogisticVehicleList/${data}`).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})

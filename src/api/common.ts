import request from '@/request'
/**
 * 获取行政区域列表
 */
export const GetRegions = data => new Promise<RegionListData[]>((resolve) => {
  request.get('/mall/common/region', data).then((res) => {
    resolve(res.data)
  })
})
/**
 * 获取油品规格列表
 */
export const GetOilModels = data => new Promise<OilModelData[]>((resolve) => {
  request.get('/mall/property/oilmodel', data).then((res) => {
    resolve(res.data)
  })
})
/**
 * 获取油库列表
 */
export const GetOilDepotByCity = data => new Promise<OilDepotData[]>((resolve) => {
  request.get(`/mall/property/depot/${data}`).then((res) => {
    resolve(res.data)
  })
})

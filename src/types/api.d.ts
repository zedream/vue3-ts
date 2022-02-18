/**
 * 验证码登录
 */
interface VerifyCodeLoginData {
  mobile: string
  token: string
  username: string | number
  userId: string
  id: string | number | null
  sellerId: string | number | null
}
/**
 * 密码登录
 */
interface PasswordLoginData {
  mobile: string
  token: string
  username: string | number
  userId: string
  id: string | number | null
  sellerId: string | number | null
}

interface GetSliderData {
  positionX: number
  positionY: number
  shadeImage: string
  sliderImg: string
}

interface QualificationImage {
  createTime?: string
  id?: number
  path: string
  remark: string
  sellerId?: string
  updateTime?: string
}
/**
 * 商家详情
 */
interface SellerDetailData {
  bankAccount: string | number // 88888888
  bankCode: string // CCB
  branchBank: string // 深圳支行
  businessAddress: string // 长富金茂大厦
  city: string | number // 440300
  connectMobile: string | number // 18784001991
  connectPerson: string // 艾瑞莉娅
  corpName: string // 艾欧尼亚
  corpType: number // 3
  depositBank: string // 中国建设银行
  district: string | number // 440304
  email: string
  idCard: string // 510723200001263916
  name: string // 艾瑞莉娅
  paymentProgress: string | string[] | null
  paymentAuditStatus: string
  province: string | number // 440000
  qualificationDTOList: QualificationImage[]
  registerAddress: string
  sellerId: string
  status: number // 0 1 2
  uniformCreditCode: string // 111111118888888888
  createTime?: string
  self?: string
  merchantNo?: string
  id?: number | string
  updateTime?: string
  userId?: string
}
/**
 * 银行列表
 */
interface BankListData {
  dictLabel: string
  dictSort: number
  dictType: string
  dictValue: string
}
/**
 * 行政区域列表
 */
interface RegionListData {
  firstChar: string | number | null
  id: number
  idPath: string
  level: string
  name: string
  namePath: string
  pid: number
}
/**
 * 角色列表
 */
interface RoleListData {
  id: number
  name: string
  remark: string
}

interface PageData<T> {
  current: number
  hitCount: boolean
  pages: number
  records: T[]
  searchCount: boolean
  size: boolean
}
/**
 * 员工列表
 */
interface EmployeeListData {
  accountName: string
  id: number
  mobile: string
  password: string
  registerTime: string
  roles: RoleListData[] | null
  sellerId: string
  status: number
  userId: string
  rolesName?: string
}
/**
 * 商品列表
 */
interface GoodsListData {
  code: string
  downPayRatio: number
  goodsType: number
  id: number
  marketPrice: number
  maxQuantity: number
  minQuantity: number
  name: string
  oilDepotCityCode: number
  oilDepotCityName: string
  oilDepotCode: string
  oilDetail: string
  oilModel: string
  oilType: number
  promotionType: number
  salePrice: number
  self: number
  sellerId: string
  sellerName: string
  status: number
  supportLockPrice: number
  totalQuantity: number
  unit: string
  unitName?: string
  supportLockPriceName?: string
  statusName?: string
  promotionTypeName?: string
  oilTypeName?: string
}
/**
 * 商品详情
 */
interface GoodsDetailData {
  code?: string
  downPayRatio?: number
  goodsType?: number
  id?: number
  marketPrice?: number
  maxQuantity?: number
  minQuantity?: number
  name: string
  oilDepotCityCode?: number | string
  oilDepotCityName?: string
  oilDepotCode: string
  oilDepotName?: string
  oilDetail: string
  oilModel: string
  oilType?: number
  oilTypeName?: string
  promotionType?: number
  salePrice?: number
  self?: number
  sellerId?: string
  sellerName?: string
  status: number
  supportLockPrice: number
  totalQuantity?: number
  unit: string
  oilDepotAddress?: string
  latitude?: string
  longitude?: string
}
/**
 * 油品规格
 */
interface OilModelData {
  oilModel: string
  oilType: number
}

interface OilDepotData {
  city: number
  cityName: string
  company: string
  district: number
  dockingPerson: string
  dockingPhone: string
  id: number
  latitude: string
  longitude: string
  oilDepotAddress: string
  oilDepotCode: string
  oilDepotName: string
  province: number
  status: number
}
/**
 * 物流订单列表
 */
interface LogisticsListData {
  customerName: string | null
  deliveryAddress: string
  deliveryInfo: string
  deliveryTypeName: string | null
  depotName: string
  logisticCompanyName: string
  oilModel: string
  orderId: string
  orderTime: string
  pickupTime: string
  status: number
}
interface LogisticOrderDelivery {
  deliveryAddress: string
  deliveryCity: number
  deliveryCityName: string
  deliveryCount: null
  deliveryDistrict: number
  deliveryLatitude: string
  deliveryLongitude: string
  deliveryProvince: number
  deliveryReceiver: string
  deliveryReceiverPhone: string
  depotAddress: string
  depotCity: number
  depotCityName: string
  depotCode: string
  depotDistrict: number
  depotDockingPerson: string
  depotDockingPhone: string
  depotLatitude: string
  depotLongitude: string
  depotName: string
  depotProvince: number
  logisticOrderId: string
}
interface LogisticOrderFlows {
  contactName: string
  contactPhone: string
  createTime: string
  flowNode: string
  flowRemark: string
  logisticOrderId: string
  status: number
}
interface LogisticOrderItems {
  logisticOrderId: string
  oilModel: string
  oilType: number
  pickupCount: number
  unit: string
  oilName?: string
  cost?: number
}
/**
 * 物流订单详情
 */
interface LogisticsDetailData {
  customerName: string | null
  deliveryAddress: string
  deliveryType: null
  deliveryTypeName: null
  depotName: string
  logisticCompanyName: string
  logisticFee: number
  logisticOrderDelivery: LogisticOrderDelivery
  logisticOrderFlows: LogisticOrderFlows[]
  logisticOrderItems: LogisticOrderItems[]
  logisticPickupTime: string
  orderId: string
  orderTime: string
  pickupOrderId: string
  pickupTime: string
  plateNumber: string
  status: number
  userNo: string
}
/**
 * 物流派单详情
 */
interface LogisticsDispatchDetailData {
  customerName: string | null
  deliveryAddress: string
  logisticCompanyName: string
  logisticDriver: string | null
  logisticMobile: string | null
  logisticUserNo: string
  logisticVehicleId: null
  oilModel: string
  pickupCount: number
  plateNumber: string

}
/**
 * 物流企业列表
 */
interface LogisticsCorpsData {
  companyName: string
  userNo: string
}
/**
 * 物流企业车辆列表
 */
interface LogisticsCorpsVehiclesData {
  id: number
  plateNumber: string
  tonnage: number
  userNo: string
}

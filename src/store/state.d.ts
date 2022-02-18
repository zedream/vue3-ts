interface ModuleStateCommon {
  cityList: RegionListData[]
  oilModel: OilModelData[]
  logisticsCorps: LogisticsCorpsData[]
  showTagsScrollBtn: boolean
  lock: string | number
  lockPwd: string
  lockMsg: string
}

type Tag = {
  path: string
  title: string
}
interface ModuleStateMenuTag {
  tags: Tag[]
}

interface ModuleStateSettled {
  state: string | number
  paymentAuditStatus: string
}

interface ModuleStateUser {
  account: string
  corps: string
  token: string
  uid: string
  sellerId: string
}

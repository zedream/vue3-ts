import { ArrayToMap } from '@/utils/utils'

export enum LoginMethod {
  Password,
  VerifyCode
}
/**
 * 公司类型
 */
export const CorpType = ArrayToMap([
  {
    label: '有限责任公司',
    value: 1
  },
  {
    label: '股份有限公司',
    value: 2
  },
  {
    label: '国营独资公司',
    value: 3
  },
  {
    label: '外资公司(欧美)',
    value: 4
  },
  {
    label: '外资公司(非欧美)',
    value: 5
  },
  {
    label: '民营独资公司',
    value: 6
  },
  {
    label: '合资公司',
    value: 7
  },
  {
    label: '其他',
    value: 8
  }
])
/**
 * 油品类型
 */
export const OilType = ArrayToMap([
  {
    value: 1,
    label: '汽油'
  },
  {
    value: 2,
    label: '柴油'
  },
  {
    value: 3,
    label: '润滑油'
  },
  {
    value: 4,
    label: '燃料油'
  },
  {
    value: 5,
    label: '沥青'
  }
])
/**
 * 上架状态（商品管理）
 */
export const ShelfState = ArrayToMap([
  // {
  //   value: 'all',
  //   label: '全部'
  // },
  {
    value: 1,
    label: '上架'
  },
  {
    value: 0,
    label: '下架'
  }
])
/**
 * 是否
 */
export const Bool = ArrayToMap([
  {
    value: 1,
    label: '是'
  },
  {
    value: 0,
    label: '否'
  }
])
/**
 * 是否
 */
export const EmployeeState = ArrayToMap([
  {
    value: 1,
    label: '正常'
  },
  {
    value: 2,
    label: '已锁定'
  },
  {
    value: 3,
    label: '已禁用'
  },
  {
    value: 4,
    label: '已删除'
  }
])
/**
 * 商品销售类型
 */
export const SaleType = ArrayToMap([
  {
    value: 1,
    label: '正常'
  },
  {
    value: 3,
    label: '促销'
  }
])
export const SelfSaleType = ArrayToMap([
  {
    value: 1,
    label: '正常'
  },
  {
    value: 2,
    label: '次日达'
  },
  {
    value: 3,
    label: '促销'
  }
])
/**
 * 商品库存类型
 */
export const StockType = ArrayToMap([
  {
    value: 1,
    label: '囤油'
  },
  {
    value: 2,
    label: '背靠背'
  }
])
/**
 * 订单状态
 */
export const OrderState = ArrayToMap([
  {
    value: 'wait_for_effective',
    label: '待生效'
  },
  {
    value: 'wait_for_comfirm',
    label: '待确认'
  },
  {
    value: 'buyed',
    label: '已购买'
  },
  {
    value: 'finished',
    label: '已完成'
  },
  {
    value: 'canceled',
    label: '已取消'
  },
  {
    value: 'rejected',
    label: '已拒绝'
  },
  {
    value: 'expired',
    label: '已失效'
  }
])
/**
 * 物流订单状态
 */
export const LogisticsStatus = ArrayToMap([
  {
    label: '待接单',
    value: 1
  },
  {
    label: '待提油',
    value: 2
  },
  {
    label: '配送中',
    value: 3
  },
  {
    label: '待确收',
    value: 4
  },
  {
    label: '已完成',
    value: 5
  },
  {
    label: '已取消',
    value: 99
  },
  {
    label: '已接单',
    value: 100
  }
])

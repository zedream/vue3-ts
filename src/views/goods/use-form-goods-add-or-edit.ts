import { reactive, watch } from 'vue'
import { useStore } from '@/store'

export const useFormGoodsAddOrEdit = () => {
  const store = useStore()

  const form = reactive<GoodsDetailData>({
    name: '',
    oilDepotCode: '',
    oilDetail: '',
    oilModel: '',
    oilTypeName: '',
    status: 1,
    supportLockPrice: 1,
    unit: 't',
    sellerId: store.state.user.sellerId,
    sellerName: store.state.user.corps
  })

  watch([() => form.oilTypeName, () => form.oilModel], (value) => {
    form.name = value[0] + value[1]
  })

  const rules = reactive({
    name: [
      {
        required: true,
        message: '请输入油品名称',
        trigger: 'blur'
      }
    ],
    oilType: [
      {
        required: true,
        message: '请选择油品类型',
        trigger: 'change'
      }
    ],
    oilModel: [
      {
        required: true,
        message: '请选择油品类型',
        trigger: 'change'
      }
    ],
    oilDepotCityCode: [
      {
        required: true,
        message: '请选择油库区域',
        trigger: 'change'
      }
    ],
    oilDepotCode: [
      {
        required: true,
        message: '请选择油库名称',
        trigger: 'change'
      }
    ],
    oilDepotCityName: [
      {
        required: true,
        message: '请输入油库地址',
        trigger: 'blur'
      }
    ],
    unit: [
      {
        required: true,
        message: '请选择销售单位',
        trigger: 'change'
      }
    ],
    supportLockPrice: [
      {
        required: true,
        message: '请选择是否支持锁价',
        trigger: 'change'
      }
    ],
    promotionType: [
      {
        required: true,
        message: '请选择商品类型',
        trigger: 'change'
      }
    ],
    minQuantity: [
      {
        required: true,
        message: '请输入最小购买量',
        trigger: 'blur'
      }
    ],
    maxQuantity: [
      {
        required: true,
        message: '请输入最大购买量',
        trigger: 'blur'
      }
    ],
    totalQuantity: [
      {
        required: true,
        message: '请输入总库存数量',
        trigger: 'blur'
      }
    ],
    marketPrice: [
      {
        required: true,
        message: '请输入市场价格',
        trigger: 'blur'
      }
    ],
    salePrice: [
      {
        required: true,
        message: '请输入销售价格',
        trigger: 'blur'
      }
    ],
    downPayRatio: [
      {
        required: true,
        message: '请输入销售付款比例',
        trigger: 'blur'
      }
    ],
    goodsType: [
      {
        required: true,
        message: '请选择库存类型',
        trigger: 'change'
      }
    ],
    status: [
      {
        required: true,
        message: '请选择上架类型',
        trigger: 'change'
      }
    ]
  })

  return {
    form,
    rules
  }
}

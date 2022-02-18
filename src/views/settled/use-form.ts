import { reactive, ref } from 'vue'
import { useStore } from '@/store'
import { GetSellerDetail } from '@/api/settled'
import { GetRegions } from '@/api/common'
import Storage from '@/utils/storage'
import { StorageTypes } from '@/types/storage'

export const useForm = () => {
  const store = useStore()

  const form = reactive({
    bankAccount: '',
    bankCode: '',
    branchBank: '',
    businessAddress: '',
    city: '',
    connectMobile: '',
    connectPerson: '',
    corpName: '',
    corpType: '',
    depositBank: '',
    district: '',
    email: '',
    idCard: '',
    name: '',
    paymentAuditStatus: '',
    province: '',
    qualificationDTOList: [],
    registerAddress: '',
    sellerId: '',
    uniformCreditCode: '',
    status: '',
    userId: store.state.user.uid
  })

  const qualification = reactive({
    businessLicense: '',
    idCardFront: '',
    idCardBack: '',
    certificateLicense: '',
    openAccountLicense: '',
    otherLicense: [] as QualificationImage[]
  })

  const provinceList = ref<RegionListData[]>([])
  const cityList = ref<RegionListData[]>([])
  const districtList = ref<RegionListData[]>([])

  const rules = reactive({
    corpType: [
      {
        required: true,
        message: '请选择企业类型',
        trigger: 'change'
      }
    ],
    uniformCreditCode: [
      {
        required: true,
        message: '请输入统一信用代码',
        trigger: 'blur'
      }
    ],
    connectPerson: [
      {
        required: true,
        message: '请输入联系人',
        trigger: 'blur'
      }
    ],
    connectMobile: [
      {
        required: true,
        message: '请输入联系电话',
        trigger: 'blur'
      }
    ],
    name: [
      {
        required: true,
        message: '请输入法人姓名',
        trigger: 'blur'
      }
    ],
    idCard: [
      {
        required: true,
        message: '请输入身份证号',
        trigger: 'blur'
      }
    ],
    bankCode: [
      {
        required: true,
        message: '请选择开户银行',
        trigger: 'change'
      }
    ],
    branchBank: [
      {
        required: true,
        message: '请输入开户行支行',
        trigger: 'blur'
      }
    ],
    bankAccount: [
      {
        required: true,
        message: '请输入银行账号',
        trigger: 'blur'
      }
    ],
    mobile: [
      {
        required: true,
        message: '请输入手机号',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }
    ]
  })

  const getRegions = (level: number, pid: number | string) => {
    return new Promise<RegionListData[]>((resolve, reject) => {
      GetRegions({
        level,
        pid
      }).then(data => {
        resolve(data)
      })
    })
  }

  if (store.state.user.sellerId) {
    GetSellerDetail({
      sellerId: store.state.user.sellerId
    }).then(data => {
      Object.assign(form, data)
      const corpName = Storage.Session.get(StorageTypes.APP_TEMP_SETTLED_CORP_SESSION)
      corpName && (form.corpName = corpName)
      getRegions(1, 0).then(data => {
        provinceList.value = data
      })
      if (data.province) {
        getRegions(2, data.province).then(data => {
          cityList.value = data
        })
      }
      if (data.city) {
        getRegions(3, data.city).then(data => {
          districtList.value = data
        })
      }
      data.qualificationDTOList.forEach(item => {
        if (item.remark !== 'otherLicense') {
          qualification[item.remark] = item.path
        }
      })
      qualification.otherLicense = data.qualificationDTOList.filter((_) => _.remark === 'otherLicense')
    })
  } else {
    getRegions(1, 0).then(data => {
      provinceList.value = data
    })
  }

  return {
    form,
    qualification,
    rules,
    provinceList,
    cityList,
    districtList
  }
}

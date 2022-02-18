<template>
  <el-dialog
    v-model="layerVisible"
    width="500px"
    center
    custom-class="my-dialog"
    :before-close="close">
    <template #title>
      <common-title class="dialog-title">
        物流派单
      </common-title>
    </template>
    <template #default>
      <el-form
        ref="ruleFormRef"
        label-width="120px"
        label-position="left"
        class="layer-form"
        :model="state"
        :rules="rules">
        <el-form-item prop="customerName" label="客户名称：">
          <div>{{ state.customerName }}</div>
        </el-form-item>
        <el-form-item prop="oilModel" label="油品规格：">
          <div>{{ state.oilModel }}</div>
        </el-form-item>
        <el-form-item prop="pickupCount" label="油品数量：">
          <div>{{ state.pickupCount }}</div>
        </el-form-item>
        <el-form-item prop="deliveryAddress" label="配送地点：">
          <div>{{ state.deliveryAddress }}</div>
        </el-form-item>
        <el-form-item prop="logisticCompanyName" label="物流企业：">
          <el-select v-model="state.logisticCompanyName" placeholder="请选择物流企业" clearable>
            <el-option
              v-for="item in logisticsCorps"
              :key="item.companyName"
              :label="item.companyName"
              :value="item.companyName" />
          </el-select>
        </el-form-item>
        <el-form-item prop="logisticDriver" label="配送司机：">
          <el-input
            v-model="state.logisticDriver"
            placeholder="请输入配送司机"
            clearable />
        </el-form-item>
        <el-form-item prop="plateNumber" label="配送车牌：">
          <el-select v-model="state.plateNumber" placeholder="请选择配送车牌" clearable>
            <el-option
              v-for="item in vehicles"
              :key="item.plateNumber"
              :label="item.plateNumber"
              :value="item.plateNumber" />
          </el-select>
        </el-form-item>
        <el-form-item prop="logisticMobile" label="司机联系电话：">
          <el-input
            v-model="state.logisticMobile"
            placeholder="请输入司机联系电话"
            clearable />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button plain @click="close">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        提交
      </el-button>
      <div class="footer-tip">
        （请如实填写，提油时，油库人员会核实信息）
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLayer } from '@/hooks/use-layer'
import { useStore } from '@/store'
import { CommonType } from '@/store/mutation.types'
import { GetLogisticsCorps, GetLogisticsCorpsVehicles, LogisticsDispatchDetail, LogisticsDispatch } from '@/api/logistics'
export default defineComponent({
  props: {
    modelValue: {
      require: true,
      type: Boolean,
      default: false
    },
    detailId: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const store = useStore()

    const logisticsCorps = ref<LogisticsCorpsData[]>([])
    const vehicles = ref<LogisticsCorpsVehiclesData[]>([])
    const state = reactive({
      customerName: '',
      oilModel: '',
      pickupCount: '',
      deliveryAddress: '',
      logisticCompanyName: '',
      logisticDriver: '',
      plateNumber: '',
      logisticMobile: '',
      orderId: '',
      sellerId: store.state.user.sellerId
    })
    const rules = reactive({
      logisticCompanyName: [
        {
          required: true,
          message: '请选择物流企业',
          trigger: 'change'
        }
      ],
      logisticDriver: [
        {
          required: true,
          message: '请输入配送司机',
          trigger: 'blur'
        }
      ],
      plateNumber: [
        {
          required: true,
          message: '请选择配送车牌',
          trigger: 'change'
        }
      ],
      logisticMobile: [
        {
          required: true,
          message: '请输入司机联系电话',
          trigger: 'blur'
        }
      ]
    })
    const layer = useLayer(props, emit, state, LogisticsDispatchDetail)

    watch(() => state.logisticCompanyName, (value) => {
      if (value) {
        GetLogisticsCorpsVehicles(value).then(data => {
          vehicles.value = data
        })
      } else {
        vehicles.value = []
      }
    })

    const handleSubmit = () => {
      state.orderId = props.detailId
      LogisticsDispatch(state).then(() => {
        ElMessage.success('派单成功')
        layer.close()
      }).catch(error => {
        ElMessage.error(`派单失败: ${error}`)
      })
    }

    if (store.state.common.logisticsCorps.length) {
      logisticsCorps.value = store.state.common.logisticsCorps
    } else {
      GetLogisticsCorps().then(data => {
        logisticsCorps.value = data
        store.commit(`common/${CommonType.SET_LOGISTIC_CORPS}`, data)
      })
    }

    return {
      ...layer,
      state,
      rules,
      logisticsCorps,
      vehicles,
      handleSubmit
    }
  }
})
</script>

<style lang="scss">
.layer-form {
  .el-select {
    width: 100%;
  }
}
.footer-tip {
  font-size: 14px;
  color: #999999;
  line-height: 20px;
  margin-top: 20px;
}
</style>

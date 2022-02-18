<template>
  <div class="view-container">
    <common-title class="view-title" back>
      物流订单详情
    </common-title>
    <div class="status-icon" :class="[`status-${detailData.status}`]" />
    <el-form
      ref="ruleFormRef"
      label-width="90px"
      label-position="left"
      class="form"
      :model="detailData">
      <el-row>
        <el-col :span="10">
          <el-form-item prop="orderId" label="物流单号：">
            <div>{{ detailData.orderId }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item prop="deliveryTypeName" label="配送方式：">
            <div>{{ detailData.deliveryTypeName }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item prop="pickupTime" label="配送时间：">
            <div>{{ detailData.pickupTime }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item prop="deliveryAddress" label="配送地点：">
            <div>{{ detailData.deliveryAddress }}</div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="logisticOrderData"
      class="table"
      border
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="oilName" label="油品规格" />
      <el-table-column prop="pickupCount" label="油品数量" />
      <el-table-column prop="cost" label="物流费用(元)" />
    </el-table>
    <el-card class="detail-card" shadow="never">
      <el-form
        ref="ruleFormRef"
        label-width="90px"
        label-position="left"
        class="form"
        :model="detailData">
        <el-row>
          <el-col :span="10">
            <el-form-item prop="orderId" label="提单时间：">
              <div>{{ detailData.logisticPickupTime }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="14" />
        </el-row>
        <el-row class="el-form-item-mb0">
          <el-col :span="10">
            <el-form-item prop="pickupTime" label="提油油库：">
              <div>{{ detailData.logisticOrderDelivery?.depotName }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item prop="deliveryAddress" label="提油地点：">
              <div>{{ detailData.logisticOrderDelivery?.depotAddress }}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="detail-card" shadow="never">
      <el-form
        ref="ruleFormRef"
        label-width="110px"
        label-position="left"
        class="form"
        :model="detailData">
        <el-row>
          <el-col :span="10">
            <el-form-item prop="orderId" label="接单时间：">
              <div>{{ detailData.orderTime }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="14" />
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item prop="pickupTime" label="物流企业：">
              <div>{{ detailData.logisticCompanyName }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item prop="deliveryAddress" label="运输车牌：">
              <div>{{ detailData.plateNumber }}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-form-item-mb0">
          <el-col :span="10">
            <el-form-item prop="pickupTime" label="配送联系人：">
              <div>{{ detailData.logisticOrderDelivery?.depotDockingPerson }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item prop="deliveryAddress" label="配送联系电话：">
              <div>{{ detailData.logisticOrderDelivery?.depotDockingPhone }}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <common-title class="view-title">
      配送流程
    </common-title>
    <logistic-process :process-data="processData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import { name } from '../../../config/config'
import { useRouter, useRoute } from 'vue-router'
import { OilType } from '@/utils/constant'
import { GetLogisticsDetail } from '@/api/logistics'
import LogisticProcess from './components/LogisticsProcess.vue'
export default defineComponent({
  components: { LogisticProcess },
  setup () {
    const router = useRouter()
    const route = useRoute()

    const detailData = reactive({}) as LogisticsDetailData

    const logisticOrderData = computed(() => {
      detailData.logisticOrderItems?.forEach(item => {
        item.cost = detailData.logisticFee
        item.oilName = `${OilType.get(item.oilType)}_${item.oilModel}`
      })
      return detailData.logisticOrderItems
    })
    const processData = computed(() => {
      const temp = [{
        stepName: '商家派单',
        stepNameDone: '商家派单'
      }, {
        stepName: '待提油',
        stepNameDone: '已接单'
      }, {
        stepName: '配送中',
        stepNameDone: '配送中'
      }, {
        stepName: '待确收',
        stepNameDone: '已送达'
      }, {
        stepName: '已完成',
        stepNameDone: '已完成'
      }]
      detailData.logisticOrderFlows?.forEach((item, index) => {
        Object.assign(temp[index], item)
      })
      return temp
    })

    GetLogisticsDetail(route.params.orderId).then(data => {
      Object.assign(detailData, data)
    }).catch(() => {
      router.replace({ name: 'NotFound' })
    })

    document.title = `物流订单详情 - ${name}`

    return {
      detailData,
      logisticOrderData,
      processData
    }
  }
})
</script>

<style scoped lang="scss">
.view-container {
  max-width: 1300px;
  position: relative;
  .status-icon {
    width: 77px;
    height: 67px;
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 60px;
    right: 24px;
  }
  .status-1 {
    background-image: url("img/logistics/status-1.png");
  }
  .status-2 {
    background-image: url("img/logistics/status-2.png");
  }
  .status-3 {
    background-image: url("img/logistics/status-3.png");
  }
  .status-4 {
    background-image: url("img/logistics/status-4.png");
  }
  .status-5 {
    background-image: url("img/logistics/status-5.png");
  }
  .status-99 {
    background-image: url("img/logistics/status-99.png");
  }
  .status-100 {
    background-image: url("img/logistics/status-100.png");
  }
  .detail-card {
    margin-top: 10px;
    .el-form-item-mb0 {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>

<template>
  <div class="view-container">
    <common-title class="view-title">
      物流订单管理
    </common-title>
    <el-form
      ref="searchFormRef"
      inline
      :model="searchForm"
      class="search-form">
      <el-form-item prop="search">
        <el-input
          v-model="searchForm.search"
          placeholder="请输入关键字"
          clearable />
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="searchForm.status" clearable placeholder="请选择物流状态">
          <el-option
            v-for="item in LogisticsStatus"
            :key="item[0]"
            :label="item[1]"
            :value="item[0]" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          @click="handleSearch">
          查询
        </el-button>
        <el-button
          class="submit-button"
          plain
          @click="handleReset">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      class="table"
      border
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="orderId" label="物流单号" min-width="180" />
      <el-table-column prop="customerName" label="客户名称" min-width="120" />
      <el-table-column prop="depotName" label="提油油库" min-width="120" />
      <el-table-column prop="oilDepotCityName" label="油品类型" min-width="120" />
      <el-table-column prop="oilModel" label="油品规格" min-width="120" />
      <el-table-column prop="deliveryTypeName" label="配送方式" min-width="120" />
      <el-table-column prop="deliveryAddress" label="配送地" min-width="200" />
      <el-table-column prop="pickupTime" label="配送时间" width="160" />
      <el-table-column prop="orderTime" label="接单时间" width="160" />
      <el-table-column prop="logisticCompanyName" label="物流企业" min-width="150" />
      <el-table-column prop="deliveryInfo" label="配送信息" min-width="100" />
      <el-table-column prop="status" label="物流状态" width="90">
        <template #default="scope">
          <span>{{ LogisticsStatus.get(scope.row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="handleCheck(scope.row.orderId)">
            查看
          </el-button>
          <el-button
            v-if="scope.row.status === 1"
            type="text"
            size="small"
            @click="handleDispatch(scope.row.orderId)">
            物流派单
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="page.pageNo"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.pageLayout"
      :total="page.total"
      @size-change="pageMethods.handleSizeChange"
      @current-change="pageMethods.handleCurrentChange" />
    <dispatch-layer v-model="visible" :detail-id="orderId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { GetLogistics } from '@/api/logistics'
import { usePaging } from '@/hooks'
import type { ElForm } from 'element-plus'
import { useRouter } from 'vue-router'
import { LogisticsStatus } from '@/utils/constant'
import DispatchLayer from './components/DispatchLayer.vue'
export default defineComponent({
  components: { DispatchLayer },
  setup () {
    const router = useRouter()

    const visible = ref(false)
    const orderId = ref('')
    const searchFormRef = ref<InstanceType<typeof ElForm>>()
    const searchForm = reactive({
      search: '',
      status: ''
    })

    const { dataList, page, pageMethods } = usePaging(GetLogistics, searchForm)

    const handleSearch = () => {
      pageMethods.getDataList()
    }

    const handleReset = () => {
      searchFormRef.value?.resetFields()
      pageMethods.reset()
    }

    const handleDispatch = (value) => {
      orderId.value = value
      visible.value = true
    }

    const handleCheck = (orderId) => {
      router.push(`/logisticsManage/${orderId}`)
    }

    return {
      visible,
      orderId,
      searchForm,
      searchFormRef,
      dataList,
      page,
      LogisticsStatus,
      handleSearch,
      handleReset,
      handleDispatch,
      handleCheck,
      pageMethods
    }
  }
})
</script>

<style scoped>

</style>

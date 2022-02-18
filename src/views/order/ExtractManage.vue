<template>
  <div class="view-container">
    <common-title class="view-title">
      提油管理
    </common-title>
    <el-form
      ref="searchFormRef"
      inline
      :model="searchForm"
      class="search-form">
      <el-form-item prop="shelfStatus">
        <el-input
          v-model="searchForm.searchWord"
          placeholder="请输入客户名称"
          clearable />
      </el-form-item>
      <el-form-item prop="oilType">
        <el-select
          v-model="searchForm.oilType"
          clearable
          placeholder="请选择油品类型">
          <el-option
            v-for="item in OilType"
            :key="item[0]"
            :label="item[1]"
            :value="item[0]" />
        </el-select>
      </el-form-item>
      <el-form-item prop="oilModel">
        <el-select v-model="searchForm.oilModel" clearable placeholder="请选择油品规格">
          <el-option
            v-for="item in oilModel"
            :key="item.oilModel"
            :label="item.oilModel"
            :value="item.oilModel" />
        </el-select>
      </el-form-item>
      <el-form-item prop="area">
        <el-select v-model="searchForm.cityCode" clearable placeholder="请选择提油方式">
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="promotion">
        <el-select v-model="searchForm.oilDepotCode" clearable placeholder="请选择所属油库">
          <el-option
            v-for="item in []"
            :key="item[0]"
            :label="item[1]"
            :value="item[0]" />
        </el-select>
      </el-form-item>
      <el-form-item prop="shelfStatus">
        <el-select v-model="searchForm.frontStatus" clearable placeholder="请选择提油状态">
          <el-option
            v-for="item in OrderState"
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
      :data="myDataList"
      class="table"
      border
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="code" label="提油单号" min-width="120" />
      <el-table-column prop="name" label="关联订单号" min-width="120" />
      <el-table-column prop="oilTypeName" label="客户名称" min-width="120" />
      <el-table-column prop="oilModel" label="油品类型" min-width="120" />
      <el-table-column prop="oilDepotCityName" label="油品规格" min-width="120" />
      <el-table-column prop="oilDepotName" label="所属油库" min-width="120" />
      <el-table-column prop="marketPrice" label="提油方式" min-width="120">
        <template #default="scope">
          <div>{{ `${scope.row.marketPrice}元/${scope.row.unitName}` }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="salePrice" label="提油数量" min-width="120">
        <template #default="scope">
          <div>{{ `${scope.row.salePrice}元/${scope.row.unitName}` }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="totalQuantity" label="提油总价值(元)" min-width="120">
        <template #default="scope">
          <div>{{ scope.row.totalQuantity + scope.row.unitName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="supportLockPriceName" label="配送费(元)" width="80" />
      <el-table-column prop="promotionTypeName" label="仓储费(元)" width="80" />
      <el-table-column prop="statusName" label="提油状态" width="80" />
      <el-table-column fixed="right" label="操作" width="160">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="handleConfirm(scope.row.code)">
            确认
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleCheck(scope.row.id)">
            查看
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { GetGoods } from '@/api/goods'
import { GetOilModels, GetRegions } from '@/api/common'
import { usePaging } from '@/hooks'
import { useStore } from '@/store'
import type { ElForm } from 'element-plus'
import { useRouter } from 'vue-router'
import { OilType, OrderState } from '@/utils/constant'
import { CommonType } from '@/store/mutation.types'
export default defineComponent({
  setup () {
    const router = useRouter()
    const store = useStore()

    const oilModel = ref<OilModelData[]>()
    const cityList = ref<RegionListData[]>([])
    const searchFormRef = ref<InstanceType<typeof ElForm>>()
    const searchForm = reactive({
      searchWord: '',
      oilType: '',
      oilModel: '',
      cityCode: '',
      frontStatus: '',
      oilDepotCode: ''
    })

    const { dataList, page, pageMethods } = usePaging(GetGoods, searchForm)

    const myDataList = computed(() => {
      dataList.value.map((item: GoodsListData) => {
        if (item.unit === 't') {
          item.unitName = '吨'
        } else if (item.unit === 'l') {
          item.unitName = '升'
        }
        item.oilTypeName = OilType.get(item.oilType)
        return item
      })
      return dataList.value
    })

    const handleSearch = () => {
      console.log(searchForm)
      pageMethods.getDataList()
    }

    const handleReset = () => {
      searchFormRef.value?.resetFields()
      pageMethods.getDataList()
    }

    const handleConfirm = (code) => {
      router.push(`/goodsManage/${code}`)
    }

    const handleCheck = (id) => {
      console.log(id)
    }

    if (store.state.common.cityList.length) {
      cityList.value = store.state.common.cityList
    } else {
      GetRegions({ level: 2 }).then(data => {
        cityList.value = data
        store.commit(`common/${CommonType.SET_CITY_LIST}`, data)
      })
    }

    if (store.state.common.oilModel.length) {
      oilModel.value = store.state.common.oilModel
    } else {
      GetOilModels({}).then(data => {
        oilModel.value = data
        store.commit(`common/${CommonType.SET_OIL_MODEL}`, data)
      })
    }

    return {
      searchForm,
      searchFormRef,
      myDataList,
      cityList,
      page,
      OilType,
      OrderState,
      oilModel,
      handleSearch,
      handleReset,
      handleConfirm,
      handleCheck,
      pageMethods
    }
  }
})
</script>

<style scoped>

</style>

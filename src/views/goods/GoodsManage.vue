<template>
  <div class="view-container">
    <common-title class="view-title">
      商品管理
      <template #tip>
        (商家可以根据油品、油库以及销售计量单位不同，新增可售卖商品，商品库存销售完毕，商品自动下架，请注意及时更新库存信息)
      </template>
    </common-title>
    <el-form
      ref="searchFormRef"
      inline
      :model="searchForm"
      class="search-form">
      <el-form-item prop="oilType">
        <el-select
          v-model="searchForm.oilType"
          clearable
          placeholder="请选择油品类型"
          @change="handleOilTypeChange">
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
        <el-select v-model="searchForm.area" clearable placeholder="请选择油库区域">
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="promotion">
        <el-select v-model="searchForm.promotion" clearable placeholder="请选择促销状态">
          <el-option
            v-for="item in Bool"
            :key="item[0]"
            :label="item[1]"
            :value="item[0]" />
        </el-select>
      </el-form-item>
      <el-form-item prop="shelfStatus">
        <el-select v-model="searchForm.shelfStatus" clearable placeholder="请选择上架状态">
          <el-option
            v-for="item in ShelfState"
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
      <el-form-item class="search-form-right">
        <el-button
          class="submit-button"
          type="primary"
          @click="handleAdd">
          新增
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
      <el-table-column prop="code" label="商品编号" min-width="120" />
      <el-table-column prop="name" label="油品名称" min-width="120" />
      <el-table-column prop="oilTypeName" label="油品类型" min-width="120" />
      <el-table-column prop="oilModel" label="油品规格" min-width="120" />
      <el-table-column prop="oilDepotCityName" label="油库区域" min-width="120" />
      <el-table-column prop="oilDepotName" label="油库名称" min-width="120" />
      <el-table-column prop="marketPrice" label="市场价" min-width="120">
        <template #default="scope">
          <div>{{ `${scope.row.marketPrice}元/${scope.row.unitName}` }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="salePrice" label="销售价格" min-width="120">
        <template #default="scope">
          <div>{{ `${scope.row.salePrice}元/${scope.row.unitName}` }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="totalQuantity" label="当前库存数量" min-width="120">
        <template #default="scope">
          <div>{{ scope.row.totalQuantity + scope.row.unitName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="minQuantity" label="最小购买量" min-width="100">
        <template #default="scope">
          <div>{{ scope.row.minQuantity + scope.row.unitName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="supportLockPriceName" label="是否支持锁价" width="110" />
      <el-table-column prop="promotionTypeName" label="是否促销" width="90" />
      <el-table-column prop="statusName" label="上架状态" width="90" />
      <el-table-column fixed="right" label="操作" width="160">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="handleEdit(scope.row.code)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.row.id)">
            删除
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
import { OilType, ShelfState, Bool } from '@/utils/constant'
import { CommonType } from '@/store/mutation.types'
export default defineComponent({
  setup () {
    const router = useRouter()
    const store = useStore()

    const oilModel = ref<OilModelData[]>()
    const cityList = ref<RegionListData[]>([])
    const searchFormRef = ref<InstanceType<typeof ElForm>>()
    const searchForm = reactive({
      order: '',
      oilType: '',
      oilModel: '',
      area: '',
      shelfStatus: '',
      promotion: '',
      sellerId: store.state.user.sellerId
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
        item.supportLockPriceName = Bool.get(item.supportLockPrice)
        item.promotionTypeName = item.promotionType === 3 ? '是' : '否' // 3 促销
        item.statusName = Bool.get(item.status)
        return item
      })
      return dataList.value
    })

    const handleOilTypeChange = (oilType) => {
      if (oilType) {
        GetOilModels({ oilType }).then(dataList => {
          oilModel.value = dataList
        }).catch(() => {
          oilModel.value = []
        })
      } else {
        oilModel.value = []
        searchForm.oilModel = ''
      }
    }

    const handleSearch = () => {
      console.log(searchForm)
      pageMethods.getDataList()
    }

    const handleReset = () => {
      searchFormRef.value?.resetFields()
      pageMethods.reset()
    }

    const handleAdd = () => {
      router.push('/goodsManage/add')
    }

    const handleEdit = (code) => {
      router.push(`/goodsManage/${code}`)
    }

    const handleDelete = (id) => {
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

    return {
      searchForm,
      searchFormRef,
      myDataList,
      cityList,
      page,
      OilType,
      ShelfState,
      Bool,
      oilModel,
      handleOilTypeChange,
      handleSearch,
      handleReset,
      handleAdd,
      handleEdit,
      handleDelete,
      pageMethods
    }
  }
})
</script>

<style scoped>

</style>

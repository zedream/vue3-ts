<template>
  <div class="view-container">
    <common-title class="view-title">
      合同管理
    </common-title>
    <el-form
      ref="searchFormRef"
      inline
      :model="searchForm"
      class="search-form">
      <el-form-item prop="shelfStatus">
        <el-input
          v-model="searchForm.searchWord"
          placeholder="请输入关键字"
          clearable />
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
      <el-table-column prop="code" label="合同编号" min-width="120" />
      <el-table-column prop="oilTypeName" label="订单编号" min-width="120" />
      <el-table-column prop="oilModel" label="客户名称" min-width="120" />
      <el-table-column prop="oilDepotCityName" label="合同状态" min-width="120" />
      <el-table-column prop="oilDepotCityName" label="联系电话" min-width="120" />
      <el-table-column prop="oilDepotName" label="下单时间" min-width="120" />
      <el-table-column prop="marketPrice" label="合同金额" min-width="120">
        <template #default="scope">
          <div>{{ `${scope.row.marketPrice}元/${scope.row.unitName}` }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template #default="scope">
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
import { usePaging } from '@/hooks'
import type { ElForm } from 'element-plus'
export default defineComponent({
  setup () {
    const searchFormRef = ref<InstanceType<typeof ElForm>>()
    const searchForm = reactive({
      searchWord: ''
    })

    const { dataList, page, pageMethods } = usePaging(GetGoods, searchForm)

    const myDataList = computed(() => {
      dataList.value.map((item: GoodsListData) => {
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

    const handleCheck = (id) => {
      console.log(id)
    }

    return {
      searchForm,
      searchFormRef,
      myDataList,
      page,
      handleSearch,
      handleReset,
      handleCheck,
      pageMethods
    }
  }
})
</script>

<style scoped>

</style>

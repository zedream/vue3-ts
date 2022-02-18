<template>
  <div class="view-container">
    <common-title class="view-title">
      客户库存管理
    </common-title>
    <el-form
      inline
      :model="searchForm"
      class="search-form">
      <el-form-item prop="mobile">
        <el-input
          v-model="searchForm.password"
          placeholder="请输入客户名称"
          clearable />
      </el-form-item>
      <el-form-item prop="password">
        <el-select v-model="searchForm.value" clearable placeholder="请选择油品类型">
          <el-option
            v-for="item in []"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="password">
        <el-select v-model="searchForm.value" clearable placeholder="请选择油品规格">
          <el-option
            v-for="item in []"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
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
      :data="tableData"
      class="table"
      border
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="eee" label="客户名称" />
      <el-table-column prop="fff" label="油品类型" />
      <el-table-column prop="ggg" label="油品规格" />
      <el-table-column prop="hhh" label="库存总量" />
      <el-table-column prop="iii" label="在途总量" />
      <el-table-column fixed="right" label="操作" width="80">
        <template #default>
          <el-button
            type="text"
            size="small"
            @click="handleOpenDetail">
            进出明细
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="searchForm.currentPage4"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  setup () {
    const timePeriod = ref<string[]>([])
    const searchForm = reactive({
      order: '',
      type: '',
      modal: ''
    })
    const tableData = ref([{
      eee: '深圳xxx加油站有限公司',
      fff: '汽油',
      ggg: '国VI_92#',
      hhh: '9195T吨800升',
      iii: '119吨112330升'
    }])

    const handleSearch = () => {
      console.log(searchForm)
    }

    const handleReset = () => {
      console.log(searchForm)
    }

    const handleOpenDetail = () => {
      console.log(1)
    }

    const handleSizeChange = () => {
      console.log(1)
    }

    const handleCurrentChange = () => {
      console.log(1)
    }
    return {
      timePeriod,
      searchForm,
      tableData,
      handleSearch,
      handleReset,
      handleOpenDetail,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped>

</style>

<template>
  <div class="view-container">
    <common-title class="view-title">
      收入明细记录
    </common-title>
    <el-form
      inline
      :model="searchForm"
      class="search-form">
      <el-form-item prop="mobile">
        <el-date-picker
          v-model="timePeriod"
          type="datetimerange"
          value-format="YYYY-MM-DD HH:mm:ss"
          range-separator="至"
          start-placeholder="分账起始时间"
          end-placeholder="分账终止时间" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="searchForm.password"
          placeholder="请输入分账编号"
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
      :data="tableData"
      class="table"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%">
      <el-table-column prop="aaa" label="分账编号" />
      <el-table-column prop="bbb" label="关联订单编号" />
      <el-table-column prop="ccc" label="分账机构" />
      <el-table-column prop="ddd" label="销售收入类型" />
      <el-table-column prop="eee" label="订单总金额（元）" />
      <el-table-column prop="fff" label="应收金额（元）" />
      <el-table-column prop="ggg" label="实收金额（元）" />
      <el-table-column prop="hhh" label="分账时间" width="150" />
      <el-table-column prop="iii" label="分账状态" width="80" />
      <el-table-column fixed="right" label="操作" width="80">
        <template #default>
          <el-button
            type="text"
            size="small"
            @click="handleOpenDetail">
            订单详情
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
import { defineComponent, reactive, ref, watch } from 'vue'
export default defineComponent({
  setup () {
    const timePeriod = ref<string[]>([])
    const searchForm = reactive({
      start: '',
      end: '',
      order: ''
    })
    const tableData = ref([{
      aaa: 'TX20211129152631672',
      bbb: 'TX20211129152631672',
      ccc: '销售收入',
      ddd: '销售收入',
      eee: '易宝支付',
      fff: '+289,000,000',
      ggg: '+289,00',
      hhh: '2021-12-07 10:00:00',
      iii: '已提现'
    }])

    watch(timePeriod, (val) => {
      if (val) {
        searchForm.start = val[0]
        searchForm.end = val[1]
      } else {
        searchForm.start = ''
        searchForm.end = ''
      }
    })

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

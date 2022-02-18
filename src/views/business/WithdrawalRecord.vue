<template>
  <div class="view-container">
    <common-title class="view-title">
      账户提现记录
    </common-title>
    <div class="data-overview-wrapper">
      <div class="data-overview">
        <div class="data-overview-label">
          累计销售订单金额（元）
        </div>
        <div class="data-overview-value">
          1,278,653,219
        </div>
      </div>
      <div class="data-overview">
        <div class="data-overview-label">
          累计提现金额（元）
        </div>
        <div class="data-overview-value">
          1,278,653,219
        </div>
      </div>
      <div class="data-overview">
        <div class="data-overview-label">
          本月销售额（元）
        </div>
        <div class="data-overview-value">
          1,278,653,219
        </div>
      </div>
      <div class="data-overview">
        <div class="data-overview-label">
          累计销售订单数量（个）
        </div>
        <div class="data-overview-value">
          1,278,653,219
        </div>
      </div>
      <div class="data-overview">
        <div class="data-overview-label">
          累计销售订单数量（个）
        </div>
        <div class="data-overview-value">
          1,278,653,219
        </div>
      </div>
    </div>
    <div class="balance-wrapper">
      <div class="balance-box">
        <div>
          账户余额：
          <span class="amount-text">
            123456.00
          </span>
          （冻结金额：
          <span class="amount-text">
            23456
          </span>）
        </div>
        <div class="balance-tip">
          *账户余额指已入账金额，提现会有手续费，由易宝支付收取
        </div>
      </div>
      <el-button
        class="withdrawal-button"
        type="primary"
        @click="handleWithdrawal">
        提现
      </el-button>
    </div>
    <div class="horizontal-line" />
    <el-form
      inline
      :model="searchForm"
      class="search-form">
      <el-form-item prop="mobile">
        <el-date-picker
          v-model="searchForm.value1"
          type="date"
          format="YYYY/MM/DD"
          placeholder="年/月/日" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="searchForm.password"
          placeholder="提现订单号"
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
        <el-button
          class="submit-button"
          plain
          type="primary"
          @click="handleExportExcel">
          导出Excel
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      class="table"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="aaa" label="提现订单号" />
      <el-table-column prop="bbb" label="代付流水号" />
      <el-table-column prop="ccc" label="提现时间" />
      <el-table-column prop="ddd" label="费用名目" width="100" />
      <el-table-column prop="eee" label="代付渠道" width="100" />
      <el-table-column prop="fff" label="提现金额（元）" />
      <el-table-column prop="ggg" label="提现佣金（元）" />
      <el-table-column prop="hhh" label="提现状态" width="80" />
      <el-table-column fixed="right" label="操作" width="80">
        <template #default>
          <el-button
            type="text"
            size="small"
            @click="handleOpenDetail">
            收入明细
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
    <withdrawal-dialog v-model="withdrawalLayerVisible" />
    <income-detail v-model="incomeLayerVisible" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import WithdrawalDialog from './components/WithdrawalLayer.vue'
import IncomeDetail from './components/IncomeDetailLayer.vue'
export default defineComponent({
  components: { WithdrawalDialog, IncomeDetail },
  setup () {
    const withdrawalLayerVisible = ref(false)
    const incomeLayerVisible = ref(false)
    const searchForm = reactive({})
    const tableData = ref([{
      aaa: 'TX20211129152631672',
      bbb: 'TX20211129152631672',
      ccc: '2021-12-07 10:00:00',
      ddd: '销售收入',
      eee: '易宝支付',
      fff: '+289,000,000',
      ggg: '12.00',
      hhh: '已提现'
    }])

    const handleWithdrawal = () => {
      withdrawalLayerVisible.value = true
    }

    const handleSearch = () => {
      console.log(1)
    }

    const handleReset = () => {
      console.log(1)
    }

    const handleExportExcel = () => {
      console.log(1)
    }

    const handleOpenDetail = () => {
      incomeLayerVisible.value = true
    }

    const handleSizeChange = () => {
      console.log(1)
    }

    const handleCurrentChange = () => {
      console.log(1)
    }

    return {
      withdrawalLayerVisible,
      incomeLayerVisible,
      searchForm,
      tableData,
      handleWithdrawal,
      handleSearch,
      handleReset,
      handleExportExcel,
      handleOpenDetail,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="scss">
.data-overview-wrapper {
  width: 1000px;
  display: flex;
  align-items: center;
  .data-overview {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: #333333;
    font-weight: 600;
    line-height: 20px;
    .data-overview-label {
      margin-bottom: 10px;
    }
  }
}
.balance-wrapper {
  display: flex;
  align-items: center;
  margin-top: 40px;
  .balance-box {
    font-size: 14px;
    color: #333333;
    line-height: 20px;
    .amount-text {
      font-size: 14px;
      color: #FF6600;
      font-weight: 600;
    }
    .balance-tip {
      font-size: 12px;
      color: #666666;
    }
  }
  .withdrawal-button {
    width: 130px;
    margin-left: 90px;
  }
}
.horizontal-line {
  height: 1px;
  width: 100%;
  background: #E3E3E3;
  margin: 15px 0;
}
.table {
  font-size: 12px;
  //:deep(.el-table__header-wrapper) {
  //  background: #FFF3E9;
  //  color: #222222;
  //}
}
</style>

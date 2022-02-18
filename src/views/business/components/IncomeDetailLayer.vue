<template>
  <el-dialog
    v-model="layerVisible"
    width="1000px"
    center
    custom-class="my-dialog"
    :before-close="close">
    <template #title>
      <common-title class="dialog-title">
        收入明细
      </common-title>
    </template>
    <template #default>
      <div class="income-detail-info">
        <div>
          提现订单号：{{ 'TX20211129152631672' }}
        </div>
        <div>
          共计金额：{{ '289,000,012' }}元
        </div>
      </div>
      <el-table
        :data="tableData"
        class="table"
        border
        style="width: 100%"
        header-align="center"
        align="center">
        <el-table-column prop="bbb" label="分账编号" />
        <el-table-column prop="ccc" label="关联订单编号" />
        <el-table-column prop="ddd" label="分账机构" width="100" />
        <el-table-column prop="eee" label="进出类型" width="100" />
        <el-table-column prop="fff" label="费用类型" />
        <el-table-column prop="ggg" label="金额（元）" />
        <el-table-column prop="hhh" label="结算时间" min-width="180" />
      </el-table>
      <el-pagination
        v-model:currentPage="page.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useLayer } from '@/hooks'
export default defineComponent({
  props: {
    modelValue: {
      require: true,
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const layer = useLayer(props, emit)

    const tableData = ref([{
      bbb: 'TX20211129152631672',
      ccc: 'TX20211129152631672',
      ddd: '易宝支付',
      eee: '收入',
      fff: '油品贷款',
      ggg: '12300.00',
      hhh: '2021-12-07 10:00:00'
    }])
    const page = reactive({
      currentPage: 1,
      total: 9,
      size: 10
    })

    const handleSizeChange = () => {
      console.log(1)
    }

    const handleCurrentChange = () => {
      console.log(1)
    }
    return {
      ...layer,
      tableData,
      page,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="scss">
.income-detail-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #222222;
  font-size: 14px;
  margin-bottom: 15px;
  font-weight: 600;
}
</style>

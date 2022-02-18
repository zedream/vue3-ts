<template>
  <el-dialog
    v-model="layerVisible"
    width="500px"
    center
    custom-class="my-dialog"
    :before-close="close">
    <template #title>
      <common-title class="dialog-title">
        收入提现
      </common-title>
    </template>
    <template #default>
      <el-form
        ref="ruleFormRef"
        :model="state"
        :rules="rules"
        label-position="left"
        label-width="100px">
        <el-form-item prop="mobile" label="可提现金额：">
          <div>123456.00元</div>
        </el-form-item>
        <el-form-item prop="password" label="提现至：">
          <div>深圳市华盛源石油科技有限公司 123456 (中国银行)</div>
        </el-form-item>
        <el-form-item prop="password" label="提现金额：">
          <el-input
            v-model.number="state.amount"
            placeholder="请输入提现金额"
            clearable>
            <template #append>
              <el-button
                class="withdrawal-button"
                @click="handleWithdrawalAll">
                全部提现
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button
        class="withdrawal-button"
        type="primary"
        @click="handleWithdrawal">
        提现
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
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
    const state = reactive({
      amount: ''
    })
    const layer = useLayer(props, emit, state)
    const rules = reactive({})

    const handleWithdrawalAll = () => {
      console.log(1)
    }

    const handleWithdrawal = () => {
      console.log(1)
    }

    return {
      ...layer,
      state,
      rules,
      handleWithdrawalAll,
      handleWithdrawal
    }
  }
})
</script>

<style scoped lang="scss">
.withdrawal-button {
  width: 110px;
}
</style>

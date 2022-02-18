<template>
  <div class="online-signing-tip">
    根据相关的法规，你需要在第三方支付公司完成签约
  </div>
  <el-button class="online-signing-btn" type="primary">
    打开易宝签约页
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCheckSettled } from '@/hooks'
export default defineComponent({
  setup () {
    useCheckSettled()
  }
})
</script>

<style scoped lang="scss">
.online-signing-tip {
  font-size: 16px;
  color: #222222;
  font-weight: 600;
  margin-top: 100px;
}
.online-signing-btn {
  margin-top: 40px;
}
</style>

<template>
  <div class="settled-done-tip">
    恭喜您完成商家入驻
  </div>
  <el-button class="settled-done-btn" type="primary" @click="$router.push('/')">
    进入首页
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCheckSettled } from '@/hooks'
export default defineComponent({
  setup () {
    // useCheckSettled()
  }
})
</script>

<style scoped lang="scss">
.settled-done-tip {
  font-size: 16px;
  color: #222222;
  font-weight: 600;
  margin-top: 100px;
}
.settled-done-btn {
  margin-top: 40px;
}
</style>

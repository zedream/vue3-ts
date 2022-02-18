<template>
  <div class="auditing-icon" />
  <div class="auditing-tip">
    您的申请提交成功，等待平台审核，预计时间1~2个工作日
  </div>
  <div class="auditing-tip">
    审核结果将以短信方式发送至您的手机，请留意查收。
  </div>
  <verify-layer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCheckSettled } from '@/hooks'
import VerifyLayer from './components/VerifyLayer.vue'
export default defineComponent({
  components: { VerifyLayer },
  setup () {
    useCheckSettled()

    return {
    }
  }
})
</script>

<style scoped lang="scss">
.auditing-icon {
  margin: 70px auto 30px;
  width: 86px;
  height: 86px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  background-image: url("img/settled/auditing.png");
}
.auditing-tip {
  font-size: 16px;
  color: #222222;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>

<template>
  <div class="logistics-process-wrapper">
    <div v-for="(item, index) in processData" :key="index" class="logistics-process">
      <div class="logistics-process-head">
        <div v-if="index < processData.length - 1" class="logistics-process-line" />
        <div class="logistics-process-icon" :class="{ 'logistics-process-icon-active': item.createTime }" />
      </div>
      <div class="logistics-process-content">
        <div class="logistics-process-title">
          <span>{{ item.flowRemark }}</span>
          <span />
        </div>
        <div class="logistics-process-desc">
          {{ item.createTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    processData: {
      require: true,
      type: Array,
      default: () => []
    }
  },
  setup () {
    return {

    }
  }
})
</script>

<style scoped lang="scss">
.logistics-process-wrapper {
  display: flex;
  width: 100%;
  .logistics-process {
    flex: 1;
    position: relative;
    text-align: center;
    .logistics-process-line {
      position: absolute;
      top: 10px;
      height: 1px;
      background: #BABDBF;
      width: 100%;
      left: 50%;
    }
    .logistics-process-icon {
      position: relative;
      width: 22px;
      height: 22px;
      background: #FFFFFF;
      border: 1px solid #BABDBF;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }
    .logistics-process-icon-active {
      border: 1px solid #FF6600;
      &:before {
        content: "";
        width: 12px;
        height: 12px;
        background: #FF6600;
        border-radius: 50%;
      }
    }
    .logistics-process-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .logistics-process-title {
        font-size: 14px;
        color: #000000;
        line-height: 30px;
      }
      .logistics-process-desc {
        font-size: 12px;
        color: #4A4A4A;
        line-height: 20px;
      }
    }
  }
}
</style>

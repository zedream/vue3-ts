<template>
  <div class="common-title">
    <span class="common-title-content">
      <slot name="default" />
    </span>
    <span class="common-title-tip">
      <slot name="tip" />
    </span>
    <el-button
      v-if="back"
      class="back"
      type="info"
      size="small"
      @click="$router.back()">
      {{ backText }}
    </el-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    back: {
      type: Boolean,
      default: false
    },
    backText: {
      type: String,
      default: '返回'
    }
  },
  setup (props) {
    return {
      ...props
    }
  }
})
</script>

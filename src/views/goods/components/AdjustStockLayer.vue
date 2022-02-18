<template>
  <el-dialog
    v-model="layerVisible"
    width="400px"
    center
    custom-class="my-dialog"
    :before-close="close">
    <template #title>
      <common-title class="dialog-title">
        调整库存
      </common-title>
    </template>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-select v-model="adjustScheme">
          <el-option
            v-for="item in AdjustScheme"
            :key="item"
            :label="item"
            :value="item" />
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-input-number
          v-model="adjustAmount"
          :step="100"
          :min="0"
          controls-position="right" />
      </el-col>
    </el-row>
    <template #footer>
      <div class="footer-button-box">
        <el-button
          class="submit-button"
          plain
          @click="close">
          取消
        </el-button>
        <el-button
          class="submit-button"
          type="primary"
          @click="handleConfirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useLayer } from '@/hooks'
const AdjustScheme = ['增加', '减少']
export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const layer = useLayer(props, emit)

    const visible = ref(props.modelValue)
    const adjustScheme = ref('增加')
    const adjustAmount = ref(0)
    const dialogRef = ref()

    watch(() => visible.value, (val) => {
      console.log(val)
    })

    const handleConfirm = () => {
      layer.close()
    }

    return {
      ...layer,
      AdjustScheme,
      adjustScheme,
      adjustAmount,
      dialogRef,
      handleConfirm
    }
  }
})
</script>

<style scoped lang="scss">
.my-dialog {
  .el-input-number, .el-select {
    width: 100%;
  }
  .footer-button-box {
    text-align: right;
  }
}
</style>

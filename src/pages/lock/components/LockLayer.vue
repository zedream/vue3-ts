<template>
  <el-dialog
    v-model="layerVisible"
    width="500px"
    center
    custom-class="my-dialog"
    :before-close="close">
    <template #title>
      <common-title class="dialog-title">
        屏幕锁定
      </common-title>
    </template>
    <template #default>
      <el-form
        ref="ruleFormRef"
        label-width="80px"
        label-position="left"
        :rules="rules"
        :model="form"
        class="form">
        <el-form-item prop="password" label="锁屏密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入锁屏密码"
            clearable />
        </el-form-item>
        <el-form-item prop="message" label="锁屏信息">
          <el-input
            v-model="form.message"
            maxlength="20"
            show-word-limit
            placeholder="请输入锁屏信息"
            clearable />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div>
        <el-button @click="close">
          取消
        </el-button>
        <el-button type="primary" @click="handleLockScreen">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useLayer } from '@/hooks'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { CommonType } from '@/store/mutation.types'
import type { ElForm } from 'element-plus'
export default defineComponent({
  setup (props, { emit }) {
    const store = useStore()
    const router = useRouter()

    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const dialogRef = ref()
    const form = reactive({
      password: '',
      message: ''
    })
    const layer = useLayer(props, emit, form)
    const rules = reactive({
      password: [
        {
          required: true,
          message: '请输入锁屏密码',
          trigger: 'blur'
        }
      ]
    })

    const handleLockScreen = () => {
      ruleFormRef.value?.validate(valid => {
        if (valid) {
          store.commit(`common/${CommonType.SET_LOCK_PWD}`, form.password)
          store.commit(`common/${CommonType.SET_LOCK_MSG}`, form.message)
          store.commit(`common/${CommonType.SET_LOCK}`, 1)
          router.push('/lock')
        }
      })
    }

    return {
      ...layer,
      ruleFormRef,
      dialogRef,
      form,
      rules,
      handleLockScreen
    }
  }
})
</script>

<style scoped>

</style>

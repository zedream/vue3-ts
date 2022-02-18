<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    size="large"
    class="login-form">
    <el-form-item prop="mobile">
      <el-input
        v-model.number="form.mobile"
        placeholder="请输入手机号"
        clearable />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        placeholder="请输入密码"
        show-password
        clearable
        @keydown.enter="submit" />
    </el-form-item>
    <el-form-item>
      <el-button
        class="submit-button"
        type="primary"
        @click="submit">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import type { ElForm } from 'element-plus'
export default defineComponent({
  emits: ['onSubmit'],
  setup (props, { emit }) {
    const form = reactive({
      mobile: '',
      password: '',
      positionX: -1
    })
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()

    const rules = reactive({
      mobile: [
        {
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ]
    })

    const submit = () => {
      ruleFormRef.value?.validate(valid => {
        if (valid) {
          emit('onSubmit', form)
        }
      })
    }

    return {
      form,
      rules,
      ruleFormRef,
      submit
    }
  }
})
</script>

<style scoped lang="scss">
.login-form {
  width: 100%;
  .submit-button {
    width: 100%;
    margin-top: 30px;
  }
}
</style>

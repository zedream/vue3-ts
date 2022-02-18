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
        clearable>
        <template #prepend>
          <el-select v-model="form.belonging">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="`+${item.label}`"
              :value="item.value" />
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="smsCode">
      <el-input
        v-model="form.smsCode"
        placeholder="请输入短信验证码"
        clearable
        @keydown.enter="submit">
        <template #append>
          <el-button @click="handleObtainCode">
            {{ verifyButtonText }}
          </el-button>
        </template>
      </el-input>
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
import { useVerifyCode } from '@/hooks'
import { SmsVerifyCode } from '@/api/auth'
export default defineComponent({
  emits: ['onSubmit'],
  setup (props, { emit }) {
    const form = reactive({
      mobile: '',
      smsCode: '',
      belonging: '86',
      positionX: -1
    })
    const verifyButtonText = ref<string>('获取验证码')
    const countDown = ref(0)
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()

    const options = [
      {
        value: '86',
        label: '86'
      }
    ]

    const rules = reactive({
      mobile: [
        {
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }
      ],
      smsCode: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }
      ]
    })

    const handleObtainCode = () => {
      ruleFormRef.value?.validateField('mobile', errorMsg => {
        if (!errorMsg) {
          if (countDown.value === 0) {
            SmsVerifyCode({
              mobile: form.mobile,
              type: 'login'
            }).then(() => {
              ElMessage.success('验证码发送成功，请注意查收')
              useVerifyCode(120, verifyButtonText, countDown)
            }).catch(error => {
              ElMessage.error(error)
            })
          }
        }
      })
    }

    const submit = () => {
      ruleFormRef?.value?.validate(valid => {
        if (valid) {
          emit('onSubmit', form)
        }
      })
    }

    return {
      form,
      verifyButtonText,
      options,
      rules,
      ruleFormRef,
      handleObtainCode,
      submit
    }
  }
})
</script>

<style scoped lang="scss">
.login-form {
  width: 100%;
  :deep(.el-input-group__append) {
    background: #FFFFFF;
  }
  :deep(.el-input-group__prepend) {
    background: #FFFFFF;
    width: 90px;
  }
  .submit-button {
    width: 100%;
    margin-top: 30px;
  }
}
</style>

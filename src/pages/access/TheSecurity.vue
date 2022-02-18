<template>
  <div class="my-container">
    <div class="security-wrapper flex-column-center">
      <div class="security-title">
        修改密码
      </div>
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="110px"
        label-position="left"
        class="security-form">
        <el-form-item prop="mobile" label="账户名称">
          <div class="mobile">
            {{ form.mobile }}
          </div>
        </el-form-item>
        <el-form-item prop="oldPassword" label="旧密码">
          <el-input
            v-model="form.oldPassword"
            placeholder="请输入旧密码"
            type="password"
            show-password
            clearable />
        </el-form-item>
        <el-form-item prop="password" label="新密码">
          <el-input
            v-model="form.password"
            placeholder="请输入新密码"
            type="password"
            show-password
            clearable />
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认新密码">
          <el-input
            v-model="form.confirmPassword"
            placeholder="确认输入新密码"
            type="password"
            show-password
            clearable />
        </el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          @click="handleSubmit">
          修改密码
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import type { ElForm } from 'element-plus'
import { MaskMobile } from '@/utils/security'
import { UpdatePassword } from '@/api/auth'
import { UserTypes } from '@/store/mutation.types'
export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()

    const form = reactive({
      mobile: MaskMobile(store.state.user.account.toString()),
      oldPassword: '',
      password: '',
      confirmPassword: '',
      userId: store.state.user.uid
    })

    const ruleFormRef = ref<InstanceType<typeof ElForm>>()

    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else {
        if (form.confirmPassword !== '') {
          if (!ruleFormRef.value) return
          ruleFormRef.value?.validateField('confirmPassword', () => null)
        }
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认输入新密码'))
      } else if (value !== form.password) {
        callback(new Error('新密码不一致'))
      } else {
        callback()
      }
    }
    const rules = reactive({
      oldPassword: [
        {
          required: true,
          message: '请输入旧密码',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        },
        {
          validator: validatePassword,
          trigger: 'blur'
        }
      ],
      confirmPassword: [
        {
          required: true,
          message: '请确认输入新密码',
          trigger: 'blur'
        },
        {
          validator: validateConfirmPassword,
          trigger: 'blur'
        }
      ]
    })

    const handleSubmit = () => {
      ruleFormRef.value?.validate(valid => {
        if (valid) {
          UpdatePassword(form).then(() => {
            ElMessage.success('修改密码成功，请重新登录')
            store.commit(`user/${UserTypes.CLEAR_CERTIFY}`)
            router.push('/login')
          }).catch(error => {
            ElMessage.error(error)
          })
        }
      })
    }

    return {
      form,
      rules,
      ruleFormRef,
      handleSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.my-container {
  padding-top: 210px;
  .security-wrapper {
    width: 600px;
    height: 470px;
    border: 2px solid #E8E8E8;
    border-radius: 2px;
    margin: 0 auto;
    padding: 0 120px;
    .security-title {
      font-size: 18px;
      color: #222222;
      line-height: 20px;
      font-weight: 600;
      margin-bottom: 40px;
    }
    .security-form {
      width: 100%;
      :deep(.el-form-item__label) {
        font-size: 16px;
        font-weight: 600;
        color: #222222;
      }
      .mobile {
        font-size: 16px;
        font-weight: 600;
        color: #222222;
      }
      .submit-button {
        width: 100%;
        margin-top: 30px;
      }
    }
  }
}
</style>

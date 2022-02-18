<template>
  <div class="business-signup-box">
    <div class="section-title">
      商家注册
    </div>
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="right"
      class="corp-name-form">
      <el-form-item prop="corpName" label="商家全称">
        <el-input
          v-model.number="form.corpName"
          placeholder="请输入商家名称"
          clearable />
      </el-form-item>
      <el-form-item prop="agreement">
        <el-checkbox v-model="form.agreement" size="large">
          <div class="agreement-box">
            我已阅读并同意
            <span class="agreement" @click.stop="handleNext">《云供油商家服务协议》</span>
            与
            <span class="agreement">《云供油支付服务协议》</span>
          </div>
        </el-checkbox>
      </el-form-item>
      <div class="submit-button-box">
        <el-button
          class="submit-button"
          type="primary"
          :loading="loading"
          @click="handleNext">
          下一步
        </el-button>
      </div>
    </el-form>
  </div>
  <div class="settled-business-box">
    <div class="section-title">
      入驻商家
    </div>
    <div class="settled-business" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { useStore } from '@/store'
import { SettledType, UserTypes } from '@/store/mutation.types'
import { IsSellerExist } from '@/api/settled'
import { useRouter } from 'vue-router'
import { useCheckSettled } from '@/hooks'
import Storage from '@/utils/storage'
import { StorageExpire, StorageTypes } from '@/types/storage'
export default defineComponent({
  setup () {
    useCheckSettled()
    const store = useStore()
    const router = useRouter()

    const form = reactive({
      agreement: false,
      corpName: Storage.Session.get(StorageTypes.APP_TEMP_SETTLED_CORP_SESSION)
    })

    const loading = ref(false)

    const ruleFormRef = ref<InstanceType<typeof ElForm>>()

    const validateCorpName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入商家全称'))
      } else {
        ruleFormRef.value?.validateField('corpName', () => null)
        callback()
      }
    }
    const rules = reactive({
      corpName: [
        {
          validator: validateCorpName,
          trigger: 'blur'
        }
      ]
    })

    const handleNext = () => {
      ruleFormRef.value?.validate(valid => {
        if (valid) {
          if (!form.agreement) {
            ElMessage.warning('请先阅读并勾选服务协议')
          } else {
            loading.value = true
            IsSellerExist({
              corpName: form.corpName
            }).then(() => {
              loading.value = false
              store.commit(`settled/${SettledType.SET_STATE}`, 2)
              store.commit(`user/${UserTypes.SET_CORPS}`, form.corpName)
              Storage.Session.set(StorageTypes.APP_TEMP_SETTLED_CORP_SESSION, form.corpName, StorageExpire.Day)
              router.push('realAuth')
            }).catch(() => {
              loading.value = false
            })
          }
        }
      })
    }

    return {
      form,
      loading,
      rules,
      ruleFormRef,
      handleNext
    }
  }
})
</script>

<style scoped lang="scss">
.business-signup-box {
  width: 620px;
  height: 350px;
  border: 1px solid #C6C6C6;
  border-radius: 2px;
  margin: 40px auto 10px;
  padding: 0 80px;
  .corp-name-form {
    margin-top: 40px;
    :deep(.el-form-item__label) {
      font-size: 16px;
      font-weight: 600;
      color: #222222;
    }
    .agreement-box {
      font-size: 12px;
      line-height: 14px;
      color: #A4A4A4;
      .agreement {
        color: #3E9EFF;
      }
    }
    .submit-button-box {
      text-align: center;
      overflow: hidden;
      :deep(.el-form-item__content) {
        margin: 0!important;
      }
      .submit-button {
        width: 330px;
        margin-top: 30px;
      }
    }
  }
}
.settled-business-box {
  overflow: hidden;
  .settled-business {
    margin: 0 auto;
    width: 717px;
    height: 203px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    background-image: url("img/settled/settled-business.png");

  }
}
.section-title {
  font-size: 18px;
  color: #222222;
  line-height: 20px;
  font-weight: 600;
  margin: 40px 0 10px;
  text-align: center;
}
</style>

<template>
  <div class="my-container">
    <div class="login-wrapper flex-column-center">
      <div class="login-wrapper-top" />
      <div class="login-title">
        <span v-if="loginWay === LoginMethod.VerifyCode">验证码登录</span>
        <span v-if="loginWay === LoginMethod.Password">密码登录</span>
      </div>
      <password-login v-if="loginWay === LoginMethod.Password" @on-submit="handleSubmit" />
      <verify-code-login v-if="loginWay === LoginMethod.VerifyCode" @on-submit="handleSubmit" />
      <div class="switch-method button" @click="handleSwitchLoginWay">
        <span v-if="loginWay === LoginMethod.Password">验证码登录</span>
        <span v-if="loginWay === LoginMethod.VerifyCode">密码登录</span>
      </div>
    </div>
    <slide-verify ref="slideRef" :phone="form.mobile" @verify="sliderVerified" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, Ref, ref } from 'vue'
import { LoginMethod } from '@/utils/constant'
import PasswordLogin from '@/pages/access/components/PasswordLogin.vue'
import VerifyCodeLogin from '@/pages/access/components/VerifyCodeLogin.vue'
import SlideVerify from '@/components/SlideVerify/index.vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { CheckSlider } from '@/api/auth'
import { GetSellerDetail } from '@/api/settled'
import Storage from '@/utils/storage'
import { SettledType, UserTypes } from '@/store/mutation.types'
import { StorageExpire, StorageTypes } from '@/types/storage'
import moment from '@/utils/moment'
export default defineComponent({
  components: { PasswordLogin, VerifyCodeLogin, SlideVerify },
  setup () {
    const store = useStore()
    const router = useRouter()

    const form = ref({
      mobile: '',
      positionX: ''
    })
    const loginWay = ref(0)
    const slideRef: Ref<HTMLElement | null> = ref(null)

    const sellerId = computed(() => store.state.user.sellerId)

    const handleSwitchLoginWay = () => {
      loginWay.value = 1 ^ loginWay.value
    }

    const sliderVerified = (data) => {
      CheckSlider({
        mobile: form.value.mobile,
        positionX: data.positionX
      }).then(() => {
        slideRef?.value?.hide()
        form.value.positionX = data.positionX
        handleSignIn(form.value)
      }).catch(error => {
        ElMessage.error(error)
      })
    }

    const handleSubmit = (data) => {
      form.value = data
      nextTick(() => {
        slideRef?.value?.show()
        slideRef?.value?.getVerifyPicture()
      })
    }

    const handleSignIn = (form) => {
      if (loginWay.value === LoginMethod.Password) {
        store.dispatch('user/signInByPassword', form).then(() => {
          judgeNeedSettled(sellerId.value)
        }).catch(error => {
          ElMessage.error(error)
        })
      } else if (loginWay.value === LoginMethod.VerifyCode) {
        store.dispatch('user/signInByVerifyCode', form).then(() => {
          judgeNeedSettled(sellerId.value)
        }).catch(error => {
          ElMessage.error(error)
        })
      }
    }

    const judgeNeedSettled = (sellerId) => {
      if (!sellerId) {
        router.push('/settled')
        ElNotification({
          title: '登录成功',
          message: `${moment.judgePeriod()}好， ${store.state.user.account}`,
          type: 'success'
        })
      } else {
        getSellerDetail(sellerId).then(() => {
          ElNotification({
            title: '登录成功',
            message: `${moment.judgePeriod()}好， ${store.state.user.corps}`,
            type: 'success'
          })
        })
      }
    }

    const getSellerDetail = (sellerId) => {
      return new Promise<void>((resolve) => {
        GetSellerDetail({
          sellerId
        }).then(res => {
          store.commit(`user/${UserTypes.SET_CORPS}`, res.corpName)
          Storage.Local.set(StorageTypes.APP_STORE_CORPS_LOCAL, res.corpName, StorageExpire.Week)
          if (res.status === 1 && res.paymentAuditStatus === 'COMPLETED') {
            router.push('/')
          } else {
            store.commit(`settled/${SettledType.SET_STATE}`, res.status)
            store.commit(`settled/${SettledType.SET_PAYMENT_AUDIT_STATUS}`, res.paymentAuditStatus)
            router.push('/settled')
          }
          resolve()
        }).catch(error => {
          ElMessage.error(`${error}: 查询商户信息失败`)
          router.push('/')
          resolve()
        })
      })
    }

    return {
      loginWay,
      LoginMethod,
      form,
      sellerId,
      slideRef,
      handleSwitchLoginWay,
      sliderVerified,
      handleSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.my-container {
  padding-top: 210px;
  width: 100%;
  height: 100%;
  background-image: url("img/access/bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  .login-wrapper {
    width: 570px;
    height: 470px;
    border: 1px solid #E8E8E8;
    border-radius: 2px;
    margin: 0 auto;
    padding: 0 120px;
    position: relative;
    background: #FFFFFF;
    .login-wrapper-top {
      position: absolute;
      height: 12px;
      width: 570px;
      left: -1px;
      top: -1px;
      background: linear-gradient(215deg, #FF7A01 5%, #FE6001 100%);
    }
    .login-title {
      font-size: 18px;
      color: #222222;
      line-height: 20px;
      font-weight: 600;
      margin-bottom: 40px;
    }
    .switch-method {
      font-size: 14px;
      line-height: 20px;
      color: #222222;
      text-align: left;
      width: 100%;
    }
  }
}
</style>

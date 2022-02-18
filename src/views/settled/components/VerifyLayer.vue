<template>
  <el-dialog
    v-model="layerVisible"
    width="500px"
    center
    custom-class="my-dialog"
    :before-close="close">
    <template #title>
      <common-title class="dialog-title">
        提示
      </common-title>
    </template>
    <template #default>
      <div class="verify-tip">
        已向联系人手机和邮箱发送验证信息，请按收到的信息提示操作
      </div>
      <div class="verify-methods-box">
        <div class="verify-methods">
          <div class="verify-methods-image mobile" :class="[ mobileVerified ? 'verified' : 'un-verified' ]" @click="getSellerDetail" />
          <div class="verify-methods-name">
            短信验证
          </div>
        </div>
        <div class="verify-methods">
          <div class="verify-methods-image email" :class="[ emailVerified ? 'verified' : 'un-verified' ]" @click="getSellerDetail" />
          <div class="verify-methods-name">
            邮箱验证
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { useLayer } from '@/hooks'
import { GetSellerDetail } from '@/api/settled'
export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const router = useRouter()
    const layer = useLayer(props, emit)

    const mobileVerified = ref(false)
    const emailVerified = ref(false)

    watch(() => store.state.settled.paymentAuditStatus, (newVal) => {
      if (newVal === 'AUTHENTICITY_VERIFYING') {
        layer.layerVisible.value = true
      }
      if (newVal === 'AGREEMENT_SIGNING') {
        router.push('onlineSign')
      }
    }, {
      immediate: true
    })

    const getSellerDetail = () => {
      GetSellerDetail({
        sellerId: store.state.user.sellerId
      }).then(data => {
        if (data.paymentProgress) {
          mobileVerified.value = data.paymentProgress.indexOf('MOBILE_VERIFY') > -1
          emailVerified.value = data.paymentProgress.indexOf('EMAIL_VERIFY') > -1
        }
      })
    }

    return {
      ...layer,
      mobileVerified,
      emailVerified,
      getSellerDetail
    }
  }
})
</script>

<style scoped lang="scss">
.my-dialog {
  .verify-tip {
    font-size: 14px;
    color: #666666;
    text-align: center;
  }
  .verify-methods-box {
    display: flex;
    align-items: center;
    margin-top: 45px;
    .verify-methods {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .verify-methods-image {
        width: 100px;
        height: 100px;
        background-position: center center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .mobile {
        background-image: url("img/settled/mobile.png");
      }
      .email {
        background-image: url("img/settled/email.png");
      }
      .verified {
        position: relative;
        &:after {
          position: absolute;
          content: url("img/settled/verified.png");
          bottom: 4px;
          right: 0;
        }
      }
      .un-verified {
        position: relative;
        &:after {
          position: absolute;
          content: url("img/settled/un-verified.png");
          bottom: 4px;
          right: 0;
          cursor: pointer;
        }
      }
      .verify-methods-name {
        font-size: 16px;
        color: #333333;
      }
    }
  }
}
</style>

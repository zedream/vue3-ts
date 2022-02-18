<template>
  <div class="settled-root-wrapper">
    <div>
      <div class="settled-root-title">
        商家入驻流程
      </div>
      <div class="signup-step-box">
        <div class="signup-step">
          <div class="signup-step-state">
            <div class="signup-step-icon" :class="[step > 0 ? 'signup-step-icon-done' : 'signup-step-icon-1']" />
            <div class="signup-step-name">
              1 商家注册
            </div>
          </div>
          <div class="signup-step-arrow" />
        </div>
        <div class="signup-step">
          <div class="signup-step-state">
            <div class="signup-step-icon" :class="[step === 1 ? 'signup-step-icon-2' : 'signup-step-icon-2-grey', step > 1 ? 'signup-step-icon-done' : '']" />
            <div class="signup-step-name">
              2 实名认证
            </div>
          </div>
          <div class="signup-step-arrow" />
        </div>
        <div class="signup-step">
          <div class="signup-step-state">
            <div class="signup-step-icon" :class="[step === 2 ? 'signup-step-icon-3' : 'signup-step-icon-3-grey', step > 2 ? 'signup-step-icon-done' : '']" />
            <div class="signup-step-name">
              3 平台审核
            </div>
          </div>
          <div class="signup-step-arrow" />
        </div>
        <div class="signup-step">
          <div class="signup-step-state">
            <div class="signup-step-icon" :class="[step === 3 ? 'signup-step-icon-4' : 'signup-step-icon-4-grey', step > 3 ? 'signup-step-icon-done' : '']" />
            <div class="signup-step-name">
              4 在线签约
            </div>
          </div>
          <div class="signup-step-arrow" />
        </div>
        <div class="signup-step">
          <div class="signup-step-state">
            <div class="signup-step-icon" :class="[step === 4 ? 'signup-step-icon-5' : 'signup-step-icon-5-grey']" />
            <div class="signup-step-name">
              5 入驻成功
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive :max="5">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  setup () {
    const store = useStore()

    const corpName = computed((): string => store.state.user.corps)
    const sellerState = computed((): number | string => store.state.settled.state)
    const paymentAuditStatus = computed(() => store.state.settled.paymentAuditStatus)
    const step = computed(() => {
      // if (sellerState.value === 2 || sellerState.value === 0 || corpName) {
      //   return 1
      // }
      if (corpName.value && !sellerState.value && sellerState.value !== 0) {
        return 1
      } else if (sellerState.value === 2 || paymentAuditStatus.value === 'REVIEW_BACK') { // 审核不通过
        return 1
      } else if (paymentAuditStatus.value === 'AGREEMENT_SIGNING' || paymentAuditStatus.value === 'BUSINESS_OPENING') { // 待签约
        return 3
      } else if (sellerState.value === 0) { // 待审核
        return 2
      } else if (sellerState.value === 1) { // 已入驻
        return 4
      }
      return 0
    })

    return {
      corpName,
      sellerState,
      step
    }
  }
})
</script>

<style scoped lang="scss">
.settled-root-wrapper {
  text-align: center;
  padding-top: 80px;
  .settled-root-title {
    font-weight: 600;
    font-size: 18px;
    color: #222222;
    line-height: 20px;
    margin-bottom: 30px;
  }
  .signup-step-box {
    display: flex;
    align-items: center;
    justify-content: center;
    .signup-step {
      display: flex;
      .signup-step-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        .signup-step-icon {
          width: 120px;
          height: 120px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
          .signup-step-name {
            font-size: 16px;
            color: #222222;
          }
        }
        .signup-step-icon-1 {
          background-image: url("img/settled/signup.png");
        }
        //.signup-step-icon-1-grey {
        //  background-image: url("img/settled/un-signup.png");
        //}
        .signup-step-icon-2 {
          background-image: url("img/settled/auth.png");
        }
        .signup-step-icon-2-grey {
          background-image: url("img/settled/un-auth.png");
        }
        .signup-step-icon-3 {
          background-image: url("img/settled/audit.png");
        }
        .signup-step-icon-3-grey {
          background-image: url("img/settled/un-audit.png");
        }
        .signup-step-icon-4 {
          background-image: url("img/settled/sign.png");
        }
        .signup-step-icon-4-grey {
          background-image: url("img/settled/un-sign.png");
        }
        .signup-step-icon-5 {
          background-image: url("img/settled/done.png");
        }
        .signup-step-icon-5-grey {
          background-image: url("img/settled/un-done.png");
        }
        .signup-step-icon-done {
          background-image: url("img/settled/over.png");
        }
      }
      .signup-step-arrow {
        margin: 50px 10px 0;
        width: 36px;
        height: 10px;
        background-image: url("img/settled/step-arrow.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>

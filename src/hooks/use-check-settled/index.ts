import { computed, onActivated, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

export const useCheckSettled = () => {
  const store = useStore()
  const router = useRouter()

  const sellerState = computed(() => store.state.settled.state)
  const paymentAuditStatus = computed(() => store.state.settled.paymentAuditStatus)

  watch(() => sellerState.value, (newVal) => {
    switch (newVal) {
      case 0:
        router.push('platformAudit')
        break
      case 1:
        router.push('/')
        break
      case 2:
        router.push('realAuth')
        break
      default:
        // router.push('/settled')
        break
    }
  })

  const judgeSettled = () => {
    switch (sellerState.value) {
      case 0:
        router.push('platformAudit')
        break
      case 1:
        router.push('/')
        break
      case 2:
        router.push('realAuth')
        break
      default:
        // router.push('/settled')
        break
    }
    if (paymentAuditStatus.value === 'AGREEMENT_SIGNING' || paymentAuditStatus.value === 'BUSINESS_OPENING') {
      router.push('onlineSign')
    } else if (paymentAuditStatus.value === 'REVIEW_BACK') {
      router.push('realAuth')
    }
  }

  onActivated(() => {
    judgeSettled()
  })
}

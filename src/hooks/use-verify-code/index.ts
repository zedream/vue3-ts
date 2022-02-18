import { useCountdown } from '@/hooks'

export const useVerifyCode = (
  countdownTime: number,
  verifyButtonText,
  countDown
) => {
  useCountdown(countdownTime, s => {
    countDown.value = s
    if (s === 0) {
      verifyButtonText.value = '重新获取'
    } else {
      verifyButtonText.value = `重新获取 (${s})`
    }
  })
}

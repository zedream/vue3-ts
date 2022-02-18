export const useCountdown = (
  second: number,
  callback: (remainTime: number) => void
) => {
  callback(second)
  let timer
  timer = setInterval(() => {
    second -= 1
    callback(second)
    if (second === 0) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}

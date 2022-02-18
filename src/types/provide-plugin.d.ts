declare global {
  const cloneDeep: typeof import('lodash')['cloneDeep']
  const throttle: typeof import('lodash')['throttle']
  const debounce: typeof import('lodash')['debounce']
  // const moment: typeof import('moment')
}

export {}

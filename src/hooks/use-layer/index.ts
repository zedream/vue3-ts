import { ref, watch } from 'vue'

export const useLayer = (props, emit, state?, detailMethod?) => {
  const layerVisible = ref(false)
  const originState = cloneDeep(state)

  watch(() => props.modelValue, (v) => {
    layerVisible.value = v
    v && detailMethod && detailMethod(props.detailId).then(data => {
      Object.assign(state, data)
    })
  })

  const close = () => {
    emit('update:modelValue', false)
    state && Object.assign(state, originState)
  }

  return {
    layerVisible,
    close
  }
}

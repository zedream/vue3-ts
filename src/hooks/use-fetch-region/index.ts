import { ref } from 'vue'
import { GetRegions } from '@/api/common'

export const useFetchRegion = (params) => {
  const result = ref<RegionListData[]>([])
  GetRegions(params).then(data => {
    result.value = data
  })
  return result
}

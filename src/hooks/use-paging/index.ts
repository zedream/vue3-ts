import { reactive, ref } from 'vue'

export const usePaging = (fetchDataMethod, searchForm?) => {
  const dataList = ref([])
  const page = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0,
    pageSizes: [10, 20, 50, 100],
    pageLayout: 'total, sizes, prev, pager, next, jumper'
  })

  const getDataList = () => {
    fetchDataMethod({
      pageNo: page.pageNo,
      pageSize: page.pageSize,
      ...searchForm
    }).then(data => {
      page.total = data.total
      dataList.value = data.records
    })
  }

  const handleSizeChange = (value) => {
    page.pageNo = 1
    page.pageSize = value
    getDataList()
  }

  const handleCurrentChange = (value) => {
    page.pageNo = value
    getDataList()
  }

  const reset = () => {
    page.pageNo = 1
    getDataList()
  }

  getDataList()

  return {
    dataList,
    page,
    pageMethods: {
      handleSizeChange,
      handleCurrentChange,
      getDataList,
      reset
    }
  }
}

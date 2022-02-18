<template>
  <div class="view-container">
    <common-title class="view-title">
      组织角色
    </common-title>
    <el-form
      inline
      :model="searchForm"
      class="search-form">
      <el-form-item prop="mobile">
        <el-input
          v-model="searchForm.password"
          placeholder="请输入名称"
          clearable />
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          @click="handleSearch">
          查询
        </el-button>
        <el-button
          class="submit-button"
          plain
          @click="handleReset">
          重置
        </el-button>
      </el-form-item>
      <el-form-item class="search-form-right">
        <el-button
          class="submit-button"
          type="primary"
          @click="handleReset">
          新增角色
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      class="table"
      border
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="remark" label="描述" />
      <el-table-column fixed="right" label="操作" width="160">
        <template #default>
          <el-button
            type="primary"
            size="small"
            @click="handleOpenDrawer">
            权限
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDeleteRole">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="searchForm.currentPage4"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
    <role-drawer v-model="drawerOpen" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import RoleDrawer from './components/RoleDrawer.vue'
import { GetRoles } from '@/api/system'
export default defineComponent({
  components: { RoleDrawer },
  setup () {
    const drawerOpen = ref(false)
    const timePeriod = ref<string[]>([])
    const searchForm = reactive({
      order: '',
      type: '',
      modal: ''
    })
    const tableData = ref<RoleListData[]>()

    const handleSearch = () => {
      console.log(searchForm)
    }

    const handleReset = () => {
      console.log(searchForm)
    }

    const handleOpenDrawer = () => {
      drawerOpen.value = true
    }

    const handleDeleteRole = () => {
      console.log(1)
    }

    const handleSizeChange = () => {
      console.log(1)
    }

    const handleCurrentChange = () => {
      console.log(1)
    }

    GetRoles({}).then(dataList => {
      tableData.value = dataList
    })
    return {
      drawerOpen,
      timePeriod,
      searchForm,
      tableData,
      handleSearch,
      handleReset,
      handleOpenDrawer,
      handleDeleteRole,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="scss">
.view-container {
  position: relative;
  :deep(.el-overlay) {
    position: absolute;
  }
}
</style>

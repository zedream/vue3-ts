<template>
  <div class="view-container">
    <common-title class="view-title">
      员工管理
    </common-title>
    <el-form
      ref="searchFormRef"
      inline
      :model="searchForm"
      class="search-form">
      <el-form-item prop="username">
        <el-input
          v-model="searchForm.username"
          placeholder="请输入姓名"
          clearable />
      </el-form-item>
      <el-form-item prop="role">
        <el-select v-model="searchForm.role" clearable placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="searchForm.status" clearable placeholder="请选择状态">
          <el-option
            v-for="item in EmployeeState"
            :key="item[0]"
            :label="item[1]"
            :value="item[0]" />
        </el-select>
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
          @click="handleAdd">
          新增员工
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="myDataList"
      class="table"
      border
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="accountName" label="账户名" min-width="120" />
      <el-table-column prop="username" label="姓名" min-width="120" />
      <el-table-column prop="mobile" label="手机号" width="120" />
      <el-table-column prop="roles" label="角色" min-width="120">
        <template #default="scope">
          <div>{{ scope.row.rolesName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="100">
        <template #default="scope">
          <div>{{ EmployeeState.get(scope.row.status) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="registerTime" label="更新时间" min-width="180" />
      <el-table-column fixed="right" label="操作" width="160">
        <template #default>
          <el-button
            type="text"
            size="small"
            @click="handleResetPassword">
            重置密码
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleEdit">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="page.pageNo"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.pageLayout"
      :total="page.total"
      @size-change="pageMethods.handleSizeChange"
      @current-change="pageMethods.handleCurrentChange" />
    <employee-layer v-model="layerVisible" :title="layerTitle" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import EmployeeLayer from './components/EmployeeLayer.vue'
import { GetEmployee, GetRoles } from '@/api/system'
import { usePaging } from '@/hooks'
import { EmployeeState } from '@/utils/constant'
import type { ElForm } from 'element-plus'
export default defineComponent({
  components: { EmployeeLayer },
  setup () {
    const layerVisible = ref(false)
    const layerTitle = ref('')
    const roleList = ref<RoleListData[]>([])
    const searchFormRef = ref<InstanceType<typeof ElForm>>()
    const searchForm = reactive({
      username: '',
      role: '',
      status: ''
    })

    const { dataList, page, pageMethods } = usePaging(GetEmployee, searchForm)

    const myDataList = computed(() => {
      dataList.value.map((item: EmployeeListData) => {
        const rolesNameArr: string[] = []
        item.rolesName = ''
        item.roles?.forEach(_ => {
          rolesNameArr.push(_.name)
        })
        item.rolesName = rolesNameArr.join('、')
        return item
      })
      return dataList.value
    })

    const handleSearch = () => {
      pageMethods.getDataList()
    }

    const handleReset = () => {
      searchFormRef.value?.resetFields()
      pageMethods.reset()
    }

    const handleAdd = () => {
      layerVisible.value = true
      layerTitle.value = '新增员工'
    }

    const handleResetPassword = () => {
      console.log(1)
    }

    const handleEdit = () => {
      layerVisible.value = true
      layerTitle.value = '编辑员工'
    }

    GetRoles({}).then(dataList => {
      roleList.value = dataList
    })

    return {
      layerVisible,
      layerTitle,
      searchForm,
      searchFormRef,
      myDataList,
      page,
      roleList,
      EmployeeState,
      handleSearch,
      handleReset,
      handleAdd,
      handleResetPassword,
      handleEdit,
      pageMethods
    }
  }
})
</script>

<style scoped>

</style>

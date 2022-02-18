<template>
  <el-dialog
    v-model="layerVisible"
    width="500px"
    center
    custom-class="my-dialog"
    :before-close="close">
    <template #title>
      <common-title class="dialog-title">
        {{ props.title }}
      </common-title>
    </template>
    <template #default>
      <el-form
        label-width="80px"
        label-position="left"
        :rules="rules"
        :model="form"
        class="form">
        <el-form-item label="默认密码">
          <div>Aa123456</div>
        </el-form-item>
        <el-form-item prop="account" label="账户名称">
          <el-input
            v-model="form.password"
            placeholder="请输入账户名称"
            clearable />
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input
            v-model="form.password"
            placeholder="请输入姓名"
            clearable />
        </el-form-item>
        <el-form-item prop="mobile" label="手机号码">
          <el-input
            v-model="form.password"
            placeholder="请输入手机号码"
            clearable />
        </el-form-item>
        <el-form-item prop="role" label="角色">
          <el-select v-model="form.value" clearable placeholder="请选择角色">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="state" label="状态">
          <el-radio-group v-model="form.radio">
            <el-radio :label="3">
              启用
            </el-radio>
            <el-radio :label="6">
              停用
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button
        class="submit-button"
        type="primary"
        @click="handleSubmit">
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useLayer } from '@/hooks'
export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    detailId: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const form = ref({})
    const layer = useLayer(props, emit, form.value)
    const rules = reactive({
      account: [
        {
          required: true,
          message: '请输入账户名称',
          trigger: 'blur'
        }
      ],
      name: [
        {
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }
      ],
      mobile: [
        {
          required: true,
          message: '请输入手机号码',
          trigger: 'blur'
        }
      ],
      role: [
        {
          required: true,
          message: '请选择角色',
          trigger: 'change'
        }
      ]
    })

    const handleSubmit = () => {
      emit('update:modelValue', false)
    }

    return {
      props,
      ...layer,
      form,
      rules,
      handleSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.form {
  .el-select {
    width: 100%;
  }
}
.submit-button {
  width: 100px;
}
</style>

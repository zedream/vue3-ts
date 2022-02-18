<template>
  <el-menu
    class="menu-wrapper"
    :default-active="$route.path"
    :collapse="isCollapse"
    :router="true"
    :unique-opened="true"
    @open="handleOpen"
    @close="handleClose">
    <SubMenu :menu="menu" />
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import SubMenu from './SubMenu.vue'
import routes from '@/utils/menu.routes'
export default defineComponent({
  components: { SubMenu },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const menu = reactive(routes)

    const handleOpen = (key: string, keyPath: string[]) => {
      // console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      // console.log(key, keyPath)
    }

    return {
      menu,
      handleOpen,
      handleClose
    }
  }
})
</script>

<style scoped lang="scss">
.menu-wrapper {
  position: fixed;
  left: 0;
  top: 70px;
  z-index: 1;
  width: 250px;
  height: 100%;
  background: #FFFFFF;
  box-shadow: 4px 3px 8px 0 rgba(71, 58, 52, 0.05);
  :deep(.el-sub-menu__title) {
    color: #333333;
    font-size: 16px;
    font-weight: 600;
    //text-align: center;
  }
}
.el-menu--collapse {
  width: 64px;
}
</style>

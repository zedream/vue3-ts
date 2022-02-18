<template>
  <template v-for="item in menu" :key="item.name">
    <el-sub-menu v-if="item.children" :index="item.path">
      <template #title>
        <i class="iconfont" :class="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>
      <SubMenu :menu="item.children" />
    </el-sub-menu>
    <el-menu-item v-else-if="item.meta.tag" :index="item.path" @click="handleRouter(item.path)">
      <template #title>
        <router-link class="menu-link-item" :to="item.path">
          <i class="router-icon" />
          {{ item.meta.title }}
        </router-link>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'SubMenu',
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const router = useRouter()

    const handleRouter = (path) => {
      router.push(path)
    }

    return {
      handleRouter
    }
  }
})
</script>

<style scoped lang="scss">
.is-opened {
  :deep(.el-sub-menu__title) {
    background: linear-gradient(90deg, #FE6001 0%, #FF993C 98%);
    color: #FFFFFF!important;
  }
}
.iconfont {
  margin-right: 12px;
  font-size: 18px;
}
.menu-link-item {
  display: flex;
  align-items: center;
  .router-icon {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 1px solid #666666;
    margin-right: 20px;
  }
}
</style>

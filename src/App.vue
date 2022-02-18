<template>
  <el-config-provider :locale="locale">
    <router-view v-if="showComponent" v-slot="{ Component }">
      <keep-alive :max="10">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, provide, ref, nextTick } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import '@/assets/iconfont/iconfont.css'
export default defineComponent({
  components: { ElConfigProvider },
  setup () {
    // const globalProp = getCurrentInstance()?.appContext.config.globalProperties
    // const grayDays = ref<string[]>(['05-12', '12-13'])
    // onBeforeMount(() => {
    //   if (grayDays.value.includes(moment(new Date()).format('MM-DD'))) {
    //     document.querySelector('#app')?.classList.add('gray')
    //   } else {
    //     document.querySelector('#app')?.classList.remove('gray')
    //   }
    // })
    const showComponent = ref(true)
    const refresh = () => {
      showComponent.value = false
      nextTick(() => {
        showComponent.value = true
        import('@/utils/global').then(module => {
          module.refreshExecution()
        })
      })
    }

    provide('refresh', refresh)

    return {
      locale: zhCn,
      showComponent,
      refresh
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.gray {
  filter: grayscale(100%);
}
</style>

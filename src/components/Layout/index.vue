<template>
  <TheHeader v-if="$route.meta.header" />
  <TheMenu v-if="$route.meta.menu" :is-collapse="isCollapse" />
  <div class="page-container" :style="containerStyle">
    <el-backtop target=".el-scrollbar__wrap" :visibility-height="200" />
    <el-scrollbar class="scroll-view" view-class="page-container">
      <div v-if="$route.meta.menu" class="main-header">
        <div class="tab-bar">
          <el-button
            class="tag-btn"
            type="text"
            @click="isCollapse = !isCollapse">
            <i class="iconfont icon-menu-collapse" :class="{ 'collapse-btn-rotate': isCollapse }" />
          </el-button>
          <el-button
            v-if="refreshBtn"
            class="tag-btn"
            type="text"
            @click="handleRefresh">
            <i class="iconfont icon-refresh" :class="{ 'refresh-btn-rotate': refreshRotate }" />
          </el-button>
          <menu-tag v-if="$route.meta.tag" />
          <el-dropdown v-if="$route.meta.tag" trigger="click">
            <el-button
              class="tag-btn"
              type="text">
              <i class="iconfont icon-menu-tags-operate" />
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleCloseTags(0)">
                  关闭当前
                </el-dropdown-item>
                <el-dropdown-item @click="handleCloseTags(1)">
                  关闭其他
                </el-dropdown-item>
                <el-dropdown-item @click="handleCloseTags(2)">
                  关闭所有
                </el-dropdown-item>
                <el-dropdown-item @click="handleCloseTags(3)">
                  关闭到左侧
                </el-dropdown-item>
                <el-dropdown-item @click="handleCloseTags(4)">
                  关闭到右侧
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- 当待审核、未通过和无商家id时 -->
        <el-alert
          v-if="sellerState === 0 || sellerState === 2 || !sellerId"
          show-icon
          title="尊敬的商家，您尚未完成商家入驻流程，请先完成入驻流程"
          type="warning"
          effect="dark"
          :closable="true">
          <router-link to="/settled">
            去入驻
          </router-link>
        </el-alert>
      </div>
      <template v-if="showView">
        <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
          <keep-alive :max="10">
            <component :is="Component" :class="[$route.meta.menu ? 'container-tar-bar' : 'container']" />
          </keep-alive>
        </router-view>
        <router-view v-else v-slot="{ Component }">
          <component :is="Component" :class="[$route.meta.menu ? 'container-tar-bar' : 'container']" />
        </router-view>
      </template>
    </el-scrollbar>
  </div>
  <TheFooter v-if="$route.meta.footer" />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import MenuTag from './components/MenuTag.vue'
import { MenuTagType } from '@/store/mutation.types'
import { app } from '../../../config/config'
export default defineComponent({
  components: { MenuTag },
  setup () {
    const store = useStore()
    const route = useRoute()

    const showView = ref(true)
    const isCollapse = ref(false)
    const refreshRotate = ref(false)
    const refreshBtn = ref(app.refresh)

    const scrollView = ref(null)

    const sellerState = computed((): number => store.state.settled.state)
    const sellerId = computed((): number => store.state.user.sellerId)
    const containerStyle = computed(() => {
      if (!route.meta.menu) {
        return {
          marginLeft: '0'
        }
      } else {
        if (isCollapse.value) {
          return {
            marginLeft: '64px'
          }
        } else {
          return {
            marginLeft: '250px'
          }
        }
      }
    })

    // const refresh = inject('refresh') as () => void

    const handleRefresh = throttle(() => {
      showView.value = false
      nextTick(() => {
        showView.value = true
        refreshRotate.value = true
        setTimeout(() => {
          refreshRotate.value = false
        }, 1000)
      })
    }, 1000, {
      leading: true,
      trailing: false
    })

    const handleCloseTags = (closeType: number) => {
      store.commit(`menuTag/${MenuTagType.REMOVE_TAG}`, {
        type: closeType
      })
    }

    return {
      showView,
      isCollapse,
      refreshRotate,
      refreshBtn,
      sellerState,
      sellerId,
      containerStyle,
      scrollView,
      handleRefresh,
      handleCloseTags
    }
  }
})
</script>

<style scoped lang="scss">
.page-container {
  height: calc(100vh - 70px);
  transition: margin-left 0.3s;
  .main-header {
    .tab-bar {
      .tag-btn {
        margin: 0;
      }
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #f2f5ff;
      display: flex;
      align-items: center;
      box-shadow: 0 0 10px 0 rgba(226, 226, 226, 0.7);
      position: relative;
      z-index: 520;
      .icon-menu-collapse {
        transform: rotate(0deg);
        transition: all 0.3s linear;
      }
      .collapse-btn-rotate {
        transform: rotate(90deg);
      }
      .refresh-btn-rotate {
        transform: rotate(360deg);
        transition: all 1s ease-in-out;
      }
    }
  }
  .container {
    min-height: calc(100vh - 70px);
  }
  .container-tar-bar {
    min-height: calc(100vh - 110px);
  }
}
</style>

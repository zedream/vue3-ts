<template>
  <el-button
    v-if="$store.state.common.showTagsScrollBtn"
    class="tag-btn"
    type="text"
    @click="handleManualScroll(direction.LEFT)">
    <i class="iconfont icon-menu-tag-left" />
  </el-button>
  <div class="menu-tag-wrapper">
    <div id="menu-tag-scroll-view" ref="scrollView" class="menu-tag-scroll-view">
      <router-link
        v-for="(item, index) in menuTags"
        :key="item.path"
        :to="item.path"
        :tag-name="item.path"
        class="menu-tag"
        :class="{ 'menu-tag-activated': $route.path === item.path, 'menu-tag-hover': index === currentTag || $route.path === item.path }"
        @mouseenter="handleEnterTag(index)"
        @mouseleave="handleLeaveTag">
        <span class="menu-tag-text">{{ item.title }}</span>
        <i
          v-if="(((fixIndex && item.path !== '/') || !fixIndex) && menuTags.length > 1)"
          class="iconfont icon-menu-tag-close"
          @click.stop="handleCloseTag(item.path)" />
      </router-link>
    </div>
  </div>
  <el-button
    v-if="$store.state.common.showTagsScrollBtn"
    class="tag-btn"
    type="text"
    @click="handleManualScroll(direction.RIGHT)">
    <i class="iconfont icon-menu-tag-right" />
  </el-button>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { app } from '../../../../config/config'
import { CommonType, MenuTagType, RemoveTag } from '@/store/mutation.types'
enum ManualScrollDirection {
  LEFT,
  RIGHT
}
export default defineComponent({
  setup () {
    const store = useStore()
    const route = useRoute()

    const fixIndex = ref(app.fixIndex)
    const showTagClose = ref(false)
    const timer = ref<NodeJS.Timer | null>(null)
    const currentTag = ref(-1)
    const direction = ref(ManualScrollDirection)
    const scrollView = ref<HTMLElement | null>(null)

    const menuTags = computed(() => store.state.menuTag.tags)
    /**
     * @description menu tags手动滚动按钮显隐及自动滚动逻辑
     * @author Tang Hao(1115491560@qq.com)
     * @date 2022-2-12 下午 4:11
     * 刷新页面时首次渲染这里才能获取到DOM元素
     * 所以需要在这里执行一次
     */
    onMounted(() => {
      const tagScroll: HTMLElement | null = document.querySelector('#menu-tag-scroll-view')
      const aTag: HTMLElement | null = document.querySelector(`a[tag-name='${route.path}']`)
      if (aTag && tagScroll) {
        if (aTag.offsetLeft - tagScroll.offsetLeft + aTag.clientWidth > tagScroll.scrollLeft + tagScroll.clientWidth) {
          tagScroll.scrollLeft = aTag.offsetLeft + aTag.clientWidth - tagScroll.clientWidth / 2 - tagScroll.offsetLeft
        } else if (aTag.offsetLeft - tagScroll.offsetLeft < tagScroll.scrollLeft) {
          tagScroll.scrollLeft = aTag.offsetLeft - tagScroll.offsetLeft - tagScroll.clientWidth / 2
        }
      }
      store.commit(`common/${CommonType.SET_TAGS_SCROLL_BTN}`, tagScroll && (tagScroll.scrollWidth > tagScroll.clientWidth))
      window.addEventListener('resize', throttle(handleResize, 187))
    })
    onUnmounted(() => {
      window.removeEventListener('resize', throttle(handleResize, 187))
    })
    function handleResize () {
      const tagScroll: HTMLElement | null = document.querySelector('#menu-tag-scroll-view')
      store.commit(`common/${CommonType.SET_TAGS_SCROLL_BTN}`, tagScroll && (tagScroll.scrollWidth > tagScroll.clientWidth))
    }

    const handleEnterTag = (index) => {
      timer.value = setTimeout(() => {
        currentTag.value = index
      }, 150)
    }

    const handleLeaveTag = () => {
      timer.value && clearTimeout(timer.value)
      timer.value = null
      setTimeout(() => {
        currentTag.value = -1
      }, 150)
    }

    const handleCloseTag = (path) => {
      event?.preventDefault()
      store.commit(`menuTag/${MenuTagType.REMOVE_TAG}`, {
        path,
        type: RemoveTag.REMOVE_BY_PATH
      })
    }

    const handleManualScroll = (direction: number) => {
      if (scrollView.value) {
        if (direction === ManualScrollDirection.LEFT) {
          scrollView.value.scrollLeft -= 200
        } else if (direction === ManualScrollDirection.RIGHT) {
          scrollView.value.scrollLeft += 200
        }
      }
    }

    return {
      fixIndex,
      showTagClose,
      menuTags,
      currentTag,
      direction,
      scrollView,
      handleEnterTag,
      handleLeaveTag,
      handleCloseTag,
      handleManualScroll
    }
  }
})
</script>

<style scoped lang="scss">
.menu-tag-wrapper {
  display: flex;
  width: 100%;
  padding: 0 10px;
  .menu-tag-scroll-view {
    flex: 1;
    display: flex;
    align-items: center;
    width: 0;
    overflow-x: auto;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }
    .menu-tag {
      display: flex;
      background: #FFECDC;
      white-space: nowrap;
      color: #FF6600;
      font-size: 14px;
      line-height: 30px;
      cursor: default;
      user-select: none;
      border-radius: 2px;
      margin-left: 6px;
      transition: all 0.3s linear;
      &:first-child {
        margin: 0;
      }
      .menu-tag-text {
        padding-left: 6px;
        padding-right: 6px;
      }
      .icon-menu-tag-close {
        cursor: pointer;
        width: 0;
        transition: width 0.2s linear;
        overflow: hidden;
        text-align: center;
        visibility: hidden;
      }
    }
    .menu-tag-activated {
      background: #FF6600;
      color: #FFFFFF;
    }
    .menu-tag-hover {
      .icon-menu-tag-close {
        width: 28px;
        visibility: visible;
      }
    }
  }
}
</style>

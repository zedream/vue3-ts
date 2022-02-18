<template>
  <div class="header-wrapper">
    <div class="header-left flex-center">
      <div class="header-logo" @click="handleToHome" />
      <div class="header-name-box">
        <div class="header-name">
          一站式油品交易服务平台
        </div>
        <div class="header-name-tip flex-center">
          商家版
        </div>
      </div>
    </div>
    <div v-if="token" class="header-right">
      <div v-if="corps || account" class="header-welcome">
        欢迎您，{{ corps || account }}
      </div>
      <div v-if="account" class="header-user-info">
        <el-badge is-dot class="item">
          <div class="header-user-icon remind" />
        </el-badge>
        <div class="header-user-icon" />
        <el-dropdown trigger="click">
          <div class="header-user-account-box">
            <div>{{ account }}</div>
            <div class="header-arrow-icon" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleToSecurity">
                修改密码
              </el-dropdown-item>
              <el-dropdown-item @click="layerVisible = true">
                锁定屏幕
              </el-dropdown-item>
              <el-dropdown-item divided @click="handleSignOut">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <lock-layer v-model="layerVisible" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import Storage from '@/utils/storage'
import { StorageTypes } from '@/types/storage'
import LockLayer from '@/pages/lock/components/LockLayer.vue'
export default defineComponent({
  components: { LockLayer },
  setup () {
    const store = useStore()
    const router = useRouter()
    console.log(router.getRoutes())

    const layerVisible = ref(false)

    const account = computed(() => store.state.user.account)
    const corps = computed(() => store.state.user.corps)
    const token = computed(() => store.state.user.token)

    const handleToHome = () => {
      router.push('/')
    }

    const handleToSecurity = () => {
      router.push({
        path: '/security'
      })
    }

    const handleSignOut = () => {
      ElMessageBox.confirm('即将退出系统，是否确认?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/signOut').then(() => {
          store.commit('CLEAR_STATE')
          Storage.Session.remove(StorageTypes.APP_STORE_MENU_TAG_TAGS_SESSION)
          ElMessage.success('退出成功')
        }).catch(error => {
          console.log(error)
          ElMessage.error(`退出失败: ${error}`)
        })
      }).catch(() => {
        console.log('取消退出')
      })
    }
    return {
      layerVisible,
      account,
      corps,
      token,
      handleToHome,
      handleToSecurity,
      handleSignOut
    }
  }
})
</script>

<style scoped lang="scss">
.header-wrapper {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(90deg, #FE6001 0%, #FF993C 98%);
  padding: 0 70px;
  .header-left {
    .header-logo {
      width: 99px;
      height: 40px;
      background-image: url("img/common/logo.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .header-name-box {
      display: flex;
      align-items: center;
      .header-name {
        font-weight: 600;
        font-size: 18px;
        color: #FFFFFF;
        margin: 0 16px 0 28px;
      }
      .header-name-tip {
        background: #FFF09B;
        border-radius: 4px;
        font-size: 12px;
        color: #FF510A;
        font-weight: 600;
        width: 48px;
        height: 23px;
        white-space: nowrap;
      }
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    .header-welcome {
      font-size: 18px;
      color: #FFFFFF;
    }
    .header-user-info {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #FFFFFF;
      cursor: pointer;
      user-select: none;
      .header-user-icon {
        width: 20px;
        height: 22px;
        background-image: url("img/common/header-user.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        margin: 0 16px 0 30px;
      }
      .remind {
        margin: 0 0 0 30px;
      }
      .header-user-account-box {
        display: flex;
        align-items: center;
        color: #FFFFFF;
        height: 70px;
        .header-arrow-icon {
          margin-left: 10px;
          width: 13px;
          height: 9px;
          background-image: url("img/common/header-user-arrow.png");
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>

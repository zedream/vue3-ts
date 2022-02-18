<template>
  <div className="lock">
    <div class="operations">
      <el-button type="text" @click="handleUnlock">
        <i class="iconfont icon-un-lock" />
      </el-button>
      <el-button type="text" @click="handleSignOut">
        <i class="iconfont icon-sign-out" />
      </el-button>
    </div>
    <div class="rolling-text">
      {{ $store.state.common.lockMsg }}
    </div>
    <div class="bottom-bg" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Storage from '@/utils/storage'
import { StorageTypes } from '@/types/storage'
import { useStore } from '@/store'
import { CommonType } from '@/store/mutation.types'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()

    const handleUnlock = () => {
      ElMessageBox.prompt('请输入锁屏密码', '退出锁屏', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value === store.state.common.lockPwd) {
          store.commit(`common/${CommonType.SET_LOCK}`, '0')
          router.replace('/')
        } else {
          ElMessage.error('密码错误')
        }
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
          store.commit(`common/${CommonType.SET_LOCK}`, '0')
          router.replace('/login')
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
      handleUnlock,
      handleSignOut
    }
  }
})
</script>

<style scoped lang="scss">
.lock {
  width: 100%;
  height: 100vh;
  background: linear-gradient(179deg, #FFFDF5 0%, #FFDFC9 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  .operations {
    position: fixed;
    right: 0;
    top: 0;
    padding: 16px 24px;
    .icon-un-lock, .icon-sign-out {
      font-size: 24px;
      font-weight: 500;
    }
  }
  .rolling-text {
    font-size: 36px;
    animation: textColor 8s alternate infinite;
    position: relative;
    top: 45%;
    transform: translateY(-70%);
    display: inline-block;
  }
  .bottom-bg {
    background-image: url("img/index/bottom-bg.png");
    width: 100%;
    height: 317px;
    position: absolute;
    bottom: 0;
    background-position: right 70px;
    background-repeat: no-repeat;
  }
}
@keyframes textColor {
  25% {
    color: #ffe25e;
  }
  50% {
    color: #2B89E9;
  }
  75% {
    color: #13ce66;
  }
  100% {
    color: #ff4d51;
  }
}
</style>

<template>
  <div class="welcome">
    <div class="welcome-words">
      欢迎进入云供油商家销售管理系统
    </div>
    <div class="oil-icon" />
    <div class="bottom-bg" />
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const homeRef = ref(null)

    const state = reactive({
    })

    return {
      homeRef,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="scss">
.welcome {
  width: 100%;
  height: 100%;
  background: linear-gradient(179deg, #FFFDF5 0%, #FFDFC9 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .welcome-words {
    font-size: 40px;
    line-height: 40px;
    color: #FF6600;
    margin: 75px 0 50px;
  }
  .oil-icon {
    background-image: url("img/index/middle-icon.png");
    background-size: 100% 100%;
    width: 687px;
    height: 572px;
  }
  .bottom-bg {
    background-image: url("img/index/bottom-bg.png");
    //background-size: 100% 100%;
    width: 100%;
    //min-width: 1665px;
    height: 317px;
    position: absolute;
    bottom: 0;
    background-position: right 70px;
    background-repeat: no-repeat;
  }
}
</style>

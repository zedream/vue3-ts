<template>
  <div v-if="shows" class="zhezhao">
    <div class="bgdiv" @tap="shows = false" />
    <div class="verifyBox" @touchend="onEnd">
      <div class="picBox">
        <img :src="`data:image/jpeg;base64,${bgPicture}`" class="pintuBg">
        <div class="pintukuai" :style="{ top: top + 'px' }">
          <img
            :src="`data:image/jpeg;base64,${verifyPic}`"
            :style="{ left: left + 'px',position:'relative' }">
        </div>
      </div>
      <div class="huakuaiBox" @mousemove.stop="handleMousemove" @mouseleave="endMove">
        <div class="movable-area">
          <div
            ref="movable-view"
            class="movable-view"
            :style="{ left: left + 'px' }"
            @mousedown.left.stop="handleMousedown"
            @mouseup.left.stop="handleMouseup" />
        </div>
        <div class="huadao">
          拖动左边滑块完成上方拼图
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { GetSlider } from '@/api/auth'
let stratMove = false
let movableLeft = 0
let initLeft = 0
export default defineComponent({
  props: {
    phone: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['verify'],
  setup (props, { emit }) {
    const state = reactive({
      top: 0,
      left: 0, // 随机拼图的最终X轴距离
      shows: false,
      bgPicture: '',
      verifyPic: '',
      isReseting: false
    })

    const reset = () => {
      getVerifyPicture()
    }
    const show = () => {
      state.shows = true
    }
    const hide = () => {
      state.shows = false
    }
    const handleMousedown = (event) => {
      stratMove = true
      movableLeft = event.clientX
      initLeft = state.left
    }
    const handleMousemove = (event) => {
      const cha = event.clientX - movableLeft
      if (stratMove && cha > 0 && state.left < 228) {
        state.left = initLeft + cha
      }
      if (stratMove && cha < 0 && state.left >= 0) {
        state.left = initLeft + cha
      }
    }
    const handleMouseup = () => {
      endMove()
    }
    const endMove = () => {
      stratMove = false
      onEnd()
    }
    const onEnd = (e) => {
      if (state.left !== 0) {
        const params = {
          positionX: state.left,
          mobile: props.phone
        }
        emit('verify', params)
      }
    }
    const getVerifyPicture = async () => {
      state.isReseting = true
      state.left = 0
      try {
        const data = await GetSlider({ mobile: props.phone })
        state.bgPicture = data.shadeImage
        state.verifyPic = data.sliderImg
        state.top = data.positionY
        setTimeout(() => {
          state.isReseting = false
        }, 1000)
      } catch (err) {
        console.log(err)
      }
    }

    return {
      ...toRefs(state),
      reset,
      show,
      hide,
      handleMousedown,
      handleMousemove,
      handleMouseup,
      endMove,
      onEnd,
      getVerifyPicture
    }
  }
})
</script>

<style lang="scss" scoped>
.bgView {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#000000, 0);
  z-index: 998;
}
.zhezhao {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#000000, 0.5);
  z-index: 997;
}
.verifyBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 5px #000000;
  z-index: 999;
}
.picBox {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 29px;
  width: 282px;
  .pintukuai {
    position: absolute;
    left: 0;
    z-index: 101;
    image {
      position: absolute;
      top: 0;
      left: 0;
      width: 110px;
      height: 110px;
    }
  }
}

.huakuaiBox {
  position: relative;
  height: 50px;
  width: 320px;
  margin: 25px 13px;
  .movable-area {
    height: 80px;
    width: 100%;
    user-select: none;
  }
  .movable-area .movable-view {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #1998ff;
    background-image: url('img/common/icon-button-normal.png');
    background-repeat: no-repeat;
    background-size: auto 30px;
    background-position: center;
    position: relative;
    z-index: 100;
  }
  .huadao {
    position: absolute;
    width: calc(100% - 40px);
    height: 40px;
    line-height:40px;
    background: #eee;
    box-shadow: inset 0 0 5px #ccc;
    border-radius: 60px;
    color: #999;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 20px;
    z-index: 99;
    user-select: none;
  }

}
</style>

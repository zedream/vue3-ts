<template>
  <div class="footer-wrapper flex-column-center">
    <div class="footer-top flex-center">
      <div class="footer-top-item">
        关于我们
      </div>
      <div class="footer-vertical-line" />
      <div class="footer-top-item">
        联系我们
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-item">
        <span>深圳云油供油有限公司</span>
      </div>
      <div class="footer-bottom-item">
        <span>电话:400 666 8666</span>
      </div>
      <div class="footer-bottom-item">
        <span>地址：深圳市大鹏新区葵涌街道下洞光汇综合楼2楼208</span>
      </div>
      <div class="footer-bottom-item">
        <span>邮箱：ghgyou@163.com</span>
      </div>
      <div class="footer-bottom-item">
        <span>版权所有© www.ghoil.net </span>
        <a href="">粤ICP备2021025867号-1</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped lang="scss">
.footer-wrapper {
  width: 100%;
  height: 80px;
  background: #333333;
  font-size: 14px;
  position: fixed;
  bottom: 0;
  left: 0;
  .footer-top {
    margin: 0 auto;
    color: #2B89E9;
    line-height: 20px;
    .footer-top-item {
      cursor: pointer;
    }
    .footer-vertical-line {
      height: 12px;
      width: 2px;
      background: #2B89E9;
      margin: 0 4px;
    }
  }
  .footer-bottom {
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-column-gap: 32px;
    margin: 10px auto 0;
    color: #888888;
    white-space: nowrap;
    .footer-bottom-item {

    }
  }
}
</style>

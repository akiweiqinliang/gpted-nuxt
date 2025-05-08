<template>
  <div class="scrollBox" :class="playFlagScroll ? 'play' : 'playStop'">
    <Row class-name="countryScrollFlags" :wrap="false">
      <div class="imgList1" style="display: flex">
        <div v-for="(item,idx) in flagList" :key="`${item}-${idx}`">
          <span :class="['fi', `fi-${item}`, 'countryFlag']"></span>
        </div>
      </div>
      <div class="imgList2" style="display: flex;">
        <div v-for="(item,idx) in flagList" :key="`${item}-${idx}`">
          <span :class="['fi', `fi-${item}`, 'countryFlag']"></span>
        </div>
      </div>
    </Row>
    <Row class-name="organizationScrollFlags" :wrap="false">
      <div class="imgList1" style="display: flex">
        <div v-for="(item,idx) in flagList2" :key="`${item}-${idx}`">
          <span :class="['fi', `fi-${item}`, 'countryFlag']"></span>
        </div>
      </div>
      <div class="imgList2" style="display: flex;">
        <div v-for="(item,idx) in flagList2" :key="`${item}-${idx}`">
          <span :class="['fi', `fi-${item}`, 'countryFlag']"></span>
        </div>
      </div>
    </Row>
  </div>
</template>

<script>
export default {
  name: "ScrollFlag",
  props: {
    playFlagScroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flagList: ['af', 'ax', 'al', 'dz', 'as', 'ad', 'ag', 'am', 'af', 'ax', 'al', 'dz', 'as', 'ad', 'ag', 'am'],
      flagList2: ['sh-ac', 'es-pv', 'ic', 'es-ct', 'eu', 'cp', 'arab', 'un', 'sh-ac', 'es-pv', 'ic', 'es-ct', 'eu', 'cp', 'arab', 'un'],
    }
  }
}
</script>

<style scoped lang="scss">
.scrollBox{
  margin-top: 66px;
  position: relative;
  &::before{
    position: absolute;
    content: '';
    height: 100%;
    width: 100px;
    background: linear-gradient( 270deg, rgba(246,248,251,0) 0%, var(--bg-color) 100%);
    left: 0;
    top: 0;
    z-index: 10;
  }
  &::after{
    position: absolute;
    content: '';
    height: 100%;
    width: 100px;
    background: linear-gradient( -270deg, rgba(246,248,251,0) 0%, var(--bg-color) 100%);
    top: 0;
    right: 0;
    z-index: 10;
  }
}
//旗帜滚动效果
.countryScrollFlags, .organizationScrollFlags{
  overflow: hidden;
}
.countryFlag{
  width: 84px;
  height: 60px;
  margin-right: 32px;
}
.imgList1, .imgList2{
  display: flex;
}
.countryScrollFlags{
  margin-bottom: 64px;
}
.play{
  .countryScrollFlags{
    .imgList1{
      animation: scrollBanner 10s linear infinite;
    }
    .imgList2{
      animation: scrollBanner2 10s linear infinite;
    }
  }
  .organizationScrollFlags{
    .imgList1{
      animation: scrollBanner3 20s linear infinite;
    }
    .imgList2{
      animation: scrollBanner4 20s linear infinite;
    }
  }
}
.playStop{
  .countryScrollFlags, .organizationScrollFlags{
    .imgList1, .imgList2{
      animation-play-state: paused;
    }
  }
}
@keyframes scrollBanner {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
@keyframes scrollBanner2 {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(-100%);
  }
}
@keyframes scrollBanner3 {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
@keyframes scrollBanner4 {
  0% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>

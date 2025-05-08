<template>
  <Row class-name="scrollBanners" :class="{ 'play': playBannerScroll }" :wrap="false">
    <div class="banner1">
      <div v-for="(item,idx) in bannerList" :key="`${item}-${idx}`" class="bannerImg">
        <img :src="require(`~/assets/imgs/home/coreImg7-${item}@2x.png`)" alt="">
      </div>
    </div>
    <div class="banner2">
      <div v-for="(item,idx) in bannerList" :key="`${item}-${idx}`" class="bannerImg">
        <img :src="require(`~/assets/imgs/home/coreImg7-${item}@2x.png`)" alt="">
      </div>
    </div>
  </Row>
</template>

<script>
export default {
  name: "ScrollBanner",
  props: {
    playBannerScroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bannerList: [1,2,3,4,5,6,1,2,3,4,5,6]
    }
  },
}
</script>

<style scoped lang="scss">
.scrollBanners{
  overflow: hidden;
  margin-top: 80px;
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
  .bannerImg{
    width: 150px;
    height: 50px;
    background: white;
    margin-right: 20px;
  }
  .banner1, .banner2{
    display: flex;
    animation-fill-mode: forwards;
  }
}
.play{
  .banner1{
    animation: scrollBanner3 20s linear infinite;
  }
  .banner2{
    animation: scrollBanner4 20s linear infinite;
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

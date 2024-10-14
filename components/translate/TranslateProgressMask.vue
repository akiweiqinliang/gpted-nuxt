<template>
<div class="content">
  <img :src="translating" alt="translating in progress">
  <span>Translating in progress</span>
  <Progress :percent="percent" status="active" hide-info/>
</div>
</template>

<script>
import translating from '~/assets/imgs/svg/translating.svg'
export default {
  name: "TranslateProgressMask",
  data() {
    return {
      translating,
      percent: 0,
      translateTimer: null,
    }
  },
  mounted() {
    this.startProgress()
  },
  beforeDestroy() {
    clearTimeout(this.translateTimer)
  },
  methods: {
    startProgress() {
      const updateProgress = () => {
        if (this.percent < 100) {
          this.percent += 10
          this.translateTimer = setTimeout(updateProgress, 500)
        }else {
          clearTimeout(this.translateTimer)
          this.$emit('on-finish')
        }
      }
      updateProgress()
    },
  }
}
</script>

<style scoped lang="scss">
.content{
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  img{
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
  span{
    margin-top: 12px;
    margin-bottom: 16px;
  }
}
</style>

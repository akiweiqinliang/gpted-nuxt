<template>
  <div>
    <!-- -------- 双语遮盖版 start ----- -->
    <div class="myDrawer" :class="{'active' : showDrawer, 'fixed': positionType === 'fixed', 'relative': positionType === 'relative'}">
      <Row justify="space-between" :wrap="false" align="middle" class="header">
        <Row align="middle">
          <img :src="analysisIcon" alt="">
          <span class="title">AI Analysis</span>
        </Row>
        <div class="closeIcon" @click="handleClose">
          <Icon type="md-close" size="24" color="var(--icon-color)"/>
        </div>
      </Row>
    </div>
    <!-- -------- 双语遮盖版 end ----- -->

  </div>
</template>

<script>
import aiLogoIcon from '~/assets/imgs/svg/aiLogo.svg';
import analysisIcon from '~/assets/imgs/svg/analysis.svg';
export default {
  name: "AiDialogBox",
  props: {
    positionType: {
      type: String,
      required: false,
      default() {
        return 'fixed'
      }
    }
  },
  data () {
    return {
      showDrawer: false,
      aiLogoIcon,
      analysisIcon,
    }
  },
  methods: {
    open() {
      this.showDrawer = true
    },
    close() {
      this.showDrawer = false
    },
    handleClose() {
      this.close()
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped lang="scss">

.myDrawer{
  height: 0;
  width: 0;
  transform: scale(0);
  transition: width .7s;
  //transition-timing-function: ease-out;
  background: var(--light-color);
  box-shadow: 0 0 12px 0 rgba(0,0,0,0.08);
  //position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;
  .header{
    padding: 20px;
    position: relative;
    &::after{
      content: '';
      position: absolute;
      height: 1px;
      width: 100%;
      bottom: 0;
      left: 0;
      background: var(--border-color);
    }
    img{
      width: 20px;
    }
    .title{
      font-weight: bold;
      font-size: 16px;
    }
    .closeIcon{
      cursor: pointer;
    }
  }
}
.fixed{
  position: fixed;
}
.relative{
  position: sticky;
  top: 120px;
  border-radius: 10px 0 0 10px;
  //margin-left: 20px;
}
.active{
  height: calc(100vh - 76px);
  width: 40vw;
  transform: scale(1);
  transition: all .5s;
  transition-timing-function: ease;
}
</style>

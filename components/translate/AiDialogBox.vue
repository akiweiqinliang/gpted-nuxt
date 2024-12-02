<template>
  <div>
    <transition name="drawer-transition">
    <div
      v-show="showDrawer"
      class="myDrawer" :class="{
      'pc': drawerType === 'pc',
      'mobile': drawerType === 'mobile',
      'fullScreen' : fullWindow
    }">
      <!--    ------  对话头 start -----  -->
      <Row justify="space-between" :wrap="false" align="middle" class="header">
        <Row align="middle">
          <img :src="analysisIcon" alt="">
          <span class="title">AI Analysis</span>
        </Row>
        <Row align="middle">
          <div class="expendIcon" @click="fullScreen">
            <!--          <img :src="expendIcon" alt="">-->
            <Icon v-show="!fullWindow" type="ios-expand" color="var(--primary-color)"/>
            <Icon v-show="fullWindow" type="ios-contract" color="var(--primary-color)"/>
          </div>
          <div class="closeIcon" @click="handleClose">
            <Icon type="md-close" color="var(--icon-color)"/>
          </div>
        </Row>
      </Row>
      <!--    ------  对话头 end -----  -->
      <!-- -------- 对话框 start ----- -->
      <div class="chatBox">
        <ChatBox />
      </div>
      <!-- -------- 对话框 end --------- -->
    </div>
    </transition>
  </div>
</template>

<script>
import aiLogoIcon from '~/assets/imgs/svg/aiLogo.svg';
import analysisIcon from '~/assets/imgs/svg/analysis.svg';
import expendIcon from '~/assets/imgs/svg/expend.svg';
import ChatBox from "~/components/translate/ChatBox.vue";
export default {
  name: "AiDialogBox",
  components: {ChatBox},
  data () {
    return {
      showDrawer: false,
      drawerType: 'pc',
      aiLogoIcon,
      analysisIcon,
      expendIcon,
      fullWindow: false,
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    // 设置初始值 pc/mobile
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      if (window.innerWidth > 768) {
        this.drawerType = 'pc';
      }else {
        this.drawerType = 'mobile';
      }
    },
    open() {
      this.showDrawer = true
    },
    close() {
      this.showDrawer = false
    },
    handleClose() {
      this.close()
      this.$emit('on-close')
    },
    fullScreen() {
      this.fullWindow = !this.fullWindow
    }
  }
}
</script>

<style scoped lang="scss">

.myDrawer{
  height: 0;
  width: 0;
  transition: all .7s;
  background: var(--light-color);
  box-shadow: 0 0 12px 0 rgba(0,0,0,0.08);
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
      margin-right: 10px;
    }
    .title{
      font-weight: bold;
      font-size: 16px;
    }
    .expendIcon{
      display: none;
    }
    .closeIcon{
      cursor: pointer;
    }
    .expendIcon, .closeIcon{
      i{
        font-size: 26px;
      }
    }
  }
}
.pc{
  display: block;
  height: calc(100vh - 76px);
  width: 40vw;
  position: fixed;
  transition: all .5s;
}
.mobile{
  display: none;
  position: fixed;
  border-radius: 0 0 0 10px;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50vh;
  transition: all .5s;
}
.chatBox{
  position: relative;
  height: calc(100% - 64px);
  padding: 20px 24px;
}
.fullScreen{
  height: calc(100% - 50px);
  z-index: 21;
}
/* 过渡类 */
.drawer-transition-enter-active, .drawer-transition-leave-active {
  transition: all 0.5s ease;
}
.drawer-transition-enter, .drawer-transition-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
@media screen and (max-width: 768px){
  .pc{
    display: none;
  }
  .mobile{
    display: block;
  }
  .myDrawer{
    border-radius: 20px 20px 0 0;
    .header{
      padding: 13px;
      img{
        width: 13px;
        height: 13px;
        margin-right: 5px;
      }
      .title{
        font-size: 11px;
      }
      .expendIcon{
        display: inline-block;
        margin-right: 10px;
      }
      .expendIcon, .closeIcon{
        i{
          font-size: 13px;
        }
      }
    }
  }
  .drawer-transition-enter, .drawer-transition-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
  .chatBox{
    padding: 20px;
  }
}
</style>

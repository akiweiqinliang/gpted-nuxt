<template>
<div id="unlockedMask" class="unlockedMask">
  <Row align="middle" class="signInCard">
    <span>
    <Icon type="ios-lock-outline" color="var(--primary-color)" />
    <span>Unlock the Tender details</span>
    </span>
    <Button v-if="!isLoggedIn" type="primary" @click="toLogin">Sign In</Button>
    <Button v-else type="primary" @click="unlock">Unlock</Button>
  </Row>
  <div v-if="isPc" class="mockText">
    <img v-if="shortText" src="~assets/imgs/tenderDetail/mobile-blurBg.png" alt="mobile">
    <img v-else src="~assets/imgs/tenderDetail/pc-blurBg.png" alt="pc">
  </div>
  <div v-else class="mockText">
    <img v-if="shortText" src="~assets/imgs/tenderDetail/mobile-blurBg.png" alt="mobile">
    <img v-else src="~assets/imgs/tenderDetail/mobile-blurBg2.png" alt="mobile">
  </div>
<!--  有无浏览次数-->
  <CommonPromptModal ref="unlockQueryModal" :closeable="false">
    <template slot="content">
      <div class="unlockQueryModal" >
        <div class="queryCard">
          <p>Do you need to expend time to view information ?</p>
          <span>Remaining opportunities: <span style="color: var(--primary-color)">{{ unlockTimes }}</span></span>
        </div>
        <Row justify="center" class-name="footerBtns">
          <Button class="btn" @click="cancel('unlockQueryModal')">No</Button>
          <Button class="btn" type="primary" @click="unlockOneTime('unlockQueryModal')">Yes</Button>
        </Row>
      </div>
    </template>
  </CommonPromptModal>
<!--  有无剩余分享信息解锁次数-->
  <CommonPromptModal ref="shareQueryModal" title="No chance to view" :closeable="true">
    <template slot="content">
      <div class="shareQueryModal" >
        <p>Share the link with your friend, and you can unlock the current information after he finishes viewing it.</p>
        <div class="queryCard linkCard">
          <span class="remainText">Remaining shares: <span style="color: var(--primary-color)">{{ shareTimes }}</span></span>
          <ul>
            <li><img src="~assets/imgs/tenderDetail/link2@2x.png" alt=""></li>
            <li><img src="~assets/imgs/tenderDetail/link3@2x.png" alt=""></li>
            <li><img src="~assets/imgs/tenderDetail/link4@2x.png" alt=""></li>
            <li><img src="~assets/imgs/tenderDetail/link5@2x.png" alt=""></li>
            <li><img src="~assets/imgs/tenderDetail/link6@2x.png" alt=""></li>
          </ul>
        </div>
      </div>
    </template>
  </CommonPromptModal>
  <!--  有无剩余任务次数-->
  <CommonPromptModal ref="taskQueryModal">
    <template slot="content">
      <div class="taskQueryModal" >
        <div class="queryCard">
          <p>Share the link with your friend, and you can unlock the current information after he finishes viewing it.</p>
        </div>
        <Row justify="center" class-name="footerBtns">
          <Button class="btn" @click="cancel('taskQueryModal')">No</Button>
          <Button class="btn" type="primary" @click="toTaskPage">Yes</Button>
        </Row>
      </div>
    </template>
  </CommonPromptModal>
  <!--  无次数提示-->
  <CommonPromptModal ref="becomeMemberQueryModal">
    <template slot="content">
      <div class="becomeMemberQueryModal" >
        <div class="queryCard">
            <Icon type="ios-alert-outline" size="30" color="var(--error-color)"/>
            <p>You don't have more viewing opportunities</p>
        </div>
        <Row justify="center" class-name="footerBtns">
          <Button class="btn" @click="cancel('becomeMemberQueryModal')">cancel</Button>
          <Button class="btn" type="primary">Become a member</Button>
        </Row>
      </div>
    </template>
  </CommonPromptModal>
</div>
</template>

<script>
import CommonPromptModal from "~/components/tenderDetail/CommonPromptModal.vue";

export default {
  name: "UnlockedMask",
  components: {CommonPromptModal},
  props: {
    tenderId: {
      type: Number,
      required: false,
      default() {
        return 0
      }
    },
    isPc: {
      type: Boolean,
      required: false,
      default() {
        return true
      }
    },
    shortText: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      unlockTimes: 0,
      shareTimes: 0,
      taskTimes: 0,
    }
  },
  computed: {
    isLoggedIn() {
      this.$store.dispatch("user/checkToken");
      return this.$store.getters["user/isLoggedIn"];
    },
  },
  methods: {
    toLogin() {
      this.$router.push({ name: 'login'})
    },
    async unlock() {
      // 校验是否有解锁次数
      const res = await this.$axios.get('/getUnlockTimes');
      const { unlockTimes, shareTimes, taskTimes } = res.data.times;
      if (unlockTimes > 0) {
        this.unlockTimes = unlockTimes;
        this.$refs.unlockQueryModal.showModal = true
      }else if (shareTimes > 0) {
        this.shareTimes = shareTimes;
        this.$refs.shareQueryModal.showModal = true
        return 0
      }else if (taskTimes > 0) {
        this.taskTimes = taskTimes;
        this.$refs.taskQueryModal.showModal = true
      }else {
        this.$refs.becomeMemberQueryModal.showModal = true
      }
    },
    cancel(ref) {
      this.$refs[ref].showModal = false
    },
    async unlockOneTime(ref) {
      this.cancel(ref);
      let type;
      switch (ref) {
        case 'unlockQueryModal':
          type = 'unlock';
          break;
        case 'shareQueryModal':
          type = 'share';
          break;
        case 'taskQueryModal':
          type = 'task';
          break;
        case 'becomeMemberQueryModal':
          type = 'becomeMember';
          break;
      }
      if (type === 'unlock') {
        const res = await this.$axios.put('/updateUserUnlockTimes', {tenderId: this.tenderId, type});
        const tender = res.data.tender;
        this.$emit('updateTender', tender);
      }
    },
    toTaskPage() {
      this.$Message.info('to task page')
    }
  }
}
</script>

<style scoped lang="scss">
.unlockedMask{
  position: relative;
  width: 100%;
  //padding: 20px;
  .signInCard{
    padding: 12px;
    border-radius: 6px;
    border: 1px solid var(--border-color4);
    position: absolute;
    background: var(--light-color);
    z-index: 6;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    flex-wrap: nowrap;
    span{
      font-weight: bold;
      font-size: 14px;
      margin: 0 16px;
      white-space: nowrap;
    }
  }
  .mockText{
    font-size: 14px;
    img{
      width: 100%;
    }
    .mobile{
      display: none;
    }
  }
}
.unlockQueryModal, .shareQueryModal, .taskQueryModal, .becomeMemberQueryModal{
  .queryCard{
    padding: 20px 60px;
    border-radius: 6px;
    background: var(--bg-color3);
    text-align: center;
    margin-bottom: 20px;
    p, span{
      font-size: 13px;
      display: inline-block;
    }
    span{
      color: var(--text-color3);
    }
  }
  .footerBtns{
    .btn{
      padding: 12px;
      width: 120px;
      height: auto;
      margin: 0 5px;
      font-size: 16px;
    }
  }
}
.shareQueryModal{
  p{
    margin-bottom: 30px;
  }
  .linkCard{
    .remainText{
      margin-bottom: 20px;
    }
  }
  ul{
    display: flex;
    justify-content: space-between;
    li{
      width: 30px;
      height: 30px;
    }
  }
}

.becomeMemberQueryModal{
  .queryCard{
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: 0;
    i{
      margin-right: 20px;
    }
  }
  p{
    font-size: 14px;
    font-weight: bold;
  }
  .footerBtns{
    .btn{
      width: auto;
      padding: 12px 34px;
    }
  }
}
@media screen and (max-width: 768px){
  .unlockedMask .mockText{
    font-size: 14px;
    img{
      width: 100%;
    }
    .pc{
      display: none;
    }
    .mobile{
      display: block;
    }
  }
  .unlockedMask .signInCard{
    padding: 10px;
    flex-wrap: wrap;
    flex-direction: column;
    span{
      font-size: 11px;
      margin: 0 8px;
    }
    button{
      font-size: 11px;
      padding: 4px 40px;
      height: auto;
      margin-top: 9px;
    }
  }
}
</style>
<style lang="scss">
@media screen and (max-width: 768px) {
  .descriptionLeftContent{
  #unlockedMask .signInCard{
    border: 0;
    padding: 0;
    button{
      margin-top: 4px;
    }
  }
  }
}
</style>

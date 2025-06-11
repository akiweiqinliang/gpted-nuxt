<template>
  <div id="activityPage">
    <div class="decorateBg"></div>
    <section>
    <Row class="top">
      <div class="left">
        <h1 v-dompurify-html="$t('activity_slogan')"></h1>
        <p>{{ $t('activity_slogan_desc') }}</p>
      </div>
      <div class="right">
        <div class="imgBox"></div>
      </div>
    </Row>
      <TaskList v-if="loginFlag"/>
      <div class="benefitList">
        <div class="benefitItem">
          <div class="imgBox"></div>
          <div class="content">
            <h3>Register</h3>
            <span>
              New users can get three viewing opportunities by registering</span>
          </div>
        </div>
        <div class="benefitItem">
          <div class="imgBox"></div>
          <div class="content">
            <h3>Perfect information</h3>
            <span>Improve personal information to get more viewing opportunities</span>
          </div>
        </div>
        <div class="benefitItem">
          <div class="imgBox"></div>
          <div class="content">
            <h3>Bind email</h3>
            <span>Bind email to get the opportunity to view and get the bidding push</span>
          </div>
        </div>
        <div class="benefitItem">
          <div class="imgBox"></div>
          <div class="content">
            <h3>View bidding</h3>
            <span>View a bid to familiarize yourself with our products and get more viewing opportunities</span>
          </div>
        </div>
        <div class="benefitItem">
          <div class="imgBox"></div>
          <div class="content">
            <h3>Collection bidding</h3>
            <span>Collect a bid to get his latest progress and view times</span>
          </div>
        </div>
        <div class="benefitItem">
          <div class="imgBox"></div>
          <div class="content">
            <h3>Share bidding</h3>
            <span>Share bidding information with your friends to get more opportunities</span>
          </div>
        </div>
      </div>
    </section>
    <LoginBtn v-if="!loginFlag" />
  </div>
</template>

<script>
import LoginBtn from "~/components/activity/LoginBtn.vue";
import TaskList from "~/components/activity/TaskList.vue";

export default {
  name: "ActivityPage",
  components: {TaskList, LoginBtn},
  data() {
    return {
      loginFlag: false,
    }
  },
  mounted() {
    this.fetchLoginToken()
  },
  methods: {
    fetchLoginToken() {
      // todo : fetch login token from API or check local storage
      this.loginFlag = !!localStorage.getItem('token');
    }
  }
}
</script>

<style scoped lang="scss">
#activityPage{
  //background: linear-gradient( 180deg, #E8EDFF 0%, #F6F8FB 23%, #F6F8FB 41%, #FFFFFF 47%), #F6F8FB;
  //background-attachment: fixed;
  background: var(--light-color);
  //width: 100%;
  //height: 100%;
  padding: 24px 150px 76px;
  margin-bottom: -40px;
  position: relative;
}
section{
  z-index: 2;
  position: relative;
}
.decorateBg{
  background: linear-gradient( 180deg, #E8EDFF 0%, #FFFFFF 47%), #F6F8FB;
  width: 100%;
  height: 400px;
position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  //background-attachment: fixed;
}
.top{
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  //height: 1000px;
  margin-bottom: 105px;
  .left{
    padding-right: 36px;
    flex: 3;
    h1{
      font-size: 36px;
    }
    p{
      font-size: 21px;
      color: var(--text-color2);
    }
  }
  .right{
    flex: 2;
    .imgBox{
      width: 100%;
      aspect-ratio: 557 / 418;
      background: var(--primary-bg-color2);
    }
  }
}

.benefitList{
  .benefitItem{
    display: flex;
    position: relative;
    min-height: 300px;
    .imgBox{
      width: 26%;
      aspect-ratio: 1 / 1;
      background: var(--primary-bg-color2);
      z-index: 3;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .content{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h3{
        padding-left: calc(26% + 30px);
        font-size: 20px;
        margin-bottom: 20px;
        color: #000;
      }
      span{
        width: 100%;
        display: block;
        background: #F8F9FD;
        padding: 27px;
        border-radius: 10px;
        position: relative;
        bottom: 0;
        padding-left: calc(26% + 30px);
        font-size: 20px;
      }
    }
    &:nth-child(even) {
      flex-direction: row-reverse;
      .imgBox{
        left: auto;
        right: 0;
      }
      .content {
        h3{
          text-align: right;
          padding-right: calc(26% + 30px);
          padding-left: 0;
        }
        span{
          text-align: right;
          padding-right: calc(26% + 30px);
          padding-left: 0;
        }
      }
    }
  }
}
</style>

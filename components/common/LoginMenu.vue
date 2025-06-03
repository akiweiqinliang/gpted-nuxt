<template>
<div>
  <Menu
    :active-name="activeRouterName"
    mode="horizontal" theme="light" class="floatMainMenu">
    <Row class-name="fullWidth" justify="space-between" align="middle">
    <div class="layout-logo" @click="toHome()"></div>
    <Row align="middle" :wrap="false">
      <template v-if="layoutType === 'login'">
        <span class="newMsg">{{$t('login_layout_newMsg')}}</span><span class="signUpMsg" @click="toRegister">{{$t('login_layout_signUpFree')}} <Icon type="md-arrow-forward" color="var(--primary-color)" /></span>
      </template>
      <template v-if="layoutType === 'register'">
        <span class="newMsg">{{$t('register_layout_newMsg')}}</span><span class="signUpMsg" @click="signIn">{{$t('signIn')}} <Icon type="md-arrow-forward" color="var(--primary-color)" /></span>
      </template>
      <Select v-model="lang" class="langSelector" @on-change="changeLanguage">
        <Icon slot="prefix" type="ios-globe-outline" :size="20" />
        <Option v-for="item in langList" :key="item.value" :value="item.value">{{ item.label }}</Option>
      </Select>
    </Row>
    </Row>
  </Menu>
  <MobileMenu v-if="false"/>
</div>
</template>

<script>
import {langList} from "~/lang/langList";
import pageCode from "~/enums/pageCodes";
import MobileMenu from "~/components/common/MobileMenu.vue";

export default {
  name: "LoginMenu",
  components: {MobileMenu},
  props: {
    layoutType: {
      type: String,
      required: false,
      default() {
        return 'login'
      }
    }
  },
  data() {
    return {
      activeRouterName: this.$route.name !== 'index' ? (this.$route.name.includes('dashboard') ? 'dashboard' : this.$route.name) : 'home',
      lang: this.$i18n.defaultLocale,
      langList,
      isLoggedIn: false,
    }
  },
  computed: {
    pageCode() {
      return pageCode
    },
  },
  watch: {
    $route(to, from) {
      this.activeRouterName = to.name !== 'index' ? (to.name.includes('dashboard') ? 'dashboard' : to.name) : 'home';
    },
  },
  methods: {
    changeLanguage() {
      this.$i18n.setLocale(this.lang)
    },
    toHome() {
      this.$router.push('/')
    },
    signIn() {
      this.$router.push({ name: 'login' })
    },
    signOut() {
      this.$Message.info({
        content: 'sign out!',
        top: 150,
      })
    },
    toRegister() {
      this.$router.push({ name: 'register' })
    }
  }
}
</script>

<style scoped lang="scss">
.layout-logo{
  width: 146px;
  height: 44px;
  //background: gray;
  cursor: pointer;
  background-image: url("@/assets/imgs/svg/GPTED.svg");
  background-repeat: round;
}
.newMsg, .signUpMsg{
  font-size: 13px;
  margin-right: 10px;
}
.newMsg{
  color: var(--text-color2);
}
.signUpMsg{
  color: var(--primary-color);
  cursor: pointer;
}
.floatMainMenu{
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 76px;
  line-height: 76px;
  background: var(--bg-color1);
  box-shadow: 0 1px 10px 0 rgba(0,0,0,0.08);
  padding: 0 48px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  .langSelector{
    width: 100px;
    margin-right: 24px;
  }
}

.ivu-menu-horizontal.ivu-menu-light:after{
  display: none;
}
@media screen and (max-width: 768px){
  .floatMainMenu{
    display: none;
  }
}
</style>

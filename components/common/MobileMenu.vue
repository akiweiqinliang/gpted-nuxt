<template>
<div>
  <Row :xs="24" :sm="24" :md="24" :lg="0" align="middle" justify="space-between" class-name="mobileMenu">
    <div class="mobileLogo"></div>
    <Icon v-show="!mobileMenuDrawer" type="ios-menu" @click="mobileMenuDrawer = !mobileMenuDrawer"/>
    <Icon v-show="mobileMenuDrawer" type="md-close" @click="mobileMenuDrawer = !mobileMenuDrawer"/>
  </Row>
  <Drawer
    v-model="mobileMenuDrawer"
    class-name="mobileDrawer"
    width="60%"
    :mask-style="{'backgroundColor': 'transparent'}"
    :closable="false">
    <Row align="middle" justify="space-between" :wrap="false">
      <Select v-model="lang" class="langSelector" :transfer="true" @on-change="changeLanguage">
        <Icon slot="prefix" type="ios-globe-outline" />
          <Option v-for="item in langList" :key="item.value" :value="item.value">{{ item.label }}</Option>
      </Select>
      <div style="width: 50%; display: flex;flex-wrap: nowrap; align-items: center;">
        <Badge dot class="messageIcon">
          <Icon type="ios-notifications-outline" />
        </Badge>
        <Button v-show="!isLoggedIn" type="primary" ghost @click="isLoggedIn = !isLoggedIn">{{ $t('signIn') }}</Button>
        <Avatar v-show="isLoggedIn" class="avatarBox">G</Avatar>
      </div>
    </Row>
    <Divider />
    <Menu :active-name="activeRouterName" theme="light" class="mobileMenuRouter" width="100%">
      <MenuItem :name="pageCode.HOME" to="/">
        {{ $t('home') }}
      </MenuItem>
      <MenuItem :name="pageCode.DISCOVER" :to="{ name: pageCode.DISCOVER }">
        {{ $t('search') }}
      </MenuItem>
      <MenuItem :name="pageCode.RESOURCE" :to="{ name: pageCode.RESOURCE_BLOG }">
        {{ $t('resources') }}
      </MenuItem>
      <MenuItem
        :name="pageCode.DASHBOARD_SUBSCRIBE"
        :to="{ name: pageCode.DASHBOARD_SUBSCRIBE }"
      >
        {{ $t('dashboard') }}
      </MenuItem>
      <MenuItem :name="pageCode.MEMBER" :to="{ name: pageCode.MEMBER }">
        {{ $t('member') }}
      </MenuItem>
      <MenuItem :name="pageCode.ACTIVITY" :to="{ name: pageCode.ACTIVITY }">
        {{ $t('activity') }}
      </MenuItem>
    </Menu>
    <Button v-if="isLoggedIn" class="signOutBtn" @click="signOut">{{$t('signOut')}}</Button>
  </Drawer>
</div>
</template>

<script>
import {langList} from "~/lang/langList";
import pageCode from "~/enums/pageCodes";

export default {
  name: "MobileMenu",
  data() {
    return {
      activeRouterName: this.$route.name !== 'index' ? this.$route.name : 'home',
      lang: this.$i18n.locale,
      langList,
      mobileMenuDrawer: false,

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
      this.activeRouterName = to.name !== 'index' ? to.name : 'home';
    },
  },
  methods: {
    // 全局
    changeLanguage() {
      this.$i18n.setLocale(this.lang)
    },
    signIn() {
      this.$router.push({ name: 'login' })
    },
    signOut() {
      // todo 这里需要调用后端接口进行登出操作
      this.isLoggedIn = false;
      this.$Message.info({
        content: 'sign out!',
        top: 150,
      })
    },
  }
}
</script>
<style scoped lang="scss">
.mobile{
  display: none;
}
.mobileMenu{
  display: none;
  background-color: var(--light-color);
  width: 100%;
  height: 50px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1001;
  padding: 0 20px;
  box-shadow: 0 1px 10px 0 rgba(0,0,0,0.08);
  .mobileLogo{
    width: 88px;
    height: 22px;
    background-color: #666666;
  }
  i{
    font-size: 22px;
  }
}

.messageIcon{
  margin-right: 10px;
}
@media screen and (max-width: 768px){
  .mobile{
    display: block;
  }
  .mobileMenu{
    display: flex;
  }
  .mobileDrawer{
    position: relative;
    .mobileMenuRouter{
      text-align: right;
    }
    .signOutBtn{
      position: absolute;
      bottom: 80px;
      left: 20px;
      color: var(--error-color);
      width: calc(100% - 40px);
      border: 1px solid var(--error-color);
    }
  }
}

</style>


<template>
  <Layout>
    <Menu mode="horizontal" theme="light" active-name="home" class="floatMainMenu">
      <div class="layout-logo"></div>
      <div class="divider"></div>
      <div class="layout-nav">
        <MenuItem :name="pageCode.HOME" to="/">
          {{ $t('home') }}
        </MenuItem>
        <MenuItem :name="pageCode.DISCOVER" :to="{ name: pageCode.DISCOVER }">
          {{ $t('search') }}
        </MenuItem>
        <MenuItem :name="pageCode.PROMOTE" :to="{ name: pageCode.PROMOTE }">
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
      </div>
      <div class="divider"></div>
      <Row>
        <Select v-model="lang" class="langSelector">
          <Icon slot="prefix" type="ios-globe-outline" :size="20" />
          <Option v-for="item in langList" :key="item.value" :value="item.value">{{ item.label }}</Option>
        </Select>
        <Button>{{ $t('signIn') }}</Button>
      </Row>
    </Menu>
    <Row :xs="24" :sm="24" :md="24" :lg="0" align="middle" justify="space-between" class-name="mobileMenu">
      <div class="mobileLogo"></div>
      <Icon type="ios-menu" />
    </Row>
    <Content>
      <Nuxt />
    </Content>
    <Footer>Footer</Footer>
  </Layout>
</template>

<script>
import pageCode from "~/enums/pageCodes";
import {langList} from "~/lang/langList";

export default {
  name: "Default",
  data() {
    return {
      lang: 'zh',
      langList,
    }
  },
  computed: {
    pageCode() {
      return pageCode
    }
  },
}
</script>

<style scoped lang="scss">
.layout-logo{
  width: 146px;
  height: 44px;
  background: gray;
}
.layout-nav{
  flex: 1;
}
.floatMainMenu {
  display: flex;
  align-items: center;
  height: 76px;
  line-height: 76px;
  background: var(--bg-color1);
  box-shadow: 0 1px 10px 0 rgba(0,0,0,0.08);
  padding: 0 48px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 20;
  .langSelector{
    width: 100px;
    margin-right: 24px;
  }
}
.divider{
  width: 1px;
  height: 46px;
  background: var(--divider-color);
  margin: 0 40px;
}
.ivu-menu-horizontal.ivu-menu-light:after{
  display: none;
}
.ivu-layout{
  background: var(--bg-color);
}
.ivu-layout-content{
  padding: 120px 100px 40px;
}

.ivu-layout-footer{
  background: var(--dark-color);
}

//mobile

.mobileMenu{
  display: none;
  background-color: var(--light-color);
  width: 100%;
  height: 100px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  padding: 0 30px;
  box-shadow: 0 1px 10px 0 rgba(0,0,0,0.08);
  .mobileLogo{
    width: 176px;
    height: 44px;
    background-color: #666666;
  }
  i{
    font-size: 44px;
  }
}
@media (max-width: 768px) {
  .floatMainMenu{
    display: none;
  }
  .mobileMenu{
    display: flex;
  }
  .ivu-layout-content{
    padding: 140px 50px 50px;
  }
}

</style>

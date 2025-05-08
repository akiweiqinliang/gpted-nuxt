<template>
  <div>
        <!--        <Nuxt />-->
        <Row class="dashboardPage">
          <div class="left">
            <Menu :active-name="activeRouterName" :open-names="openNames" class="menu" @on-open-change="handleSubmenuChange">
              <div v-for="(item, index) in myMenu" :key="index">
                <template v-if="item.children.length === 0">
                  <div class="notChildSubMenu" :class="{ 'withBackgroundSubMenu' : showQuestionCenterEntrance }">
                    <MenuItem
                      :name="item.pathName"
                      :to="{ name: item.pathName }"
                    >
                      <Icon :type="item.icon" />
                      <span class="sub">{{ $t(item.subTitle) }}</span>
                    </MenuItem>
                  </div>

                </template>
                <template v-else>
                  <Submenu :name="item.subTitle" :class="{ 'active': isActiveSubmenu(item)}">
                    <template slot="title">
                      <Icon :type="item.icon" />
                      <span class="sub">{{ $t(item.subTitle) }}</span>
                    </template>
                    <div class="subMenuItem">
                      <MenuItem
                        v-for="(subItem, subIndex) in item.children"
                        :key="`${subItem.title}-${subIndex}`"
                        :name="subItem.pathName"
                        :to="{ name: subItem.pathName }"
                      >
                        <span>{{ $t(subItem.title) }}</span>
                      </MenuItem>
                    </div>
                  </Submenu>
                </template>
              </div>
              <div class="userCenter">
                <MenuItem
                  v-if="showUserCenterEntrance"
                  name="userCenter"
                  :to="{ name: pageCode.USERCENTER }"
                >
                  <Icon type="md-person" />
                  <span class="sub">{{ $t('userCenter') }}</span>
                </MenuItem>
                <MenuItem
                  v-if="showQuestionCenterEntrance"
                  name="questionCenter"
                  :to="{ name: pageCode.ACTIVITY }"
                >
                  <Icon type="ios-help-circle-outline" />
                  <span class="sub">{{ $t('questionCenter') }}</span>
                </MenuItem>
              </div>
            </Menu>
          </div>
          <div class="right">
            <NuxtChild/>
            <!--      <LayoutFooter class="footer"/>-->
          </div>
        </Row>
  </div>
</template>

<script>
import pageCode from "~/enums/pageCodes";

export default {
  name: "SecondLayoutMenu",
  props: {
    myMenu: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    showUserCenterEntrance: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    },
    showQuestionCenterEntrance: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      activeRouterName: this.$route.name === 'index' ?
       'home' : this.$route.name === pageCode.USERCENTER_TEAM ?
          pageCode.USERCENTER : this.$route.name,
    }
  },
  computed: {
    pageCode() {
      return pageCode
    },
    openNames(){
      if (process.client) {
        return JSON.parse(localStorage.getItem('open-submenu-names')) || []
      }
      return []
    },
    isActiveSubmenu() {
      return item => item.children.map(child => child.pathName).includes(this.activeRouterName);
    }
  },
  watch: {
    $route(to, from) {
      this.activeRouterName = to.name !== 'index' ? to.name : 'home';
      if (to.name === pageCode.USERCENTER_TEAM) {
        this.activeRouterName = pageCode.USERCENTER
      }
    },
  },
  methods: {
    handleSubmenuChange(name) {
      localStorage.setItem('open-submenu-names', JSON.stringify(name))
    },
  }
}
</script>
<style scoped lang="scss">
.dashboardPage{
  height: 100%;
}
.left{
  position: fixed;
  height: 100vh;
  background: var(--light-color);
  width: 240px;
  .menu{
    width: 100%;
    height: 100%;
    z-index: 19;
    position: relative;
    .sub{
      font-weight: bold;
    }
    .active{
      color: var(--primary-color);
    }
    .userCenter{
      border-top: 1px solid var(--border-color);
      padding-top: 10px;
      position: absolute;
      bottom: 106px;
      width: 100%;
    }
  }
}
.right{
  margin-left: 240px;
  width: calc(100% - 240px);
  padding: 30px;
  .footer{
    position: relative;
  }
}
</style>
<style lang="scss">
.menu{
  padding-top: 20px;
}
.dashboardPage{
  .ivu-menu-light.ivu-menu-vertical .notChildSubMenu .ivu-menu-item-active:not(.ivu-menu-submenu){
    background: transparent;
  }
  .ivu-menu-light.ivu-menu-vertical .withBackgroundSubMenu .ivu-menu-item:not(.ivu-menu-submenu){
    margin: 0 20px;
    border-radius: 8px;
  }
  .ivu-menu-light.ivu-menu-vertical .withBackgroundSubMenu .ivu-menu-item-active:not(.ivu-menu-submenu){
    background: var(--primary-bg-color1);
  }
  .ivu-menu-vertical .ivu-menu-submenu  .subMenuItem .ivu-menu-item{
    text-align: center;
    padding: 8px 0 !important;
    border-radius: var(--border-radius-base);
    margin: 0 20px 10px;
    span{
      position: relative;
    }
    span::before{
      content: '';
      background: var(--primary-color);
      border-radius: 50%;
      width: 7px;
      height: 7px;
      left: -16px;
      top: 50%;
      opacity: 0;
      transform: translateY(-50%) scale(0);
      position: absolute;
    }
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after{
    content: none;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) span::before{
    transform: translateY(-50%) scale(1);
    opacity: 1;
    transition: all .3s;
  }
}
</style>

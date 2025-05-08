<template>
<!--  <Row class="dashboardPage">-->
<!--    <div class="left">-->
<!--      <Menu :active-name="activeRouterName" :open-names="openNames" class="menu" @on-open-change="handleSubmenuChange">-->
<!--        <div v-for="(item, index) in myMenu" :key="index">-->
<!--          <template v-if="item.children.length === 0">-->
<!--            <div class="notChildSubMenu">-->
<!--              <MenuItem-->
<!--                :name="item.pathName"-->
<!--                :to="{ name: item.pathName }"-->
<!--              >-->
<!--                <Icon :type="item.icon" />-->
<!--                <span class="sub">{{ $t(item.subTitle) }}</span>-->
<!--              </MenuItem>-->
<!--            </div>-->

<!--          </template>-->
<!--          <template v-else>-->
<!--            <Submenu :name="item.subTitle" :class="{ 'active': isActiveSubmenu(item)}">-->
<!--              <template slot="title">-->
<!--                <Icon :type="item.icon" />-->
<!--                <span class="sub">{{ $t(item.subTitle) }}</span>-->
<!--              </template>-->
<!--              <div class="subMenuItem">-->
<!--                <MenuItem-->
<!--                  v-for="(subItem, subIndex) in item.children"-->
<!--                  :key="`${subItem.title}-${subIndex}`"-->
<!--                  :name="subItem.pathName"-->
<!--                  :to="{ name: subItem.pathName }"-->
<!--                >-->
<!--                  <span>{{ $t(subItem.title) }}</span>-->
<!--                </MenuItem>-->
<!--              </div>-->
<!--            </Submenu>-->
<!--          </template>-->
<!--        </div>-->
<!--      <div class="userCenter">-->
<!--        <MenuItem-->
<!--          name="userCenter"-->
<!--          :to="{ name: 'userCenter' }"-->
<!--        >-->
<!--          <Icon type="md-person" />-->
<!--          <span class="sub">{{ $t('userCenter') }}</span>-->
<!--        </MenuItem>-->
<!--      </div>-->
<!--      </Menu>-->
<!--    </div>-->
<!--    <div class="right">-->
<!--      <NuxtChild/>-->
<!--&lt;!&ndash;      <LayoutFooter class="footer"/>&ndash;&gt;-->
<!--    </div>-->
<!--  </Row>-->
  <div>overview</div>
</template>

<script>
import pageCode from "~/enums/pageCodes";
// import LayoutFooter from "~/components/common/LayoutFooter.vue";

export default {
  name: "DashboardPage",
  // components: {LayoutFooter},
  layout: 'dashboard',
  data() {
    return {
      activeRouterName: this.$route.name,
      myMenu: [
        {
          subTitle: 'overview',
          icon: 'ios-analytics',
          pathName: pageCode.DASHBOARD, // menu的唯一标识name + 跳转路径name
          children: []
        },
        {
          subTitle: 'subscriptions',
          icon: 'ios-analytics',
          children: [
            {
              title: 'subscribe', // 国际化文本key
              pathName: pageCode.DASHBOARD_SUBSCRIBE, // menu的唯一标识name + 跳转路径name
            },
            {
              title: 'relatedSettings',
              pathName: pageCode.DASHBOARD_SETTINGS,
            },
          ]
        },
        {
          subTitle: 'favorites',
          icon: 'ios-star-outline',
          children: [
            {
              title: 'project',
              pathName: pageCode.DASHBOARD_PROJECT, // menu的唯一标识name + 跳转路径name
            },
            {
              title: 'resource',
              pathName: pageCode.DASHBOARD_RESOURCE,
            },
          ]
        },
        {
          subTitle: 'message',
          icon: 'ios-analytics',
          pathName: pageCode.DASHBOARD_MESSAGE, // menu的唯一标识name + 跳转路径name
          children: []
        },
      ]
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
      this.activeRouterName = to.name;
    },
  },
  methods: {
    handleSubmenuChange(name) {
      localStorage.setItem('open-submenu-names', JSON.stringify(name))
    }
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
  .footer{
    position: relative;
  }
}
</style>
<style lang="scss">
.dashboardPage{
  .ivu-menu-light.ivu-menu-vertical .notChildSubMenu .ivu-menu-item-active:not(.ivu-menu-submenu){
    background: transparent;
  }
  .ivu-menu-vertical .ivu-menu-submenu  .subMenuItem .ivu-menu-item{
    text-align: center;
    padding: 8px 0 !important;
    border-radius: var(--border-radius-base);
    //font-size: 12px;
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

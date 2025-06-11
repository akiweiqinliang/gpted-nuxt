<template>
  <div>
    <Layout>
      <LayoutMenu />
      <Content>
        <SecondLayoutMenu :my-menu="myMenu" :show-user-center-entrance="true"/>
      </Content>
    </Layout>
  </div>
</template>

<script>
import pageCode from "~/enums/pageCodes";
import LayoutMenu from "~/components/common/LayoutMenu.vue";

export default {
  name: "Dashboard",
  components: {LayoutMenu},
  data() {
    return {
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
            // {
            //   title: 'resource',
            //   pathName: pageCode.DASHBOARD_RESOURCE,
            // },
          ]
        },
        {
          subTitle: 'message',
          icon: 'ios-analytics',
          pathName: pageCode.DASHBOARD_MESSAGE, // menu的唯一标识name + 跳转路径name
          children: []
        },
        {
          subTitle: 'history',
          icon: 'ios-star-outline',
          children: [
            {
              title: 'Bid document',
              pathName: pageCode.DASHBOARD_HISTORY, // menu的唯一标识name + 跳转路径name
            },
            {
              title: 'Attachments',
              pathName: pageCode.DASHBOARD_HISTORY_ATTACHMENT,
            },
          ]
        },
      ]
    }
  },
  computed: {
    pageCode() {
      return pageCode
    },
  },
}
</script>
<style scoped lang="scss">
.ivu-layout{
  background: var(--bg-color);
  min-height: 100vh;
}
.ivu-layout-content{
  padding-top: 76px;
}

.ivu-layout-footer{
  padding: 0;
}

@media (max-width: 768px) {
  .ivu-layout-content{
    padding: 25px;
  }
}

</style>

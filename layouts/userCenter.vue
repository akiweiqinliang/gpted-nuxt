<template>
  <div>
    <Layout>
      <LayoutMenu />
      <Content>
        <SecondLayoutMenu :my-menu="myMenu" :show-question-center-entrance="true" />
      </Content>
    </Layout>
  </div>
</template>

<script>
import pageCode from "~/enums/pageCodes";
import LayoutMenu from "~/components/common/LayoutMenu.vue";

export default {
  name: "UserCenter",
  components: {LayoutMenu},
  data() {
    return {
      myMenu: [
        {
          subTitle: 'userCenter_settings', // $t(key) 这里填key
          icon: 'ios-analytics',
          pathName: pageCode.USERCENTER, // menu的唯一标识name + 跳转路径name
          children: []
        },
        {
          subTitle: 'userCenter_billing',
          icon: 'ios-analytics',
          pathName: pageCode.USERCENTER_BILLING, // menu的唯一标识name + 跳转路径name
          children: []
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

<template>
  <div>
    <Layout>
      <LayoutMenu />
      <Content>
        <Nuxt />
      </Content>
    </Layout>
  </div>
</template>

<script>
import pageCode from "~/enums/pageCodes";
import {langList} from "~/lang/langList";
import LayoutMenu from "~/components/common/LayoutMenu.vue";

export default {
  name: "Dashboard",
  components: {LayoutMenu},
  data() {
    return {
      activeRouterName: this.$route.name !== 'index' ? this.$route.name : 'home',
      lang: this.$i18n.defaultLocale,
      langList,
      mobileMenuDrawer: false,

      isLoggedIn: false,
    }
  },
  computed: {
    pageCode() {
      return pageCode
    },
    // isLoggedIn() {
    // this.$store.dispatch("user/checkToken")
    // return this.$store.getters["user/isLoggedIn"]
    // return false
    // }
  },
  watch: {
    $route(to, from) {
      this.activeRouterName = to.name !== 'index' ? to.name : 'home';
    },
  },
  methods: {
    changeLanguage() {
      this.$i18n.setLocale(this.lang)
    },
    signIn() {
      this.$router.push({ name: 'login' })
    },
    signOut() {
      this.$Message.info({
        content: 'sign out!',
        top: 150,
      })
    }
  }
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

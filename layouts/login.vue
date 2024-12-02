<template>
  <Layout>
    <LoginMenu layout-type="login"/>
    <Content>
      <Nuxt />
    </Content>
  </Layout>
</template>

<script>
import LoginMenu from "~/components/common/LoginMenu.vue";

export default {
  name: "Login",
  components: {LoginMenu}
}
</script>

<style scoped>
.ivu-layout{
  background: var(--bg-color);
  height: 100vh;
}
.ivu-layout-content{
  /*padding-top: 76px;*/
  /*padding: 120px 0 40px;*/
}
</style>

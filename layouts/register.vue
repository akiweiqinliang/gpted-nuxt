<template>
  <Layout>
    <LoginMenu layout-type="register"/>
    <Content>
      <Nuxt />
    </Content>
  </Layout>
</template>

<script>
import LoginMenu from "~/components/common/LoginMenu.vue";

export default {
  name: "Register",
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

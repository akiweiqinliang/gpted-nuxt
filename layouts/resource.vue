<template>
  <div>
    <Layout>
      <LayoutMenu />
      <Content>
        <Nuxt />
      </Content>
      <LayoutFooter />
    </Layout>
  </div>
</template>

<script>
import LayoutMenu from "~/components/common/LayoutMenu.vue";
import LayoutFooter from "~/components/common/LayoutFooter.vue";

export default {
  name: "Resource",
  components: {LayoutFooter, LayoutMenu},
}
</script>
<style scoped lang="scss">
.ivu-layout{
  //background: var(--bg-color);
  background: var(--light-color);
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

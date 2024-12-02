<template>
  <div>
    <Layout>
      <Content>
        <Nuxt />
      </Content>
      <LayoutFooter />
    </Layout>
  </div>
</template>

<script>
import LayoutFooter from "~/components/common/LayoutFooter.vue";

export default {
  name: "Translate",
  components: {LayoutFooter},
}
</script>
<style scoped lang="scss">
.ivu-layout{
  background: var(--bg-color);
  min-height: 100vh;
}
.ivu-layout-content{
  padding: 120px 0 40px;
}
@media screen and (max-width: 768px){

}
</style>

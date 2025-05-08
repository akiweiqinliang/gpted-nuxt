<template>
  <div id="activityPage">
    <section>
    <Row class="top">
      <div class="left">
        <h1 v-dompurify-html="$t('activity_slogan')"></h1>
      </div>
      <div class="right">
        <div class="imgBox"></div>
      </div>
    </Row>
    </section>
  </div>
</template>

<script>
export default {
  name: "ActivityPage"
}
</script>

<style scoped lang="scss">
#activityPage{
  background: linear-gradient( 180deg, #E8EDFF 0%, #F6F8FB 23%, #F6F8FB 41%, #FFFFFF 47%), #F6F8FB;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  padding: 44px 115px 0;
  margin-bottom: -40px;
}
.top{
  display: flex;
  flex-wrap: nowrap;
  height: 1000px;
  .left{
    padding-right: 66px;
    flex: 3;
  }
  .right{
    flex: 2;
    .imgBox{
      width: 100%;
      aspect-ratio: 557 / 418;
      background: var(--text-color3);
    }
  }
}
</style>

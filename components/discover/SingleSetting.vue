<template>
  <div class="singleSetting">
    <Row class-name="header" justify="space-between" align="middle">
      <Row class="title" align="middle">
        <div class="decBox"></div>
        <slot name="title">
        </slot>
      </Row>
      <div class="action">
        <slot name="action"></slot>
      </div>
    </Row>
    <Row class-name="content">
      <slot name="content"></slot>
    </Row>
  </div>
</template>

<script>
export default {
  name: "SingleSetting"
}
</script>

<style scoped lang="scss">
.singleSetting{
  width: 100%;
  background-color: var(--bg-color1);
  //border-radius: var(--border-radius-base);
  //border: 1px solid var(--border-color1);
  position: relative;
  .header{
    margin-bottom: 10px;
    .title{
      font-weight: bold;
      font-size: 14px;
      .decBox{
        width: 8px;
        height: 8px;
        background-color: var(--primary-color);
        margin-right: 4px;
        border-radius: 50%;
      }
    }
  }
  .content{
    width: 100%;
    margin-bottom: 26px;
  }
}

</style>

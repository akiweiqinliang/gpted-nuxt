<template>
  <div class="singleSetting">
    <Row class-name="header" justify="space-between" align="middle">
      <Row class="title" align="middle">
        <div class="decBox"></div>
        <span>{{ title }}</span>
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
  name: "SingleSetting",
  props: {
    title: {
      type: String,
      required: true,
      default() {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.singleSetting{
  width: 100%;
  background-color: var(--bg-color1);
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
  .action{
    cursor: pointer;
  }
  .content{
    width: 100%;
    margin-bottom: 26px;
  }
}
@media screen and (max-width: 768px){
  .singleSetting{
    .header{
      .title{
        font-size: 14px;
        .decBox{
          width: 8px;
          height: 8px;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>

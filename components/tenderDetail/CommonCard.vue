<template>
<div class="card">
  <Row class-name="header" justify="space-between" align="middle" :wrap="false">
    <div class="title" align="middle">
      <div class="decBox"></div>
      <slot name="title">
      </slot>
    </div>
    <div class="action">
      <slot name="action"></slot>
    </div>
  </Row>
  <Row class-name="cardContent">
    <slot name="content"></slot>
  </Row>
</div>
</template>

<script>
export default {
  name: "CommonCard"
}
</script>

<style scoped lang="scss">
.card{
  width: 100%;
  //overflow: hidden;
  background-color: var(--bg-color1);
  border-radius: var(--border-radius-base);
  border: 1px solid var(--border-color1);
  position: relative;
  .header{
    padding: 15px 30px 15px 0;
    border-bottom: 1px solid var(--border-color3);
    .title{
      display: flex;
      font-weight: bold;
      font-size: 18px;
      position: relative;
      padding-left: 26px;
      .decBox{
        position: absolute;
        left: 0;
        top: -4px;
        width: 6px;
        height: 36px;
        background-color: var(--primary-color);
      }
    }
  }
  .cardContent{
    width: 100%;
  }
}

@media screen and (max-width: 768px){
  .card .header {
    padding: 10px 15px 10px 0;
    .title{
      font-size: 11px;
      //padding: 0 15px 0 0;
      padding-left: 15px;
      .decBox{
        width: 3px;
        height: 18px;
        margin-right: 13px;
        top: 0;
      }
    }
    .action{
      display: flex;
      flex-wrap: nowrap;
    }
  }
}
</style>

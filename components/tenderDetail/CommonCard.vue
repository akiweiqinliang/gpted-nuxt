<template>
<div class="card">
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
      font-weight: bold;
      font-size: 18px;
      .decBox{
        width: 6px;
        height: 37px;
        background-color: var(--primary-color);
        margin-right: 26px;
      }
    }
  }
  .cardContent{
    width: 100%;
  }
}

@media screen and (max-width: 768px){
  .card .header .title{
    font-size: 22px;
  }
}
</style>

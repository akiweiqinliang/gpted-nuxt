<template>
  <div>
      <div class="container" >
        <div class="imageBox"></div>
        <h1>NO NOTICE</h1>
        You haven't received any notification yet
      </div>
  </div>
</template>

<script>
export default {
  name: "DashboardNotice",
}
</script>

<style scoped lang="scss">
.container{
  padding: 40px 40px 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
  h1{
    font-size: 14px;
    margin-bottom: 20px;
    margin-top: 30px;
    word-break: break-word;
    color: var(--text-color3);
  }

  #upgradeBtn {
    //padding: 8px 20px;
    height: auto;
    color: var(--primary-color);
    i {
      margin-left: 8px;
    }
  }
.imageBox{
  width: 368px;
  height: 312px;
  background: var(--primary-color);
}
</style>

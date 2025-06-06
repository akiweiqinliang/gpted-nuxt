<template>
  <div>
    <Card :padding="0" :dis-hover="true">
      <div class="container" >
        <div class="imageBox"></div>
        <h1>NO GROUPING</h1>
        You haven't created a group yet <Button id="upgradeBtn" type="text" @click="handleChange">Go to Create<Icon type="ios-arrow-round-forward" /></Button>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: "UserCenterBilling",
  methods: {
    handleChange() {
      this.$emit('change');
    }
  }
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

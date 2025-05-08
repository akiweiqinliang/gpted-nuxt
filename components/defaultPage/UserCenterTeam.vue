<template>
  <div>
    <Card class="container" :padding="0" :dis-hover="true">
      <Row align="middle">
        <div class="leftBox">
          <h1>Do you need more new features?</h1>
          <p>Upgrade your account to get the sub-account sharing member benefits feature</p>
          <Button id="upgradeBtn" type="primary">Upgrade account <Icon type="ios-arrow-round-forward" /></Button>
        </div>
        <div class="imageBox"></div>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: "UserCenterTeam"
}
</script>

<style scoped lang="scss">
.container{
  padding: 120px 80px 120px 60px;
}
.leftBox{
  flex: 1;
  margin-right: 50px;
  h1, p{
    word-break: break-word;
  }
  h1{
    font-size: 20px;
    margin-bottom: 20px;
  }
  p{
    font-size: 16px;
    color: var(--text-color3);
    margin-bottom: 50px;
  }
  #upgradeBtn{
    padding: 8px 20px;
    height: auto;
    i{
      margin-left: 8px;
    }
  }
}
.imageBox{
  width: 368px;
  height: 312px;
  background: var(--primary-color);
}
</style>

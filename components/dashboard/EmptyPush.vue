<template>
<div class="default">
  <template v-if="userType === 'normal'">
<!--    普通用户-->
    <Row class-name="normalBox">
      <Col flex="1">
        <h2>{{$t(normalUser.title)}}</h2>
        <p class="wrapper-mini">{{$t(normalUser.desc)}}</p>
        <Button type="primary" class="upgradeBtn">
          {{$t('upgradeAccount')}}
          <Icon type="md-arrow-round-forward" />
        </Button>
      </Col>
      <Col flex="none">
        <div class="imgBox"></div>
      </Col>
    </Row>
  </template>
  <template v-else>
<!--    会员-->
    <Row class-name="memberBox" justify="center" align="middle">
<!--      <Col>-->
        <div class="imgBox"></div>
        <h2 class="wrapper-default">{{$t(memberUser.title)}}</h2>
        <span class="wrapper-mini">
          {{$t(memberUser.desc)}}
          <span class="goToSettings">
            {{$t('goToSettings')}}
            <Icon type="md-arrow-round-forward" />
          </span>
        </span>
<!--      </Col>-->
    </Row>
  </template>
</div>
</template>

<script>
export default {
  name: "EmptyPush",
  props: {
    userType: {
      type: String,
      required: true,
      default() {
        return 'normal'
      }
    }
  },
  data() {
    return {
      normalUser: {
        title: '普通用户推送 缺省title',
        desc: '普通用户推送 缺省desc',
      },
      memberUser: {
        title: '会员用户推送 缺省title',
        desc: '会员用户推送 缺省desc',
      }
    }
  }
}
</script>

<style scoped lang="scss">
.default{
  padding: 128px 84px;
}
.normalBox{
  p{
    font-size: 16px;
    color: var(--text-color3);
  }
  .upgradeBtn{
    margin-top: 50px;
    padding: 10px 20px;
    height: auto;
  }
  .imgBox{
    width: 394px;
    height: 300px;
    background: var(--border-color);
    margin-left: 20px;
  }
}
.memberBox{
  flex-direction: column;
  .imgBox{
    width: 300px;
    height: 300px;
    background: var(--border-color);
  }
  h2{
    font-size: 14px;
    color: var(--text-color2);
  }
  span{
    color: var(--text-color3);
    font-size: 14px;
  }
  .goToSettings{
    color: var(--primary-color);
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>

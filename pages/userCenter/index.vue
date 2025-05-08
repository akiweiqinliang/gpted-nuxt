<template>
<div>
  <nuxt />
  <Card v-if="$route.name === pageCode.USERCENTER" :dis-hover="true" :padding="0" class="userCenterSettings">
    <Row justify="space-between" align="middle">
      <Row align="middle">
        <Avatar size="66" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
        <div class="topInfoBox">
          <span class="username">{{ userInfo.name }}</span>
          <span class="userLevel">{{ userInfo.level }}</span>
          <div class="bottom">
            <span class="userValidity">{{ userInfo.validity }}</span>
            <span class="renewalBtn">{{ $t('renewal') }}</span>
          </div>
        </div>
      </Row>
        <div class="enterTeamManagementBtn" @click="jumpRoutingByName(pageCode.USERCENTER_TEAM)">
          {{ $t('enterTeamManagement') }}
        </div>
    </Row>
    <Row class="infoBox" justify="space-between">
      <div class="leftContent">
        <span class="titleLabel">{{ $t('userCenter_username') }}</span>
        <span>{{ userInfo.name }}</span>
      </div>
      <div class="modifyBtn">
        <Icon type="md-create" />
        <span>{{ $t('modify') }}</span>
      </div>
    </Row>
    <Row class="infoBox" justify="space-between">
      <div class="leftContent">
        <span class="titleLabel">{{ $t('userCenter_company') }}</span>
        <span>{{ userInfo.company }}</span>
      </div>
      <div class="modifyBtn">
        <Icon type="md-create" />
        <span>{{ $t('modify') }}</span>
      </div>
    </Row>

    <Row class="infoBox" justify="space-between">
      <div class="leftContent">
        <span class="titleLabel">{{ $t('userCenter_industry') }}</span>
        <span :class="{'unSelect' : !userInfo.industry}">{{ userInfo.industry ? userInfo.industry : $t('userCenter_unSelectMsg') }}</span>
      </div>
      <div class="modifyBtn">
        <Icon type="md-create" />
        <span>{{ $t('modify') }}</span>
      </div>
    </Row>
    <Row class="infoBox" justify="space-between">
      <div class="leftContent">
        <span class="titleLabel">{{ $t('userCenter_email') }}</span>
        <span>{{ userInfo.email }}</span>
      </div>
      <div class="modifyBtn">
        <Icon type="md-create" />
        <span>{{ $t('modify') }}</span>
      </div>
    </Row>
    <Row class="infoBox" justify="space-between">
      <div class="leftContent">
        <span class="titleLabel">{{ $t('userCenter_phone') }}</span>
        <span>{{ userInfo.phone }}</span>
      </div>
      <div class="modifyBtn">
        <Icon type="md-create" />
        <span>{{ $t('modify') }}</span>
      </div>
    </Row>
    <Row class="infoBox" justify="space-between">
      <div class="leftContent">
        <span class="titleLabel">{{ $t('userCenter_password') }}</span>
        <span>{{ userInfo.password }}</span>
      </div>
      <div class="modifyBtn" @click="changePwdModal=true">
        <Icon type="md-create" />
        <span>{{ $t('modify') }}</span>
      </div>
    </Row>
  </Card>
  <Modal
    v-model="changePwdModal"
    :title="$t('userCenter_changePassword')"
    >
    <template slot="footer">
      <Row justify="center">
        <Button class="footerBtn" @click="changePwdModal = false">{{ $t('cancel') }}</Button>
        <Button type="primary" class="footerBtn" @click="handleChangePwd">{{ $t('confirm') }}</Button>
      </Row>
    </template>
    <div class="changePwdContentBox">
      <Row class="inputBox">
        <p>{{ $t('userCenter_currentPwd') }}</p>
        <Input password :placeholder="$t('userCenter_currentPwdPlaceholder')"/>
      </Row>
      <Row class="inputBox">
        <p>{{ $t('userCenter_newPwd') }}</p>
        <Input password :placeholder="$t('userCenter_newPwdPlaceholder')" />
      </Row>
      <Row class="inputBox">
        <p>{{ $t('userCenter_newPwd') }}</p>
        <Input password :placeholder="$t('userCenter_confirmPwdPlaceholder')" />
      </Row>
    </div>
  </Modal>
</div>
</template>

<script>
import {userInfo} from "~/enums/mockData";
import pageCode from "~/enums/pageCodes";
export default {
  name: "Index",
  layout: 'userCenter',
  data() {
    return {
      userInfo,
      changePwdModal: false,
    }
  },
  computed: {
    pageCode() {
      return pageCode
    },
  },
  methods: {
    jumpRoutingByName(routerName) {
      this.$router.push({ name: routerName })
    },
    handleChangePwd() {
      this.$Message.success(this.$t('userCenter_changePwdSuccess'))
      this.changePwdModal = false
    }
  }
}
</script>

<style scoped lang="scss">
.userCenterSettings{
  padding: 40px 50px 30px;
}
.topInfoBox{
  margin-left: 20px;
  .username{
    font-weight: bold;
    font-size: 18px;
    color: var(--text-color1);
    margin-right: 10px;
  }
  .userLevel{
    border: 1px solid #57C22D;
    border-radius: 40px;
    color: #57C22D;
    padding: 4px 10px;
  }
  .bottom{
    margin-top: 10px;
    .userValidity{
      color: var(--text-color2);
      margin-right: 6px;
    }
    .renewalBtn{
      color: var(--primary-color);
      cursor: pointer;
    }
  }
}
.enterTeamManagementBtn{
  background: var(--primary-bg-color1);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 10px 55px;
  border-radius: 3px;
  cursor: pointer;
  height: fit-content;
}
.infoBox{
  padding: 30px 0 30px 12px;
  border-bottom: 1px solid var(--border-color);
  position: relative;
  .leftContent{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 30px;
    .titleLabel{
      font-weight: bold;
    }
  }
  .modifyBtn{
    cursor: pointer;
    color: var(--text-color3);
    border: 1px solid var(--text-color3);
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 12px;
    i{
      margin-right: 2px;
    }
  }
  &::before{
    content: '';
    width: 4px;
    height: 16px;
    background: var(--primary-color);
    position: absolute;
    top: calc(50% - 8px);
    left: 0;
  }
  &:nth-last-child(1) {
    border-bottom: 0;
  }
}
.unSelect{
  color: var(--text-color3);
}
.inputBox{
  margin-bottom: 40px;
  p{
    margin-bottom: 12px;
    color: var(--text-color1);
  }
}
.changePwdContentBox {
  padding: 14px;
}
.footerBtn{
  padding: 12px;
  width: 120px;
  height: auto;
  margin: 0 5px;
}

</style>

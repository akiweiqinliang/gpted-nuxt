<template>
<div>
  <template v-if="memberInfoList.length > 1">
  <Row justify="space-between" align="middle" class="topHeader">
    <div>
    <span class="topTitle">{{ $t('userCenter_team_members') }}</span>
    <span class="memberNumMsg"><Icon type="md-information-circle" color="var(--primary-color)" /> {{ $t('userCenter_team_memberMsg', { number: memberNum }) }}</span>
    </div>
    <Button id="inviteBtn" type="primary" icon="md-person-add" @click="inviteModal = true">{{ $t('userCenter_inviteBtn_text') }}</Button>
  </Row>
  <ul class="memberList">
    <li v-for="member in memberInfoList" :key="`memberCenter-team-${member.id}`">
      <Card :dis-hover="true" :padding="40" class="memberItemCard">
        <Row align="middle">
          <Row class="leftInfo">
            <Avatar size="60" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
            <div class="memberInfo">
              <span class="memberName">{{ member.name }}<span class="userTip">{{ member.id === currentUserId ? $t('userCenter_team_you') : '' }}</span></span>
              <span class="memberEmail">{{ member.email }}</span>
              <div class="memberType">{{ memberType[member.type] }}</div>
            </div>
          </Row>
        <Dropdown trigger="click" placement="bottom-end" class="moreBtn">
          <Icon type="md-more" class="moreIcon" />
          <DropdownMenu slot="list">
            <div class="popBtn" @click="openModifyRoleModal(member.id)">
              <Icon type="ios-star"/>
              <span>modify role</span>
            </div>
            <div class="popBtnDivider"></div>
            <div class="popBtn" @click="openRemoveRoleModal(member.id)">
              <Icon type="ios-remove-circle-outline" />
              <span>remove</span>
            </div>
          </DropdownMenu>
        </Dropdown>
        </Row>
      </Card>
    </li>
  </ul>
  </template>
  <template v-else>
    <DefaultPageUserCenterTeam />
  </template>
  <Modal
    v-model="modifyRoleModal"
    :closable="true"
    :title="$t('userCenter_team_modifyModalTitle')"
    @on-ok="handleModifyRole"
    @on-cancel="modifyRoleModal = false">
    <div class="modifyRoleContentBox">
      <Row class="contentBoxWithDecorate" align="middle">
        <span>Selected role:</span>
        <span>{{ selectedRole.name }}</span>
      </Row>
      <RadioGroup v-model="selectCurrentRoleType">
        <Radio :label="0" class="adminRadioLabel">Administrators</Radio>
        <Radio :label="1">Member</Radio>
      </RadioGroup>
    </div>
      <template #footer>
        <Row justify="center">
          <Button class="footerBtn" @click="modifyRoleModal = false">{{ $t('cancel') }}</Button>
          <Button type="primary" class="footerBtn" @click="handleModifyRole">{{ $t('confirm') }}</Button>
        </Row>
      </template>
  </Modal>

  <Modal
    v-model="removeRoleModal"
    :closable="false"
    @on-ok="handleRemoveRole"
    @on-cancel="removeRoleModal = false">
    <div class="removeRoleContentBox">
        <span>Are you sure you want to remove <span class="removeUserName">{{ selectedRole.name }}</span> from the team？</span>
    </div>
    <template #footer>
      <Row justify="center">
        <Button class="footerBtn" @click="removeRoleModal = false">{{ $t('no') }}</Button>
        <Button type="primary" class="footerBtn" @click="handleRemoveRole">{{ $t('yes') }}</Button>
      </Row>
    </template>
  </Modal>
  <Modal
    v-model="inviteModal"
    :footer-hide="true"
    :title="$t('userCenter_team_inviteMember')"
    :closable="true"
    @on-cancel="inviteModal = false">
    <div class="inviteModalBox">
      <Row class="copyLinkBox">
        <div class="leftContent">
          <Row class="contentBoxWithDecorate" align="middle"><span>Invite via link</span></Row>
          <span class="validityMsg">Link validity period: <span>14 days</span></span>
        </div>
        <Button id="copyBtn" type="primary">Copy Link</Button>
      </Row>
      <Row class="contentBoxWithDecorate accountBox" align="middle"><span>Invite via account</span></Row>
      <Input placeholder="Invite members to join the team via mobile phone or email"></Input>
    </div>
  </Modal>
</div>
</template>

<script>
import {memberInfoList, userInfo} from "~/enums/mockData";

export default {
  name: "Team",
  layout: 'userCenter',
  data() {
    return {
      memberNum: 7,
      memberInfoList,
      currentUserId: userInfo.id,
      modifyRoleModal: false,
      selectedRole: {},
      selectCurrentRoleType: '',
      memberType: {
        0: 'Owner',
        1: 'Member',
      },
      removeRoleModal: false,
      inviteModal: false,
    }
  },
  methods: {
    openModifyRoleModal(userId) {
      this.selectedRole = memberInfoList.find(item => item.id === userId);
      this.selectCurrentRoleType = this.selectedRole.type;
      this.modifyRoleModal = true
    },
    openRemoveRoleModal(userId) {
      this.selectedRole = memberInfoList.find(item => item.id === userId);
      this.removeRoleModal = true
    },
    handleModifyRole() {
      this.$Message.success('Modify team role success!')
      this.modifyRoleModal = false
    },
    handleRemoveRole() {
      this.$Message.success('Remove team role success!')
      this.removeRoleModal = false
    }
  }
}
</script>

<style scoped lang="scss">
.topHeader{
  padding: 10px 30px 0;
  margin-bottom: 30px;
  .topTitle{
    font-weight: bold;
    font-size: 20px;
    margin-right: 32px;
  }
  .memberNumMsg{
    font-size: 16px;
    color: var(--text-color2);
  }
  #inviteBtn{
    padding: 8px 18px;
    height: auto;
    border-radius: 6px;
  }
}
.memberList{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.memberItemCard{
  height: 100%;
}
.leftInfo{
  flex: 1;
  .memberInfo{
    flex: 1;
    margin:0 16px;
    .memberName, .memberEmail{
      display: block;
      font-size: 16px;
      word-break: break-word;
    }
    .memberName{
      font-weight: bold;
      margin-bottom: 14px;
      .userTip{
        font-weight: 400;
        color: var(--text-color3);
      }
    }
    .memberEmail{
      color: var(--text-color2);
      margin-bottom: 20px;
    }
    .memberType{
      border-radius: 20px;
      padding: 4px 12px;
      background: var(--primary-bg-color1);
      color: var(--primary-color);
      display: inline-block;
    }
  }
}
.moreBtn{
  cursor: pointer;
  .moreIcon{
    font-size: 28px;
    color: var(--icon-color);
  }
  .popBtn{
    text-align: center;
    color: var(--icon-color);
    padding: 12px 30px;
    i{
      font-size: 16px;
      margin-right: 10px;
    }
    &:hover{
      color: var(--primary-color);
    }
  }
  .popBtnDivider{
    position: relative;
    width: calc(100% - 30px);
    left: 15px;
    height: 1px;
    background: var(--divider-color);
  }
}
.contentBoxWithDecorate{
  width: 100%;
  position: relative;
  padding-left: 12px;
  span{
    font-size: 13px;
  }
  span:nth-child(1) {
    font-weight: bold;
    margin-right: 10px;
  }
  &::before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 16px;
    background: var(--primary-color);
  }
}
.modifyRoleContentBox{
  display: flex;
  flex-direction: column;
  padding: 14px;
  .adminRadioLabel{
    margin-right: 60px;
  }
  .contentBoxWithDecorate{
    margin-bottom: 30px;
    span:nth-child(2) {
      color: var(--primary-color);
    }
  }
}
.removeRoleContentBox{
  padding: 26px 23px;
  margin: 14px;
  background: var(--text-bg-color1);
  text-align: center;
  border-radius: 6px;
  span{
    font-size: 13px;
  }
  .removeUserName{
    color: var(--primary-color);
  }
}
.footerBtn{
  height: 42px;
  line-height: 42px;
  width: 110px;
}
.leftContent{
  flex: 1;
}
#copyBtn{
  padding: 12px 48px;
  font-size: 13px;
  height: fit-content;
}
.inviteModalBox{
  padding: 14px;
  .copyLinkBox{
    margin-bottom: 50px;
    .leftContent{
      .contentBoxWithDecorate{
        margin-bottom: 18px;
      }
      .validityMsg{
        color: var(--text-color3);
        span{
          color: var(--primary-color);
        }
      }
    }
  }
  .accountBox{
    margin-bottom: 20px;
  }
}
</style>

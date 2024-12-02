<template>
<section>
  <Card :dis-hover="true" :padding="20">
    <Row align="middle" justify="space-around">
      <div class="tab" :class="{'tabActive': activeTabIndex === 0}" @click="activeTabIndex = 0">{{$t('subscriptionSettings')}}</div>
      <Divider type="vertical" />
      <div class="tab" :class="{'tabActive': activeTabIndex === 1}" @click="activeTabIndex = 1">{{$t('emailPushSettings')}}</div>
    </Row>
  </Card>
  <Card :dis-hover="true" :padding="30" class="wrapper-mini">
    <transition name="fade">
      <GroupEditor v-show="activeTabIndex === 0" />
    </transition>
    <transition name="fade">
      <EmailPushSettings v-show="activeTabIndex === 1"/>
    </transition>
  </Card>
</section>
</template>

<script>
import GroupEditor from "~/components/dashboard/settings/GroupEditor.vue";
import EmailPushSettings from "~/components/dashboard/settings/EmailPushSettings.vue";

export default {
  name: "Settings",
  components: {EmailPushSettings, GroupEditor},
  data() {
    return{
      activeTabIndex: 0,
    }
  }
}
</script>

<style scoped lang="scss">
section{
  padding: 34px 30px;
}
.tab{
  font-size: 16px;
  transition: all .3s;
  position: relative;
  font-weight: bold;
  color: var(--text-color2);
  cursor: pointer;
  &::after{
    content: '';
    position: absolute;
    bottom: -20px;
    width: 0;
    height: 3px;
    background: var(--primary-color);
    left: -10%;
    transition: all .3s;
  }
}
.tabActive{
  color: var(--text-color1);
  transition: all .3s;
  &::after{
    width: 120%;
    transition: all .3s;
  }
}
</style>

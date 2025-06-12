<template>
<div>
  <Row v-if="userType === 'member'" justify="space-between" align="middle">
    <Row v-if="!listEmpty" class-name="totalCount">
    <span class="countNum">{{totalResultCount}}</span><span>{{$t('result')}}</span>
    </Row>
    <Row v-if="listEmpty" class-name="totalCount">
      <span v-dompurify-html="$t('infoFound', { count: 0 })"></span>
    </Row>
    <Row>
      <DashboardFloatSubset
        @confirm="handleConfirmSubset"
        @restoreDefaults="handleRestoreDefaults"
      />
      <FloatScreen @confirm="handleConfirmScreen"/>
    </Row>
  </Row>
  <Card class="wrapper-mini card" :dis-hover="true" :padding="20">
    <SpinLoad ref="spin"/>
    <template v-if="!listEmpty && !loading" >
      <Divider plain :dashed="true" class="dividerText">{{refreshTime}} {{$t('update')}}</Divider>
      <ul class="wrapper-mini">
        <li v-for="tender in tenderList" :key="`${tender.id}-card`">
          <BidCard :tender="tender"/>
        </li>
        <Row justify="center">
          <Page :total="tenderList.length" />
        </Row>
      </ul>
    </template>
    <DashboardSubscription v-if="listEmpty" :user-type="userType" />
  </Card>

</div>
</template>

<script>
import { tenderList } from "~/enums/tenderList";
import DashboardSubscription from "~/components/defaultPage/DashboardSubscription.vue";
import FloatScreen from "~/components/dashboard/FloatScreen.vue";
import SpinLoad from "~/components/common/SpinLoad.vue";
export default {
  name: "SubscribePage",
  components: {SpinLoad, FloatScreen, DashboardSubscription},
  layout: 'dashboard',
  asyncData() {
    return{
      totalResultCount: 17004,
      refreshTime: '16:00',
      tenderList,
      listEmpty: false, // false / true
      userType: 'member', // 'member' / 'normal'
    }
  },
  data() {
    return {
      loading: false, // false / true
    }
  },
  methods: {
    handleRestoreDefaults() {
    //   todo 恢复默认列表
      this.loading = true
      // todo 模拟加载
      this.$refs.spin.start()
      setTimeout(() => {
        this.loading = false
        this.$refs.spin.finish()
      }, 2000)
    },
    handleConfirmSubset({ label }) {
      this.loading = true
      // todo 模拟加载
      this.$refs.spin.start()
      setTimeout(() => {
        this.loading = false
        this.$refs.spin.finish()
      }, 2000)
    },
    handleConfirmScreen(settings) {
      // console.log('settings', settings)
      // todo 模拟加载
      this.loading = true
      this.$refs.spin.start()
      setTimeout(() => {
        this.loading = false
        this.$refs.spin.finish()
      }, 2000)
    }
  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 768px) {
  .card{
    min-height: 258px;
  }
}
.totalCount{
  color: var(--text-color1);
  font-size: 14px;
  .countNum{
    color: var(--primary-color);
    font-weight: bold;
    margin-right: 4px;
  }
}
.actionBtn{
  margin-left: 10px;
  color: var(--text-color3);
  position: relative;
}
.dividerText{
  font-size: 12px;
  color: var(--icon-color);
  &::before, &::after{
    border-top: 1px dashed var(--icon-color);
  }
}
</style>

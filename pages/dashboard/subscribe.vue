<template>
<section>
  <Row v-if="userType === 'member'" justify="space-between" align="middle">
    <Row v-if="!listEmpty" class-name="totalCount">
    <span class="countNum">{{totalResultCount}}</span><span>{{$t('result')}}</span>
    </Row>
    <Row v-if="listEmpty" class-name="totalCount">
      <span v-dompurify-html="$t('infoFound', { count: 0 })"></span>
    </Row>
    <Row>
      <Button icon="ios-browsers" class="actionBtn">{{$t('subset')}}</Button>
      <Button icon="ios-funnel" class="actionBtn">{{$t('screen')}}</Button>
    </Row>
  </Row>
  <Card class="wrapper-mini" :dis-hover="true" :padding="20">
    <template v-if="!listEmpty" >
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
    <EmptyPush v-if="listEmpty" :user-type="userType" />
  </Card>

</section>
</template>

<script>
import { tenderList } from "~/enums/tenderList";
import EmptyPush from "~/components/dashboard/EmptyPush.vue";
export default {
  name: "SubscribePage",
  components: {EmptyPush},
  asyncData() {
    return{
      totalResultCount: 17004,
      refreshTime: '16:00',
      tenderList,
      listEmpty: false, // false / true
      userType: 'member', // 'member' / 'normal'
    }
  }
}
</script>

<style scoped lang="scss">
section{
  padding: 34px 30px;
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
}
.dividerText{
  font-size: 12px;
  color: var(--icon-color);
  &::before, &::after{
    border-top: 1px dashed var(--icon-color);
  }
}
</style>

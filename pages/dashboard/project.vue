<template>
  <div>
    <Row justify="space-between" align="middle">
      <Row v-if="!listEmpty" class-name="totalCount">
        <span class="countNum">{{totalResultCount}}</span><span>{{$t('result')}}</span>
      </Row>
      <Row v-if="listEmpty" class-name="totalCount">
        <span v-dompurify-html="$t('infoFound', { count: 0 })"></span>
      </Row>
      <Row>
<!--        <Button icon="ios-browsers" class="actionBtn">{{$t('clear history')}}</Button>-->
<!--        <Button icon="ios-funnel" class="actionBtn">{{$t('screen')}}</Button>-->
        <FloatScreen />
      </Row>
    </Row>
    <Card class="attachmentBox" :dis-hover="true" :padding="30">
      <ul>
        <li v-for="tender in showData" :key="`${tender.id}-card`">
          <BidCard :tender="tender"/>
        </li>
      </ul>
      <SpinLoad ref="loading" />
      <Row type="flex" justify="center" class="listPagination">
        <Page
          :current="currentPage"
          :total="total"
          :page-size="pageSize"
          simple
          @on-change="changePage"
        />
      </Row>
    </Card>
  </div>

</template>

<script>
import SpinLoad from "~/components/common/SpinLoad.vue";
import { tenderList } from "~/enums/tenderList";
import docIcon from '~/assets/imgs/svg/docx.svg';
import FloatScreen from "~/components/dashboard/FloatScreen.vue";
export default {
  name: 'Project',
  components: {FloatScreen, SpinLoad},
  layout: 'dashboard',
  asyncData({ $axios }) {
    //   axios获取消息列表
    return{
      totalResultCount: 17004,
      listEmpty: false, // false / true
    }
  },
  data() {
    return {
      //   分页器
      total: tenderList.length,
      pageSize: 9,
      currentPage: 1,
      // 列表加载样式
      msgLoading: false,
      viewOnlyUnread: false,
      showData: [],
      tenderList,
      docIcon,
    };
  },

  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.showData = this.tenderList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    // 改变当前页
    changePage(i) {
      this.currentPage = i;
      this.$refs.loading.start();
      this.loadData();
      setTimeout(() => {
        this.$refs.loading.finish();
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">

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
.listPagination {
  margin: 24px 0 8px;
}
.attachmentBox{
  margin-top: 20px;
  .attachmentItem{
    margin-bottom: 20px;
    padding: 24px 28px;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    img{
      width: 40px;
      height: 44px;
      margin-right: 20px;
    }
    p{
      font-size: 16px;
      color: var(--text-color1);
      margin-bottom: 4px;
      word-break: break-word;
    }
    span{
      color: var(--text-color3);
      font-size: 14px;
    }
    .docSize, .docDate{
      margin-right: 20px;
    }
  }
}
.divider{
  height: 1px;
  background: var(--border-color);
  margin: 0 10px;
}
.translateCountryList{
  display: inline;
  .translateCountryItem{
    margin-left: 10px;
    .countryFlag{
      margin-right: 10px;
    }
  }
}
.downloadLink{
  color: var(--primary-color);
  text-decoration: underline;
}
.moreBtn{
  i{
    font-size: 20px;
    color: var(--text-color3);
  }
}
</style>

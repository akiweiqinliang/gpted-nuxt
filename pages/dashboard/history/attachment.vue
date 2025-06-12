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
        <FloatClearHistory @clear="handleClearHistory" />
        <FloatScreen @restoreDefaults="loadData" @confirm="handleConfirmScreen"/>
      </Row>
    </Row>
    <Card class="attachmentBox" :dis-hover="true" :padding="30">
      <SpinLoad ref="loading" />
      <template v-if="showData.length === 0">
        <DefaultPageDashboardHistory />
      </template>
      <template v-if="showData.length > 0">
      <ul>
        <li v-for="doc in showData" :key="`history-attachment-${doc.id}`" class="attachmentItem">
          <Row align="middle">
            <Col flex="1">
              <Row align="top">
                <img :src="docIcon" alt="" />
                <Col flex="1">
                  <p>{{ doc.title }}</p>
                  <span class="docSize">{{ doc.size }}</span><span class="docDate">{{ doc.date }}</span>
                  <span :class="['fi', `fi-${doc.hostCountry.toLowerCase()}`, 'countryFlag']"></span>
                  <span>{{ $t(doc.hostCountry) }}</span>
                  <div class="translateCountryList">
                <span v-for="countryItem in doc.translateCountryList" :key="`translate-Country-List-${countryItem.id}`" class="translateCountryItem">
                  <span :class="['fi', `fi-${countryItem.iso.toLowerCase()}`, 'countryFlag']"></span>
                  <a class="downloadLink" href="downloadLink">{{ $t(countryItem.country) }}</a>
                </span>
                  </div>
                </Col>
              </Row>
            </Col>
            <Dropdown trigger="click">
              <div class="moreBtn">
                <Icon type="md-more" />
              </div>
              <DropdownMenu slot="list">
                <DropdownItem>{{ $t('Tendering') }}</DropdownItem>
                <div class="divider"></div>
                <DropdownItem>{{ $t('delete') }}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Row>
        </li>
      </ul>
      <Row type="flex" justify="center" class="listPagination">
        <Page
          :current="currentPage"
          :total="total"
          :page-size="pageSize"
          simple
          @on-change="changePage"
        />
      </Row>
      </template>
    </Card>
  </div>

</template>

<script>
import SpinLoad from "~/components/common/SpinLoad.vue";
import {historyAttachmentData} from "~/enums/mockData";
import docIcon from '~/assets/imgs/svg/docx.svg';
import FloatClearHistory from "~/components/dashboard/settings/FloatClearHistory.vue";
import FloatScreen from "~/components/dashboard/FloatScreen.vue";
export default {
  name: 'Attachment',
  components: {FloatScreen, FloatClearHistory, SpinLoad},
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
      total: historyAttachmentData.length,
      pageSize: 9,
      currentPage: 1,
      // 列表加载样式
      msgLoading: false,
      viewOnlyUnread: false,
      showData: [],
      historyAttachmentData,
      docIcon,
    };
  },

  mounted() {
    this.loadData();
  },
  methods: {
    mockLoading() {
      this.$refs.loading.start();
      this.loadData();
      setTimeout(() => {
        this.$refs.loading.finish();
      }, 1000);
    },
    handleConfirmScreen(settings) {
      // console.log('settings', settings)
      if(this.listEmpty) return
      // todo 模拟加载
      this.mockLoading();
    },
    loadData() {
      this.showData = this.historyAttachmentData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    // 改变当前页
    changePage(i) {
      this.currentPage = i;
      this.mockLoading()
    },
    handleClearHistory() {
      if(this.listEmpty) return
    //   todo: 清除历史记录
      this.$refs.loading.start();
      this.showData = [];
      this.total = 0;
      this.currentPage = 1;
      this.$refs.loading.finish();
      this.listEmpty = true; // 设置列表为空
    }
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

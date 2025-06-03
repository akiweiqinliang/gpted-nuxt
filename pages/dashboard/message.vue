<template>
  <section id="dashboardMessage" >
    <Row justify="space-between" align="middle">
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
    <Card class="wrapper-mini" :dis-hover="true" :padding="0">
      <List :border="false" :loading="msgLoading" class="messageList">
        <ListItem
          v-for="msg in viewOnlyUnread ? unReadMsgList : msgList"
          :key="`dashboard-message-${msg.id}`"
          class="messageItem"
          @click.native="intoMsgDetail(msg.id)"
        >
          <Row type="flex" align="middle" class="fullWidth">
            <Col class="left" flex="1">
              <Row type="flex" align="top">
                <Badge dot :count="msg.msgState ? 0 : 1">
                  <div v-if="msg.msgType === 0">
                    <Icon type="md-notifications" />
                  </div>
                  <div v-if="msg.msgType === 1">
                    <Icon type="logo-octocat" />
                  </div>
                </Badge>
                <Col flex="1" class="center">
                  <span :class="{'alreadyRead': msg.msgState }">{{ msg.msgTitle }}</span>
<!--                  <p>{{ msg.msgContent }}</p>-->
                </Col>
              </Row>
            </Col>
            <Col class="right updateTime"> 09:30 </Col>
          </Row>
        </ListItem>
      </List>
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
  </section>

</template>

<script>
import SpinLoad from "~/components/common/SpinLoad.vue";
import {dashboardMessageList} from "~/enums/mockData";

export default {
  name: 'MessagePage',
  components: {SpinLoad},
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
      total: 0,
      pageSize: 10,
      currentPage: 1,
      // 列表加载样式
      msgLoading: false,
      viewOnlyUnread: false,
      msgList: dashboardMessageList,
    };
  },
  computed: {
    unReadMsgList() {
      return this.msgList.filter((item) => !item.msgState);
    },
  },
  mounted() {
    this.loadMsgData();
  },
  methods: {
    intoMsgDetail(msgId) {
      this.msgList = this.msgList.map((item) => {
        if (item.id === msgId) {
          // 进行替换操作
          item.msgState = true;
          return item;
        }
        return item;
      });
    },
    cleanUnread() {
      // axios
      this.msgList = this.msgList.map((item) => {
        if (!item.msgState) {
          item.msgState = true;
        }
        return item;
      });
    },
    loadMsgData() {
      const data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      this.total = this.viewOnlyUnread
        ? this.unReadMsgList.length
        : this.msgList.length;
      const flag = true;
      if (flag) {
        return;
      }
      // 调用接口，加载数据
      this.$axios.post('/getMsgDataByPage', data).then((res) => {
        const msgs = res.data.records;
        this.total = res.data.total;
        this.msgList = msgs;
      });
    },
    // 改变当前页
    changePage(i) {
      this.currentPage = i;
      this.$refs.loading.start();
      setTimeout(() => {
        // this.msgList = [];
        this.loadMsgData();
      }, 200);
      setTimeout(() => {
        this.$refs.loading.finish();
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
.alreadyRead{
  color: var(--text-color3);
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
.msgPageHeader {
  padding: 16px 20px;
  .cleanUnreadText {
    cursor: pointer;
  }
  .cleanUnreadText:hover {
    color: var(--primary-color);
  }
}
.fullWidth {
  width: 100%;
}
.messageList {
  .messageItem:hover {
    background: var(--hover-bg-color1);
  }
  .messageItem::after {
    content: '';
    width: calc(100% - 40px);
    background: #f2f2f2;
    height: 1px;
    position: absolute;
    bottom: 0;
  }
  .messageItem {
    padding: 24px 20px;
    border-bottom: none;
    position: relative;
    .left {
      img {
        width: 44px;
        height: 44px;
      }
    }
    .center {
      margin: 0 16px;
      span {
        //color: #000;
        font-size: 18px;
        font-weight: 600;
      }
      p {
        color: var(--text-color2);
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
.listPagination {
  margin: 24px 0 8px;
}
</style>
<style lang="scss">
#dashboardMessage {
  .ivu-badge-dot {
    z-index: 8;
  }
}
</style>

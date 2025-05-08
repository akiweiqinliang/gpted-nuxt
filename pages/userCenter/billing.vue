<template>
<div id="billingPage">
  <template v-if="billData.length > 0">
  <Card :padding="30" :dis-hover="true">
    <Table :disabled-hover="true" :row-class-name="rowClassName" :columns="columns" :data="showBillData"></Table>
    <SpinLoad ref="loading" />
    <Row v-show="billData.length > pageSize" class="wrapper-mini" justify="center">
      <Page :current="currentPage" :total="total" :page-size="pageSize" simple @on-change="changePage"/>
    </Row>
  </Card>
  </template>
  <template v-else>
    <DefaultPageUserCenterBilling />
  </template>
</div>
</template>

<script>
import {billData} from "~/enums/mockData";
import SpinLoad from "~/components/common/SpinLoad.vue";
export default {
  name: "Settings",
  components: {SpinLoad},
  layout: 'userCenter',
  data() {
    return{
      billData,
      columns: [
        // {
        //   title: 'id',
        //   key: 'id'
        // },
        {
          title: this.$t('billing_orderNumber'),
          key: 'orderNumber',
          className: 'orderNumberStyle'
        },
        {
          title: this.$t('billing_productType'),
          key: 'productType'
        },
        {
          title: this.$t('billing_amount'),
          key: 'amount',
          width: 150,
        },
        {
          title: this.$t('billing_paymentMethod'),
          key: 'paymentMethod'
        },
        {
          title: this.$t('billing_transactionTime'),
          key: 'transactionTime'
        }
      ],
      currentPage: 1,
      total: billData.length,
      pageSize: 7,
      showBillData: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      // const data = {
      //   pageNum: this.currentPage,
      //   pageSize: this.pageSize,
      // };
      // 调用接口，加载数据
      // this.showBillData = this.billData.slice(this.pageSize * (this.currentPage - 1),this.pageSize * this.currentPage)
      const startIndex = this.pageSize * (this.currentPage - 1);
      const endIndex = startIndex + this.pageSize;
      this.showBillData = this.billData.slice(startIndex, endIndex);
    },
    rowClassName(row, index) {
        return 'commonRowStyle'
    },
    changePage(i) {
      this.currentPage = i;
      this.$refs.loading.start();
      setTimeout(() => {
        this.loadData();
      }, 200);
      setTimeout(() => {
        this.$refs.loading.finish();
      }, 1000);
    },
  }
}
</script>

<style lang="scss">
#billingPage {
  .ivu-table-header thead tr th {
    padding: 20px 0;
    color: var(--text-color2);
    background: var(--primary-bg-color1);
  }

  .tableHeaderStyle {
    padding: 20px;
    color: var(--text-color2);
    background: var(--primary-bg-color1);
  }

  .commonRowStyle td {
    padding: 24px 0;
  }

  .ivu-table-tbody .orderNumberStyle {
    color: var(--primary-color);
  }
}
</style>

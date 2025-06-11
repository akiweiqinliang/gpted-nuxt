<template>
<div id="memberPage">
  <div v-show="popWindowVisible" class="popWindow">
    <Icon type="md-close" class="closeBtn" @click="closePopWindow"/>
    <div class="left">
      <h1>{{ $t(selectPlan.title) }}</h1>
      <p>{{ $t(selectPlan.desc) }}</p>
      <div class="benefitList">
        <p v-for="(benefit, idx) in selectPlan.benefits" :key="`user-benefit-${idx}`"><Icon type="md-checkmark" color="var(--success-color)"/>{{$t(benefit)}}</p>
      </div>
    </div>
    <div class="right">
      <PlanPriceSelector @change="handleChoicePlanTime" />
    </div>
  </div>
    <Row class="top" justify="space-between">
      <Col flex="2">
        <h1>{{$t('member_salesPricing')}}</h1>
        <p class="wrapper-mini">{{$t('member_salesDesc')}}</p>
        <Button class="wrapper-default viewDetailBtn" @click="scrollToDetail">{{$t('member_viewDetailBtnText')}}<Icon type="md-arrow-down" /></Button>
      </Col>
      <Col flex="1">
        <div class="imgBox"></div>
      </Col>
    </Row>
    <Row class="wrapper-mini">
      <ul class="salesPlanList">
        <li v-for="plan in planList" :key="`sales-plan-${plan.id}`" class="salesPlanItem">
          <h1>{{$t(plan.title)}}</h1>
          <p>{{$t(plan.desc)}}</p>
          <Divider />
          <Row :wrap="false" align="middle">
            <span class="price">{{$t('member_price', {price: plan.price})}}</span><span>{{$t('year')}}</span>
          </Row>
          <div class="benefitList">
            <p v-for="(benefit, idx) in plan.benefits" :key="`user-benefit-${idx}`"><Icon type="md-checkmark" color="var(--success-color)"/>{{$t(benefit)}}</p>
          </div>
          <Button v-if="plan.id === 0" long size="large" class="wrapper-default freeToUseBtn" @click="toDiscover">{{$t('member_freeToUse')}}</Button>
          <Button v-else long size="large" class="wrapper-default vipBuyNowBtn" type="primary" ghost @click="setSelectPlan(plan)">{{$t('member_buyNow')}}</Button>
        </li>
      </ul>
    </Row>
    <Row justify="center" class="expandBtnBox">
      <div class="background-blobs">
        <div class="blob"></div>
        <div class="blob"></div>
        <div class="blob"></div>
      </div>
      <Button class="expandBtn" shape="circle" @click="checkTable = !checkTable"><Icon :type="checkTable ? 'md-remove' : 'md-add'" />{{ checkTable ?  $t('member_closeBtnText') : $t('member_expandBtnText')}}</Button>
    </Row>
    <div ref="memberTable">
      <div v-show="checkTable" class="topTitles" :class="!showFloatChoice ? '' : 'topTitlesFloat'">
        <div class="topTitleBox">
          <div class="functionalComparison">{{$t('member_functionalComparison')}}</div>
          <div v-for="plan in planList" :key="`salePlans-${plan.id}`" class="planItemStyle">
            <span>{{$t(plan.tableTitleKey)}}</span>
            <p>{{$t('member_price', { price: plan.price })}} {{$t('year')}}</p>
            <Button v-if="plan.id === 0" class="wrapper-mini" long size="large" @click="toDiscover">{{$t('member_freeToUse')}}</Button>
            <Button v-else class="wrapper-mini" long size="large" type="primary" ghost @click="setSelectPlan(plan)">{{$t('member_buyNow')}}</Button>
          </div>
        </div>
      </div>
      <div v-show="checkTable" class="tableContainer">
        <table>
          <tbody>
          <tr class="tableSecondTitle">
            <td>基础功能</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr
            v-for="(item, index) in priceDetailData.base"
            :key="`priceBase-${index}`"
          >
            <td>
              <Row justify="space-between" align="middle">
             <span>{{ item.name }}</span>
                <Tooltip max-width="200" content="conte ntssssssssss ssssssssssssssssssssss ssssssssssssssss" placement="top">
                  <Icon type="md-information-circle" color="var(--icon-color3)"/>
                </Tooltip>
              </Row>
            </td>
            <td>{{ item.base }}</td>
            <td>{{ item.vip }}</td>
            <td>{{ item.svip }}</td>
          </tr>
          <tr class="tableSecondTitle">
            <td>高级功能</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr
            v-for="(item, index) in priceDetailData.svip"
            :key="`priceSVIP-${index}`"
          >
            <td>
              <Row justify="space-between" align="middle">
                <span>{{ item.name }}</span>
                <Tooltip max-width="200" content="conte ntssssssssss ssssssssssssssssssssss ssssssssssssssss" placement="top">
                  <Icon type="md-information-circle" color="var(--icon-color3)"/>
                </Tooltip>
              </Row>
            </td>
            <td>{{ item.base }}</td>
            <td>{{ item.vip }}</td>
            <td>{{ item.svip }}</td>
          </tr>
          <tr class="tableSecondTitle">
            <td>xx功能</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr
            v-for="(item, index) in priceDetailData.vip"
            :key="`priceVIP-${index}`"
          >
            <td>
              <Row justify="space-between" align="middle">
                <span>{{ item.name }}</span>
                <Tooltip max-width="200" content="conte ntssssssssss ssssssssssssssssssssss ssssssssssssssss" placement="top">
                  <Icon type="md-information-circle" color="var(--icon-color3)"/>
                </Tooltip>
              </Row>
            </td>
            <td>{{ item.base }}</td>
            <td>{{ item.vip }}</td>
            <td>{{ item.svip }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  <Row class="commonProblem">
    <Col span="24">
      <div class="titleContainer">
        <span>{{$t('member_frequentlyAskedQuestions')}}</span>
      </div>
      <Collapse simple class="problemList" accordion>
        <Panel
          v-for="(problem, index) in commonProblemList"
          :key="`commonProblem-${index}`"
          :name="$t(problem.title)"
        >
          <span>{{ $t(problem.title) }}</span>
          <p slot="content">{{ problem.content }}</p>
        </Panel>
      </Collapse>
    </Col>
  </Row>
</div>
</template>

<script>
import PlanPriceSelector from "~/components/member/PlanPriceSelector.vue";
import pageCode from "~/enums/pageCodes";

export default {
  name: "MemberPage",
  components: {PlanPriceSelector},
  data() {
    return {
      popWindowVisible: false,
      salesPlans: {
        regular: {
          id: 0,
          title: 'regular_title',
          desc: 'regular_desc',
          price: 0,
          tableTitleKey: 'member_freeVersion',
          benefits: [
            'member_benefit1',
            'member_benefit2',
            'member_benefit3',
          ]
        },
        vip: {
          id: 1,
          title: 'vip_title',
          desc: 'vip_desc',
          price: 29999,
          tableTitleKey: 'member_standardVersion',
          benefits: [
            'member_benefit1',
            'member_benefit2',
            'member_benefit3',
            'member_benefit4',
            'member_benefit5',
            'member_benefit6',
            'member_benefit7',
            'member_benefit8',
          ]
        },
        svip: {
          id: 2,
          title: 'svip_title',
          desc: 'svip_desc',
          price: 49999,
          tableTitleKey: 'member_professionalVersion',
          benefits: [
            'member_benefit1',
            'member_benefit2',
            'member_benefit3',
            'member_benefit4',
            'member_benefit5',
            'member_benefit6',
            'member_benefit7',
            'member_benefit8',
            'member_benefit9',
            'member_benefit10',
          ]
        }
        ,
      },
      selectPlan: {}, // 用户当前选择的计划
      //   table
      checkTable: false,
      showFloatChoice: false,
      columns: [
        {
          title: '功能列表',
          key: 'name',
        },
        {
          title: '普通用户',
          key: 'base',
          className: 'demo-table-info-column',
        },
        {
          title: 'VIP用户',
          key: 'vip',
        },
        {
          title: 'SVIP用户',
          key: 'svip',
        },
      ],
      priceDetailData: {
        base: [
          {
            name: '标讯搜索',
            base: '500条',
            vip: '不限',
            svip: '不限',
          },
          {
            name: '标讯详情',
            base: 'false',
            vip: '不限',
            svip: '不限',
          },
          {
            name: '标讯搜索',
            base: '500条',
            vip: '不限',
            svip: '不限',
          },
        ],
        vip: [
          {
            name: '标讯搜索',
            base: '500条',
            vip: '不限',
            svip: '不限',
          },
          {
            name: '标讯详情',
            base: 'false',
            vip: '不限',
            svip: '不限',
          },
          {
            name: '标讯搜索',
            base: '500条',
            vip: '不限',
            svip: '不限',
          },
          {
            name: '标讯搜索',
            base: '500条',
            vip: '不限',
            svip: '不限',
          },
          {
            name: '标讯详情',
            base: 'false',
            vip: '不限',
            svip: '不限',
          },
          {
            name: '标讯搜索',
            base: '500条',
            vip: '不限',
            svip: '不限',
          },
        ],
        svip: [
          {
            name: '标讯搜索',
            base: '500条',
            vip: '不限',
            svip: '不限',
          },
          {
            name: '标讯详情',
            base: 'false',
            vip: '不限',
            svip: '不限',
          },
          {
            name: '标讯搜索',
            base: '500条',
            vip: '不限',
            svip: '不限',
          },
          {
            name: '标讯搜索',
            base: '500条',
            vip: '不限',
            svip: '不限',
          },
          {
            name: '标讯详情',
            base: 'false',
            vip: '不限',
            svip: '不限',
          },
          {
            name: '标讯搜索',
            base: '500条',
            vip: '不限',
            svip: '不限',
          },
        ],
      },
      //   common problem
      commonProblemList: [
        {
          title: 'member_question1',
          content: 'nothing',
        },
        {
          title: 'member_question2',
          content: 'nothing',
        },
        {
          title: 'member_question3',
          content: 'nothing',
        },
        {
          title: 'member_question4',
          content: 'nothing',
        },
        {
          title: 'member_question5',
          content: 'nothing',
        },
      ],
    }
  },
  computed: {
    planList() {
      return [
        this.salesPlans.regular,
        this.salesPlans.vip,
        this.salesPlans.svip
      ]
    },
  },
  mounted() {
    window.addEventListener('scroll', this.changeShowFloatChoice);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.changeShowFloatChoice);
  },
  methods: {
    scrollToDetail() {
      const scrollThreshold = 200; // 滚动距离阈值（单位：像素）
      this.checkTable = true;
      window.scrollTo({
        top: this.$refs.memberTable.offsetTop - scrollThreshold,
        behavior: 'smooth'
      })
    },
    changeShowFloatChoice() {
      this.showFloatChoice = window.scrollY + 76 > this.$refs.memberTable.offsetTop;
    },
    toDiscover() {
      this.$router.push({ name: pageCode.DISCOVER})
    },
    setSelectPlan(plan) {
      this.selectPlan = plan;
      this.popWindowVisible = true;
    },
    closePopWindow() {
      this.popWindowVisible = false;
      this.selectPlan = {};
    },
    handleChoicePlanTime(val) {
      this.selectPlan.type = val;
      this.$Message.success('你选择了'+ (val === 'monthly' ? '月付' : '年付') + '计划');
    },
  }
}
</script>

<style scoped lang="scss">
.top{
  margin: 0 200px;
  h1{
    font-size: 48px;
    margin-top: 60px;
  }
  p{
    color: var(--text-color2);
    font-size: 16px;
  }
  .imgBox{
    width: 100%;
    aspect-ratio: 1 / 1;
    background: #eef1f3;
  }
  .viewDetailBtn{
    border-radius: 6px 6px 6px 6px;
    border: 1px solid var(--primary-color);
    background: var(--primary-bg-color1);
    padding: 14px 20px;
    font-size: 18px;
    color: var(--primary-color);
    height: auto;
    i{
      margin-left: 16px;
    }
  }
}
.salesPlanList{
  z-index: 1;
  margin: 0 200px;
  display: flex;
  width: 100%;
  .salesPlanItem{
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--light-color);
    box-shadow: 0 0 19px 0 rgba(0,0,0,0.1);
    border-radius: 10px;
    padding: 30px;
    .price{
      margin-right: 10px;
      font-weight: bold;
      font-size: 32px;
    }
    .benefitList{
      flex-grow: 1;
      p{
        margin-top: 28px;
        color: var(--text-color5);
        i{
          font-size: 20px;
          font-weight: bold;
          margin-right: 12px;
        }
      }
    }
    &:nth-child(2){
      margin: 0 36px;
    }
  }
}
.expandBtn{
  //background: rgba(255,255,255,0.5);
  background: var(--light-color);
  border: 1px solid var(--primary-color);
  z-index: 1;
  margin-top: 92px;
  i{
    font-size: 16px;
    color: var(--primary-color);
    margin-right: 10px;
  }
}

</style>
<style scoped lang="scss">
.topTitles .topTitleBox{
  position: relative;
  display: flex;
  margin: 30px 200px 0;
  background: var(--bg-color1);
  border-radius: 10px 10px 0 0;
  border: 1px solid var(--border-color);
  border-bottom: 0;
  transition: all .5s;
  .planItemStyle{
    display: flex;
    flex-direction: column;
    p{
      flex-grow: 1;
    }
  }
  .functionalComparison{
    font-weight: bold;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  >div{
    width: 25%;
    border-right: 1px solid var(--border-color);
    padding: 30px;
    text-align: center;
    &:nth-child(1) {
      text-align: left;
    }
    &:nth-last-child(1) {
      border-right: 0;
    }
    span{
      font-weight: bold;
    }
    p{
      color: var(--text-color2);
    }
  }
}
.topTitlesFloat .topTitleBox{
  margin: 0;
  border: none;
  transition: all .5s;
}
.topTitlesFloat{
  position: sticky;
  transition: all .5s;
  top: 76px;
  background: var(--bg-color1);
  width: 100vw;
  left: 0;
  right: 0;
  margin: 0;
  z-index: 10;
  padding: 0 200px;
  border-radius: 0;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.08);
}
.tableContainer {
  width: calc(100% - 400px);
  border-radius: 0 0 10px 10px;
  border: 1px solid var(--border-color);
  border-top: 0;
  //overflow: hidden;
  margin: 0 200px 12px;
  background: var(--light-color);
  position: relative;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    font-size: 16px;
    font-weight: bold;
  }
  th:nth-child(1) {
    text-align: left;
    font-weight: bold;
    font-size: 24px;
  }
  th,
  td {
    padding: 20px;
    width: 25%;
  }
  td {
    border-right: 1px solid var(--border-color);
    &:nth-last-child(1) {
      border-right: none;
    }
  }
  .tableSecondTitle td {
    color: var(--primary-color);
    font-size: 18px;
    background: var(--primary-bg-color1);
  }
  tr > td {
    text-align: center;
  }
  tr > td:nth-child(1) {
    text-align: left;
  }
  tr > td:nth-child(2) {
    box-shadow: inset 10px 0 17px -20px rgba(0, 0, 0, 0.3);
  }
}
.expandBtnBox{
  position: relative;
  .background-blobs {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* 允许点击穿透 */
    z-index: 0;
  }
  .blob {
    position: absolute;
    filter: blur(40px);
    &:nth-child(1) {
      width: 170px;
      height: 65px;
      background: rgba(246, 138, 37, 0.15);
      bottom: -5%;
      left: calc(40% - 40px);
    }
    &:nth-child(2) {
      width: 120px;
      height: 50px;
      background: rgba(255, 100, 150, 0.15);
      bottom: -45%;
      left: 47%;
    }
    &:nth-child(3) {
      width: 150px;
      height: 55px;
      bottom: -20%;
      left: 55%; background: rgba(100, 149, 255, 0.15);
    }
  }
}
.commonProblem{
  margin: 90px 156px;
  .titleContainer{
    text-align: center;
    margin-bottom: 70px;
    span{
      font-size: 30px;
      font-weight: bold;
    }
  }
  .problemList{
    background: transparent;
    .ivu-collapse-content{
      background: transparent;
    }
  }
}
</style>
<style lang="scss">
#memberPage{
  .ivu-collapse-content{
    background: transparent;
  }
  .ivu-collapse-header{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    padding: 48px 40px;
    font-size: 20px;
    color: var(--text-color1);
    i{
      font-size: 28px;
      color: var(--text-color3);
    }
  }
  .ivu-collapse-content{
    padding: 0 40px 48px;
    font-size: 18px;
  }
  .ivu-collapse-content-box{
    padding: 0;
  }
}

.popWindow{
  position: fixed;
  width: 58%;
  //min-height: 648px;
  top: 12%;
  left: 21%;
  background: var(--bg-color1);
  box-shadow: 0 0 19px 0 rgba(0,0,0,0.1);
  border-radius: 10px;
  z-index: 19;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  .closeBtn{
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 30px;
    color: var(--text-color3);
    cursor: pointer;
  }
  .left{
    border-right: 1px solid var(--border-color);
    padding: 34px 40px;
    width: 36%;
    background: #FBFBFB;
    h1{
      font-size: 26px;
    }
    p{
      color: var(--text-color2);
      font-size: 14px;
      margin-bottom: 32px;
    }
    .benefitList{
      flex-grow: 1;
      p{
        margin-bottom: 28px;
        color: var(--text-color5);
        i{
          font-size: 20px;
          font-weight: bold;
          margin-right: 12px;
        }
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
  .right{
    width: 64%;
    padding: 38px 22px 26px;
  }
}
@media screen and (max-width: 1200px){
  #memberPage .topTitlesFloat{
    padding: 0 150px;
  }
}

@media screen and (max-width: 1060px){
  #memberPage .topTitlesFloat{
    padding: 0 130px;
  }
}
@media screen and (max-width: 992px){
  #memberPage .topTitlesFloat{
    top: 50px;
    padding: 0 80px;
  }
}
</style>

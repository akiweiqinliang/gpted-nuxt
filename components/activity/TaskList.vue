<template>
<div>
  <Row class="pageMiddle">
    <div class="partTitle">Task List</div>
    <Row class="equityList">
      <Row
        v-for="equityItem in userEquityData"
        :key="`equityData-${equityItem.id}`"
        class="equityItemStyle"
        type="flex"
        align="middle"
      >
        <div class="leftIcon"></div>
<!--          <Icon :type="equityItem.icon" />-->
        <Col flex="1" class="rightEquityDetail">
          <Row type="flex" align="bottom">
            <Col flex="1" class="equityInnerDetail">
              <Row type="flex" align="middle" justify="space-between">
                <Row>
                  <div class="equityName">{{ equityItem.title }}</div>
                  <div class="equityTimes">{{ equityItem.countText }}</div>
                </Row>
                <div v-if="equityItem.total !== 0" class="usedTotal">{{ equityItem.used }} / {{ equityItem.total }}</div>
                <div v-else class="usedTotal usedTotalGo">go <Icon type="ios-arrow-round-forward" /></div>
              </Row>
              <Progress
                :percent="(equityItem.used / equityItem.total) * 100"
                stroke-color="var(--success-color)"
                :stroke-width="6"
                hide-info
                class="progressStyle"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  </Row>
</div>
</template>

<script>
export default {
  name: "TaskList",
  data() {
    return{
      userinfo: {
        userType: 1, // 免费版-1, 标准版-2， 专业版-3
        expireDate: '2024 - 11 - 20',
      },
      // 普通版免费权益 免费版-1
      freeEquityData: [
        {
          id: 0,
          title: '注册',
          icon: 'free-register',
          isDone: true,
          total: 3,
          used: 2,
          countText: '+3次查看标讯',
          equityDetailList: [
            {
              id: 0,
              content: '开通会员，即可获得更多权益',
            },
          ],
        },
        {
          id: 1,
          title: '填写企业信息',
          icon: 'free-corporateInfo',
          isDone: false,
          total: 3,
          used: 0,
          countText: '+3次查看标讯',
          equityDetailList: [
            {
              id: 0,
              content: '开通会员，即可获得更多权益',
            },
          ],
        },
        {
          id: 2,
          title: '关注公众号',
          icon: 'free-follow',
          isDone: true,
          total: 3,
          used: 3,
          countText: '+3次查看标讯',
          equityDetailList: [
            {
              id: 0,
              content: '开通会员，即可获得更多权益',
            },
          ],
        },
        {
          id: 3,
          title: '下载移动端',
          icon: 'free-download',
          isDone: true,
          total: 3,
          used: 2,
          countText: '+3次查看标讯',
          equityDetailList: [
            {
              id: 0,
              content: '开通会员，即可获得更多权益',
            },
          ],
        },
        {
          id: 4,
          title: '绑定邮箱',
          icon: 'free-email',
          isDone: true,
          total: 3,
          used: 3,
          countText: '+3次查看标讯',
          equityDetailList: [
            {
              id: 0,
              content: '开通会员，即可获得更多权益',
            },
          ],
        },
        {
          id: 5,
          title: '填写调研问卷',
          icon: 'free-questionnaire',
          isDone: true,
          total: 3,
          used: 1,
          countText: '+3次查看标讯',
          equityDetailList: [
            {
              id: 0,
              content: '开通会员，即可获得更多权益',
            },
          ],
        },
        {
          id: 6,
          title: '每日签到',
          icon: 'free-signIn',
          isDone: true,
          total: 1,
          used: 1,
          countText: '+1次查看标讯',
          equityDetailList: [
            {
              id: 0,
              content: '开通会员，即可获得更多权益',
            },
          ],
        },
        {
          id: 7,
          title: '分享标讯',
          icon: 'free-share',
          isDone: false,
          total: 1,
          used: 0,
          countText: '+1次查看标讯',
          equityDetailList: [
            {
              id: 0,
              content: '开通会员，即可获得更多权益',
            },
          ],
        },
      ],
      freeEquityDataEnLang: [
        {
          id: 0,
          title: 'Register',
          icon: 'free-register',
          isDone: true,
          total: 3,
          used: 2,
          countText: '+3 opportunities',
          equityDetailList: [
            {
              id: 0,
              content: 'Open a membership to get more rights',
            },
          ],
        },
        {
          id: 1,
          title: 'Perfect information',
          icon: 'free-corporateInfo',
          isDone: false,
          total: 3,
          used: 2,
          countText: '+3 opportunities',
          equityDetailList: [
            {
              id: 0,
              content: 'Open a membership to get more rights',
            },
          ],
        },
        {
          id: 2,
          title: 'Bind email',
          icon: 'free-follow',
          isDone: true,
          total: 3,
          used: 3,
          countText: '+3 opportunities',
          equityDetailList: [
            {
              id: 0,
              content: 'Open a membership to get more rights',
            },
          ],
        },
        {
          id: 3,
          title: 'View bidding',
          icon: 'free-download',
          isDone: true,
          total: 3,
          used: 2,
          countText: '+3 opportunities',
          equityDetailList: [
            {
              id: 0,
              content: 'Open a membership to get more rights',
            },
          ],
        },
        {
          id: 4,
          title: 'Collection bidding',
          icon: 'free-email',
          isDone: true,
          total: 0,
          used: 0,
          countText: '+1 opportunities',
          equityDetailList: [
            {
              id: 0,
              content: 'Open a membership to get more rights',
            },
          ],
        },
        {
          id: 5,
          title: 'Share bidding',
          icon: 'free-questionnaire',
          isDone: true,
          total: 1,
          used: 1,
          countText: '+1 opportunities',
          equityDetailList: [
            {
              id: 0,
            }
            ]
        }
        ],
      // 用户权益记录数据 标准版-2
      normalEquityData: [
        {
          id: 0,
          title: '查看附件文件',
          total: 10,
          used: 10,
          countText: '10次/天',
          equityDetailList: [
            {
              id: 0,
              content: '等待次日早上5:00恢复权益',
            },
            {
              id: 1,
              content: '升级为专业版会员，即可获得更多权益',
            },
          ],
        },
        {
          id: 1,
          title: '附件文件翻译',
          total: 3,
          used: 2,
          countText: '3次/天',
          equityDetailList: [
            {
              id: 0,
              content: '等待次日早上5:00恢复权益',
            },
            {
              id: 1,
              content: '升级为专业版会员，即可获得更多权益',
            },
          ],
        },
        {
          id: 2,
          title: '关键词订阅',
          total: 200,
          used: 10,
          countText: '200/个',
          equityDetailList: [
            {
              id: 0,
              content: '升级为专业版会员，即可获得更多权益',
            },
          ],
        },
        {
          id: 3,
          title: '导出数据',
          total: 100,
          used: 50,
          countText: '100次/天',
          equityDetailList: [
            {
              id: 0,
              content: '等待次日早上5:00恢复权益',
            },
            {
              id: 1,
              content: '升级为专业版会员，即可获得更多权益',
            },
          ],
        },
        {
          id: 4,
          title: '企业情报监控',
          total: 10,
          used: 10,
          countText: '10家/同时',
          equityDetailList: [
            {
              id: 0,
              content: '升级为专业版会员，即可获得更多权益',
            },
          ],
        },
        {
          id: 5,
          title: '项目进度监控',
          total: 10,
          used: 5,
          countText: '10项/同时',
          equityDetailList: [
            {
              id: 0,
              content: '升级为专业版会员，即可获得更多权益',
            },
          ],
        },
      ],
      // 用户权益记录数据 专业版-3
      majorEquityData: [
        {
          id: 0,
          title: '查看附件文件',
          total: 100,
          used: 100,
          countText: '100次/天',
          equityDetailList: [
            {
              id: 0,
              content: '等待次日早上5:00恢复权益',
            },
          ],
        },
        {
          id: 1,
          title: '附件文件翻译',
          total: 10,
          used: 5,
          countText: '10次/天',
          equityDetailList: [
            {
              id: 0,
              content: '等待次日早上5:00恢复权益',
            },
          ],
        },
        {
          id: 2,
          title: '关键词订阅',
          total: 500,
          used: 500,
          countText: '500/个',
          equityDetailList: [],
        },
        {
          id: 3,
          title: '导出数据',
          total: 500,
          used: 50,
          countText: '500次/天',
          equityDetailList: [
            {
              id: 0,
              content: '等待次日早上5:00恢复权益',
            },
          ],
        },
        {
          id: 4,
          title: '企业情报监控',
          total: 50,
          used: 50,
          countText: '50家/同时',
          equityDetailList: [],
        },
        {
          id: 5,
          title: '项目进度监控',
          total: 10,
          used: 5,
          countText: '50项/同时',
          equityDetailList: [],
        },
      ],
    }
  },
  computed: {
    userEquityData() {
      return this.userinfo.userType === 1 ? this.freeEquityDataEnLang : (this.userinfo.userType === 2 ? this.normalEquityData : this.majorEquityData);
    }
  }
}
</script>

<style scoped lang="scss">
.pageMiddle{
  margin-bottom: 90px;
  padding: 87px 68px 43px;
  box-shadow: 0px 4px 16px 0px rgba(4,38,104,0.1), inset 0px 0px 18px 0px #FFFFFF;
  border-radius: 10px;
  position: relative;
  .partTitle {
    position: absolute;
    width: 40%;
    left: 30%;
    top: -30px;
    color: #fff;
    background: var(--primary-color);
    font-size: 28px;
    font-weight: 600;
    aspect-ratio: 450 / 79;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
  }
}
.equityList {
  width: 100%;
  .equityItemStyle {
    width: calc(50% - 21px);
    margin-left: 15px;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
    background: #F9F9F9;
    .leftIcon {
      width: 90px;
      height: 90px;
      background: var(--primary-bg-color2);
    }
    .rightEquityDetail {
      margin-left: 20px;
      width: calc(100% - 110px);
      .equityInnerDetail {
        margin-right: 10px;
        .equityName {
          font-size: 16px;
          margin-right: 8px;
          color: #000;
        }
        .equityTimes {
          font-size: 13px;
          margin-right: 24px;
          color: #FFB803;
        }
        .usedTotal{
          font-size: 13px;
          color: var(--text-color3);
        }
        .usedTotalGo{
          color: var(--primary-color);
          cursor: pointer;
        }
        .progressStyle {
          margin-top: 10px;
        }
      }
    }
  }
  .equityItemStyle:nth-child(odd) {
    margin-right: 15px;
    margin-left: 0;
  }
}
</style>

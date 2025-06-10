<template>
  <div class="tenderCard">
    <div v-show="!hideMask" class="uninterestedMask">
      <Row>
        <Col flex="1">
          <h3>Not interested in content</h3>
          <p>This type of content will be recommended less</p>
        </Col>
        <Col flex="none">
          <div class="revocationBtn" @click="handleRevocation">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Frame">
                <g id="Group 6870">
                  <g id="Vector">
                    <path d="M12.175 4.53147H6.0225L7.8625 3.32397C8.15 3.15147 8.2075 2.80647 8.035 2.51897C7.8625 2.23147 7.5175 2.17397 7.23 2.34647L3.78 4.64647C3.6075 4.76147 3.55 4.93397 3.55 5.10647C3.55 5.27897 3.665 5.45147 3.78 5.56647L7.23 7.86647C7.2875 7.98147 7.4025 7.98147 7.5175 7.98147C7.69 7.98147 7.8625 7.86647 7.9775 7.75147C8.15 7.46397 8.0925 7.11897 7.805 6.94647L5.9075 5.68147H12.175C14.705 5.68147 16.775 7.75147 16.775 10.2815C16.775 12.8115 14.705 14.8815 12.175 14.8815H1.825C1.48 14.8815 1.25 15.1115 1.25 15.4565C1.25 15.8015 1.48 16.0315 1.825 16.0315H12.175C15.3375 16.0315 17.925 13.444 17.925 10.2815C17.925 7.11897 15.3375 4.53147 12.175 4.53147Z" fill="#333333"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.10138 2.13209C7.48759 1.90037 7.99458 1.96568 8.24937 2.39034C8.48025 2.77514 8.41627 3.27982 7.99579 3.53552L6.85911 4.28147H12.175C15.4756 4.28147 18.175 6.9809 18.175 10.2815C18.175 13.582 15.4756 16.2815 12.175 16.2815H1.825C1.59569 16.2815 1.38517 16.2039 1.23135 16.0501C1.07753 15.8963 1 15.6858 1 15.4565C1 15.2272 1.07753 15.0166 1.23135 14.8628C1.38517 14.709 1.59569 14.6315 1.825 14.6315H12.175C14.5669 14.6315 16.525 12.6734 16.525 10.2815C16.525 7.88954 14.5669 5.93147 12.175 5.93147H6.73319L7.93912 6.73542C8.35885 6.99128 8.4226 7.49555 8.19187 7.88009L8.17604 7.90648L8.15428 7.92824C8.02305 8.05947 7.78976 8.23147 7.5175 8.23147C7.51462 8.23147 7.51159 8.23147 7.5084 8.23148C7.45747 8.23159 7.36855 8.23177 7.28351 8.20747C7.1963 8.18256 7.11051 8.13212 7.04675 8.04476L3.62073 5.76075L3.60322 5.74324C3.472 5.61202 3.3 5.37873 3.3 5.10647C3.3 4.87633 3.38015 4.61257 3.64132 4.43845L7.10138 2.13209ZM7.36325 2.5581L3.91867 4.85448C3.83485 4.91036 3.8 4.9916 3.8 5.10647C3.8 5.17518 3.85176 5.27866 3.94074 5.37316L7.42392 7.69528L7.4411 7.72965C7.44328 7.72984 7.44565 7.73002 7.44824 7.73019C7.46666 7.73138 7.48722 7.73147 7.5175 7.73147C7.58467 7.73147 7.68507 7.68201 7.77782 7.59666C7.87158 7.4173 7.81975 7.24686 7.67638 7.16084L7.66617 7.15471L5.08181 5.43147H12.175C14.8431 5.43147 17.025 7.6134 17.025 10.2815C17.025 12.9495 14.8431 15.1315 12.175 15.1315H1.825C1.70931 15.1315 1.63233 15.1689 1.5849 15.2164C1.53747 15.2638 1.5 15.3408 1.5 15.4565C1.5 15.5722 1.53747 15.6491 1.5849 15.6966C1.63233 15.744 1.70931 15.7815 1.825 15.7815H12.175C15.1994 15.7815 17.675 13.3059 17.675 10.2815C17.675 7.25704 15.1994 4.78147 12.175 4.78147H5.18589L7.73377 3.10942C7.88411 3.01922 7.9339 2.83638 7.82063 2.64759C7.73116 2.49848 7.5504 2.44838 7.36325 2.5581Z" fill="#333333"/>
                  </g>
                </g>
              </g>
            </svg>
            <span>Revocation</span>
          </div>
        </Col>
      </Row>
    </div>
    <Row align="middle" justify="space-between" class-name="bidTopClassification" :class="[tender.type === 0 ? 'bidAward' : tender.type === 1 ? 'bidCall' : tender.type === 2 ? 'bidOnGo' : 'bidAbandoned']">
      <span>{{ tender.type === 0 ? 'Award notice' :tender.type === 1 ? 'Call for projects' : tender.type === 2 ? 'Ongoing tenders' : 'Abandoned Tenders' }}</span>
      <Dropdown trigger="custom" placement="bottom-end" class="bidMoreBtn" :visible="actionDropdownVisible" @on-clickoutside="actionDropdownVisible = false">
        <Icon type="md-more" @click="actionDropdownVisible = !actionDropdownVisible"/>
        <DropdownMenu slot="list">
          <div class="bidPopBtn" :class="{'collectedActive' : tender.hadCollected}" @click="handleChangeTenderCollectFlag">
            <Icon v-if="!tender.hadCollected" type="ios-star-outline" />
            <Icon v-else type="ios-star" color="var(--collected-color)"/>
            <span>Collect</span>
          </div>
          <div class="bidPopBtnDivider"></div>
          <div class="bidPopBtn" @click="handleUninterested">
            <Icon type="ios-close-circle-outline" /><span>Uninterested</span>
          </div>
        </DropdownMenu>
      </Dropdown>
    </Row>
    <NuxtLink
      v-if="tender"
      :to="{
              name: pageCode.TENDERS_ID,
              params: { id: tender.id },
            }"

    >
      <Row class-name="bidContent" align="middle">
        <Col :xs="24" :sm="24" :md="24" :lg="19" class="bidContentLeft">
          <span v-dompurify-html="tender.title" class="bidTitle" />
          <span v-dompurify-html="tender.detail.origin" class="bidDetail" />
          <Row class-name="bidFlags">
            <span :class="['fi', `fi-${tender.countryISO}`, 'countryFlag']"></span><span>Anguilla</span>
            <div class="flagDivider"></div>
            <span v-for="(orgISO, index) in tender.otherOrgISO" :key="`bid-${orgISO}-${index}`" class="orgFlags">
              <span :class="['fi', `fi-${orgISO}`, 'orgFlag']"></span><span>United Nations</span>
              </span>
          </Row>
          <span class="bidCpv">{{ tender.cpv }}</span>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="5" class="bidContentRight">
          <Row class-name="bidTimes" justify="space-between" align="middle">
            <Row justify="space-between" class-name="fullWidth release">
              <span>Release</span>
              <span>{{ tender.release }}</span>
            </Row>
            <Row justify="space-between" class-name="fullWidth deadline">
              <span>Deadline</span>
              <span>{{ tender.deadline }}</span>
            </Row>
          </Row>
        </Col>
      </Row>
    </NuxtLink>
  </div>
</template>

<script>
import pageCode from "~/enums/pageCodes";
export default {
  name: "BidCard",
  props: {
    tender: {
      required: true,
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      hideMask: true,
      actionDropdownVisible: false,
    }
  },
  computed: {
    pageCode() {
      return pageCode
    }
  },
  methods: {
    handleRevocation() {
      this.hideMask = true
      this.$emit('revocation')
    },
    handleUninterested() {
      this.hideMask = false
      this.actionDropdownVisible = false
      this.$emit('uninterested')
    },
    handleChangeTenderCollectFlag() {
      const tenderId = this.tender.id
      // todo axios 改变收藏状态
      this.$Message.success('Collection status changed successfully')
      this.$emit('changeTenderCollectFlag', tenderId)
    }
  },
}
</script>

<style scoped lang="scss">
.bidMoreBtn{
  cursor: pointer;
  .collectedActive{
    color: var(--collected-color);
  }
}
.bidPopBtnDivider{
  width: 106px;
  height: 1px;
  margin: auto;
  background-color: var(--border-color);
}
.bidPopBtn{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 138px;
  padding: 8px 16px;
  i{
    font-size: 18px;
    margin-right: 14px;
  }
  span{
    font-size: 14px;
  }
  color: var(--text-color3);
}
.tenderCard{
  position: relative;
  .uninterestedMask{
    padding: 10px 100px;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    .revocationBtn{
      cursor: pointer;
      padding: 10px 16px;
      background-color: rgba(51,51,51,0.1);
      border-radius: 6px;
      height: auto;
      width: fit-content;
      display: flex;
      align-items: center;
      svg{
        margin-right: 12px;
      }
      span{
        font-weight: bold;
        color: var(--text-color1);
      }
    }
  }


  background-color: var(--bg-color1);
  border-radius: var(--border-radius-base);
  margin-bottom: 20px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  .bidAward{
    color: var(--bid-award-color);
    background: linear-gradient(to right, var(--bid-award-bg-color), var(--bg-color1));
  }
  .bidCall{
    color: var(--bid-call-color);
    background: linear-gradient(to right, var(--bid-call-bg-color), var(--bg-color1));
  }
  .bidOnGo{
    color: var(--bid-ongo-color);
    background: linear-gradient(to right, var(--bid-ongo-bg-color), var(--bg-color1));
  }
  .bidAbandoned{
    color: var(--bid-abandoned-color);
    background: linear-gradient(to right, var(--bid-abandoned-bg-color), var(--bg-color1));
  }
  .bidTopClassification{
    height: 56px;
    font-size: 15px;
    padding: 0 22px 0 30px;
    justify-content: space-between;
    i{
      color: var(--icon-color2);
      font-size: 20px;
    }
  }
  .bidContent{
    padding: 24px 30px;
    .bidContentLeft{
      padding-right: 30px;
      .bidTitle, .bidDetail{
        display: inline-block;
        line-height: 1.3;
      }
      .bidTitle{
        font-size: 16px;
        margin-bottom: 10px;
      }
      .bidDetail{
        display: block;
        color: var(--text-color3);
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis; //文本溢出显示省略号
        white-space: nowrap; //文本不会换行
        margin-bottom: 20px;
      }
      .bidFlags{
        .flagDivider{
          width: 1px;
          height: 18px;
          background-color: var(--divider-color);
          margin: 0 10px;
        }
        .countryFlag, .orgFlag, .orgFlags{
          margin-right: 6px;
        }
      }
      .bidCpv{
        font-size: 12px;
        background-color: var(--text-bg-color1);
        color: var(--text-color2);
        padding: 4px 6px;
        border-radius: 6px;
        display: inline-block;
        margin-top: 16px;
      }
    }
    .bidContentRight{
      .bidTimes{
        position: relative;
        padding-left: 18px;
        &:before{
          content: '';
          left: 0;
          position: absolute;
          height: 110px;
          width: 1px;
          background-color: var(--divider-color);
        }
        .release, .deadline{
          span:nth-child(1) {
            font-size: 13px;
            color: var(--text-color3);
          }
          span:nth-child(2) {
            font-size: 14px;
          }
        }
        .release{
          margin-bottom: 28px;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .tenderCard{
    margin-bottom: 15px;
  }
  .tenderCard .bidTopClassification{
    height: 40px;
    font-size: 12px;
    i{
      font-size: 16px;
    }
  }
  .tenderCard .bidContent{
    padding: 15px;
    .bidContentLeft{
      padding-right: 0;
      .bidTitle{
        font-size: 14px;
      }
      .bidDetail{
        font-size: 12px;
        margin-bottom: 11px;
      }
      .bidCpv{
        font-size: 11px;
        margin-bottom: 8px;
        margin-top: 7px;
      }
      .bidFlags{
        font-size: 11px;
      }
    }
  }
  .tenderCard .bidContent .bidContentRight {
    .bidTimes{
      padding-left: 0;
    }
    .bidTimes:before{
      //content: none;
      width: calc(100% + 30px);
      height: 0.5px;
      position: absolute;
      top: 0;
      left: -15px;
    }
    .bidTimes{
      flex-wrap: nowrap;
      padding-top: 15px;
      .release,.deadline{
        justify-content: initial;
        margin: 0;
        span:nth-child(1),span:nth-child(2){
          margin-right: 5px;
          font-size: 11px;
        }
      }
    }
  }
  .tenderCard .uninterestedMask{
    padding: 20px;
    div{
      display: block;
      text-align: center;
      .revocationBtn{
        margin: 16px auto 0;
      }
    }
  }
}

</style>

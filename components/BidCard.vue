<template>
  <div class="tenderCard">
    <Row align="middle" justify="space-between" class-name="bidTopClassification" :class="[tender.type === 0 ? 'bidAward' : tender.type === 1 ? 'bidCall' : tender.type === 2 ? 'bidOnGo' : 'bidAbandoned']">
      <span>{{ tender.type === 0 ? 'Award notice' :tender.type === 1 ? 'Call for projects' : tender.type === 2 ? 'Ongoing tenders' : 'Abandoned Tenders' }}</span>
      <Dropdown trigger="click" placement="bottom-end" class="bidMoreBtn">
        <Icon type="md-more" />
        <DropdownMenu slot="list">
          <div class="bidPopBtn" :class="{'collectedActive' : tender.hadCollected}">
            <Icon v-if="!tender.hadCollected" type="ios-star-outline" />
            <Icon v-else type="ios-star" color="var(--collected-color)"/>
            <span>collect</span>
          </div>
          <div class="bidPopBtnDivider"></div>
          <div class="bidPopBtn">
            <Icon type="ios-close-circle-outline" /><span>delete</span>
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
      target="_blank"
    >
      <Row class-name="bidContent" align="middle">
        <Col :xs="24" :sm="24" :md="24" :lg="19" class="bidContentLeft">
          <span v-dompurify-html="tender.title" class="bidTitle" />
          <span v-dompurify-html="tender.detail" class="bidDetail" />
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
    }
  },

  computed: {
    pageCode() {
      return pageCode
    }
  }
}
</script>

<style scoped lang="scss">
.bidMoreBtn{
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
    i{
      color: var(--icon-color2);
      font-size: 20px;
    }
  }
  .bidContent{
    height: calc(100% - 56px);
    padding: 24px 30px;
    .bidContentLeft{
      padding-right: 30px;
      .bidTitle, .bidDetail{
        display: inline-block;
      }
      .bidTitle{
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 10px;
      }
      .bidDetail{
        display: block;
        color: var(--text-color3);
        font-size: 14px;
        line-height: 16px;
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
  ul li .bidContent{
    padding: 30px;
    .bidContentLeft{
      padding-right: 0;
      .bidTitle{
        font-size: 28px;
        line-height: 39px;
      }
      .bidDetail{
        font-size: 24px;
        line-height: 29px;
      }
    }
    .bidContentRight .bidTimes{
      display: none;
    }
  }
}
</style>

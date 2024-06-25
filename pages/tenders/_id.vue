<template>
<section id="tenderDetailPage" class="detailPage">
  <h2 class="topTenderTitle">
    {{bid.title}}
  </h2>
  <Row class-name="navBox" justify="space-between" align="middle">
    <Row class-name="navAnchor">
      <span
        v-for="(item, index) in nav"
        :key="`nav-${item.label}-${index}`"
        :class="{'active' : activeItem === index}"
        @click="scrollTo(item.id)"
      >
        {{ item.label }}
      </span>
    </Row>
    <Row class-name="navIcons" justify="end" align="middle">
      <icon type="md-share" class="shareIcon" />
      <Icon type="md-star" class="collectIcon" :class="bid.hadCollected ? 'active' : '' " @click="handleCollection" />
    </Row>
  </Row>
  <Row id="description" :gutter="20" class-name="navScrollContent descriptionBox">
    <Col :xs="24" :sm="24" :md="24" :lg="17" class="descriptionLeftContent">
      <ul>
        <li>
          <div class="contentLabel">
            <Icon type="md-pin" />
            <span>Country:</span>
          </div>
          <div class="contentDetail">
            <span :class="['fi', `fi-${bid.countryISO}`]"></span>
            <span>{{ bid.country }}</span>
          </div>
        </li>
        <li>
          <div class="contentLabel">
            <Icon type="md-pin" />
            <span>Region:</span>
          </div>
          <div class="contentDetail">
            <span>{{ bid.region }}</span>
          </div>
        </li>
        <li>
          <div class="contentLabel">
            <Icon type="md-pin" />
            <span>Organization:</span>
          </div>
          <div class="contentDetail">
            <span>N/A</span>
          </div>
        </li>
        <li>
          <div class="contentLabel">
            <Icon type="md-pin" />
            <span>Purchasing unit:</span>
          </div>
          <div class="contentDetail">
            <span>Asian development bank</span>
          </div>
        </li>
        <li>
          <div class="contentLabel">
            <Icon type="md-pin" />
            <span>Release time:</span>
          </div>
          <div class="contentDetail">
            <span>Jul 22, 2023 (local time)</span>
          </div>
        </li>
        <li>
          <div class="contentLabel">
            <Icon type="md-pin" />
            <span>Tender amount:</span>
          </div>
          <div class="contentDetail">
            <span>EUR 10,000(USD 10,731)</span>
          </div>
        </li>
        <li>
          <div class="contentLabel">
            <Icon type="md-pin" />
            <span>CPV:</span>
          </div>
          <div class="contentDetail">
            <span>Musical Instruments and Games and Toys and Arts and Crafts and Educational Equipment and Materials and Accessories and Supplies</span>
          </div>
        </li>
        <li>
          <div class="contentLabel">
            <Icon type="md-pin" />
            <span>Winning bidder:</span>
          </div>
          <div class="contentDetail">
            <span>People's Government of Hoboksar Mongol Autonomous County and Shitoluogai TownPeople's Government of Hoboksar Mongol Autonomous County and Shitoluogai Town</span>
          </div>
        </li>
      </ul>
    </Col>
    <Col :xs="24" :sm="24" :md="24" :lg="7" class="descriptionRightContent">
      <div class="stateCard" :class="[bid.type === 0 ? 'bidAward' : bid.type === 1 ? 'bidCall' : bid.type === 2 ? 'bidOnGo' : 'bidAbandoned']">
        <div class="topTextBox">
          <span>{{ bid.type === 0 ? 'Award notice' : bid.type === 1 ? 'Call for projects' : bid.type === 2 ? 'Ongoing Tenders' : 'Abandoned Tenders' }}</span>
        </div>
        <div class="bottomProgressBox">
          <span>The bidding has ended</span>
          <Progress
            :percent="25"
            hide-info
            :stroke-width="24"
            :stroke-color="bid.type === 0 ? 'var(--bid-award-color)' : bid.type === 1 ? 'var(--bid-call-color)' : bid.type === 2 ? 'var(--bid-ongo-color)' : 'var(--bid-abandoned-color)'"/>
        </div>
      </div>
      <CommonCard class="timelineCard">
        <template slot="title">
          Progress
        </template>
        <template slot="content">
          <Timeline class="timelineList">
            <TimelineItem class="timelineItem">
              <div slot="dot" class="timelineDot"></div>
              <p class="content">Tendering</p>
              <p class="time">April 23, 2024</p>
            </TimelineItem>
            <TimelineItem class="timelineItem">
              <div slot="dot" class="timelineDot"></div>
              <p class="content">Change announcement</p>
              <p class="time">April 23, 2024</p>
            </TimelineItem>
            <TimelineItem class="timelineItem">
              <div slot="dot" class="timelineDot"></div>
              <p class="content">Winning bid result</p>
              <p class="time">April 23, 2024</p>
            </TimelineItem>

            <TimelineItem class="timelineItem">
              <div slot="dot" class="timelineDot"></div>
              <p class="content">Winning bid result</p>
              <p class="time">April 23, 2024</p>
            </TimelineItem>
          </Timeline>
        </template>
      </CommonCard>
    </Col>
  </Row>
  <Row id="announcement" class-name="navScrollContent announcementBox">
    <CommonCard>
        <span slot="title">
          Announcement
        </span>
      <template slot="action">
        <Row>
          <div
            class="actionBtn" :class="showOriginal ? 'actionBtnActive' : ''" @click="handleOriginalBtnClick">
            original
          </div>
          <div class="actionBtn langChangeBtn" :class="showTranslated ? 'actionBtnActive' : ''">
            <Dropdown
              trigger="custom"
              :visible="showLangList"
              placement="bottom-end"
              @on-clickoutside="showLangList = false"
            >
              <div class="textBtn" :class="showTranslated ? 'actionBtnActive' : ''" @click="handleLangTextClick">{{ translateLabel }}</div>
              <div class="arrowBtn" @click="showLangList = true">
                <Icon type="ios-arrow-down"></Icon>
              </div>
              <DropdownMenu slot="list">
                <DropdownItem
                  v-for="item in langList"
                  :key="item.value"
                  @click.native="handleLangChange(item.value, item.label)"
                >
                  {{ item.label }}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Row>
      </template>
      <template slot="content">
          <Row class-name="fullWidth tenderDetail">
            <Col v-show="showOriginal" flex="1">
              <span class="invitation">Invitation for Bids</span>
              <TenderTable lang="en" :bid-detail-table="bid.table.origin" />
              <pre>
                {{ bid.detail.origin }}
              </pre>
            </Col>
            <Divider v-show="showOriginal && showTranslated" type="vertical" class="contentDivider"/>
            <Col v-show="showTranslated" flex="1">
              <span class="invitation">招标公告</span>
              <TenderTable lang="zh" :bid-detail-table="bid.table[translateLang]" />
              <pre>
                {{ bid.detail[translateLang] }}
              </pre>
            </Col>
          </Row>
      </template>
    </CommonCard>
  </Row>
  <Row id="document" class-name="navScrollContent documentsBox">
    <CommonCard>
      <template slot="title">
        Documents
      </template>
      <template slot="action">
        <Row>
          <div class="actionBtn">translate all</div>
          <div class="actionBtn">download all</div>
        </Row>
      </template>
      <template slot="content">
        <ul class="docList">
          <li v-for="doc in bid.docs" :key="`doc-${doc.id}-${doc.title}`" class="docItem" >
            <Row align="top">
              <img :src="require(`~/assets/imgs/tenderDetail/${doc.type}-icon@2x.png`)" alt="" />
              <Col flex="1">
                <p>{{ doc.title }}</p>
                <span>{{ doc.size }}</span><span>{{ doc.date }}</span>
              </Col>
              <Icon type="md-more" />
            </Row>
            <Row>

            </Row>
          </li>
        </ul>
      </template>
    </CommonCard>
  </Row>
</section>
</template>

<script>
import CommonCard from "~/components/tenderDetail/CommonCard.vue";
import {tender} from "~/enums/tender";
import {langList} from "~/lang/langList";
export default {
  name: "TenderDetailPage",
  components: {CommonCard},
  data() {
    return {
      nav: [
        {
          label: 'Description',
          id: '#description',
        },
        {
          label: 'Announcement',
          id: '#announcement',
        },
        {
          label: 'Document',
          id: '#document',
        },
      ],
      activeItem: 0,

      bid: tender,

      translateLang: '',
      translateLabel: 'language',
      langList,

      showOriginal: true,
      showTranslated: false,
      showLangList: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
    window.addEventListener('resize', this.calcTimelineMaxHeight)
    this.calcTimelineMaxHeight()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calcTimelineMaxHeight)
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    calcTimelineMaxHeight() {
      const leftBox = document.querySelector('.descriptionLeftContent ul');
      const stateCard = document.querySelector('.stateCard');
      const timelineHeaderHeight = document.querySelector('.timelineCard .header').clientHeight;
      const targetHeight = leftBox.clientHeight - stateCard.clientHeight - timelineHeaderHeight - 20;
      const targetEl = document.querySelector('.timelineCard .timelineList');

      if (window.innerWidth <= 768) {
        targetEl.style.height = `auto`;
        targetEl.scrollTop = 0;
        targetEl.scrollLeft = targetEl.scrollWidth
        return
      }
      targetEl.style.height = `${targetHeight}px`;
      targetEl.scrollTop = targetEl.scrollHeight
    },
    onScroll() {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll('.navScrollContent')
      // 所有锚点元素的 offsetTop
      const offsetTopArr = []
      navContents.forEach(item => {
        offsetTopArr.push(window.innerWidth > 768 ? item.offsetTop - 80 : item.offsetTop - 100)
      })
      // 获取当前文档流的 scrollTop
      const scrollTop = window.scrollY
      for (let n = 0; n < offsetTopArr.length; n++) {
        if (scrollTop >= offsetTopArr[n]) {
          this.activeItem = n
        }
      }
      // 滚到底部
      if ((window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight) {
        this.activeItem = offsetTopArr.length - 1
      }
    },
    scrollTo(id) {
      let targetOffsetTop = document.querySelector(id).offsetTop - 56; // 指定元素 offsetTop
      if (window.innerWidth <= 768) {
        targetOffsetTop -= 24
      }
      const scrollTop = window.scrollY // 当前offsetTop
      if (scrollTop > targetOffsetTop) {
      //   往上滑
        window.scrollBy({
          top: -(scrollTop - targetOffsetTop),
          behavior: 'smooth'
        })
      }else {
        // 往下滑
        window.scrollBy({
            top: -(scrollTop - targetOffsetTop),
            behavior: 'smooth'
          })
      }
    },

    handleCollection() {
      this.bid.hadCollected = !this.bid.hadCollected
    },
    handleLangChange(lang, label) {
      this.translateLang = lang;
      this.translateLabel = label;

      // 其他翻译动作 => fn(val)
      this.showLangList = false
      this.showTranslated = true

    },
    handleOriginalBtnClick() {
      if (!this.translateLang) {
        this.showOriginal = true
        return 0
      }
    //   有历史记录情况
      if (this.showTranslated) {
        this.showOriginal = !this.showOriginal
      }else {
        this.showOriginal = true
      }
    },
    handleLangTextClick() {
      if (!this.translateLang) {
        this.showLangList = true
        return
      }
    //   有历史语言的情况
      if (this.showOriginal) {
        this.showTranslated = !this.showTranslated
      }else {
        this.showTranslated = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.detailPage{
  position: relative;
}
.active{
  color: var(--primary-color);
}

.topTenderTitle{
  margin-bottom: 52px;
}
.navBox{
  position: sticky;
  top: 96px;
  z-index: 10;
  background-color: var(--bg-color1);
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.06);
  border-radius: var(--border-radius-base);
  padding: 16px 33px 16px 43px;
  .navAnchor{
    span{
      margin-right: 100px;
      cursor: pointer;
    }
  }
  .navAnchor .active{
    font-weight: bold;
  }
  .navIcons{
    color: var(--inactive-icon-color);
    .shareIcon {
      margin-right: 30px;
      font-size: 20px;
      height: 20px;
      cursor: pointer;
    }
    .collectIcon {
      font-size: 27px;
      height: 27px;
      cursor: pointer;
    }
  }
}
.descriptionBox, .announcementBox, .documentsBox{
  margin-top: 20px;
}
.descriptionBox{
  .descriptionLeftContent{
    ul{
      padding: 16px 50px;
      background-color: var(--bg-color1);
      border-radius: var(--border-radius-base);
      border: 1px solid var(--border-color1);
      li{
        padding: 24px 20px;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        border-bottom: 1px solid var(--border-color2);
        font-size: 14px;
        &:nth-last-child(1) {
          border-bottom: 0;
        }
        .contentLabel{
          width: 27%;
          color: var(--text-color3)
        }
        .contentDetail{
          flex: 1;
        }
      }
    }
  }
  .descriptionRightContent{
    display: flex;
    flex-direction: column;
    .stateCard{
      border-radius: var(--border-radius-base);
      overflow: hidden;
      margin-bottom: 20px;
      border: 1px solid;
      .topTextBox{
        padding: 20px;
        text-align: center;
        font-size: 18px;
        color: var(--text-color4);
        font-weight: bold;
      }
      .bottomProgressBox{
        padding: 20px 40px 30px;
        span{
          margin-bottom: 24px;
          display: block;
          text-align: center;
        }
      }
    }
    .bidAward{
      border-color: var(--bid-award-color);
      .topTextBox{
        background: var(--bid-award-color);
      }
      .bottomProgressBox{
        color: var(--bid-award-color);
        background: var(--bid-award-bg-color);
      }
    }
    .bidCall{
      border-color: var(--bid-call-color);
      .topTextBox{
        background: var(--bid-call-color);
      }
      .bottomProgressBox{
        color: var(--bid-call-color);
        background: var(--bid-call-bg-color);
      }
    }
    .bidOnGo{
      border-color: var(--bid-ongo-color);
      .topTextBox{
        background: var(--bid-ongo-color);
      }
      .bottomProgressBox{
        color: var(--bid-ongo-color);
        background: var(--bid-ongo-bg-color);
      }
    }
    .bidAbandoned{
      border-color: var(--bid-abandoned-color);
      .topTextBox{
        background: var(--bid-abandoned-color);
      }
      .bottomProgressBox{
        color: var(--bid-abandoned-color);
        background: var(--bid-abandoned-bg-color);
      }
    }
    .timelineCard{
      flex-grow: 1;
      .timelineList{
        overflow-y: scroll;
        width: 100%;
        border-radius: var(--border-radius-base);
        .timelineItem{
          padding: 26px 40px;
          cursor: pointer;
          color: var(--text-color3);
          .content{
            font-size: 16px;
            margin-bottom: 8px;
          }
          .time{
            font-size: 14px;
          }
          .timelineDot{
            width: 19px;
            height: 19px;
            border-radius: 50%;
            margin: auto;
            position: relative;
            background-color: var(--icon-color4);
            &::after{
              content: '';
              width: 8px;
              height: 8px;
              background-color: var(--icon-color3);
              position: absolute;
              border-radius: 50%;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
        .timelineItem:nth-last-child(1) {
          color: var(--primary-color);
          background-color: var(--primary-bg-color1);
          .timelineDot{
            background-color: var(--primary-bg-color2);
            &::after{
              background-color: var(--primary-color);
            }
          }
        }
      }
    }
  }

}
.announcementBox, .documentsBox{
  .actionBtn{
    padding: 0 16px;
    height: 30px;
    line-height: 30px;
    border: 1px solid var(--border-color1);
    color: var(--text-color3);
    border-radius: var(--border-radius-large);
    cursor: pointer;
    box-sizing: content-box;
  }
  .actionBtnActive{
    border-color: var(--primary-color);
    color: var(--primary-color);
    i{
      color: var(--text-color3);
    }
  }
}
.announcementBox{
  .actionBtn{
    margin-left: 20px;
  }
  .langChangeBtn{
    padding: 0;
    .ivu-dropdown-rel{
      display: flex;
    }
    .textBtn{
      padding:0 16px;
      display: inline-block;
      border-radius: var(--border-radius-large) 0 0 var(--border-radius-large);
    }
    .arrowBtn{
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-left: 1px solid var(--border-color);
      border-radius: 0 var(--border-radius-large) var(--border-radius-large) 0;
      background-color: var(--tag-bg-color);
    }
  }
  .transLangSelector{
    width: 138px;
    height: 30px;
  }
  .tenderDetail{
    padding: 30px 56px;
    .invitation{
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 16px;
      display: inline-block;
    }
    .contentDivider{
      height: auto;
      margin: 0 12px;
      background-color: var(--border-color);
    }
    pre{
      font-size: 14px;
      white-space: pre-line;
      margin: 0;
    }
  }
  //height: 1500px;
}
.documentsBox{
  .actionBtn{
    margin-left: 20px;
  }
  .docList{
    width: 100%;
    padding: 10px 50px;
    .docItem{
      position: relative;
      padding: 33px 20px;
      &::after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 1px;
        background-color: var(--border-color);
      }
      img{
        width: 40px;
        margin-right: 20px;
      }
      i{
        font-size: 24px;
        color: var(--text-color2);
      }
      p{
        margin-right: 20px;
      }
      span{
        font-size: 14px;
        color: var(--text-color3);
        margin-right: 20px;
      }
    }
    .docItem:nth-last-child(1)::after{
      content: none;
    }
  }
}

// 移动端 样式
@media screen and (max-width: 768px){
  .topTenderTitle{
    font-size: 30px;
    line-height: 45px;
    margin-bottom: 40px;
  }
  .navBox{
    top: 126px;
    padding: 16px 30px;
    .navAnchor span{
      font-size: 22px;
      margin-right: 40px;
    }
  }
  .descriptionBox, .announcementBox, .documentsBox{
    margin-top: 30px;
  }
  .announcementBox, .documentsBox{
    .actionBtn{
      font-size: 22px;
      padding: 0 18px;
    }
  }

  .descriptionBox{
    .descriptionLeftContent{
      ul{
        padding: 40px 30px;
        li{
          font-size: 22px;
          .contentLabel{
            width: 44%;
          }
        }
      }
    }
    .descriptionRightContent{
      .stateCard{
        margin-top: 30px;
        margin-bottom: 30px;
        .topTextBox, .bottomProgressBox{
          font-size: 22px;
        }
        .topTextBox{
          padding: 18px;
        }
        .bottomProgressBox{
          padding: 26px 40px;
          span{
            margin-bottom: 16px;
          }
        }
      }
      .timelineCard {
        .timelineList {
          display: flex;
          overflow-y: hidden;
          overflow-x: scroll;
          padding: 30px;
          .timelineItem {
            padding: 0;
            .timelineDot{
              width: 24px;
              height: 24px;
              &::after{
                width: 10px;
                height: 10px;
              }
            }
            .content{
              font-size: 24px;
              margin-bottom: 6px;
            }
            .time{
              font-size: 22px;
            }
          }
          .timelineItem:nth-last-child(1) {
            background-color: transparent;
          }
        }
      }
    }
  }
  .announcementBox{
    .langChangeBtn{
      padding: 0;
    }
    .tenderDetail{
      padding: 40px;
      .invitation, .bidTableStyle, pre{
        font-size: 22px;
      }
    }
  }
  .documentsBox{
    .docList{
      padding: 0 30px 30px;
      .docItem{
        padding: 40px 10px;
        img{
          width: 46px;
          margin-right: 16px;
        }
        p{
          font-size: 24px;
          margin-bottom: 8px;
          margin-right: 30px;
        }
        span{
          font-size: 22px;
        }
        i{
          font-size: 32px;
        }
      }
    }
  }
}
</style>

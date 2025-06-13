<template>
<section id="tenderDetailPage" class="detailPage">
  <ClientOnly>
    <Card :padding="0" class="topTenderTitleCard" :dis-hover="true">
      <Row class-name="bidTopClassification" :class="[tender.type === 0 ? 'bidAward' : tender.type === 1 ? 'bidCall' : tender.type === 2 ? 'bidOnGo' : 'bidAbandoned']">
        <span>{{ tender.type === 0 ? 'Award notice' :tender.type === 1 ? 'Call for projects' : tender.type === 2 ? 'Ongoing tenders' : 'Abandoned Tenders' }}</span>
      </Row>
      <h2 class="topTenderTitle">
        {{bid.title}}
      </h2>
    </Card>
  <div class="navBox">
    <Row class-name="navAnchor" :wrap="false">
      <span
        v-for="(item, index) in nav"
        :key="`nav-${item.label}-${index}`"
        :class="{'active' : activeItem === index}"
        @click="scrollTo(item.id)"
      >
        {{ item.label }}
      </span>
    </Row>
    <Row class-name="navIcons" justify="end" align="middle" :wrap="false">
      <Icon type="md-mail" class="emailIcon"/>
      <Dropdown trigger="click" placement="bottom-end">
       <icon type="md-share" class="shareIcon" />
        <DropdownMenu slot="list">
            <ul class="shareLinks">
              <li><img src="~assets/imgs/tenderDetail/link2@2x.png" alt=""></li>
              <li><img src="~assets/imgs/tenderDetail/link3@2x.png" alt=""></li>
              <li><img src="~assets/imgs/tenderDetail/link4@2x.png" alt=""></li>
              <li
                v-copy="`https://gpted.com${$route.path}?xxx=hhujjjjjjjjksdhjkssd`"
                @click="copyMailLink"
              ><img src="~assets/imgs/tenderDetail/link5@2x.png" alt=""></li>
              <li
                @click="$refs.mailPromptModal.showModal = true"
              ><img src="~assets/imgs/tenderDetail/link6@2x.png" alt=""></li>
            </ul>
        </DropdownMenu>
      </Dropdown>
      <Icon type="md-star" class="collectIcon" :class="bid.hadCollected ? 'active' : '' " @click="handleCollection" />
    </Row>
  </div>
  <Row id="description" :gutter="20" class-name="navScrollContent descriptionBox">
    <Col flex="1" class="descriptionLeftContent">
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
          <div v-if="bid.winner !== ''"  class="contentDetail">
            <span>People's Government of Hoboksar Mongol Autonomous County and Shitoluogai TownPeople's Government of Hoboksar Mongol Autonomous County and Shitoluogai Town</span>
          </div>
          <div v-else class="contentDetail">
            <UnlockedMask v-if="showUnlockedMask" :is-pc="isPc" :short-text="true" :tender-id="bid.id" @updateTender="handleUpdateTender"/>
          </div>
        </li>
      </ul>
    </Col>
<!--    <Col :xs="24" :sm="24" :md="24" :lg="7" class="descriptionRightContent">-->
<!--      <div class="stateCard" :class="[bid.type === 0 ? 'bidAward' : bid.type === 1 ? 'bidCall' : bid.type === 2 ? 'bidOnGo' : 'bidAbandoned']">-->
<!--        <div class="topTextBox">-->
<!--          <span>{{ bid.type === 0 ? 'Award notice' : bid.type === 1 ? 'Call for projects' : bid.type === 2 ? 'Ongoing Tenders' : 'Abandoned Tenders' }}</span>-->
<!--        </div>-->
<!--        <div class="bottomProgressBox">-->
<!--          <span>The bidding has ended</span>-->
<!--          <Progress-->
<!--            :percent="25"-->
<!--            hide-info-->
<!--            :stroke-color="bid.type === 0 ? 'var(&#45;&#45;bid-award-color)' : bid.type === 1 ? 'var(&#45;&#45;bid-call-color)' : bid.type === 2 ? 'var(&#45;&#45;bid-ongo-color)' : 'var(&#45;&#45;bid-abandoned-color)'"/>-->
<!--        </div>-->
<!--      </div>-->
<!--      <CommonCard class="timelineCard">-->
<!--        <template slot="title">-->
<!--          Progress-->
<!--        </template>-->
<!--        <template slot="content">-->
<!--          <Timeline class="timelineList">-->
<!--            <TimelineItem class="timelineItem">-->
<!--              <div slot="dot" class="timelineDot"></div>-->
<!--              <p class="content">Tendering</p>-->
<!--              <p class="time">April 23, 2024</p>-->
<!--            </TimelineItem>-->
<!--            <TimelineItem class="timelineItem">-->
<!--              <div slot="dot" class="timelineDot"></div>-->
<!--              <p class="content">Change announcement</p>-->
<!--              <p class="time">April 23, 2024</p>-->
<!--            </TimelineItem>-->
<!--            <TimelineItem class="timelineItem">-->
<!--              <div slot="dot" class="timelineDot"></div>-->
<!--              <p class="content">Winning bid result</p>-->
<!--              <p class="time">April 23, 2024</p>-->
<!--            </TimelineItem>-->

<!--            <TimelineItem class="timelineItem">-->
<!--              <div slot="dot" class="timelineDot"></div>-->
<!--              <p class="content">Winning bid result</p>-->
<!--              <p class="time">April 23, 2024</p>-->
<!--            </TimelineItem>-->
<!--          </Timeline>-->
<!--        </template>-->
<!--      </CommonCard>-->
<!--    </Col>-->
  </Row>
  <Row id="announcement" class-name="navScrollContent announcementBox">
    <CommonCard>
        <span slot="title">
          Announcement
        </span>
<!--      <template slot="action">-->
<!--        <Row>-->
<!--          <Row align="middle">-->
<!--            <Row class="TABtnGroup" :wrap="false">-->
<!--              <div class="A" :class="{'active' : translateStatus === 'A' }" @click="changeTranslateStatus('A')">A</div>-->
<!--              <div class="T" :class="{'active' : translateStatus === 'T' }" @click="changeTranslateStatus('T')">T</div>-->
<!--              <div class="TA" :class="{'active' : translateStatus === 'TA' }" @click="changeTranslateStatus('TA')">T | A</div>-->
<!--            </Row>-->
<!--            <Row class="languageSelector" align="middle" :wrap="false">-->
<!--              <Select v-model="translateLang" class="selector" @on-change="handleLangChange">-->
<!--                <img slot="prefix" :src="targetLanguageIcon" alt="Target language" class="imgBox">-->
<!--                <Option v-for="item in langList" :key="item.value" :value="item.value">{{ item.label }}</Option>-->
<!--              </Select>-->
<!--            </Row>-->
<!--          </Row>-->

<!--        </Row>-->
<!--      </template>-->
      <div slot="content">
        <Row v-if="!showUnlockedMask"  class-name="fullWidth tenderDetail" :class="{'swap': swap}">
          <Col v-show="translateStatus === 'A' || translateStatus === 'TA'" flex="1">
            <span class="invitation">Invitation for Bids</span>
<!--            <TenderTable lang="en" :bid-detail-table="bid.table.origin" />-->
            <pre>
                {{ bid.detail.origin }}
              </pre>
          </Col>
          <div v-show="translateStatus === 'TA'" class="gap">
            <div class="swapPlaceBtn" @click="swap = !swap">
              <Icon type="ios-swap" />
            </div>
            <Divider v-show="translateStatus === 'TA'" type="vertical" class="contentDivider"/>
          </div>
<!--          <Divider v-show="showOriginal && showTranslated" type="vertical" class="contentDivider"/>-->
          <Col v-show="translateStatus === 'T' || translateStatus === 'TA'" flex="1">
            <span class="invitation">招标公告</span>
<!--            <TenderTable lang="zh" :bid-detail-table="bid?.table[translateLang]" />-->
            <pre>
                {{ bid.detail[translateLang] }}
              </pre>
          </Col>
        </Row>
        <UnlockedMask v-if="showUnlockedMask" :is-pc="isPc" :tender-id="bid.id" @updateTender="handleUpdateTender"/>
      </div>
    </CommonCard>
  </Row>
  <Row id="document" class-name="navScrollContent documentsBox">
    <CommonCard>
      <template slot="title">
        Documents
      </template>
      <template slot="action">
        <Row>
          <div v-show="!selectDownload" class="actionBtn" @click="selectDownload = !selectDownload">Select Download</div>
          <Row v-show="selectDownload" align="middle">
            <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll">Select All</Checkbox>
            <div class="actionBtn" @click="selectDownload = !selectDownload">Deselect</div>
          </Row>
        </Row>
      </template>
      <template slot="content">
        <ul class="docList">
          <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <li v-for="doc in bid.docs" :key="`doc-${doc.id}-${doc.title}`" class="docItem">
            <Row align="top">
              <img :src="require(`~/assets/imgs/tenderDetail/${doc.type}-icon@2x.png`)" alt="" />
              <Col flex="1" @click.native="toTranslateFile(bid.id, doc.id)">
                <p>{{ doc.title }}</p>
                <span>{{ doc.size }}</span><span>{{ doc.date }}</span>
              </Col>
              <checkbox v-show="selectDownload" :label="doc.id" class="checkboxSpan"><span></span></checkbox>
            </Row>
            <Row class-name="translatedDocs">
              <ul>
                <li
                  v-for="langItem in selectedTranslateLangList"
                  v-show="langItem.docId === doc.id && langItem.tenderId === bid.id"
                  :key="`${langItem.tenderId}-${langItem.docId}-${langItem.lang}-selectedTranslateLang`"
                 >
                  <Row align="middle">
                    <div class="iconBox">
                      <img :src="require(`~/assets/imgs/tenderDetail/${doc.type}-icon@2x.png`)" alt="">
                    </div>
                    <span>{{ langItem.lang }}</span>
                  </Row>
                  <div v-if="langItem.progress < 100" class="progressBox">
                    <img src="~assets/imgs/tenderDetail/translating-icon@2x.png" alt="">
                    <i-circle :percent="langItem.progress" :size="28" :stroke-width="10" stroke-color="var(--primary-color)">
                    </i-circle>
                  </div>
                  <div v-else>
                    <Icon type="md-arrow-down" size="18" />
                  </div>
                </li>
              </ul>
            </Row>
          </li>
          </CheckboxGroup>
        </ul>
        <Row v-show="selectDownload" class="fullWidth documentsBoxBtns" justify="end">
          <Button class="cancelBtn" @click="handleCancelSelectedDocs">Cancel</Button>
          <Button type="primary" @click="handleDownloadSelectedDocs">Download</Button>
        </Row>
<!--        全部翻译弹窗-->
        <LanguageModal
          ref="translateAllModal"
          :tender-id="bid.id"
          :disable-lang-list="disableAllLanguageList"
          @onSelectLanguage="handleTranslateAll"
        ></LanguageModal>
<!--        单个翻译弹窗-->
        <LanguageModal
          ref="langListModal"
          :tender-id="bid.id"
          :doc-id="currentSelectedDocId"
          :disable-lang-list="disableLangList"
          @onSelectLanguage="handleTranslate"
        ></LanguageModal>
<!--        提示登录弹窗-->
        <CommonPromptModal ref="loginPromptModal" title="No logged in" class="loginPromptModal">
          <template #content>
            <p>Log in to unlock more detailed information, as well as translation and download of attachments</p>
            <Row justify="center">
              <Button type="primary" class="loginPromptBtn" @click="toLogin">Go to login</Button>
            </Row>
          </template>
        </CommonPromptModal>
<!--        邮件转发弹窗-->
        <CommonPromptModal ref="mailPromptModal" :mask-closeable="false" width="778" title="New forwarding" class="mailPromptModal">
          <template #content>
            <Form
              class="formCard"
              :label-width="100"
              label-position="left"
            >
              <FormItem prop="mail" class="formItem recipient">
                <span slot="label">Recipient:<span class="required">*</span></span>
                <tag v-for="item in selectedMails" :key="item" :closable="true" @on-close="removeMailSelect(item)">{{ item }}</tag>
                <Dropdown
                  trigger="custom"
                  :visible="showEmailHistory"
                  class="mailModalDropdown"
                  @on-click="handleMailSelect"
                  @on-clickoutside="showEmailHistory = false"
                >
                  <div class="mailInput">
                    <Input
                      v-model="mail"
                      placeholder="Enter your e-mail"
                      @on-focus="showEmailHistory = true"
                    >
                      <Icon
                        v-show="mail !== ''"
                        slot="suffix"
                        class="mailIcon"
                        type="md-checkmark"
                        color="var(--primary-color)"
                        @click="handleMailSelect(mail)"/>
                    </Input>
                    <div v-show="!validateMail" class="validateText">Please enter a valid email address</div>
                  </div>
                  <DropdownMenu slot="list">
                    <DropdownItem v-show="mail" :name="mail">{{ mail }}</DropdownItem>
                    <DropdownItem
                      v-for="item in filteredMailHistory"
                      :key="item"
                      :name="item"
                      :class="{'selected': selectedMails.includes(item)}"
                      >
                      <Row justify="space-between">
                        <span>{{ item }}</span>
                        <Icon type="md-close-circle" @click.stop="removeMailHistory(item)"/>
                      </Row>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </FormItem>
              <FormItem prop="remark" class="formItem remark">
                <span slot="label">Remark:</span>
                <Input
                  v-model="remark"
                  type="textarea"
                  maxlength="200"
                  show-word-limit
                  :autosize="{minRows: 5,maxRows: 5}"
                  placeholder="Enter something...">
                </Input>
              </FormItem>
            </Form>
            <Row justify="center" class-name="footerBox">
              <Button class="loginPromptBtn" @click="handleMailModalCancel">Cancel</Button>
              <Button type="primary" class="loginPromptBtn" @click="handleMailModalConfirm">Confirm</Button>
            </Row>
          </template>
        </CommonPromptModal>
      </template>
    </CommonCard>
  </Row>
  </ClientOnly>
</section>
</template>

<script>
import CommonCard from "~/components/tenderDetail/CommonCard.vue";
import {langList} from "~/lang/langList";
import UnlockedMask from "~/components/tenderDetail/UnlockedMask.vue";
import CommonPromptModal from "~/components/tenderDetail/CommonPromptModal.vue";
import LanguageModal from "~/components/common/LanguageModal.vue";
import pageCode from "~/enums/pageCodes";
import {tenderList} from "~/enums/mockData";

import targetLanguageIcon from '~/assets/imgs/svg/targetLanguage.svg';

export default {
  name: "TenderDetailPage",
  components: {CommonPromptModal, LanguageModal, UnlockedMask, CommonCard},
  asyncData({ $axios, params }) {
    try {
      const bid = tenderList.find(item => item.id === Number(params.id));
      // 或者从API获取
      // const res = await $axios.get(`/getTenderById`, { params: { tenderId: params.id } });
      // const bid = res.data.tender;

      const emptyBid = {...bid, detail: '', winner: ''}
      return {
        // bid: bid || {},
        bid: emptyBid || {},
        // tender: bid || {},
        tender: emptyBid || {},
      }; // 确保返回的对象不为undefined
    } catch (error) {
      return { bid: {}, tender: {} };
    }
  },
  data() {
    return {
      indeterminate: false,
      checkAll: false,
      checkAllGroup: [],
      isPc: true,

      translateStatus: 'A',
      swap: false,
      selectDownload: false,

      targetLanguageIcon,
      nav: [
        {
          label: 'Notice',
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
      // bid: {}, // 当前标讯
      translateLang: '',
      translateLabel: 'language',
      langList,

      showOriginal: true,
      showTranslated: false,
      showLangList: false,

      currentSelectedDocId: 0,
      // 邮件转发
      mail: '',
      remark: '',
      showEmailHistory: false,
      selectedMails: [],
      mailHistory: [
        'aa@qq.com',
        'aba@qq.com',
        'bb@qq.com',
        'aac@qq.com',
        'cbad@qq.com',
        'dbb@qq.com',
      ],
    }
  },
  head() {
    return {
      title: this.bid.title || this.$route.name,
      meta: [
        // { hid: 'description', name: 'description', content: this.blog.content.slice(0, 150) || 'Default description' },
        { hid: 'keywords', name: 'keywords', content: this.bid.title ? `${this.bid.title}, Tendering, Business` : 'GPTED' },
        { property: 'og:title', content: this.bid.title || 'Default Title' },
        // { property: 'og:description', content: this.blog.content.slice(0, 150) || 'Default description' },
        { property: 'og:type', content: 'article' }
      ]
    }
  },
  computed: {
    filteredMailHistory() {
      const value = this.mail;
      if (value) {
        return this.mailHistory
          .filter(item => item.includes(value))
          .sort((a, b) => a.indexOf(value) - b.indexOf(value));
      } else {
        return this.mailHistory
      }
    },
    validateMail() {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.mail) {
        return re.test(String(this.mail).toLowerCase());
      }
      return true
    },
    showUnlockedMask() {
      return this.bid.detail === '';
    },

    selectedTranslateLangList() {
      if (this.bid.detail === '') {
        return []
      }
      return this.$store.getters["tender/getTranslateList"]
    },
    disableLangList() {
      return this.selectedTranslateLangList
        .filter(item => item.docId === this.currentSelectedDocId && item.tenderId === this.bid.id)
        .map(item => item.lang)
    },
    disableAllLanguageList() {
      return this.$store.getters["tender/getTranslateAllLanguages"]
        .filter(item => item.tenderId === this.bid.id)
        .map(item => item.lang)
    },

  },
  mounted() {
    // 避免普通用户在解锁文章后刷新页面时文章内容丢失
    // if (this.$store.getters["user/getToken"] !== null) {
    //   this.getTenderById();
    // // todo  get user's email history
    // }
    this.isPc = window.innerWidth > 768;
    this.$store.dispatch('tender/nuxtClientInit');
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
    // window.addEventListener('resize', this.calcTimelineMaxHeight);
    // this.$nextTick(() => {
    //   this.calcTimelineMaxHeight()
    // })

  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.calcTimelineMaxHeight)
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    handleCancelSelectedDocs() {
      this.selectDownload = false
    },
    handleDownloadSelectedDocs() {
      this.$Message.success('Download selected documents successfully! 文档id' + this.checkAllGroup);
    },
    // 多选框选择文档 下载
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = this.bid.docs.map(item => (item.id));
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange (data) {
      if (data.length === this.bid.docs.length) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },

    // 修改文档语言显示状态 A/T/TA
    changeTranslateStatus(newStatus) {
      if (newStatus !== 'A' && this.targetLang === '') this.$refs.languageModal.open();
      this.translateStatus = newStatus
    },
    // --------------------
    toTranslateFile(tenderId, docId) {
      const url = this.$router.resolve({
        name: pageCode.TRANSLATE,
        query: { tenderId, docId }
      }).href;
      window.open(url, '_blank');
      // this.$router.push({
      //   name: pageCode.TRANSLATE,
      //   query: { tenderId, docId }
      // })
    },
    getTenderById() {
      // const res = await this.$axios.get(`/getTenderById`, {
      //   params: {
      //     tenderId: this.$route.params.id,
      //   }
      // });
      // this.bid = res.data.tender;
      this.bid = tenderList.find(item => item.id === Number(this.$route.params.id));
    },

    // calcTimelineMaxHeight() {
    //   const leftBox = document.querySelector('.descriptionLeftContent ul');
    //   const stateCard = document.querySelector('.stateCard');
    //   const timelineHeaderHeight = document.querySelector('.timelineCard .header').clientHeight;
    //   const targetHeight = leftBox.clientHeight - stateCard.clientHeight - timelineHeaderHeight - 20;
    //   const targetEl = document.querySelector('.timelineCard .timelineList');
    //
    //   if (window.innerWidth <= 768) {
    //     targetEl.style.height = `auto`;
    //     targetEl.scrollTop = 0;
    //     targetEl.scrollLeft = targetEl.scrollWidth
    //     return
    //   }
    //   targetEl.style.height = `${targetHeight}px`;
    //   targetEl.scrollTop = targetEl.scrollHeight
    // },
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
      if (window.innerWidth >= 768) {
        targetOffsetTop += 24
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

    copyMailLink() {
      // this.$Message.success('Copy link successfully');
    },
    handleCollection() {
      this.checkIsLogin()
      this.bid.hadCollected = !this.bid.hadCollected
    },
    handleLangChange(lang, label) {
      this.checkIsLogin()
      if(!this.allowPermission()) {
        return
      }
      this.translateLang = lang;
      this.translateLabel = label;

      // 其他翻译动作 => fn(val)
      this.showLangList = false
      this.showTranslated = true

    },
    handleOriginalBtnClick() {
      this.checkIsLogin()
      if(!this.allowPermission()) {
        return
      }
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
    },


  //  文档更多 下拉菜单选择
    translateFile(docId) {
      this.checkIsLogin()
      if(!this.allowPermission()) {
        return
      }
      this.currentSelectedDocId = docId;
      this.$refs.langListModal.showModal = true;
    },
    downloadFile(docId, lang) {
      this.checkIsLogin()
      if(!this.allowPermission()) {
        return
      }
      this.currentSelectedDocId = docId;
      // 后端接收前端的请求，并返回图片的下载链接（URL）。
      // 确保返回的HTTP响应头部包含正确的Content-Disposition属性，设置为attachment，这会告诉浏览器这是一个文件下载响应。
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = '#';
      a.download = 'kitty.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    // 单个翻译
    async handleTranslate(lang) {
      const translateItem = {
        tenderId: this.bid.id,
        docId: this.currentSelectedDocId,
        lang,
      }
      await this.translateDoc(translateItem)
    },
    async translateDoc(translateItem) {
      const res = await this.$axios.post('/translate', translateItem);
      const taskId = res.data.taskId;
      const response = await this.$axios.get(`/translate/status/${taskId}`);
      translateItem.taskId = taskId;
      translateItem.progress = response.data.progress;
      this.$store.dispatch('tender/addTranslateList', translateItem);
      this.$store.dispatch('tender/setProgress', taskId);
    },
    // 翻译全部
    openTranslateAllModal() {
      this.checkIsLogin()
      if(!this.allowPermission()) {
        return
      }
      this.$refs.translateAllModal.showModal = true;
    },
    async handleTranslateAll(lang) {
      this.$store.dispatch("tender/addTranslateAllLanguages", {tenderId: this.bid.id, lang})

      const translateList = this.$store.getters["tender/getTranslateList"];
      const untranslatedDocs = this.bid.docs.filter(doc =>
        !translateList.some(item => item.tenderId === this.bid.id && item.docId === doc.id && item.lang === lang)
      );
      for (const doc of untranslatedDocs) {
        const newTranslation = {
          tenderId: this.bid.id,
          docId: doc.id,
          lang,
        };
        await this.translateDoc(newTranslation);
      }
    },
    //   检查用户登录状态
    checkIsLogin() {
      // token
      if (this.$store.getters["user/getToken"] === null) {
        this.$refs.loginPromptModal.showModal = true
      }
    },
    toLogin() {
      this.$router.push({ name: 'login' })
    },
  //  解锁权限
    allowPermission() {
      if (this.bid.detail === '' && this.$store.getters["user/getToken"]) {
        this.$Message.info('Please unlock the tender')
      }
      return this.bid.detail !== '';
    },
  //   解锁标讯 更新标讯
    handleUpdateTender(tender) {
      this.bid = tender;
    },
  //   邮件转发
    handleMailSelect(value) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!re.test(String(value).toLowerCase())) {
        this.$Message.warning('Please input the correct email address')
        return
      }
      if (!this.mailHistory.includes(value)) {
        this.mailHistory.push(value)
      }
      if (!this.selectedMails.includes(value)){
        this.selectedMails.push(value)
      }else {
        this.selectedMails = this.selectedMails.filter(item => item !== value)
      }
      this.mail = ''
    },
    removeMailSelect(value) {
      if (!this.selectedMails.includes(value)){
        this.selectedMails.push(value)
      }else {
        this.selectedMails = this.selectedMails.filter(item => item !== value)
      }
    },
    removeMailHistory(value) {
      this.showEmailHistory = true
      this.mailHistory = this.mailHistory.filter(item => item !== value)
    },
    handleMailModalConfirm () {
      if (this.selectedMails.length === 0) {
        this.$Message.warning('At least input one email address')
        return
      }
      // axios + user auth
      this.$refs.mailPromptModal.showModal = false
      this.selectedMails = []
      this.mail = ''
      this.$Message.success('Email forwarded successfully')
    },
    handleMailModalCancel () {
      this.$refs.mailPromptModal.showModal = false
    }
  }
}
</script>

<style scoped lang="scss">
#tenderDetailPage{
  position: relative;
}
.detailPage{
  padding-left: 100px;
  padding-right: 100px;
  position: relative;
}
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
  align-items: center;
  i{
    color: var(--icon-color2);
    font-size: 20px;
  }
}
.active{
  color: var(--primary-color);
}
.topTenderTitleCard{
  overflow: hidden;
  margin-bottom: 20px;
  .topTenderTitle{
    padding: 16px 30px;
  }
}
.navBox{
  position: sticky;
  justify-content: space-between;
  align-items: center;
  display: flex;
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
    .shareLinks{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 36px;
      padding: 24px 30px;
      li{
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }
    .emailIcon, .shareIcon {
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
      padding: 40px 50px;
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
        &:nth-child(1) {
          padding-top: 0;
        }
        &:nth-last-child(1) {
          border-bottom: 0;
          padding-bottom: 0;
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
    font-size: 16px;
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
  button[disabled="disabled"]{
    border-color: var(--border-color2);
    color: var(--text-color3);
    cursor: not-allowed;
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
  //.transLangSelector{
  //  width: 138px;
  //  height: 30px;
  //}
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
      .docItemMore{
        cursor: pointer;
      }
      .translatedDocs{
        margin-top: 16px;
        ul{
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
          width: 100%;
          li{
            padding: 8px 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: var(--bg-color2);
            border-radius: 4px;
            .iconBox{
              width: 26px;
              height: 28px;
              margin-right: 12px;
              img{
                width: 100%;
              }
            }
            span{
              font-size: 16px;
              color: var(--text-color2);
            }
            .progressBox{
              position: relative;
              width: 28px;
              height: 28px;
              img{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 12px;
                height: 12px;
              }
            }
          }
        }
      }
    }
    .docItem:nth-last-child(1)::after{
      content: none;
    }
  }
}

// modal
.commonPromptModal{
  p{
    margin-bottom: 35px;
  }
  .footerBox{
    margin-top: 30px;
  }
  .loginPromptBtn{
    padding: 12px 65px;
    height: auto;
    margin: 0 5px;
  }
  //.mailPromptModal
  .formCard{
    background: var(--bg-color3);
    border-radius: 6px;
    padding: 30px;
    .formItem{
      position: relative;
      padding-left: 10px;
      &::before{
        position: absolute;
        content: '';
        width: 4px;
        height: 16px;
        background: var(--primary-color);
        left: 0;
        top: 10px;
      }
      span{
        font-weight: bold;
      }
    }
    .recipient{
      margin-bottom: 30px;
      .required{
        color: var(--error-color);
        margin-left: 4px;
      }
      .mailModalDropdown{
        width: 100%;
        position: relative;
        .selected{
          color: var(--primary-color);
        }
        .ivu-dropdown-menu{
          max-height: 150px;
          overflow-y: scroll;
          .ivu-dropdown-item{
            padding: 7px 10px;
          }
        }
        span{
          font-weight: initial;
        }
        i{
          color: var(--icon-color);
        }
        .mailInput{
          position: relative;
          .mailIcon{
            cursor: pointer;
          }
          .validateText{
            margin: 0;
            padding: 0;
            position: absolute;
            top: 38px;
            display: inline;
            line-height: 13px;
            font-size: 13px;
            left: 0;
            color: var(--error-color);
          }
        }
      }
    }
  }

}

</style>
<style scoped lang="scss">
.TABtnGroup{
  border: 1px solid var(--border-color1);
  border-radius: var(--border-radius-large);
  height: 30px;
  overflow: hidden;
  .A, .T, .TA{
    //background: var(--text-bg-color2);
    color: var(--text-color3);
    padding: 0 18px;
    //height: 40px;
    cursor: pointer;
    transition: all .3s;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .A{
    border-radius: 4px 0 0 4px;
  }
  .T{
    position: relative;
    &::after, &::before{
      content: '';
      width: 1px;
      height: 60%;
      position: absolute;
      background: var(--border-color);
      top: 20%;
    }
    &::before{
      left: 0;
    }
    &::after{
      right: 0;
    }
  }
  .TA{
    border-radius: 0 4px 4px 0;
  }
  .active{
    background: var(--primary-bg-color2);
    color: var(--primary-color);
    transition: all .3s;
  }
}
.languageSelector{
  .selector{
    margin-left: 14px;
    width: 180px;
    position: relative;
    .imgBox{
      display: flex;
      width: 28px;
      height: 28px;
      margin-right: 4px;
      margin-left: 8px;
    }
  }
}
.gap{
  margin: 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .swapPlaceBtn{
    background: var(--text-bg-color2);
    padding: 4px 18px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    border-radius: 40px;
  }
  .contentDivider{
    margin-top: 10px;
    flex-grow: 1;
    height: auto;
    background-color: var(--border-color);
  }
}
.swap{
  flex-direction: row-reverse;
}
.documentsBoxBtns{
  margin: 0 70px 40px;
  .cancelBtn{
    margin-right: 10px;
  }
}
</style>
<style scoped lang="scss">

// 移动端 样式
@media screen and (max-width: 768px){
  .topTenderTitle{
    font-size: 15px;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  .navBox{
    top: 63px;
    padding: 8px 15px;
    .navAnchor span{
      font-size: 11px;
      margin-right: 20px;
    }
    .navIcons{
      .emailIcon, .shareIcon {
        margin-right: 15px;
        font-size: 10px;
        height: 10px;
      }
      .collectIcon {
        font-size: 13px;
        height: 13px;
      }
    }
  }
  .descriptionBox, .announcementBox, .documentsBox{
    margin-top: 15px;
    .actionBtn{
      margin-left: 10px;
      height: 20px;
      line-height: 20px;
      font-size: 11px;
    }
    .langChangeBtn .arrowBtn{
      height: 20px;
      line-height: 20px;
    }
  }

  .descriptionBox{
    .descriptionLeftContent{
      ul{
        padding: 20px 15px;
        li{
          font-size: 11px;
          padding: 12px 5px;
          .contentLabel{
            width: 44%;
          }
        }
      }
    }
    .descriptionRightContent{
      .stateCard{
        margin-top: 15px;
        margin-bottom: 15px;
        .topTextBox, .bottomProgressBox{
          font-size: 11px;
        }
        .topTextBox{
          padding: 9px;
        }
        .bottomProgressBox{
          padding: 13px 20px;
          span{
            margin-bottom: 8px;
          }
        }
      }
      .timelineCard {
        .timelineList {
          display: flex;
          overflow-y: hidden;
          overflow-x: scroll;
          padding: 15px;
          .timelineItem {
            padding: 0;
            .timelineDot{
              width: 12px;
              height: 12px;
              &::after{
                width: 5px;
                height: 5px;
              }
            }
            .content{
              font-size: 12px;
              margin-bottom: 3px;
            }
            .time{
              font-size: 11px;
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
      padding: 20px;
      .invitation, .bidTableStyle, pre{
        font-size: 11px;
      }
    }
    .TABtnGroup{
      height: 21px;
      font-size: 11px;
      .A, .T, .TA{
        padding: 0 7px;
      }
    }
    .languageSelector{
      .selector{
        margin-left: 5px;
        width: 116px;
        height: 21px;
        .imgBox{
            width: 12px;
            height: 12px;
            margin-right: 2px;
            margin-left: 2px;
        }
      }
    }
  }
  .documentsBox{
    .documentsBoxBtns{
      position: sticky;
      bottom: 60px;
      margin-left: 10px;
      margin-right: 10px;
      margin-bottom: 20px;
      justify-content: center;
      .cancelBtn{
        margin-right: 20px;
      }
    }
    .docList{
      padding: 0 15px 15px;
      .docItem{
        padding: 20px 5px;
        img{
          width: 23px;
          margin-right: 8px;
        }
        p{
          font-size: 12px;
          margin-bottom: 4px;
          margin-right: 15px;
        }
        span{
          font-size: 11px;
        }
        i{
          font-size: 16px;
        }
        .translatedDocs{
          margin-top: 13px;
          ul{
            grid-template-columns: 1fr;
            li{
              margin-left: 31px;
              .iconBox{
                width: 14px;
                height: 15px;
              }
              span{
                font-size: 11px;
              }

            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
#tenderDetailPage {
  //.ivu-checkbox-wrapper, .ivu-checkbox-group-item{
  //  margin-right: 0;
  //}
  .checkboxSpan{
  margin: 0;
  span{
    margin: 0;
  }
}
}
</style>

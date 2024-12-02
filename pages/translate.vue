<template>
  <div id="translatePage">
    <MobileMenu />
    <!--   ------ 导航栏 start-------- -->
    <Row class-name="pc">
      <Menu mode="horizontal" theme="light" class="floatMainMenu">
        <div class="layout-logo"></div>
        <div class="divider"></div>
        <div class="nav">
          <Row justify="space-between" align="middle">
            <Row align="middle" :wrap="false">
              <Row class="TABtnGroup" :wrap="false">
                <div class="A" :class="{'active' : translateStatus === 'A' }" @click="changeTranslateStatus('A')">A</div>
                <div class="T" :class="{'active' : translateStatus === 'T' }" @click="changeTranslateStatus('T')">T</div>
                <div class="TA" :class="{'active' : translateStatus === 'TA' }" @click="changeTranslateStatus('TA')">T/A</div>
              </Row>
              <Row class="languageSelector" align="middle" :wrap="false">
                <img :src="targetLanguageIcon" alt="Target language">
                <span>Target language:</span>
                <Select v-model="targetLang" class="selector" @on-change="changeTargetLanguage">
                  <Option v-for="item in langList" :key="item.value" :value="item.value">{{ item.label }}</Option>
                </Select>
              </Row>
            </Row>
            <Button class="downloadDocBtn" type="primary" ghost>
              download
              <Icon type="md-arrow-down" />
            </Button>
          </Row>
        </div>
        <div class="divider"></div>
        <Row align="middle" :wrap="false" class="personalInfo">
          <Select v-model="lang" class="langSelector" @on-change="changeLanguage">
            <Icon slot="prefix" type="ios-globe-outline" />
            <Option v-for="item in langList" :key="item.value" :value="item.value">{{ item.label }}</Option>
          </Select>
          <Button v-show="!isLoggedIn" type="primary" ghost @click="isLoggedIn=!isLoggedIn">{{ $t('signIn') }}</Button>
          <Dropdown placement="bottom-end" trigger="click">
            <div v-show="isLoggedIn" class="avatarBox"></div>
            <DropdownMenu slot="list">
              <DropdownItem class="userBasicText">
                <Row align="middle">
                  <div class="avatarBox"></div>
                  <div>
                    <span>Christopher</span>
                    <div class="level">Basic</div>
                  </div>
                </Row>
              </DropdownItem>
              <DropdownItem class="userHoverBox">
                <Row align="middle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Frame">
                      <path id="Vector" d="M11.5262 12.5171C6.00675 12.6239 2.5539 17.111 2.41092 21.489C2.39348 21.7666 2.34163 21.9999 2.24865 22.1616C2.15812 22.3191 2.03073 22.4066 1.85011 22.4066C1.57163 22.4066 1.383 22.3015 1.26147 22.1368C1.13743 21.9688 1.07744 21.7305 1.07744 21.4573C1.07744 17.0039 3.8827 13.2167 7.775 11.7439L7.89331 11.6992L7.79727 11.6168C6.57699 10.5709 5.81027 9.0373 5.81027 7.29415C5.81027 4.12179 8.38998 1.57671 11.5276 1.57671C14.6649 1.57671 17.2097 4.12147 17.2097 7.2588C17.2097 9.00196 16.4429 10.5355 15.2227 11.5815L15.1258 11.6645L15.2454 11.7088C16.1861 12.0572 17.0251 12.6501 17.8353 13.284L17.8674 13.3162L17.8672 13.3163L17.8716 13.3201C17.9897 13.4212 18.1084 13.5569 18.1971 13.6963C18.2872 13.8379 18.3399 13.9733 18.3399 14.0755C18.3399 14.3794 18.2562 14.5288 18.1451 14.6113C18.0273 14.6986 17.8626 14.7247 17.6664 14.7425L17.6523 14.7438L11.5277 12.5921M11.5262 12.5171L11.5277 12.5921M11.5262 12.5171C11.5262 12.5171 11.5262 12.5171 11.5261 12.5171L11.5277 12.5921M11.5262 12.5171C12.4023 12.4992 13.4883 12.6956 14.5008 13.0376C15.5119 13.3791 16.4592 13.8689 17.0534 14.4446M11.5277 12.5921C13.2583 12.5568 15.8366 13.3691 17.0022 14.4994M17.0534 14.4446C17.053 14.4442 17.0527 14.4439 17.0524 14.4436L17.0022 14.4994M17.0534 14.4446C17.0537 14.4449 17.0541 14.4452 17.0544 14.4455L17.0022 14.4994M17.0534 14.4446L17.0022 14.4994M7.74846 11.6738C7.72191 11.6838 7.69541 11.694 7.66896 11.7042C7.67916 11.7131 7.68939 11.7219 7.69965 11.7307L7.74846 11.6738ZM7.74846 11.6738L7.72191 11.6036C7.70936 11.6084 7.69681 11.6132 7.68428 11.618C7.70553 11.6367 7.72692 11.6553 7.74846 11.6738ZM15.2715 11.6384L15.2975 11.5681C15.3103 11.5728 15.3231 11.5776 15.3358 11.5824C15.3145 11.6013 15.2931 11.6199 15.2715 11.6384ZM15.2715 11.6384L15.3203 11.6954C15.3306 11.6865 15.341 11.6776 15.3512 11.6686C15.3247 11.6584 15.2981 11.6483 15.2715 11.6384ZM17.5926 14.7737L17.569 14.7855L17.6026 14.8526L17.6133 14.7783L17.6128 14.7782L17.6069 14.7771C17.6034 14.7763 17.5987 14.7752 17.5926 14.7737ZM7.46156 7.08225C7.46156 8.01723 7.78513 8.97205 8.45278 9.69384C9.12139 10.4167 10.1305 10.9008 11.4912 10.9011C13.8306 10.9724 15.5587 8.95878 15.5231 7.08155C15.523 6.16777 15.2543 5.16111 14.6143 4.38129C13.972 3.59886 12.9612 3.05147 11.4923 3.05147C8.97058 3.05147 7.46156 5.24798 7.46156 7.08225ZM14.4945 18.2035C14.2048 18.2035 13.9573 18.1352 13.7843 18.0064C13.614 17.8797 13.5099 17.6904 13.5099 17.4308C13.5099 17.1529 13.6144 16.9744 13.7814 16.8617C13.9535 16.7457 14.2009 16.6935 14.4945 16.6935H20.1103C20.4018 16.6935 20.6496 16.7538 20.8223 16.8743C20.9912 16.9921 21.0948 17.1718 21.0948 17.4308C21.0948 17.6884 20.9835 17.8782 20.8079 18.006C20.6297 18.1356 20.3815 18.2035 20.1103 18.2035H14.4945ZM14.4945 20.8965H20.075C20.3498 20.8965 20.5991 20.9483 20.7815 21.0618C20.9596 21.1727 21.0782 21.3445 21.0948 21.6009C21.0942 21.8559 20.9843 22.0259 20.8117 22.1357C20.6341 22.2487 20.3853 22.3006 20.1103 22.3006H14.4945C14.201 22.3006 13.9529 22.2484 13.7804 22.1361C13.6129 22.027 13.5099 21.857 13.5099 21.5985C13.5099 21.3422 13.6199 21.1716 13.793 21.0614C13.9706 20.9484 14.2194 20.8965 14.4945 20.8965Z" stroke="white" stroke-width="0.15"/>
                    </g>
                  </svg>
                  <p>User Center</p>
                </Row>
              </DropdownItem>
              <DropdownItem class="userHoverBox" @click.native="signOut">
                <Row align="middle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g id="Frame" clip-path="url(#clip0_792_57389)">
                      <g id="Frame_2" clip-path="url(#clip1_792_57389)">
                        <path id="Vector" d="M21.6533 12.9751H13.0175C12.6345 12.9751 12.2863 12.6617 12.2863 12.2438C12.2863 11.8608 12.5997 11.5126 13.0175 11.5126H21.8622L20.0167 9.66703C19.7381 9.38845 19.7381 8.93578 20.0167 8.6572C20.2952 8.37863 20.7479 8.37863 21.0265 8.6572L24.2286 11.8593C24.3835 12.0142 24.3841 12.2651 24.23 12.4207L21.0265 15.6563C20.7479 15.9349 20.2952 15.9349 20.0167 15.6563C19.7381 15.3777 19.7381 14.9251 20.0167 14.6465L21.6533 12.9751ZM19.4943 5.27953V2.87685C19.4943 1.79738 18.6238 0.96167 17.5792 0.96167H5.07826C4.03362 0.96167 3.16309 1.83221 3.16309 2.87685V21.1581C3.16309 22.2376 4.03362 23.0733 5.07826 23.0733H17.5792C18.6238 23.0733 19.4943 22.2027 19.4943 21.1581V18.7554C19.4943 18.3724 19.1809 18.0242 18.7631 18.0242C18.3452 18.0242 18.0318 18.3376 18.0318 18.7554V20.6706C18.0318 21.1929 17.614 21.6456 17.0568 21.6456H5.53094C5.00862 21.6456 4.55594 21.2277 4.55594 20.6706V3.36435C4.55594 2.84203 4.9738 2.38935 5.53094 2.38935H17.0917C17.614 2.38935 18.0667 2.80721 18.0667 3.36435V5.27953C18.0667 5.66256 18.38 6.01078 18.7979 6.01078C19.1809 6.01078 19.4943 5.69738 19.4943 5.27953Z" />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_792_57389">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                      <clipPath id="clip1_792_57389">
                        <rect width="22.2857" height="22.2857" fill="white" transform="translate(2.57129 0.857178)"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <p>Exit login</p>
                </Row>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Row>
      </Menu>
    </Row>
    <Row class-name="mobile">
      <Menu mode="horizontal" theme="light" class="floatMainMenu">
        <Row align="middle" justify="space-between"  class-name="fullWidth" :wrap="false">
            <Row class="TABtnGroup" :wrap="false">
              <div class="A" :class="{'active' : translateStatus === 'A' }" @click="changeTranslateStatus('A')">A</div>
              <div class="T" :class="{'active' : translateStatus === 'T' }" @click="changeTranslateStatus('T')">T</div>
              <div class="TA" :class="{'active' : translateStatus === 'TA' }" @click="changeTranslateStatus('TA')">T | A</div>
            </Row>
            <Row class="languageSelector" align="middle" :wrap="false">
              <Row align="middle">
                <img :src="targetLanguageIcon" alt="Target language">
                <span>Target language:</span>
              </Row>
              <Select v-model="targetLang" class="selector" @on-change="changeTargetLanguage">
                <Option v-for="item in langList" :key="item.value" :value="item.value">{{ item.label }}</Option>
              </Select>
            </Row>
          </Row>
      </Menu>
    </Row>
    <!--  ------- 导航栏 end ----------- -->
    <!--  -----------  内容 start -------- -->
    <Row :wrap="false" class="translateContent">
      <div class="mainContainer">
        <div
          class="fullWidth" :class="{
        'AorTContainer' : translateStatus !== 'TA',
        'relativeBoxMargin' : dialogOpenStatus && translateStatus !== 'TA',
        'fixedBoxMargin' : translateStatus === 'TA',
         }">
          <Row align="top" class="topOverview">
            <!--        <img :src="require(`~/assets/imgs/tenderDetail/${docData.type}-icon@2x.png`)" alt="" />-->
            <Col flex="1">
              <Row align="top" :wrap="false">
                <img :src="docIcon" alt="" />
                <div>
                  <el-skeleton v-if="!docData" :rows="3" animated/>
                  <p v-else class="title">{{ docData.title }}</p>
                  <Row v-if="docData">
                <span>
            <span>{{ docData.size }}</span><span>{{ docData.date }}</span>
            </span>
                    <ul class="flagList">
                      <li>
                        <Row align="middle">
                          <span :class="['fi', `fi-cn`, 'fi-border']"></span>
                          <span>Chinese</span>
                          <Icon type="ios-arrow-round-down"/>
                        </Row>
                      </li>
                      <li>
                        <Row align="middle">
                          <span :class="['fi', `fi-cz`, 'fi-border']"></span>
                          <span>Czech Republic</span>
                          <Icon type="ios-arrow-round-down"/>
                        </Row>
                      </li>
                    </ul>
                  </Row>
                </div>
              </Row>
            </Col>
            <Col flex="none" class="returnBtnCol">
              <Row class="returnBtn" align="middle" @click.native="toTenderPage()">
                <span>Tendering</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <g id="Frame">
                    <g id="Group 6870">
                      <g id="Vector">
                        <path d="M8.97103 3.33892H4.43761L5.7934 2.44919C6.00524 2.32208 6.04761 2.06787 5.9205 1.85603C5.7934 1.64419 5.53918 1.60182 5.32734 1.72892L2.78524 3.42366C2.65813 3.5084 2.61576 3.6355 2.61576 3.76261C2.61576 3.88971 2.7005 4.01682 2.78524 4.10156L5.32734 5.79629C5.36971 5.88103 5.45445 5.88103 5.53918 5.88103C5.66629 5.88103 5.7934 5.79629 5.87813 5.71155C6.00524 5.49971 5.96287 5.2455 5.75103 5.1184L4.35287 4.18629H8.97103C10.8352 4.18629 12.3605 5.71156 12.3605 7.57577C12.3605 9.43998 10.8352 10.9652 8.97103 10.9652H1.34471C1.0905 10.9652 0.921027 11.1347 0.921027 11.3889C0.921027 11.6431 1.0905 11.8126 1.34471 11.8126H8.97103C11.3013 11.8126 13.2079 9.90603 13.2079 7.57577C13.2079 5.2455 11.3013 3.33892 8.97103 3.33892Z" fill="#AAAAAA"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23257 1.57096C5.51714 1.40022 5.89071 1.44834 6.07846 1.76125C6.24858 2.04479 6.20143 2.41666 5.8916 2.60507L5.05406 3.15471H8.97103C11.403 3.15471 13.3921 5.14377 13.3921 7.57577C13.3921 10.0078 11.403 11.9968 8.97103 11.9968H1.34471C1.17574 11.9968 1.02062 11.9397 0.907283 11.8264C0.793943 11.713 0.736816 11.5579 0.736816 11.3889C0.736816 11.22 0.793943 11.0648 0.907283 10.9515C1.02062 10.8382 1.17574 10.781 1.34471 10.781H8.97103C10.7335 10.781 12.1763 9.33824 12.1763 7.57577C12.1763 5.81329 10.7335 4.3705 8.97103 4.3705H4.96128L5.84985 4.96289C6.15913 5.15142 6.2061 5.52299 6.03609 5.80633L6.02442 5.82578L6.00839 5.84181C5.91169 5.93851 5.7398 6.06524 5.53918 6.06524C5.53706 6.06524 5.53483 6.06524 5.53248 6.06525C5.49495 6.06533 5.42943 6.06546 5.36677 6.04756C5.30251 6.0292 5.2393 5.99203 5.19232 5.92767L2.66788 4.24471L2.65498 4.23181C2.55829 4.13512 2.43155 3.96322 2.43155 3.76261C2.43155 3.59303 2.49061 3.39869 2.68306 3.27039L5.23257 1.57096ZM5.42553 1.88486L2.88742 3.57693C2.82565 3.61811 2.79997 3.67797 2.79997 3.76261C2.79997 3.81324 2.83811 3.88949 2.90368 3.95912L5.47023 5.67016L5.48289 5.69548C5.48449 5.69562 5.48624 5.69575 5.48815 5.69588C5.50172 5.69675 5.51688 5.69682 5.53918 5.69682C5.58868 5.69682 5.66265 5.66037 5.731 5.59749C5.80009 5.46533 5.7619 5.33974 5.65625 5.27636L5.64873 5.27184L3.74446 4.00208H8.97103C10.937 4.00208 12.5447 5.60982 12.5447 7.57577C12.5447 9.54171 10.937 11.1494 8.97103 11.1494H1.34471C1.25947 11.1494 1.20274 11.1771 1.1678 11.212C1.13285 11.247 1.10524 11.3037 1.10524 11.3889C1.10524 11.4742 1.13285 11.5309 1.1678 11.5658C1.20275 11.6008 1.25947 11.6284 1.34471 11.6284H8.97103C11.1996 11.6284 13.0237 9.80429 13.0237 7.57577C13.0237 5.34724 11.1996 3.52313 8.97103 3.52313H3.82116L5.69854 2.2911C5.80932 2.22464 5.84601 2.08991 5.76254 1.9508C5.69662 1.84094 5.56342 1.80402 5.42553 1.88486Z" fill="#AAAAAA"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </Row>
            </Col>
          </Row>
          <Row class-name="docDetail" :class="{'swap': swap}">
            <Col v-show="translateStatus === 'A' || translateStatus === 'TA'" flex="1">
              <span v-if="docData" class="invitation">Invitation for Bids</span>
              <el-skeleton v-if="!docData" :rows="16" animated/>
              <pre v-else>
                {{ docData.detail.origin }}
              {{ docData.detail.origin }}
              </pre>
            </Col>
            <div v-show="translateStatus === 'TA'" class="gap">
              <div class="swapPlaceBtn" @click="swap = !swap">
                <Icon type="ios-swap" />
              </div>
              <Divider v-show="translateStatus === 'TA'" type="vertical" class="contentDivider"/>
            </div>
            <Col v-show="translateStatus === 'T' || translateStatus === 'TA'" flex="1">
              <div v-if="targetLang === ''">
                <span>请选择目标翻译语言</span>
              </div>
              <div v-else>
                <div v-if="translating" class="progressMask">
                  <TranslateProgressMask @on-finish="translating = false"/>
                </div>
                <div v-else>
                  <span v-if="docData" class="invitation">招标公告附件详情</span>
                  <el-skeleton v-if="!docData" :rows="16" animated/>
                  <pre v-else>
                {{ docData.detail[targetLang] }}
              </pre>
                </div>
              </div>

            </Col>
          </Row>
        </div>
      </div>
    </Row>
    <!--  -----------  内容 end ---------- -->
    <!--  ----------   返回顶部 + AI悬浮按钮 start ------ -->
    <div class="floatBtnContainer">
      <MyBackTop class="backTop" />
      <div class="divider"></div>
      <div class="aiLogo" @click="openAiDialogBox">
        <img :src="aiLogoIcon" alt="">
      </div>
    </div>
    <AiDialogBox ref="aiDialogBox" @on-close="dialogOpenStatus = false"/>
    <!--  ----------  返回顶部 + AI悬浮按钮 end --------- -->
    <!--  --------  目标翻译语言️弹窗 start --------- -->
    <LanguageModal ref="languageModal" @onSelectLanguage="changeTargetLanguage"/>
    <!--  --------  目标翻译语言️弹窗 end ----------- -->
  </div>
</template>

<script>
import {langList} from "~/lang/langList";
import pageCode from "~/enums/pageCodes";
import docIcon from '~/assets/imgs/svg/docx.svg';
import targetLanguageIcon from '~/assets/imgs/svg/targetLanguage.svg';
import aiLogoIcon from '~/assets/imgs/svg/aiLogo.svg';
import MyBackTop from "~/components/translate/MyBackTop.vue";
import AiDialogBox from "~/components/translate/AiDialogBox.vue";
import LanguageModal from "~/components/common/LanguageModal.vue";
import MobileMenu from "~/components/common/MobileMenu.vue";
export default {
  name: "Index",
  components: {MobileMenu, LanguageModal, AiDialogBox, MyBackTop},
  layout: 'translate',
  async asyncData({route, $axios}) {
    // 获取文档内容
    const tenderId = Number(route.query.tenderId)
    const docId = Number(route.query.docId)
    const res =await $axios.get(`/getTenderById`, {
      params: {
        tenderId
      }
    });
    const docData = res.data.tender.docs.find(item => item.id === docId);
    return{
      tenderId,
      docId,
      docData
    }
  },
  data() {
    return {
      lang: this.$i18n.defaultLocale,
      langList,
      isLoggedIn: false,
      translateStatus: 'A',
      targetLang: '', // 文档目标翻译语言 zh en
      docIcon,
      targetLanguageIcon,
      aiLogoIcon,

      translating: false,
      dialogOpenStatus: false,
      swap: false
    }
  },
  methods: {
    // 修改文档语言显示状态 A/T/TA
    changeTranslateStatus(newStatus) {
      if (newStatus !== 'A' && this.targetLang === '') this.$refs.languageModal.open();
      this.translateStatus = newStatus
    },
    // 根据翻译选择状态打开ai对话框
    openAiDialogBox() {
      this.dialogOpenStatus = true
      this.$refs.aiDialogBox.open()
    },

    getIconPath(type) {
      // 映射不同的文件路径
      const iconMap = {
        docx: require('~/assets/imgs/tenderDetail/docx-icon@2x.png'),
        pdf: require('~/assets/imgs/tenderDetail/pdf-icon@2x.png'),
        xlsx: require('~/assets/imgs/tenderDetail/xlsx-icon@2x.png')
        // 可以添加更多类型
      };
      return iconMap[type] || require('~/assets/imgs/tenderDetail/docx-icon@2x.png');
    },

    // 文档翻译
    changeTargetLanguage(val) {
      this.translating = true
      if (val) {
        this.targetLang = val;
      }
    },
    // 返回标讯详情页
    toTenderPage() {
      this.$router.push({
        name: pageCode.TENDERS_ID,
        params: { id: this.tenderId },
      })
    },
    // // 全局
    changeLanguage() {
      this.$i18n.setLocale(this.lang)
    },
    signIn() {
      this.$router.push({ name: 'login' })
    },
    signOut() {
      this.$Message.info({
        content: 'sign out!',
        top: 150,
      })
    }
  }
}
</script>
<style scoped lang="scss">
.mobile{
  display: none;
}
.layout-logo{
  width: 146px;
  height: 44px;
  background-image: url("@/assets/imgs/svg/GPTED.svg");
  background-repeat: round;
}
.nav{
  flex-grow: 1;
}
.floatMainMenu{
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 76px;
  line-height: initial;
  background: var(--bg-color1);
  box-shadow: 0 1px 10px 0 rgba(0,0,0,0.08);
  padding: 0 48px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 20;
  .langSelector{
    width: 100px;
    margin-right: 24px;
  }
  .avatarBox{
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--primary-color);
  }

  .userBasicText{
    background: var(--bg-color2);
    padding: 20px 30px;
    border-bottom: 1px solid var(--border-color);
    .avatarBox{
      margin-right: 16px;
    }
    span{
      font-size: 14px;
      font-weight: bold;
    }
  }
  .userHoverBox{
    padding: 20px 30px;
    position: relative;
    &::after{
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: calc(100% - 20px);
      margin: 0 auto;
      height: 1px;
      background: var(--border-color);
    }
    svg{
      margin-right: 12px;
      path{
        fill: var(--text-color3);
      }
    }
    p{
      color: var(--text-color3);
      font-size: 14px;
    }
    &:hover{
      svg path{
        fill: var(--primary-color);
      }
      p{
        color: var(--primary-color);
      }
    }
  }
  .userHoverBox:nth-last-child(1)::after{
    content: none;
  }
}
.divider{
  width: 1px;
  height: 46px;
  background: var(--divider-color);
  margin: 0 40px;
}
.TABtnGroup{
  .A, .T, .TA{
    background: var(--text-bg-color2);
    color: var(--text-color2);
    padding: 0 18px;
    height: 40px;
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
  margin-left: 14px;
  background: var(--text-bg-color2);
  color: var(--text-color2);
  padding: 0 14px;
  height: 40px;
  border-radius: 4px;
  img{
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
  .selector{
    margin-left: 14px;
    width: 150px;
  }
}
.translateContent{
  margin-bottom: 40px;
}
.mainContainer{
  display: flex;
  width: 100%;
  .AorTContainer{
    margin: 0 300px;
    transition: all .3s;
  }
  .relativeBoxMargin{
    margin-left: 50px;
    margin-right: calc(40vw + 20px);
    transition: all .3s;
  }
  .fixedBoxMargin{
    margin: 0 50px;
    transition: all .3s;
  }
  .topOverview{
    background: var(--light-color);
    border: 1px solid var(--border-color);
    padding: 24px 28px;
    border-radius: var(--border-radius-base);
    .title{
      font-size: 16px;
      margin-bottom: 4px;
    }
    .returnBtn{
      background: var(--text-bg-color2);
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      span{
        font-size: 15px;
        margin-right: 10px;
      }
    }
    .flagList{
      display: flex;
      li{
        margin-right: 24px;
        span{
          margin-right: 10px;
        }
        .fi-border{
          box-shadow: 0 0 4px 1px var(--border-color);
        }
      }
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
  .swap{
    flex-direction: row-reverse;
  }
  .progressMask{
    min-height: 300px;
  }
  .docDetail{
    //min-height: calc(100vh - 76px - 120px - 40px - 20px);
    margin-top: 20px;
    background: var(--light-color);
    padding: 30px 56px;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-base);
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

    .invitation{
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 16px;
      display: inline-block;
    }

    pre{
      font-size: 14px;
      white-space: pre-line;
      margin: 0;
    }
  }
}
.floatBtnContainer{
  box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.08);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 70px;
  position: fixed;
  right: 50px;
  bottom: 300px;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  .backTop{
    padding: 16px;
    cursor: pointer;
  }
  .divider{
    height: 1px;
    width: 100%;
    margin: 0;
  }
  .aiLogo{
    cursor: pointer;
    width: 40px;
    padding-top: 16px;
    padding-bottom: 6px;
    img{
      width: 100%;
    }
  }
}
</style>
<style scoped lang="scss">
@media (max-width: 768px) {
  .pc{
    display: none;
  }
  .mobile{
    display: block;
  }
  .floatMainMenu{
    top: 50px;
    padding: 11px 25px;
    height: auto;
    .TABtnGroup{
      .A, .T, .TA{
        height: 25px;
        padding: 7px 14px;
        font-size: 11px;
      }
    }
    .languageSelector{
      flex-grow: 1;
      height: 25px;
      line-height: 25px;
      font-size: 11px;
      padding: 0 8px;
      margin-left: 7px;
      img{
        margin-right: 4px;
      }
      .selector{
        flex-grow: 1;
        margin-left: 7px;
        width: 60px;
      }
    }
  }
  .mainContainer{
    .AorTContainer, .relativeBoxMargin, .fixedBoxMargin{
      margin: 0 25px;
    }
    .topOverview{
      flex-direction: column-reverse;
      padding: 10px 12px;
      .returnBtnCol{
        width: 100%;
        margin-bottom: 14px;
        .returnBtn{
          display: flex;
          justify-content: space-between;
          padding: 8px 11px;
          font-size: 11px;
          span{
            font-size: 11px;
          }
          svg{
            width: 11px;
            height: 11px;
          }
        }
      }
      img{
        width: 23px;
        height: 25px;
        margin-right: 8px;
      }
      .title{
        font-size: 12px;
      }
      span{
        font-size: 11px;
      }
      .flagList {
        margin-top: 8px;
        li span{
        margin-right: 4px;
      }
      }
      i{
        font-size: 16px;
      }
    }
    .docDetail{
      padding: 18px 20px;
      margin-top: 10px;
      .invitation, pre{
        font-size: 11px;
      }
    }
  }
  .floatBtnContainer{
    bottom: 40px;
    right: 10px;
    padding: 7px;
    .backTop{
      padding: 8px;
    }
    .aiLogo{
      padding-top: 8px;
      padding-bottom: 0;
      width: 28px;
    }
  }
}
</style>

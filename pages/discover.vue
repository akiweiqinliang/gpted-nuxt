<template>
  <div>
  <section id="discoverPage">
    <Modal
      v-model="saveModal"
      :title="$t('新建分组对话窗_modalTitle')"
      :cancel-text="$t('cancel')"
      :ok-text="$t('confirm')"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <Row :wrap="false" align="middle">
        <span class="nameInputLabel">Name:</span>
        <Input placeholder="Please enter"/>
      </Row>
      <div class="modalTextBox">
        <Checkbox v-model="agree">Synchronize changes to push groups</Checkbox>
        <p>When notification is on, you will receive the latest project information that matches this search.</p>
      </div>
    </Modal>
    <GroupSettingModal ref="commonGroupModal" @delete="deletePreviousSetting"/>
    <Row :gutter="28">
      <!--      移动端搜索框-->
      <Col :xs="24" :sm="24" :md="0" :lg="0">
        <Input v-model.trim="searchText" class="discoverSearchInput" @on-focus="showBehindScenes = true" >
          <template slot="suffix">
            <Row>
              <Icon v-show="searchText !== ''" class="closeIcon" type="md-close" @click="searchText = ''"/>
              <Icon class="searchIcon" :class="searchText !== '' ? 'inputHasText' : ''" type="ios-search" />
            </Row>
          </template>
        </Input>
        <Drawer v-model="showBehindScenes" class-name="searchInputDrawer" height="100%" placement="top" :closable="false">
          <div class="drawerInnerBox">
            <Row :wrap="false" align="middle" justify="space-between" class-name="searchBox">
              <Icon type="ios-arrow-back" class="backIcon" @click="showBehindScenes = false"/>
              <Input v-model.trim="searchText" class="discoverSearchInput drawerInput" :class="showDropdown ? 'inputWithDropdownEffect' : ''" >
                <template slot="suffix">
                  <Row>
                    <Icon v-show="searchText !== ''" class="closeIcon" type="md-close" @click="searchText = ''"/>
                    <Icon class="searchIcon" :class="searchText !== '' ? 'inputHasText' : ''" type="ios-search" />
                  </Row>
                </template>
              </Input>
            </Row>
            <div v-show="history.length !== 0" class="searchHistory">
              <Row justify="space-between" align="middle">
                <h4>{{$t('搜索框弹窗_history')}}</h4>
                <Icon type="ios-trash-outline" color="var(--icon-color)" @click="clearHistory"/>
              </Row>
              <ul>
                <li v-for="(item, index) in history" :key="`${item}-${index}`" @click="selectHistoryItem(item)">
                  <Icon type="ios-close-circle" @click.stop="clearHistoryItem(item)" />
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="classification">
              <h4>{{$t('搜索框弹窗_filterGrouping')}}</h4>
              <List :split="false">
                <ListItem v-for="item in previousSetting" :key="`${item}-${item.id}`" class="classificationItem">
                  <div class="labelBox">
                    <Icon type="ios-browsers" />
                    <span>{{ item.label }}</span>
                  </div>
                  <Icon type="ios-create-outline" @click="editSetting(item.id)"/>
                </ListItem>
              </List>
            </div>
          </div>
        </Drawer>
      </Col>
      <!--      左侧筛选栏-->
      <Col :xs="24" :sm="24" :md="7" :lg="7">
        <Row class="topFilterClearer" align="middle" justify="space-between">
          <Row align="middle" :justify="isPC? 'space-between': 'center'" :class="{'fullWidth' : isPC}">
            <span>{{$t('filters')}}</span>
            <Icon type="md-refresh" />
          </Row>
          <Icon v-if="!isPC" type="ios-arrow-down" @click="handleShowFilter"/>
        </Row>
        <Row
          v-show="showSaveSettingBtn"
          class="topFilterClearer saveSettingBtn"
          align="middle"
          justify="center"
          @click.native="handleSaveSetting"
        >
          <span>{{$t('保留搜索设置提示_SaveMsg')}}</span>
        </Row>
        <div v-show="showFilter" class="filterSettingCard">
          <SingleSetting :title="$t('搜索页左侧筛选栏标题_scope')">
            <template slot="content">
              <RadioGroup v-model="searchSetting.scope" vertical class="commonRadio fullWidth">
                <Radio v-for="(item, idx) in $t('搜索页左侧筛选栏内容列表_searchScope')" :key="`scope-${idx}`" :label="idx">
                  {{item}}
                </Radio>
              </RadioGroup>
            </template>
          </SingleSetting>
          <SingleSetting :title="$t('搜索页左侧筛选栏标题_announcementType')">
            <template slot="content">
              <CheckboxGroup v-model="searchSetting.announcementType" class="commonCheckBox fullWidth">
                <Checkbox v-for="(item, idx) in $t('搜索页左侧筛选栏内容列表_announcementType')" :key="`announcement-type-${idx}`" :label="idx">
                  {{item}}
                </Checkbox>
              </CheckboxGroup>
            </template>
          </SingleSetting>
          <TreeFilter field="location" :title="$t('搜索页左侧筛选栏标题_location')" :tag-list="searchSetting.location" :tree-data="searchSettingData.locations" @handleSearchSettingUpdate="handleSearchSettingUpdate"/>
          <TreeFilter field="organization" :title="$t('搜索页左侧筛选栏标题_organization')" :tag-list="searchSetting.organization" :tree-data="searchSettingData.categories" @handleSearchSettingUpdate="handleSearchSettingUpdate"/>
          <TreeFilter field="industry" :title="$t('搜索页左侧筛选栏标题_industry')" :tag-list="searchSetting.industry" :tree-data="searchSettingData.categories" @handleSearchSettingUpdate="handleSearchSettingUpdate"/>
          <SingleSetting :title="$t('搜索页左侧筛选栏标题_procurementMethod')">
            <template slot="content">
              <CheckboxGroup v-model="searchSetting.method" class="commonCheckBox fullWidth">
                <Checkbox :label="1">
                  <span>text-text</span>
                </Checkbox>
                <Checkbox :label="2">
                  <span>text-text</span>
                </Checkbox>
                <Checkbox :label="3">
                  <span>text-text</span>
                </Checkbox>
              </CheckboxGroup>
            </template>
          </SingleSetting>
          <SingleSetting :title="$t('搜索页左侧筛选栏标题_content')">
            <template slot="content">
              <CheckboxGroup v-model="searchSetting.content" class="commonCheckBox fullWidth">
                <Checkbox v-for="(item, idx) in $t('搜索页左侧筛选栏内容列表_content')" :key="`content-${idx}`" :label="idx">
                  {{item}}
                </Checkbox>
              </CheckboxGroup>
            </template>
          </SingleSetting>
          <SingleSetting :title="$t('搜索页左侧筛选栏标题_priceRange')">
            <template slot="content">
              <Row :wrap="false" class-name="priceContent">
                <Input></Input>
                <div class="priceDivider">-</div>
                <Input></Input>
              </Row>
            </template>
          </SingleSetting>
          <SingleSetting :title="$t('搜索页左侧筛选栏标题_releaseTime')">
            <template slot="content">
              <DatePicker
                v-model="searchSetting.releaseTime"
                type="daterange"
                :options="timeOption"
                class="fullWidth"
                placeholder="Release time"></DatePicker>
            </template>
          </SingleSetting>
          <SingleSetting :title="$t('搜索页左侧筛选栏标题_deadlineTime')">
            <template slot="content">
              <DatePicker
                v-model="searchSetting.deadlineTime"
                type="daterange"
                :options="timeOption"
                class="fullWidth"
                placeholder="Deadline time"></DatePicker>
            </template>
          </SingleSetting>
        </div>
        <Row
          v-show="showFilter"
          class="topFilterClearer bottomApplyBtn"
          align="middle"
          justify="center"
          @click.native="handleApply">
          <span>{{$t('apply')}}</span>
        </Row>
      </Col>
      <!--      tender列表-->
      <Col :xs="24" :sm="24" :md="17" :lg="17">
        <Col :xs="0" :sm="0" :md="24" :lg="24">
<!--          pc端搜索框-->
          <div v-click-outside="handleClickOutside" class="topInputBox">
            <Input v-model.trim="searchText" class="discoverSearchInput" :class="showDropdown ? 'inputWithDropdownEffect' : ''" @on-focus="showDropdown = true">
              <template slot="suffix">
                <Row>
                  <Icon v-show="searchText !== ''" class="closeIcon" type="md-close" @click="searchText = ''"/>
                  <Icon class="searchIcon" :class="searchText !== '' ? 'inputHasText' : ''" type="ios-search" />
                </Row>
              </template>
            </Input>
            <div v-if="showDropdown" class="dropdownMenu">
              <div v-show="history.length !== 0" class="searchHistory">
                <Row justify="space-between" align="middle">
                  <h4>{{$t('搜索框弹窗_history')}}</h4>
                  <Icon type="ios-trash-outline" color="var(--icon-color)" @click="clearHistory"/>
                </Row>
                <ul>
                  <li v-for="(item, index) in history" :key="`${item}-${index}`" @click="selectHistoryItem(item)">
                    <Icon type="ios-close-circle" @click.stop="clearHistoryItem(item)" />
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div class="classification">
                <h4>{{$t('搜索框弹窗_filterGrouping')}}</h4>
                <List :split="false">
                  <ListItem v-for="item in previousSetting" :key="`${item}-${item.id}`" class="classificationItem">
                    <div class="labelBox">
                      <Icon type="ios-browsers" />
                      <span>{{ item.label }}</span>
                    </div>
                    <Icon type="ios-create-outline" @click="editSetting(item.id)"/>
                  </ListItem>
                </List>
              </div>
              <Row v-show="previousSetting.length > 6" class-name="classificatoryPagination" justify="center">
                <Page :current="1" :total="8" :page-size="6" simple />
              </Row>
            </div>
          </div>
        </Col>
        <Row class="suggestionBox" justify="space-between">
          <Poptip v-if="isPC" word-wrap width="200" :content="$t('搜索建议内容_searchSuggestionsContent')">
            <Icon type="ios-alert-outline" />
            <span>{{$t('搜索建议_searchSuggestions')}}</span>
          </Poptip>
          <h4 v-else>345461 {{$t('result')}}</h4>
          <Row class-name="filterActions">
            <span
              :class="{'sortActive': releaseSortFlag}"
              @click="handleReleaseSort">
              {{$t('发布_release')}}
              <Icon v-if="releaseSortFlag" type="ios-arrow-up"/>
            </span>
            <span
              :class="{ 'sortActive': deadlineSortFlag }"
              @click="handleDeadlineSort">
              {{$t('最后期限_deadline')}}
              <Icon v-if="deadlineSortFlag" type="ios-arrow-up"/>
            </span>
          </Row>
        </Row>
        <ul class="tenderListBox">
          <SpinLoad ref="spin"/>
          <li v-for="tender in tenderList" :key="`${tender.id}-card`">
            <BidCard :tender="tender"/>
          </li>
          <Row justify="center">
            <Page :total="tenderList.length" />
          </Row>
        </ul>
      </Col>
    </Row>
  </section>
  </div>
</template>

<script>
import { tenderList } from "~/enums/tenderList";
import SingleSetting from "~/components/discover/SingleSetting.vue";
import {searchSettingData} from "~/enums/searchSettingData";
import GroupSettingModal from "~/components/common/GroupSettingModal.vue";
import TreeFilter from "~/components/discover/TreeFilter.vue";
import { previousSetting } from "~/enums/mockData";
import SpinLoad from "~/components/common/SpinLoad.vue";

export default {
  name: "DiscoverPage",
  components: {
    SpinLoad,
    TreeFilter,
    GroupSettingModal,
    // CustomTree,
    SingleSetting},
  data () {
    return {
      releaseSortFlag: false,
      deadlineSortFlag: false,
      loading: false,

      isPC: true,
      showFilter: false,
      saveModal: false,
      agree: false,
      showSaveSettingBtn: false,
      timeOption: {
        shortcuts: [
          {
            text: '1 week',
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: '1 month',
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: '3 months',
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      searchSetting: {
        scope: 1,
        announcementType: [1,],
        location: [],
        organization: [],
        industry: [],
        method: [],
        content: [],
        releaseTime: [],
        deadlineTime: [],

      },
      searchText: '',
      selectPreviousSettingID: '',
      showDropdown: false,
      history: ['Search1', 'fewdvdfarefdfefdwerfd', 'Search2', 'Search3', 'Key companies and organization sssssss', 'fewdvdfrefdfefdwerfd'],

      // 虚拟数据
      previousSetting,
      tenderList,
      searchSettingData,

      //   mobile
      showBehindScenes: false
    }
  },
  mounted() {
    if (this.$route.query.keywords) {
      this.searchText = this.$route.query.keywords
    }
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleReleaseSort() {
      this.releaseSortFlag = !this.releaseSortFlag;
      // todo 模拟加载
      this.$refs.spin.start();
      this.loading = true;
      setTimeout(() => {
        this.$refs.spin.finish()
        this.loading = false;
      }, 2000)
    },
    handleDeadlineSort() {
      this.deadlineSortFlag = !this.deadlineSortFlag;
      // todo 模拟加载
      this.$refs.spin.start();
      this.loading = true;
      setTimeout(() => {
        this.$refs.spin.finish()
        this.loading = false;
      }, 2000)
    },
    handleSearchSettingUpdate({ field, value }) {
      if (field === 'location') this.searchSetting.location = value
      if (field === 'organization') this.searchSetting.organization = value
      if (field === 'industry') this.searchSetting.industry = value
    },
    handleResize() {
      this.showFilter = window.innerWidth > 768;
      this.isPC = window.innerWidth > 768;
    },
    // modal弹窗
    ok () {
      this.showSaveSettingBtn = false;
      this.$Message.info('Clicked ok');
    },
    cancel () {
      this.$Message.info('Clicked cancel');
    },
    editSetting(id) {
      this.selectPreviousSettingID = id;
      this.$refs.commonGroupModal.showModal = true
      // this.$refs.commonGroupModal.settings = this.searchSetting
    },
    deletePreviousSetting() {
      this.previousSetting = this.previousSetting.filter(item => item.id !== this.selectPreviousSettingID)
      this.selectPreviousSettingID = ''
    },
    // -- 左侧搜索栏 Location部分
    handleLocationSelect(val) {
      this.searchSetting.location = val
    },
    removeLocation(val) {
      this.$refs.locationTree.removeChecked(val)
    },
    // 手机端控制筛选列表的显示
    handleShowFilter() {
      this.showFilter = !this.showFilter;
    },
    handleApply() {
      this.showSaveSettingBtn = true;
      if(!this.isPC) this.showFilter = false;
      //   apply
    },
    handleSaveSetting() {
      this.saveModal = true;
      // this.showSaveSettingBtn = false;
    },
    // --- pc端右侧顶部搜索框
    handleClickOutside() {
      this.showDropdown = false
    },
    selectHistoryItem(item) {
      this.searchText = item;
    },
    clearHistory() {
      this.history = [];
    },
    clearHistoryItem(item) {
      //  axios
      this.history = this.history.filter(el => el !== item)
    }
  }
}
</script>

<style scoped lang="scss">
.sortActive{
  color: var(--primary-color);
}
section{
  padding-left: 100px;
  padding-right: 100px;
}
.topFilterClearer{
  width: 100%;
  background: linear-gradient(to right, var(--primary-color), var(--primary-light-color));
  border-radius: var(--border-radius-base);
  color: var(--light-color);
  padding: 14px 24px;
  margin-bottom: 20px;
  span{
    font-weight: bold;
  }
}
.saveSettingBtn{
  background: var(--light-color);
  border: 1px solid var(--primary-color);
  color: var(--text-color1);
  cursor: pointer;
  span{
    font-weight: 400;
  }
}
.bottomApplyBtn{
  cursor: pointer;
  border-radius: 100px;
  margin-bottom: 0;
  margin-top: 30px;
}
.filterSettingCard{
  background-color: var(--bg-color1);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-base);
  padding: 20px 24px 30px;
  //.selectorTree{
  //  max-height: 480px;
  //  overflow-y: scroll;
  //  padding-right: 24px;
  //  padding-left: 24px;
  //}
  .priceContent{
    .priceDivider{
      margin: 0 10px;
    }
  }

  .LocationSetting{
    .locationTree{
      margin-top: 16px;
    }
    .selectedTags{
      .selectedTag{
        height: auto;
        line-height: normal;
        margin: 3px 6px 3px 0;
        padding: 7px 12px;
        border: 1px solid var(--primary-color);
        border-radius: 3px;
        background: white;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
        font-size: 14px;
        .ivu-icon-ios-close {
          top: 0;
        }
        .flag{
          margin-right: 10px;
        }
      }
    }
  }
}
.discoverSearchInput{
  i{
    font-size: 22px;
    line-height: 50px;
    cursor: pointer;
  }
  .closeIcon{
    margin-right: 12px;
  }
  .searchIcon{
    margin-right: 6px;
  }
  .searchIcon::before{
    padding: 8px 16px;
    border-radius: 8px;
  }
}
.inputWithDropdownEffect i:nth-last-child(1)::before{
  background: var(--primary-color);
  color: var(--light-color);
}
.inputHasText::before{
  background: var(--primary-color);
  color: var(--light-color);
}

.topInputBox{
  position: relative;
}
.dropdownMenu {
  padding-bottom: 16px;
  position: absolute;
  background-color: white;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 15;
  border-left: 2px solid var(--primary-color);
  border-right: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  border-radius: 0 0 var(--border-radius-base) var(--border-radius-base);
}
.searchHistory{
  padding: 0 20px;
  h4{
    margin: 16px 0 10px;
  }
  i{
    cursor: pointer;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      padding: 6px 12px;
      background-color: var(--tag-bg-color);
      margin-right: 10px;
      cursor: pointer;
      border-radius: 3px 3px 3px 3px;
      position: relative;
      margin-bottom: 10px;
      i{
        position: absolute;
        top: -8px;
        right: -8px;
        display: none;
        color: var(--icon-color);
      }
      &:hover{
        background-color: var(--tag-hover-bg-color);
        i{
          display: block;
        }
      }
    }
  }
}
.classification{
  h4{
    margin: 16px 0 10px;
    padding: 0 20px;
  }
  .classificationItem{
    display: flex;
    width: 100%;
    padding: 18px 20px;
    position: relative;
    ::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 20px;
      right: 0;
      width: calc(100% - 40px);
      height: 1px;
      background-color: var(--divider-color2);
    }
    &:nth-last-child(1){
      ::after{
        content: none;
      }
    }
    i{
      &:nth-child(1) {
        margin-right: 16px;
        color: var(--icon-color1);
      }
      &:nth-child(2) {
        color: var(--icon-color);
        cursor: pointer;
      }
    }
    .labelBox{
      flex: 1;
      display: flex;
      margin-right: 16px;
      span{
        display: block;
      }
    }
    &:hover {
      background-color: var(--primary-bg-color1);
      i{
        color: var(--primary-color);
      }
    }
  }
}
.classificatoryPagination{
  margin-top: 16px;
}

.suggestionBox{
  margin: 14px 0 16px;
  font-size: 12px;
  color: var(--text-color3);
  .filterActions{
    span{
      display: inline-block;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
.tenderListBox{
  position: relative;
}
// mobile -------------
@media screen and (max-width: 768px){
  section{
    padding-left: 0;
    padding-right: 0;
  }
  .discoverSearchInput{
    .searchIcon{
      margin-right: 4px;
      &::before{
        padding: 4px 8px;
      }
    }
  }
  .searchInputDrawer{
    .drawerInnerBox{
      i{
        font-size: 20px;
      }
      .searchBox{
        margin-top: 75px;
        padding-left: 15px;
        padding-right: 25px;
        .searchIcon,.backIcon{
          font-size: 25px;
        }
        .backIcon{
          margin-right: 10px;
        }
      }
    }
  }
  .topFilterClearer{
    margin: 20px 0 15px;
  }
  .suggestionBox{
    margin: 0 0 15px;
  }
  .bottomApplyBtn{
    position: sticky;
    bottom: 80px;
    z-index: 10;
    width: 100%;
  }
}

.nameInputLabel{
  margin-right: 16px;
}

</style>

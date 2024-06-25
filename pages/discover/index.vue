<template>
  <section>
    <Row :gutter="28">
      <Col :xs="24" :sm="24" :md="24" :lg="0">
        <Input v-model="searchText" class="discoverSearchInput" @on-focus="showBehindScenes = true" >
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
              <Icon type="ios-arrow-back" @click="showBehindScenes = false"/>
              <Input v-model="searchText" class="discoverSearchInput drawerInput" :class="showDropdown ? 'inputWithDropdownEffect' : ''" >
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
                <h4>History</h4>
                <Icon type="ios-trash-outline" color="var(--icon-color)" size="20" @click="clearHistory"/>
              </Row>
              <ul>
                <li v-for="(item, index) in history" :key="`${item}-${index}`" @click="selectHistoryItem(item)">
                  <Icon type="ios-close-circle" size="18" @click="clearHistoryItem(item, $event)" />
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="classification">
              <h4>Collection classification</h4>
              <List :split="false">
                <ListItem v-for="item in previousSetting" :key="`${item}-${item.id}`" class="classificationItem">
                  <div class="labelBox">
                    <Icon type="ios-browsers" size="20"/>
                    <span>{{ item.label }}</span>
                  </div>
                  <Icon type="ios-create-outline" size="20"/>
                </ListItem>
              </List>
            </div>
          </div>
        </Drawer>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="7">
        <Row class="topFilterClearer" align="middle" justify="space-between">
          <span>Filters</span>
          <Icon type="md-refresh" />
        </Row>
        <div class="filterSettingCard">
          <SingleSetting>
            <span slot="title">Search scope</span>
            <template slot="content">
              <RadioGroup v-model="searchSetting.scope" vertical class="commonRadio fullWidth">
                <Radio label="global">
                  <span>Global</span>
                </Radio>
                <Radio label="title">
                  <span>Title</span>
                </Radio>
              </RadioGroup>
            </template>
          </SingleSetting>
          <SingleSetting>
            <span slot="title">Announcement type</span>
            <template slot="content">
              <CheckboxGroup v-model="searchSetting.announcementType" class="commonCheckBox fullWidth">
                <Checkbox :label="1">
                  <span>Winning the bid</span>
                </Checkbox>
                <Checkbox :label="2">
                  <span>Tendering</span>
                </Checkbox>
                <Checkbox :label="3">
                  <span>Abandoned bid</span>
                </Checkbox>
              </CheckboxGroup>
            </template>
          </SingleSetting>
          <SingleSetting>
            <span slot="title">Active state</span>
            <template slot="content">
              <CheckboxGroup v-model="searchSetting.activeState" class="commonCheckBox fullWidth">
                <Checkbox :label="1">
                  <span>Active</span>
                </Checkbox>
                <Checkbox :label="2">
                  <span>Inactive</span>
                </Checkbox>
              </CheckboxGroup>
            </template>
          </SingleSetting>
          <SingleSetting>
            <span slot="title">Location</span>
            <template slot="action">

            </template>
            <template slot="content">

            </template>
          </SingleSetting>
        </div>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="17">
          <Col :xs="0" :sm="0" :md="0" :lg="24">
            <div v-click-outside="handleClickOutside" class="topInputBox">
              <Input v-model="searchText" class="discoverSearchInput" :class="showDropdown ? 'inputWithDropdownEffect' : ''" @on-focus="showDropdown = true">
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
                    <h4>History</h4>
                    <Icon type="ios-trash-outline" color="var(--icon-color)" size="20" @click="clearHistory"/>
                  </Row>
                  <ul>
                    <li v-for="(item, index) in history" :key="`${item}-${index}`" @click="selectHistoryItem(item)">
                      <Icon type="ios-close-circle" size="18" @click="clearHistoryItem(item, $event)" />
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div class="classification">
                  <h4>Collection classification</h4>
                  <List :split="false">
                    <ListItem v-for="item in previousSetting" :key="`${item}-${item.id}`" class="classificationItem">
                      <div class="labelBox">
                        <Icon type="ios-browsers" size="20"/>
                        <span>{{ item.label }}</span>
                      </div>
                      <Icon type="ios-create-outline" size="20"/>
                    </ListItem>
                  </List>
                </div>
                <Row v-show="previousSetting.length > 6" class-name="classificatoryPagination" justify="center">
                  <Page :current="1" :total="8" :page-size="6" simple />
                </Row>
              </div>
            </div>
          </Col>
        <Row class="suggestionBox">
          <Poptip word-wrap width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
            <Icon type="ios-alert-outline" />
            <span>Search suggestions</span>
          </Poptip>
        </Row>
        <ul>
          <li v-for="tender in tenderList" :key="`${tender.id}-card`">
            <BidCard :tender="tender"/>
          </li>
        </ul>
      </Col>
    </Row>
  </section>
</template>

<script>
import { tenderList } from "~/enums/tenderList";
import SingleSetting from "~/components/discover/SingleSetting.vue";

export default {
  name: "DiscoverPage",
  components: { SingleSetting},
  data () {
    return {
      searchSetting: {
        scope: 'global',
        announcementType: [1,],
        activeState: [],
        location: []
      },
      searchText: '',
      showDropdown: false,
      history: ['Search1', 'fewdvdfarefdfefdwerfd', 'Search2', 'Search3', 'Key companies and organization sssssss', 'fewdvdfrefdfefdwerfd'],
      previousSetting: [
        {
          id: 1,
          label: 'Key companies and organizations that require '
        },
        {
          id: 2,
          label: 'Key companies  organizations that  attention'
        },
        {
          id: 3,
          label: 'Key companies and organizations that require attention'
        },
        {
          id: 4,
          label: 'Key companies and  that require attention'
        },
        {
          id: 5,
          label: 'Key companies'
        },
        {
          id: 6,
          label: 'Key companies and organizations that require attention'
        },
        {
          id: 7,
          label: 'KKey companies and organizations that require attentionKey companies and organizations that require attentioney companies and organizations that require attention'
        },
        {
          id: 8,
          label: 'Key companies and organizations that require attention'
        },
      ],
      tenderList,

    //   mobile
      showBehindScenes: false
    }
  },
  methods: {
    handleClickOutside() {
      this.showDropdown = false
    },
    selectHistoryItem(item) {
      this.searchText = item;
    },
    clearHistory() {
      this.history = [];
    },
    clearHistoryItem(item, event) {
      //  axios
      event.stopPropagation();
      this.history = this.history.filter(el => el !== item)
    }
  }
}
</script>

<style scoped lang="scss">
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
.filterSettingCard{
  background-color: var(--bg-color1);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-base);
  padding: 20px 24px 30px;
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
  .searchIcon:before{
    padding: 8px 16px;
    border-radius: 8px;
  }
}
.inputWithDropdownEffect i:nth-last-child(1):before{
  background: var(--primary-color);
  color: var(--light-color);
}
.inputHasText:before{
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
}
// mobile -------------
@media screen and (max-width: 768px){
  .searchInputDrawer{
    .drawerInnerBox{
      .searchBox{
        margin-top: 150px;
        padding-left: 25px;
        padding-right: 50px;
      }
      i{
        font-size: 50px;
      }
    }
  }
}

</style>

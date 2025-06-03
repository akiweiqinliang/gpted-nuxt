<template>
  <div v-click-outside="close" class="floatStyle">
    <Button icon="ios-funnel" class="actionBtn" @click="showScreen = !showScreen">{{$t('screen')}}</Button>
    <div v-show="showScreen" class="container">
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

      <Row :gutter="10" class="footerContainer">
        <Col flex="1">
          <Button class="footerBtn" @click="cancel">{{ $t('cancel') }}</Button>
        </Col>
        <Col flex="1">
          <Button type="primary" class="footerBtn" @click="confirm">{{ $t('confirm') }}</Button>
        </Col>
      </Row>
    </div>
  </div>

</template>

<script>
import {searchSettingData} from "~/enums/searchSettingData";
import SingleSetting from "~/components/discover/SingleSetting.vue";
import TreeFilter from "~/components/discover/TreeFilter.vue";

export default {
  name: "FloatScreen",
  components: {TreeFilter, SingleSetting},
  data() {
    return {
      showScreen: false,
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
    }
  },
  computed: {
    searchSettingData() {
      return searchSettingData
    }
  },
  methods: {
    handleSearchSettingUpdate({ field, value }) {
      if (field === 'location') this.searchSetting.location = value
      if (field === 'organization') this.searchSetting.organization = value
      if (field === 'industry') this.searchSetting.industry = value
    },
    confirm() {
      this.$emit('confirm', this.searchSetting)
      this.close()
    },
    cancel() {
      // this.$emit('close')
      // this.showScreen = false
      this.close()
    },
    close() {
      this.showScreen = false
    },
    open() {
      this.showScreen = true
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  box-shadow: 2px 2px 12px 0 rgba(0,0,0,0.06);
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 20;
  background: white;
  border-radius: 10px;
  padding: 30px;
  width: 325px;
  max-height: 80vh;
  overflow-y: scroll;
}
.footerBtn{
  height: 42px;
  line-height: 42px;
  //width: 110px;
  width: 100%;
}
.footerContainer{
  position: sticky;
  bottom: 0;
}
.actionBtn{
  margin-left: 10px;
  color: var(--text-color3);
  position: relative;
}

.floatStyle{
  position: fixed;
  top: 106px;
  z-index: 901;
  right: 30px;
}
@media screen and (min-width: 1740px){
  .floatStyle{
    //margin-right: calc(50vw - 720px - 120px - 30px);
  }
}
</style>

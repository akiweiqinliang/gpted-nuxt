<template>
  <div>
    <Modal id="groupSettingModal" v-model="showModal" class-name="groupSettingModal" :fullscreen="fullscreen" width="78%" :title="title">
      <template #footer>
        <Row justify="center">
          <div class="footerBtn" @click="showModal = false">
            {{ $t('cancel') }}
          </div>
          <div class="footerBtn confirmBtn" @click="showModal = false">
            {{ $t('confirm') }}
          </div>
        </Row>
      </template>
      <Row justify="space-between" class-name="groupNameContainer">
        <Row align="middle">
          <span>Name:</span><Input v-model="groupSettings.groupName" class="nameBox" />
        </Row>
        <Button type="error" ghost @click="deleteGroup"><Icon type="ios-close-circle-outline" />delete</Button>
      </Row>
      <div class="setting">
        <TagList header-title="Subscription keywords" :tags.sync="groupSettings.keywords" :origin-tags="groupSettings.originKeywords" />
      </div>
      <div class="setting">
        <SettingHead title="Announcement type" @on-refresh="updateModalWidth" />
        <div class="contentContainer">
        <SettingCheckboxGroup
          :model-value="groupSettings.announcementType"
          :options="$t('announcementType')"
          @on-change="groupSettings.announcementType = $event" />
        </div>
      </div>
      <div class="setting">
        <TagList header-title="Location" :show-tag-flag="true" :tags.sync="groupSettings.location" :origin-tags="groupSettings.originLocations" />
      </div>
      <div class="setting">
        <TagList header-title="International organization" :show-tag-flag="true" :tags.sync="groupSettings.organization" :origin-tags="groupSettings.originOrganizations" />
      </div>
      <div class="setting">
        <TagList header-title="Industry" :tags.sync="groupSettings.industry" :origin-tags="groupSettings.originIndustry" />
      </div>
      <div class="setting">
        <SettingHead title="Content" @on-refresh="handleRefresh" />
        <div class="contentContainer">
          <SettingCheckboxGroup
            :model-value="groupSettings.content"
            :options="$t('tenderContent')"
            @on-change="groupSettings.content = $event" />
        </div>
      </div>
      <div class="setting">
        <SettingHead title="Price range" @on-refresh="handleRefresh" />
        <Row :wrap="false" align="middle">
          <span class="priceInput">
           <Input placeholder="Price From"/>
          </span>
          -
          <span class="priceInput">
           <Input placeholder="Price To" />
          </span>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
import TagList from "~/components/common/TagList.vue";
// import SettingHead from "~/components/common/SettingHead.vue";
import SettingCheckboxGroup from "~/components/dashboard/settings/SettingCheckboxGroup.vue";
import SettingHead from "~/components/common/SettingHead.vue";
export default {
  name: "GroupSettingModal",
  components: {SettingHead, SettingCheckboxGroup, TagList},
  props: {
    title: {
      type: String,
      required: false,
      default() {
        return 'Filter grouping'
      }
    }
  },
  data() {
    return {
      fullscreen: false,
      showModal: false,

      groupSettings: {
        groupName: 'Wdalibocai Information Technology Co. Ltd',
        keywords: ['Engineering', 'Medical devices', 'Engineering', 'Traffic and road conditions materials'],
        originKeywords: ['Engineering', 'Medical devices', 'Engineering', 'Traffic and road conditions materials'],

        announcementType: [1],
        scope: 'title',
        location: ['China', 'United States', 'Germany', 'Japan', 'United Kingdom'],
        originLocations: ['China', 'United States', 'Germany', 'Japan', 'United Kingdom'],
        organization: ['World Bank', 'Asian Development Bank', 'United Nations'],
        originOrganizations: ['World Bank', 'Asian Development Bank', 'United Nations'],
        industry: ['Construction', 'Healthcare', 'Technology', 'Transportation'],
        originIndustry: ['Construction', 'Healthcare', 'Technology', 'Transportation'],
        method: [],
        content: [1],
        releaseTime: [],
        deadlineTime: [],
      },
    }
  },
  mounted() {
    this.updateModalWidth()
    window.addEventListener('resize', this.updateModalWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateModalWidth);
  },
  methods: {
    deleteGroup() {
      this.$emit('delete')
      this.showModal = false
      this.$Message.success(this.$t('deleteSuccess'))
    },
    updateModalWidth() {
      this.fullscreen = window.innerWidth < 768;
    },
    handleRefresh() {
      this.$emit('on-refresh');
    }
  }
}
</script>

<style scoped lang="scss">

.setting{
  margin-bottom: 46px;
}
.footerBtn{
  padding: 12px;
  width: 120px;
  height: 42px;
  margin: 0 5px;
  background: var(--text-bg-color1);
  //border: 1px solid var(--border-color3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
}
.confirmBtn{
  background: var(--primary-color);
  color: white;
}

.settingHead{
  padding: 6px 14px 14px 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color3);
}
.contentContainer{
  padding: 0 20px;
}
.groupNameContainer{
  margin-bottom: 50px;
  .nameBox{
    width: 300px;
    margin-left: 10px;
  }
  .deleteNameBtn{
    padding: 0 12px;
    height: 30px;
    line-height: 30px;
    border: 1px solid var(--error-color);
    color: var(--error-color);
    border-radius: 3px;
    cursor: pointer;
    i{
      margin-right: 8px;
      font-size: 18px;
    }
  }
}
.headerBox{
  position: relative;
  .decBox{
    width: 18px;
    height: 18px;
    background: linear-gradient( 135deg, rgba(30,107,255,0.5) 0%, rgba(30,107,255,0) 86%);
    border-radius: 50%;
    border: 0 solid;
    border-image: linear-gradient(135deg, rgba(172, 172, 172, 1), rgba(102, 102, 102, 0)) 0 0;
    position: absolute;
    left: 8px;
  }
  span{
    margin: 0 20px;
    font-weight: bold;
    font-size: 14px;
  }
  .keywordNum{
    margin-left: 10px;
    color: var(--primary-color);
  }
}

.priceInput{
  width: 155px;
  margin: 0 10px;
}
.ivu-modal-footer{
  background: white;
}
</style>

<style lang="scss" scoped>
// Responsive styles
@media screen and (max-width: 768px) {
  .setting{
    margin-bottom: 35px;
  }
  .footerBtn{
    padding: 4px;
    width: 90px;
    height: 33px;
  }
  .groupNameContainer {
    margin-bottom: 35px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    span{
      font-size: 13px;
    }
    .nameBox{
      display: inline-block;
      width: auto;

    }
  }
  .contentContainer{
    padding: 0 12px;
  }

}
</style>
<style>
#groupSettingModal .ivu-modal-body{
  max-height: 60vh;
  overflow-y: scroll;
}

@media screen and (max-width: 768px){
  #groupSettingModal .ivu-modal-body{
    max-height: initial;
    overflow-y: initial;
  }
}
</style>

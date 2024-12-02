<template>
  <div>
    <Modal v-model="showModal" class-name="groupSettingModal" width="1124" :title="title">
      <template #footer>
        <Row justify="center">
          <Button class="footerBtn" @click="showModal = false">Cancel</Button>
          <Button type="primary" class="footerBtn" @click="showModal = false">Confirm</Button>
        </Row>
      </template>
      <Row justify="space-between" class-name="groupNameContainer">
        <Row align="middle">
          <span>Name:</span><Input v-model="groupName" class="nameBox" />
        </Row>
        <Button type="error" ghost @click="deleteGroup"><Icon type="ios-close-circle-outline" />delete</Button>
      </Row>
      <div class="setting">
        <TagList header-title="Subscription keywords" :tags.sync="keywords" :origin-tags="originKeywords" />
      </div>
      <div class="setting">
        <Row justify="space-between" class-name="settingHead fullWidth">
          <div class="headerBox">
            <div class="decBox"></div>
            <span>Announcement type</span>
          </div>
          <Icon type="md-refresh" size="20"/>
        </Row>
        <div class="contentContainer">
          <CheckboxGroup v-model="announcementType">
            <Checkbox label="0">All</Checkbox>
            <Checkbox label="1">Ongoing tenders</Checkbox>
            <Checkbox label="2">Award notice</Checkbox>
            <Checkbox label="3">Forecast notice</Checkbox>
          </CheckboxGroup>
        </div>
      </div>
      <div class="setting">
        <TagList header-title="Location" :show-tag-flag="true" :tags.sync="keywords" :origin-tags="originKeywords" />
      </div>
      <div class="setting">
        <TagList header-title="International organization" :show-tag-flag="true" :tags.sync="keywords" :origin-tags="originKeywords" />
      </div>
      <div class="setting">
        <TagList header-title="Industry" :tags.sync="keywords" :origin-tags="originKeywords" />
      </div>
      <div class="setting">
        <Row justify="space-between" class-name="settingHead fullWidth">
          <div class="headerBox">
            <div class="decBox"></div>
            <span>Content</span>
          </div>
          <Icon type="md-refresh" size="20"/>
        </Row>
        <div class="contentContainer">
          <CheckboxGroup v-model="content">
            <Checkbox label="0">All</Checkbox>
            <Checkbox label="1">Ongoing tenders</Checkbox>
            <Checkbox label="2">Award notice</Checkbox>
            <Checkbox label="3">Forecast notice</Checkbox>
            <Checkbox label="4">Ongoing tenders</Checkbox>
            <Checkbox label="5">Award notice</Checkbox>
            <Checkbox label="6">Forecast notice</Checkbox>
          </CheckboxGroup>
        </div>
      </div>
      <div class="setting">
        <Row justify="space-between" class-name="settingHead fullWidth">
          <div class="headerBox">
            <div class="decBox"></div>
            <span>Price range</span>
          </div>
          <Icon type="md-refresh" size="20"/>
        </Row>
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
export default {
  name: "GroupSettingModal",
  components: {TagList},
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
      showModal: false,
      groupName: 'Wdalibocai Information Technology Co. Ltd',
      keywords: ['Engineering', 'Medical devices', 'Engineering', 'Traffic and road conditions materials'],
      originKeywords: ['Engineering', 'Medical devices', 'Engineering', 'Traffic and road conditions materials'],

      announcementType: ['0'],
      scope: 'title',
      location: [],
      organization: [],
      industry: [],
      method: [],
      content: ['0'],
      releaseTime: [],
      deadlineTime: [],
    }
  },
  methods: {
    deleteGroup() {
      this.$emit('delete')
      this.showModal = false
      this.$Message.success(this.$t('deleteSuccess'))
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
  height: auto;
  margin: 0 5px;
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
</style>

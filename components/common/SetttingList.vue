<template>
<div>
  <Row justify="space-between" class-name="groupNameContainer">
    <Row align="middle">
      <span>Name:</span><Input v-model="groupName" class="nameBox" />
    </Row>
<!--    <div class="deleteNameBtn" @click="groupName = ''"><Icon type="ios-close-circle-outline" />delete</div>-->
  </Row>
  <div class="setting">
    <TagList header-title="Subscription keywords" :tags.sync="keywords" :origin-tags="originKeywords" />
  </div>
  <div class="setting">
    <SettingHead title="Announcement type" />
    <div class="contentContainer">
      <CheckboxGroup v-model="announcementType">
        <Checkbox v-for="(item, idx) in $t('announcementType')" :key="`announcement-type-${idx}`" :label="idx">{{item}}</Checkbox>
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
    <SettingHead title="Content" />
    <div class="contentContainer">
      <CheckboxGroup v-model="content">
        <Checkbox v-for="(item, idx) in $t('tenderContent')" :key="`tender-content-${idx}`" :label="idx">{{item}}</Checkbox>
      </CheckboxGroup>
    </div>
  </div>
  <div class="setting">
    <SettingHead title="Price range" />
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
  <Row justify="center">
    <Button class="footerBtn" @click="cancel">Cancel</Button>
    <Button type="primary" class="footerBtn" @click="confirm">Confirm</Button>
  </Row>
</div>
</template>

<script>
import TagList from "~/components/common/TagList.vue";
import SettingHead from "~/components/common/SettingHead.vue";

export default {
  name: "SettingList",
  components: {SettingHead, TagList},
  data() {
    return {
      groupName: 'Wdalibocai Information Technology Co. Ltd',
      keywords: ['Engineering', 'Medical devices', 'Engineering', 'Traffic and road conditions materials'],
      originKeywords: ['Engineering', 'Medical devices', 'Engineering', 'Traffic and road conditions materials'],

      announcementType: [0],
      scope: 'title',
      location: [],
      organization: [],
      industry: [],
      method: [],
      content: [0],
      releaseTime: [],
      deadlineTime: [],
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm')
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
.priceInput{
  width: 155px;
  margin: 0 10px;
}
</style>

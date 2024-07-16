<template>
  <div>
    <Modal v-model="showModal" class-name="groupSettingModal" width="1124" :title="title">
      <Row justify="space-between" class-name="groupNameContainer">
        <Row align="middle">
          <span>Name:</span><Input v-model="groupName" clearable class="nameBox" />
        </Row>
        <div class="deleteNameBtn"><Icon type="ios-close-circle-outline" />delete</div>
      </Row>
      <TagList header-title="Subscription keywords" :tags.sync="keywords" :origin-tags="originKeywords" />
      <Row justify="space-between" class-name="fullWidth">
        <div class="headerBox">
          <div class="decBox"></div>
          <span>Announcement type</span>
        </div>
        <Icon type="md-refresh" />
      </Row>
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

      settings: {
        scope: 'title',
        announcementType: [1,],
        location: [],
        organization: [],
        industry: [],
        method: [],
        content: [],
        releaseTime: [],
        deadlineTime: [],
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.groupNameContainer{
  margin-bottom: 50px;
  .nameBox{
    width: 300px;
    margin-left: 10px;
  }
  .deleteNameBtn{
    padding: 6px 12px;
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
  margin-bottom: 20px;
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
</style>

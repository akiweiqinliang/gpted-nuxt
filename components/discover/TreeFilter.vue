<template>
  <SingleSetting :title="title" class="LocationSetting" :show-action="true" @action="showContent = !showContent">
    <template slot="content">
      <div class="selectedTags">
        <tag
          v-for="(item,idx) in tagList"
          :key="idx"
          class="selectedTag"
          closable
          @on-close="removeLocation(item)">
                <span>
                  <span v-show="item.ISO" :class="['fi', `fi-${item.ISO}`, 'flag']"></span>
                  {{item.label}}</span>
        </tag>
      </div>
      <client-only>
        <CustomTree
          ref="myTree"
          :class="{ 'myTree': tagList.length > 0, 'open': showContent, 'close': !showContent }"
          :tree-data="treeData"
          @on-select="handleLocationSelect" />
      </client-only>
<!--      <client-only>-->
<!--        <CustomTree-->
<!--          v-show="showContent"-->
<!--          ref="myTree"-->
<!--          :class="{ 'myTree': tagList.length > 0, 'open': showContent, 'close': !showContent }"-->
<!--          :tree-data="treeData"-->
<!--          @on-select="handleLocationSelect" />-->
<!--      </client-only>-->
    </template>
  </SingleSetting>
</template>

<script>
import SingleSetting from "~/components/discover/SingleSetting.vue";
import CustomTree from "~/components/discover/CustomTree.vue";

export default {
  name: "TreeFilter",
  components: {CustomTree, SingleSetting},
  props: {
    field: {
      type: String,
      default() {
        return ''
      }
    },
    title: {
      type: String,
      default() {
        return ''
      }
    },
    tagList: {
      type: Array,
      default() {
        return []
      }
    },
    treeData: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      showContent: false,
    }
  },
  methods: {
    // -- 左侧搜索栏 Location部分
    handleLocationSelect(val) {
      this.$emit('handleSearchSettingUpdate', {
        field: this.field,
        value: val,
      })
    },
    removeLocation(val) {
      this.$refs.myTree.removeChecked(val)
    },
  }
}
</script>

<style scoped lang="scss">
.close{
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.open{
  max-height: 1000px;
  overflow: auto;
  transition: max-height 0.3s ease;
}
.LocationSetting{
  .myTree{
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
</style>

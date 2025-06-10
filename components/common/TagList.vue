<template>
  <Row>
    <SettingHead v-if="!hideHeader" :title="headerTitle" :tag-num="newTags.length" @on-refresh="resetKeywords"/>
    <Row align="middle" class-name="contentContainer">
      <Button v-show="!showTagInput" class="addBtn" @click="openTagInput">
        <Icon type="ios-add" />
        <span>{{$t('add')}}</span>
      </Button>
      <TimePicker
        v-show="showTagInput && useTimePeriod"
        v-model="newTagText"
        confirm
        :steps="[1, 15, 15]"
        placeholder="Select time"
        class="timePeriodPicker"
        @on-ok="handleAddTag"
        @on-open-change="handleTimePickerChange"
      ></TimePicker>
      <Input
        v-show="showTagInput && !useTimePeriod"
        ref="tagInput"
        v-model.trim="newTagText"
        clearable
        placeholder="按回车保存"
        class="addInput"
        @on-blur="handleAddTag"
        @keyup.native.enter="handleAddTag"
      />
      <tag
        v-for="(tag, index) in newTags"
        :key="`${tag}-${index}`"
        class="selectedTag"
        :name="tag"
        closable
        @on-close="handleCloseTag"
      >
        <span v-if="showTagFlag" :class="['fi', `fi-cn`, 'countryFlag']"></span>
        {{ tag }}
      </tag>
    </Row>
  </Row>

</template>

<script>
import SettingHead from "~/components/common/SettingHead.vue";

export default {
  name: "TagList",
  components: {SettingHead},
  props: {
    hideHeader: {
      required: false,
      type: Boolean,
      default() {
        return false
      }
    },
    useTimePeriod: {
      required: false,
      type: Boolean,
      default() {
        return false
      }
    },
    headerTitle: {
      required: false,
      type: String,
      default() {
        return ''
      }
    },
    showTagFlag: {
      required: false,
      type: Boolean,
      default() {
        return false
      }
    },
    tags: {
      required: false,
      type: Array,
      default() {
        return []
      }
    },
    originTags: {
      required: false,
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      newTagText: '', // 新增标签文本
      newTags: [...this.tags],
      showTagInput: false,
    }
  },
  watch: {
    tags: {
      handler(newTags) {
        this.newTags = [...newTags]; // 保持 newTags 与 props 中的 tags 同步
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    resetKeywords() {
      this.newTags = [...this.originTags]; // 使用扩展运算符创建新的数组实例
      this.$emit('update:tags', this.newTags)
    },
    openTagInput() {
      this.showTagInput = true;
      this.$nextTick(function () {
        this.$refs.tagInput.focus();
      });
    },
    handleAddTag() {
      if (this.newTagText === '') {
        this.showTagInput = false;
        return;
      }
      if (this.newTags.includes(this.newTagText)) {
        this.$Message.info('该标签已存在');
        this.newTagText = '';
        this.showTagInput = false;
        return;
      }
      this.newTags.push(this.newTagText);
      this.$emit('update:tags', this.newTags)
      this.newTagText = '';
      this.showTagInput = false;
      this.$Message.success('该内容已成功添加到订阅范围');
    },
    handleCloseTag(event, name) {
      //   axios
      const index = this.newTags.indexOf(name);
      this.newTags.splice(index, 1);
      this.$emit('update:tags', this.newTags)
      this.$Message.success('该内容已从订阅范围删除');
    },
    // 选择时间 弹出浮层和关闭浮层时触发
    handleTimePickerChange(pickerModalStatus) {
      if (!pickerModalStatus) this.showTagInput = false
    }
  }
}
</script>

<style scoped lang="scss">
.contentContainer{
  padding: 0 20px;
}
.addBtn{
  margin-right: 10px;
  border: 1px solid var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  line-height: 30px;
  padding: 0 20px;
  border-radius: 3px;
  color: var(--primary-color);
  background: var(--primary-bg-color1);
  cursor: pointer;
  span{
    margin-left: 4px;
  }
}
.addInput{
  width: 300px;
  margin-right: 10px;
}
.selectedTag{
  margin: 3px 10px 3px 0;
  padding: 0 12px;
  height: 30px;
  line-height: 30px;
  border: 1px solid var(--primary-color);
  border-radius: 3px;
  background: var(--bg-color1);
  font-size: 14px;
  .flag{
    margin-right: 10px;
  }
}
// 时间段 taglist
.timePeriodPicker{
  width: 300px;
  margin-right: 10px;
}

@media screen and (max-width: 768px) {
  .contentContainer{
    padding: 0 12px;
  }
}
</style>

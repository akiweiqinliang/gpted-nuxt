<template>
  <Row>
    <Row justify="space-between" align="middle" class-name="headerContainer fullWidth">
      <div class="headerBox">
        <div class="decBox"></div>
        <span>{{ headerTitle }}<span class="keywordNum">{{ newTags.length }}</span></span>
      </div>
      <Icon type="md-refresh" size="20" @click="resetKeywords" />
    </Row>
    <Row align="middle" class-name="contentContainer">
      <div v-show="!showTagInput" class="addBtn" @click="openTagInput">
        <Icon type="ios-add" />
        <span>Add</span>
      </div>
      <Input
        v-show="showTagInput"
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
export default {
  name: "TagList",
  props: {
    headerTitle: {
      required: true,
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
  }
}
</script>

<style scoped lang="scss">
.headerContainer{
  padding: 6px 14px 14px 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color3);
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
}
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
</style>

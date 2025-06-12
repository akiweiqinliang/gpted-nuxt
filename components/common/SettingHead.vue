<template>
  <Row justify="space-between" class-name="settingHead fullWidth">
    <div class="headerBox">
      <div class="decBox"></div>
      <span>{{title}}<span v-if="tagNum > 0" class="keywordNum">{{ tagNum }}</span></span>
    </div>
    <Icon type="md-refresh" class="refreshIcon" @click="handleRefresh"/>
  </Row>
</template>

<script>
export default {
  name: "SettingHead",
  props: {
    title: {
      type: String,
      required: true,
      default() {
        return ''
      }
    },
    tagNum: {
      type: Number,
      required: false,
      default() {
        return 0;
      }
    }
  },
  methods: {
    handleRefresh() {
      this.$emit('on-refresh')
    }
  }
}
</script>

<style scoped lang="scss">
.settingHead{
  padding: 6px 14px 14px 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color3);
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
    left: 0;
  }
  span{
    margin: 0 20px 0 12px;
    font-weight: bold;
    font-size: 14px;
  }
  .keywordNum{
    margin-left: 10px;
    color: var(--primary-color);
  }
}
.refreshIcon{
  cursor: pointer;
  color: #CCCCCC;
  font-size: 20px;
}
@media screen and (max-width: 768px) {
  .refreshIcon{
    color: var(--primary-color);
  }
}
</style>

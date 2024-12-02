<template>
<div>
  <Row class="top" align="middle">
    <h4>Enable email push</h4>
    <i-switch v-model="pushSwitch" size="small" @on-change="change" />
  </Row>
  <div class="aaa" :class="{'bbb': !pushSwitch}">
    <div class="setting">
      <SettingHead title="Push frequency" />
      <div class="contentContainer">
        <CheckboxGroup v-model="pushFrequency">
          <Checkbox v-for="(day, idx) in $t('daysOfWeek')" :key="`day-${idx}`" :label="idx" :disabled="!pushSwitch">{{ day }}</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
    <div class="setting">
      <SettingHead title="Time zone" />
<!--      <span>(GMT+8:00) Beijing, Shanghai</span><Button type="text">{{$t('edit')}}</Button>-->
      <span>{{timezone}}</span><span class="textBtn editTimezoneBtn">{{$t('edit')}}</span>
    </div>
    <div class="setting">
      <TagList header-title="Push time period" :tags.sync="keywords" :origin-tags="originKeywords" :use-time-period="true"/>
    </div>
    <div class="setting">
      <SettingHead title="Email binding" />
      <span class="textBtn editTimezoneBtn">{{$t('goToBind')}}</span>
    </div>
  </div>
</div>
</template>

<script>
import SettingHead from "~/components/common/SettingHead.vue";
import TagList from "~/components/common/TagList.vue";

export default {
  name: "PushSettings",
  components: {TagList, SettingHead},
  data() {
    return {
      pushSwitch: true,
      pushFrequency: [],
      keywords: [],
      originKeywords: [],
      timePeriods: []
    }
  },
  computed: {
    timezone() {
      const timezoneOffset = new Date().getTimezoneOffset();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // 计算小时偏移量并格式化成 GMT 形式
      const hoursOffset = -timezoneOffset / 60;
      const gmtOffset = `GMT${hoursOffset >= 0 ? `+${hoursOffset}` : hoursOffset}:00`;

      return `(${gmtOffset}) ${timezone}`;
    }
  },
  methods: {
    change(e) {
      // console.log(e)
    },
  }
}
</script>

<style scoped lang="scss">
.top{
  margin-bottom: 40px;
  padding: 0 8px;
  h4{
    margin-right: 10px;
  }
}
.setting{
  margin-bottom: 46px;
}
.footerBtn{
  padding: 12px;
  width: 120px;
  height: auto;
  margin: 0 5px;
}
//.settingHead{
//  padding: 6px 14px 14px 8px;
//  margin-bottom: 20px;
//  border-bottom: 1px solid var(--border-color3);
//}
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
.aaa{
  position: relative;
  &::after{
    content: none;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    cursor: not-allowed;
  }
}
.bbb{
  filter: grayscale(100%);
  opacity: 0.58;
  &::after{
    content: '';
  }
}
.textBtn{
  color: var(--primary-color);
}
.editTimezoneBtn{
  margin-left: 20px;
}
.bindBtn{
  color: var(--primary-color);
}

</style>

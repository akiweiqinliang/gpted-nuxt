<template>
  <div>
    <Icon type="ios-close" class="closeIcon" @click="$emit('cancel')" />
    <div class="stepProgress">
      <div v-for="(step, idx) in steps" :key="`step-${idx}`" class="step">
        <div class="stepTitle" :class="{ 'lastActive': idx === currentStep, 'prevActive': idx < currentStep  }">{{ step.title }}</div>
        <div class="stepLine" :class="{ 'active': idx <= currentStep }"></div>
      </div>
    </div>
    <div class="contentContainer">
      <template v-if="currentStep === 0">
        <Row :wrap="false" align="middle">
          <span>Name:</span> <Input v-model="newGroup.groupName" placeholder="Enter group name" class="nameInput"/>
        </Row>
      </template>
      <template v-else-if="currentStep === 1">
        <TagList v-model="newGroup.keywords" :origin-tags="newGroup.originKeywords" hide-header/>
      </template>
      <template v-else-if="currentStep === 2">
        <SettingCheckboxGroup :model-value="newGroup.announcementType" :options="$t('announcementType')" @on-change="newGroup.announcementType = $event" />
      </template>
      <template v-else-if="currentStep === 3">
        <TagList v-model="newGroup.location" :origin-tags="newGroup.originKeywords" show-tag-flag hide-header />
      </template>
      <template v-else-if="currentStep === 4">
        <TagList v-model="newGroup.organization" :origin-tags="newGroup.originKeywords" hide-header show-tag-flag />
      </template>
      <template v-else-if="currentStep === 5">
        <TagList v-model="newGroup.industry" :origin-tags="newGroup.originKeywords" hide-header />
      </template>
      <template v-else-if="currentStep === 6">
        <SettingCheckboxGroup
          :model-value="newGroup.content"
          :options="$t('tenderContent')"
          @on-change="newGroup.content = $event" />
      </template>
      <template v-else-if="currentStep === 7">
        <Row :wrap="false" align="middle">
        <span class="priceInput">
          <Input placeholder="$t('Price From')" />
        </span>
          -
          <span class="priceInput">
          <Input placeholder="$t('Price To')" />
        </span>
        </Row>
      </template>
      <template v-else-if="currentStep === 8">
        <Input placeholder="$t('Enter your email')" />
      </template>
    </div>
    <div class="footer">
      <Row justify="space-between">
        <Button class="footerBtn" @click="currentStep > 0 ? currentStep-- : $emit('cancel')">{{$t('Go Back')}}</Button>
        <Button v-if="currentStep < steps.length-1" type="primary" class="footerBtn" @click="currentStep < steps.length - 1 ? currentStep++ : $emit('confirm')">{{$t('Next')}}</Button>
        <Button v-else type="primary" class="footerBtn" @click="handleFinishAddNewGroup">{{$t('Done')}}</Button>
      </Row>
    </div>
  </div>
</template>

<script>
import TagList from "~/components/common/TagList.vue";
import SettingCheckboxGroup from "~/components/dashboard/settings/SettingCheckboxGroup.vue";

export default {
  name: "AddSettingCard",
  components: {SettingCheckboxGroup, TagList},
  data() {
    return {
      currentStep: 0,
      newGroup: {
        groupName: '',
        keywords: [],
        originKeywords: [],

        announcementType: [0],
        scope: 'title',
        location: [],
        organization: [],
        industry: [],
        method: [],
        content: [0],
        releaseTime: [],
        deadlineTime: [],
      },
      steps: [
        {
          title: this.$t('Name') || 'Name',
        },
        {
          title: this.$t('Keywords') || 'Keywords',
        },
        {
          title: this.$t('Type') || 'Type',
        },
        {
          title: this.$t('Location') || 'Location',
        },
        {
          title: this.$t('Organization') || 'Organization',
        },
        {
          title: this.$t('Industry') || 'Industry',
        },
        {
          title: this.$t('Content') || 'Content',
        },
        {
          title: this.$t('Price Range') || 'Price Range',
        },
        {
          title: this.$t('Email Binding') || 'Email Binding',
        }
      ]
    }
  },
  methods: {
    handleFinishAddNewGroup() {
      this.$emit('confirm', this.newGroup);
      // Reset the form
    }
  }

}
</script>

<style scoped lang="scss">
.stepProgress {
  display: flex;
  justify-content: space-between;
  padding: 55px 20px 0;
  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1;

    .stepTitle {
      font-size: 14px;
      font-weight: bold;
      color: var(--text-color3);
      padding-bottom: 14px;
    }
    .lastActive{
      color: var(--primary-color);
    }
    .prevActive {
      color: var(--primary-color);
      opacity: 0.6;
    }
    .stepLine {
      width: 100%;
      height: 2px;
      background-color: var(--border-color);
      position: absolute;
      left: 0;
      bottom: 0;

      &.active {
        background-color: var(--primary-color);
      }
    }
  }
}
.contentContainer {
  padding: 28px 20px 150px;
  //background-color: var(--primary-bg-color1);
  border-radius: 8px;
  .nameInput{
    margin-left: 20px;
    max-width: 350px;
  }
}
.footer {
  padding: 40px 20px;
  margin-top: 20px;
  position: relative;
  &:before{
    content: '';
    position: absolute;
    top: 0;
    left: -30px;
    right: -30px;
    height: 1px;
    background-color: var(--divider-color2);
  }
  .footerBtn {
    margin: 0 10px;
    min-width: 120px;
    height: 42px;
    font-size: 16px;
  }
}

.closeIcon{
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  color: var(--icon-color1);
  cursor: pointer;
}
</style>

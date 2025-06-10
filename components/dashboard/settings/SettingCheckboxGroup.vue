<template>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
      <Checkbox
        :indeterminate="indeterminate"
        :value="checkAll"
        @click.prevent.native="handleCheckAll">{{ $t('all') }}</Checkbox>
      <Checkbox v-for="(item, idx) in labels" :key="`announcement-type-${idx}`" :label="idx">{{item}}</Checkbox>
    </CheckboxGroup>
</template>

<script>
export default {
  name: "SettingCheckboxGroup",
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkAllGroup: this.modelValue,
      labels: this.options,

      checkAll: false,
      indeterminate: false,
    };
  },
  mounted() {
    if (this.modelValue.length > 0) {
      this.indeterminate = true
    }
  },
  methods: {
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = this.options.map((item, idx) => (idx));
      } else {
        this.checkAllGroup = [];
      }
      this.$emit('on-change', this.checkAllGroup);
    },
    checkAllGroupChange (data) {
      if (data.length === this.options.length) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
      this.$emit('on-change', this.checkAllGroup);
    },

  }
}
</script>

<style scoped>
</style>

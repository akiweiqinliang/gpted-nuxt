<template>
  <Spin v-if="spinShow" size="large" fix class="spinBlur"></Spin>
</template>

<script>
export default {
  name: 'SpinLoad',
  data() {
    return {
      collectionIds: [],
      spinShow: false,
    };
  },
  methods: {
    start() {
      this.spinShow = true;
    },
    finish() {
      this.spinShow = false;
    },
  },
};
</script>

<style scoped>
.spinBlur {
  backdrop-filter: blur(5px);
}
</style>

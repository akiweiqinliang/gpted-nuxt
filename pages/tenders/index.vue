<template>
  <nuxt />
</template>

<script>
export default {
  name: 'Index',
  asyncData({ redirect }) {
    return redirect('error');
  },
};
</script>

<style scoped></style>

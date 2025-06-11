<template>
<div>
  <PcMenu />
  <MobileMenu />
</div>
</template>

<script>
import MobileMenu from "~/components/common/MobileMenu.vue";
import PcMenu from "~/components/common/PcMenu.vue";

export default {
  name: "LayoutMenu",
  components: {PcMenu, MobileMenu},
}
</script>

<style scoped lang="scss">
</style>

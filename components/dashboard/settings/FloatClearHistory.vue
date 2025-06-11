<template>
  <div class="floatStyle">
    <Button icon="ios-color-fill-outline" class="actionBtn" @click="$emit('clear')">
        {{ $t('clearHistory')}}
  </Button>
  </div>

</template>

<script>
export default {
  name: "FloatClearHistory",
}
</script>

<style scoped lang="scss">
.actionBtn{
  margin-left: 10px;
  color: var(--text-color3);
  position: relative;
}

.floatStyle{
  position: fixed;
  top: 106px;
  z-index: 901;
  //right: 30px;
  right: 140px;
}
@media screen and (max-width: 992px){
  .floatStyle{
    top: 80px;
  }
}

</style>

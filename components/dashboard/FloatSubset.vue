<template>
  <div v-click-outside="close" class="floatStyle" >
    <Button icon="ios-browsers" class="actionBtn" :class="{'activeBtn': selectedLabel !== '' }" @click="showScreen = !showScreen">
      <div class="text">
        {{ selectedLabel ? selectedLabel : $t('subset')}}
      </div></Button>
    <div v-show="showScreen" class="container">
      <List :split="false">
        <Row justify="end">
          <Button class="actionBtn1 restoreDefaultBtn" long type="primary" @click="restoreDefaults">{{ $t('restoreDefaults') }}</Button>
        </Row>
        <ListItem v-for="item in previousSetting" :key="`${item}-${item.id}`" class="classificationItem">
          <div class="labelBox" :class="{'active' : item.id === selectedId}" @click="confirm(item)">
            <Icon type="ios-browsers" />
            <span>{{ item.label }}</span>
          </div>
        </ListItem>
      </List>
    </div>
  </div>

</template>

<script>
import {previousSetting} from "~/enums/mockData";
export default {
  name: "FloatScreen",
  // components: {TreeFilter, SingleSetting},
  data() {
    return {
      previousSetting,
      showScreen: false,
      selectedLabel: '',
      selectedId: '',
    }
  },
  methods: {
    confirm(val) {
      this.$emit('confirm', val)
      this.selectedLabel = val.label
      this.selectedId = val.id
      this.close()
    },
    close() {
      this.showScreen = false
    },
    open() {
      this.showScreen = true
    },
    restoreDefaults() {
      this.close()
      this.selectedLabel = ''
      this.selectedId = ''
      this.$emit('restoreDefaults')
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  box-shadow: 2px 2px 12px 0 rgba(0,0,0,0.06);
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 20;
  background: white;
  border-radius: 10px;
  padding: 30px 0;
  width: 325px;
  max-height: 80vh;
  overflow-y: scroll;
}
.footerBtn{
  height: 42px;
  line-height: 42px;
  //width: 110px;
  width: 100%;
}
.footerContainer{
  position: sticky;
  bottom: 0;
}
.actionBtn{
  margin-left: 10px;
  color: var(--text-color3);
  position: relative;
}
.container{
  h4{
    margin: 16px 0 10px;
    padding: 0 20px;
  }
  .classificationItem{
    display: flex;
    cursor: pointer;
    width: 100%;
    padding: 16px 20px;
    position: relative;
    ::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 20px;
      right: 0;
      width: calc(100% - 40px);
      height: 1px;
      background-color: var(--divider-color2);
    }
    &:nth-last-child(1){
      ::after{
        content: none;
      }
    }
    i{
      font-size: 16px;
      margin-top: 4px;
      &:nth-child(1) {
        margin-right: 16px;
        color: var(--icon-color1);
      }
      &:nth-child(2) {
        color: var(--icon-color);
        cursor: pointer;
      }
    }
    .labelBox{
      flex: 1;
      display: flex;
      margin-right: 16px;
      span{
        display: block;
      }
    }
    &:hover {
      background-color: var(--primary-bg-color1);
      i{
        color: var(--primary-color);
      }
    }
  }
}
.activeBtn{
  color: var(--primary-color);
  display: flex;
  align-items: center;
  .text{
    display: inline-block;
    max-width: 380px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 4px;
  }
}
.restoreDefaultBtn{
  margin: 0 20px 10px;
}
.container .classificationItem .active{
  i{
    color: var(--primary-color);
  }
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
@media screen and (min-width: 1740px){
  .floatStyle{
    //margin-right: calc(50vw - 720px - 120px - 30px);
  }
}
</style>

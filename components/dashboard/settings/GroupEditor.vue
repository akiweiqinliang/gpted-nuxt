<template>
  <div>
    <transition name="fade">
      <div v-if="pageStatus === 'empty'">
        <DefaultPageDashboardSubscriptionSettings @change="pageStatus = 'add'"/>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="pageStatus === 'default'">
        <Button long type="primary" ghost class="addGroupBtn" @click="pageStatus = 'add'">
          <Icon type="md-add" />
          {{$t('addGroup')}}
        </Button>
        <List :split="false" class="wrapper-mini">
          <ListItem v-for="item in previousSetting" :key="`${item}-${item.id}`" class="classificationItem">
            <div class="labelBox">
              <Icon type="ios-browsers" class="labelIcon"/>
              <span>{{ item.label }}</span>
            </div>
            <Row justify="space-between" align="middle">
              <div class="editBtn" @click="editSetting(item.id)">
                <Icon type="ios-create-outline"/>
                <span>{{$t('edit')}}</span>
              </div>
              <Divider type="vertical" />
              <div class="deleteBtn" @click="deleteSetting(item.id)">
                <Icon type="ios-close-circle-outline" />
                <span>{{$t('delete')}}</span>
              </div>
            </Row>
          </ListItem>
        </List>
        <Row v-show="previousSetting.length > 6" class="wrapper-mini" justify="center">
          <Page :current="1" :total="8" :page-size="6" simple />
        </Row>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="pageStatus === 'add'">
        <AddSettingCard
          @confirm="addGroup"
          @cancel="previousSetting.length > 0 ? pageStatus = 'default' : pageStatus = 'empty'"/>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="pageStatus === 'edit'">
        <Row justify="space-between">
          <Button @click="pageStatus = 'default'"><Icon type="ios-arrow-back" />{{$t('otherGroups')}}</Button>
          <Button type="error" ghost @click="deleteSetting(editID)">
            <Icon type="ios-close-circle-outline" />
            {{$t('delete')}}
          </Button>
        </Row>
        <SettingList class="wrapper-mini" />
      </div>
    </transition>
  </div>
</template>

<script>
import { previousSetting } from "~/enums/mockData";
import SettingList from "~/components/common/SetttingList.vue";
import AddSettingCard from "~/components/dashboard/settings/AddSettingCard.vue";

export default {
  name: "GroupEditor",
  components: {AddSettingCard, SettingList},
  data() {
    return{
      previousSetting,
      editID: '',
      pageStatus: 'default', // edit / add /empty
    }
  },
  mounted() {
    // 如果previousSetting为空，显示empty状态
    if(this.previousSetting.length === 0) {
      this.pageStatus = 'empty';
    }
  },
  methods: {
    editSetting(editId) {
      this.editID = editId;
      this.pageStatus = 'edit';
    },
    deleteSetting(delId) {
      this.previousSetting = this.previousSetting.filter(item => item.id !== delId);
      this.$Message.success(this.$t('deleteSuccess'));
      // edit状态 删除当前分组
      if(this.pageStatus === 'edit') this.pageStatus = 'default';
      if(this.previousSetting.length === 0) this.pageStatus = 'empty';
    },
    addGroup() {
      this.$Message.success(this.$t('addSuccess'));
      this.pageStatus = 'default';
      // 模拟添加分组
      const newGroup = {
        id: Date.now(),
        label: `New Group ${this.previousSetting.length + 1}`
      };
      this.previousSetting.push(newGroup);
    },
  }
}
</script>

<style scoped lang="scss">
.addGroupBtn{
  padding: 16px;
  height: auto;
  font-size: 15px;
  border-radius: 6px;
}
.classificationItem{
  display: flex;
  width: 100%;
  padding: 30px;
  position: relative;
  font-size: 15px;
  &:hover {
    background-color: var(--primary-bg-color1);
    .labelIcon{
      color: var(--primary-color);
      i{
        color: var(--primary-color);
      }
    }
  }
  &::after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 1px;
    background-color: var(--divider-color2);
  }
  &:nth-last-child(1){
    ::after{
      content: none;
    }
  }
  .labelIcon{
    color: var(--icon-color1);
    margin-right: 16px;
    margin-top: 4px;
  }
  .editBtn, .deleteBtn{
    color: var(--icon-color);
    cursor: pointer;
    i{
      margin-right: 4px;
    }
  }
  .editBtn:hover{
    color: var(--primary-color);
    i{
      color: var(--primary-color);
    }
  }
  .deleteBtn:hover{
    color: var(--error-color);
  }
  .labelBox{
    flex: 1;
    display: flex;
    margin-right: 16px;
    span{
      display: block;
    }
  }

}
</style>

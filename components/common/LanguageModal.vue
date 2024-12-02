<template>
  <Modal
    v-model="showModal"
    class-name="langListModal"
    :title="title"
    :closable="false"
    width="666"
    :mask-closable="maskClose"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    <ul>
      <Button
        v-for="lang in langList()"
        :key="lang.value"
        :disabled="disableLangList.includes(lang.value)"
        class="langBtn"
        :class="[
            { 'active' : lang.value === selectedLang && !disableLangList.includes(lang.value) },
            { 'selected': disableLangList.includes(lang.value) }
            ]"
        @click="selectedLang = lang.value">
        {{ lang.label }}
      </Button>
    </ul>
    <div slot="footer">
      <Row :wrap="false" justify="center">
        <Button class="modalBtn" @click="cancel">cancel</Button>
        <Button class="modalBtn" type="primary" @click="ok">confirm</Button>
      </Row>
    </div>
  </Modal>
</template>

<script>
import {langList} from "~/lang/langList";
export default {
  name: "LanguageModal",
  props: {
    title: {
      type: String,
      required: false,
      default() {
        return ''
      }
    },
    maskClose: {
      type: Boolean,
      required: false,
      default() {
        return true
      }
    },
    disableLangList: {
      type: Array,
      required: false,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      showModal: false,
      selectedLang: ''
    }
  },
  methods: {
    langList() {
      return langList
    },
    ok () {
      this.$Message.info('Clicked ok');
      this.showModal = false
      this.$emit('onSelectLanguage', this.selectedLang)
    },
    open() {
      this.showModal = true;
    },
    cancel () {
      this.showModal = false;
    }
  }
}
</script>

<style scoped lang="scss">
.langListModal{
  top: 20%;
  ul{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
    .langBtn{
      height: auto;
      border: 1px solid var(--text-bg-color2);
      background-color: var(--text-bg-color2);
      border-radius: 3px;
      padding: 10px 16px;
    }
    .active{
      border: 1px solid var(--primary-color);
      background-color: var(--primary-bg-color1);
      color: var(--primary-color);
    }
    .selected{

    }
  }

  .modalBtn{
    width: 120px;
    border-radius: 6px;
    padding: 12px;
    height: auto;
  }
}
@media screen and (max-width: 768px){
  .langListModal ul{
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>

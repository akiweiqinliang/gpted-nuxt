<template>
  <div>
    <Modal
      v-model="showModal"
      class-name="commonPromptModal"
      :footer-hide="true"
      :closable="closeable"
      :title="title"
      :width="width"
      :mask-closable="maskCloseable"
    >
      <slot name="content"></slot>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CommonPromptModal",
  props: {
    title: {
      type: String,
      required: false,
      default() {
        return ''
      }
    },
    width: {
      type: String,
      required: false,
      default() {
        return '480'
      }
    },
    closeable: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    },
    maskCloseable: {
      type: Boolean,
      required: false,
      default() {
        return true
      }
    },
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    // ok () {
    //   this.$Message.info('Clicked ok');
    //   this.$emit('ok');
    // },
    // cancel () {
    //   this.$Message.info('Clicked cancel');
    //   this.$emit('cancel');
    // }
  }
}
</script>

<style scoped>
</style>

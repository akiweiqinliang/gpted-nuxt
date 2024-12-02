import { Notice } from "view-design";
export default {
  bind(el, binding) {
    const { value } = binding;
    const handleClick = async () => {
      try {
        const textToCopy = value || el.innerText;
        await navigator.clipboard.writeText(textToCopy);
        // Message.success({
        //   content: 'copy success!',
        //   duration: 2
        // })
        Notice.success({
          title: 'copy success!',
          duration: 2
        })
      } catch (err) {
        // Message.error({
        //   content: 'copy failed!',
        //   duration: 2
        // })
        Notice.error({
          title: 'copy success!',
          duration: 2
        })
      }
    };

    el._handleClick = handleClick; // 保存引用，以便解绑时使用
    el.addEventListener('click', handleClick);
  },

  unbind(el) {
    el.removeEventListener('click', el._handleClick);
    delete el._handleClick;
  }
};

export default {
  bind(el, binding) {
    const { value } = binding;
    const handleClick = async () => {
      try {
        const textToCopy = value || el.innerText;
        await navigator.clipboard.writeText(textToCopy);
      } catch (err) {
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

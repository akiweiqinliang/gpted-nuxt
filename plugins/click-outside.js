// plugins/click-outside.js
import Vue from "vue";

Vue.directive('click-outside', {
  bind(el, binding) {
    el.clickOutsideEvent = function(event) {
      // Check if click was outside the element and its children
      if (!(el === event.target || el.contains(event.target))) {
        // Call the provided method
        if (typeof binding.value === 'function') {
          binding.value(event);
        }
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
});

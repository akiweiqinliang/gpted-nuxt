<template>
  <div class="backTopArrowContainer" @click="back">
        <Icon type="ios-arrow-up" color="var(--icon-color)"/>
  </div>
</template>

<script>
export default {
  name: "MyBackTop",
  props: {
    height: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 30
    },
    right: {
      type: Number,
      default: 30
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      backTop: false
    };
  },
  computed: {

    styles () {
      return {
        bottom: `${this.bottom}px`,
        right: `${this.right}px`
      };
    },

  },
  mounted () {
           window.addEventListener('scroll', this.handleScroll, false);
           window.addEventListener('resize', this.handleScroll, false);
  },
  beforeDestroy () {
           window.removeEventListener('scroll', this.handleScroll, false);
           window.removeEventListener('resize', this.handleScroll, false);
  },
  methods: {
    handleScroll () {
      this.backTop = window.pageYOffset >= this.height;
    },
    scrollTop(el, from = 0, to, duration = 500, endCallback) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            return window.setTimeout(callback, 1000/60);
          }
        );
      }
      const difference = Math.abs(from - to);
      const step = Math.ceil(difference / duration * 50);

      function scroll(start, end, step) {
        if (start === end) {
          endCallback && endCallback();
          return;
        }

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
          d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
          window.scrollTo(d, d);
        } else {
          el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
      }
      scroll(from, to, step);
    },
    back () {
      const sTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollTop(window, sTop, 0, this.duration);
      this.$emit('on-click');
    }
  }
}
</script>

<style scoped lang="scss">
.backTopArrowContainer{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  i{
    font-size: 24px;
  }
}
@media screen and (max-width: 768px){
  .backTopArrowContainer i{
    font-size: 15px;
  }
}
</style>

<template>
  <div class="loginBtn" @click="login">
      <span class="text">Go and log in</span>
  </div>
</template>

<script>
import pageCode from "~/enums/pageCodes";

export default {
  name: "LoginBtn",
  methods: {
    login() {
      this.$router.push({ name: pageCode.LOGIN });
    }
  }
}
</script>

<style scoped lang="scss">
.loginBtn{
  position: sticky;
  bottom: 76px;
  background: var(--primary-color);
  border-radius: 45px 45px 45px 45px;
  width: 50%;
  max-width: 774px;
  left: 50%;
  transform: translateX(-50%);
  aspect-ratio: 774 / 90;
  z-index: 5;
  margin-top: 50px;
  font-size: 26px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.5s ease-in-out;

  &:before, &:after {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 10%;
    height: 100%;
    background: #fff;
    opacity: 0.2;
    transform: skewX(-20deg);
    transition: left 0.5s ease-in-out, background 0.5s ease-in-out;
  }
  &:after {
    width: 3%;
    left: -93%;
  }

  &:hover::before, &:hover::after {
    left: 20%;
    transition: left 0.5s ease-in-out, background 0.5s ease-in-out;
  }
  &:hover::after{
    left: 33%;
  }
  &:hover {
    box-shadow: 0 10px 0 #B8C6E3;
    transition: box-shadow 0.5s ease-in-out;
  }
}

</style>

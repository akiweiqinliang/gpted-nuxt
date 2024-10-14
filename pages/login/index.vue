<template>
  <div>
    login
    <Input v-model="username"/>
    <Button @click="handleLogin">Sign in</Button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: ''
    }
  },
  methods: {
    handleLogin() {
      localStorage.setItem('token', this.username);
      this.$store.dispatch('user/setToken', localStorage.getItem('token'))
      this.$router.back();
    }
  }
}
</script>

<style scoped>

</style>

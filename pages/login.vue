<template>
  <div id="loginPage" class="container">
    <div class="left">
      <h1 v-dompurify-html="$t('login_imgText')"></h1>
      <div class="imgBox"></div>
    </div>
    <div class="right">
      <div v-if="!showForgotPage" class="login">
        <h1 v-dompurify-html="$t('login_welcomeMsg')"></h1>
        <Input v-model="username" prefix="ios-mail-outline" size="large" :placeholder="$t('placeholder_email')"></Input>
        <Input v-model="password" prefix="ios-lock-outline" size="large" :placeholder="$t('placeholder_password')" password class="wrapper-mini"></Input>
        <span class="wrapper-default agreeMsg">{{$t('login_agree_msg')}} <span class="primaryColor">{{$t('login_termsOfService')}}</span> {{$t('and')}} <span class="primaryColor">{{$t('login_privacyPolicy')}}</span></span>
        <Button long size="large" type="primary" :class="{'inactive': !username || !password}" @click="handleLogin">{{$t('login')}}</Button>
        <Row justify="space-between">
          <Checkbox v-model="staySignedIn" class="staySignedIn">{{$t('login_staySignedIn')}}</Checkbox>
          <span class="forgotPwd" @click="showForgotPage = true">{{$t('login_forgotPwd')}}</span>
        </Row>
        <Divider plain class="orSignInWith">{{$t('login_orSignInWith')}}</Divider>
        <ul class="thirdPartyLoginList">
          <li v-for="i in 4" :key="i">
            Continue with SSO
          </li>
        </ul>
      </div>
      <div v-else class="forgot">
        <h1>{{$t('login_forgotPwd')}}</h1>
        <p>{{$t('login_forgotPwdTips')}}</p>
        <Input v-model="emailAddress" class="wrapper-default" prefix="ios-mail-outline" size="large" :placeholder="$t('placeholder_email')" ></Input>
        <Button v-if="!sendCodeflag" long size="large" class="wrapper-large" type="primary" :class="{'inactive': !emailAddress}" @click="sendCodeflag = true">{{$t('login_sendCode')}}</Button>
        <template v-if="sendCodeflag">
          <Input v-model="verificationCode" class="wrapper-default verificationCodeBox" size="large" :placeholder="$t('placeholder_verificationCode')">
            <Icon slot="prefix" type="ios-mail-outline" />
            <span slot="suffix">{{$t('resend')}}</span>
          </Input>
          <Input v-model="newPassword" prefix="ios-lock-outline" size="large" :placeholder="$t('placeholder_newPassword')" type="password" password class="wrapper-mini"></Input>
          <Button long size="large" class="wrapper-large" type="primary" :class="{'inactive': !emailAddress || !verificationCode || !newPassword}" @click="sendCodeflag = false">{{$t('login_sendCode')}}</Button>
        </template>
        <div class="backLoginBtn" @click="showForgotPage = false"><Icon type="ios-arrow-back" />{{$t('login')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  layout: 'login',
  data() {
    return {
      username: '',
      password: '',
      emailAddress: '',
      newPassword: '',
      verificationCode: '',
      staySignedIn: false,
      showForgotPage: false,
      sendCodeflag: false,
    }
  },
  methods: {
    handleLogin() {
      if (!this.username || !this.password) {
        this.$Message.info( {
          content: this.$t('login_error_msg'),
          duration: 5
        })
        return
      }
      localStorage.setItem('token', this.username);
      this.$store.dispatch('user/setToken', localStorage.getItem('token'))
      this.$router.push('/');
    }
  }
}
</script>

<style scoped lang="scss">
.inactive{
  opacity: 0.5;
}
.primaryColor{
  color: var(--primary-color);
  cursor: pointer;
}

.container{
  display: flex;
  height: 100%;
}
.left, .right{
  height: 100%;
  width: 50%;
}
.left{
  background: var(--bg-color1);
  padding: 150px 116px 88px;
  h1{
    font-size: 40px;
    margin-bottom: 50px;
    line-height: 47px;
  }
  .imgBox{
    width: 100%;
    aspect-ratio: 1 / 1;
    background: var(--bg-color);
  }
}
.right{
  padding: 150px 170px 88px;
  .login{
    h1 {
      font-size: 30px;
      text-align: center;
      margin-bottom: 40px;
    }

    .agreeMsg {
      color: var(--text-color3);
      font-size: 12px;
      display: block;
      margin-bottom: 12px;
    }

    .staySignedIn {
      font-size: 12px;
      color: var(--text-color3);
      margin-top: 12px;
    }

    .forgotPwd {
      font-size: 12px;
      color: var(--primary-color);
      margin-top: 12px;
      cursor: pointer;
    }

    .orSignInWith {
      margin: 40px 0 30px;
    }

    .thirdPartyLoginList {
      li {
        border: 1px solid var(--border-color2);
        text-align: center;
        padding: 12px;
        font-size: 12px;
        color: var(--text-color2);
        margin-bottom: 8px;
        border-radius: 4px;
      }
    }
  }
  .forgot{
    h1 {
      font-size: 30px;
      text-align: center;
      margin-bottom: 40px;
    }
    p{
      color: var(--text-color5);
    }
    .backLoginBtn{
      margin-top: 50px;
      color: var(--text-color2);
      cursor: pointer;
    }
  }
}
</style>

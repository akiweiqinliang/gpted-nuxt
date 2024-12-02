<template>
  <div id="registerPage" class="container">
    <div class="left">
      <div class="register">
        <h1>{{$t('register_startMsg')}}</h1>
        <Input v-model="emailAddress" prefix="ios-mail-outline" size="large" :placeholder="$t('placeholder_email')"></Input>
        <Button v-if="!sendCodeflag" long size="large" class="wrapper-large" type="primary" :class="{'inactive': !emailAddress}" @click="handleSendCode">{{$t('login_sendCode')}}</Button>
        <template v-if="sendCodeflag">
          <Input v-model="signUpCode" class="wrapper-default verificationCodeBox" size="large" :placeholder="$t('placeholder_signUpCode')">
            <Icon slot="prefix" type="ios-code" />
            <span slot="suffix">{{$t('resend')}}</span>
          </Input>
          <Input v-model="password" prefix="ios-lock-outline" size="large" :placeholder="$t('placeholder_setPassword')" password class="wrapper-mini"></Input>
          <Button long size="large" class="wrapper-large" type="primary" :class="{'inactive': !emailAddress || !signUpCode || !password}" @click="handleSignIn">{{$t('signIn')}}</Button>
        </template>
        <span class="wrapper-default agreeMsg">{{$t('login_agree_msg')}} <span class="primaryColor">{{$t('login_termsOfService')}}</span> {{$t('and')}} <span class="primaryColor">{{$t('login_privacyPolicy')}}</span></span>
        <Divider plain class="orSignInWith">{{$t('login_orSignInWith')}}</Divider>
        <ul class="thirdPartyLoginList">
          <li v-for="i in 4" :key="i">
            Continue with SSO
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="imgBox"></div>
      <div class="newUserTitle wrapper-default">
        <Row justify="space-between" align="middle" class="fullWidth">
          <span>🎉 <span v-dompurify-html="$t('register_newUserTitle')" /></span>
          <Icon type="ios-arrow-round-forward" />
        </Row>
      </div>
      <ul class="userRights wrapper-mini">
        <li v-for="i in 5" :key="i">Procurement method Procurement mascds xcmwd asethod</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  layout: 'register',
  data() {
    return {
      password: '',
      emailAddress: '',
      signUpCode: '',
      staySignedIn: false,
      showForgotPage: false,
      sendCodeflag: false,
    }
  },
  methods: {
    handleSendCode() {
      if (!this.emailAddress) {
        this.$Message.info( {
          content: this.$t('register_error_msg'),
          duration: 5
        })
        return
      }
      this.sendCodeflag = true;
    },
    handleSignIn() {
      this.sendCodeflag = false;
      if (!this.emailAddress || !this.password || !this.signUpCode) {
        this.$Message.info( {
          content: this.$t('register_error_msg'),
          duration: 5
        })
        return
      }
      this.$router.push('/')
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
.right{
  background: var(--bg-color1);
  padding: 0 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .imgBox{
    width: 384px;
    aspect-ratio: 3 / 2;
    background: var(--bg-color);
  }
  .newUserTitle{
    width: 100%;
    font-weight: bold;
    font-size: 14px;
    color: var(--text-color6);
    box-shadow: 0 3px 23px 0 rgba(0,0,0,0.08);
    border-radius: 10px;
    padding: 12px 18px;
    i{
      font-size: 22px;
    }
  }
  .userRights{
    width: 100%;
    box-shadow: 0 3px 23px 0 rgba(0,0,0,0.08);
    padding: 30px 32px;
    border-radius: 10px;
    li{
      font-size: 14px;
      color: var(--text-color1);
      margin-top: 27px;
      padding-left: 30px;
      position: relative;
      &:nth-child(1) {
        margin-top: 0;
      }
      &::before{
        content: '';
        position: absolute;
        left: 0;
        background: var(--primary-color);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 22px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
.left{
  padding: 150px 170px 88px;
  .register{
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

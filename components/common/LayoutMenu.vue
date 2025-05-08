<template>
<div>
  <Menu
    :active-name="activeRouterName"
    mode="horizontal" theme="light" class="floatMainMenu">
    <div class="layout-logo"></div>
    <div class="divider"></div>
    <Row class="layout-nav" :wrap="false">
      <MenuItem :name="pageCode.HOME" to="/">
        {{ $t('home') }}
      </MenuItem>
      <MenuItem :name="pageCode.DISCOVER" :to="{ name: pageCode.DISCOVER }">
        {{ $t('search') }}
      </MenuItem>
      <MenuItem
        :name="pageCode.RESOURCE"
        :to="{ name: pageCode.RESOURCE_BLOG }"
        class="resourcesItem"
        @mouseenter.native="showResources = true"
        @mouseleave.native="showResources = false"
      >
        {{ $t('resources') }}
      </MenuItem>
      <MenuItem
        :name="pageCode.DASHBOARD"
        :to="{ name: pageCode.DASHBOARD }"
      >
        {{ $t('dashboard') }}
      </MenuItem>
      <MenuItem :name="pageCode.MEMBER" :to="{ name: pageCode.MEMBER }">
        {{ $t('member') }}
      </MenuItem>
      <MenuItem :name="pageCode.ACTIVITY" :to="{ name: pageCode.ACTIVITY }">
        {{ $t('activity') }}
      </MenuItem>
    </Row>
    <div class="divider"></div>
    <Row align="middle" :wrap="false">
      <Select v-model="lang" class="langSelector" @on-change="changeLanguage">
        <Icon slot="prefix" type="ios-globe-outline" :size="20" />
        <Option v-for="item in langList" :key="item.value" :value="item.value">{{ item.label }}</Option>
      </Select>
      <Button v-show="!isLoggedIn" type="primary" ghost @click="signIn">{{ $t('signIn') }}</Button>
      <Dropdown placement="bottom-end" trigger="click">
        <div v-show="isLoggedIn" class="avatarBox"></div>
        <DropdownMenu slot="list">
          <DropdownItem class="userBasicText">
            <Row align="middle">
              <div class="avatarBox"></div>
              <div>
                <span>Christopher</span>
                <div class="level">Basic</div>
              </div>
            </Row>
          </DropdownItem>
          <DropdownItem class="userHoverBox" @click.native="jumpRoutingByName(pageCode.USERCENTER)">
            <Row align="middle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Frame">
                  <path id="Vector" d="M11.5262 12.5171C6.00675 12.6239 2.5539 17.111 2.41092 21.489C2.39348 21.7666 2.34163 21.9999 2.24865 22.1616C2.15812 22.3191 2.03073 22.4066 1.85011 22.4066C1.57163 22.4066 1.383 22.3015 1.26147 22.1368C1.13743 21.9688 1.07744 21.7305 1.07744 21.4573C1.07744 17.0039 3.8827 13.2167 7.775 11.7439L7.89331 11.6992L7.79727 11.6168C6.57699 10.5709 5.81027 9.0373 5.81027 7.29415C5.81027 4.12179 8.38998 1.57671 11.5276 1.57671C14.6649 1.57671 17.2097 4.12147 17.2097 7.2588C17.2097 9.00196 16.4429 10.5355 15.2227 11.5815L15.1258 11.6645L15.2454 11.7088C16.1861 12.0572 17.0251 12.6501 17.8353 13.284L17.8674 13.3162L17.8672 13.3163L17.8716 13.3201C17.9897 13.4212 18.1084 13.5569 18.1971 13.6963C18.2872 13.8379 18.3399 13.9733 18.3399 14.0755C18.3399 14.3794 18.2562 14.5288 18.1451 14.6113C18.0273 14.6986 17.8626 14.7247 17.6664 14.7425L17.6523 14.7438L11.5277 12.5921M11.5262 12.5171L11.5277 12.5921M11.5262 12.5171C11.5262 12.5171 11.5262 12.5171 11.5261 12.5171L11.5277 12.5921M11.5262 12.5171C12.4023 12.4992 13.4883 12.6956 14.5008 13.0376C15.5119 13.3791 16.4592 13.8689 17.0534 14.4446M11.5277 12.5921C13.2583 12.5568 15.8366 13.3691 17.0022 14.4994M17.0534 14.4446C17.053 14.4442 17.0527 14.4439 17.0524 14.4436L17.0022 14.4994M17.0534 14.4446C17.0537 14.4449 17.0541 14.4452 17.0544 14.4455L17.0022 14.4994M17.0534 14.4446L17.0022 14.4994M7.74846 11.6738C7.72191 11.6838 7.69541 11.694 7.66896 11.7042C7.67916 11.7131 7.68939 11.7219 7.69965 11.7307L7.74846 11.6738ZM7.74846 11.6738L7.72191 11.6036C7.70936 11.6084 7.69681 11.6132 7.68428 11.618C7.70553 11.6367 7.72692 11.6553 7.74846 11.6738ZM15.2715 11.6384L15.2975 11.5681C15.3103 11.5728 15.3231 11.5776 15.3358 11.5824C15.3145 11.6013 15.2931 11.6199 15.2715 11.6384ZM15.2715 11.6384L15.3203 11.6954C15.3306 11.6865 15.341 11.6776 15.3512 11.6686C15.3247 11.6584 15.2981 11.6483 15.2715 11.6384ZM17.5926 14.7737L17.569 14.7855L17.6026 14.8526L17.6133 14.7783L17.6128 14.7782L17.6069 14.7771C17.6034 14.7763 17.5987 14.7752 17.5926 14.7737ZM7.46156 7.08225C7.46156 8.01723 7.78513 8.97205 8.45278 9.69384C9.12139 10.4167 10.1305 10.9008 11.4912 10.9011C13.8306 10.9724 15.5587 8.95878 15.5231 7.08155C15.523 6.16777 15.2543 5.16111 14.6143 4.38129C13.972 3.59886 12.9612 3.05147 11.4923 3.05147C8.97058 3.05147 7.46156 5.24798 7.46156 7.08225ZM14.4945 18.2035C14.2048 18.2035 13.9573 18.1352 13.7843 18.0064C13.614 17.8797 13.5099 17.6904 13.5099 17.4308C13.5099 17.1529 13.6144 16.9744 13.7814 16.8617C13.9535 16.7457 14.2009 16.6935 14.4945 16.6935H20.1103C20.4018 16.6935 20.6496 16.7538 20.8223 16.8743C20.9912 16.9921 21.0948 17.1718 21.0948 17.4308C21.0948 17.6884 20.9835 17.8782 20.8079 18.006C20.6297 18.1356 20.3815 18.2035 20.1103 18.2035H14.4945ZM14.4945 20.8965H20.075C20.3498 20.8965 20.5991 20.9483 20.7815 21.0618C20.9596 21.1727 21.0782 21.3445 21.0948 21.6009C21.0942 21.8559 20.9843 22.0259 20.8117 22.1357C20.6341 22.2487 20.3853 22.3006 20.1103 22.3006H14.4945C14.201 22.3006 13.9529 22.2484 13.7804 22.1361C13.6129 22.027 13.5099 21.857 13.5099 21.5985C13.5099 21.3422 13.6199 21.1716 13.793 21.0614C13.9706 20.9484 14.2194 20.8965 14.4945 20.8965Z" stroke="white" stroke-width="0.15"/>
                </g>
              </svg>
              <p>User Center</p>
            </Row>
          </DropdownItem>
          <DropdownItem class="userHoverBox" @click.native="signOut">
            <Row align="middle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g id="Frame" clip-path="url(#clip0_792_57389)">
                  <g id="Frame_2" clip-path="url(#clip1_792_57389)">
                    <path id="Vector" d="M21.6533 12.9751H13.0175C12.6345 12.9751 12.2863 12.6617 12.2863 12.2438C12.2863 11.8608 12.5997 11.5126 13.0175 11.5126H21.8622L20.0167 9.66703C19.7381 9.38845 19.7381 8.93578 20.0167 8.6572C20.2952 8.37863 20.7479 8.37863 21.0265 8.6572L24.2286 11.8593C24.3835 12.0142 24.3841 12.2651 24.23 12.4207L21.0265 15.6563C20.7479 15.9349 20.2952 15.9349 20.0167 15.6563C19.7381 15.3777 19.7381 14.9251 20.0167 14.6465L21.6533 12.9751ZM19.4943 5.27953V2.87685C19.4943 1.79738 18.6238 0.96167 17.5792 0.96167H5.07826C4.03362 0.96167 3.16309 1.83221 3.16309 2.87685V21.1581C3.16309 22.2376 4.03362 23.0733 5.07826 23.0733H17.5792C18.6238 23.0733 19.4943 22.2027 19.4943 21.1581V18.7554C19.4943 18.3724 19.1809 18.0242 18.7631 18.0242C18.3452 18.0242 18.0318 18.3376 18.0318 18.7554V20.6706C18.0318 21.1929 17.614 21.6456 17.0568 21.6456H5.53094C5.00862 21.6456 4.55594 21.2277 4.55594 20.6706V3.36435C4.55594 2.84203 4.9738 2.38935 5.53094 2.38935H17.0917C17.614 2.38935 18.0667 2.80721 18.0667 3.36435V5.27953C18.0667 5.66256 18.38 6.01078 18.7979 6.01078C19.1809 6.01078 19.4943 5.69738 19.4943 5.27953Z" />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_792_57389">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                  <clipPath id="clip1_792_57389">
                    <rect width="22.2857" height="22.2857" fill="white" transform="translate(2.57129 0.857178)"/>
                  </clipPath>
                </defs>
              </svg>
              <p>Exit login</p>
            </Row>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Row>
  </Menu>
  <MobileMenu />
  <div
    class="resourceSelections"
    :class="{'resourceActive': showResources }"
    @mouseenter="showResources = true"
    @mouseleave="showResources = false"
  >
    <ul>
      <li @click="jumpRoutingByName(pageCode.RESOURCE_POLICY)">
        <span>{{$t('policy')}}</span>
        <p>{{$t('policy_desc')}}</p>
      </li>
      <li @click="jumpRoutingByName(pageCode.RESOURCE_BLOG)">
        <span>{{$t('blog')}}</span>
        <p>{{$t('blog_desc')}}</p>
      </li>
      <li  @click="jumpRoutingByName(pageCode.RESOURCE_HELPCENTER)">
        <span>{{$t('helpCenter')}}</span>
        <p>{{$t('helpCenter_desc')}}</p>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import {langList} from "~/lang/langList";
import pageCode from "~/enums/pageCodes";
import MobileMenu from "~/components/common/MobileMenu.vue";

export default {
  name: "LayoutMenu",
  components: {MobileMenu},
  data() {
    return {
      activeRouterName: this.$route.name === 'index'
        ? 'home'
        : this.$route.name.includes('dashboard')
          ? 'dashboard'
          : this.$route.name.includes('resource')
            ? 'resource'
            : this.$route.name,
      lang: this.$i18n.defaultLocale,
      langList,
      isLoggedIn: false,

      showResources: false
    }
  },
  computed: {
    pageCode() {
      return pageCode
    },
  },
  watch: {
    $route(to, from) {
      this.activeRouterName = to.name === 'index'
        ? 'home'
        : to.name.includes('dashboard') ?
          'dashboard'
          : to.name.includes('resource') ?
            'resource'
            : to.name;
    },
  },
  mounted() {
    this.fetchLoginToken();
  },
  methods: {
    fetchLoginToken() {
      // todo 记得修改
      this.isLoggedIn = localStorage.getItem('token') === 'a'
    },
    changeLanguage() {
      this.$i18n.setLocale(this.lang)
    },
    jumpRoutingByName(routerName) {
      this.$router.push({ name: routerName })
    },
    signIn() {
      // todo
      // this.$router.push({ name: 'login' })
      this.isLoggedIn = !this.isLoggedIn
    },
    signOut() {
      this.$Message.info({
        content: 'sign out!',
        top: 150,
      })
    }
  }
}
</script>

<style scoped lang="scss">
.layout-logo{
  width: 146px;
  height: 44px;
  background-image: url("@/assets/imgs/svg/GPTED.svg");
  background-repeat: round;
}
.layout-nav{
  flex: 1;
  .ivu-menu-item{
    transition: none;
    font-weight: bold;
    font-size: 16px;
  }
  .ivu-menu-item-active, .ivu-menu-item:hover{
    border-bottom: 0;
  }
  .ivu-menu-item:hover{
    opacity: 0.7;
  }
}
.floatMainMenu{
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 76px;
  line-height: 76px;
  background: var(--bg-color1);
  box-shadow: 0 1px 10px 0 rgba(0,0,0,0.08);
  padding: 0 48px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 20;
  .langSelector{
    width: 100px;
    margin-right: 24px;
  }
  .avatarBox{
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--primary-color);
  }

  .userBasicText{
    background: var(--bg-color2);
    padding: 20px 30px;
    border-bottom: 1px solid var(--border-color);
    .avatarBox{
      margin-right: 16px;
    }
    span{
      font-size: 14px;
      font-weight: bold;
    }
  }
  .userHoverBox{
    padding: 20px 30px;
    position: relative;
    &::after{
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: calc(100% - 20px);
      margin: 0 auto;
      height: 1px;
      background: var(--border-color);
    }
    svg{
      margin-right: 12px;
      path{
        fill: var(--text-color3);
      }
    }
    p{
      color: var(--text-color3);
      font-size: 14px;
    }
    &:hover{
      svg path{
        fill: var(--primary-color);
      }
      p{
        color: var(--primary-color);
      }
    }
  }
  .userHoverBox:nth-last-child(1)::after{
    content: none;
  }
}
.divider{
  width: 1px;
  height: 46px;
  background: var(--divider-color);
  margin: 0 40px;
}
.ivu-menu-horizontal.ivu-menu-light:after{
  display: none;
}
.resourcesItem{
  position: relative;
}
.resourceSelections{
  position: fixed;
  top: 76px;
  width: 100%;
  background: white;
  padding: 30px 144px;
  transform: translateY(-100%);
  transition: all .3s ease-out;
  z-index: 19;
  box-shadow: 0 1px 10px 0 rgba(0,0,0,0.08);
  ul{
    display: flex;
    li{
      flex: 1;
      padding: 22px 30px;
      border-radius: 10px;
      cursor: pointer;
      span{
        font-weight: bold;
        margin-bottom: 10px;
        color: var(--text-color1);
      }
      p{
        font-size: 13px;
        color: var(--text-color2);
      }
    }
    li:hover{
      background: var(--hover-bg-color1);
    }
  }
}
.resourceActive{
  transform: translateY(0%);
  transition: all .3s ease-out;
}
@media screen and (max-width: 768px){
  .floatMainMenu{
    display: none;
  }
}
</style>

<template>
  <div>
    <Layout>
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
          <MenuItem :name="pageCode.PROMOTE" :to="{ name: pageCode.PROMOTE }">
            {{ $t('resources') }}
          </MenuItem>
          <MenuItem
            :name="pageCode.DASHBOARD_SUBSCRIBE"
            :to="{ name: pageCode.DASHBOARD_SUBSCRIBE }"
          >
            {{ $t('dashboard') }}
          </MenuItem>
          <MenuItem :name="pageCode.MEMBER" :to="{ name: pageCode.MEMBER }">
            {{ $t('member') }}
          </MenuItem>
        </Row>
        <div class="divider"></div>
        <Row align="middle" :wrap="false">
          <Select v-model="lang" class="langSelector" @on-change="changeLanguage">
            <Icon slot="prefix" type="ios-globe-outline" :size="20" />
            <Option v-for="item in langList" :key="item.value" :value="item.value">{{ item.label }}</Option>
          </Select>
          <Button v-show="!isLoggedIn" type="primary" ghost @click="isLoggedIn=!isLoggedIn">{{ $t('signIn') }}</Button>
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
              <DropdownItem class="userHoverBox">
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
      <Row :xs="24" :sm="24" :md="24" :lg="0" align="middle" justify="space-between" class-name="mobileMenu">
        <div class="mobileLogo"></div>
        <Icon v-show="!mobileMenuDrawer" type="ios-menu" @click="mobileMenuDrawer = !mobileMenuDrawer"/>
        <Icon v-show="mobileMenuDrawer" type="md-close" @click="mobileMenuDrawer = !mobileMenuDrawer"/>
      </Row>
      <Content>
        <Nuxt />
      </Content>
      <Footer>
        <Row class-name="footer" justify="space-between">
          <div class="leftContent">
            <div class="logoBox">
              <img src="~assets/imgs/logo/gpted_logo@2x.png" alt="GPTED_logo">
            </div>
            <ul class="externalLinks">
              <li>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Group 6712">
                    <path id="Vector" d="M21.1333 30V19.9866H24.3188L24.8221 16.6682H21.1333L21.1333 15.0043C21.1333 14.1385 21.407 13.312 22.6052 13.312H25V10H21.6001C18.7415 10 17.9615 11.9525 17.9615 14.6589V16.6667H16V19.9866H17.9615V30H21.1333Z" fill="#F5F5F5"/>
                    <g id="Ellipse 480">
                      <circle class="btnBg" cx="20" cy="20" r="20" fill="white"/>
                      <circle cx="20" cy="20" r="19.5" stroke="#F5F5F5" stroke-opacity="0.5"/>
                    </g>
                  </g>
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <g id="Group 6713">
                    <path id="Vector" d="M28.7601 16.4081C28.7601 16.2002 28.7562 15.9947 28.7471 15.7905C29.6292 15.1283 30.3946 14.2994 31 13.3508C30.1779 13.7234 29.3031 13.9645 28.4072 14.0654C29.3396 13.4873 30.0547 12.5628 30.3927 11.4533C29.5196 11.9867 28.5538 12.3681 27.527 12.5668C26.7042 11.6236 25.5301 11.0229 24.2321 11.0006C21.7393 10.9591 19.7186 13.0813 19.7186 15.7401C19.7186 16.1181 19.7578 16.4846 19.8357 16.8385C16.0819 16.5951 12.7555 14.6266 10.5304 11.6591C10.1422 12.3701 9.91942 13.201 9.91942 14.0915C9.91942 15.7757 10.7163 17.2726 11.9271 18.1559C11.1858 18.1221 10.4915 17.8959 9.88248 17.5251V17.587C9.88248 19.9408 11.4388 21.913 13.5039 22.3732C13.1253 22.4817 12.726 22.5381 12.3153 22.5361C12.03 22.5346 11.7456 22.5032 11.4667 22.4425C12.0405 24.3714 13.7082 25.7807 15.6826 25.8276C14.1374 27.1184 12.1908 27.8894 10.0775 27.8841C9.71309 27.8841 9.35301 27.8594 9 27.8148C10.9983 29.1957 13.3703 30 15.9202 30C24.2208 30.002 28.7601 22.7233 28.7601 16.4081Z" fill="#F5F5F5"/>
                    <g id="Ellipse 481">
                      <circle class="btnBg" cx="20" cy="20" r="20" fill="white"/>
                      <circle cx="20" cy="20" r="19.5" stroke="#F5F5F5" stroke-opacity="0.5"/>
                    </g>
                  </g>
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <g id="Group 6714">
                    <path id="Vector" d="M12.9425 11.0025C12.6822 10.9893 12.422 11.0288 12.1789 11.1187C11.9359 11.2085 11.7155 11.3465 11.5323 11.5236C11.3492 11.7007 11.2074 11.9129 11.1163 12.1462C11.0252 12.3794 10.9869 12.6285 11.0039 12.8769C10.9932 13.1219 11.0361 13.3662 11.13 13.5944C11.224 13.8225 11.3668 14.0293 11.5493 14.2016C11.7319 14.3739 11.9501 14.5078 12.19 14.5947C12.4299 14.6816 12.6862 14.7197 12.9425 14.7064C13.1995 14.7162 13.456 14.6756 13.696 14.5872C13.9361 14.4989 14.1547 14.3645 14.3385 14.1925C14.5222 14.0205 14.6672 13.8144 14.7646 13.5868C14.8619 13.3593 14.9095 13.1152 14.9045 12.8694C14.9139 12.6212 14.8695 12.3738 14.7742 12.1427C14.6788 11.9117 14.5345 11.7019 14.3502 11.5266C14.166 11.3514 13.9459 11.2143 13.7036 11.1241C13.4614 11.0339 13.2022 10.9925 12.9425 11.0025ZM29 28V20.9783C29 17.4918 27.1831 15.8948 24.758 15.8948C24.032 15.8879 23.3158 16.056 22.6759 16.3836C22.0359 16.7113 21.4928 17.1879 21.0968 17.7693H21.0222L20.8535 16.1497H17.6514C17.6985 17.1919 17.7495 18.4478 17.7495 19.9249V28H21.4343V21.1733C21.4234 20.8603 21.4712 20.5479 21.5755 20.251C21.6878 19.8592 21.9302 19.5127 22.2664 19.2639C22.6026 19.0151 23.0143 18.8773 23.4395 18.8714C24.7737 18.8714 25.3074 19.9136 25.3074 21.4394V28H29ZM11.1099 16.161H14.7946V28H11.1099V16.161Z" fill="#F5F5F5"/>
                    <g id="Ellipse 482">
                      <circle class="btnBg" cx="20" cy="20" r="20" fill="white"/>
                      <circle cx="20" cy="20" r="19.5" stroke="#F5F5F5" stroke-opacity="0.5"/>
                    </g>
                  </g>
                </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <g id="Group 6715">
                    <path id="Vector" d="M30.5408 15.3432C30.2879 14.4212 29.5415 13.6951 28.5962 13.449C26.8799 13 20 13 20 13C20 13 13.1201 13 11.4038 13.4467C10.456 13.6927 9.71205 14.4188 9.45915 15.3408C9 17.0127 9 20.5 9 20.5C9 20.5 9 23.9873 9.45915 25.6568C9.71205 26.5788 10.4585 27.3049 11.4038 27.551C13.1201 28 20 28 20 28C20 28 26.8799 28 28.5962 27.551C29.544 27.3049 30.2879 26.5788 30.5408 25.6568C31 23.9873 31 20.5 31 20.5C31 20.5 31 17.0127 30.5408 15.3432ZM17.8147 23.7006V17.2994L23.5112 20.4761L17.8147 23.7006Z" fill="#F5F5F5"/>
                    <g id="Ellipse 483">
                      <circle class="btnBg" cx="20" cy="20" r="20" fill="white"/>
                      <circle cx="20" cy="20" r="19.5" stroke="#F5F5F5" stroke-opacity="0.5"/>
                    </g>
                  </g>
                </svg>
              </li>
              <li>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Group 6716">
                    <path id="Vector" d="M19.5 30C18.1081 30 17.2777 29.3964 16.5408 28.8757C15.991 28.497 15.4998 28.1302 14.9149 28.0355C13.5698 27.9645 13.1722 28.0355 12.447 28.1657C12.3183 28.1657 12.1662 28.1302 12.1077 27.9172C11.8972 27.0296 11.8387 26.7811 11.6867 26.7574C10.1427 26.5089 9.19529 26.1538 9.00815 25.716C8.97305 25.4438 9.05494 25.3254 9.1836 25.3254C10.4352 25.1006 11.5463 24.4379 12.482 23.3255C13.2189 22.4734 13.5698 21.645 13.6049 21.5621C13.792 21.1834 13.8271 20.8521 13.7219 20.5917C13.523 20.1065 12.8446 19.8935 12.1077 19.645C11.7101 19.4911 11.0667 19.1597 11.1486 18.6982C11.2188 18.3669 11.6515 18.1302 12.2598 18.1775C12.6691 18.3669 13.02 18.4615 13.3358 18.4615C13.7218 18.4615 13.8973 18.3195 13.9441 18.2722C13.8154 16.1894 13.7101 14.3787 14.1663 13.3491C15.5349 10.2485 18.4239 10 19.5 10C20.5761 10 23.4652 10.2485 24.8337 13.3491C25.2898 14.3787 25.1846 16.1894 25.0559 18.2722C25.1027 18.3195 25.2782 18.4615 25.6641 18.4615C25.9799 18.4615 26.3309 18.3669 26.7402 18.1775C27.3485 18.1302 27.7812 18.3669 27.8514 18.6982C27.9333 19.1597 27.29 19.4911 26.8923 19.645C26.1554 19.8935 25.477 20.1065 25.2781 20.5917C25.1729 20.8521 25.208 21.1834 25.3951 21.5621C25.4302 21.645 25.7811 22.4734 26.518 23.3255C27.4537 24.4379 28.5649 25.1006 29.8164 25.3254C29.9451 25.3254 30.0269 25.4438 29.9918 25.716C29.8047 26.1538 28.8573 26.5089 27.3133 26.7574C27.1613 26.7811 27.1028 27.0296 26.8923 27.9172C26.8338 28.1302 26.6817 28.1657 26.553 28.1657C25.8278 28.0355 25.4302 27.9645 24.0851 28.0355C23.5002 28.1302 23.009 28.497 22.4592 28.8757C21.7224 29.3965 20.892 30 19.5 30Z" fill="#F5F5F5"/>
                    <g id="Ellipse 483">
                      <circle class="btnBg" cx="20" cy="20" r="20" fill="white"/>
                      <circle cx="20" cy="20" r="19.5" stroke="#F5F5F5" stroke-opacity="0.5"/>
                    </g>
                  </g>
                </svg>

              </li>
            </ul>
          </div>
          <div class="rightContent">
            <Row>
              <Col :span="8">
                <h3>Member</h3>
                <p>Super subscription</p>
                <p>member</p>
              </Col>
              <Col :span="8">
                <h3>Contact us</h3>
                <p>Come to know GPTED</p>
                <p>Business cooperation</p>
                <p>Advertising services</p>
              </Col>
              <Col :span="8">
                <h3>Date</h3>
                <p>Self export</p>
                <p>Customized services</p>
              </Col>
            </Row>
          </div>
        </Row>
        <Row class-name="copyright" justify="center">
          <p>© Powered by Nanjing Jujia Information Technology Co. Ltd, All Rights Reserved</p>
        </Row>
      </Footer>
    </Layout>
    <Drawer
      v-model="mobileMenuDrawer"
      class-name="mobileDrawer"
      width="60%"
      :mask-style="{'backgroundColor': 'transparent'}"
      :closable="false">
      <Row align="middle" justify="space-between">
        <Select v-model="lang" class="langSelector" :transfer="true" @on-change="changeLanguage">
          <Icon slot="prefix" type="ios-globe-outline" />
          <Option v-for="item in langList" :key="item.value" :value="item.value">{{ item.label }}</Option>
        </Select>
        <div>
          <Button v-show="!isLoggedIn" type="primary" ghost @click="isLoggedIn = !isLoggedIn">{{ $t('signIn') }}</Button>
          <Avatar v-show="isLoggedIn" class="avatarBox">G</Avatar>
        </div>
      </Row>
      <Divider />
      <Menu :active-name="activeRouterName" theme="light" class="mobileMenuRouter" width="100%">
          <MenuItem :name="pageCode.HOME" to="/">
            {{ $t('home') }}
          </MenuItem>
          <MenuItem :name="pageCode.DISCOVER" :to="{ name: pageCode.DISCOVER }">
            {{ $t('search') }}
          </MenuItem>
          <MenuItem :name="pageCode.PROMOTE" :to="{ name: pageCode.PROMOTE }">
            {{ $t('resources') }}
          </MenuItem>
          <MenuItem
            :name="pageCode.DASHBOARD_SUBSCRIBE"
            :to="{ name: pageCode.DASHBOARD_SUBSCRIBE }"
          >
            {{ $t('dashboard') }}
          </MenuItem>
          <MenuItem :name="pageCode.MEMBER" :to="{ name: pageCode.MEMBER }">
            {{ $t('member') }}
          </MenuItem>
      </Menu>
      <Button v-if="isLoggedIn" class="signOutBtn">{{$t('signOut')}}</Button>
    </Drawer>
  </div>
</template>

<script>
import pageCode from "~/enums/pageCodes";
import {langList} from "~/lang/langList";

export default {
  name: "Default",
  data() {
    return {
      activeRouterName: this.$route.name !== 'index' ? this.$route.name : 'home',
      lang: this.$i18n.defaultLocale,
      langList,
      mobileMenuDrawer: false,

      isLoggedIn: false,
    }
  },
  computed: {
    pageCode() {
      return pageCode
    },
    // isLoggedIn() {
      // this.$store.dispatch("user/checkToken")
      // return this.$store.getters["user/isLoggedIn"]
      // return false
    // }
  },
  watch: {
    $route(to, from) {
      this.activeRouterName = to.name !== 'index' ? to.name : 'home';
    },
  },
  methods: {
    changeLanguage() {
      this.$i18n.setLocale(this.lang)
    },
    signIn() {
      this.$router.push({ name: 'login' })
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
  background: gray;
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
.ivu-layout{
  background: var(--bg-color);
}
.ivu-layout-content{
  padding: 120px 0 40px;
}

.ivu-layout-footer{
  background: var(--dark-color);
  padding: 0;

}

.footer{
  padding: 64px 80px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  .leftContent{
    margin-right: 200px;
    .logoBox{
      width: 304px;
      margin-bottom: 34px;
      img{
        width: 100%;
      }
    }
    .externalLinks{
      display: flex;
      justify-content: center;
      li{
        width: 40px;
        height: 40px;
        margin: 0 6px;
        svg .btnBg{
          fill-opacity: 0;
        }
      }
      li:hover{
        svg .btnBg{
          fill-opacity: 0.1;
        }
      }
    }
  }
  .rightContent{
    flex-grow: 1;
    color: var(--text-color4);
    h3{
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 40px;
    }
    p{
      font-size: 16px;
      opacity: 0.8;
      margin-bottom: 30px;
    }
  }
}
.copyright{
  position: relative;
  margin: 16px auto;
  p{
    color: var(--text-color4);
    opacity: 0.54;
    font-size: 16px;
  }
}
//mobile

.mobileMenu{
  display: none;
  background-color: var(--light-color);
  width: 100%;
  height: 50px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1001;
  padding: 0 20px;
  box-shadow: 0 1px 10px 0 rgba(0,0,0,0.08);
  .mobileLogo{
    width: 88px;
    height: 22px;
    background-color: #666666;
  }
  i{
    font-size: 22px;
  }
}

@media (max-width: 768px) {
  .floatMainMenu{
    display: none;
  }
  .mobileMenu{
    display: flex;
  }
  .ivu-layout-content{
    padding: 75px 25px 25px;
  }
  .mobileDrawer{
    position: relative;
    .ivu-menu-item{
      transition: none;
      font-weight: bold;
      padding: 20px 0;
      opacity: 0.7;
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
      background: transparent;
    }
    .ivu-menu-vertical.ivu-menu-light:after,.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after{
      content: none;
    }
    .ivu-menu-item-active{
      border-bottom: 0;
      background: transparent;
      opacity: 1;
    }
    .mobileMenuRouter{
      text-align: right;
    }
    .signOutBtn{
      position: absolute;
      bottom: 80px;
      left: 20px;
      color: var(--error-color);
      width: calc(100% - 40px);
      border: 1px solid var(--error-color);
    }
  }
  .footer .leftContent .logoBox{
    width: 40%;
  }
}

</style>

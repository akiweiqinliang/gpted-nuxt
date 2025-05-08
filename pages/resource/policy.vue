<template>
  <div>
    <BackTop :height="100" :bottom="200">
      <div class="backTop"><Icon type="md-skip-backward" /></div>
    </BackTop>
    <div class="bgImage"></div>
    <div class="container">
      <Row class="topHeader">
        <div class="left">
          <h1>{{$t('policy')}}</h1>
          <span>{{ $t('policy_desc') }}</span>
        </div>
      </Row>
      <Row>
        <Col :span="6">
          <div class="sideMenu">
            <h4>{{ $t('policy_country') }}</h4>
            <Select v-model="currentCode" prefix="ios-search" filterable :placeholder="$t('search')" class="selectInput" @on-change="handleSelectChange">
              <Option v-for="item in policyCountryListCode2" :key="`country-${item}`" :value="item">{{ $t(item) }}</Option>
            </Select>
<!--            <Input suffix="ios-search" :placeholder="$t('search')" style="width: calc(100% - 50px); margin-top: 20px;" />-->
            <ul>
              <li
                v-for="(code, idx) in policyCountryListCode"
                :key="`policy-country-${idx}`"
                :class="{'active' : code === currentCode}"
                @click="handleSelectByCode(code)">
                {{ $t(code) }}
              </li>
            </ul>
          </div>
          <div class="sideMenu">
            <h4>{{ $t('policy_organization') }}</h4>
            <Select v-model="currentCode" prefix="ios-search" filterable :placeholder="$t('search')" class="selectInput" @on-change="handleSelectChange">
              <Option v-for="item in policyOrganizationListCode" :key="`country-${item}`" :value="item">{{ $t(item) }}</Option>
            </Select>
<!--            <Input suffix="ios-search" :placeholder="$t('search')" style="width: calc(100% - 50px); margin-top: 20px;" />-->
            <ul>
              <li
                v-for="(code, idx) in policyOrganizationListCode"
                :key="`policy-organization-${idx}`"
                :class="{'active' : code === currentCode}"
                @click="handleSelectByCode(code)">
                {{ $t(code) }}
              </li>
            </ul>
          </div>
        </Col>
        <Col :span="18">
          <Row type="flex" justify="space-between" align="middle">
            <div class="countryFlagBox">
<!--              <span :class="['fi', `fi-${policy.countryISO}`, 'countryFlag']"></span>-->
              <span :class="['fi', `fi-${ policy.iso.toLowerCase()}`, 'policyFlag']"></span>
<!--              <span class="countryName">{{ policy.name }}</span>-->
              <span class="countryName">{{ $t(policy.iso) }}</span>
            </div>
            <ul class="shareList">
              <li
                v-for="platform in sharingPlatforms"
                :key="`share-platform-${platform.id}`"
                @click="handleShare(platform.id)"
              >
                <img :src="require(`~/assets/imgs/blog/${platform.imgName}@2x.png`)"  alt="x">
              </li>
            </ul>
          </Row>
          <Row>
            <Card class="policyDesc" :dis-hover="true" :padding="0">
              <p>{{ policy.desc }}</p>
            </Card>
          </Row>
          <Row>
            <Card class="policyContentTitle" :dis-hover="true" :padding="0">
              <h2>{{ $t('policy_contents_title') }}</h2>
              <ul>
                <li
                  v-for="content in policy.contents"
                  :key="`policy_contents_title-${content.id}`"
                  :class="{'titleActive' : content.id === contentActiveIndex }"
                  @click="contentActiveIndex = content.id"
                >
                  {{ content.title }}
                </li>
              </ul>
            </Card>
          </Row>
          <Row>
            <Card class="policyContentDetail" :dis-hover="true" :padding="0">
              <div class="contentDetailHeader">{{ policy.contents[contentActiveIndex].title }}</div>
              <p>{{ policy.contents[contentActiveIndex].detail }}</p>
            </Card>
          </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import {policyData} from "~/enums/mockData";
export default {
  name: "Policy",
  layout: 'resource',
  asyncData() {
    const initPolicy = () => {
      // todo axios
      return policyData[0]
    }
    const policy = initPolicy()
    return {
      policyData,
      policy
    }
  },
  data() {
    return {
      currentCode: 'US',
      policyCountryListCode: ['US', 'GB', 'FR', 'CN', 'DE', 'JP'],
      policyCountryListCode2: ['IN', 'GB', 'FR', 'CN', 'DE', 'JP'],
      policyOrganizationListCode: ['UN', 'EU', 'OECD', 'APEC'],
      platformMap : {
        0: 'X',
        1: 'Instagram',
        2: 'Facebook',
        // 3: 'Link'
      },
      sharingPlatforms: [
        {
          id: 0,
          imgUrl: 'assets/imgs/blog/x@2x.png',
          imgName: 'x',
          name: 'Tweet',
        },
        {
          id: 1,
          imgUrl: 'assets/imgs/blog/ins@2x.png',
          imgName: 'ins',
          name: 'Share',
        },
        {
          id: 2,
          imgUrl: 'assets/imgs/blog/facebook@2x.png',
          imgName: 'facebook',
          name: 'Share',
        },
        {
          id: 3,
          imgUrl: 'assets/imgs/blog/link@2x.png',
          imgName: 'link',
          name: 'Copy link',
        },
      ],
      contentActiveIndex: 0, // 默认选中第一个content显示
    }
  },
  head() {
    return {
      title: this.policy.name || this.$route.name,
      meta: [
        { hid: 'description', name: 'description', content: this.policy.desc.slice(0, 150) || 'Default description' },
        { hid: 'keywords', name: 'keywords', content: this.policy.name ? `${this.policy.name}, Tendering, Business` : 'Default keywords' },
        { property: 'og:title', content: this.policy.name || 'Default Title' },
        { property: 'og:description', content: this.policy.desc.slice(0, 150) || 'Default description' },
        { property: 'og:type', content: 'article' }
      ]
    }
  },
  mounted() {
    this.initPolicy()
  },
  methods: {
    initPolicy() {
      this.policy = this.policyData[0]
    },
    handleSelectChange(value) {
      if (!value) return
      this.handleSelectByCode(value)
    },
    handleSelectByCode(currentCode) {
      this.currentCode = currentCode;
      this.policy = this.policyData.find(item => item.iso === currentCode)
      this.contentActiveIndex = 0 // reset
      // todo 修改
    },
    handleShare(platformKey) {
      this.copyToClipboard()
      const platform = this.platformMap[platformKey] || '';
      let executionFunc;
      switch (this.platformMap[platformKey]) {
        case 'X':
          executionFunc = () => this.shareToX();
          break;
        case 'Instagram':
          executionFunc = () => {};
          break;
        case 'Facebook':
          executionFunc = () => this.shareToFacebook();
          break;
        default:
          break;
      }
      if (!platform) {
        this.$Message.info({
          content: this.$t('share_content_noPlatform'),
          duration: 5
        })
        return
      }
      const content = `<p>${this.$t('share_content', { platform })}</p>`
      this.$Modal.confirm({
        title: this.$t('share'),
        width: window.innerWidth > 568 ? '25%' : '200px',
        // title: content,
        content,
        okText: this.$t('go_platform', { platform }),
        cancelText: this.$t('cancel'),
        onOk: () => executionFunc()
      });
    },
    shareToFacebook() {
      const { title, url } = this.getArticleInfo();
      const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
      window.open(fbShareUrl, '_blank');
    },
    shareToX() {
      const { title, url } = this.getArticleInfo();
      const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
      window.open(xShareUrl, '_blank');
    },
    async copyToClipboard() {
      const shareText = `
      我在GPTED发现一篇很有趣的文章，点击下方链接一起来看吧
      http://localhost:3000/resource/blogs/${this.$route.params.id}`;
      try {
        await navigator.clipboard.writeText(shareText);
        // console.log('copy success')
        // this.$toast.success('复制成功！'); // 你可以换成 alert 或其他提示
      } catch (err) {
        // console.error('复制失败:', err);
        // this.$toast.error('复制失败！');
      }
    },
  }
}
</script>

<style scoped lang="scss">
.backTop{
  width: 71px;
  height: 71px;
  background: #FFFFFF;
  box-shadow: 0 0 12px 0 rgba(0,0,0,0.08);
  border-radius: 70px 70px 70px 70px;
  border: 1px solid #FFFFFF;
  opacity: 0.8;
  position: relative;
  i{
    position: absolute;
    transform: translate(-50%, -50%) rotate(90deg);
    left: 50%;
    top: 50%;
    color: var(--icon-color2);
    font-size: 20px;
  }
}
.bgImage{
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 336px;
  background: linear-gradient( 180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%), #fff9f2;
}
.container{
  position: relative;
  z-index: 2;
  margin: 0 auto;
  width: calc(100% - 200px);
  max-width: var(--max-width);
}
.topHeader{
  display: flex;
  justify-content: space-between;
  padding-top: 60px;
  margin-bottom: 60px;
  .left{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1{
      margin-bottom: 24px;
      font-size: 42px;
    }
    span{
      font-size: 21px;
      color: var(--text-color2);
    }
  }
  .imgBox{
    width: 300px;
    display: flex;
    align-items: center;
    img{
      width: 100%;
      object-fit: contain;
    }
  }
}
.sideMenu{
  padding-right: 50px;
  h4{
    font-size: 16px;
  }
  .selectInput{
    margin: 13px 0 16px;
  }
  ul{
    .active{
      color: var(--primary-color);
    }
    li{
      font-size: 16px;
      color: var(--text-color2);
      margin-bottom: 20px;
      cursor: pointer;
      word-break: break-word;
      &:hover{
        color: var(--primary-color);
      }
    }
  }
}
.countryFlagBox{
  display: flex;
  align-items: center;
  .policyFlag{
    margin-right: 30px;
    width: 100px;
    aspect-ratio: 10 / 7;
    border-radius: 10px;
  }
  .countryName{
    font-size: 40px;
    font-weight: bold;
  }
}
.shareList{
  display: flex;
  li{
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 36px;
    img{
      width: 30px;
      height: 30px;
    }
  }
}
.policyDesc{
  margin-top: 30px;
  padding: 24px 30px;
  font-size: 18px;
}
.policyContentTitle{
  margin-top: 24px;
  padding: 24px 0;
  width: 100%;
  h2{
    padding: 0 30px;
  }
  ul{
    max-height: 300px;
    overflow-y: scroll;
    padding: 0 30px;
  }
  ul li{
    background: var(--text-bg-color1);
    color: #8F97A8;
    border-radius: 6px;
    padding: 15px 20px;
    font-size: 18px;
    margin-top: 12px;
    cursor: pointer;
  }
  .titleActive{
    color: var(--primary-color);
    background: var(--primary-bg-color1);
  }
}
.policyContentDetail{

  margin-top: 30px;
  padding: 24px 30px;
  font-size: 18px;
  position: relative;

  .contentDetailHeader{
    position: relative;
    left: -30px;
    background: linear-gradient( 90deg, rgba(255,255,255,0) 0%, #FFFFFF 100%), #EAF6FF;
    font-size: 18px;
    padding: 16px 26px;
    word-break: break-word;
    margin-bottom: 18px;
    &::before{
      content: '';
      width: 4px;
      height: 100%;
      background: var(--primary-color);
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  p{
    white-space: pre-line;
    line-height: 1.5;
  }
}

</style>

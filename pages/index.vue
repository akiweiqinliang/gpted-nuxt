<template>
  <div>
    <section class="home1">
    <Row>
      <Col :span="14" class="textBox">
          <h1>
            <span>GPTED</span>
            Global Tendering
          </h1>
        <div class="textInputBox">
          <p>
            Gpted helps you obtain bidding information and relevant legal documents from various countries around the world,Gpted helps you obtain bidding information and relevant legal.
          </p>
          <Input class="topInput" search enter-button placeholder="Please enter keywords" />
        </div>
      </Col>
      <Col :span="10">
        <Row>
          <img src="~assets/imgs/home/homeEarth@2x.png" alt="gpted" />
        </Row>
      </Col>
    </Row>
    <ul>
      <li v-for="i in 4" :key="i">
        <Row :wrap="false" align="middle">
          <Col flex="68px" class="ivu-row ivu-row-center">
            <img :src="require(`~/assets/imgs/home/homeLogo1-${i}@2x.png`)" alt="" />
          </Col>
          <Col flex="auto" class="ivu-row ivu-row-center">
            <h2>4.36 million</h2>
            <p>Bidding Information</p>
          </Col>
        </Row>
      </li>
    </ul>
  </section>
    <section ref="homePage2" class="home2">
      <div class="headerBox">
        <h1>Countries covering the world</h1>
        <p>GPTED gathers relevant bidding information from countries, institutions, and organizations around the world, and delves into the huge business opportunities that exist in overseas markets!</p>
      </div>
    <Row justify="center" class-name="map">
      <img class="map" src="~assets/imgs/home/coreImg2@2x.png" alt="">
    </Row>
    <div class="scrollBox" :class="playFlagScroll ? 'play' : 'playStop'">
      <Row class-name="countryScrollFlags" :wrap="false">
        <div class="imgList1" style="display: flex">
          <div v-for="(item,idx) in flagList" :key="`${item}-${idx}`">
            <span :class="['fi', `fi-${item}`, 'countryFlag']"></span>
          </div>
        </div>
        <div class="imgList2" style="display: flex;">
          <div v-for="(item,idx) in flagList" :key="`${item}-${idx}`">
            <span :class="['fi', `fi-${item}`, 'countryFlag']"></span>
          </div>
        </div>
      </Row>
      <Row class-name="organizationScrollFlags" :wrap="false">
        <div class="imgList1" style="display: flex">
          <div v-for="(item,idx) in flagList2" :key="`${item}-${idx}`">
            <span :class="['fi', `fi-${item}`, 'countryFlag']"></span>
          </div>
        </div>
        <div class="imgList2" style="display: flex;">
          <div v-for="(item,idx) in flagList2" :key="`${item}-${idx}`">
            <span :class="['fi', `fi-${item}`, 'countryFlag']"></span>
          </div>
        </div>
      </Row>
    </div>
  </section>
    <section class="home3">
      <div class="headerBox">
        <h1>One click translation for efficient</h1>
        <p>GPTED uses AI machine learning and post editing to accurately translate relevant terminology in the bidding industry!</p>
      </div>
      <Row align="middle">
        <Col :span="15">
          <img src="~assets/imgs/home/coreImg3@2x.png" alt="">
        </Col>
        <Col :span="9" class="textContent">
          <h2>Four reading modes</h2>
          <ul>
            <li>
              <p>Original announcement can be read directly online</p>
            </li>
            <li>
              <p>Supports online translation and reading in multiple languages</p>
            </li>
            <li>
              <p>Can read both the original text and the translated text simultaneously</p>
            </li>
            <li>
              <p>Support attachment download and download after translation</p>
            </li>
          </ul>
        </Col>
      </Row>
    </section>
    <section class="home4">
      <div class="headerBox">
        <h1>7x24h global monitoring</h1>
        <p>GPTED provides real-time updates on new procurement opportunities, helping you stay at the forefront of project information and seize absolute market opportunities!</p>
      </div>
      <Row align="middle">
        <Col :span="10" class="textContent">
          <ul>
            <li>
              <Icon type="ios-checkmark-circle-outline" />
              <p>7x24h monitoring of global information</p>
            </li>
            <li>
              <Icon type="ios-checkmark-circle-outline" />
              <p>Deep mining of big data and precise capture</p>
            </li>
            <li>
              <Icon type="ios-checkmark-circle-outline" />
              <p>360° degree panoramic insight</p>
            </li>
            <li>
              <Icon type="ios-checkmark-circle-outline" />
              <p>Rich filtering across all scenarios</p>
            </li>
          </ul>
        </Col>
        <Col :span="14">
        <img src="~assets/imgs/home/coreImg4@2x.png" alt="">
      </Col>
      </Row>
    </section>
    <section class="home5">
      <div class="headerBox">
        <h1>Intelligent project matching</h1>
        <p>GPTED is based on AI data analysis and provides intelligent information services to achieve one-stop tracking of global procurement opportunities!</p>
      </div>
      <Row align="middle">
        <Col :span="15">
          <img src="~assets/imgs/home/coreImg5@2x.png" alt="">
        </Col>
        <Col :span="9" class="textContent">
          <h2>Four reading modes</h2>
          <p>Customizable push list with support for email notifications, providing real-time updates on the tender information you follow.</p>
          <ul>
            <li>
              <p>Real time updates</p>
            </li>
            <li>
              <p>Intelligent push</p>
            </li>
            <li>
              <p>Custom push</p>
            </li>
            <li>
              <p>Can set email reminders</p>
            </li>
          </ul>
        </Col>
      </Row>
    </section>
    <section class="home6">
      <div class="contentBox">
        <div class="headerBox">
          <h1>Numerous powerful features</h1>
          <p>GPTED has the most comprehensive functional modules for users to experience, making your bidding process easy and enjoyable</p>
        </div>
        <ul>
          <li v-for="(item, idx) in features" :key="`features-${item.label}-${idx}`">
            <Row :gutter="20" justify="space-between" align="middle">
              <Col flex="2.3">
                <Row align="middle">
                  <img :src="require(`~/assets/imgs/home/coreImg6-${idx+1}@2x.png`)" alt="">
                </Row>
              </Col>
              <Col flex="11">
                <span>{{ item.label }}</span>
                <p>{{ item.detail }}</p>
              </Col>
            </Row>
          </li>
        </ul>
        <Row justify="center">
          <Button type="primary" class="featureBtn">
            <span>Start for free</span>
            <Icon type="md-arrow-forward" />
          </Button>
        </Row>
      </div>
    </section>
    <section class="home7">
      <div class="headerBox">
        <h1>Industry distribution</h1>
        <p>GPTED provides real-time updates on new procurement opportunities, helping you stay at the forefront of project information and seize absolute market opportunities!</p>
      </div>
      <ul>
        <li v-for="(item, idx) in industry" :key="`features-${item.label}-${idx}`">
          <Row :gutter="20" justify="center" align="middle">
            <Col>
              <Row align="middle">
                <img :src="require(`~/assets/imgs/home/coreImg7-${idx+1}@2x.png`)" alt="">
              </Row>
            </Col>
            <Col>
              <Row justify="center">
                <span>{{ item.label }}</span>
              </Row>
              <p>{{ item.detail }}</p>
            </Col>
          </Row>
        </li>
        <li class="moreCard">
          <span>
            GPTED has <span class="active">341</span> industry classifications
          </span>
          <div class="moreBtn">
            <span>More</span><Icon type="md-arrow-forward" />
          </div>
        </li>
      </ul>
    </section>
    <section ref="homePage8" class="home8">
      <div class="headerBox">
        <h1>Serving a massive global customer base</h1>
        <p>More than 13000 companies worldwide are using GPTED<span>View more</span><Icon type="md-arrow-forward" /></p>
      </div>
      <ul>
        <li>
          <Row class-name="upper">
            <div class="bannerBox"></div>
            <Row align="top">
              <span>I must commend the team behind the bidding information website for their exceptional work. The platform's user experience is top-notch, with a sleek and modern design that makes navigating through the vast array of tender opportunities a breeze.</span>
            </Row>
          </Row>
          <Row class-name="bottom" align="middle" :wrap="false">
            <div class="avatarBox">
              <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" alt=""/>
            </div>
            <div>
              <span>Dr. Elizabeth Bennett</span>
              <p>Chief Technology Officer (CTO)</p>
            </div>
          </Row>
        </li>
        <li>
          <Row class-name="upper">
            <div class="bannerBox"></div>
            <span>Dear team, I would like to express my satisfaction with your bidding information website. The website has an intuitive interface and is easy to operate, allowing me to quickly find the bidding information I need. The information is updated quickly and covers a wide range of industries and regions, which is very helpful for me to understand market dynamics.</span>
          </Row>
          <Row class-name="bottom" align="middle" :wrap="false">
            <div class="avatarBox">
              <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" alt=""/>
            </div>
            <div>
              <span>Dr. Elizabeth Bennett</span>
              <p>Chief Technology Officer (CTO)</p>
            </div>
          </Row>
        </li>
        <li>
          <Row class-name="upper">
            <div class="bannerBox"></div>
            <span>The bidding information website has been an absolute game-changer for our project management team. The comprehensive database and real-time updates have streamlined our process for identifying and evaluating potential projects. The ability to filter and sort through the tenders by various criteria has saved us countless hours and has significantly improved our project.</span>
          </Row>
          <Row class-name="bottom" align="middle" :wrap="false">
            <div class="avatarBox">
              <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" alt=""/>
            </div>
            <div>
              <span>Dr. Elizabeth Bennett</span>
              <p>Chief Technology Officer (CTO)</p>
            </div>
          </Row>
        </li>
      </ul>
      <Row class-name="scrollBanners" :class="{ 'play': playBannerScroll }" :wrap="false">
        <div class="banner1">
          <div v-for="(item,idx) in bannerList" :key="`${item}-${idx}`" class="bannerImg">
            <img :src="require(`~/assets/imgs/home/coreImg7-${item}@2x.png`)" alt="">
          </div>
        </div>
        <div class="banner2">
          <div v-for="(item,idx) in bannerList" :key="`${item}-${idx}`" class="bannerImg">
            <img :src="require(`~/assets/imgs/home/coreImg7-${item}@2x.png`)" alt="">
          </div>
        </div>
      </Row>
    </section>
    <section class="home9">
      <div class="headerBox">
        <h1>Frequently asked questions</h1>
      </div>
      <Collapse
        :accordion="true"
        simple
        class="questionCollapse">
        <Panel v-for="i in 7" :key="i" class="questionItem">
          <span><Icon type="md-help-circle" />Is the account universal on the platform used?</span>
          <p slot="content">
            <Icon type="md-chatbubbles" />
            If you want to switch from a monthly plan to an annual plan, you can directly switch to the Annual Plan in thebilling section. However, if you want to switch from Pro to Business, or from an annual plan to a monthly plan, you wil need tocancel your current plan and subscribe to a new one. Note: The current plan will remain active until the next renewal date and the new plan wil take effect from thefollowing billing period.</p>
        </Panel>
      </Collapse>
      <div class="tryCard">
        <Row :gutter="72">
          <Col :span="12" class="leftBox">
            <Row>
            <span>
              Try <span class="active">GPTED</span> for free. No credit card required, no software to install.
            </span>
              <Row>
                <Button type="primary" class="tryBtn">Start free trial</Button>
                <Button type="primary" class="priceBtn" ghost>See pricing</Button>
              </Row>
            </Row>
          </Col>
          <Col :span="12">
            <Row>
              <img src="~assets/imgs/home/coreImg9@2x.png" alt="" />
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  </div>
</template>

<script>
import pageCode from "~/enums/pageCodes";

export default {
  name: 'IndexPage',
  data() {
    return {
      playFlagScroll: false,
      playBannerScroll: false,
      flagList: ['af', 'ax', 'al', 'dz', 'as', 'ad', 'ag', 'am', 'af', 'ax', 'al', 'dz', 'as', 'ad', 'ag', 'am'],
      flagList2: ['sh-ac', 'es-pv', 'ic', 'es-ct', 'eu', 'cp', 'arab', 'un', 'sh-ac', 'es-pv', 'ic', 'es-ct', 'eu', 'cp', 'arab', 'un'],

      features: [
        {
          label: 'Real time updates',
          detail: 'Real time updates of bidding information from various countries Real time updates of'
        },
        {
          label: 'Advanced Search',
          detail: 'Support precise retrieval of regions, types, and bidding scales'
        },
        {
          label: 'Global Tender Laws',
          detail: 'Provide users with bidding regulations and laws for country and organization'
        },
        {
          label: 'Keyword subscription',
          detail: 'Push relevant information to users based on subscribed keywordss ubscribed keywords'
        },
        {
          label: 'Attachment Download',
          detail: 'Users can download relevant attachments of bidding information attachments of bidding'
        },
        {
          label: 'Attachment translation',
          detail: 'Users can directly download translated attachment files'
        },
        {
          label: 'Project progress tracking',
          detail: 'Real time tracking of the progress of your favorite projects'
        },
        {
          label: 'Data analysis',
          detail: 'Real time analysis of historical data of winning companies on the dashboard'
        },
        {
          label: 'Company sub account',
          detail: 'Each SVIP member provides three sub account sharing benefits'
        },
      ],
      industry: [
        {
          label: 'CPV:18',
          detail: 'Clothing, footwear, luggage articles and accessories'
        },
        {
          label: 'CPV:77',
          detail: 'Agricultural, forestry, horticultural, aquacultural and apicultural services'
        },
        {
          label: 'CPV:33',
          detail: 'Medical equipments, pharmaceuticals and personal care products'
        },
        {
          label: 'CPV:37',
          detail: 'Musical instruments, sport goods, games, toys, handicraft, art materials and accessories'
        },
        {
          label: 'CPV:30',
          detail: 'Office and computing machinery, equipment and supplies except furniture and software packages'
        },
        {
          label: 'CPV:34',
          detail: 'Transport equipment and auxiliary products to transportation'
        },
        {
          label: 'CPV:71',
          detail: 'Architectural, construction, engineering and inspection services'
        },
        {
          label: 'CPV:39',
          detail: 'Furniture (incl. office furniture), furnishings, domestic appliances (excl. lighting) and cleaning products'
        },
        {
          label: 'CPV:55',
          detail: 'Hotel, restaurant and retail trade services'
        },
        {
          label: 'CPV:15',
          detail: 'Food, beverages, tobacco and related products'
        },
        {
          label: 'CPV:79',
          detail: 'Business services: law, marketing, consulting, recruitment, printing and security'
        },
      ],

      bannerList: [1,2,3,4,5,6,1,2,3,4,5,6]
    }
  },
  computed: {
    pageCode() {
      return pageCode
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScrollPlay);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScrollPlay);
  },
  methods: {
    handleScrollPlay() {
      const checkVisibility = (ref) => {
        const element = this.$refs[ref];
        const offsetTop = element.offsetTop;
        return window.innerHeight + window.scrollY >= offsetTop && window.scrollY < offsetTop + element.offsetHeight;
      }
      this.playFlagScroll = checkVisibility('homePage2');
      this.playBannerScroll = checkVisibility('homePage8');
    },
  }

}
</script>

<style lang="scss" scoped>
section:not(.home1){
  padding-left: 100px;
  padding-right: 100px;
}
.headerBox{
  h1{
    font-weight: bold;
    font-size: 46px;
    margin-bottom: 30px;
    text-align: center;
  }
  p{
    color: var(--text-color2);
    font-size: 20px;
    text-align: center;
    margin: 0 30px 77px;
  }
}
.home6{
  padding-left: 0;
  padding-right: 0;
}
.home1{
  padding-left: 100px;
  padding-right: 100px;
  margin-bottom: 100px;
  .textBox{
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1{
      font-size: 52px;
      margin-bottom: 36px;
      span{
        color: var(--primary-color);
      }
    }
    p{
      color: var(--text-color2);
      font-weight: 400;
      font-size: 20px;
      line-height: 30px;
      margin-bottom: 62px;
    }
  }
  .textInputBox{
    padding-right: 75px;
   .topInput{
     height: 72px;
     .ivu-input{
       height: 72px !important;
     }
   }
  }
  ul{
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 60px;
    li{
      list-style: none;
      border-radius: 10px 10px 10px 10px;
      box-shadow: 0 0 12px 0 rgba(0,0,0,0.08);
      width: calc(25% - 12px);
      aspect-ratio: 299 / 148;
      margin-right: 12px;
      padding: 40px 30px;
      background-color: var(--bg-color1);
      display: flex;
      align-items: center;
      &:nth-last-child(1){
        margin-right: 0;
      }
      img{
        margin-right: 8px;
      }
      h2{
        font-size: 28px;
      }
      p{
        color: var(--text-color2);
        font-weight: 400;
        font-size: 16px;

      }
    }
  }

}
.home2{
  margin-bottom: 200px;
  .map{
    padding: 0 70px;
  }
  .scrollBox{
    margin-top: 66px;
    position: relative;
    &::before{
      position: absolute;
      content: '';
      height: 100%;
      width: 100px;
      background: linear-gradient( 270deg, rgba(246,248,251,0) 0%, var(--bg-color) 100%);
      left: 0;
      top: 0;
      z-index: 10;
    }
    &::after{
      position: absolute;
      content: '';
      height: 100%;
      width: 100px;
      background: linear-gradient( -270deg, rgba(246,248,251,0) 0%, var(--bg-color) 100%);
      top: 0;
      right: 0;
      z-index: 10;
    }
  }
  //旗帜滚动效果
  .countryScrollFlags, .organizationScrollFlags{
    overflow: hidden;
  }
  .countryFlag{
    width: 84px;
    height: 60px;
    margin-right: 32px;
  }
  .imgList1, .imgList2{
    display: flex;
  }
  .countryScrollFlags{
    margin-bottom: 64px;
  }
  .play{
    .countryScrollFlags{
      .imgList1{
        animation: scrollBanner 10s linear infinite;
      }
      .imgList2{
        animation: scrollBanner2 10s linear infinite;
      }
    }
    .organizationScrollFlags{
      .imgList1{
        animation: scrollBanner3 20s linear infinite;
      }
      .imgList2{
        animation: scrollBanner4 20s linear infinite;
      }
    }
  }
  .playStop{
    .countryScrollFlags, .organizationScrollFlags{
      .imgList1, .imgList2{
        animation-play-state: paused;
      }
    }
  }

}
.home3, .home5{
  margin-bottom: 200px;
  .textContent{
    padding: 10px 52px;
    h2{
      font-size: 20px;
      margin-bottom: 28px;
    }
    p{
      font-size: 18px;
      text-align: left;
      margin: 0 0 36px;
    }
    ul{
      li{
        display: flex;
        margin-bottom: 37px;
        position: relative;
        padding-left: 20px;
        &::before{
          position: absolute;
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary-color);
          left: 0;
          top: 10px;
        }
        p{
          font-size: 18px;
          text-align: start;
          margin: 0;
        }
        &:nth-last-child(1){
          margin-bottom: 0;
        }
      }
    }
  }
}
.home4{
  margin-bottom: 200px;
  .textContent{
    padding: 0 40px;
    ul li{
      display: flex;
      align-items: center;
      margin-bottom: 55px;
      i{
        font-size: 18px;
        color: var(--primary-color);
        margin-right: 10px;
      }
      p{
        font-size: 18px;
        margin: 0;
        text-align: start;
      }
    }
    ul li:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
}
//黑色全宽背景
.home6{
  margin-bottom: 200px;
  max-width: 100%;
  background: var(--dark-color);
  padding: 70px 0;
  .contentBox{
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 100px;
    h1, p{
      color: var(--light-color);
    }
    .featureBtn{
      padding: 15px 46px;
      font-size: 20px;
      height: auto;
      border-radius: var(--border-radius-base);
      margin-top: 60px;
    }
    ul {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 20px;
      li{
        transition: all .3s;
        background: white;
        border-radius: var(--border-radius-base);
        padding: 30px 26px;
        cursor: pointer;
        //display: flex;
        span{
          font-weight: bold;
          margin-bottom: 10px;
        }
        p{
          font-size: 12px;
          margin: 0;
          color: var(--text-color3);
          text-align: start;
        }
      }
      li:hover{
        transition: all .3s;
        transform: scale(1.05);
      }
    }
  }

}
.home7{
  margin-bottom: 200px;
  ul{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 14px;
    li{
      background: white;
      border-radius: var(--border-radius-base);
      padding: 26px 30px;
      cursor: pointer;
      img{
        width: 45px;
        height: 45px;
      }
      span{
        font-weight: bold;
        margin: 12px 0 6px;
      }
      p{
        margin: 0;
        font-size: 14px;
        color: var(--text-color2);
      }
      transition: all .3s;
      &:hover{
        transition: all .3s;
        box-shadow: 0 0 12px 0 rgba(0,0,0,0.08);
      }
    }
    .moreCard{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      span{
        font-size: 18px;
        .active{
          color: var(--primary-color);
        }
      }
      .moreBtn{
        span{
          margin-right: 4px;
        }
        span, i{
          font-size: 16px;
          color: var(--primary-color);
        }
      }
    }
  }
}
.home8{
  margin-bottom: 200px;
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    li {
      background: white;
      border-radius: var(--border-radius-base);
      box-shadow: 0 4px 16px 0 rgba(4, 38, 104, 0.1), inset 0 0 18px 8px #FFFFFF;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .upper{
        padding: 30px;
        .bannerBox{
          width: 140px;
          height: 32px;
          background-color: #666666;
          margin-bottom: 16px;
        }
        span{
          font-size: 13px;
          line-height: 30px;
        }
      }
      .bottom{
        border-top: 1px solid var(--border-color);
        padding: 24px 40px;
        .avatarBox{
          width: 56px;
          height: 56px;
          min-width: 56px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 20px;
        }
        span, p{
          font-size: 13px;
        }
        p{
          margin: 0;
          text-align: left;
        }
      }
    }
  }
  .scrollBanners{
    overflow: hidden;
    margin-top: 80px;
    position: relative;
    &::before{
      position: absolute;
      content: '';
      height: 100%;
      width: 100px;
      background: linear-gradient( 270deg, rgba(246,248,251,0) 0%, var(--bg-color) 100%);
      left: 0;
      top: 0;
      z-index: 10;
    }
    &::after{
      position: absolute;
      content: '';
      height: 100%;
      width: 100px;
      background: linear-gradient( -270deg, rgba(246,248,251,0) 0%, var(--bg-color) 100%);
      top: 0;
      right: 0;
      z-index: 10;
    }
    .bannerImg{
      width: 150px;
      height: 50px;
      background: white;
      margin-right: 20px;
    }
    .banner1, .banner2{
      display: flex;
      animation-fill-mode: forwards;
    }
  }
  .play{
    .banner1{
      animation: scrollBanner3 20s linear infinite;
    }
    .banner2{
      animation: scrollBanner4 20s linear infinite;
    }
  }
}
.home9{
  margin-bottom: 120px;
  .questionCollapse{
    background-color: transparent;
    margin-bottom: 160px;
    .questionItem{
      font-size: 20px;
      font-weight: bold;
      color: var(--text-color1);
      &:hover{
        background-color: var(--hover-bg-color);
      }
      span{
        i{
          color: var(--icon-color3);
          margin-right: 20px;
        }
        color: var(--text-color1);
      }
      p{
        font-weight: 400;
        margin: 0;
        padding: 0 30px 32px 50px;
        line-height: 1.5;
        display: inline-block;
        position: relative;
        i{
          position: absolute;
          left: 12px;
          top: 8px;
          color: var(--primary-color);
        }
      }
    }
  }
  .tryCard{
    background: var(--bg-color1);
    padding: 57px 85px 48px 100px;
    box-shadow: 0 4px 16px 0 rgba(4,38,104,0.1), inset 0 0 18px 8px #FFFFFF;
    border-radius: var(--border-radius-base);
    .leftBox{
      display: flex;
      align-items: center;
    }
    span{
      font-size: 40px;
      font-weight: bold;
      line-height: 47px;
      margin-bottom: 80px;
      .active{
        color: var(--primary-color);
      }
    }
    .tryBtn, .priceBtn{
      padding: 20px 30px;
      font-size: 20px;
      font-weight: bold;
      height: auto;
      border-radius: 6px;
    }
    .tryBtn{
      margin-right: 30px;
    }
  }
}

@keyframes scrollBanner {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
@keyframes scrollBanner2 {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(-100%);
  }
}
@keyframes scrollBanner3 {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
@keyframes scrollBanner4 {
  0% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>

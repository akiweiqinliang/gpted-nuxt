<template>
<div>
  <BackTop :height="100" :bottom="200">
    <div class="backTop"><Icon type="md-skip-backward" /></div>
  </BackTop>
  <div class="bgImage"></div>
  <div class="container">
    <div class="topHeader">
      <h1>{{ blog.title }}</h1>
    </div>
    <h2 class="author">Viraj Mahajan</h2>
    <Row justify="space-between" align="middle">
      <span class="viewCount"><Icon type="ios-flame-outline" /> {{ blog.viewCount }}</span>
      <ul class="shareList">
        <li
          v-for="platform in sharingPlatforms"
          :key="`share-platform-${platform.id}`"
          @click="handleShare(platform.id)"
        >
          <img :src="require(`~/assets/imgs/blog/${platform.imgName}@2x.png`)"  alt="x">
          <span>{{ platform.name }}</span>
        </li>
      </ul>
    </Row>
    <Row class="blogContent">
      <pre>
        {{ blog.content }}
      </pre>
    </Row>
    <Divider/>
    <Row>
      <h2 class="relatedBlogsTitle">{{ $t('relatedBlogs') }}</h2>
      <ul class="blogArticleList">
        <li
          v-for="article in relatedBlogs"
          :key="article.id"
          class="blogArticleItem"
          @click="toBlogDetailPageById(article.id)"
        >
          <div class="blogImageBox">
            <!--              <img src="">-->
            image box
          </div>
          <div class="blogTextBox">
            <div class="blogTitle">{{ article.title }}</div>
            <Row>
              <span><Icon type="ios-flame-outline" />{{ article.viewCount }}</span>
            </Row>
          </div>
        </li>
      </ul>
    </Row>
  </div>
</div>
</template>

<script>
import pageCode from "~/enums/pageCodes";
export default {
  name: "BlogDetail",
  layout: 'resource',
  async asyncData({ $axios, params }) {
    // const res = $axios.get(`/getBlogById`, {
    //   params: {
    //     tenderId: params.id,
    //   }
    // });
    const blogs = [
      {
        id: 0,
        imgUrl: '~assets/test.png',
        title: 'A Comprehensive Guide to Tendering Processes: From Preparation to Winning',
        content: `The Commonwealth of Australia, abbreviated as "Australia",has its capital Canberra and a per capita GDP of 65543 US dollars in 2022. [20] Located between the South Pacific and Indian Oceans, it consists of islands such

         as the Australian mainland, Tasmania, and overseas territories. To the east lies the Coral Sea and Tasman Sea in the

          Pacific Ocean, while to the north, west, and south lies the Indian Ocean and its marginal seas. The total area is 7688200 square kilometers, and the coastline is 36735 kilometers long. The northern region has a tropical climate, while

          the majority has a temperate climate. The country is divided into 6 states and 2 regions. As of September 2023, the total population of Australia is 26.82 million, with 51.1% being of British and Irish descent. The official language is English, and approximately 43.9% of residents believe in Christianity. The other five major religions are Islam, Hinduism, Buddhism, Sikhism, and Judaism. 38.9% of the population have no religious beliefs or unknown religious beliefs. The earliest inhabitants of Australia were Indigenous Australians. In 1770, British navigator James Cook arrived on the east coast of Australia and declared that Britain occupied this land. On January 26, 1788, Britain began establishing colonies in Australia, which was later designated as Australia Day. In July 1900, the British Parliament passed the "Australian Federal Constitution" and the "British Dominion Ordinance". On January 1, 1901, the various colonies in Australia were converted into states, and in October of the same year, the Commonwealth of Australia was established. In 1931, Australia became an independent country within the Commonwealth. Australia is a developed modern industrial country, the most economically developed country in the southern hemisphere, the fourth largest exporter of agricultural products in the world, and also an important producer and exporter of mineral products in the world. Agriculture, animal husbandry, and mining are traditional industries, while manufacturing and high-tech industries are developing rapidly. The service industry has become the leading industry in the national economy. With the development of foreign trade, the economy has maintained rapid growth. Australia has a stable social environment and a regulated financial system. In the 2021/2022 fiscal year, Australia's GDP was AUD 2.1 trillion.`,
        viewCount: 54322
      },
      {
        id: 1,
        imgUrl: '~assets/test.png',
        title: 'This is the title of this article This is the',
        content: `The Commonwealth of Australia, abbreviated as "Australia",has its capital Canberra and a per capita GDP of 65543 US dollars in 2022. [20] Located between the South Pacific and Indian Oceans, it consists of islands such

         as the Australian mainland, Tasmania, and overseas territories. To the east lies the Coral Sea and Tasman Sea in the

          Pacific Ocean, while to the north, west, and south lies the Indian Ocean and its marginal seas. The total area is 7688200 square kilometers, and the coastline is 36735 kilometers long. The northern region has a tropical climate, while

          the majority has a temperate climate. The country is divided into 6 states and 2 regions. As of September 2023, the total population of Australia is 26.82 million, with 51.1% being of British and Irish descent. The official language is English, and approximately 43.9% of residents believe in Christianity. The other five major religions are Islam, Hinduism, Buddhism, Sikhism, and Judaism. 38.9% of the population have no religious beliefs or unknown religious beliefs. The earliest inhabitants of Australia were Indigenous Australians. In 1770, British navigator James Cook arrived on the east coast of Australia and declared that Britain occupied this land. On January 26, 1788, Britain began establishing colonies in Australia, which was later designated as Australia Day. In July 1900, the British Parliament passed the "Australian Federal Constitution" and the "British Dominion Ordinance". On January 1, 1901, the various colonies in Australia were converted into states, and in October of the same year, the Commonwealth of Australia was established. In 1931, Australia became an independent country within the Commonwealth. Australia is a developed modern industrial country, the most economically developed country in the southern hemisphere, the fourth largest exporter of agricultural products in the world, and also an important producer and exporter of mineral products in the world. Agriculture, animal husbandry, and mining are traditional industries, while manufacturing and high-tech industries are developing rapidly. The service industry has become the leading industry in the national economy. With the development of foreign trade, the economy has maintained rapid growth. Australia has a stable social environment and a regulated financial system. In the 2021/2022 fiscal year, Australia's GDP was AUD 2.1 trillion.`,
        viewCount: 54322
      },
      {
        id: 2,
        imgUrl: '~assets/test.png',
        title: 'A Comprehensive Guide to Tendering Processes: From Preparation to Winning',
        content: `The Commonwealth of Australia, abbreviated as "Australia",has its capital Canberra and a per capita GDP of 65543 US dollars in 2022. [20] Located between the South Pacific and Indian Oceans, it consists of islands such

         as the Australian mainland, Tasmania, and overseas territories. To the east lies the Coral Sea and Tasman Sea in the

          Pacific Ocean, while to the north, west, and south lies the Indian Ocean and its marginal seas. The total area is 7688200 square kilometers, and the coastline is 36735 kilometers long. The northern region has a tropical climate, while

          the majority has a temperate climate. The country is divided into 6 states and 2 regions. As of September 2023, the total population of Australia is 26.82 million, with 51.1% being of British and Irish descent. The official language is English, and approximately 43.9% of residents believe in Christianity. The other five major religions are Islam, Hinduism, Buddhism, Sikhism, and Judaism. 38.9% of the population have no religious beliefs or unknown religious beliefs. The earliest inhabitants of Australia were Indigenous Australians. In 1770, British navigator James Cook arrived on the east coast of Australia and declared that Britain occupied this land. On January 26, 1788, Britain began establishing colonies in Australia, which was later designated as Australia Day. In July 1900, the British Parliament passed the "Australian Federal Constitution" and the "British Dominion Ordinance". On January 1, 1901, the various colonies in Australia were converted into states, and in October of the same year, the Commonwealth of Australia was established. In 1931, Australia became an independent country within the Commonwealth. Australia is a developed modern industrial country, the most economically developed country in the southern hemisphere, the fourth largest exporter of agricultural products in the world, and also an important producer and exporter of mineral products in the world. Agriculture, animal husbandry, and mining are traditional industries, while manufacturing and high-tech industries are developing rapidly. The service industry has become the leading industry in the national economy. With the development of foreign trade, the economy has maintained rapid growth. Australia has a stable social environment and a regulated financial system. In the 2021/2022 fiscal year, Australia's GDP was AUD 2.1 trillion.`,
        viewCount: 54322
      },
      {
        id: 3,
        imgUrl: '~assets/test.png',
        title: 'This is the title of this article This is the title of this article This is the title of this article This is the title of this article This is the title of this article',
        content: `The Commonwealth of Australia, abbreviated as "Australia",has its capital Canberra and a per capita GDP of 65543 US dollars in 2022. [20] Located between the South Pacific and Indian Oceans, it consists of islands such

         as the Australian mainland, Tasmania, and overseas territories. To the east lies the Coral Sea and Tasman Sea in the

          Pacific Ocean, while to the north, west, and south lies the Indian Ocean and its marginal seas. The total area is 7688200 square kilometers, and the coastline is 36735 kilometers long. The northern region has a tropical climate, while

          the majority has a temperate climate. The country is divided into 6 states and 2 regions. As of September 2023, the total population of Australia is 26.82 million, with 51.1% being of British and Irish descent. The official language is English, and approximately 43.9% of residents believe in Christianity. The other five major religions are Islam, Hinduism, Buddhism, Sikhism, and Judaism. 38.9% of the population have no religious beliefs or unknown religious beliefs. The earliest inhabitants of Australia were Indigenous Australians. In 1770, British navigator James Cook arrived on the east coast of Australia and declared that Britain occupied this land. On January 26, 1788, Britain began establishing colonies in Australia, which was later designated as Australia Day. In July 1900, the British Parliament passed the "Australian Federal Constitution" and the "British Dominion Ordinance". On January 1, 1901, the various colonies in Australia were converted into states, and in October of the same year, the Commonwealth of Australia was established. In 1931, Australia became an independent country within the Commonwealth. Australia is a developed modern industrial country, the most economically developed country in the southern hemisphere, the fourth largest exporter of agricultural products in the world, and also an important producer and exporter of mineral products in the world. Agriculture, animal husbandry, and mining are traditional industries, while manufacturing and high-tech industries are developing rapidly. The service industry has become the leading industry in the national economy. With the development of foreign trade, the economy has maintained rapid growth. Australia has a stable social environment and a regulated financial system. In the 2021/2022 fiscal year, Australia's GDP was AUD 2.1 trillion.`,
        viewCount: 54322
      },
    ]
    const getBlogById = (id) => {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line nuxt/no-timing-in-fetch-data
        setTimeout(() => {
          resolve({ data: blogs.find(item => item.id === Number(id)) })
        }, 300)
      })
    }
    const getRelatedBlogs = () => {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line nuxt/no-timing-in-fetch-data
        setTimeout(() => {
          resolve({ data: blogs.slice(0,4) })
        }, 300)
      })
    }
    const res = await getBlogById(params.id)
    const res2 = await getRelatedBlogs()
    const blog = res.data
    const relatedBlogs = res2.data
    return {
     blog,
      relatedBlogs
    }
  },
  data() {
    return {
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
      ]
    }
  },
  head() {
    return {
      title: this.blog.title || this.$route.name,
      meta: [
        { hid: 'description', name: 'description', content: this.blog.content.slice(0, 150) || 'Default description' },
        { hid: 'keywords', name: 'keywords', content: this.blog.title ? `${this.blog.title}, Tendering, Business` : 'Default keywords' },
        { property: 'og:title', content: this.blog.title || 'Default Title' },
        { property: 'og:description', content: this.blog.content.slice(0, 150) || 'Default description' },
        { property: 'og:type', content: 'article' }
      ]
    }
  },
  methods: {
    getArticleInfo() {
      return {
        title: document.title, // 文章标题
        url: window.location.href, // 当前页面链接
        summary: document.querySelector('meta[name="description"]')?.content || '', // 页面摘要（从 meta 标签获取）
      }
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
    toBlogDetailPageById(blogId) {
      const url = this.$router.resolve({
        name: pageCode.RESOURCE_BLOGS_ID,
        params: { id: blogId }
      }).href;
      window.open(url, '_blank');
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
.ivu-modal-confirm-head-icon-confirm{
  display: none;
}
.bgImage{
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 336px;
  background: linear-gradient( 180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%), rgba(30,107,255,0.14);
}
.container{
  position: relative;
  z-index: 2;
  margin: 0 auto;
  width: calc(100% - 200px);
  max-width: var(--max-width);
  .topHeader{
    padding-top: 80px;
    margin-bottom: 66px;
  }
  .author{
    font-size: 30px;
    color: #566685;
  }
}
.viewCount{
  color: #B0B7BF;
  font-size: 18px;
  display: flex;
  align-items: center;
  i{
    margin-right: 8px;
  }
}
.shareList{
  display: flex;
  li{
    cursor: pointer;
    padding: 8px;
    border: 1px solid #B7CAED;
    border-radius: 6px;
    display: flex;
    align-items: center;
    margin-left: 12px;
    img{
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
}
.blogContent{
  margin: 60px 0 100px;
  pre{
    white-space: pre-line;
    line-height: 1.5;
  }
}
.relatedBlogsTitle{
  margin: 36px auto 40px;
  display: block;
  font-size: 32px;
  color: #1F3256;
}
.blogArticleList{
  column-count: 4; /* 3列布局 */
  column-gap: 20px;
  width: 100%;
  margin-top: 20px;
  .blogArticleItem{
    background: #fff;
    border-radius: 20px;
    border: 1px solid var(--border-color);
    width: 100%;
    margin-bottom: 20px;
    break-inside: avoid; /* 防止分裂 */
    overflow: hidden;
    .blogImageBox{
      background: #1E6BFF;
      height: 165px;
    }
    .blogTextBox{
      padding: 24px;
      .blogTitle{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 30px;
      }
      span{
        display: flex;
        align-items: center;
        font-size: 14px;
        color: var(--text-color3);
      }
    }
  }
}
</style>

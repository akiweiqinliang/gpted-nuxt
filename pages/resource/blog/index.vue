<template>
  <div>
    <nuxt/>
  <div v-if="$route.name === pageCode.RESOURCE_BLOG">
    <BackTop :height="100" :bottom="200">
      <div class="backTop"><Icon type="md-skip-backward" /></div>
    </BackTop>
    <div class="bgImage"></div>
    <div class="container">
      <Row class="topHeader">
        <div class="left">
          <h1>{{$t('blog')}}</h1>
          <span>{{ $t('blog_desc') }}</span>
        </div>
        <div class="imgBox">
          <img src="~assets/test.png" alt="">
        </div>
      </Row>
      <Row>
        <Col :span="6">
          <div class="sideMenu">
          <Input suffix="ios-search" :placeholder="$t('search')" class="selectInput" />
            <h4>{{ $t('blog_categories') }}</h4>
            <ul>
              <li
                v-for="(category, idx) in $t('blog_categories_list')"
                :key="`blog-category-${idx}`"
                :class="{'active' : activeCategoryIndex === idx}"
                @click="handleSelectBlogCategoryByIndex(idx)">
                {{ category }}
              </li>
            </ul>
        </div>
        </Col>
        <Col :span="18">
          <ul class="blogArticleList">
            <li
              v-for="article in showData"
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
        </Col>
      </Row>
    </div>
  </div>
  </div>
</template>

<script>
import pageCode from "~/enums/pageCodes";

export default {
  name: "Blog",
  layout: 'resource',
  data() {
    return {
      activeCategoryIndex: 0,
      showData: [],
      blogData: [
        {
          id: 0,
          imgUrl: '~assets/test.png',
          title: 'A Comprehensive Guide to Tendering Processes: From Preparation to Winning',
          viewCount: '54322'
        },
        {
          id: 1,
          imgUrl: '~assets/test.png',
          title: 'This is the title of this article This is the',
          viewCount: '54322'
        },
        {
          id: 2,
          imgUrl: '~assets/test.png',
          title: 'A Comprehensive Guide to Tendering Processes: From Preparation to Winning',
          viewCount: '54322'
        },
        {
          id: 3,
          imgUrl: '~assets/test.png',
          title: 'This is the title of this article This is the title of this article This is the title of this article This is the title of this article This is the title of this article',
          viewCount: '54322'
        },
        {
          id: 4,
          imgUrl: '~assets/test.png',
          title: 'A Comprehensive Guide to Tendering Processes: From Preparation to Winning',
          viewCount: '54322'
        },
        {
          id: 5,
          imgUrl: '~assets/test.png',
          title: 'This is the title of this article This is the',
          viewCount: '54322'
        },
        {
          id: 6,
          imgUrl: '~assets/test.png',
          title: 'A Comprehensive Guide to Tendering Processes: From Preparation to Winning',
          viewCount: '54322'
        },
        {
          id: 7,
          imgUrl: '~assets/test.png',
          title: 'This is the title of this article This is the',
          viewCount: '54322'
        },
      ]
    }
  },
  computed: {
    pageCode() {
      return pageCode
    },
  },
  mounted() {
    this.showData = this.blogData;
  },
  methods: {
    handleSelectBlogCategoryByIndex(idx) {
      this.activeCategoryIndex = idx;
      // todo 修改
      if (idx === 0) {
        this.showData = this.blogData;
        return;
      }
      this.showData = this.blogData.filter(item => item.id <= idx);
    },
    toBlogDetailPageById(blogId) {
      // this.$router.push({
      //   name: pageCode.RESOURCE_BLOG_ID,
      //   params: { id: blogId },
      // })
      const url = this.$router.resolve({
        // name: pageCode.RESOURCE_BLOGS_ID,
        name: pageCode.RESOURCE_BLOG_ID,
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
}
.topHeader{
  display: flex;
  justify-content: space-between;
  padding-top: 60px;
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
    margin: 20px 0;
    font-size: 16px;
  }
  .selectInput{
    margin-top: 20px;
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
      &:hover{
        color: var(--primary-color);
      }
    }
  }
}
.blogArticleList{
  column-count: 3; /* 3列布局 */
  column-gap: 20px;
  width: 100%;
  margin-top: 20px;
 .blogArticleItem{
   //border-radius: 20px;
   //border: 1px solid var(--border-color);
   //width: calc(100% / 3 - 40px);
   //margin: 0 20px;
   background: #fff;
   border-radius: 20px;
   border: 1px solid var(--border-color);
   //display: inline-block; /* 让元素适应 column 布局 */
   width: 100%;
   margin-bottom: 20px;
   //padding: 15px;
   //box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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

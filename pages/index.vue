<template>
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
</template>

<script>
import pageCode from "~/enums/pageCodes";

export default {
  name: 'IndexPage',
  computed: {
    pageCode() {
      return pageCode
    }
  },

}
</script>

<style lang="scss" scoped>
.home1{
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
      &:nth-last-child(1){
        margin-right: 0;
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

</style>

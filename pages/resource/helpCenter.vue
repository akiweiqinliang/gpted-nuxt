<template>
<div id="helpCenterPage">
  <BackTop :height="100" :bottom="200">
    <div class="backTop"><Icon type="md-skip-backward" /></div>
  </BackTop>
  <div class="bgImage"></div>
  <div class="container">
    <Row class="topHeader">
      <div class="left">
        <h1>{{$t('helpCenter')}}</h1>
        <p>{{ $t('helpCenter_desc') }}</p>
      </div>
      <div class="imgBox">
        <img src="~assets/test.png" alt="">
      </div>
    </Row>
    <Row>
      <Col :span="6" class="leftContent">
          <div class="sideMenu">
            <Input suffix="ios-search" :placeholder="$t('search')" class="selectInput" />
            <ul>
              <li
                v-for="(item, idx) in helpCenterDataList"
                :key="`helpCenter-${item.id}-${idx}`"
                :class="{'active' : item.id === currentItemId}"
                @click="handleSelectById(item.id)">
                {{item.title}}
              </li>
            </ul>
          </div>
      </Col>
      <Col :span="18">
        <Row>
<!--          <h2>{{ currentObj.title }}</h2>-->
        </Row>
        <Row class="commonProblem">
          <Col span="24">
            <div class="titleContainer">
              <h2>{{ currentObj.title }}</h2>
<!--              <span>{{$t('member_frequentlyAskedQuestions')}}</span>-->
            </div>
            <Collapse simple class="problemList" accordion>
              <Panel
                v-for="(item, index) in currentObj.contents"
                :key="`commonProblem-${index}`"
                :name="item.title"
                class="aaa"
              >
                <span>{{ item.title }}</span>
                <p slot="content">{{ item.content }}</p>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>

</div>
</template>

<script>
import {helpCenterDataList} from "~/enums/mockData";
export default {
  name: "HelpCenter",
  layout: 'resource',
  data() {
    return {
      helpCenterDataList,
      currentItemId: helpCenterDataList[0].id,
    }
  },
  computed: {
    currentObj() {
      return this.helpCenterDataList[this.currentItemId]
    }
  },
  methods: {
    handleSelectById(id) {
      this.currentItemId = id
    }
  }
}
</script>

<style scoped lang="scss">
.topHeader{
  .left{}
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
  //background: linear-gradient( 180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%), #fff9f2;
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
.leftContent{
  padding-right: 50px;
}
.sideMenu {
  height: 100%;
  display: flex;
  flex-direction: column;
  .selectInput{
  }
  ul {
    flex: 1;
    margin: 20px 0;
    border-right: 1px solid var(--border-color);
    .active {
      color: var(--primary-color);
      position: relative;
      &::after{
        content: '';
        position: absolute;
        width: 4px;
        height: 100%;
        background: var(--primary-color);
        right: -1px;
        top: 0;
      }
    }

    li {
      font-weight: bold;
      color: var(--text-color2);
      padding: 10px 0;
      margin-bottom: 3px;
      cursor: pointer;
      &:hover {
        color: var(--primary-color);
      }
    }
  }
}
.commonProblem{
  .titleContainer{
    padding-left: 30px;
    h2{
      font-size: 32px;
    }
  }
  .problemList{
    background: transparent;
    .ivu-collapse-content{
      background: transparent;
    }
  }
}
.aaa{
  //border: 0;
}
</style>
<style lang="scss">
#helpCenterPage{
  .ivu-collapse{
    border: 0;
  }
  .ivu-collapse-content{
    background: transparent;
  }
  .ivu-collapse-header{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    padding: 44px 30px;
    font-size: 20px;
    color: var(--text-color1);
    i{
      font-size: 28px;
      color: var(--text-color3);
    }
  }
  .ivu-collapse-content{
    padding: 0 30px 44px;
    font-size: 18px;
  }
  .ivu-collapse-content-box{
    padding: 0;
  }
}
</style>

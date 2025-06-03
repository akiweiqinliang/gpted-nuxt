<template>
  <div>
    <CommonCard class="card">
      <template #title>
        Work briefing
      </template>
      <template #action>
        <div class="dateTime">
          2025-03-14 - 2025-03-14
        </div>
      </template>
      <template #content>
        <div class="firstCard">
          <div v-for="item in firstCardOptions" :key="item.title" class="option" :class="item.color">
            <div class="iconBox">
              <Icon :type="item.icon" />
            </div>
            <div class="textBox">
              <p>{{ item.title }}</p>
              <p class="number">{{ item.number }}</p>
            </div>
          </div>
        </div>
      </template>
    </CommonCard>
    <CommonCard class="card">
      <template #title>
        Message notification
      </template>
      <template #content>
        <div class="secondCard">
          <div v-for="(item, idx) in secondCardOptions" :key="`text-${idx}`" class="textBox">
            <svg t="1748328546098" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9254" width="48" height="48"><path d="M145.109 873.435l334.744-265.387 133.539 142.032c0 0 55.744 15.19 59.175-26.999l-3.432-143.776 197.831-228.207 86.174-5.006c0 0 67.611-13.614 18.618-72.729l-241.763-243.395c0 0-65.868-8.439-60.861 52.369v65.926l-224.776 191.137-138.6 8.381c0 0-50.736 16.875-32.176 60.864l130.218 128.476-258.694 336.319z" fill="var(--primary-color)" p-id="9255"></path></svg>
            <span v-dompurify-html="item"></span>
          </div>
        </div>
      </template>
    </CommonCard>
    <WorldMap />
    <!--  <CommonCard>-->
    <!--    <template #title>-->
    <!--      Subscription data-->
    <!--    </template>-->
    <!--    <template #action>-->
    <!--      <span class="guideBtn"><Icon type="ios-help-circle-outline" /> view guide</span>-->
    <!--    </template>-->
    <!--    <template #content>-->
    <!--      <div class="thirdCard">-->
    <!--        <Row justify="space-between">-->
    <!--        <div v-for="thirdItem in thirdCardOptions" :key="thirdItem.title" class="option" :class="thirdItem.color">-->
    <!--          <div class="iconBox">-->
    <!--            <Icon :type="thirdItem.icon" />-->
    <!--          </div>-->
    <!--          <div class="textBox">-->
    <!--            <p class="number">{{ thirdItem.number }}</p>-->
    <!--            <p>{{ thirdItem.title }}</p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        </Row>-->
    <!--          <WorldMap class="map" />-->

    <!--&lt;!&ndash;        第一版&ndash;&gt;-->
    <!--&lt;!&ndash;        <WorldMap1 class="map" />&ndash;&gt;-->
    <!--      </div>-->
    <!--    </template>-->
    <!--  </CommonCard>-->
  </div>
</template>

<script>
import CommonCard from "~/components/tenderDetail/CommonCard.vue";
import WorldMap from "~/components/dashboard/WorldMap.vue";
// import WorldMap1 from "~/components/dashboard/WorldMap1.vue";
export default {
  name: "Index",
  components: {
    // WorldMap1,
    WorldMap, CommonCard },
  layout: 'dashboard',
  data() {
    return {
      firstCardOptions: [
        {
          icon: 'ios-checkmark',
          title: 'Bidding viewed',
          number: 12,
          color: 'green'
        },
        {
          icon: 'ios-time',
          title: 'Bidding in progress',
          number: 5,
          color: 'yellow'
        },
        {
          icon: 'ios-trophy',
          title: 'Bidding won',
          number: 3,
          color: 'red'
        },
        {
          icon: 'ios-close',
          title: 'Bidding lost',
          number: 2,
          color: 'blue'
        }
      ],
      secondCardOptions: [
        `Your subscription has <span class="dashboardLight">121</span> new messages not seen.`,
        `There is a new status of your collection.`
      ],
      thirdCardOptions: [
        {
          icon: 'ios-checkmark',
          title: 'Bidding viewed',
          number: 12,
          color: 'green'
        },
        {
          icon: 'ios-time',
          title: 'Bidding in progress',
          number: 5,
          color: 'yellow'
        },
        {
          icon: 'ios-close',
          title: 'Bidding lost',
          number: 2,
          color: 'blue'
        }
      ],
    }
  }
}
</script>

<style scoped lang="scss">
.green{
  .iconBox {
    background-color: #F6FFEE; // Green
  }
  .textBox {
    .number {
      color: #57C22D;
    }
  }
}
.yellow{
  .iconBox {
    background-color: #FFFDEE; // Yellow
  }
  .textBox {
    .number {
      color: #FFB803; // Yellow text
    }
  }
}
.red{
  .iconBox {
    background-color: #FFF1F0; // Red
  }
  .textBox {
    .number {
      color: #FD5F62; // Red text
    }
  }
}
.blue{
  .iconBox {
    background-color: #EAF6FF; // Blue
  }
  .textBox {
    .number {
      color: #1E6BFF; // Blue text
    }
  }
}
.card{
  margin-bottom: 20px;
}
.dateTime{
  color: var(--text-color3);
  padding: 0 10px;
  border: 1px solid var(--border-color);
  border-radius: 60px;
}
.firstCard{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 30px;

  .option {
    display: flex;
    align-items: center;
    width: 25%;
    padding-right: 10px;
    .iconBox {
      width: 68px;
      height: 68px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 16px;
    }
    .textBox{
      width: calc(100% - 84px);
      p:nth-child(1) {
        margin: 0;
        color: var(--text-color2);
        font-weight: bold;
      }
      .number {
        font-size: 26px;
        font-weight: bold;
      }
    }
  }
}

.secondCard{
  padding: 20px;
  .icon{
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
  .textBox{
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
}
.guideBtn{
  color: var(--primary-color);
  cursor: pointer;
}
.thirdCard{
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px 40px;
  .option {
    display: flex;
    align-items: center;
    width: calc(100% / 3 - 14px);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    padding: 20px;
    border-radius: 10px;
    .iconBox {
      width: 68px;
      height: 68px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 30px;
    }
    .textBox{
      width: calc(100% - 98px);
      p:nth-child(2) {
        margin: 0;
        color: var(--text-color3);
      }
      .number {
        font-size: 26px;
        font-weight: bold;
      }
    }
  }
  .map{
    margin-top: 54px;
  }
}
</style>
<style>
.dashboardLight{
  color: var(--primary-color);
}
</style>

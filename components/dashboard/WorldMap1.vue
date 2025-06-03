<template>
  <div class="hello">
    <div>
      <div style="width: 100%;display: flex; position: relative;">
          <div v-if="intoContinent" class="breadcrumb">
            <span class="clickBtn" @click="back">全球</span> /
            <span class="bold">{{ continent }}地区</span>
          </div>

        <div ref="worldDataMap" style="padding: 0;"></div>

<!--        右侧数据-->
        <div class="rightBox">
          <div class="firstPart">
          <div class="title">
            <svg t="1748334067160" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6808" width="48" height="48">
              <path d="M665.6 204.8H358.4c-84.48 0-153.6 69.12-153.6 153.6v307.2c0 84.48 69.12 153.6 153.6 153.6h307.2c84.48 0 153.6-69.12 153.6-153.6V358.4c0-84.48-69.12-153.6-153.6-153.6z" fill="#CCDAFF" p-id="6809"></path>
              <path d="M396.8 673.28c0 12.8-10.24 23.04-23.04 23.04s-23.04-10.24-23.04-23.04v-199.68c0-12.8 10.24-23.04 23.04-23.04s23.04 10.24 23.04 23.04v199.68zM535.04 673.28c0 12.8-10.24 23.04-23.04 23.04s-23.04-10.24-23.04-23.04v-322.56c0-12.8 10.24-23.04 23.04-23.04s23.04 10.24 23.04 23.04v322.56zM673.28 673.28c0 12.8-10.24 23.04-23.04 23.04s-23.04-10.24-23.04-23.04v-76.8c0-12.8 10.24-23.04 23.04-23.04s23.04 10.24 23.04 23.04v76.8z" fill="#7A7AF9" p-id="6810"></path>
            </svg>
            <span>Data ranking</span>
          </div>
          <Select v-if="!intoContinent" v-model="selectBarType" style="width: 110px"  @on-change="handleSelectBarType">
            <Option value="0" label="By country"></Option>
            <Option value="1" label="By continent"></Option>
          </Select>
          </div>
          <div class="secondPart">
            <ul class="barDataBox">
              <li v-for="(dataItem, idx) in showData" :key="`showData-${idx}`" class="barDataItem">
                <Row justify="space-between">
                  <span>{{ dataItem.number }} {{ dataItem.name }}</span>
<!--                  <span class="dataNumber">{{ dataItem.value.toLocaleString() }}</span>-->
                  <span class="dataNumber">{{ dataItem.value | numberWithComma }}</span>
                </Row>
<!--                todo 瞎写的百分比-->
                <Progress :percent="dataItem.value / 450" :stroke-width="5" :hide-info="true" class="worldMapBarProgress"/>
              </li>
            </ul>
            <Row type="flex" justify="center">
            <Page :current="currentPage" :total="allData.length" simple :page-size="pageSize" @on-change="handlePageChange"/>
            </Row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import worldMap from '@/assets/map/world-continents.geo.json';

import asiaMap from '@/assets/map/asia.geo.json';
import africaMap from '@/assets/map/africa.geo.json';
import europeMap from '@/assets/map/europe.geo.json';
import oceaniaMap from '@/assets/map/oceania.geo.json';
import northAmericaMap from '@/assets/map/north-america.geo.json';
import southAmericaMap from '@/assets/map/south-america.geo.json';
import { CountryMap, AreaMap } from '@/assets/map/langMap/map-zh'
export default {
  name: 'WorldMap1',
  filters: {
    numberWithComma(val) {
      if (val == null) return '';
      return val.toLocaleString();
      // return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 4,
      selectBarType: '0',
      mapChart: null,
      // barChart: null,
      resizeTimer: null,
      // mock
      showData: [],
      rootData: [],
      continentMaps: {},

      worldData: [
        { name: '亚洲', value: 21000 }, { name: '欧洲', value: 2111 },
        { name: '北美洲', value: 31111 }, { name: '非洲', value: 11511 },
        { name: '大洋洲', value: 1111 }, { name: '南美洲', value: 1111 },
      ],
      worldCountriesBidCount: [
        { name: '中国', value: 41200 },
        { name: '美国', value: 12980 },
        { name: '德国', value: 32600 },
        { name: '印度', value: 14750 },
        { name: '英国', value: 21520 },
        { name: '法国', value: 20490 },
        { name: '俄罗斯', value: 10430 },
        { name: '日本', value: 12620 },
        { name: '巴西', value: 15380 },
        { name: '南非', value: 8210 },
        { name: '加拿大', value: 17330 },
        { name: '澳大利亚', value: 34310 },
        { name: '阿联酋', value: 18290 },
        { name: '新加坡', value: 9270 },
        { name: '墨西哥', value: 6190 },
        { name: '沙特阿拉伯', value: 5260 },
        { name: '尼日利亚', value: 4170 },
        { name: '埃及', value: 3160 },
        { name: '印度尼西亚', value: 2200 },
        { name: '阿根廷', value: 1150 },
        { name: '俄罗斯', value: 12111 },
        { name: '蒙古', value: 2111 }, { name: '伊朗', value: 3111 },
        { name: '哈萨克斯坦', value: 21111 },
        { name: '印度尼西亚', value: 8111 },
        { name: '韩国', value: 11511 }, { name: '泰国', value: 1111 },
        { name: '马来西亚', value: 1111 },
        { name: '格陵兰', value: 2111 }, { name: '墨西哥', value: 3111 },
        { name: '尼加拉瓜', value: 13111 }, { name: '古巴', value: 21111 },
      ],
      asiaData: [
        { name: '俄罗斯', value: 12111 }, { name: '中国', value: 41111 },
        { name: '蒙古', value: 2111 }, { name: '伊朗', value: 3111 },
        { name: '印度', value: 32111 }, { name: '哈萨克斯坦', value: 21111 },
        { name: '印度尼西亚', value: 21111 }, { name: '日本', value: 31111 },
        { name: '韩国', value: 11511 }, { name: '泰国', value: 1111 },
        { name: '马来西亚', value: 1111 },
      ],
      northAmericaData: [
        { name: '美国', value: 12111 }, { name: '加拿大', value: 41111 },
        { name: '格陵兰', value: 2111 }, { name: '墨西哥', value: 3111 },
        { name: '尼加拉瓜', value: 42111 }, { name: '古巴', value: 21111 },
      ],
      intoContinent: false, // 是否进入洲级
      continent: null, // 当前所在洲
      currentCountry: null, // 当前所在国
    }
  },
  computed: {
    allData() {
      return [...this.rootData]
        .sort((a, b) => b.value - a.value)
        .map((item, index) => ({ ...item, number: index + 1 }));
    },
  },
  created() {
    this.initContinentMaps();
  },
  mounted() {
    // axios获取世界数据
    this.rootData = this.worldCountriesBidCount;
    this.showData = this.allData.slice(0, this.pageSize); // 默认显示前4条数据
    // 注册世界地图
    this.initCharts()
    // 监听窗口大小改变事件
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    // 移除窗口大小改变事件监听器
    window.removeEventListener('resize', this.handleResize);
    clearTimeout(this.resizeTimer);
    // 销毁图表实例
    if (this.mapChart) {
      this.mapChart.dispose();
    }
  },
  methods: {
    initContinentMaps() {
      this.continentMaps = {
        '亚洲': {
          map: asiaMap,
          data: this.asiaData
        },
        '北美洲': {
          map: northAmericaMap,
          data: this.northAmericaData
        },
        '南美洲': {
          map: southAmericaMap,
          data: this.northAmericaData
        },
        '非洲': {
          map: africaMap,
          data: this.northAmericaData
        },
        '欧洲': {
          map: europeMap,
          data: this.northAmericaData
        },
        '大洋洲': {
          map: oceaniaMap,
          data: this.northAmericaData
        }
      };
    },
    handleResize() {
      clearTimeout(this.resizeTimer); // 清除之前的延迟计时器
      // 在延迟时间后调用 resize() 方法
      this.resizeTimer = setTimeout(() => {
        // 重新计算 mapChart 的宽度 设置新的宽度并调用 resize() 方法
        const newParentWidth = this.$refs.worldDataMap.parentNode.offsetWidth;
        this.mapChart.resize({ width: newParentWidth * 0.6 });
      }, 200); // 延迟时间可以根据实际情况进行调整
    },
    initCharts() {
      echarts.registerMap('world', worldMap); // 注册地图数据
      const parentWidth = this.$refs.worldDataMap.parentNode.offsetWidth;
      const mapChartWidth = parentWidth * 0.6;
      this.mapChart = echarts.init(this.$refs.worldDataMap, null, {
        width: mapChartWidth,
        height: 450,
      });
      this.mapChart.setOption(this.mapOptions('world', this.worldData));
      // 监听地图点击事件 下行代码放开即可点击进入洲级地图
      this.mapChart.on('click', this.handleMapClick);
    },
    handleSelectBarType(value) {
      // 根据选择的类型更新数据
      if (value === '0') {
        this.rootData = this.worldCountriesBidCount
      } else if (value === '1') {
        this.rootData = this.worldData
      }
      // 重置当前页为1
      this.currentPage = 1;
      this.showData = this.allData.slice(0, this.pageSize);
    },
    setBarDataBySelectMap(data) {
      // 根据选择的地图数据更新柱状图数据
      this.rootData = data;
      this.currentPage = 1; // 重置当前页为1
      this.showData = this.allData.slice(0, this.pageSize);
    },
    handlePageChange(page) {
      this.currentPage = page;
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.showData = this.allData.slice(startIndex, startIndex + this.pageSize);
    },
    back() {
      this.intoContinent = false
      //   回到世界地图
      this.mapChart.clear()
      echarts.registerMap('world', worldMap);
      this.mapChart.setOption(this.mapOptions('world', this.worldData))
      this.setBarDataBySelectMap(this.worldCountriesBidCount);
      this.selectBarType = '0'; // 重置柱状图类型选择
    },
    handleMapClick(params) {
      if (!params.name.includes('洲')) return
      this.intoContinent = true;
      this.continent = params.name;
      const continentName = params.name; // 获取点击的洲名
      // 根据点击的洲名更新数据排行榜
      this.updateMap(continentName, this.continentMaps[continentName].map, this.continentMaps[continentName].data);
    },
    updateMap( mapName, mapGeoJson, mapData) {
      // 更新地图和右边柱状图数据
      this.mapChart.clear()
      echarts.registerMap(mapName, mapGeoJson);
      this.mapChart.setOption(this.mapOptions(mapName, mapData));
      this.setBarDataBySelectMap(mapData);
    },

    mapOptions(params, data) {
      return {
        dataset: {
          source: data,
        },
        grid: {
          left: '10%',
          right: '10%',
          top: '10%',
          bottom: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item', // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
          axisPointer: {// 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: "transparent",
          formatter: (params) => {
            let str='';
            str ='<div style="width:100%;padding:8px 12px;font-size:13px;box-sizing:border-box;border-radius:4px;position:relative;background:rgba(255,255,255,0.8)">' +
                "<div style='display:flex;align-items:center;'>" +
                params.marker +
                params.name +
                "：" +
                this.$t('采购数量') +
                params.value +
                "</div>" +
                "</div>";
            return str
          }
        },
        visualMap: {
          // left: 'left',
          type: 'continuous', // 连续型映射
          orient: 'horizontal', // 关键参数：水平方向
          left: 'center',      // 水平居中
          bottom: 0,          // 底部定位
          itemWidth: 8,       // 控制滑块宽度
          itemHeight: 450,     // 控制滑块高度（横向时实际为长度）
          seriesIndex: 0,      // 关联的系列
          min: Math.min(...data.map(item => item.value)),
          max: Math.max(...data.map(item => item.value)),
          inRange: {
            color: [
              '#f6f3ff',
              '#1E6BFF'
            ]
          },
          textStyle:{color: '#666666'},
          text: ['most', 'least'],
          calculable: false
        },
        series: {
          type: 'map',
          map: params,
          coordinateSystem: 'customProjection',
          nameMap: params === 'world' ? AreaMap : CountryMap,
          // 其他
          silent: false,
          itemStyle: {
            borderColor: "transparent",
          },
          emphasis: {
            itemStyle: {
              // 高亮时点的颜色。
              areaColor: "#1E6BFF",
            },
            label: {
              show: true,
              // 高亮时标签的文字。
              // color: 'white'
            }
          },
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.hello{
  width: 100%;
}
.clickBtn{
  cursor: pointer;
}
.breadcrumb{
  margin: 10px;
  position: absolute;left: 0;top: 0; width: auto;height: 40px;z-index: 1;
  color: #666666;
  .bold{
    color: #333333;
    font-weight: bold;
  }
}

.rightBox{
  width: 100%;
  display: flex;
  flex-direction: column;
  .firstPart{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title{
      display: flex;
      align-items: center;
      span{
        font-weight: bold;
      }
    }
  }
  .secondPart{
    padding: 35px 30px 24px;
    background: #F6F6F6;
    border-radius: 8px 8px 8px 8px;
    margin-top: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .barDataBox{
      flex-grow: 1;
      .barDataItem{
        margin-bottom: 32px;
        .dataNumber{
          color: var(--primary-color);
        }
      }
    }
  }
}

</style>
<style>
.worldMapBarProgress .ivu-progress-outer .ivu-progress-inner{
  background: #ffffff;
}
</style>

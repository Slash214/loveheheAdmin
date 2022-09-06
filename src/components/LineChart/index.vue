<template>
  <div id="myEcharts" class="dom"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'
type EChartsOption = echarts.EChartsOption

let echart = echarts

const props = defineProps({
  xData: {
    type: Array<string>,
    default: () => [],
  },
  yData: {
    type: Array<number>,
    default: () => [],
  },
})

onMounted(() => {
  console.log(props)
  setTimeout(() => {
    initChart()
  }, 1000)
})

onMounted(() => {
  echart.dispose
})

const initChart = () => {
  let chart = echart.init(document.getElementById('myEcharts')!)

  chart.setOption({
    title: {
      text: '用户搜索关键字折线图',
      x: 'center'
    },
    xAxis: {
      type: 'category',
      data: props.xData,
    },
    tooltip: {
      trigger: 'axis',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: props.yData,
        type: 'line',
        smooth: false,
      },
    ],
  })

  window.onresize = () => {
    chart.resize()
  }
}
</script>

<style scoped>
.dom {
  width: 100%;
  height: 700px;
}
</style>

<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "progressChart",
  mounted() {
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: { show: false, min:0, max:100 },
      yAxis: { show: false, type: "category" },
      series: [
        {
          type: "bar",
          data: [78],
          barWidth:10,
          color:'yellowgreen',
          showBackground:true,
          backgroundStyle:{
            color:'#eee'
          },
          label:{
            show:true,
            position:'right',
            formatter:'|'
          }
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
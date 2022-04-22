<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <svg
        t="1650614340622"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1921"
        width="26"
        height="26"
      >
        <path
          d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z"
          p-id="1922"
          fill="#d9d9d9"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-title"> 1232 </span>
      <span class="main-content"> 17.1 </span>
      <svg
        t="1650614773214"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2854"
        width="16"
        height="16"
      >
        <path d="M325.456896 862.27968" p-id="2855" fill="#C73021"></path>
        <path d="M882.05824 862.27968" p-id="2856" fill="#C73021"></path>
        <path d="M236.027904 877.161472" p-id="2857" fill="#C73021"></path>
        <path d="M960.132096 877.161472" p-id="2858" fill="#C73021"></path>
        <path d="M64.134144 845.290496" p-id="2859" fill="#C73021"></path>
        <path
          d="M131.974144 648.752128c-30.418944 30.430208-6.474752 84.301824 34.917376 84.301824L858.258432 733.053952c42.899456 0 65.325056-53.85216 34.916352-84.301824L547.487744 302.569472c-19.930112-19.974144-49.374208-19.95264-69.327872 0L131.974144 648.752128z"
          p-id="2860"
          fill="#C73021"
        ></path>
        <path d="M960.51712 845.290496" p-id="2861" fill="#C73021"></path>
      </svg>
      <svg
        t="1650614866926"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3140"
        width="16"
        height="16"
      >
        <path d="M325.456896 862.27968" p-id="3141" fill="#bfbfbf"></path>
        <path d="M882.05824 862.27968" p-id="3142" fill="#bfbfbf"></path>
        <path d="M236.027904 877.161472" p-id="3143" fill="#bfbfbf"></path>
        <path d="M960.132096 877.161472" p-id="3144" fill="#bfbfbf"></path>
        <path d="M63.683584 788.737024" p-id="3145" fill="#bfbfbf"></path>
        <path d="M958.46912 788.737024" p-id="3146" fill="#bfbfbf"></path>
        <path d="M64.77824 858.791936" p-id="3147" fill="#bfbfbf"></path>
        <path
          d="M163.396608 289.168384c-40.577024 0-66.526208 54.183936-35.44064 85.25824L477.217792 723.704832c20.031488 20.031488 49.82272 20.031488 69.853184 0l349.274112-349.278208c30.30528-30.294016 6.677504-85.25824-34.927616-85.25824L163.396608 289.168384z"
          p-id="3148"
          fill="#bfbfbf"
        ></path>
        <path d="M959.522816 858.791936" p-id="3149" fill="#bfbfbf"></path>
      </svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: { show: false, type: "category" },
      yAxis: { show: false },
      series: [
        {
          type: "line",
          data: [10, 7, 33, 12, 88, 9],
          smooth: true,
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "purple",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ],
              global: false,
            },
          },
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
.header {
  display: flex;
  align-items: center;
}
.search-header {
  margin-right: 20px;
}
.main {
  margin: 10px 0px;
}
.main-title {
  margin-right: 30px;
}
.main-content {
  margin-right: 10px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>
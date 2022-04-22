<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥ 126560">
            <template slot="charts">
              <span>周同比</span>
              <span
                >56.67%
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
                  <path
                    d="M325.456896 862.27968"
                    p-id="2855"
                    fill="#C73021"
                  ></path>
                  <path
                    d="M882.05824 862.27968"
                    p-id="2856"
                    fill="#C73021"
                  ></path>
                  <path
                    d="M236.027904 877.161472"
                    p-id="2857"
                    fill="#C73021"
                  ></path>
                  <path
                    d="M960.132096 877.161472"
                    p-id="2858"
                    fill="#C73021"
                  ></path>
                  <path
                    d="M64.134144 845.290496"
                    p-id="2859"
                    fill="#C73021"
                  ></path>
                  <path
                    d="M131.974144 648.752128c-30.418944 30.430208-6.474752 84.301824 34.917376 84.301824L858.258432 733.053952c42.899456 0 65.325056-53.85216 34.916352-84.301824L547.487744 302.569472c-19.930112-19.974144-49.374208-19.95264-69.327872 0L131.974144 648.752128z"
                    p-id="2860"
                    fill="#C73021"
                  ></path>
                  <path
                    d="M960.51712 845.290496"
                    p-id="2861"
                    fill="#C73021"
                  ></path>
                </svg>
              </span>
              <span>日同比</span>
              <span
                >19.16%
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
                  <path
                    d="M325.456896 862.27968"
                    p-id="3141"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M882.05824 862.27968"
                    p-id="3142"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M236.027904 877.161472"
                    p-id="3143"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M960.132096 877.161472"
                    p-id="3144"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M63.683584 788.737024"
                    p-id="3145"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M958.46912 788.737024"
                    p-id="3146"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M64.77824 858.791936"
                    p-id="3147"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M163.396608 289.168384c-40.577024 0-66.526208 54.183936-35.44064 85.25824L477.217792 723.704832c20.031488 20.031488 49.82272 20.031488 69.853184 0l349.274112-349.278208c30.30528-30.294016 6.677504-85.25824-34.927616-85.25824L163.396608 289.168384z"
                    p-id="3148"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M959.522816 858.791936"
                    p-id="3149"
                    fill="#bfbfbf"
                  ></path>
                </svg>
              </span>
            </template>
            <template slot="footer">日销售额￥ 12423</template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <lineChart></lineChart>
            </template>
            <template slot="footer">日访问量 1234 </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts"> <barChart></barChart> </template>
            <template slot="footer">转化率 65% </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts"> <progressChart></progressChart></template>
            <template slot="footer">
              <span>周同比</span>
              <span
                >56.67%
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
                  <path
                    d="M325.456896 862.27968"
                    p-id="2855"
                    fill="#C73021"
                  ></path>
                  <path
                    d="M882.05824 862.27968"
                    p-id="2856"
                    fill="#C73021"
                  ></path>
                  <path
                    d="M236.027904 877.161472"
                    p-id="2857"
                    fill="#C73021"
                  ></path>
                  <path
                    d="M960.132096 877.161472"
                    p-id="2858"
                    fill="#C73021"
                  ></path>
                  <path
                    d="M64.134144 845.290496"
                    p-id="2859"
                    fill="#C73021"
                  ></path>
                  <path
                    d="M131.974144 648.752128c-30.418944 30.430208-6.474752 84.301824 34.917376 84.301824L858.258432 733.053952c42.899456 0 65.325056-53.85216 34.916352-84.301824L547.487744 302.569472c-19.930112-19.974144-49.374208-19.95264-69.327872 0L131.974144 648.752128z"
                    p-id="2860"
                    fill="#C73021"
                  ></path>
                  <path
                    d="M960.51712 845.290496"
                    p-id="2861"
                    fill="#C73021"
                  ></path>
                </svg>
              </span>
              <span>日同比</span>
              <span
                >19.16%
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
                  <path
                    d="M325.456896 862.27968"
                    p-id="3141"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M882.05824 862.27968"
                    p-id="3142"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M236.027904 877.161472"
                    p-id="3143"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M960.132096 877.161472"
                    p-id="3144"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M63.683584 788.737024"
                    p-id="3145"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M958.46912 788.737024"
                    p-id="3146"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M64.77824 858.791936"
                    p-id="3147"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M163.396608 289.168384c-40.577024 0-66.526208 54.183936-35.44064 85.25824L477.217792 723.704832c20.031488 20.031488 49.82272 20.031488 69.853184 0l349.274112-349.278208c30.30528-30.294016 6.677504-85.25824-34.927616-85.25824L163.396608 289.168384z"
                    p-id="3148"
                    fill="#bfbfbf"
                  ></path>
                  <path
                    d="M959.522816 858.791936"
                    p-id="3149"
                    fill="#bfbfbf"
                  ></path>
                </svg>
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineChart from "./lineChart";
import barChart from "./barChart";
import progressChart from "./progressChart";
export default {
  name: "Card",
  components: {
    Detail,
    lineChart,
    barChart,
    progressChart,
  },
};
</script>

<style>
</style>
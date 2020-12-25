<template>
  <div class="proposal_detail">
    <slider></slider>
    <votenumber v-if="$store.state.votenumberstate"></votenumber>
    <div class="proposal_detail_content">
      <div class="proposal_detail_contentdetail">
        <div class="vote_title">{{ title }}</div>
        <div class="vote_name">由{{ name }}创建于{{ createTime }}</div>
        <ul>
          <li v-if="$route.query.state == 2">
            <div class="vote_content_top">
              <div></div>
              <div>投票倒计时</div>
            </div>

            <div class="vote_content_footer" v-if="toupiaoend">
              <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
            </div>
            <div class="vote_content_footer" v-else>投票时间已结束</div>
          </li>
          <li v-else></li>
          <li v-if="$route.query.state == 2"></li>
          <li v-else>
            <div class="vote_content_top">
              <div></div>
              <div>提案人</div>
            </div>
            <div class="vote_content_footer">{{ name }}</div>
          </li>
          <li v-if="$route.query.state == 2"></li>
          <li v-else>
            <div class="vote_content_top">
              <div></div>
              <div>创建时间</div>
            </div>
            <div class="vote_content_footer">{{ createTime }}</div>
          </li>
          <li>
            <div class="vote_content_top">
              <div></div>
              <div>标题</div>
            </div>
            <div class="vote_content_footer">{{ title }}</div>
          </li>
          <li>
            <div class="vote_content_top">
              <div></div>
              <div>摘要</div>
            </div>
            <div class="vote_content_footer">{{ summary }}</div>
          </li>
          <li>
            <div class="vote_content_top">
              <div></div>
              <div>目标</div>
            </div>
            <div class="vote_content_footer">{{ target }}</div>
          </li>
          <li>
            <div class="vote_content_top">
              <div></div>
              <div>计划</div>
            </div>
            <div class="vote_content_footer">{{ plan }}</div>
          </li>
          <li>
            <div class="vote_content_top">
              <div></div>
              <div>预算</div>
            </div>
            <div class="vote_content_footer">{{ budget }}</div>
          </li>
          <li v-if="statestate">
            <div class="vote_content_top">
              <div></div>
              <div>执行计划</div>
            </div>
            <div class="vote_content_footer">{{ implPlan }}</div>
          </li>
        </ul>
        <div id="heights" v-if="qita">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>进度汇报</div>
            </div>
            <ul id="actionlist">
              <li v-for="item in logs" :key="item">
                <div class="actionlist1">{{ item.createTime }}</div>
                <div>{{ item.logs }}</div>
              </li>
            </ul>
            <div class="line"></div>
          </div>
        </div>
        <div class="agreereject" v-if="yishistate">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>议事阶段</div>
            </div>
            <el-progress :percentage="percentage2" color="red"></el-progress>
            <div class="buttonprorej" v-if="deptId == '002'">
              <div @click.once="reject1">
                <img src="@assets/images/detail/组 1890.png" />
                <span>反对{{ level2.consCount }}</span>
              </div>
              <div @click.once="agree1">
                <img src="@assets/images/detail/组 1890 拷贝.png" />
                <span>赞成{{ level2.prosCount }}</span>
              </div>
            </div>
            <div class="agreereject_detail" v-else>
              <div>
                <!-- <img src="@assets/images/detail/矩形 45 拷贝.png" /> -->
                <span>反对{{ level2.consCount }}</span>
              </div>
              <div>
                <span> {{ level2.prosCount }} 赞成</span>
                <!-- <img src="@assets/images/detail/矩形 45.png" /> -->
              </div>
            </div>
          </div>
        </div>
        <div class="agreereject  finishover" v-if="yishiagree">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>议事阶段</div>
               <div id="bohuir">
                <img
                  src="@assets/images/detail/组 1895.png"
                  class="bohuiimg"
                />
                <span class="bohui" id="green">
                  审议同意
                </span>
              </div>
            </div>

            <div class="bohui"></div>
            <div class="agreereject_detail " id="display">
              <div class="finish2"></div>
             
            </div>
          </div>
        </div>
        <div class="agreereject  finishover" v-if="yishireject">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>议事阶段</div>
              <div id="bohuir">
                <img
                  src="@assets/images/detail/组 1895 拷贝.png"
                  class="bohuiimg"
                />
                <span class="bohui" id="red">
                  审议驳回
                </span>
              </div>
            </div>

            <div class="bohui"></div>
            <div class="agreereject_detail " id="display">
              <div class="finish3"></div>
            </div>
          </div>
        </div>

        <div class="agreereject" v-if="toupiaostate" id="vote-select">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>投票阶段</div>
            </div>

            <el-progress :percentage="percentage3" color="red"></el-progress>
            <div class="agreereject_detail">
              <!-- <div> -->
              <!-- <img src="@assets/images/detail/矩形 45 拷贝.png" />  -->
              <!-- 反对{{ level3.consCount }} -->
              <!-- </div>
              <div>
                {{ level3.prosCount }}
                赞成 -->
              <!-- <img src="@assets/images/detail/矩形 45.png" /> -->
              <!-- </div> -->
            </div>
            <div class="buttonprorej" v-if="state == 2">
              <div @click="reject3">
                <img src="@assets/images/detail/组 1890.png" />
                <span>反对{{ level3.consCount }}</span>
              </div>
              <div @click="agree3">
                <img src="@assets/images/detail/组 1890 拷贝.png" />
                <span>赞成{{ level3.prosCount }}</span>
              </div>
            </div>
            <div v-else id="bohuireject">
              <div>反对{{ level3.consCount }}</div>
              <div>赞成{{ level3.prosCount }}</div>
            </div>
          </div>
        </div>
        <div class="agreereject  finishover" v-if="toupiaoagree">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>投票阶段</div>
              <div id="bohuir">
                <img src="@assets/images/detail/组 1895.png" class="bohuiimg" />
                <span class="bohui" id="green">
                  投票同意
                </span>
              </div>
            </div>

            <div class="bohui"></div>
            <div class="agreereject_detail " id="display">
              <div class="finish2"></div>
              <div>
                <!-- <img
                  src="@assets/images/detail/组 1895.png"
                  class="bohuiimg"
                /> -->
                <!-- <span class="green">
                  投票同意
                </span> -->
              </div>
            </div>
          </div>
        </div>
        <div class="agreereject  finishover" v-if="toupiaoreject">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>投票阶段</div>
              <div id="bohuir">
                <img
                  src="@assets/images/detail/组 1895 拷贝.png"
                  class="bohuiimg"
                />
                <span class="bohui" id="red">
                  投票驳回
                </span>
              </div>
            </div>

            <div class="bohui"></div>
            <div class="agreereject_detail " id="display">
              <div class="finish3"></div>
            </div>
          </div>
        </div>

        <div class="agreereject" v-if="jieanstate">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>结案阶段</div>
            </div>

            <el-progress :percentage="percentage4" color="red"></el-progress>
            <div class="buttonprorej" v-if="deptId == '004'">
              <div @click.once="rejectjiean">
                <img src="@assets/images/detail/组 1890.png" />
                <span>反对{{ level4.consCount }}</span>
              </div>
              <div @click.once="agreejiean">
                <img src="@assets/images/detail/组 1890 拷贝.png" />
                <span>赞成{{ level4.prosCount }}</span>
              </div>
            </div>
            <div class="agreereject_detail" v-else>
              <div>
                <!-- <img src="@assets/images/detail/矩形 45 拷贝.png" />  -->
                <span>反对{{ level4.consCount }}</span>
              </div>
              <div>
                <span> {{ level4.prosCount }} 赞成</span>

                <!-- <img src="@assets/images/detail/矩形 45.png" /> -->
              </div>
            </div>

            <!-- <div class="buttonprorej" v-else>
              
            </div> -->
          </div>
        </div>
        <div class="agreereject  finishover" v-if="jieanagree">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>结案阶段</div>
              <div id="bohuir">
                <img
                  src="@assets/images/detail/组 1895.png"
                  class="bohuiimg"
                />
                <span class="bohui" id="green">
                  监督同意
                </span>
              </div>
            </div>

            <div class="bohui"></div>
            <div class="agreereject_detail " id="display">
              <div class="finish2"></div>
              <!-- <div> -->
              <!-- <img
                  src="@assets/images/detail/组 1895.png"
                  class="bohuiimg"
                /> -->
              <!-- <span class="green">
                  监督同意
                </span> -->
              <!-- </div> -->
            </div>
          </div>
        </div>
        <div class="agreereject  finishover" v-if="jieanreject">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>结案阶段</div>
              <div id="bohuir">
                <img
                  src="@assets/images/detail/组 1895 拷贝.png"
                  class="bohuiimg"
                />
                <span class="bohui" id="red">
                  监督驳回
                </span>
              </div>
            </div>

            <div class="bohui"></div>
            <div class="agreereject_detail " id="display">
              <div class="finish3"></div>
              <!-- <div> -->
              <!-- <img
                  src="@assets/images/detail/组 1895 拷贝.png"
                  class="bohuiimg"
                />
                <span class="bohui">
                  监督驳回
                </span> -->
              <!-- </div> -->
            </div>
          </div>
        </div>
        <div
          class="agreereject action"
          id="height2"
          v-if="special"
          :class="{ displaycss: displays }"
        >
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div id="vote_plan">执行计划</div>
            </div>
            <div id="textarea">
              <textarea
                placeholder="输入您的执行计划"
                v-model="actionplan"
              ></textarea>
              <button class="submit" @click="planStates">确认发布</button>
            </div>
          </div>
        </div>
        <div
          class="agreereject action"
          id="height"
          v-if="shunxu"
          :class="{ progress: progress }"
        >
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>进度汇报</div>
            </div>

            <textarea
              placeholder="输入您的每日进度汇报"
              v-model="tellprogress"
            ></textarea>
            <div class="lishi">
              <button @click="allComplete">全部完成</button>
              <button @click="actionStates" v-preventClick>提交</button>
            </div>
          </div>
        </div>
        <div class="agreereject" :class="{ actionstate: actionstate }">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>完成阶段</div>
            </div>

            <el-progress
              :percentage="percentage5"
              color="#1F91D3"
              id="specialprogress"
            ></el-progress>
            <div class="agreereject_detail">
              <!-- <div> -->
              <!-- <img src="@assets/images/detail/矩形 45 拷贝.png" /> 反对{{
                  finishLevel.consCount
                }} -->
              <!-- </div> -->

              <!-- <img
                src="@assets/images/proposal/多边形 1.png"
                v-if="percentage5 == 33"
                class="duobian"
                id="duobian1"
              /> -->
              <div v-if="percentage5 == 0">
                <div
                  v-if="deptId === '003'"
                  id="first1percentage5"
                  class="blue_border"
                >
                  <img
                    src="@assets/images/detail/组 1890 拷贝.png"
                    @click.once="agreeaction"
                  />
                  <span v-if="deptId === '003'" @click.once="agreeaction"
                    >赞成0</span
                  >
                </div>

                <span v-else id="first1percentage5">赞成0</span>
                <!-- <img src="@assets/images/detail/矩形 45.png" /> -->
              </div>
              <div v-if="percentage5 == 33">
                <div
                  v-if="deptId === '003'"
                  id="firstpercentage5"
                  class="blue_border"
                >
                  <img
                    src="@assets/images/detail/组 1890 拷贝.png"
                    @click.once="agreeaction"
                  />
                  <span @click.once="agreeaction">赞成1</span>
                </div>

                <span v-else id="firstpercentage5">赞成1</span>
                <!-- <img src="@assets/images/detail/矩形 45.png" /> -->
              </div>
              <!-- <img
                src="@assets/images/proposal/多边形 1.png"
                v-if="percentage5 == 66"
                class="duobian"
                id="duobian2"
              /> -->
              <div v-if="percentage5 == 66">
                <div
                  v-if="deptId === '003'"
                  id="secondpercentage5"
                  class="blue_border"
                >
                  <img
                    src="@assets/images/detail/组 1890 拷贝.png"
                    @click.once="agreeaction"
                  />
                  <span @click.once="agreeaction">赞成2</span>
                </div>

                <span v-else id="secondpercentage5">赞成2</span>
                <!-- <img src="@assets/images/detail/矩形 45.png" /> -->
              </div>
              <!-- <img
                src="@assets/images/proposal/多边形 1.png"
                v-if="percentage5 == 100"
                class="duobian"
                id="duobian3"
              /> -->
              <div v-if="percentage5 == 100">
                <div
                  v-if="deptId === '003'"
                  id="thirdpercentage5"
                  class="blue_border"
                >
                  <img
                    src="@assets/images/detail/组 1890 拷贝.png"
                    @click.once="agreeaction"
                  />
                  <span v-if="deptId === '003'" @click.once="agreeaction"
                    >赞成3</span
                  >
                </div>

                <span v-else>赞成3</span>
                <!-- <img src="@assets/images/detail/矩形 45.png" /> -->
              </div>
            </div>
            <!-- <div class="buttonprorej" v-if="deptId === '003'">
              <div id="btn"> -->
            <!-- <img src="@assets/images/detail/组 1890.png" /><span
                  >反对</span
                > -->
            <!-- </div> -->
            <!-- <div @click.once="agreeaction"> -->
            <!-- <img src="@assets/images/detail/组 1890 拷贝.png" /> -->
            <!-- <span>赞成</span> -->
          </div>
        </div>
        <!-- <div class="buttonprorej" v-else></div> -->
      </div>
    </div>

    <div class="agreereject  finishover" v-if="actionagree">
      <div class="vote_vote">
        <div class="vote_vote_top">
          <div></div>
          <div>完成阶段</div>
        </div>

        <div class="bohui"></div>
        <div class="agreereject_detail " id="display">
          <div class="finish2"></div>
          <div>
            <!-- <img
                  src="@assets/images/detail/组 1895.png"
                  class="bohuiimg"
                /> -->
            <span class="green">
              已完成
            </span>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
$(function() {
  //  console.log('haha')
   $(window).scrollTop(0);
});
var qs = require("qs");
import { BASEURL } from "@api/api";
import slider from "@components/common/slider";
import votenumber from "@components/common/voteNumber";
import vFooter from "@components/common/vFooter";
export default {
  name: "proposaldetail",
  inject: ["reload"],
  data() {
    return {
      nowLang: "",
      fullscreenLoading: true,
      show: false,
      iconshow: false,
      transform: false,
      login: true,
      budget: "",
      consAmount: "",
      createTime: "",
      plan: "",
      prosAmount: "",
      summary: "",
      target: "",
      title: "",
      name: "",
      implPlan: "",
      plan: "",
      logs: [],
      level: "",
      deptId: "",
      toupiaoend: false,
      endTime: "",
      countDownList: "投票时间已结束",
      // 流程阶段判定
      statestate: false,
      state: "",
      // 议事阶段
      level2: "",
      percentage2: 0,
      yishistate: false,
      yishiagree: false,
      yishireject: false,
      // 投票阶段
      level3: "",
      percentage3: 0,
      toupiaostate: false,
      toupiaoagree: false,
      toupiaoreject: false,
      wanchengstate: false,
      // 结案阶段
      level4: "",
      percentage4: 0,
      jieanstate: false,
      jieanagree: false,
      jieanreject: false,
      // 行动阶段
      finishLevel: "",
      actionstate: false,
      percentage5: 0,
      actionagree: false,
      actionreject: false,
      // 权限
      human: false,
      special: false,
      planshow: true,
      // 行动中文本框
      tellprogress: "",
      actionplan: "",
      shunxu: false,
      displays: false,
      progress: false,
      qita: false,
      nowTime: "",
      time: "",
    };
  },
  components: { votenumber, slider, vFooter },
  created() {
      window.scrollTo(0, 0);
    // console.log(this.$route.query.activityId);
    // this.handleScroll()
    // if (location.href.indexOf("#reloaded") == -1) {
    //   location.href = location.href + "#reloaded";
    //   this.$router.go(0);
     
    // }
    // console.log(window);
    //  window.scrollTo(0, localStorage.getItem("scroll"));
    // console.log(localStorage.getItem("scroll") + "scroll");
    // if (localStorage.getItem("scroll") !== "") {

    //     window.scrollTo(0, 2000);

    // } else {
    //   window.scrollTo(0, -1);
    // }
    // if (location.href.indexOf("#reloaded") == -1) {
    //   location.href = location.href + "#reloaded";
    //   location.reload();
    // }
    // this.handleScroll()
    this.deptId = localStorage.getItem("deptId");
    this.proposalDetail();
    this.countDown();

    // 强制刷新一次
  },
  mounted() {
  
  },
  computed: {},

  methods: {
    // handle() {
    //   this.handleScroll();
    //   this.reload();
    // },
    handleScroll() {
      let scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      window.scrollTo(0, -1);
      // localStorage.setItem("scroll", scrollTop);
    },
    timeFormat(param) {
      return param < 10 ? "0" + param : param;
    },
    countDown(it) {
      var interval = setInterval(() => {
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date(this.nowTime).getTime(); // 对结束时间进行处理渲染到页面
        // console.log(newTime);
        let endTime = new Date(this.endTime).getTime();
        // console.log(endTime);
        // this.time=(endTime-newTime)
        let obj = null; // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          this.toupiaoend = true;
          let time2 = endTime - newTime;
          let time = (endTime - newTime) / 1000; // 获取天、时、分、秒
          let day = parseInt(time / (60 * 60 * 24));
          let hou = parseInt((time % (60 * 60 * 24)) / 3600);
          let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
          let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);

          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec),
          };
          this.time = time2;
        } else {
          this.toupiaoend = false;
          // 活动已结束，全部设置为'00'
          obj = {
            day: "00",
            hou: "00",
            min: "00",
            sec: "00",
          };
          clearInterval(interval);
        }
        this.countDownList =
          obj.day + "天" + obj.hou + "时" + obj.min + "分" + obj.sec + "秒";
      }, 1000);
    },
    // 议事部投票
    reject1() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/updateMotion",
          qs.stringify({
            userId: localStorage.getItem("userId"),
            activityId: this.$route.query.activityId,
            level: 2,
            isPass: 0,
          }),
          { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
           
          //  console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.result);
            //  setTimeout(this.deley(), 3000);
           this.reload();
          } else {
            // setTimeout(this.deley(), 3000);
            this.$message.error(res.data.result);
          
          }
        });
      // this.$store.commit("voteNumber");
      // localStorage.setItem("activityId", this.$route.query.activityId);
      // localStorage.setItem("toupiaostate", 0);
    },
    agree1() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/updateMotion",
          qs.stringify({
            userId: localStorage.getItem("userId"),
            activityId: this.$route.query.activityId,
            level: 2,
            isPass: 1,
          }),
          { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
            // console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.result);
             this.reload();
          } else {
              this.$message.error(res.data.result);
      
        // console.log('cuowu')
          
          }
        });
      // this.$store.commit("voteNumber");
      // localStorage.setItem("activityId", this.$route.query.activityId);
      // localStorage.setItem("toupiaostate", 1);
    },
    // 行动部投票
    rejectaction() {
      // this.fullscreenLoading = true;
      // console.log("1");
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/updateMotion",
          qs.stringify({
            userId: localStorage.getItem("userId"),
            activityId: this.$route.query.activityId,
            level: 3,
            isPass: 0,
          }),
          { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            this.fullscreenLoading = false;
            this.$message.success(res.data.result);
            this.reload();
          } else {
            this.$message.error(res.data.result);
          }
        });
    },
    agreeaction() {
      // this.fullscreenLoading = true;
      // console.log("2");
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/updateMotion",
          qs.stringify({
            userId: localStorage.getItem("userId"),
            activityId: this.$route.query.activityId,
            level: 3,
            isPass: 1,
          }),
          { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            // this.fullscreenLoading = false;
            this.$message.success(res.data.result);
            this.reload();
          } else {
            this.$message.error(res.data.result);
          }
        });
    },
    // 投票阶段
    reject3() {
      this.$store.commit("voteNumber");
      localStorage.setItem("activityId", this.$route.query.activityId);
      localStorage.setItem("toupiaostate", 0);
    },
    agree3() {
      this.$store.commit("voteNumber");
      localStorage.setItem("activityId", this.$route.query.activityId);
      localStorage.setItem("toupiaostate", 1);
    },
    // 结案阶段
    rejectjiean() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/updateMotion",
          qs.stringify({
            userId: localStorage.getItem("userId"),
            activityId: this.$route.query.activityId,
            level: 4,
            isPass: 0,
          }),
          { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.result);
            this.reload();
          } else {
            this.$message.error(res.data.result);
          }
        });
    },
    agreejiean() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/updateMotion",
          qs.stringify({
            userId: localStorage.getItem("userId"),
            activityId: this.$route.query.activityId,
            level: 4,
            isPass: 1,
          }),
          { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.result);
            this.reload();
          } else {
            this.$message.error(res.data.result);
          }
        });
    },
    // 查询提案详情
    async proposalDetail() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/motionDetail ",
          qs.stringify({
            activityId: this.$route.query.activityId,
            userId: localStorage.getItem("userId"),
          }),
          { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            var result = res.data.result;
            // 等级
            // 议事阶段
            this.level2 = result.level2;
            // 投票阶段
            this.level3 = result.level3;
            // 结案阶段
            this.level4 = result.level4;
            // 完成阶段
            this.title = result.title;
            this.finishLevel = result.finishLevel;
            this.name = result.name;
            this.createTime = this.timestampToTime2(result.createTime);
            this.budget = result.budget;
            this.consAmount = result.consAmount;
            this.implPlan = result.implPlan;

            this.plan = result.plan;
            this.prosAmount = result.prosAmount;
            this.summary = result.summary;
            this.target = result.target;

            this.logs = result.logs;
            this.endTime = result.endTime;
            this.nowTime = result.nowTime;
            // 状态002.003.004
            this.state = result.state;

            // 行动中
            // result.isImplUser = 1;
            // result.implPlan = "111";
            // result.finishLevel.prosCount = 2;
            // result.finishLevel.consCount = 0;
            //  result.isAllActioned = 1
            // result.isAllActioned=1;
            // result.finishLevel.prosCount = 3;
            // result.finishLevel.consCount= 2
            if (result.state == 3 || result.state == -4) {
              // console.log(result.finishLevel.prosCount);
              // 人物权限1/0
              // result.isAllActioned = 1;
              // result.implPlan = "";
              // 执行理事
              if (result.logs.length !== 0) {
                this.qita = true;
              }
              // this.qita=true
              if (result.isImplUser == 1) {
                this.special = true;
                this.human = true;
                if (result.implPlan !== "") {
                  // 执行计划
                  this.statestate = true;
                  this.displays = true;
                  // this.qita=true;
                  // if (result.logs.length !== 0) {
                  //   this.qita = true;
                  // }
                  if (result.isAllActioned == 1) {
                    this.progress = true;
                    this.shunxu = false;
                    this.actionstate = false;
                  } else {
                    this.actionstate = true;
                    this.progress = false;
                    this.shunxu = true;
                  }
                  // 日报
                  // this.shunxu = true;
                  // this.progress = false;
                } else {
                  this.statestate = false;
                  this.displays = false;
                  this.actionstate = true;
                  // 日报
                  //  this.shunxu = false;
                  // this.progress =true;
                }
              }
              // else {
              //   this.human = true;
              //   this.special = false;
              // }
              if (result.implPlan !== "" && result.isAllActioned == 1) {
                this.actionstate = false;
                // this.qita = true;
                this.statestate = true;
                if (
                  result.finishLevel.prosCount +
                    result.finishLevel.consCount ===
                  3
                ) {
                  this.shunxu = false;
                  this.progress = true;
                  // 隐藏投票
                  this.actionstate = true;
                  if (
                    result.finishLevel.prosCount > result.finishLevel.consCount
                  ) {
                    this.actionagree = true;
                    this.actionreject = false;
                  } else {
                    this.actionagree = false;
                    this.actionreject = true;
                  }
                }
                // 票数不等于3
                else {
                  if (
                    result.finishLevel.prosCount === 0 &&
                    result.finishLevel.consCount === 0
                  ) {
                    this.percentage5 = Number(0);
                  } else {
                    this.actionagree = false;
                    this.actionreject = false;
                    if (result.finishLevel.prosCount === 1) {
                      this.percentage5 = Number(33);
                    }
                    if (result.finishLevel.prosCount === 2) {
                      this.percentage5 = Number(66);
                    }
                    if (result.finishLevel.prosCount === 3) {
                      this.percentage5 = Number(100);
                    }
                    // console.log(this.percentage5);
                    // let fenzileft = Number(result.finishLevel.consCount * 100);
                    // let fenziright =
                    //   result.finishLevel.prosCount +
                    //   result.finishLevel.consCount;
                    // let fenzi = fenzileft / fenziright;
                    // let fenmu =
                    //   ((result.finishLevel.prosCount +
                    //     result.finishLevel.consCount) *
                    //     100) /
                    //   (result.finishLevel.prosCount +
                    //     result.finishLevel.consCount);
                    // this.percentage5 = Number(fenzi / fenmu) * 100;
                  }
                }
              } else {
                if (result.implPlan !== "") {
                  // 执行计划
                  this.statestate = true;
                  // this.shunxu = true;
                  // this.progress = false;
                } else {
                  this.statestate = false;
                }
                if (result.isAllActioned == 1) {
                  // this.shunxu = false;
                  // this.progress = true;
                  this.actionstate = false;
                  // this.qita = true;
                } else {
                  this.actionstate = true;
                  // this.qita = false;
                }
              }
              if (result.implPlan !== "" && result.isAllActioned == 1) {
                this.actionstate = false;
                // this.qita = true;
                if (
                  result.finishLevel.prosCount +
                    result.finishLevel.consCount ===
                  3
                ) {
                  this.shunxu = false;
                  this.progress = true;
                  // 隐藏投票
                  this.actionstate = true;
                  if (
                    result.finishLevel.prosCount > result.finishLevel.consCount
                  ) {
                    this.actionagree = true;
                    this.actionreject = false;
                  } else {
                    this.actionagree = false;
                    this.actionreject = true;
                  }
                }
                // 票数不等于3
                else {
                  if (
                    result.finishLevel.prosCount === 0 &&
                    result.finishLevel.consCount === 0
                  ) {
                    this.percentage5 = Number(0);
                  } else {
                    this.actionagree = false;
                    this.actionreject = false;
                    // this.actionagree = false;
                    // this.actionreject = false;
                    if (result.finishLevel.prosCount === 1) {
                      this.percentage5 = Number(33);
                    }
                    if (result.finishLevel.prosCount === 2) {
                      this.percentage5 = Number(66);
                    }
                    if (result.finishLevel.prosCount === 3) {
                      this.percentage5 = Number(100);
                    }
                    // let fenzileft = Number(result.finishLevel.consCount * 100);
                    // let fenziright =
                    //   result.finishLevel.prosCount +
                    //   result.finishLevel.consCount;
                    // let fenzi = fenzileft / fenziright;
                    // let fenmu =
                    //   ((result.finishLevel.prosCount +
                    //     result.finishLevel.consCount) *
                    //     100) /
                    //   (result.finishLevel.prosCount +
                    //     result.finishLevel.consCount);
                    // this.percentage5 = Number(fenzi / fenmu) * 100;
                  }
                }
              }
            }
            // 议事阶段level2
            else if (result.state == 1 || result.state == -2) {
              this.actionstate = true;
              //    result.level2.prosCount=2;
              // result.level2.consCount=0;
              if (result.level2.prosCount + result.level2.consCount === 5) {
                this.yishistate = false;
                if (result.level2.prosCount > result.level2.consCount) {
                  this.yishiagree = true;
                  this.yishireject = false;
                } else {
                  this.yishiagree = false;
                  this.yishireject = true;
                }
              } else {
                if (
                  result.level2.prosCount === 0 &&
                  result.level2.consCount === 0
                ) {
                  this.yishistate = true;
                  this.percentage2 = Number(50);
                } else {
                  this.yishistate = true;
                  this.yishiagree = false;
                  this.yishireject = false;
                  let fenzileft = Number(result.level2.consCount * 100);
                  let fenziright =
                    result.level2.prosCount + result.level2.consCount;
                  let fenzi = fenzileft / fenziright;
                  let fenmu =
                    ((result.level2.prosCount + result.level2.consCount) *
                      100) /
                    (result.level2.prosCount + result.level2.consCount);
                  this.percentage2 = Number(fenzi / fenmu) * 100;
                  // console.log(this.percentage2);
                }
              }
            }
            // 结案阶段
            // result.level4.prosCount = 3;
            // result.level4.consCount = 4;
            else if (
              result.state == 4 ||
              result.state == -5 ||
              result.state == 5
            ) {
              this.qita = true;
              this.statestate = true;
              this.actionstate = true;
              this.actionagree = false;
              this.actionreject = false;

              if (result.level4.prosCount + result.level4.consCount === 3) {
                this.jieanstate = false;
                if (result.level4.prosCount > result.level4.consCount) {
                  this.jieanagree = true;
                  this.jieanreject = false;
                } else {
                  this.jieanagree = false;
                  this.jieanreject = true;
                }
              } else {
                if (
                  result.level4.prosCount === 0 &&
                  result.level4.consCount === 0
                ) {
                  this.jieanstate = true;
                  this.percentage4 = Number(50);
                } else {
                  this.jieanstate = true;
                  this.jieanagree = false;
                  this.jieanreject = false;
                  let fenzileft = Number(result.level4.consCount * 100);
                  let fenziright =
                    result.level4.prosCount + result.level4.consCount;
                  let fenzi = fenzileft / fenziright;
                  let fenmu =
                    ((result.level4.prosCount + result.level4.consCount) *
                      100) /
                    (result.level4.prosCount + result.level4.consCount);
                  this.percentage4 = Number(fenzi / fenmu) * 100;
                }
              }
            }
            // console.log(this.level3);
            // 投票阶段level3
            // console.log(date);
            // result.level3.prosCount = 30;
            // result.level3.consCount = 10;
            // result.endTime = 1803252500000;
            else if (result.state == 2 || result.state == -3) {
              this.actionstate = true;
              var date =result.nowTime;
              // console.log(date);
              if (date - result.endTime >= 0) {
                this.toupiaostate = false;
                if (result.level3.prosCount > result.level3.consCount) {
                  this.toupiaoagree = true;
                  this.toupiaoreject = false;
                } else if (result.level3.prosCount < result.level3.consCount) {
                  this.toupiaoagree = false;
                  this.toupiaoreject = true;
                } else {
                  this.toupiaostate = true;
                  this.toupiaoagree = false;
                  this.toupiaoreject = false;
                  this.percentage3 = Number(50);
                }
              } else {
                if (
                  result.level3.prosCount == 0 &&
                  result.level3.consCount == 0
                ) {
                  this.toupiaostate = true;
                  this.toupiaoagree = false;
                  this.toupiaoreject = false;
                  this.percentage3 = Number(50);
                } else {
                  this.toupiaostate = true;
                  this.toupiaoagree = false;
                  this.toupiaoreject = false;
                  let fenzileft = Number(result.level3.consCount * 100);
                  let fenziright =
                    result.level3.prosCount + result.level3.consCount;

                  let fenzi = fenzileft / fenziright;
                  let fenmu =
                    ((result.level3.prosCount + result.level3.consCount) *
                      100) /
                    (result.level3.prosCount + result.level3.consCount);
                  this.percentage3 = Number(fenzi / fenmu) * 100;
                }
              }
            } else {
              return false;
            }
            for (let j = 0; j < result.logs.length; j++) {
              this.logs[j].createTime = this.timestampToTime2(
                result.logs[j].createTime
              );
            }
          } else {
            this.$toast.fail({
              duration: 1000, // 持续展示 toast
              forbidClick: true, // 禁用背景点击
              loadingType: "spinner",
              message: res.data.result,
              position: top,
            });
            // this.$message({
            //   message: res.data.result,
            //   center: true,
            //   type: "error",
            //   duration: 1000,
            // });
            // this.$message.error(res.data.result);
            localStorage.clear();
            // this.$store.state.username = '';
            this.$store.commit("loginfalse");
            this.$router.push({
              path: "/proposal",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 增加行动日志
    actionStates() {
      // console.log(localStorage.getItem("token"));
      if (this.tellprogress == "") {
        this.$message.error("请输入行动日志");
      } else {
        this.$http
          .post(
            // 测试上
            //47.105.215.191/weimi/index/getPhoneCode
            `${BASEURL}` + "/weimioffice/vote/addLogs",
            qs.stringify({
              userId: localStorage.getItem("userId"),
              activityId: this.$route.query.activityId,
              logs: this.tellprogress,
            }),
            { headers: { token: localStorage.getItem("token") } }
          )
          .then((res) => {
            // console.log(res);
            // this.handleScroll();
            if (res.data.code === 200) {
              this.tellprogress = "";
              this.qita = true;
              this.$message({
                type: "success",
                message: res.data.result,
                center: true,
                offset: 40,
                duration: 2000,
              });
              // this.$message.success(res.data.result);
              this.reload();
            } else {
              this.$message({
                type: "error",
                message: res.data.result,
                center: true,
                offset: 40,
                duration: 2000,
              });
              // this.$message.error(res.data.result);
            }
          });
      }
    },
    // 执行计划
    planStates() {
      if (this.actionplan == "") {
        this.$message.error("请输入执行计划");
      } else {
        this.$http
          .post(
            // 测试上
            //47.105.215.191/weimi/index/getPhoneCode
            `${BASEURL}` + "/weimioffice/vote/commitImplPlan",
            qs.stringify({
              userId: localStorage.getItem("userId"),
              activityId: this.$route.query.activityId,
              implPlan: this.actionplan,
            }),
            { headers: { token: localStorage.getItem("token") } }
          )
          .then((res) => {
            // console.log(res);
            if (res.data.code === 200) {
              // 进度汇报为真
              this.shunxu = true;
              this.progress = false;
              // 执行计划为真
              this.displays = true;
              this.$message.success(res.data.result);
              this.statestate = true;
              this.reload();
            } else {
              this.$message.error(res.data.result);
            }
          });
      }
    },
    // 全部完成
    allComplete() {
      // console.log(this.logs.length);
      if (this.logs.length == 0) {
         this.$toast.fail({
          duration: 1000, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: "spinner",
          message: "请先提交行动日志",
          position: top,
        });
        // this.$message.error("请先提交行动日志");
      } else {
        this.$http
          .post(
            // 测试上
            //47.105.215.191/weimi/index/getPhoneCode
            `${BASEURL}` + "/weimioffice/vote/sendAllActionLogs",
            qs.stringify({
              userId: localStorage.getItem("userId"),
              activityId: this.$route.query.activityId,
            }),
            { headers: { token: localStorage.getItem("token") } }
          )
          .then((res) => {
            // console.log(res);
            if (res.data.code === 200) {
              this.actionstate = false;
              this.progress = true;
              this.shunxu = false;
              this.qita = true;
              this.$message.success(res.data.result);
              this.reload();
            } else {
              this.$message.error(res.data.result);
            }
          });
      }
    },
    timestampToTime2(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate();
      if (D < 10) {
        D = "0" + D + "  ";
      } else {
        D = D + "  ";
      }
      var h = date.getHours();
      if (h < 10) {
        h = "0" + h + ":";
      } else {
        h = h + ":";
      }
      var m = date.getMinutes();
      if (m < 10) {
        m = "0" + m + ":";
      } else {
        m = m + ":";
      }

      var s = date.getSeconds();
      if (s < 10) {
        s = "0" + s;
      } else {
        s = s;
      }
      return Y + M + D + h + m + s;
    },
    goToVote() {
      this.$router.push({
        path: "/proposal",
      });
    },
    fastoken() {
      this.$store.dispatch("fastokenShow");
    },
    iconShow() {
      this.iconshow = !this.iconshow;
      this.transform = !this.transform;
    },
    leavelogin() {
      // 清除缓存
      this.$store.commit("leavelogin");
      this.iconshow = false;
    },

    gotoshow() {
      this.show = true;
    },
    gotohide() {
      this.show = false;
    },

    // 选择语言
  },
};
</script>
<style lang="less">
.van-count-down {
  font-size: 14px;
  font-family: "苹方-简";
  font-weight: normal;
  line-height: 21px;
  color: #ffffff;
}
.blue_border {
  border: 1px solid #009fcd;
}
#bohuireject {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-size: 12px;
  font-family: "苹方-简";
  font-weight: normal;
  line-height: 17px;
  div:nth-child(1) {
    color: #d93e3e;
  }
  div:nth-child(2) {
    color: #009fcd;
  }

  img {
    width: 14.03px;
    height: 13.03px;
  }
}
#vote_plan {
  font-size: 16px;
  font-family: "苹方-简";
  font-weight: normal;
  line-height: 22px;
  color: #ffffff;
  opacity: 1;
}
.buttonprorej {
  div:nth-child(1) {
    width: auto;
    height: 30px;
    border: 1px solid #d93e3e;
    opacity: 1;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;

    justify-content: space-around;
    img {
      margin-left: 9px;
    }
    span {
      margin-left: 2px;
      margin-right: 10px;
    }
  }
  div:nth-child(2) {
    height: 30px;
    border: 1px solid #009fcd;
    opacity: 1;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    img {
      margin-left: 9px;
    }
    span {
      margin-left: 2px;
      margin-right: 10px;
    }
  }
}
#height2 {
  width: 100%;
  height: 310px;
}
#textarea {
  width: 100%;
  margin: 0 auto;
  margin-left: 15px;
  textarea {
    border: none;
    outline: none;
  }
  .submit {
    margin-top: 15px;
  }
}
#vote-select {
  margin-top: 15px;
  width: 90%;
  height: 137px;
  border-radius: 5px;
  .buttonprorej {
    margin-top: 0;
  }
  .el-progress {
    padding-top: 20px;
  }
  .buttonprorej {
    text-align: center;
    div:nth-child(1) {
      height: 30px;
      border: 1px solid #d93e3e;
      opacity: 1;
      border-radius: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        margin-left: 9px;
      }
      span {
        margin-left: 2px;
        margin-right: 10px;
      }
      // justify-content: space-around;
    }
    div:nth-child(2) {
      height: 30px;
      border: 1px solid #009fcd;
      opacity: 1;
      border-radius: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        margin-left: 9px;
      }
      span {
        margin-left: 2px;
        margin-right: 10px;
      }
      // justify-content: space-around;
    }
  }
}
#red {
  color: #d93e3e;
}
#green {
  color: #009fcd;
}
#bohuir {
  padding-left: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    padding-left: 5px;
  }
  img {
    width: 16px;
    height: 16px;
  }
}
.duobian {
  width: 15px;
  height: 13px;
}
#duobian1 {
  position: relative;
  left: -150px;
  top: -5px;
}
#duobian2 {
  position: relative;
  left: 200px;
  top: -5px;
}
#duobian3 {
}
#first1percentage5 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
  // border: 1px solid #009fcd;
  width: 80px;
  height: 30px;
  // border: 1px solid #009fcd;
  opacity: 1;
  border-radius: 15px;
  color: #009fcd;
  img {
    width: 14.03px;
    height: 13.03px;
  }
  span {
    color: #009fcd;
  }
}
#firstpercentage5 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
  left: 66px;
  width: 80px;
  height: 30px;

  opacity: 1;
  border-radius: 15px;
  color: #009fcd;
  img {
    width: 14.03px;
    height: 13.03px;
  }
  span {
    color: #009fcd;
  }
}
#secondpercentage5 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
  left: 160px;
  width: 80px;
  height: 30px;
  color: #009fcd;
  opacity: 1;
  border-radius: 15px;
  img {
    width: 14.03px;
    height: 13.03px;
  }
  span {
    color: #009fcd;
  }
}
#thirdpercentage5 {
  position: relative;
  left: 0px;
}
#specialprogress {
  .el-progress-bar__outer {
    background: rgba(255, 255, 255, 0.5) !important;
  }
}
// 样式修改
#actionlist {
  font-size: 14px;
  font-family: "苹方-简";
  font-weight: normal;
  line-height: 21px;
  color: #ffffff;
  opacity: 0.8;
  li {
    font-size: 14px !important;
    font-family: "苹方-简";
    font-weight: normal;
    line-height: 21px;
    color: #ffffff;
    opacity: 0.8;
    width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    word-wrap: break-word;
    word-break: normal;
  }
}
.actionlist1 {
}
.displaycss {
  display: none;
}
.progress {
  display: none;
}
.actionstate {
  display: none;
}
.lishi {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  margin: 0 auto;
  button:nth-child(1) {
    width: 144px;
    height: 45px;
    background: #009fcd;
    border-radius: 10px;

    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #ffffff;
    line-height: 24px;
    margin-left: 20px !important;
    border: none;
    outline: none;
  }
  button:nth-child(2) {
    width: 144px;
    height: 45px;
    background: #009fcd;
    border-radius: 10px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #ffffff;
    line-height: 24px;
    margin-right: 25px !important;
    border: none;
    outline: none;
  }
}
.el-progress-bar__outer {
  background: #1f91d3 !important;
}
#heights {
  width: 90%;
  height: auto;
  background: #333333;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 20px;

  .vote_vote_top {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-top: 20px;
    margin: 0 auto;
    div:nth-child(1) {
      width: 4px;
      height: 23px;
      background: #009fcd;
    }
    div:nth-child(2) {
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 22px;
      color: #ffffff;
      opacity: 1;
      padding-left: 5px;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background: #ffffff;
    opacity: 0.1;
    margin: 0 auto;
    margin-top: 40px;
  }
  .submit {
    margin-bottom: 10px;
  }
  ul {
    li {
      // display: flex;
      // flex-direction: row;
      // justify-content: space-between;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 31px;
      div:nth-child(1) {
        // padding-left: 42px;
      }
      div:nth-child(2) {
        // padding-left: 20px;
      }
    }
  }
}
.red {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #bf3535 !important;
  line-height: 30px;
}
.green {
  color: #18c72f !important;
  padding-left: 15px;
}
#height {
  width: 100%;
  height: 330px;
  textarea {
    margin-left: 15px !important;
    border: none;
    outline: none;
  }
}
#display {
  display: flex;
  flex-direction: column;
  width: 315px;
  margin: 0 auto;
  div:nth-child(1) {
    width: 315px;
    height: 9px;
    background: rgba(31, 145, 211, 1);
    border-radius: 5px;
    border: none;
  }
  div:nth-child(2) {
    padding-right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    .bohui {
      padding-right: 0;
      padding-left: 10px;
    }
  }
}
.submit {
  width: 315px;
  height: 40px;
  background: #009fcd;
  opacity: 1;
  border-radius: 5px;
  text-align: center;
  margin-top: 30px;
  font-size: 16px;
  font-family: "苹方-简";
  font-weight: normal;
  line-height: 27px;
  color: #ffffff;
  opacity: 1;
  border: none;
  outline: none;
}
.submit:hover {
  background: rgba(0, 159, 205, 1);
}
.time {
  color: #ffffff !important;
}

#btn {
  border: none;
}
// 主线
.proposal_detail {
  width: 100%;
  height: auto;
  min-height: 100vh;
  position: relative;
  background: #0c0c0c;
  // .el-progress {
  //   padding-top: 0px !important;
  // }
  .el-progress__text {
    display: none;
  }

  .el-progress-bar {
    margin: 0 auto;
    padding-left: 5%;
    padding-right: 5%;
  }
  .proposal_detail_top {
    height: 500px;
    position: relative;
    margin: 0 auto;

    z-index: 1;
    .partnertop-content {
      width: 100%;
      height: 300px;
      margin: 0 auto;
      cursor: pointer;
      .top_title {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 300;
        color: #ffffff;
        position: relative;
        left: 83%;
        top: 270px;
        span {
          cursor: pointer;
        }
      }
    }
    // 头部内容区域
  }
  .proposal_detail_content {
    width: 100%;
    height: auto;
    min-height: 100vh;
    margin: 0 auto;
    .proposal_detail_contentdetail {
      width: 100%;
      height: auto;
      margin: 0 auto;
      padding-bottom: 50px;
      .vote_title {
        width: 90%;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 31px;
        text-align: center;
        padding-top: 10px;
        word-wrap: break-word;
        word-break: normal;
        margin: 0 auto;
      }
      .vote_name {
        width: 90%;
        text-align: center;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 31px;
        opacity: 0.5;
        padding-top: 5px;
        word-wrap: break-word;
        word-break: normal;
        margin: 0 auto;
      }
      ul {
        width: 90%;
        margin: 0 auto;
        li {
          width: 100%;
          margin-top: 15px;

          .vote_content_top {
            display: flex;
            flex-direction: row;
            align-items: center;
            div:nth-child(1) {
              width: 4px;
              height: 23px;
              background: #009fcd;
            }
            div:nth-child(2) {
              font-size: 16px;
              font-family: "苹方-简";
              font-weight: normal;
              line-height: 22px;
              color: #ffffff;
              opacity: 1;
              padding-left: 5px;
            }
          }
          .vote_content_footer {
            font-size: 14px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 21px;
            color: #ffffff;
            opacity: 0.5;

            padding-top: 5px;
            width: 100%;
            word-break: break-all;
            word-wrap: break-word;
          }
        }
      }
      .finishover {
        height: 86px !important;
      }
      .agreereject {
        width: 90%;
        height: auto;
        background: #333333;
        border-radius: 10px;

        margin: 15px auto 0;
        textarea {
          width: 315px;
          height: 150px;

          font-size: 14px;
          font-family: "苹方-简";
          font-weight: normal;

          background: #0c0c0c;
          border-radius: 10px;
          color: white;
          padding-left: 10px;
          margin-top: 15px;
          border: none;
          outline: none;
          line-height: 20px;
        }
        .finish {
          width: 100%;
          height: 10px;
          background: rgba(255, 255, 255, 0.1);

          border-radius: 5px;
          margin: 0 auto;
          margin-top: 40px;
        }

        .finish3 {
          width: 315px;
          height: 9px;
          background: #972b2b !important;
          border-radius: 5px;
          margin: 0 auto;
          // margin-top: 20px;
        }
        .vote_vote {
          width: 100%;
          margin: 0 auto;
          position: relative;
          top: 0px;
          padding-bottom: 20px;
          .vote_vote_top {
            width: 100% !important;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-left: 15px;
            padding-top: 20px;
            margin: 0 auto;
            .progress {
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #19bf2f !important;
              line-height: 30px;
            }
            div:nth-child(1) {
              width: 4px;
              height: 23px;
              background: #009fcd;
            }
            div:nth-child(2) {
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #ffffff;
              line-height: 30px;
              padding-left: 5px;
            }
            div:nth-child(3) {
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #009fcd;
              line-height: 30px;
              padding-left: 10px;
            }
          }
        }
        .agreereject_detail {
          width: 90%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding-top: 10px;
          text-align: center;
          margin: 0 auto;
          .bohui {
            font-size: 14px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 20px;
            color: #d93e3e;
            opacity: 1;

            padding-right: 5%;
          }
          .bohuiimg {
            width: 18px;
            height: 18px;
            padding-left: 90%;
            padding-top: 4px;
          }
          div:nth-child(1) {
            height: 30px;
            // border: 1px solid #d93e3e;
            opacity: 1;
            border-radius: 15px;
            font-size: 12px;
            font-family: "苹方-简";
            font-weight: normal;
            color: #c03535;
            line-height: 30px;
            padding-left: 10px;
            padding-right: 10px;
          }
          div:nth-child(2) {
            height: 30px;
            line-height: 30px;
            // border: 1px solid #009fcd;
            opacity: 1;
            border-radius: 15px;
            font-size: 12px;
            font-family: "苹方-简";
            font-weight: normal;
            color: #009fcd;
            padding-left: 10px;
            padding-right: 10px;
          }
          div:nth-child(3) {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #009fcd;
            line-height: 22px;
            padding-right: 5%;
          }
          div:nth-child(4) {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #009fcd;
            line-height: 22px;
            padding-right: 5%;
          }
        }
        .buttonprorej {
          width: 90%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin: 0 auto;
          margin-top: 11px;
          div:nth-child(1) {
            border: 2px solid #c03535;
            border-radius: 20px;
            font-size: 12px;
            font-family: "苹方-简";
            font-weight: normal;
            color: #c03535;
            cursor: pointer;
            img {
              width: 14.03px;
              height: 13.03px;
            }
            span {
            }
          }
          div:nth-child(2) {
            border: 2px solid #009fcd;
            border-radius: 20px;
            font-size: 12px;
            font-family: "苹方-简";
            font-weight: normal;
            color: #009fcd;
            cursor: pointer;
            img {
              width: 14.03px;
              height: 13.03px;
            }
            span {
            }
          }
        }
      }
    }
  }
}
</style>

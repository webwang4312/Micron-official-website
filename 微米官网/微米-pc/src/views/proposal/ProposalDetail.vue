<template>
  <div class="proposal_detail" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- <vue-particles
      color="#dedede"
      :particleOpacity="0.5"
      :particlesNumber="80"
      shapeType="polygon"
      :particleSize="1"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    >
    </vue-particles> -->
    <login v-if="$store.state.showlogin" ref="login"></login>
    <forget v-if="$store.state.forget"></forget>
    <fastoken v-if="$store.state.fastoken"></fastoken>
    <votenumber v-if="$store.state.votenumber"></votenumber>
    <div class="proposal_detail_top">
      <headerthird></headerthird>
      <div class="partnertop-content">
        <span class="top_title"
          ><img
            src="@assets/images/header/主页.png"
            style=" position: relative;top:2px"
            @click="index"
          />
          当前位置：<span @click="goToVote">关于社区</span>
          <span @click="goToVote">> 提案</span> >提案详情</span
        >
      </div>
    </div>
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
              <count-down
                id="now_end"
                :currentTime="parseInt(nowTime / 1000)"
                :startTime="parseInt(nowTime / 1000)"
                :endTime="parseInt(endTime / 1000)"
                :tipText="'距离投票时间开始还有'"
                :tipTextEnd="'距离投票结束时间还剩'"
                :endText="'投票时间已结束'"
                :dayTxt="'天'"
                :hourTxt="'小时'"
                :minutesTxt="'分钟'"
                :secondsTxt="'秒'"
              >
              </count-down>
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
            <div class="agreereject_detail">
              <div>
                <img src="@assets/images/detail/矩形 45 拷贝.png" /> 反对{{
                  level2.consCount
                }}
              </div>
              <div>
                {{ level2.prosCount }}
                赞成
                <img src="@assets/images/detail/矩形 45.png" />
              </div>
            </div>
            <div class="buttonprorej" v-if="deptId == '002'">
              <div @click.once="reject1">
                <img src="@assets/images/detail/组 1890.png" /><span
                  >反对</span
                >
              </div>
              <div @click.once="agree1">
                <img src="@assets/images/detail/组 1890 拷贝.png" /><span
                  >赞成</span
                >
              </div>
            </div>
            <div class="buttonprorej" v-else></div>
          </div>
        </div>
        <div class="agreereject  finishover" v-if="yishiagree">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>议事阶段</div>
            </div>

            <div class="bohui"></div>
            <div class="agreereject_detail " id="display">
              <div class="finish2"></div>
              <div>
                <img
                  src="@assets/images/detail/组 1895.png"
                  class="bohuiimg"
                />
                <span class="green">
                  审议同意
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="agreereject  finishover" v-if="yishireject">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>议事阶段</div>
            </div>

            <div class="bohui"></div>
            <div class="agreereject_detail " id="display">
              <div class="finish3"></div>
              <div>
                <img
                  src="@assets/images/detail/组 1895 拷贝.png"
                  class="bohuiimg"
                />
                <span class="bohui">
                  审议驳回
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="agreereject" v-if="toupiaostate">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>投票阶段</div>
            </div>

            <el-progress :percentage="percentage3" color="red"></el-progress>
            <div class="agreereject_detail">
              <div>
                <img src="@assets/images/detail/矩形 45 拷贝.png" /> 反对{{
                  level3.consCount
                }}
              </div>
              <div>
                {{ level3.prosCount }}
                赞成
                <img src="@assets/images/detail/矩形 45.png" />
              </div>
            </div>
            <div class="buttonprorej" v-if="state === '-3'"></div>
            <div class="buttonprorej" v-else>
              <div @click="reject3">
                <img src="@assets/images/detail/组 1890.png" /><span
                  >反对</span
                >
              </div>
              <div @click="agree3">
                <img src="@assets/images/detail/组 1890 拷贝.png" /><span
                  >赞成</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="agreereject  finishover" v-if="toupiaoagree">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>投票阶段</div>
            </div>

            <div class="bohui"></div>
            <div class="agreereject_detail " id="display">
              <div class="finish2"></div>
              <div>
                <img
                  src="@assets/images/detail/组 1895.png"
                  class="bohuiimg"
                />
                <span class="green">
                  投票同意
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="agreereject  finishover" v-if="toupiaoreject">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>投票阶段</div>
            </div>

            <div class="bohui"></div>
            <div class="agreereject_detail " id="display">
              <div class="finish3"></div>
              <div>
                <img
                  src="@assets/images/detail/组 1895 拷贝.png"
                  class="bohuiimg"
                />
                <span class="bohui">
                  投票驳回
                </span>
              </div>
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
            <div class="agreereject_detail">
              <div>
                <img src="@assets/images/detail/矩形 45 拷贝.png" /> 反对{{
                  level4.consCount
                }}
              </div>
              <div>
                {{ level4.prosCount }}
                赞成
                <img src="@assets/images/detail/矩形 45.png" />
              </div>
            </div>
            <div class="buttonprorej" v-if="deptId == '004'">
              <div @click.once="rejectjiean">
                <img src="@assets/images/detail/组 1890.png" /><span
                  >反对</span
                >
              </div>
              <div @click.once="agreejiean">
                <img src="@assets/images/detail/组 1890 拷贝.png" /><span
                  >赞成</span
                >
              </div>
            </div>
            <div class="buttonprorej" v-else></div>
          </div>
        </div>
        <div class="agreereject  finishover" v-if="jieanagree">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>结案阶段</div>
            </div>

            <div class="bohui"></div>
            <div class="agreereject_detail " id="display">
              <div class="finish2"></div>
              <div>
                <img
                  src="@assets/images/detail/组 1895.png"
                  class="bohuiimg"
                />
                <span class="green">
                  监督同意
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="agreereject  finishover" v-if="jieanreject">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>结案阶段</div>
            </div>

            <div class="bohui"></div>
            <div class="agreereject_detail " id="display">
              <div class="finish3"></div>
              <div>
                <img
                  src="@assets/images/detail/组 1895 拷贝.png"
                  class="bohuiimg"
                />
                <span class="bohui">
                  监督驳回
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="agreereject action"
          id="height"
          v-if="special"
          :class="{ displaycss: displays }"
        >
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>执行计划</div>
            </div>

            <textarea
              placeholder="输入您的执行计划"
              v-model="actionplan"
            ></textarea>
            <button class="submit" @click="planStates">提交</button>
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
              <div>
                <!-- <img src="@assets/images/detail/矩形 45 拷贝.png" /> 反对{{
                  finishLevel.consCount
                }} -->
              </div>

              <img
                src="@assets/images/proposal/多边形 1.png"
                v-if="percentage5 == 33"
                class="duobian"
                id="duobian1"
              />
              <div v-if="percentage5 == 33" id="firstpercentage5">
                1 票通过
                <!-- <img src="@assets/images/detail/矩形 45.png" /> -->
              </div>
              <img
                src="@assets/images/proposal/多边形 1.png"
                v-if="percentage5 == 66"
                class="duobian"
                id="duobian2"
              />
              <div v-if="percentage5 == 66" id="secondpercentage5">
                2 票通过
                <!-- <img src="@assets/images/detail/矩形 45.png" /> -->
              </div>
              <img
                src="@assets/images/proposal/多边形 1.png"
                v-if="percentage5 == 100"
                class="duobian"
                id="duobian3"
              />
              <div v-if="percentage5 == 100" id="thirdpercentage5">
                3 票通过
                <!-- <img src="@assets/images/detail/矩形 45.png" /> -->
              </div>
            </div>
            <div class="buttonprorej" v-if="deptId === '003'">
              <div id="btn">
                <!-- <img src="@assets/images/detail/组 1890.png" /><span
                  >反对</span
                > -->
              </div>
              <div @click.once="agreeaction">
                <img src="@assets/images/detail/组 1890 拷贝.png" /><span
                  >赞成</span
                >
              </div>
            </div>
            <div class="buttonprorej" v-else></div>
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
                <img
                  src="@assets/images/detail/组 1895.png"
                  class="bohuiimg"
                />
                <span class="green">
                  已完成
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="agreereject  finishover" v-if="actionreject">
          <div class="vote_vote">
            <div class="vote_vote_top">
              <div></div>
              <div>完成阶段</div>
            </div>

            <div class="bohui"></div>
            <div class="agreereject_detail " id="display">
              <div class="finish3"></div>
              <div>
                <img
                  src="@assets/images/detail/组 1895 拷贝.png"
                  class="bohuiimg"
                />
                <span class="bohui">
                  未完成
                </span>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>

    <!-- 底部 -->
    <div class="proposal_detail_foot">
      <div class="foot-top">
        <ul class="foot-box">
          <li>
            <div class="foot-box1">
              <div class="circle">
                <img
                  src="@assets/images/footer/github.png"
                  @click="github"
                  style="position:relative;left:10px"
                />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box1">
              <div class="circle">
                <img
                  src="@assets/images/footer/telegram.png"
                  @click="telegram"
                />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box2">
              <div class="circle">
                <img src="@assets/images/footer/twitter.png" @click="twitter" />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box3">
              <div class="circle">
                <img
                  src="@assets/images/footer/facebook.png"
                  @click="facebook"
                />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box5">
              <div class="circle">
                <img src="@assets/images/footer/weibo.png" @click="weibo" />
              </div>
            </div>
          </li>
           <li>
            <div class="foot-box6">
              <div class="circle">
                <img src="@assets/images/footer/reddit.png" @click="reddit" />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box7">
              <div class="circle">
                <img src="@assets/images/footer/medium.png" @click="medium" />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box4">
              <div
                class="circle"
                @mouseenter="gotoshow()"
                @mouseleave="gotohide()"
              >
                <img src="@assets/images/footer/erweima.png" />
              </div>
            </div>
          </li>
        </ul>
        <ul class="hovershow" v-if="show">
          <img src="@assets/images/indexhover/juxing.png" class="imgshow" />
          <li class="club">
            <img src="@assets/images/indexhover/club.png" />
            <br />
            <span>Energy Club</span>
          </li>
          <li class="wallet">
            <img src="@assets/images/indexhover/wallet.png" />
            <br />
            <span>Fastoken</span>
          </li>
        </ul>
        <div class="component">
          <span class="neirong" @click="index">{{ $t("index[0]") }}</span>
          <span>|</span>

          <span class="neirong" @click="faqs">FAQ</span>
          <span>|</span>
          <span class="neirong" @click="about">{{ $t("about[0]") }}</span>
          <span>|</span>
          <span class="neirong" @click="news">{{
            $t("Mediaannouncement[0]")
          }}</span>
        </div>
      </div>
      <div class="foot-zhong"></div>
      <footer>
        <p>{{ $t("shangbiao[0]") }}</p>
      </footer>
    </div>
  </div>
</template>

<script>
import CountDown from "vue2-countdown";
import { BASEURL } from "@api/api";
var qs = require("qs");
import Login from "@components/common/Login";
import votenumber from "@components/common/voteNumber";
import Forget from "@components/common/ForgetPassword";
import Fastoken from "@components/common/Fastoken";
import headerthird from "@components/common/headerthird";

export default {
  name: "partner",
  inject: ["reload"],
  data() {
    return {
      nowLang: "",
      fullscreenLoading: false,
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
      nowTime: "",
      endTime: "",
      countDownList: "投票时间已结束",
      // 流程阶段判定
      statestate: false,
      state: "",
      // 议事阶段
      level2: "",
      percentage2: "",
      yishistate: false,
      yishiagree: false,
      yishireject: false,
      // 投票阶段
      level3: "",
      percentage3: "",
      toupiaostate: false,
      toupiaoagree: false,
      toupiaoreject: false,
      wanchengstate: false,
      // 结案阶段
      level4: "",
      percentage4: "",
      jieanstate: false,
      jieanagree: false,
      jieanreject: false,
      // 行动阶段
      finishLevel: "",
      actionstate: false,
      percentage5: "",
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
    };
  },
  components: { Login, Forget, Fastoken, headerthird, votenumber, CountDown },
  created() {
    //  if (location.href.indexOf("#reloaded") == -1) {
    //   location.href = location.href + "#reloaded";
    //   location.reload();
    // }
    this.deptId = localStorage.getItem("deptId");
    // console.log(localStorage.getItem("token"));
    // if (!localStorage.getItem("token")) {
    //   this.$message.error("请先去登录或注册");

    //   this.$router.push({
    //     path: "/proposal",
    //   });
    // } else {
    // }
    // console.log(this.deptId);
    // console.log(this.$route.query.activityId);
    this.proposalDetail();
    this.countDown();
  },
  computed: {},
  mounted() {},
  methods: {
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
        let obj = null; // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          this.toupiaoend = true;
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
          // console.log(res);
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
          //  console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.result);
            this.reload();
          } else {
            this.$message.error(res.data.result);
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
            this.finishLevel = result.finishLevel;
            this.name = result.name;
            this.budget = result.budget;
            this.consAmount = result.consAmount;
            this.implPlan = result.implPlan;
            this.createTime = this.timestampToTime2(result.createTime);
            this.plan = result.plan;
            this.prosAmount = result.prosAmount;
            this.summary = result.summary;
            this.target = result.target;
            this.title = result.title;
            this.logs = result.logs;
            this.endTime = result.endTime;
            this.nowTime = result.nowTime;
            // console.log(this.nowTime);
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
            // 结案监督阶段
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
              var date = this.nowTime;
              //console.log(date);
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
            this.$message.error(res.data.result);
            localStorage.clear();
            this.$store.state.username = false;
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
            if (res.data.code === 200) {
              this.tellprogress = "";
              this.qita = true;
              this.$message.success(res.data.result);
              this.reload();
            } else {
              this.$message.error(res.data.result);
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
    faqs() {
      this.$router.push({
        path: "/FAQ",
      });
    },
    index() {
      this.$router.push({
        path: "/index",
      });
    },
    news() {
      this.$router.push({
        path: "/news",
      });
    },
    about() {
      this.$router.push({
        path: "/about",
      });
    },
    gotoshow() {
      this.show = true;
    },
    gotohide() {
      this.show = false;
    },
    github() {
      window.open("https://github.com/uenctech");
    },
    telegram() {
      window.open("https://t.me/UENCOfficial");
    },
    twitter() {
      window.open("https://twitter.com/uencclub");
    },
    facebook() {
      window.open("https://fb.me/uencclub");
    },
    weibo() {
      window.open("https://weibo.com/u/5580784739");
    },
     reddit() {
      window.open("https://www.reddit.com/r/UENC/");
    },
    medium() {
      window.open("https://uenc.medium.com/");
    },
    // 选择语言
  },
};
</script>
<style lang="less">
#now_end {
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 31px;
  opacity: 0.5;
  padding-top: 17px;
  font-style:normal;
}
@keyframes colorchange {
  0% {
    background: rgba(51, 51, 51, 1);
  }
  100% {
    background: rgba(0, 159, 205, 1);
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
#firstpercentage5 {
  position: relative;
  left: -690px;
  top: 20px;
}
#secondpercentage5 {
  position: relative;
  left: -328px;
  top: 20px;
}
#thirdpercentage5 {
  position: relative;
  left: -690px;
}
#specialprogress {
  .el-progress-bar__outer {
    background: rgba(255, 255, 255, 0.5) !important;
  }
}
// 样式修改
#actionlist {
  li {
    width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    //   display: flex;
    // flex-direction: row;
    // justify-content: space-around;
    // align-items: center;
    // word-break: break-all;
    // word-wrap: break-word;

    // background: red;
  }
}
.actionlist1 {
  //   width:479px!important;
  // background: red;
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
  width: 1200px;
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

    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #ffffff;
    line-height: 24px;
    margin-left: 20px !important;
  }
  button:nth-child(2) {
    width: 144px;
    height: 45px;
    background: #666666;
    border-radius: 10px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #ffffff;
    line-height: 24px;
    margin-right: 25px !important;
  }
}
.el-progress-bar__outer {
  background: #1f91d3 !important;
}
#heights {
  width: 1200px;
  height: auto;
  background: #333333;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 20px;
  .vote_vote_top {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 40px;
    padding-top: 40px;
    div:nth-child(1) {
      width: 4px;
      height: 23px;
      background: #009fcd;
    }
    div:nth-child(2) {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 30px;
      padding-left: 19px;
    }
  }
  .line {
    width: 1120px;
    height: 1px;
    background: #ffffff;
    opacity: 0.1;
    margin: 0 auto;
    margin-top: 40px;
  }
  .submit {
    margin-bottom: 30px;
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
  font-size: 16px;
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
  height: 357px;
}
#display {
  display: flex;
  flex-direction: column;
  width: 100%;
  div:nth-child(2) {
    padding-right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-left: 89%;
    .bohui {
      padding-right: 0;
      padding-left: 10px;
    }
  }
}
.submit {
  width: 144px;
  height: 45px;
  background: #656565;
  border-radius: 10px;
  text-align: center;
  margin-left: 85%;
  margin-top: 30px;

  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #ffffff;
  line-height: 24px;
}
.submit:hover {
  background: rgba(0, 159, 205, 1);
}
.time {
  color: #ffffff !important;
}

#particles-js {
  width: 100%;
  position: absolute;
  margin: 0 auto;
  height: 800px !important;
  z-index: 11; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}
#btn {
  border: none;
}
// 主线
.proposal_detail {
  width: 100%;
  height: auto;
  position: relative;
  .el-progress {
    padding-top: 40px !important;
  }
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
    background: url("../../assets/images/detail/detailbg.png") no-repeat
      center/100% 100%;
    z-index: 1;
    .partnertop-content {
      width: 1200px;
      height: 350px;
      margin: 0 auto;
      cursor: pointer;
      text-align: right;
      .top_title {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 300;
        color: #ffffff;
        position: relative;
        text-align: right;
        top: 90%;
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
    background: #0c0c0c;
    .proposal_detail_contentdetail {
       white-space: pre-line;
      width: 1200px;
      height: auto;
      margin: 0 auto;
      padding-bottom: 100px;
      .vote_title {
        width: 100%;
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 31px;
        text-align: center;
        padding-top: 81px;
      }
      .vote_name {
        width: 100%;
        text-align: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 31px;
        opacity: 0.5;
        padding-top: 30px;
      }
      ul {
        li {
          margin-top: 40px;
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
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #ffffff;
              line-height: 30px;
              padding-left: 15px;
            }
          }
          .vote_content_footer {
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 31px;
            opacity: 0.5;
            padding-top: 17px;
            width: 1200px;
            word-break: break-all;
            word-wrap: break-word;
          }
        }
      }
      .finishover {
        height: 152px !important;
      }
      .agreereject {
        width: 1200px;
        height: 246px;
        background: #333333;
        border-radius: 10px;
        margin-top: 60px;
        textarea {
          width: 1118px;
          height: 150px;
          background: rgba(51, 51, 51, 0.5);
          border-radius: 10px;
          margin-left: 2%;
          color: white;
          padding-left: 28px;
          margin-top: 30px;
          // margin-left: 40px;
          line-height: 20px;
        }
        .finish {
          width: 1120px;
          height: 10px;
          background: rgba(255, 255, 255, 0.1);

          border-radius: 5px;
          margin: 0 auto;
          margin-top: 40px;
        }
        .finish2 {
          width: 1118px;
          height: 10px;
          background: #1ed238 !important;
          border-radius: 5px;
          margin: 0 auto;
          margin-top: 20px;
        }
        .finish3 {
          width: 1118px;
          height: 10px;
          background: #972b2b !important;
          border-radius: 5px;
          margin: 0 auto;
          margin-top: 20px;
        }
        .vote_vote {
          position: relative;
          top: 40px;
          .vote_vote_top {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-left: 40px;
            .progress {
              font-size: 16px;
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
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #ffffff;
              line-height: 30px;
              padding-left: 19px;
            }
            div:nth-child(3) {
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #009fcd;
              line-height: 30px;
              padding-left: 10px;
            }
          }
        }
        .agreereject_detail {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-top: 10px;
          .bohui {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #bf3535;
            line-height: 22px;
            padding-right: 5%;
          }
          .bohuiimg {
            width: 18px;
            height: 18px;
            // padding-left: 90%;
            padding-top: 4px;
          }

          div:nth-child(1) {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #c03535;
            line-height: 22px;
            padding-left: 5%;
          }
          div:nth-child(2) {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #009fcd;
            line-height: 22px;
            padding-right: 5%;
          }
          div:nth-child(3) {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #009fcd;
            line-height: 22px;
            padding-right: 5%;
          }
          div:nth-child(4) {
            font-size: 16px;
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
            width: 125px;
            height: 40px;
            border: 2px solid #c03535;
            border-radius: 20px;
            padding-left: 5%;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #c03535;
            cursor: pointer;
            img {
              position: relative;
              padding-top: 6px;
              left: -20px !important;
            }
            span {
              position: relative;
              top: -5px;
              left: -6px;
            }
          }
          div:nth-child(2) {
            width: 125px;
            height: 40px;
            border: 2px solid #009fcd;
            border-radius: 20px;
            padding-left: 5%;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #009fcd;
            cursor: pointer;
            img {
              position: relative;
              padding-top: 6px;
              left: -20px !important;
            }
            span {
              position: relative;
              top: -5px;
              left: -6px;
            }
          }
        }
      }
    }
  }
  // 底部
  .proposal_detail_foot {
    width: 100%;
    height: 166px;
    background-color: #0c0c0c;
    position: relative;

    z-index: 20;
    .foot-top {
      width: 1200px;
      height: 111px;
      margin: 0 auto;
      display: flex;
      position: relative;
      flex-direction: row;
      justify-content: space-between;
      // z-index: 20;
      .foot-box {
        width: 500px;
        display: flex;
        flex-direction: row;
        position: relative;
        justify-content: space-between;
        img {
          align-content: center;
        }
        .circle {
          width: 40px;
          height: 40px;
          background: rgba(51, 51, 51, 1);
          position: relative;
          left: 5px;
          top: 5px;
          border-radius: 50%;
        }
        .foot-box1 {
          width: 50px;
          height: 50px;
          background: rgba(51, 51, 51, 1);
          border-radius: 50%;
          margin-top: 30px;
          img {
            position: relative;
            top: 9px;
            cursor: pointer;
            left: 15%;
          }
        }
        .foot-box1:hover {
          .circle {
            animation: colorchange 0.1s linear;
            animation-fill-mode: forwards;
          }
        }
        .foot-box2:hover {
          .circle {
            animation: colorchange 0.1s linear;
            animation-fill-mode: forwards;
          }
        }
        .foot-box3:hover {
          .circle {
            animation: colorchange 0.1s linear;
            animation-fill-mode: forwards;
          }
        }
        .foot-box5:hover {
          .circle {
            animation: colorchange 0.1s linear;
            animation-fill-mode: forwards;
          }
        }
        .foot-box3 {
          img {
            left: 33% !important;
          }
        }
        .foot-box2,
        .foot-box3,
        .foot-box4,
        .foot-box5 {
          width: 50px;
          height: 50px;
          background: rgba(51, 51, 51, 1);
          border-radius: 50%;
          position: relative;
          // margin-left: 40px;
          margin-top: 30px;
          img {
            cursor: pointer;
            position: relative;
            top: 7px;
            left: 17%;
          }
        }
        .foot-box4:hover {
          .circle {
            animation: colorchange 0.1s linear;
            animation-fill-mode: forwards;
          }
        }
      }
      .component {
       line-height: 110px;
        span {
          margin-left: 39px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          cursor: pointer;
        }
      }
    }
    .foot-zhong {
      width: 100%;
      height: 1px;
      background: rgba(0, 159, 205, 1);
    }
    footer p {
      margin: 0 auto;
      width: 372px;
      height: 13px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 42px;
      text-align: center;
    }
    .hovershow {
      display: flex;
      flex-direction: row;
      position: absolute;
      top: -97px;
      left: 42%;
      float: left;
      z-index: 30;
      opacity: 1;
      .imgshow {
        width: 310px;
        height: 181px;
        position: relative;
      }
      .club {
        width: 120px;
        height: 120px;
        position: relative;
        left: -280px;
        top: 20px;
        span {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 24px;
          position: relative;
          left: 9px;
        }
      }
      .wallet {
        width: 120px;
        height: 120px;
        position: relative;
        left: -260px;
        top: 20px;
        span {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 24px;
          position: relative;
          left: 18px;
        }
        img {
          width: 120px;
          height: 120px;
        }
      }
    }
  }
}
</style>

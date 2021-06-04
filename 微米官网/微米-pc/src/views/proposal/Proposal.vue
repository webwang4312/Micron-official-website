<template>
  <div class="proposal">
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

    <div class="partnertop">
      <headersecond></headersecond>
      <div class="partnertop-content">
        <span class="top_title"
          ><img
            src="@assets/images/header/主页.png"
            @click="index()"
            style="position: relative;top:2px;left:-3px"
          />
          <span>当前位置:</span>
          <span>关于社区></span>
          提案</span
        >
      </div>
    </div>
    <div class="partnerfooter">
      <div class="partnerfooter-content">
        <div class="partnerfooter_ce">
          <input
            type="text"
            placeholder="请输入标题或名字"
            class="search"
            v-model="searchnumber"
            @keyup="enter"
          />
          <img
            src="@assets/images/proposal/搜索.png"
            class="searchimg"
            @click="searchAll"
          />

          <button @click="fabu" class="fabu">
            <img
              src="@assets/images/proposal/组 2.png"
              class="searchimg2"
            /><span>发布</span>
          </button>
        </div>

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first" class="votefirst"
            ><ul id="all_list" v-if="voteall.length !== 0">
              <li
                v-for="item in voteall"
                :key="item"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>提议人</span><br /><span>{{ item.name }}</span>
                </div>

                <div class="vote_time">
                  <span>创建时间</span><br /><span>{{ item.createTime }}</span>
                </div>
                <!-- 已完成已结案 -->
                <div
                  class="vote_vote"
                  v-if="item.state === '4' || item.state === '5'"
                >
                  <img src="@assets/images/proposal/组 7(2).png" alt="" />
                </div>
                <!-- 议事中 -->
                <div class="vote_vote" v-else-if="item.state === '1'">
                  <img src="@assets/images/proposal/组 7(2).png" alt="" />
                </div>
                <!-- 投票中行动中 -->
                <div
                  class="vote_vote"
                  v-else-if="item.state === '2' || item.state === '3'"
                >
                  <img src="@assets/images/proposal/组 7(3).png" alt="" />
                </div>
                <!-- 驳回 -->
                <div
                  class="vote_vote"
                  v-else-if="
                    item.state === '-2' ||
                      item.state === '-3' ||
                      item.state === '-5' ||
                      item.state === '-4'
                  "
                >
                  <img src="@assets/images/proposal/组 7(1).png" alt="" />
                </div>
                <div class="vote_type" v-if="item.state === '1'">
                  <span>议事中</span>
                </div>
                <div class="vote_type" v-else-if="item.state === '4'">
                  <span>结案中</span>
                </div>
                <div class="vote_type" v-else-if="item.state === '3'">
                  <span>行动中</span>
                </div>
                <div class="vote_type" v-else-if="item.state === '-2'">
                  <span>审议驳回</span>
                </div>
                <div class="vote_type" v-else-if="item.state === '-3'">
                  <span>投票驳回</span>
                </div>
                <div class="vote_type" v-else-if="item.state === '2'">
                  <span>投票中</span>
                </div>
                <div
                  class="vote_type"
                  v-else-if="item.state === '-5' || item.state === '-4'"
                >
                  <span>监督驳回</span>
                </div>
                <div class="vote_type" v-else-if="item.state === '5'">
                  <span>结案通过</span>
                </div>
              </li>
            </ul>
            <div class="kongbai" v-else>
              <img src="@assets/images/proposal/矢量智能对象.png" />
              <div>暂无更多数据</div>
            </div>
            <div class="block">
              <el-pagination
                :current-page.sync="voteallnumber"
                :page-size="8"
                :pager-count="5"
                layout="prev, pager, next"
                :total="alltotal"
                @current-change="allChange"
                v-if="alltotal != 0"
                ref="transactionpagination"
              ></el-pagination></div
          ></el-tab-pane>
          <el-tab-pane label="议事中" name="second" class="votefirst"
            ><ul id="all_list" v-if="votein.length !== 0">
              <li
                v-for="item in votein"
                :key="item"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>提议人</span><br /><span>{{ item.name }}</span>
                </div>

                <div class="vote_time">
                  <span>创建时间</span><br /><span>{{ item.createTime }}</span>
                </div>
                <div class="vote_vote">
                  <img src="@assets/images/proposal/组 7(2).png" alt="" />
                </div>
                <div class="vote_type">
                  <span>议事中</span>
                </div>
              </li>
            </ul>
            <div class="kongbai" v-else>
              <img src="@assets/images/proposal/矢量智能对象.png" />
              <div>暂无更多数据</div>
            </div>
            <div class="block">
              <el-pagination
                :current-page.sync="voteinnumber"
                :page-size="8"
                :pager-count="5"
                layout="prev, pager, next"
                :total="intotal"
                @current-change="inChange"
                v-if="intotal != 0"
                ref="transactionpagination"
              ></el-pagination></div
          ></el-tab-pane>
          <el-tab-pane label="投票中" name="third" class="votefirst"
            ><ul id="all_list" v-if="voteend.length !== 0">
              <li
                v-for="item in voteend"
                :key="item"
                @click="
                  goToVoteDetail(
                    item.activityId,
                    item.state,
                    item.name,
                    item.createTime
                  )
                "
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>提议人</span><br /><span>{{ item.name }}</span>
                </div>

                <div class="vote_time">
                  <span>创建时间</span><br /><span>{{ item.createTime }}</span>
                </div>
                <div class="vote_vote">
                  <img src="@assets/images/proposal/组 7(3).png" alt="" />
                </div>
                <div class="vote_type">
                  <span>投票中</span>
                </div>
              </li>
            </ul>
            <div class="kongbai" v-else>
              <img src="@assets/images/proposal/矢量智能对象.png" />
              <div>暂无更多数据</div>
            </div>
            <div class="block">
              <el-pagination
                :current-page.sync="voteendnumber"
                :page-size="8"
                :pager-count="5"
                layout="prev, pager, next"
                :total="endtotal"
                @current-change="endChange"
                v-if="endtotal != 0"
                ref="transactionpagination"
              ></el-pagination></div
          ></el-tab-pane>
          <el-tab-pane label="行动中" name="fourth" class="votefirst"
            ><ul id="all_list" v-if="voteagree.length !== 0">
              <li
                v-for="item in voteagree"
                :key="item"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>提议人</span><br /><span>{{ item.name }}</span>
                </div>

                <div class="vote_time">
                  <span>创建时间</span><br /><span>{{ item.createTime }}</span>
                </div>
                <div class="vote_vote">
                  <img src="@assets/images/proposal/组 7(3).png" alt="" />
                </div>
                <div class="vote_type">
                  <span>行动中</span>
                </div>
              </li>
            </ul>
            <div class="kongbai" v-else>
              <img src="@assets/images/proposal/矢量智能对象.png" />
              <div>暂无更多数据</div>
            </div>
            <div class="block">
              <el-pagination
                :current-page.sync="voteagreenumber"
                :page-size="8"
                :pager-count="5"
                layout="prev, pager, next"
                :total="agreetotal"
                @current-change="agreeChange"
                v-if="agreetotal != 0"
                ref="transactionpagination"
              ></el-pagination></div
          ></el-tab-pane>
          <el-tab-pane label="结案中" name="five" class="votefirst"
            ><ul id="all_list" v-if="votereject.length !== 0">
              <li
                v-for="item in votereject"
                :key="item"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>提议人</span><br /><span>{{ item.name }}</span>
                </div>

                <div class="vote_time">
                  <span>创建时间</span><br /><span>{{ item.createTime }}</span>
                </div>
                <div class="vote_vote">
                  <img src="@assets/images/proposal/组 7(2).png" alt="" />
                </div>
                <div class="vote_type">
                  <span>结案中</span>
                </div>
              </li>
            </ul>
            <div class="kongbai" v-else>
              <img src="@assets/images/proposal/矢量智能对象.png" />
              <div>暂无更多数据</div>
            </div>
            <div class="block">
              <el-pagination
                :current-page.sync="voterejectnumber"
                :page-size="8"
                :pager-count="5"
                layout="prev, pager, next"
                :total="rejecttotal"
                @current-change="rejectChange"
                v-if="rejecttotal != 0"
                ref="transactionpagination"
              ></el-pagination></div
          ></el-tab-pane>
          <el-tab-pane label="已结案" name="six" class="votefirst">
            <ul id="all_list" v-if="votejiean.length !== 0">
              <li
                v-for="item in votejiean"
                :key="item"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>提议人</span><br /><span>{{ item.name }}</span>
                </div>

                <div class="vote_time">
                  <span>创建时间</span><br /><span>{{ item.createTime }}</span>
                </div>
                <div class="vote_vote">
                  <img src="@assets/images/proposal/组 7(2).png" alt="" />
                </div>
                <div class="vote_type">
                  <span>已结案</span>
                </div>
              </li>
            </ul>
            <div class="kongbai" v-else>
              <img src="@assets/images/proposal/矢量智能对象.png" />
              <div>暂无更多数据</div>
            </div>
            <div class="block">
              <el-pagination
                :current-page.sync="votejieannumber"
                :page-size="8"
                :pager-count="5"
                layout="prev, pager, next"
                :total="jieantotal"
                @current-change="jieanChange"
                v-if="jieantotal != 0"
                ref="transactionpagination"
              ></el-pagination></div
          ></el-tab-pane>
          <el-tab-pane label="驳回" name="seven" class="votefirst">
            <ul id="all_list" v-if="votebohui.length !== 0">
              <li
                v-for="item in votebohui"
                :key="item"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>提议人</span><br /><span>{{ item.name }}</span>
                </div>

                <div class="vote_time">
                  <span>创建时间</span><br /><span>{{ item.createTime }}</span>
                </div>
                <div class="vote_vote">
                  <img src="@assets/images/proposal/组 7(1).png" alt="" />
                </div>

                <div class="vote_type" v-if="item.state === '-2'">
                  <span>审议驳回</span>
                </div>

                <div class="vote_type" v-else-if="item.state === '-3'">
                  <span>投票驳回</span>
                </div>
                <div
                  class="vote_type"
                  v-else-if="item.state === '-5' || item.state === '-4'"
                >
                  <span>监督驳回</span>
                </div>
              </li>
            </ul>
            <div class="kongbai" v-else>
              <img src="@assets/images/proposal/矢量智能对象.png" />
              <div>暂无更多数据</div>
            </div>
            <div class="block">
              <el-pagination
                :current-page.sync="votebohuinumber"
                :page-size="8"
                :pager-count="5"
                layout="prev, pager, next"
                :total="bohuitotal"
                @current-change="bohuiChange"
                v-if="bohuitotal != 0"
                ref="transactionpagination"
              ></el-pagination></div
          ></el-tab-pane>
          <el-tab-pane
            label="搜索结果"
            name="eight"
            class="votefirst"
            v-if="votealllist.length !== 0"
            ><ul id="all_list">
              <li
                v-for="item in votealllist"
                :key="item"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>提议人</span><br /><span>{{ item.name }}</span>
                </div>

                <div class="vote_time">
                  <span>创建时间</span><br /><span>{{ item.createTime }}</span>
                </div>
                <!-- 已完成已结案 -->
                <div
                  class="vote_vote"
                  v-if="item.state === '4' || item.state === '5'"
                >
                  <img src="@assets/images/proposal/组 7(2).png" alt="" />
                </div>
                <!-- 议事中 -->
                <div class="vote_vote" v-else-if="item.state === '1'">
                  <img src="@assets/images/proposal/组 7(2).png" alt="" />
                </div>
                <!-- 投票中行动中 -->
                <div
                  class="vote_vote"
                  v-else-if="item.state === '2' || item.state === '3'"
                >
                  <img src="@assets/images/proposal/组 7(3).png" alt="" />
                </div>
                <!-- 驳回 -->
                <div
                  class="vote_vote"
                  v-else-if="
                    item.state === '-2' ||
                      item.state === '-3' ||
                      item.state === '-5'
                  "
                >
                  <img src="@assets/images/proposal/组 7(1).png" alt="" />
                </div>
                <div class="vote_type" v-if="item.state === '1'">
                  <span>议事中</span>
                </div>
                <div class="vote_type" v-else-if="item.state === '4'">
                  <span>已完成</span>
                </div>
                <div class="vote_type" v-else-if="item.state === '3'">
                  <span>行动中</span>
                </div>
                <div class="vote_type" v-else-if="item.state === '-2'">
                  <span>审议驳回</span>
                </div>
                <div class="vote_type" v-else-if="item.state === '-3'">
                  <span>投票驳回</span>
                </div>

                <div class="vote_type" v-else-if="item.state === '2'">
                  <span>投票中</span>
                </div>
                <div
                  class="vote_type"
                  v-else-if="item.state === '-5' || item.state === '-4'"
                >
                  <span>监督驳回</span>
                </div>
                <div class="vote_type" v-else-if="item.state === '5'">
                  <span>结案通过</span>
                </div>
              </li>
            </ul>
            <div class="block">
              <el-pagination
                :current-page.sync="votealllistnumber"
                :page-size="8"
                :pager-count="5"
                layout="prev, pager, next"
                :total="alllisttotal"
                @current-change="alllistChange"
                v-if="alllisttotal != 0"
                ref="transactionpagination"
              ></el-pagination></div
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 底部 -->
    <div class="proposaluenc_foot">
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
import { BASEURL } from "@api/api";
var qs = require("qs");
import Login from "@components/common/Login";
import Forget from "@components/common/ForgetPassword";
import Fastoken from "@components/common/Fastoken";
import headersecond from "@components/common/headersecond";
export default {
  name: "partner",
  data() {
    return {
      nowLang: "",
      fullscreenLoading: false,
      show: false,
      iconshow: false,
      transform: false,
      login: true,
      activeName: "first",
      searchnumber: "",
      ceshinumber: 8,
      // 全部查找
      votealllist: [],
      votealllistnumber: 1,
      alllisttotal: "",
      // 全部类型
      voteall: [],
      voteallnumber: 1,
      alltotal: "",
      // 议事中
      votein: [],
      voteinnumber: 1,
      intotal: "",
      // 投票中
      voteend: [],
      voteendnumber: 1,
      endtotal: "",
      // 行动中
      voteagree: [],
      voteagreenumber: 1,
      agreetotal: "",
      // 已完成
      votereject: [],
      voterejectnumber: 1,
      rejecttotal: "",
      // 已结案
      votejiean: [],
      votejieannumber: 1,
      jieantotal: "",
      // 驳回
      votebohui: [],
      votebohuinumber: 1,
      bohuitotal: "",
    };
  },
  components: { Login, Forget, Fastoken, headersecond },
  created() {
    window.scrollTo(0, 0);
    // 全部查找
    this.votealllistnumber = 1;
    this.voteallnumber = 1;
    this.voteinnumber = 1;
    this.voteendnumber = 1;
    this.voteagreenumber = 1;
    this.votejieannumber = 1;
    this.voterejectnumber = 1;

    this.getVoteAll();
    this.inVoteAll();
    this.endVoteAll();
    this.agreeVoteAll();
    this.rejectVoteAll();
    this.jieanVoteAll();
    this.bohuiVoteAll();
  },
  computed: {},
  beforeUpdated() {
    // window.onbeforeunload = function(e) {
    //   var storage = window.localStorage;
    //   storage.clear();
    // };
  },
  beforeDestroy() {
    // window.onbeforeunload = function(e) {
    //   var storage = window.localStorage;
    //   storage.clear();
    // };
    // 滚动设置
    window.addEventListener("scroll", this.getScroll);
  },
  mounted() {},
  methods: {
    headersecond() {
      this.huiceng = true;
      // console.log(this.$refs.login.check);
    },
    enter(event) {
      // console.log(event);
      if (this.searchnumber !== "") {
        if (event.keyCode == "13") {
          this.searchAll();
        }
      }
    },
    // 搜索查找
    async searchAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/getAllActivity ",
          qs.stringify({
            type: 0,
            pageNum: this.votealllistnumber,
            pageSize: 8,
            keywords: this.searchnumber,
          })
        )
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            if (res.data.result.total !== 0) {
              this.activeName = "eight";
              this.votealllist = res.data.result.list;
              // 页数
              this.alllisttotal = res.data.result.total;
              // console.log(this.alltotal);
              for (let i = 0; i < res.data.result.list.length; i++) {
                if (this.votealllist[i].name.length > 10) {
                  this.votealllist[i].name =
                    res.data.result.list[i].name.substring(0, 10) + "...";
                } else {
                  this.votealllist[i].name = res.data.result.list[i].name;
                }
                if (this.votealllist[i].title.length > 7) {
                  this.votealllist[i].title =
                    res.data.result.list[i].title.substring(0, 7) + "...";
                } else {
                  this.votealllist[i].title = res.data.result.list[i].title;
                }
                if (this.votealllist[i].summary.length > 10) {
                  this.votealllist[i].summary =
                    res.data.result.list[i].summary.substring(0, 8) + "...";
                } else {
                  this.votealllist[i].summary = res.data.result.list[i].summary;
                }
                this.votealllist[i].endTime = this.timestampToTime2(
                  res.data.result.list[i].endTime
                );

                this.votealllist[i].createTime = this.timestampToTime2(
                  res.data.result.list[i].createTime
                );
              }
            } else {
              this.$message.error("无搜索结果");
            }
          }
          // if (res.data.code === 200) {
          //   let routeData = this.$router.resolve({
          //     path: "/proposaldetail",
          //     query: { activityId: activityId },
          //   });
          //   window.open(routeData.href, "_blank");
          // } else {
          //   this.$message.error("请输入有效的搜索条件");
          // }
        });
    },
    alllistChange() {
      this.votealllistnumber = val;
      this.setContextData("currentpage", this.votealllistnumber);
      this.searchAll();
    },
    allChange(val) {
      // console.log(val);
      this.voteallnumber = val;
      this.setContextData("currentpage", this.voteallnumber);
      this.getVoteAll();
    },
    inChange(val) {
      this.voteinnumber = val;
      this.setContextData("currentpage", this.voteinnumber);
      this.inVoteAll();
    },
    endChange(val) {
      this.voteendnumber = val;
      this.setContextData("currentpage", this.voteendnumber);
      this.endVoteAll();
    },
    agreeChange(val) {
      this.voteagreenumber = val;
      this.setContextData("currentpage", this.voteagreenumber);
      this.agreeVoteAll();
    },
    rejectChange(val) {
      this.voterejectnumber = val;
      this.setContextData("currentpage", this.voterejectnumber);
      this.rejectVoteAll();
    },
    jieanChange(val) {
      this.votejieannumber = val;
      this.setContextData("currentpage", this.votejieannumber);
      this.jieanVoteAll();
    },
    bohuiChange(val) {
      this.votebohuinumber = val;
      this.setContextData("currentpage", this.votebohuinumber);
      this.bohuiVoteAll();
    },

    // 投票获取
    async getVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/getAllActivity ",
          qs.stringify({
            type: 0,
            pageNum: this.voteallnumber,
            pageSize: 8,
          })
        )
        .then((res) => {
           //console.log(res);
          // console.log(res.data.result.list);
          // 全部类型
          this.voteall = res.data.result.list;
          // 页数
          this.alltotal = res.data.result.total;
          // console.log(this.alltotal);
          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.voteall[i].name.length > 10) {
              this.voteall[i].name =
                res.data.result.list[i].name.substring(0, 10) + "...";
            } else {
              this.voteall[i].name = res.data.result.list[i].name;
            }
            if (this.voteall[i].title.length > 7) {
              this.voteall[i].title =
                res.data.result.list[i].title.substring(0, 7) + "...";
            } else {
              this.voteall[i].title = res.data.result.list[i].title;
            }
            if (this.voteall[i].summary.length > 10) {
              this.voteall[i].summary =
                res.data.result.list[i].summary.substring(0, 8) + "...";
            } else {
              this.voteall[i].summary = res.data.result.list[i].summary;
            }

            this.voteall[i].endTime = this.timestampToTime2(
              res.data.result.list[i].endTime
            );

            this.voteall[i].createTime = this.timestampToTime2(
              res.data.result.list[i].createTime
            );
          }
          // console.log(this.voteall);
        });
    },
    async inVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/getAllActivity",
          qs.stringify({
            type: 1,
            pageNum: this.voteinnumber,
            pageSize: 8,
          })
        )
        .then((res) => {
          // 全部类型
          this.votein = res.data.result.list;
          // 页数
          this.intotal = res.data.result.total;

          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.votein[i].name.length > 7) {
              this.votein[i].name =
                res.data.result.list[i].name.substring(0, 7) + "...";
            } else {
              this.votein[i].name = res.data.result.list[i].name;
            }
            if (this.votein[i].title.length > 7) {
              this.votein[i].title =
                res.data.result.list[i].title.substring(0, 7) + "...";
            } else {
              this.votein[i].title = res.data.result.list[i].title;
            }
            if (this.votein[i].summary.length > 10) {
              this.votein[i].summary =
                res.data.result.list[i].summary.substring(0, 8) + "...";
            } else {
              this.votein[i].summary = res.data.result.list[i].summary;
            }

            this.votein[i].endTime = this.timestampToTime2(
              res.data.result.list[i].endTime
            );

            this.votein[i].createTime = this.timestampToTime2(
              res.data.result.list[i].createTime
            );
          }
        });
    },
    async endVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/getAllActivity ",
          qs.stringify({
            type: 2,
            pageNum: this.voteendnumber,
            pageSize: 8,
          })
        )
        .then((res) => {
          //  console.log(res);
          // 全部类型
          this.voteend = res.data.result.list;
          // 页数
          this.endtotal = res.data.result.total;

          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.voteend[i].name.length > 7) {
              this.voteend[i].name =
                res.data.result.list[i].name.substring(0, 7) + "...";
            } else {
              this.voteend[i].name = res.data.result.list[i].name;
            }
            if (this.voteend[i].title.length > 7) {
              this.voteend[i].title =
                res.data.result.list[i].title.substring(0, 7) + "...";
            } else {
              this.voteend[i].title = res.data.result.list[i].title;
            }
            if (this.voteend[i].summary.length > 10) {
              this.voteend[i].summary =
                res.data.result.list[i].summary.substring(0, 8) + "...";
            } else {
              this.voteend[i].summary = res.data.result.list[i].summary;
            }

            this.voteend[i].endTime = this.timestampToTime2(
              res.data.result.list[i].endTime
            );
            this.voteend[i].createTime = this.timestampToTime2(
              res.data.result.list[i].createTime
            );
          }
        });
    },
    async agreeVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/getAllActivity ",
          qs.stringify({
            type: 3,
            pageNum: this.voteagreenumber,
            pageSize: 8,
          })
        )
        .then((res) => {
          // console.log(res);
          // 全部类型
          this.voteagree = res.data.result.list;
          // 页数
          this.agreetotal = res.data.result.total;

          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.voteagree[i].name.length > 7) {
              this.voteagree[i].name =
                res.data.result.list[i].name.substring(0, 7) + "...";
            } else {
              this.voteagree[i].name = res.data.result.list[i].name;
            }
            if (this.voteagree[i].title.length > 7) {
              this.voteagree[i].title =
                res.data.result.list[i].title.substring(0, 7) + "...";
            } else {
              this.voteagree[i].title = res.data.result.list[i].title;
            }
            if (this.voteagree[i].summary.length > 10) {
              this.voteagree[i].summary =
                res.data.result.list[i].summary.substring(0, 8) + "...";
            } else {
              this.voteagree[i].summary = res.data.result.list[i].summary;
            }

            this.voteagree[i].endTime = this.timestampToTime2(
              res.data.result.list[i].endTime
            );
            this.voteagree[i].createTime = this.timestampToTime2(
              res.data.result.list[i].createTime
            );
          }
        });
    },
    async rejectVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/getAllActivity ",
          qs.stringify({
            type: 4,
            pageNum: this.voterejectnumber,
            pageSize: 8,
          })
        )
        .then((res) => {
          //  console.log(res);
          // 全部类型
          this.votereject = res.data.result.list;
          // 页数
          this.rejecttotal = res.data.result.total;
          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.votereject[i].name.length > 7) {
              this.votereject[i].name =
                res.data.result.list[i].name.substring(0, 7) + "...";
            } else {
              this.votereject[i].name = res.data.result.list[i].name;
            }
            if (this.votereject[i].title.length > 7) {
              this.votereject[i].title =
                res.data.result.list[i].title.substring(0, 7) + "...";
            } else {
              this.votereject[i].title = res.data.result.list[i].title;
            }
            if (this.votereject[i].summary.length > 10) {
              this.votereject[i].summary =
                res.data.result.list[i].summary.substring(0, 8) + "...";
            } else {
              this.votereject[i].summary = res.data.result.list[i].summary;
            }

            this.votereject[i].endTime = this.timestampToTime2(
              res.data.result.list[i].endTime
            );
            this.votereject[i].createTime = this.timestampToTime2(
              res.data.result.list[i].createTime
            );
          }
        });
    },
    async jieanVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/getAllActivity ",
          qs.stringify({
            type: 5,
            pageNum: this.votejieannumber,
            pageSize: 8,
          })
        )
        .then((res) => {
          //  console.log(res);
          // 全部类型
          this.votejiean = res.data.result.list;
          // 页数
          this.jieantotal = res.data.result.total;
          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.votejiean[i].name.length > 7) {
              this.votejiean[i].name =
                res.data.result.list[i].name.substring(0, 7) + "...";
            } else {
              this.votejiean[i].name = res.data.result.list[i].name;
            }
            if (this.votejiean[i].title.length > 7) {
              this.votejiean[i].title =
                res.data.result.list[i].title.substring(0, 7) + "...";
            } else {
              this.votejiean[i].title = res.data.result.list[i].title;
            }
            if (this.votejiean[i].summary.length > 10) {
              this.votejiean[i].summary =
                res.data.result.list[i].summary.substring(0, 8) + "...";
            } else {
              this.votejiean[i].summary = res.data.result.list[i].summary;
            }

            this.votejiean[i].endTime = this.timestampToTime2(
              res.data.result.list[i].endTime
            );
            this.votejiean[i].createTime = this.timestampToTime2(
              res.data.result.list[i].createTime
            );
          }
        });
    },
    async bohuiVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/getAllActivity",
          qs.stringify({
            type: -5,
            pageNum: this.votebohuinumber,
            pageSize: 8,
          })
        )
        .then((res) => {
          // console.log(res);
          // 全部类型
          this.votebohui = res.data.result.list;
          // 页数
          this.bohuitotal = res.data.result.total;
          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.votebohui[i].name.length > 7) {
              this.votebohui[i].name =
                res.data.result.list[i].name.substring(0, 7) + "...";
            } else {
              this.votebohui[i].name = res.data.result.list[i].name;
            }
            if (this.votebohui[i].title.length > 7) {
              this.votebohui[i].title =
                res.data.result.list[i].title.substring(0, 7) + "...";
            } else {
              this.votebohui[i].title = res.data.result.list[i].title;
            }
            if (this.votebohui[i].summary.length > 10) {
              this.votebohui[i].summary =
                res.data.result.list[i].summary.substring(0, 8) + "...";
            } else {
              this.votebohui[i].summary = res.data.result.list[i].summary;
            }

            this.votebohui[i].endTime = this.timestampToTime2(
              res.data.result.list[i].endTime
            );
            this.votebohui[i].createTime = this.timestampToTime2(
              res.data.result.list[i].createTime
            );
          }
        });
    },
    setContextData: function(key, value) {
      if (typeof value == "string") {
        sessionStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
    // 从sessionStorage取值
    getContextData: function(key) {
      const str = sessionStorage.getItem(key);
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch (e) {
          return str;
        }
      }
      return;
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
    // 跳转提案详情页
    goToproposalDetail(index, state) {
      if (!localStorage.getItem("token")) {
        this.$message.error("请先去登录或注册");
      } else {
        // console.log(index, state);
        this.$router.push({
          path: "/proposaldetail",
          query: { activityId: index, state: state },
        });
        // let routeData = this.$router.resolve({
        //   path: "/proposaldetail",
        //   query: { activityId: index, state: state },
        // });
        // window.open(routeData.href, "_blank");
      }
    },
    goToVoteDetail(index, state, name, createtime) {
      this.$router.push({
        path: "/votedetail",
        query: {
          activityId: index,
          state: state,
          name: name,
          createtime: createtime,
        },
      });
      // console.log(index);
      // let routeData = this.$router.resolve({
      //   path: "/votedetail",
      //   query: { activityId: index, state: state },
      // });
      // window.open(routeData.href, "_blank");
    },
    // 发布提案
    fabu() {
      if (!localStorage.getItem("token")) {
        this.$message.error("请先登录您的账号信息");
        // setTimeout(() => {
        //   this.$router.push({ path: "/proposal" });
        // }, 3000);
      } else if (
        localStorage.getItem("walletAddress") === "" ||
        localStorage.getItem("walletAddress") === null
      ) {
        this.$message.error("请先绑定您的钱包账户");
      } else {
        let routeData = this.$router.resolve({
          path: "/toproposal",
        });
        window.open(routeData.href, "_blank");
      }
    },
    gorouter(index) {
      // console.log(index)
      this.$router.push({ path: index });
    },

    faqs() {
      this.$router.push({
        path: "/FAQ",
      });
    },
    index() {
      this.$router.push({
        path: "/",
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
.kongbai {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  div {
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 22px;
    margin-top: 40px;
  }
}
.el-dialog,
.el-pager li {
  background: none !important;
}
.el-icon {
  font-size: 24px !important;
}
.el-dialog,
.el-pager li {
  background: none;
  font-size: 20px !important;
  font-family: PingFang SC;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 10px;
}
.el-pager li.active {
  background: #009fcd !important;
  border-radius: 10px;
  color: #ffffff !important;
}
.btn-prev {
  background: none !important;
}
.btn-next {
  background: none !important;
}
.block {
  width: 1020px;
  margin: 0 auto;
  text-align: center;
  margin-top: 20px;
}
.el-tabs__item {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5) !important;
  line-height: 22px;
}
.is-active {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 600;
  color: #ffffff !important;
  line-height: 22px;
}
.el-tabs__nav-wrap::after {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
.el-tabs__active-bar {
  width: 36px;
  height: 2px;
  background: #009fcd;
}
.el-tabs__content {
  color: white;
  .votefirst {
    width: 1200px;
    height: auto;
    .el-progress-bar__outer {
      background: blue;
    }
    .el-progress__text {
      display: none;
    }
    #all_list {
      li {
        width: 1200px;
        height: 105px;
        background: #333333;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-top: 20px;
        line-height: 30px;
        cursor: pointer;
        div {
          width: 150px;
          height: auto;
        }
        .vote_title {
          span:nth-child(1) {
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 300;
            color: #ffffff;
          }
          span:nth-child(3) {
            padding-top: 15px;
            margin-top: 15px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.3);
          }
        }
        .vote_time {
          span:nth-child(1) {
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 300;
            color: #ffffff;
          }
          span:nth-child(3) {
            padding-top: 15px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.3);
          }
        }
        .vote_vote {
          width: 240px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          span:nth-child(1) {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 300;
            color: #c83535;
            line-height: 22px;
          }
          span:nth-child(3) {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 300;
            color: #009fcd;
            line-height: 22px;
          }
        }
        .vote_type {
          span {
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 300;
            color: #ffffff;
            line-height: 22px;
          }
        }
      }
    }
  }
}
#particles-js {
  width: 100%;
  position: absolute;
  margin: 0 auto;
  height: 800px !important;
  z-index: 11; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}

// 主线
.proposal {
  width: 100%;
  height: auto;
  position: relative;
  .el-tabs__item {
    padding: 0 16px !important;
  }
  .proposaltop {
    height: 150px;
    background: black;
    z-index: 999;
    .proposalzong {
      width: 1200px;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      position: relative;
      height: 100%;
      margin: 0 auto;
      button {
        height: 100%;
        align-content: center;
        align-items: center;
      }
    }
    .header-left {
      img {
        width: 147.7px;
        height: 58.7px;
      }
    }
    .header-right {
      position: relative;
      width: 250px;
      left: 400px;
      top: 10px;
      li {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .loginregister {
      position: absolute;
      left: 1000px;
    }
    .header_selsetz {
      width: 100px;
      height: 180px;

      position: absolute;
      left: 1000px;
      margin-top: 90px;
      z-index: 999;
      cursor: pointer;
    }
    .header_ulul {
      width: 100px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      font-size: 18px !important;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      z-index: 999;
      position: absolute;
      left: 1000px;
      top: 100px;
      cursor: pointer;
      ul {
        li {
          margin-top: 20px;
          text-align: center;
        }
        margin-top: -100px;
      }
    }
    .selbutton {
      position: absolute;
      left: 850px;
      top: 70px;
    }
  }
  .partnertop {
    height: 500px;
    position: relative;
    margin: 0 auto;
    background: url("../../assets/images/proposal/bg.png") no-repeat center/100%
      100%;
    z-index: 1;
    .partnertop-content {
      width: 1200px;
      height: 300px;
      margin: 0 auto;
      text-align: right;
      .top_title {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 300;
        color: #ffffff;
        position: relative;
      
        top: 270px;
        cursor: pointer;
      }
    }
    // 头部内容区域
  }
  .partnerfooter {
    width: 100%;
    height: auto;
    position: relative;
    background-color: #0c0c0c;
    padding-top: 87px;
    .partnerfooter-content {
      width: 1200px;
      height: auto;
      margin: 0 auto;

      .partnerfooter_ce {
        width: 393px;

        position: relative;
        left: 800px;
        top: 35px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        z-index: 30;
        .search {
          width: 260px;
          height: 31px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          color: white;
          padding-left: 20px;
          outline: none;
          border: none;
        }
        .searchimg {
          cursor: pointer;
          position: relative;
          left: -40px;
          width: 17px;
          height: 17px;
        }
        .fabu {
          width: 93px;
          height: 31px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          cursor: pointer;
          color: #009fcd;
          border: none;
          outline: none;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          margin-top: 2px;
          .searchimg2 {
            cursor: pointer;
            padding-left: 15px;
          }
          span {
            padding-right: 13px;
          }
        }
      }
    }
  }
}
@keyframes colorchange {
  0% {
    background: rgba(51, 51, 51, 1);
  }
  100% {
    background: rgba(0, 159, 205, 1);
  }
}
// 底部
.proposaluenc_foot {
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
      justify-content: space-between;
      display: flex;
      flex-direction: row;
      position: relative;
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
</style>

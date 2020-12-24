<template>
  <div class="vote">
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
            style=" position: relative;top:2px"
          />
          当前位置:关于社区>投票</span
        >
      </div>
    </div>
    <div class="partnerfooter">
      <div class="partnerfooter-content">
        <input
          type="text"
          placeholder="请输入标题或名字"
          class="searchvote"
          v-model="searchnumber"
          @keyup="enter"
        />
        <img
          src="@assets/images/proposal/搜索.png"
          class="searchimg"
          @click="searchAll"
        />
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first" class="votefirst"
            ><ul id="all_list" v-if="voteall.length !== 0">
              <li
                v-for="item in voteall"
                :key="item"
               @click="goToVoteDetail(item.activityId,item.state)"
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>投票截止时间</span><br /><span>{{ item.endTime }}</span>
                </div>
                <div class="vote_vote">
                  <span> 反对</span>
                  <el-progress
                    :percentage="item.percentage"
                    color="red"
                  ></el-progress>
                  <span>赞成</span>
                </div>
                <div class="vote_type" v-if="item.state === '2'"  >
                  <span>投票中</span
                  ><img
                    src="@assets/images/proposal/矩形 49.png"
                    style="margin-left:20px;width:10px;height:16px;"
                  />
                </div>
                <div
                  class="vote_type"
                 
                  v-else-if="
                    item.state === '3' ||
                      item.state === '4' ||
                      item.state === '-4' ||
                      item.state === '5' ||
                      item.state === '-5'
                  "
                >
                  <span>投票通过</span
                  ><img
                    src="@assets/images/proposal/矩形 49.png"
                    style="margin-left:20px;width:10px;height:16px;"
                  />
                </div>
                <div class="vote_type" v-else >
                  <span>投票驳回</span
                  ><img
                    src="@assets/images/proposal/矩形 49.png"
                    style="margin-left:20px;width:10px;height:16px;"
                  />
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
          
          <el-tab-pane label="投票中" name="third" class="votefirst"
            ><ul id="all_list" v-if="votein.length !== 0">
              <li
                v-for="item in votein"
                :key="item"
                @click="goToVoteDetail(item.activityId,item.state)"
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>投票截止时间</span><br /><span>{{ item.endTime }}</span>
                </div>
                <div class="vote_vote">
                  <span> 反对</span>
                  <el-progress
                    :percentage="item.percentage"
                    color="red"
                  ></el-progress>
                  <span>赞成</span>
                </div>

                <div class="vote_type">
                  <span>投票中</span
                  ><img
                    src="@assets/images/proposal/矩形 49.png"
                    style="margin-left:20px;width:10px;height:16px;"
                  />
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
          <el-tab-pane label="已结束" name="five" class="votefirst"
            ><ul id="all_list" v-if="voteend.length !== 0">
              <li
                v-for="item in voteend"
                :key="item"
                @click="goToVoteDetail(item.activityId,item.state)"
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>投票截止时间</span><br /><span>{{ item.endTime }}</span>
                </div>
                <div class="vote_vote">
                  <span> 反对</span>
                  <el-progress
                    :percentage="item.percentage"
                    color="red"
                  ></el-progress>
                  <span>赞成</span>
                </div>
                <!-- <div class="vote_type" v-if="item.state === '2'">
                  <span>投票中</span
                  ><img
                    src="@assets/images/proposal/矩形 49.png"
                    style="margin-left:20px;width:10px;height:16px;"
                  />
                </div> -->

                <div class="vote_type" v-if="item.state==3||item.state==4||item.state==5||item.state==-4||item.state==-5">
                  <span>投票通过</span
                  ><img
                    src="@assets/images/proposal/矩形 49.png"
                    style="margin-left:20px;width:10px;height:16px;"
                  />
                </div>
                 <div class="vote_type" v-if="item.state==-3">
                  <span>投票驳回</span
                  ><img
                    src="@assets/images/proposal/矩形 49.png"
                    style="margin-left:20px;width:10px;height:16px;"
                  />
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
          <el-tab-pane label="投票通过" name="fourth" class="votefirst"
            ><ul id="all_list" v-if="voteagree.length !== 0">
              <li
                v-for="item in voteagree"
                :key="item"
                @click="goToVoteDetail(item.activityId,item.state)"
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>投票截止时间</span><br /><span>{{ item.endTime }}</span>
                </div>
                <div class="vote_vote">
                  <span> 反对</span>
                  <el-progress
                    :percentage="item.percentage"
                    color="red"
                  ></el-progress>
                  <span>赞成</span>
                </div>

                <div class="vote_type">
                  <span>投票通过</span
                  ><img
                    src="@assets/images/proposal/矩形 49.png"
                    style="margin-left:20px;width:10px;height:16px;"
                  />
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
          <el-tab-pane label="投票驳回" name="seven" class="votefirst"
            ><ul id="all_list" v-if="votereject.length !== 0">
              <li
                v-for="item in votereject"
                :key="item"
                @click="goToVoteDetail(item.activityId,item.state)"
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>投票截止时间</span><br /><span>{{ item.endTime }}</span>
                </div>
                <div class="vote_vote">
                  <span> 反对</span>
                  <el-progress
                    :percentage="item.percentage"
                    color="red"
                  ></el-progress>
                  <span>赞成</span>
                </div>

                <div class="vote_type">
                  <span>投票驳回</span
                  ><img
                    src="@assets/images/proposal/矩形 49.png"
                    style="margin-left:20px;width:10px;height:16px;"
                  />
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
          <el-tab-pane label="搜索结果" name="eight" class="votefirst" v-if="votealllist.length !== 0"
            ><ul id="all_list" >
              <li
                v-for="item in votealllist"
                :key="item"
                @click="goToVoteDetail(item.activityId,item.state)"
              >
                <div class="vote_title">
                  <span>{{ item.title }}</span
                  ><br /><span>{{ item.summary }}</span>
                </div>
                <div class="vote_time">
                  <span>投票截止时间</span><br /><span>{{ item.endTime }}</span>
                </div>
                <div class="vote_vote">
                  <span> 反对</span>
                  <el-progress
                    :percentage="item.percentage"
                    color="red"
                  ></el-progress>
                  <span>赞成</span>
                </div>
                <div class="vote_type" v-if="item.state === '2'">
                  <span>投票中</span
                  ><img
                    src="@assets/images/proposal/矩形 49.png"
                    style="margin-left:20px;width:10px;height:16px;"
                  />
                </div>
                <div
                  class="vote_type"
                  v-else-if="
                    item.state === '3' ||
                      item.state === '4' ||
                      item.state === '-4' ||
                      item.state === '5' ||
                      item.state === '-5'
                  "
                >
                  <span>投票通过</span
                  ><img
                    src="@assets/images/proposal/矩形 49.png"
                    style="margin-left:20px;width:10px;height:16px;"
                  />
                </div>
                <div class="vote_type" v-else>
                  <span>投票驳回</span
                  ><img
                    src="@assets/images/proposal/矩形 49.png"
                    style="margin-left:20px;width:10px;height:16px;"
                  />
                </div>
              </li>
            </ul>
            <!-- <div class="kongbai" >
              <img src="@assets/images/proposal/矢量智能对象.png" />
              <div>暂无更多数据</div>
            </div> -->
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
    <div class="partneruenc_foot">
      <div class="foot-top">
        <ul class="foot-box">
           <li>
            <div class="foot-box1">
              <div class="circle">
                 <img src="@assets/images/footer/github.png" @click="github" style="position:relative;left:10px" />
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
import {BASEURL} from '@api/api';
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
      // 全部查找
      votealllist: [],
      votealllistnumber: 1,
      alllisttotal: "",
      // 全部类型
      voteall: [],
      voteallnumber: 1,
      alltotal: "",
      // 投票中
      votein: [],
      voteinnumber: 1,
      intotal: "",
      // 已结束
      voteend: [],
      voteendnumber: 1,
      endtotal: "",
      // 投票通过
      voteagree: [],
      voteagreenumber: 1,
      agreetotal: "",
      // 投票驳回
      votereject: [],
      voterejectnumber: 1,
      rejecttotal: "",
      searchnumber: "",
     
    };
  },
  components: { Login, Forget, Fastoken, headersecond },
  created() {
    this.voteallnumber = 1;
    this.voteinnumber = 1;
    this.voteendnumber = 1;
    this.voteagreenumber = 1;
    this.voterejectnumber = 1;
    this.votealllistnumber=1;
    this.getVoteAll();
    this.inVoteAll();
    this.endVoteAll();
    this.agreeVoteAll();
    this.rejectVoteAll();
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
          `${BASEURL}`+"/weimioffice/vote/voteActivityList",
          qs.stringify({
            type: 0,
            pageNum: this.votealllistnumber,
            pageSize: 8,
            keywords: this.searchnumber,
          })
        )
        .then((res) => {
          // console.log(res);
          // console.log(res);
          // 全部类型
          this.activeName = "eight";
          this.votealllist = res.data.result.list;
          this.alllisttotal = res.data.result.total;
          // console.log(this.alltotal);
          for (let i = 0; i < res.data.result.list.length; i++) {
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
            this.votealllist[i].percentage = Number(0);
            if (
              res.data.result.list[i].prosAmount === 0 &&
              res.data.result.list[i].consAmount === 0
            ) {
              this.votealllist[i].percentage = Number(50);
            } else if (res.data.result.list[i].consAmount === 0) {
              this.votealllist[i].percentage = Number(0);
            } else {
              let fenzileft = Number(res.data.result.list[i].consAmount * 100);
              let fenziright =
                res.data.result.list[i].prosAmount +
                res.data.result.list[i].consAmount;
              let fenzi = fenzileft / fenziright;
              let fenmu =
                ((res.data.result.list[i].prosAmount +
                  res.data.result.list[i].consAmount) *
                  100) /
                (res.data.result.list[i].prosAmount +
                  res.data.result.list[i].consAmount);
              this.votealllist[i].percentage = Number(fenzi / fenmu) * 100;
              // console.log(this.voteall[i].percentage);
            }
          }
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
    // 投票获取
    async getVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}`+"/weimioffice/vote/voteActivityList ",
          qs.stringify({
            type: 0,
            pageNum: this.voteallnumber,
            pageSize: 8,
          })
        )
        .then((res) => {
            // console.log(res);
          // 全部类型
          this.voteall = res.data.result.list;
          // 页数
          this.alltotal = res.data.result.total;
        
          // console.log(this.alltotal);
          for (let i = 0; i < res.data.result.list.length; i++) {
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
            this.voteall[i].percentage = Number(0);
            if (
              res.data.result.list[i].prosAmount === 0 &&
              res.data.result.list[i].consAmount === 0
            ) {
              this.voteall[i].percentage = Number(50);
            } else if (res.data.result.list[i].consAmount === 0) {
              this.voteall[i].percentage = Number(0);
            } else {
              let fenzileft = Number(res.data.result.list[i].consAmount * 100);
              let fenziright =
                res.data.result.list[i].prosAmount +
                res.data.result.list[i].consAmount;
              let fenzi = fenzileft / fenziright;
              let fenmu =
                ((res.data.result.list[i].prosAmount +
                  res.data.result.list[i].consAmount) *
                  100) /
                (res.data.result.list[i].prosAmount +
                  res.data.result.list[i].consAmount);
              this.voteall[i].percentage = Number(fenzi / fenmu) * 100;
              // console.log(this.voteall[i].percentage);
            }
          }
          // console.log(this.voteall);
        });
    },
    inVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}`+"/weimioffice/vote/voteActivityList",
          qs.stringify({
            type: 1,
            pageNum: this.voteinnumber,
            pageSize: 8,
          })
        )
        .then((res) => {
          //  console.log(res);
          // 全部类型
          this.votein = res.data.result.list;
          // 页数
          this.intotal = res.data.result.total;
            
          for (let i = 0; i < res.data.result.list.length; i++) {
             this.votein[i].endTime = this.timestampToTime2(
              res.data.result.list[i].endTime
            );
          
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
           
            if (
              res.data.result.list[i].prosAmount === 0 &&
              res.data.result.list[i].consAmount === 0
            ) {
              this.votein[i].percentage = Number(50);
            } else if (res.data.result.list[i].consAmount === 0) {
              this.votein[i].percentage = Number(0);
            } else {
              let fenzileft = Number(res.data.result.list[i].consAmount * 100);
              let fenziright =
                res.data.result.list[i].prosAmount +
                res.data.result.list[i].consAmount;

              let fenzi = fenzileft / fenziright;
              let fenmu =
                ((res.data.result.list[i].prosAmount +
                  res.data.result.list[i].consAmount) *
                  100) /
                (res.data.result.list[i].prosAmount +
                  res.data.result.list[i].consAmount);
              this.votein[i].percentage = Number(fenzi / fenmu) * 100;
            }
          }
        });
    },
    async endVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}`+"/weimioffice/vote/voteActivityList ",
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
            if (
              res.data.result.list[i].prosAmount === 0 &&
              res.data.result.list[i].consAmount === 0
            ) {
              this.voteend[i].percentage = Number(50);
            } else if (res.data.result.list[i].consAmount === 0) {
              this.voteend[i].percentage = Number(0);
            } else {
              let fenzileft = Number(res.data.result.list[i].consAmount * 100);
              let fenziright =
                res.data.result.list[i].prosAmount +
                res.data.result.list[i].consAmount;

              let fenzi = fenzileft / fenziright;
              let fenmu =
                ((res.data.result.list[i].prosAmount +
                  res.data.result.list[i].consAmount) *
                  100) /
                (res.data.result.list[i].prosAmount +
                  res.data.result.list[i].consAmount);
              this.voteend[i].percentage = Number(fenzi / fenmu) * 100;
            }
          }
        });
    },
    async agreeVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}`+"/weimioffice/vote/voteActivityList ",
          qs.stringify({
            type: 3,
            pageNum: this.voteagreenumber,
            pageSize: 8,
          })
        )
        .then((res) => {
          //  console.log(res);
          // 全部类型
          this.voteagree = res.data.result.list;
          // 页数
          this.agreetotal = res.data.result.total;
          for (let i = 0; i < res.data.result.list.length; i++) {
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
            if (
              res.data.result.list[i].prosAmount === 0 &&
              res.data.result.list[i].consAmount === 0
            ) {
              this.voteagree[i].percentage = Number(50);
            } else if (res.data.result.list[i].consAmount === 0) {
              this.voteagree[i].percentage = Number(0);
            } else {
              let fenzileft = Number(res.data.result.list[i].consAmount * 100);
              let fenziright =
                res.data.result.list[i].prosAmount +
                res.data.result.list[i].consAmount;

              let fenzi = fenzileft / fenziright;
              let fenmu =
                ((res.data.result.list[i].prosAmount +
                  res.data.result.list[i].consAmount) *
                  100) /
                (res.data.result.list[i].prosAmount +
                  res.data.result.list[i].consAmount);
              this.voteagree[i].percentage = Number(fenzi / fenmu) * 100;
            }
          }
        });
    },
    async rejectVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}`+"/weimioffice/vote/voteActivityList ",
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
          this.rejecttotal = Math.ceil(res.data.result.total / 8);
          for (let i = 0; i < res.data.result.list.length; i++) {
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
            if (
              res.data.result.list[i].prosAmount === 0 &&
              res.data.result.list[i].consAmount === 0
            ) {
              this.votereject[i].percentage = Number(50);
            } else if (res.data.result.list[i].consAmount === 0) {
              this.votereject[i].percentage = Number(0);
            } else {
              let fenzileft = Number(res.data.result.list[i].consAmount * 100);
              let fenziright =
                res.data.result.list[i].prosAmount +
                res.data.result.list[i].consAmount;

              let fenzi = fenzileft / fenziright;
              let fenmu =
                ((res.data.result.list[i].prosAmount +
                  res.data.result.list[i].consAmount) *
                  100) /
                (res.data.result.list[i].prosAmount +
                  res.data.result.list[i].consAmount);
              this.votereject[i].percentage = Number(fenzi / fenmu) * 100;
            }
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
    // 跳转投票详情页
    goToVoteDetail(index,state) {
       this.$router.push({
          path: "/votedetail",
        query: { activityId: index,state:state },
        });
      // console.log(index);
      // let routeData = this.$router.resolve({
      //   path: "/votedetail",
      //   query: { activityId: index,state:state },
      // });
      // window.open(routeData.href, "_blank");
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
      github(){
 window.open("https://github.com/uenctech");
    },
    telegram() {
      window.open("https://t.me/UniversalEnergyChain1");
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
    // 选择语言
  },
};
</script>
<style lang="less">
.el-progress-bar__inner{
  border-radius: 0px !important;
}
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
.el-progress-bar__outer {
  background: #1f91d3 !important;
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
  color: white!important;
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
  color: rgba(255, 255, 255, 0.5)!important;
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
  background-color: rgba(255, 255, 255, 0.1)!important;
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
        line-height: 20px!important;
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
          align-items: center;
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
          span:nth-child(1) {
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
.vote {
  width: 100%;
  height: auto;
  position: relative;
  .partnertop {
    height: 500px;
    position: relative;
    margin: 0 auto;
    background: url("../../assets/images/proposal/bg.png") no-repeat center/100%
      100%;
    z-index: 1;
    // 头部内容区域
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
      .searchvote {
        width: 260px;
        height: 31px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        color: white;
        position: relative;
        left: 937px;
        padding-left: 20px;
        top: 34px;
        outline: none;
        border: none;
        z-index: 30;
      }
      .searchimg {
        position: relative;
        left: 909px;
        top: 36px;
        cursor: pointer;
        z-index: 30;
      }
    }
  }
}

// 底部
.partneruenc_foot {
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
      position: absolute;
      left: 56%;
      top: 55px;
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

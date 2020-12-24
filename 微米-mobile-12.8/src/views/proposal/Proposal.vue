<template>
  <div class="proposal">
    <slider></slider>
    <div class="proposal_content">
      <div class="content_header">
        <div>
          <form action="">
            <img src="@assets/images/proposal/搜索.png" />
            <input
              type="search"
              placeholder="请输入名字或编号"
              v-model="searchnumber"
              @keyup="enter"
              @focus="jianpanfocus"
            />
          </form>
        </div>
        <div>
          <img src="@assets/images/proposal/组 13.png" @click="toProposal" />
          <span @click="toProposal">发布</span>
        </div>
      </div>
      <van-tabs v-model="active">
        <van-tab title="全部">
          <ul id="all_list" v-if="voteall.length !== 0">
            <li v-for="item in voteall" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>
                <!-- 议事中 -->
                <div v-if="item.state === '1'" class="yellowcolor">
                  <img src="@assets/images/proposal/组 332.png" /><span
                    >议事中</span
                  >
                </div>
                <!-- 投票中 -->
                <div v-if="item.state === '2'" class="bluecolor">
                  <img src="@assets/images/proposal/组 349.png" /><span
                    >投票中</span
                  >
                </div>
                <!-- 行动中 -->
                <div v-if="item.state === '3'" class="bluecolor">
                  <img src="@assets/images/proposal/组 349.png" /><span
                    >行动中</span
                  >
                </div>
                <!-- 已完成 -->
                <div v-if="item.state === '4'" class="bluecolor">
                  <img src="@assets/images/proposal/组 327.png" /><span
                    >已完成</span
                  >
                </div>

                <!-- 已结案 -->
                <div v-if="item.state === '5'" class="bluecolor">
                  <img src="@assets/images/proposal/组 327.png" /><span
                    >已结案</span
                  >
                </div>
                <!-- 审议驳回 -->
                <div v-if="item.state === '-2'" class="redcolor">
                  <img src="@assets/images/proposal/组 351.png" /><span
                    >审议驳回</span
                  >
                </div>
                <!-- 投票驳回 -->
                <div v-if="item.state === '-3'" class="redcolor">
                  <img src="@assets/images/proposal/组 351.png" /><span
                    >投票驳回</span
                  >
                </div>
                <!-- 监督驳回 -->
                <div
                  v-if="item.state === '-4' || item.state === '-5'"
                  class="redcolor"
                >
                  <img src="@assets/images/proposal/组 351.png" /><span
                    >监督驳回</span
                  >
                </div>
              </div>
              <div class="vote_content">
                <div>
                  <span>提议人</span>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>创建时间</span>
                  <span>{{ item.createTime }}</span>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <span>查看更多</span>
                <img src="@assets/images/proposal/组 328.png" alt="" />
              </div>
            </li>
          </ul>
          <div v-else class="placeholder_map">
            <img src="@assets/images/detail/矢量智能对象.png" />
            <p>暂无更多数据</p>
          </div>
          <div class="block" v-if="voteall.length !== 0">
            <van-pagination
              v-model="voteallnumber"
              :total-items="alltotal"
              :items-per-page="10"
              :show-page-size="4"
              force-ellipses
              @change="allChange"
            />
          </div>
        </van-tab>
        <van-tab title="议事中">
          <ul id="all_list" v-if="votein.length !== 0">
            <li v-for="item in votein" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>
                <!-- 议事中 -->
                <div class="yellowcolor">
                  <img src="@assets/images/proposal/组 332.png" /><span
                    >议事中</span
                  >
                </div>
              </div>
              <div class="vote_content">
                <div>
                  <span>提议人</span>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>创建时间</span>
                  <span>{{ item.createTime }}</span>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <span>查看更多</span>
                <img src="@assets/images/proposal/组 328.png" alt="" />
              </div>
            </li>
          </ul>
          <div v-else class="placeholder_map">
            <img src="@assets/images/detail/矢量智能对象.png" />
            <p>暂无更多数据</p>
          </div>
          <div class="block" v-if="votein.length !== 0">
            <van-pagination
              v-model="voteinnumber"
              :total-items="intotal"
              :items-per-page="10"
              :show-page-size="4"
              force-ellipses
              @change="inChange"
            />
          </div>
        </van-tab>
        <van-tab title="投票中">
          <ul id="all_list" v-if="voteend.length !== 0">
            <li v-for="item in voteend" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>
                <div class="bluecolor">
                  <img src="@assets/images/proposal/组 349.png" /><span
                    >投票中</span
                  >
                </div>
              </div>
              <div class="vote_content">
                <div>
                  <span>提议人</span>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>创建时间</span>
                  <span>{{ item.createTime }}</span>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <span>查看更多</span>
                <img src="@assets/images/proposal/组 328.png" alt="" />
              </div>
            </li>
          </ul>
          <div v-else class="placeholder_map">
            <img src="@assets/images/detail/矢量智能对象.png" />
            <p>暂无更多数据</p>
          </div>
          <div class="block" v-if="voteend.length !== 0">
            <van-pagination
              v-model="voteendnumber"
              :total-items="endtotal"
              :items-per-page="10"
              :show-page-size="4"
              force-ellipses
              @change="endChange"
            />
          </div>
        </van-tab>
        <van-tab title="行动中">
          <ul id="all_list" v-if="voteagree.length !== 0">
            <li v-for="item in voteagree" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>

                <div class="bluecolor">
                  <img src="@assets/images/proposal/组 349.png" /><span
                    >行动中</span
                  >
                </div>
              </div>
              <div class="vote_content">
                <div>
                  <span>提议人</span>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>创建时间</span>
                  <span>{{ item.createTime }}</span>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <span>查看更多</span>
                <img src="@assets/images/proposal/组 328.png" alt="" />
              </div>
            </li>
          </ul>
          <div v-else class="placeholder_map">
            <img src="@assets/images/detail/矢量智能对象.png" />
            <p>暂无更多数据</p>
          </div>
          <div class="block" v-if="voteagree.length !== 0">
            <van-pagination
              v-model="voteagreenumber"
              :total-items="agreetotal"
              :items-per-page="10"
              :show-page-size="4"
              force-ellipses
              @change="agreeChange"
            />
          </div>
        </van-tab>
        <van-tab title="已完成">
          <ul id="all_list" v-if="votereject.length !== 0">
            <li v-for="item in votereject" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>

                <div class="bluecolor">
                  <img src="@assets/images/proposal/组 327.png" /><span
                    >已完成</span
                  >
                </div>
              </div>
              <div class="vote_content">
                <div>
                  <span>提议人</span>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>创建时间</span>
                  <span>{{ item.createTime }}</span>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <span>查看更多</span>
                <img src="@assets/images/proposal/组 328.png" alt="" />
              </div>
            </li>
          </ul>
          <div v-else class="placeholder_map">
            <img src="@assets/images/detail/矢量智能对象.png" />
            <p>暂无更多数据</p>
          </div>
          <div class="block" v-if="votereject.length !== 0">
            <van-pagination
              v-model="voterejectnumber"
              :total-items="rejecttotal"
              :items-per-page="10"
              :show-page-size="4"
              force-ellipses
              @change="rejectChange"
            />
          </div>
        </van-tab>
        <van-tab title="已结案">
          <ul id="all_list" v-if="votejiean.length !== 0">
            <li v-for="item in votejiean" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>

                <div class="bluecolor">
                  <img src="@assets/images/proposal/组 327.png" /><span
                    >已结案</span
                  >
                </div>
              </div>
              <div class="vote_content">
                <div>
                  <span>提议人</span>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>创建时间</span>
                  <span>{{ item.createTime }}</span>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <span>查看更多</span>
                <img src="@assets/images/proposal/组 328.png" alt="" />
              </div>
            </li>
          </ul>
          <div v-else class="placeholder_map">
            <img src="@assets/images/detail/矢量智能对象.png" />
            <p>暂无更多数据</p>
          </div>
          <div class="block" v-if="votejiean.length !== 0">
            <van-pagination
              v-model="votejieannumber"
              :total-items="jieantotal"
              :items-per-page="10"
              :show-page-size="4"
              force-ellipses
              @change="jieanChange"
            />
          </div>
        </van-tab>
        <van-tab title="驳回">
          <ul id="all_list" v-if="votebohui.length !== 0">
            <li v-for="item in votebohui" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>

                <!-- 审议驳回 -->
                <div v-if="item.state === '-2'" class="redcolor">
                  <img src="@assets/images/proposal/组 351.png" /><span
                    >审议驳回</span
                  >
                </div>
                <!-- 投票驳回 -->
                <div v-if="item.state === '-3'" class="redcolor">
                  <img src="@assets/images/proposal/组 351.png" /><span
                    >投票驳回</span
                  >
                </div>
                <!-- 监督驳回 -->
                <div
                  v-if="item.state === '-4' || item.state === '-5'"
                  class="redcolor"
                >
                  <img src="@assets/images/proposal/组 351.png" /><span
                    >监督驳回</span
                  >
                </div>
              </div>
              <div class="vote_content">
                <div>
                  <span>提议人</span>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>创建时间</span>
                  <span>{{ item.createTime }}</span>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <span>查看更多</span>
                <img src="@assets/images/proposal/组 328.png" alt="" />
              </div>
            </li>
          </ul>
          <div v-else class="placeholder_map">
            <img src="@assets/images/detail/矢量智能对象.png" />
            <p>暂无更多数据</p>
          </div>
          <div class="block" v-if="votebohui.length !== 0">
            <van-pagination
              v-model="votebohuinumber"
              :total-items="bohuitotal"
              :items-per-page="10"
              :show-page-size="4"
              force-ellipses
              @change="bohuiChange"
            />
          </div>
        </van-tab>
        <van-tab title="搜索结果">
          <ul id="all_list" v-if="votealllist.length !== 0">
            <li v-for="item in votealllist" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>
                <!-- 议事中 -->
                <div v-if="item.state === '1'" class="yellowcolor">
                  <img src="@assets/images/proposal/组 332.png" /><span
                    >议事中</span
                  >
                </div>
                <!-- 投票中 -->
                <div v-if="item.state === '2'" class="bluecolor">
                  <img src="@assets/images/proposal/组 349.png" /><span
                    >投票中</span
                  >
                </div>
                <!-- 行动中 -->
                <div v-if="item.state === '3'" class="bluecolor">
                  <img src="@assets/images/proposal/组 349.png" /><span
                    >行动中</span
                  >
                </div>
                <!-- 已完成 -->
                <div v-if="item.state === '4'" class="bluecolor">
                  <img src="@assets/images/proposal/组 327.png" /><span
                    >已完成</span
                  >
                </div>

                <!-- 已结案 -->
                <div v-if="item.state === '5'" class="bluecolor">
                  <img src="@assets/images/proposal/组 327.png" /><span
                    >已结案</span
                  >
                </div>
                <!-- 审议驳回 -->
                <div v-if="item.state === '-2'" class="redcolor">
                  <img src="@assets/images/proposal/组 351.png" /><span
                    >审议驳回</span
                  >
                </div>
                <!-- 投票驳回 -->
                <div v-if="item.state === '-3'" class="redcolor">
                  <img src="@assets/images/proposal/组 351.png" /><span
                    >投票驳回</span
                  >
                </div>
                <!-- 监督驳回 -->
                <div
                  v-if="item.state === '-4' || item.state === '-5'"
                  class="redcolor"
                >
                  <img src="@assets/images/proposal/组 351.png" /><span
                    >监督驳回</span
                  >
                </div>
              </div>
              <div class="vote_content">
                <div>
                  <span>提议人</span>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>创建时间</span>
                  <span>{{ item.createTime }}</span>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToproposalDetail(item.activityId, item.state)"
              >
                <span>查看更多</span>
                <img src="@assets/images/proposal/组 328.png" alt="" />
              </div>
            </li>
          </ul>
          <div v-else class="placeholder_map">
            <img src="@assets/images/detail/矢量智能对象.png" />
            <p>暂无更多数据</p>
          </div>
          <div class="block" v-if="votealllist.length !== 0">
            <van-pagination
              v-model="votealllistnumber"
              :total-items="alllisttotal"
              :items-per-page="10"
              :show-page-size="4"
              force-ellipses
              @change="alllistChange"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <vfooter></vfooter>
  </div>
</template>

<script>
var qs = require("qs");
import { BASEURL } from "@api/api";
import slider from "@components/common/slider";
import vfooter from "@components/common/vFooter";
export default {
  name: "partner",
  inject: ["reload"],
  data() {
    return {
      searchnumber: "",
      active: 0,
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
  components: { slider, vfooter },
  created() {
    window.scrollTo(0, 0);
    this.votealllistnumber = localStorage.getItem("votealllistnumber") || 1;
    this.voteallnumber = localStorage.getItem("voteallnumber") || 1;
    this.voteinnumber = localStorage.getItem("voteinnumber") || 1;
    this.voteendnumber = localStorage.getItem("voteendnumber") || 1;
    this.voteagreenumber = localStorage.getItem("voteagreenumber") || 1;
    this.votejieannumber = localStorage.getItem("votejieannumber") || 1;
    this.voterejectnumber = localStorage.getItem("voterejectnumber") || 1;
    this.getVoteAll();
    this.inVoteAll();
    this.endVoteAll();
    this.agreeVoteAll();
    this.rejectVoteAll();
    this.jieanVoteAll();
    this.bohuiVoteAll();
  },

  mounted() {},
  methods: {
    jianpanfocus() {
      var clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      var nowClientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // alert(clientHeight);
      // alert(nowClientHeight);
    },
    toProposal() {
      if (!localStorage.getItem("token")) {
        this.$message({
          message: "请先登录您的账号信息",
          center: true,
          type: "error",
          duration: 1000,
        });

        // setTimeout(() => {
        //   this.$router.push({ path: "/proposal" });
        // }, 3000);
      } else if (
        localStorage.getItem("walletAddress") === "" ||
        localStorage.getItem("walletAddress") === null
      ) {
        this.$message({
          message: "请先绑定您的钱包账户",
          center: true,
          type: "error",
          duration: 1000,
        });
      } else {
        this.$router.push({
          path: "/toproposal",
        });
      }
    },
    // 跳转提案详情页
    goToproposalDetail(index, state) {
      // console.log(index, state);
      if (!localStorage.getItem("token")) {
        this.$toast.fail({
          duration: 1000, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: "spinner",
          message: "请先去登录或注册",
          position: top,
        });

        // this.$message({
        //   message: "请先去登录或注册",
        //   center: true,
        //   type: "error",
        //   duration: 1000,
        // });
      } else {
        //   // console.log(index, state);
        this.$router.push({
          path: "/proposaldetail",
          query: { activityId: index, state: state },
        });
      }
    },
    alllistChange() {
      this.votealllistnumber = val;
      this.searchAll();
      localStorage.setItem("votealllistnumber", val);
      window.scrollTo(0, -1);
    },
    allChange(val) {
      // console.log(val);
      this.voteallnumber = val;
      this.getVoteAll();
      localStorage.setItem("voteallnumber", val);
      window.scrollTo(0, -1);
    },
    inChange(val) {
      this.voteinnumber = val;
      this.inVoteAll();
      localStorage.setItem("voteinnumber", val);
      window.scrollTo(0, -1);
    },
    endChange(val) {
      this.voteendnumber = val;
      this.endVoteAll();
      localStorage.setItem("voteendnumber", val);
      window.scrollTo(0, -1);
    },
    agreeChange(val) {
      this.voteagreenumber = val;
      this.agreeVoteAll();
      localStorage.setItem("voteagreenumber", val);
      window.scrollTo(0, -1);
    },
    rejectChange(val) {
      this.voterejectnumber = val;
      this.rejectVoteAll();
      localStorage.setItem("voterejectnumber", val);
      window.scrollTo(0, -1);
    },
    jieanChange(val) {
      this.votejieannumber = val;
      this.jieanVoteAll();
      localStorage.setItem("votejieannumber", val);
      window.scrollTo(0, -1);
    },
    bohuiChange(val) {
      this.votebohuinumber = val;
      this.bohuiVoteAll();
      localStorage.setItem("votebohuinumber", val);
      window.scrollTo(0, -1);
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
              this.active = 7;
              this.votealllist = res.data.result.list;
              // 页数
              this.alllisttotal = res.data.result.total;
              // console.log(this.alltotal);
              for (let i = 0; i < res.data.result.list.length; i++) {
                if (this.votealllist[i].name.length > 3) {
                  this.votealllist[i].name =
                    res.data.result.list[i].name.substring(0, 2) + "...";
                } else {
                  this.votealllist[i].name = res.data.result.list[i].name;
                }
                if (this.votealllist[i].title.length > 10) {
                  this.votealllist[i].title =
                    res.data.result.list[i].title.substring(0, 10) + "...";
                } else {
                  this.votealllist[i].title = res.data.result.list[i].title;
                }
                if (this.votealllist[i].summary.length > 5) {
                  this.votealllist[i].summary =
                    res.data.result.list[i].summary.substring(0, 5) + "...";
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
    // 投票获取
    async getVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/getAllActivity",
          qs.stringify({
            type: 0,
            pageNum: this.voteallnumber,
            pageSize: 10,
          })
        )
        .then((res) => {
          //  console.log(res);
          // console.log(res.data.result.list);
          // 全部类型
          this.voteall = res.data.result.list;
          // 页数
          this.alltotal = res.data.result.total;
          // console.log(this.alltotal);
          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.voteall[i].name.length > 3) {
              this.voteall[i].name =
                res.data.result.list[i].name.substring(0, 2) + "...";
            } else {
              this.voteall[i].name = res.data.result.list[i].name;
            }
            if (this.voteall[i].title.length > 10) {
              this.voteall[i].title =
                res.data.result.list[i].title.substring(0, 10) + "...";
            } else {
              this.voteall[i].title = res.data.result.list[i].title;
            }
            if (this.voteall[i].summary.length > 5) {
              this.voteall[i].summary =
                res.data.result.list[i].summary.substring(0, 5) + "...";
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
            pageSize: 10,
          })
        )
        .then((res) => {
          // 全部类型
          this.votein = res.data.result.list;
          // 页数
          this.intotal = res.data.result.total;

          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.votein[i].name.length > 3) {
              this.votein[i].name =
                res.data.result.list[i].name.substring(0, 2) + "...";
            } else {
              this.votein[i].name = res.data.result.list[i].name;
            }
            if (this.votein[i].title.length > 10) {
              this.votein[i].title =
                res.data.result.list[i].title.substring(0, 10) + "...";
            } else {
              this.votein[i].title = res.data.result.list[i].title;
            }
            if (this.votein[i].summary.length > 5) {
              this.votein[i].summary =
                res.data.result.list[i].summary.substring(0, 5) + "...";
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
            pageSize: 10,
          })
        )
        .then((res) => {
          //  console.log(res);
          // 全部类型
          this.voteend = res.data.result.list;
          // 页数
          this.endtotal = res.data.result.total;

          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.voteend[i].name.length > 3) {
              this.voteend[i].name =
                res.data.result.list[i].name.substring(0, 2) + "...";
            } else {
              this.voteend[i].name = res.data.result.list[i].name;
            }
            if (this.voteend[i].title.length > 10) {
              this.voteend[i].title =
                res.data.result.list[i].title.substring(0, 10) + "...";
            } else {
              this.voteend[i].title = res.data.result.list[i].title;
            }
            if (this.voteend[i].summary.length > 5) {
              this.voteend[i].summary =
                res.data.result.list[i].summary.substring(0, 5) + "...";
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
            pageSize: 10,
          })
        )
        .then((res) => {
          // console.log(res);
          // 全部类型
          this.voteagree = res.data.result.list;
          // 页数
          this.agreetotal = res.data.result.total;

          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.voteagree[i].name.length > 3) {
              this.voteagree[i].name =
                res.data.result.list[i].name.substring(0, 2) + "...";
            } else {
              this.voteagree[i].name = res.data.result.list[i].name;
            }
            if (this.voteagree[i].title.length > 10) {
              this.voteagree[i].title =
                res.data.result.list[i].title.substring(0, 10) + "...";
            } else {
              this.voteagree[i].title = res.data.result.list[i].title;
            }
            if (this.voteagree[i].summary.length > 5) {
              this.voteagree[i].summary =
                res.data.result.list[i].summary.substring(0, 5) + "...";
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
            pageSize: 10,
          })
        )
        .then((res) => {
          //  console.log(res);
          // 全部类型
          this.votereject = res.data.result.list;
          // 页数
          this.rejecttotal = res.data.result.total;
          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.votereject[i].name.length > 3) {
              this.votereject[i].name =
                res.data.result.list[i].name.substring(0, 2) + "...";
            } else {
              this.votereject[i].name = res.data.result.list[i].name;
            }
            if (this.votereject[i].title.length > 10) {
              this.votereject[i].title =
                res.data.result.list[i].title.substring(0, 10) + "...";
            } else {
              this.votereject[i].title = res.data.result.list[i].title;
            }
            if (this.votereject[i].summary.length > 5) {
              this.votereject[i].summary =
                res.data.result.list[i].summary.substring(0, 5) + "...";
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
            pageSize: 10,
          })
        )
        .then((res) => {
          //  console.log(res);
          // 全部类型
          this.votejiean = res.data.result.list;
          // 页数
          this.jieantotal = res.data.result.total;
          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.votejiean[i].name.length > 3) {
              this.votejiean[i].name =
                res.data.result.list[i].name.substring(0, 2) + "...";
            } else {
              this.votejiean[i].name = res.data.result.list[i].name;
            }
            if (this.votejiean[i].title.length > 10) {
              this.votejiean[i].title =
                res.data.result.list[i].title.substring(0, 10) + "...";
            } else {
              this.votejiean[i].title = res.data.result.list[i].title;
            }
            if (this.votejiean[i].summary.length > 5) {
              this.votejiean[i].summary =
                res.data.result.list[i].summary.substring(0, 5) + "...";
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
            pageSize: 10,
          })
        )
        .then((res) => {
          // console.log(res);
          // 全部类型
          this.votebohui = res.data.result.list;
          // 页数
          this.bohuitotal = res.data.result.total;
          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.votebohui[i].name.length > 3) {
              this.votebohui[i].name =
                res.data.result.list[i].name.substring(0, 2) + "...";
            } else {
              this.votebohui[i].name = res.data.result.list[i].name;
            }
            if (this.votebohui[i].title.length > 10) {
              this.votebohui[i].title =
                res.data.result.list[i].title.substring(0, 10) + "...";
            } else {
              this.votebohui[i].title = res.data.result.list[i].title;
            }
            if (this.votebohui[i].summary.length > 5) {
              this.votebohui[i].summary =
                res.data.result.list[i].summary.substring(0, 5) + "...";
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
  },
};
</script>
<style lang="less">
.red {
  width: 100%;
  color: white !important;
  background: crimson;
}
.van-tabs__wrap {
  z-index: 0;
}
.placeholder_map {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  img {
    width: 300px;
  }
  p {
    font-size: 14px;
    font-family: "苹方-简";
    font-weight: normal;
    color: #ffffff;
    line-height: 22px;
  }
}
.redcolor {
  font-size: 14px;
  font-family: "苹方-简";
  font-weight: normal;
  color: #d93e3e;
}
.yellowcolor {
  font-size: 14px;
  font-family: "苹方-简";
  font-weight: normal;
  color: #cd9d00;
}
.bluecolor {
  font-size: 14px;
  font-family: "苹方-简";
  font-weight: normal;
  color: #009fcd;
}
.proposal {
  width: 100%;
  height: auto;
  background-color: black;
  .van-tabs__nav {
    background: black;
  }
  .van-tabs {
    margin-top: 10px;
    margin-bottom: 100px;
  }
  .van-tab {
    font-size: 14px;
    font-family: "苹方-简";
    font-weight: normal;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.5);
  }
  .van-tabs__line {
    height: 1px;
    background: #009fcd;
    border-radius: 1px;
  }
  .van-tab--active {
    font-size: 14px;
    font-family: "苹方-简";
    font-weight: normal;
    line-height: 20px;
    color: #009fcd;
  }
  .proposal_content {
    height: auto;
    .content_header {
      width: 100%;
      margin: 0 auto;
      margin-top: 20px;
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      img {
        width: 16px;
        height: 16px;
      }
      img:nth-of-type(1) {
        position: relative;
        left: 24px;
        top: 3px;
      }
      div:nth-child(2) {
        //  margin-right: 15px;
        // position: relative;
        // right: 15px;
        img {
          position: relative;
          left: -5px;
        }
      }
      span {
        font-size: 14px;
        font-family: "苹方-简";
        font-weight: normal;
        color: #ffffff;
      }
      input {
        position: relative;
        left: -8px;
        width: 282px;
        height: 30px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        border: none;
        outline: none;
        padding-left: 40px;
        font-size: 14px;
        font-family: "苹方-简";
        font-weight: normal;
        color: #ffffff;
      }
    }
    #all_list {
      padding-top: 0px;
      img {
        width: 16px;
        height: 16px;
      }
      li {
        width: 345px;
        height: 158px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        margin: 15px auto 0;
      }
      .vote_title {
        padding-top: 20px;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        div:nth-child(1) {
          position: relative;
          left: 15px;
          font-size: 16px;
          font-family: "苹方-简";
          font-weight: normal;
          color: #ffffff;
        }
        div:nth-child(2) {
          position: relative;
          right: 15px;
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            margin-right: 2px;
          }
        }
      }
      .vote_content {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 20px;
        div:nth-of-type(1) {
          position: relative;
          left: 15px;
        }
        div:nth-of-type(2) {
          position: relative;
          right: 78px;
        }
        div {
          display: flex;
          flex-direction: column;
          span:nth-of-type(1) {
            font-size: 12px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 17px;
            color: #ffffff;
            opacity: 0.5;
          }
          span:nth-of-type(2) {
            margin-top: 2px;
            font-size: 14px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 16px;
            color: #ffffff;
            opacity: 1;
          }
        }
      }
      .line {
        width: 345px;
        height: 0px;
        border: 1px solid #ffffff;
        opacity: 0.1;
        margin-top: 20px;
      }
      .vote_footer {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          font-size: 12px;
          font-family: "苹方-简";
          font-weight: normal;
          color: #ffffff;
          position: relative;
          left: 269px;
        }
        img {
          width: 6.41px;
          height: 11.41px;
          position: relative;
          left: 276px;
        }
      }
    }
    .block {
      .van-pagination {
        margin-top: 30px;
      }
      .van-pagination__item {
        background: none;
        color: white;
      }
      .van-pagination__item--active {
        background: #009fcd;
        border-radius: 5px;
      }
      [class*="van-hairline"]::after {
        border: none;
      }
    }
  }
}
</style>

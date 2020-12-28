<template>
  <div class="vote">
    <slider></slider>
    <div class="proposal_content">
      <div class="content_header">
        <form action="">
          <img src="@assets/images/proposal/搜索.png" alt="" />
          <input
            type="search"
            placeholder="请输入名字或编号"
            v-model="searchnumber"
            @keyup="enter"
          />
        </form>
      </div>
      <van-tabs v-model="active">
        <van-tab title="全部">
          <ul id="all_list" v-if="voteall.length !== 0">
            <li v-for="item in voteall" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>
                <div>{{ item.endTime }}截止</div>
              </div>
              <div class="vote_content">
                <van-progress
                  color="#f00"
                  :percentage="item.percentage"
                  :show-pivot="false"
                />
                <div class="vote_number">
                  <div>
                    <span>{{ item.consAmount }}</span
                    ><span>反对</span>
                  </div>
                  <div>
                    <span>{{ item.prosAmount }}</span
                    ><span>赞成</span>
                  </div>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToVoteDetail(item.activityId, item.state)"
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
        <van-tab title="投票中">
          <ul id="all_list" v-if="votein.length !== 0">
            <li v-for="item in votein" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>
                <div>{{ item.endTime }}截止</div>
              </div>
              <div class="vote_content">
                <van-progress
                  color="#f00"
                  :percentage="item.percentage"
                  :show-pivot="false"
                />
                <div class="vote_number">
                  <div>
                    <span>{{ item.consAmount }}</span
                    ><span>反对</span>
                  </div>
                  <div>
                    <span>{{ item.prosAmount }}</span
                    ><span>赞成</span>
                  </div>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToVoteDetail(item.activityId, item.state)"
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
        <van-tab title="已结束">
          <ul id="all_list" v-if="voteend.length !== 0">
            <li v-for="item in voteend" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>
                <div>{{ item.endTime }}截止</div>
              </div>
              <div class="vote_content">
                <van-progress
                  color="#f00"
                  :percentage="item.percentage"
                  :show-pivot="false"
                />
                <div class="vote_number">
                  <div>
                    <span>{{ item.consAmount }}</span
                    ><span>反对</span>
                  </div>
                  <div>
                    <span>{{ item.prosAmount }}</span
                    ><span>赞成</span>
                  </div>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToVoteDetail(item.activityId, item.state)"
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
        <van-tab title="投票通过">
          <ul id="all_list" v-if="voteagree.length !== 0">
            <li v-for="item in voteagree" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>
                <div>{{ item.endTime }}截止</div>
              </div>
              <div class="vote_content">
                <van-progress
                  color="#f00"
                  :percentage="item.percentage"
                  :show-pivot="false"
                />
                <div class="vote_number">
                  <div>
                    <span>{{ item.consAmount }}</span
                    ><span>反对</span>
                  </div>
                  <div>
                    <span>{{ item.prosAmount }}</span
                    ><span>赞成</span>
                  </div>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToVoteDetail(item.activityId, item.state)"
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
        <van-tab title="投票驳回">
          <ul id="all_list" v-if="votereject.length !== 0">
            <li v-for="item in votereject" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>
                <div>{{ item.endTime }}截止</div>
              </div>
              <div class="vote_content">
                <van-progress
                  color="#f00"
                  :percentage="item.percentage"
                  :show-pivot="false"
                />
                <div class="vote_number">
                  <div>
                    <span>{{ item.consAmount }}</span
                    ><span>反对</span>
                  </div>
                  <div>
                    <span>{{ item.prosAmount }}</span
                    ><span>赞成</span>
                  </div>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToVoteDetail(item.activityId, item.state)"
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
        <van-tab title="搜索结果">
          <ul id="all_list" v-if="votealllist.length !== 0">
            <li v-for="item in votealllist" :key="item.activityId">
              <div class="vote_title">
                <div>{{ item.title }}</div>
                <div>{{ item.endTime }}截止</div>
              </div>
              <div class="vote_content">
                <van-progress
                  color="#f00"
                  :percentage="item.percentage"
                  :show-pivot="false"
                />
                <div class="vote_number">
                  <div>
                    <span>{{ item.consAmount }}</span
                    ><span>反对</span>
                  </div>
                  <div>
                    <span>{{ item.prosAmount }}</span
                    ><span>赞成</span>
                  </div>
                </div>
              </div>
              <div class="line"></div>
              <div
                class="vote_footer"
                @click="goToVoteDetail(item.activityId, item.state)"
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
  components: { slider, vfooter },
  created() {
    window.scrollTo(0, 0);
    this.voteallnumber = localStorage.getItem("voteallnumber2") || 1;
    this.voteinnumber = localStorage.getItem("voteinnumber2") || 1;
    this.voteendnumber = localStorage.getItem("voteendnumber2") || 1;
    this.voteagreenumber = localStorage.getItem("voteagreenumber2") || 1;
    this.voterejectnumber = localStorage.getItem("voterejectnumber2") || 1;
    this.votealllistnumber = localStorage.getItem("votealllistnumber2") || 1;
    this.getVoteAll();
    this.inVoteAll();
    this.endVoteAll();
    this.agreeVoteAll();
    this.rejectVoteAll();
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
          `${BASEURL}` + "/weimioffice/vote/voteActivityList",
          qs.stringify({
            type: 0,
            pageNum: this.votealllistnumber,
            pageSize: 10,
            keywords: this.searchnumber,
          })
        )
        .then((res) => {
          // console.log(res);
          // console.log(res);
          // 全部类型
          this.active = 5;
          this.votealllist = res.data.result.list;
          this.alllisttotal = res.data.result.total;
          // console.log(this.alltotal);
          for (let i = 0; i < res.data.result.list.length; i++) {
            if (this.votealllist[i].title.length > 10) {
              this.votealllist[i].title =
                res.data.result.list[i].title.substring(0, 10) + "...";
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
      this.searchAll();
      localStorage.setItem("votealllistnumber2", val);
      window.scrollTo(0, -1);
    },
    allChange(val) {
      // console.log(val);
      this.voteallnumber = val;
      this.getVoteAll();
      localStorage.setItem("voteallnumber2", val);
      window.scrollTo(0, -1);
    },
    inChange(val) {
      this.voteinnumber = val;
      this.inVoteAll();
      localStorage.setItem("voteinnumber2", val);
      window.scrollTo(0, -1);
    },
    endChange(val) {
      this.voteendnumber = val;
      this.endVoteAll();
      localStorage.setItem("voteendnumber2", val);
      window.scrollTo(0, -1);
    },
    agreeChange(val) {
      this.voteagreenumber = val;
      this.agreeVoteAll();
      localStorage.setItem("voteagreenumber2", val);
      window.scrollTo(0, -1);
    },
    rejectChange(val) {
      this.voterejectnumber = val;
      this.rejectVoteAll();
      localStorage.setItem("voterejectnumber2", val);
      window.scrollTo(0, -1);
    },
    // 投票获取
    async getVoteAll() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/voteActivityList ",
          qs.stringify({
            type: 0,
            pageNum: this.voteallnumber,
            pageSize: 10,
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
            if (this.voteall[i].title.length > 10) {
              this.voteall[i].title =
                res.data.result.list[i].title.substring(0, 10) + "...";
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
          `${BASEURL}` + "/weimioffice/vote/voteActivityList",
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

            if (this.votein[i].title.length > 10) {
              this.votein[i].title =
                res.data.result.list[i].title.substring(0, 10) + "...";
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
          `${BASEURL}` + "/weimioffice/vote/voteActivityList ",
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
            if (this.voteend[i].title.length > 10) {
              this.voteend[i].title =
                res.data.result.list[i].title.substring(0, 10) + "...";
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
          `${BASEURL}` + "/weimioffice/vote/voteActivityList ",
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
            if (this.voteagree[i].title.length > 10) {
              this.voteagree[i].title =
                res.data.result.list[i].title.substring(0, 10) + "...";
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
          `${BASEURL}` + "/weimioffice/vote/voteActivityList ",
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
            if (this.votereject[i].title.length > 10) {
              this.votereject[i].title =
                res.data.result.list[i].title.substring(0, 10) + "...";
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
    // 跳转投票详情页
    goToVoteDetail(index, state) {
      // console.log(index,state);
      this.$router.push({
        path: "/votedetail",
        query: { activityId: index, state: state },
      });
      // console.log(index);
      // let routeData = this.$router.resolve({
      //   path: "/votedetail",
      //   query: { activityId: index,state:state },
      // });
      // window.open(routeData.href, "_blank");
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
  },
};
</script>
<style lang="less">
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
.vote {
  width: 100%;
  height: auto;
  background-color: black;
  .van-tabs__nav {
    background: #0c0c0c;
  }
  .van-tabs {
    margin-top: 18px;
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
      form {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        align-items: center;
      }

      img {
        width: 16px;
        height: 16px;
      }
      img:nth-of-type(1) {
        position: relative;
        left: 30px;
        top: 1px;
      }

      input {
        position: relative;
        left: 0px;
        width: 345px;
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
      padding-top: 10px;
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
          font-size: 11px;
          font-family: "苹方-简";
          font-weight: normal;
          position: relative;
          right: 15px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
      .vote_content {
        // display: flex;
        // align-items: center;
        // flex-direction: row;
        // justify-content: space-between;
        margin-top: 20px;
        .van-progress {
          width: 315px;
          margin: 0 auto;
          background: rgba(31, 145, 211, 1);
          height: 9px;
        }
        .vote_number {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          font-size: 12px;
          font-family: "苹方-简";
          font-weight: normal;
          margin-top: 5px;
          div:nth-child(1) {
            padding-left: 15px;
            color: #d93e3e;
          }
          div:nth-child(2) {
            padding-right: 15px;
            color: #009fcd;
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

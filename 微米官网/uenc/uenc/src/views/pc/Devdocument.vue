<template>
  <div class="Devdocument">
    <div class="banner">
      <div class="content w1300">
        <div class="title">{{ $t("Developer.DevDoc") }}</div>
      </div>
    </div>
    <div class="cont">
      <div class="w1300">
        <div class="l">
          <div class="title">概述</div>
          <el-collapse>
            <el-collapse-item title="UENC节点运行" name="1">
              <div>UENC节点运行</div>
            </el-collapse-item>
            <el-collapse-item title="UENC开发者文档" name="2">
              <div>UENC开发者文档</div>
            </el-collapse-item>
            <el-collapse-item title="交易所部署文档" name="3">
              <div>交易所部署文档</div>
            </el-collapse-item>
            <el-collapse-item title="参考文档" name="4">
              <div>Protobuf接口文档</div>
              <div>RPC接口文档</div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="c">
          <template v-for="item in dataList">
            <div :key="item.ref" :ref="item.ref">
              <div class="title">{{ item.title }}</div>
              <div class="text">{{ item.text }}</div>
            </div>
          </template>
        </div>
        <div class="r" ref="Rref">
          <template v-for="item in dataList" >
            <div :class="active===item.ref?'active':''" :key="item.ref" v-if="item.title!=='概述'" @click="clickHandle(item.ref)">{{ item.title }}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active:'',
      dataList: [
        {
          title: "概述",
          text:
            " UENC开发者文档标题,,精决其团办列往常前风备统改资毛温片主约成千解写每知价别这识时业体记便流验本层度林群使任运回例集议。",
          ref: "ref1",
        },
        {
          title: "UENC是什么?",
          text:
            " UENC是一个以跨链为技术方向的可扩展基础公链， 基于DHT网状网络、交叉式并行存储技术（CPS）等 创新技术，通过自主研发DPOW共识算法，实现了 高并发、高速度、低成本的用户链上交易体验，满足了未来通证经济高速发展的底层技术需求。 UENC实行无竞争挖矿及去中心化机制，人人都可参与UENC网络基础设施及生态发展建设，共享全球通 证经济生态增长红利。",
          ref: "ref2",
        },
        {
          title: "UENC节点运行",
          text:
            " UENC开发者文档标题,,精决其团办列往常前风备统改资毛温片主约成千解写每知价别这识时业体记便流验本层度林群使任运回例集议。布常称小斯团大识响斗志按将片铁见信接问千七记生织干义自没准达据就影论交必也把种看变质料取说铁引空公新军走龙济国山装交农身取线号较组众新意价位。",
          ref: "ref3",
        },
        {
          title: "UENC开发者文档",
          text:
            "UENC开发者文档标题,,精决其团办列往常前风备统改资毛温片主约成千解写每知价别这识时业体记便流验本层度林群使任运回例集议。布常称小斯团大识响斗志按将片铁见信接问千七记生织干义自没准达据就影论交必也把种看变质料取说铁引空公新军走龙济国山装交农身取线号较组众新意价位。",
          ref: "ref4",
        },
        {
          title: "交易所部署文档",
          text:
            "UENC开发者文档标题,,精决其团办列往常前风备统改资毛温片主约成千解写每知价别这识时业体记便流验本层度林群使任运回例集议。布常称小斯团大识响斗志按将片铁见信接问千七记生织干义自没准达据就影论交必也把种看变质料取说铁引空公新军走龙济国山装交农身取线号较组众新意价位。",
          ref: "ref5",
        },
        {
          title: "交易所部署文档",
          text: "Protobuf接口文档",
          ref: "ref6",
        },
      ],
    };
  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll, false);
  },
  methods: {
  //   handleScroll () {
  //    const aa = document.documentElement.scrollTop
  //    const arr = [...this.dataList].reverse()
  //     for (var i = 0; i < arr.length; i++) {
  //       if (this.$refs[arr[i].ref][0]&&this.$refs[arr[i].ref][0].offsetTop120 <= aa) {
  //         this.active = arr[i].ref
  //         break
  //       }
  //     }
  //  },
    clickHandle(ref) {
      const top = this.$refs[ref][0].offsetTop-112
      window.scrollTo({left:0,top,behavior:'smooth'})
    }
  },
};
</script>
<style lang="less">
.Devdocument {
  .el-collapse {
    border: none;
  }
  .el-collapse-item__wrap {
    border: none;
  }
  .el-collapse-item__header {
    font-size: 18px;
    border: none;
    color: #666;
  }
  .el-collapse-item__content {
    color: #666;
    padding: 0 0 0 12px;
    div {
      line-height: 28px;
      font-size: 14px;
    }
  }
}
</style>
<style lang="less" scoped>
.Devdocument {
  .banner {
    height: 900px;
    background-image: url("../../assets/images/index/Developersbg.png");
    background-size: cover;
    background-position: center center;
    padding-top: 203px;
    .content {
      padding: 250px 0 0;
      .title {
        font-size: 60px;
        color: #ffffff;
      }
    }
  }
  .cont {
    background-image: url("../../assets/images/index/Devdocumentbg.png");
    background-size: cover;
    background-position: center center;
    .w1300 {
      display: flex;
      .l {
        .title {
          font-size: 18px;
          font-weight: 500;
          color: #5432F4;
          line-height: 25px;
          margin-bottom: 14px;
        }
        width: 200px;
        margin-top: 90px;
      }
      .c {
        flex: 1;
        padding: 76px 60px 300px;
        .title {
          margin-bottom: 16px;
          font-size: 28px;
          font-weight: 500;
          color: #383838;
          line-height: 22px;
        }
        .text {
          margin-bottom: 20px;
          font-size: 16px;
          color: #383838;
          line-height: 22px;
        }
      }
      .r {
        margin-top: 76px;
        border-left: 1px solid #979797;
        height: 259px;
        padding-left: 20px;
        .active{
          color: #5432F4;
        }
        div {
          height: 25px;
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #2d2d2d;
          line-height: 25px;
          margin-top: 16px;
        }
      }
    }
  }
}
</style>
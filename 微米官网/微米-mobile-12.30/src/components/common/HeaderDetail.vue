<template>
  <div class="headerdetail">
    <div class="detailheaders" :class="{ sticky: sticky }">
      <img
        src="@assets/images/detail/组 267@3x.png"
        class="return"
        @click="returned"
      />
      <img src="@assets/images/index/组 2.png" class="headerlogo" />
      <div
        class="qiehuan"
        @click="selectlanguage"
        v-loading.fullscreen.lock="fullscreenLoading"
      >
        <img src="@assets/images/index/切换.png" alt />
        <span>中/英</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerdetail",
  inject: ["reload"],
  data() {
    return {
      sticky: false,

      fullscreenLoading: false,
    };
  },

  created() {},
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {},
  methods: {
    returned() {
      this.$router.go(-1); // 后退
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //  console.log(scrollTop);
      if (scrollTop > 10) {
        this.sticky = true;
      }
      if (scrollTop <= 0) {
        this.sticky = false;
      }
      // console.log(scrollTop);
    },
    selectlanguage() {
      this.fullscreenLoading = true;
      if (this.$i18n.locale == "cn") {
        this.$i18n.locale = "en";
        localStorage.setItem("lang", "en");
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else if (this.$i18n.locale == "en") {
        this.$i18n.locale = "cn";
        localStorage.setItem("lang", "cn");
        setTimeout(() => {
          location.reload();
        }, 1500);
      }
    },
  },
};
</script>
<style lang="less">
.sticky {
  width: 100%;
  height: 44px;
  width: 100% !important;
  top: 0;
  left: 0;
  right: 0;
  position: fixed !important;
  background: rgba(12, 12, 12) !important;
  z-index: 20;
}

.headerdetail {
  width: 100%;
  height: 44px;
  position: relative;
  top: 0px;
  z-index: 20;
  display: flex;
  flex-direction: row;
  justify-content: space-between !important;
  background: rgba(12, 12, 12);
  .detailheaders {
    width: 100%;
    height: 44px;
    position: relative;
    top: 0px;
    z-index: 20;
    display: flex;
    flex-direction: row;
    justify-content: space-between !important;
    align-items: center;
    background: rgba(12, 12, 12);
  }
  .return {
    width: 15.74px;
    height: 27.24px;
    position: relative;
    left: 14px;
  }
  .headerchoose {
    width: 29px;
    height: 26px;

    top: 8px;
  }
  .headerlogo {
    width: 83px;
    height: 28px;
    position: relative;
    left: 14px;
  }
  .qiehuan {
    width: 56px;
    height: 24px;
    position: relative;
    right: 14px;
    background: rgba(51, 51, 51, 1);
    opacity: 1;
    border-radius: 5px;
    img {
      position: relative;
      left: 7px;
    }
    span {
      position: relative;
      left: 10px;
      font-size: 10px;
      font-family: Segoe UI;
      font-weight: 400;
      line-height: 14px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
  }
}
</style>

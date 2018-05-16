<template>
  <div class="seller" :scroll="scrollWrap()">
    <seller-header :seller="seller" class="seller-content"></seller-header>

    <div class="seller-tab">
      <div class="tab-item">
        <router-link to="Goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="Ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="Sellers">商家</router-link>
      </div>
    </div>

    <router-view></router-view>

  </div>
</template>
<script>
import SellerHeader from "../components/SellerHeader";
// import foodGoods from "../components/foodGoods.vue";
import * as storeApi from "../api/store";

export default {
  data() {
    return {
      seller: []
    };
  },
  created() {
    storeApi.getStore(this.$route.params.id).then(res => {
      this.seller = res;
    });
  },
  components: {
    "seller-header": SellerHeader
    // "food-goods": foodGoods
  },
  computed: {
    //商店id
    Params() {
      return this.$route.params.id;
    }
  },
  methods: {
    //滚动

    scrollWrap: function() {
      window.onscroll = function() {
        // var h = document.querySelector(".seller-content").clientHeight;
        // var navHeight = document.querySelector(".nav").clientHeight;
        // var scrollTop =
        //   document.documentElement.scrollTop || document.body.scrollTop;
        // if (scrollTop > 1) {
        //   document.querySelector(".nav").className = "nav nav-fixed";
        // }
        // if (scrollTop > h) {
        //   document.querySelector(".seller-container").className =
        //     "seller-container seller-fixed-container";
        // }
      };
    }
  }
};
</script>

<style lang="less">
// .seller{
//   position: absolute;
//   top: 0;
//   width: 100%;
//   height: 100%;
// }
.seller-container {
  overflow: hidden;
}
.seller-fixed-container {
  position: fixed;
  top: 40px;
  background: #fff;
}
.seller-tab {
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #dfdfdf;
  height: 40px;
  .tab-item {
    width: 33.3%;
    float: left;
    text-align: center;
    & > a {
      text-decoration: none;
      color: #56546e;
      line-height: 30px;
      display: inline-block;
      padding: 0 15px;
      margin-top: 9px;
    }
    & > .router-link-active {
      color: #2d8cf0;
      border-bottom: 1px solid #2d8cf0;
    }
  }
}
</style>

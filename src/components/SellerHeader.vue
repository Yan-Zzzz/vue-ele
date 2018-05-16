<template>
  <div class="seller-header">
    <seller-nav></seller-nav>
    <div class="avatar">
      <div class="avatar-img">
        <div class="avatar-background">
          <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <div class="avatar-photo">
          <img width="80" height="80" :src="seller.avatar" alt="">
        </div>
        <div class="avatar-collect">
          <span class="iconfont icon-shoucang"></span>
        </div>
      </div>

      <div class="seller-head">
        <h3>{{seller.name}}</h3>
        <div class="seller-description">
          <!-- score -->
          <score :score="seller.score" :size="scoreSize"></score> {{seller.score}} | 月售{{seller.sellCount}}份 | {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <div class="tips">
          {{seller.tips}}
        </div>
        <div class="seller-supports" v-if="seller.supports">
          <store-supports :supports="seller.supports"></store-supports>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import StoreSupports from "./StoreSupports";
import Score from "./Score";
import SellerNav from "./SellerNav";
export default {
  props: ["seller"],
  data(){
    return{
          scoreSize: "small", //设置星星大小
    }
  },
  components: {
    "seller-nav": SellerNav,
    "store-supports": StoreSupports,
    score: Score
  }
  // methods: {
  //   scrollNav: function() {
  //     console.log(666);
  //   }
  // }
};
</script>
<style lang="less">
// .seller-header {
//   //height: 20.3125rem;
// }
// .seller-header-fixed{
//     position: fixed;
//     height: 100%;
//     width: 100%;
//     z-index: 99;
//     background: #fff;
// }

.avatar-img {
  position: relative;
  background: rgba(7, 17, 27, 0.3);
  height: 110px;
  .avatar-background {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    filter: blur(10px);
  }
  .avatar-photo {
    position: absolute;
    left: 50%;
    margin-left: -40px;
    top: 50px;
  }
  .avatar-collect {
    position: absolute;
    right: 15px;
    top: 88px;
    width: 36px;
    height: 36px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    .icon-shoucang {
      color: #f94f69;
      font-size: 26px;
      line-height: 36px;
    }
  }
}
.seller-head {
  margin-top: 35px;
  color: #56546e;
  padding: 0 30px;
  h3 {
    text-align: center;
    font-weight: bold;
    margin: 0 0 15px 0;
  }
  .seller-description {
    font-size: 12px;
    text-align: center;
    margin-bottom: 8px;
  }
  .tips {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .seller-supports {
    font-size: 12px;
    display: flex;
    & > .right {
      line-height: 20px;
      flex: 1;
      text-align: right;
    }
  }
}
</style>

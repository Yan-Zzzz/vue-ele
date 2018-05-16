<template>
  <div class="ratings">
    <div class="score-header">
      <div class="left">
        <h1>3.9</h1>
        <h3>综合评分</h3>
        <p>高于周边商家62%</p>
      </div>
      <div class="right">
        <div>
          服务态度
          <score :score="seller.score" :size="scoreSize"></score>
        </div>
        <div>
          商品评分
          <score :score="seller.score" :size="scoreSize"></score>
        </div>
        <div>
          送达时间   <span>{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
        <ratings-item :ratings="seller.ratings"></ratings-item>  
    </div>

  </div>
</template>

<script>
import Score from "./Score";
import ratingsItem from "./ratingsItem"
import * as storeApi from "../api/store";
export default {
  data() {
    return {
      seller: [],
      scoreSize:"medium"//设置星星大小
    };
  },
  components: {
    "score": Score,
    "ratings-item":ratingsItem,
  },
  created() {
    storeApi.getStore(this.$route.params.id).then(res => {
      this.seller = res;
    
      console.log(this.seller);
    });
  },
  computed: {
    Params() {
      return this.$route.params.id;
    }
  }
};
</script>

<style lang="less" scoped>

</style>

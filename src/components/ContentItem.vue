<template>
  <div class="list">
    <ul>
      <li v-for="(item,index) in store" :key="index">
        <div class="item">
          <div class="item-icon" @click="storeItemClick(item)">
            <img width="64" height="64" :src="item.seller.avatar" alt="">
          </div>
          <div class="item-link-wrap">
            <div class="item-content" @click="storeItemClick(item)">
              <h3>{{item.seller.name}}</h3>
              <div class="item-description">
                <span class="left">
                  <score :score="item.seller.score" :size="scoreSize"></score>
                  <span>{{item.seller.score}}</span>
                  <span>月售{{item.seller.sellCount}}份</span>
                </span>
                <span class="right">
                  {{item.seller.description}}
                </span>
              </div>
              <div class="item-sell-count">
                <span class="left">
                  <span>￥{{item.seller.minPrice}}起送 | 优惠配送费￥{{item.seller.deliveryPrice}}</span>
                </span>
                <span class="right">
                  <span>1.1km | 32分钟</span>
                </span>
              </div>
            </div>
            <div class="supports" v-if="item.seller.supports">
              <store-supports :supports="item.seller.supports"></store-supports>
            </div>
          </div>

        </div>

      </li>
    </ul>

  </div>
</template>
<script>
import StoreSupports from "./StoreSupports";
import Score from "./Score";
import * as storeApi from "../api/store";

export default {
  components: {
    "store-supports": StoreSupports,
    score: Score
  },
  data() {
    return {
      store: [],
      scoreSize: "small" //设置星星大小
    };
  },
  created() {
    storeApi.getStoreList().then(res => {
      this.store = res;
    });
  },
  methods: {
    storeItemClick(item) {
      console.log(item.seller.name);
      //this.$router.push("seller",store); // 跳转到商店详情，路由参数带上商店id
      this.$router.push({
        path: "seller",
        name: "goods",
        params: {
          id: item.seller.name
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../styles/mixin.less";
li {
  width: 100%;
}

.item {
  padding: 18px 18px 0 18px;
  padding-bottom: 18px;
  display: flex;
  .border-1px(rgba(7, 17, 27, 0.1));
  .item-link-wrap {
    flex: 1;
    margin-left: 10px;
    .supports {
      font-size: 10px;
    }
  }
}
.item-content {
  h3 {
    font-size: 14px;
    color: rgb(7, 17, 27);
    line-height: 14px;
    margin: 4px 0 8px 0;
  }
  .item-description,
  .item-sell-count {
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 10px;
    margin-bottom: 8px;
    min-height: 12px;
  }
}
</style>

<template>
    <div class="ratings-item">
        <ul>
            <li v-for="(item,index) in ratings" :key="index">
                <div class="avatar">
                    <img :src="item.avatar" width="30">
                </div>
                <div class="wrap">
                    <h3>{{item.username}}
                        <span class="right">20160-0404</span>
                    </h3>
                    <p>
                        <score :score="item.score" :size="scoreSize"></score>
                        <span>{{item.deliveryTime}}</span>
                    </p>
                    <p>{{item.text}}</p>
                    <div class="block-list" v-if="item.recommend">
                        <span v-for="(list,index) in item.recommend" :key="index">
                            {{list}}
                        </span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import Score from "./Score";
export default {
  props: ["ratings"],
  data() {
    return {
      scoreSize: "small" //设置星星大小
    };
  },
  components: {
    score: Score
  }
};
</script>
<style lang="less">
@import "../styles/mixin.less";
.ratings-item {
  ul {
    padding: 15px;
  }
  li {
    .border-1px(rgba(7, 17, 27, 0.1));
    padding: 10px 10px 10px 0;
    display: flex;
    width: 100%;
  }
  p {
    line-height: 20px;
    margin-bottom: 10px;
  }
  .wrap {
    flex: 100%;
    padding-left: 15px;
  }
}
.block-list > span {
  padding: 3px;
  display: inline-block;
  color: #999;
  border: 1px solid #dfdfdf;
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>


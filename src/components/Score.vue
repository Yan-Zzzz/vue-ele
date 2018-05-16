<template>

    <div class="stars" :class="stars" :addevent="grade()">
        <span v-for="(item,index) in starsClass" :class="item" class="star-item" :key="index" ></span>
    </div>
</template>

<script>
const STARS_LENGTH = 5; //最大评分
const STARS_ON = "on"; //满星
const STARS_HALF = "half"; //一半
const STARS_OFF = "off"; //灰色的
export default {
  props: {
    score: {
      type: Number
    },
    size: {
      //  size控制传递的星星选型：small：最小  medium：中等 large：最大
      required: true
    }
  },
  methods: {
    grade() {
        var size=this.size;
        // console.log(size)
        if(size=="large"){
            console.log(1)
        }
    }
  },
  computed: {
    stars() {
      return this.size + "-stars";
    },
    starsClass() {
      var result = [];
      var score = Math.floor(this.score * 2) / 2; //获取评分
      var half = score % 1 !== 0; //半星
      var on = Math.floor(score); //整星
      //整星
      for (var i = 0; i < on; i++) {
        result.push(STARS_ON);
      }
      //半星
      if (half) {
        result.push(STARS_HALF);
      }
      while (result.length < STARS_LENGTH) {
        result.push(STARS_OFF);
      }
      return result;
    }
  }
};
</script>
<style lang="less">
@import "../styles/mixin.less";
.stars {
  display: inline-block;
  .star-item {
    display: inline-block;
  }
  /* 
        小星星
    */
  &.small-stars {
    .star-item {
      width: 10px;
      height: 10px;
      background-size: 10px 10px;
      background-repeat: no-repeat;
      &.on {
        .bg-image("star24_on");
      }
      &.off {
        .bg-image("star24_off");
      }
      &.half {
        .bg-image("star24_half");
      }
    }
  }
  /* 
        中等星星
    */
  &.medium-stars {
    .star-item {
      width: 15px;
      height: 15px;
      background-size: 15px 15px;
      background-repeat: no-repeat;
      &.on {
        .bg-image("star36_on");
      }
      &.off {
        .bg-image("star36_off");
      }
      &.half {
        .bg-image("star36_half");
      }
    }
  }
  /* 
        大星星
    */
  &.large-stars {
    .star-item {
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
      background-repeat: no-repeat;
      &.on {
        .bg-image("star48_on");
      }
      &.off {
        .bg-image("star48_off");
      }
      &.half {
        .bg-image("star48_half");
      }
    }
  }
}
</style>


<template>
    <div class="food-goods" v-show="showFood">
        <div class="food-goods-bg"  @click="closeMain()"> </div>
        <div class="food-goods-main">
            <img :src="foods.image" alt="">
            <div class="close" @click="closeMain()">
                X
            </div>
            <div class="main-text">
                <h3>{{foods.name}}</h3>
                <p>
                    <small>月售{{foods.sellCount}}</small>
                </p>
                <p class="add">
                    <span>￥{{foods.price}}</span>
                    <span class="right">+</span>
                </p>
                <p>{{foods.info}}</p>
            </div>
        </div>
        {{foods}}
    </div>
</template>
<script>
export default {
  props: ["foods"],
  data() {
    return {
      showFood: false
    };
  },
  methods: {
    close() {
        this.showFood=true;
    },
    closeMain(){
         this.showFood=false;
    }
  }
};
</script>
<style lang="less">
.food-goods {
  position: fixed;
  z-index: 66;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .food-goods-bg {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
  .food-goods-main {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80%;
    left: 0;
    overflow: hidden;
    background: #fff;
    .close {
      position: absolute;
      right: 20px;
      font-size: 30px;
      top: 10px;
      color: #fff;
    }
    img {
      width: 100%;
      max-height: 300px;
    }
  }
}
</style>

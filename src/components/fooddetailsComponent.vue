<template>
    <div class="fooddetails-button">
        <transition name="slide-fade">
            <span  class="cart-minus" v-show="food.count>0" @click="minerCart()">-</span>
        </transition>
        <span class="cart-num" v-show="food.count>0">{{food.count}}</span>
        <span class="cart-plus" @click="addCart()">+</span>
    </div>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart() { 
      //添加
   
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
        this.$emit('addCart', event.target);//给addcart派发事件
        
    //  console.log(this.food.count, "添加");
    },
    minerCart() {
      //减少
      if (!this.food.count) {
        Vue.set(this.food, "count", 0);
      } else {
        this.food.count--;
      }
     // console.log(this.food.count, "减少");
    }
  }
};
</script>
<style lang="less" >
.fooddetails-button {
  width: 100%;
  position: relative;
  text-align: center;

  .cart-num {
    display: inline-block;
    flex: 2;
    color: #666;
    line-height: 20px;
  }
  .cart-minus,
  .cart-plus {
    width: 20px;
    height: 20px;
    line-height: 18px;
    display: inline-block;
    background: dodgerblue;
    border-radius: 50%;
    color: #fff;
  }
  .cart-minus {
    position: absolute;
    left: 0;
  }
  .cart-plus {
    position: absolute;
    right: 0;
  }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<template>

    <footer class="shop-cart">
        <div class="shop-cart-bg" v-if="showbg" @click="hidebg()">1</div>
        <div class="shop-price">
            <div class="shop-tips">
                <span> {{deliveryPrice}}</span> 起送
            </div>
            <transition @enter="enter()" @after-enter="afterEnter()" @before-leave="beforeLeave()" @leave="leave()">
                <div class="shop-order" v-show="shows" :css="false">
                    <div class="shop-order-title">
                        <span class="left">已选商品 </span>
                        <span class="right" @click="emptyShop()">清空 </span>
                    </div>
                    <ul>
                        <li v-for="(food,index) in sellerFoods" :key="index">
                            <span class="entity-list-name">
                                <em>
                                    {{food.name}}
                                </em>
                            </span>
                            <span class="entity-list-price">
                                ￥ {{food.price*food.count}}
                            </span>
                            <span class="entity-list">
                                <fooddetailsComponent :food="food"></fooddetailsComponent>
                            </span>
                        </li>
                    </ul>
                </div>
            </transition>
        </div>

        <div class="shop-main" :class="{'active':totalprice!=0 && (minPrice<totalprice || minPrice>totalprice || minPrice===totalprice) }">
            <span class="btn-cart " attr-quantity="1">
                <span class="iconfont icon-shopping_cart"></span>
                <span class="count" v-if="totalcount!=0">{{totalcount}}</span>
            </span>
            <div class="btn-cart-info" @click="showOrderList()">
                <p>￥{{totalprice}}</p>
                <p>配送费￥{{deliveryPrice}}</p>
            </div>
            <a href="javasrcipt:;" class="submit-btn" :class="{'active':minPrice<totalprice ||minPrice===totalprice}">
                <span class="pay">{{difference}}</span>
                <!-- <span v-if="totalprice==0">￥{{deliveryPrice}}起送</span>
                <span class="pay" v-if="deliveryPrice>totalprice && totalprice!=0">还差￥{{difference}}起送</span> -->
            </a>
        </div>
        <!-- 小球球 -->
        <div class="ball-wrapper">
            <transition-group name="slide-fade" mode="out-in">
                <!-- v-show="ball.show" -->
                <div class="ball" v-for="(item,index) in balls" :key="index" v-show="balls.show">
                    <div class="inner"></div>
                </div>
            </transition-group>

        </div>
    </footer>
</template>
<script>
import fooddetailsComponent from "../components/fooddetailsComponent";
export default {
  components: {
    fooddetailsComponent: fooddetailsComponent //商品列表模板
  },
  props: {
    sellerFoods: {
      type: Array,
      default: function() {
        return [
          {
            price: 0,
            count: 0
          }
        ];
      }
    },
    minPrice: {
      //起送
      type: Number,
      default: 0
    },
    deliveryPrice: {
      //配送
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showbg: false,
      shows: false,
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      drop: []
    };
  },
  computed: {
    totalprice() {
      var total = 0; //价格
      this.sellerFoods.forEach(function(food) {
        total += food.price * food.count;
      });
      return total;
    },
    totalcount() {
      //件数
      var count = 0;
      this.sellerFoods.forEach(function(food) {
        count += food.count;
      });
      return count;
    },
    difference() {
      //计算差值,三种状态
      if (
        this.minPrice < this.totalprice ||
        this.minPrice === this.totalprice
      ) {
        return "去结算";
      } else if (this.totalprice == 0) {
        return `￥` + this.minPrice + `起送`;
      } else if (this.minPrice > this.totalprice && this.totalprice != 0)
        // return this.deliveryPrice - this.totalprice;
        return `还差￥` + (this.minPrice - this.totalprice) + `起送`;
    }
  },
  methods: {
    dropEvent() {
      // event.clientX, event.clientY
      var el = event;
      //getBoundingClientRect
      //取点击按钮的位置也就是第一个小球的位置
      for (var i = 0; i < this.balls.length; i++) {
        var ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.drop.push(ball);
          return;
        }
      }
      // console.log("横坐标：" + x, "纵坐标：" + y, this.ball);
    },
    //观察动画开始
    showOrderList() {
      this.showbg = !this.showbg;
      this.shows = !this.shows;
        if(this.sellerFoods == "") {
        this.showbg = false;
        this.shows = false;
      }
    },
    //背景关闭
    hidebg() {
      this.showbg = false;
      this.shows = false;
    },
    //清空
    emptyShop() {
      //清空购物车
    //  console.log(this.sellerFoods);
      this.sellerFoods.forEach(function(food) {
        console.log(food);
        food.count = 0;
      });
      this.showbg = false;
      this.shows = false;
    },

    //进入
    enter() {
      const defaultListHeight = document.body.clientHeight / 2;
      const LI = 46; //默认li高度
      const TITLE = 40; //默认title高度
      var shopTipsH = document.querySelector(".shop-tips").offsetHeight;
      var shopTipsHs = document.querySelector(".shop-order >ul").offsetHeight;
      //计算订单列表高度
      var shopOrderH = LI * this.sellerFoods.length + TITLE + 30;

      if (shopOrderH > defaultListHeight) {
        var shopOrderHeight = defaultListHeight - shopTipsH;

        var shopOrderUl = defaultListHeight - shopTipsH - TITLE;

        document.querySelector(".shop-order").style.height =
          shopOrderHeight + "px";

        document.querySelector(".shop-order>ul").style.height =
          shopOrderUl + "px";

        this.afterEnter(
          defaultListHeight - shopTipsH,
          defaultListHeight - shopTipsH - TITLE
        );
        this.leave(defaultListHeight - shopTipsH);
        this.beforeLeave(defaultListHeight - shopTipsH);
      } else {
        document.querySelector(".shop-order").style.height = shopOrderH + "px";
        this.afterEnter(shopOrderH);
        this.leave(shopOrderH);
        this.beforeLeave(shopOrderH);
      }
    },
    afterEnter(el) {
      document.querySelector(".shop-order").style.height = el + "px";
    },
    beforeLeave(el) {
      document.querySelector(".shop-order").style.height = el + "px";
    },
    leave(el) {
      document.querySelector(".shop-order").style.height = 0 + "px";
    }
  }
};
</script>
<style lang="less">
@import "../styles/mixin.less";
.shop-cart {
  height: auto;
  position: absolute;
  bottom: 0;
  width: 100%;
  .shop-cart-bg {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
    // background: rgba(0, 0, 0, 0.5)
    background: rgba(7, 17, 27, 0.4);
  }
  .shop-price {
    background: #fff;
    width: 100%;
    height: auto;
    position: relative;
    z-index: 2;
    .shop-tips {
      height: 20px;
      font-size: 10px;
      line-height: 20px;
      text-align: center;
      font-weight: 300;
      background: #fffad6;
      & > span {
        color: #f01414;
      }
    }

    .shop-order {
      display: block;
      overflow: hidden;
      //   padding-bottom: 40px;
      box-sizing: border-box;

      .shop-order-title {
        line-height: 40px;
        background: #f3f5f7;
        height: 40px;
        padding: 0 15px;
        box-sizing: border-box;
      }
      & > ul {
        overflow-y: scroll;
      }
      li {
        height: 46px;
        padding: 13px 15px;
        display: flex;
        box-sizing: border-box;
        .border-1px(rgba(7, 17, 27, 0.1));
        margin-left: 10px;
        .entity-list-name {
          flex: 5.5;
          font-style: normal;
          display: inline-block;

          & > em {
            vertical-align: middle;
            font-style: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 10rem;
            display: inline-block;
          }
        }
        .entity-list-price {
          flex: 2.5;
          text-align: right;
          vertical-align: middle;
          color: #f01414;
          font-weight: 700;
          & > em {
            font-size: 10px;
            color: #999;
            text-decoration: line-through;
          }
        }
        .entity-list {
          flex: 3.5;
          display: inline-block;
          text-align: right;
          padding-left: 20px;
        }
      }
    }
  }
  .shop-main {
    height: 45px;
    background: rgba(61, 61, 63, 1);
    display: flex;
    color: #fff;
    position: relative;
    z-index: 9;
    width: 100%;
    .btn-cart {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 5px solid #444;
      background: #363636;
      margin-top: -15px;
      margin-left: 15px;
      text-align: center;
      position: relative;
      .icon-shopping_cart {
        color: #666669;
        line-height: 40px;
      }
    }
    .btn-cart-info {
      position: absolute;
      width: 70%;
      left: 0;
      padding-left: 70px;
      padding-top: 6px;
      font-size: 10px;
      line-height: 16px;
      color: #999;
      & > p:first-child {
        font-size: 14px;
        color: #fff;
      }
    }
    .submit-btn {
      width: 30%;
      position: absolute;
      right: 0;
      color: inherit;
      line-height: 45px;
      text-decoration: none;
      background: #535356;
      text-align: center;
    }
  }
  .shop-main.active {
    .btn-cart {
      background: #3190e8;
      .icon-shopping_cart {
        color: #fff;
      }
      .count {
        position: absolute;
        right: -3px;
        background: #ff3c15;
        top: -3px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        line-height: 15px;
        font-size: 10px;
      }
    }
    .submit-btn {
      background: #535356;
    }
    .submit-btn.active {
      background: #4cd964;
    }
  }

  .shop-order {
    transform: translate(0, 0, 0, 0);
  }
  .shop-order.v-enter {
    // height: 200px;
  }
  .shop-order.v-enter-active,
  .shop-order.v-leave-active {
    transition: all 0.3s;
    height: 0;
  }
  .shop-order.v-enter-to {
    height: 0;
  }
  .shop-order.v-leave {
    height: 0;
  }

  .shop-order.v-leave-to {
    height: 0;
  }
}
.ball-wrapper {
  .ball {
    position: fixed;
    left: 32px;
    bottom: 30px;
    z-index: 222;
    transition: all 0.4s ease;
    .inner {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      transition: all 0.4s ease;
      background: dodgerblue;
    }
  }

  .active {
    transform: translate3d(-100px, 82px, 0px, 0px);
  }
}

// .v-enter {
//   margin-top: 50px;
// }
// .v-enter-active {
//   transition: all 3s;
// }
// .v-enter-to {
//   margin-top: 10px;
//   opacity: 0;
// }
</style>

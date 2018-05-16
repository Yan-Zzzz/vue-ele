<template>
    <div class="goods">
        <div class="goods-wrapper">
            <div class="goods-menu" ref="goodsMenu">
                <ul>
                    <!-- :class="active(item)"  -->
                    <li class="menu-list" v-for="(item,index) in goods" :class="{'active':currentIndex()===index}" :key="index" @click="sellerMenu(item)" ref="menuList">
                        <span :id="item.name" class="text"> {{item.name}}</span>
                    </li>
                </ul>
            </div>
            <transition>
                <div class="goods-foods" id="goods-foods" ref="goodsFoods" @scroll="_scroll()">
                    <ul>
                        <li v-for="(item,index) in goods" :key="index" class="food-list" ref="foodList">
                            <h2 :id="item.name">{{item.name}}</h2>
                            <ul>
                                <li v-for="(food,index) in item.foods" :key="index" class="food-item">
                                    <div class="food-wrap">
                                        <div class="foods-icon" @click="selectFood(food,$event)">
                                            <img width="64" height="64" :src="food.image" alt="">
                                        </div>
                                        <div class="foods-content" @click="selectFood(food,$event)">
                                            <h3>{{food.name}}</h3>
                                            <div class="foods-description">{{food.description}}</div>
                                            <div class="foods-sell-count">
                                                <span>月售{{food.sellCount}}份</span>
                                                <span>好评率{{food.rating}}</span>
                                            </div>
                                            <div class="price">
                                                <span class="food-price">￥{{food.price}}</span>
                                                <span class="food-old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>

                                            </div>
                                        </div>
                                        <div class="cart-content">
                                            <!--  -->
                                            <fooddetailsComponent :food="food" @addCart="addCartEvent()"></fooddetailsComponent>
                                        </div>
                                    </div>

                                </li>
                            </ul>

                        </li>
                    </ul>
                </div>
            </transition>
        </div>
        <!-- shop-cart
                deliveryPrice:配送费:
                minPrice：起送费
                 :foods="food"
                 :sellerFoods="sellerFoodsData" 
             -->
        <shop-cart :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :sellerFoods="sellerFoods" ref="drop"> </shop-cart>
        <food-goods :foods="foods" ref="foodsGood"></food-goods>
    </div>

</template>

<script>
import shopCart from "../components/ShopCart.vue";
import foodGoods from "../components/foodGoods.vue";
import * as storeApi from "../api/store";
import fooddetailsComponent from "../components/fooddetailsComponent";
export default {
  data() {
    return {
      goods: [],
      seller: [],
      listHeight: [],
      scrollY: 0, //初始 滚动距离
      foods: []
    };
  },
  components: {
    "shop-cart": shopCart,
    "food-goods": foodGoods,
    fooddetailsComponent: fooddetailsComponent
  },
  created() {
    storeApi.getStore(this.$route.params.id).then(res => {
      this.seller = res;
      this.goods = res.goods;
      console.log(res);
      this.$nextTick().then(() => {
        this.currentIndex();
      });
    });
  },
  methods: {
    addCartEvent(food) {
      this.$refs.drop.dropEvent();
    },
    sellerMenu(item) {
      //滚动 左边导航定位
      const $title = this.$refs.goodsFoods.querySelector("#" + item.name);
      if ($title) {
        $title.scrollIntoView();
      }
    },
    _scroll() {
      //取滚动距离
      this.scrollY = Math.round(
        document.querySelector("#goods-foods").scrollTop
      );
      var foodList = this.$refs.goodsFoods.querySelectorAll(".food-list");
      var height = 0;
      this.listHeight.push(height);
      //获取文档高度 集合
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
      //获取文档出现距离
    },
    currentIndex() {
      for (var i = 0; i < this.listHeight.length; i++) {
        var topH = this.listHeight[i];
        var botH = this.listHeight[i + 1];
        if (!botH || (this.scrollY >= topH && this.scrollY < botH)) {
          //   console.log(i);
          return i;
        }
      }
      return 0; //如果this.listHeight.length为0；则返回0
    },
    selectFood: function(food, $event) {
       this.$refs.foodsGood.close();
      this.foods = food;
      console.log(food, this.foods);
    }
  },
  computed: {
    Params() {
      return this.$route.params.id;
    },
    sellerFoods() {
      //计算传入foods点击增减
      var foods = [];
      this.goods.forEach(function(good) {
        good.foods.forEach(function(food) {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../styles/mixin.less";
.goods {
}
.goods-wrapper {
  position: absolute;
  display: flex;
  top: 290px;
  width: 100%;
  bottom: 0;
  overflow: scroll;

  .goods-menu {
    flex: 0 0 80px;
    width: 80px;
    overflow: scroll;
    background: #f3f5f7;
    padding-bottom: 45px;
    position: relative;

    top: 0;
    li {
      display: table;
      color: rgb(77, 85, 93);
      height: 50px;
      width: 56px;
      padding: 0 12px;
      .border-1px(rgba(7, 17, 27, 0.1));
      .text {
        font-size: 12px;
        width: 56px;
        display: table-cell;
        vertical-align: middle;
      }
      &.active {
        background: #fff;
      }
    }
  }
  .goods-foods {
    flex: 1;
    position: relative;
    overflow: scroll;
    padding-bottom: 45px;
    position: relative;

    top: 0;
    & > ul >  {
      // padding-left:10px;
    }
    & > ul > li > ul {
      padding-right: 15px;
    }
    h2 {
      font-size: 12px;
      color: rgb(147, 153, 159);
      line-height: 26px;
      background: #f3f5f7;
      margin: 0;
      padding-left: 18px;
      border-left: 2px solid #dadde1;
    }
    .food-item {
      padding: 18px 0 18px 10px;
      .food-wrap {
        display: flex;
        padding-bottom: 18px;
        .border-1px(rgba(7, 17, 27, 0.1));
        .foods-content {
          flex: 1;
          margin-left: 10px;

          h3 {
            font-size: 14px;
            color: rgb(7, 17, 27);
            line-height: 14px;
            margin: 4px 0 8px 0;
          }

          .foods-description,
          .foods-sell-count {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 14px;
            margin-bottom: 6px;
            min-height: 12px;
          }

          .price {
            font-weight: 700;
            position: relative;
            .food-price {
              font-size: 14px;
              color: rgb(240, 20, 20);
            }

            .food-old-price {
              font-size: 10px;
              color: rgb(147, 153, 159);
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
}
.food-list {
  overflow: hidden;
}
.cart-content {
  position: absolute;
  right: 0;
  bottom: 35px;
  width: 70px;
  text-align: right;
}
</style>

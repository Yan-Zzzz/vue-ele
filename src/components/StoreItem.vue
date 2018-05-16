<template>
  <div class="item">
    <div class="item-icon">
      <img width="64" height="64" alt="">
    </div>
    <div class="item-content">
      <h3>food.name</h3>
      <div class="item-description"></div>
      <div class="item-sell-count">
        <span>月售food.sellCount份</span>
        <span>好评率food.rating</span>
      </div>
      <div class="price">
        <span class="item-price">￥food.price</span>
        <span class="item-old-price">￥food.oldPrice</span>
      </div>
    </div>
  </div>

</template>
<script>
export default {
   props: ["store"],
};
</script>
<style lang="less" >
@import "../styles/mixin.less";
.item {
  padding: 18px 18px 0 18px;
  display: flex;
  padding-bottom: 18px;
  .border-1px(rgba(7, 17, 27, 0.1));
}
.item-content{
  flex: 1;
  margin-left: 10px;
    h3 {
      font-size:14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
      margin: 4px 0 8px 0;
    }
    .item-description, .item-sell-count {
      font-size: 10px;
      color: rgb(147, 153, 159);
      line-height: 10px;
      margin-bottom: 8px;
      min-height: 12px;
    }
    .price {
      font-weight: 700;
    }

}

.price {
  font-weight: 700;

  .food-price {
    font-size: 14px;
    color: rgb(240, 20, 20);
  }

  .food-old-price {
    font-size:10px;
    color: rgb(147, 153, 159);
    text-decoration: line-through;
  }
}
            
</style>


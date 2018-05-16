<template>
    <div class="shop-order">
{{food}}
        <div class="shop-order-title">
            <span class="left">已选商品 </span>
            <span class="right">清空 </span>
        </div>
        <ul>
            <li v-for="(item,index) in food" :key="index">
                <span class="entity-list-name">
                    <em>
                      {{food.name}}
                    </em>
                </span>
                <span class="entity-list-price">
                    ￥100
                </span>
                <span class="entity-list">
                    <a href="javascript:;">-</a>
                    <span>20</span>
                    <a href="javascript:;">+</a>
                </span>
            </li>
            <!-- <li>
                        <span class="entity-list-name">
                            <em>
                                我也不知道叫什么名字比较好啊我也不知道叫什么名字比较好啊
                            </em>
                        </span>
                        <span class="entity-list-price">
                            <em>￥120</em> ￥100
                        </span>
                        <span class="entity-list">
                            <a href="javascript:;">-</a>
                            <span>20</span>
                            <a href="javascript:;">+</a>
                        </span>
                    </li> -->
        </ul>
    </div>
</template>
<script>
export default {
  props: {
    food: {
      type: Array
    }
  }
};
</script>
<style lang="less">
.shop-order{

}
</style>

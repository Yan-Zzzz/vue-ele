<template>
    <div class="nav">
        <div class="prev-pages left">
            上一页
        </div>
        <div class="right nav-right">
            <ul>
                <li>
                    <span>搜</span>
                </li>
                <li>
                    <span>拼</span>
                </li>
                <li>
                    <span>拼</span>
                    <div class="tooltip-modal" v-show="tooltipActive">
                        <div class="tooltip-item">
                            <span>icon</span>
                            <span>多人订餐</span>
                        </div>
                        <div class="tooltip-item">
                            <span>icon</span>
                            <span>购物车</span>
                        </div>
                        <div class="tooltip-item">
                            <span>icon</span>
                            <span>分享商家</span>
                        </div>
                    </div>

                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tooltipActive: false
    };
  },
  methods: {
    // scrollNav: function() {
    //   window.onscroll = function() {
    //     var h = document.querySelector(".nav").clientHeight;
    //     var scrollTop =
    //       document.documentElement.scrollTop || document.body.scrollTop;
    //     if (scrollTop > h) {
    //         document.querySelector(".nav").className="nav nav-fixed"
    //     }
    //   };
    // }
  }
};
</script>
<style lang="less">
.nav {
  position: absolute;
  width: 100%;
  display: block;
  color: #fff;
  z-index: 9;
  line-height: 40px;
  .prev-pages {
    padding-left: 15px;
  }
  .nav-right {
    flex: 0 0 120px;
    li {
      float: left;
      width: 40px;
      text-align: center;
    }
  }
}
.nav-fixed {
  position: fixed;
}
</style>



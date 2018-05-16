<template>
  <div class="support-wrapper">
      <ul class="support-ul" :class="{ 'supports-active': isActive }">
        <li class="support-item" v-for="(support,index) in supports" :key="index">
          <!-- <span class="icon" :class="classMap[item.seller.supports[index].type]"></span> -->
          <span class="icon"></span>
          <span class="text">{{supports[index].description}}</span>
        </li>
      </ul>
    <div class="support-btn" @click="toggleSupports">
      <span>{{supports.length}}个活动 </span>
      <i class="iconfont icon-keyboard_arrow_right"></i>
    </div>

  </div>
</template>

<script>
export default {
  props: ["supports"],
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleSupports: function() {
      this.isActive = !this.isActive;

      // if(document.querySelector('.seller-header')){
      //   var sellerHeader=document.querySelector('.seller-header');
      //   sellerHeader.className=" seller-header seller-header-fixed"
      // }
    }
  }
};
</script>

<style lang="less">
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */

.support-wrapper {
  position: relative;
  color: #56546e;
  width: 100%;
  line-height: 20px;
  .support-item {
    width: 100%;
    display: none;
  }
  .support-item:nth-of-type(1) {
    display: block;
  }
  .support-btn {
    position: absolute;
    right: 0;
    top: 0;
    & > span {
      vertical-align: top;
    }
  }
}
.supports-active > .support-item {
  display: block;
}

</style>


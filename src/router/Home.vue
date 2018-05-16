<template>
  <div>
    <global-header/>
    <div class="container">
      <content-header></content-header>
      <content-swiper></content-swiper>
      <content-item> </content-item>
    </div>
    <global-footer/>
  </div>

</template>
<script>
import GlobalHeader from "../components/GlobalHeader";
import ContentHeader from "../components/ContentHeader";
import ContentSwiper from "../components/ContentSwiper";
import ContentItem from "../components/ContentItem";
import GlobalFooter from "../components/GlobalFooter";

export default {
  components: {
    "global-header": GlobalHeader,
    "content-header": ContentHeader,
    "content-swiper": ContentSwiper,
    "content-item": ContentItem,
    "global-footer": GlobalFooter
  }
};
</script>
<style lang="less">
.container {
  position: absolute;
  top: 50px;
  width: 100%;
  bottom: 50px;
  overflow: auto;
}
</style>

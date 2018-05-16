<template>
    <div class="sellers">

        <div class="bulletin">
            <h3>商家信息</h3>
            <div class="bulletin-wrap">

                <p v-if="seller.bulletin">
                    {{seller.bulletin}}
                </p>
            </div>

        </div>
        <div class="seller-message">
            <ul>
                <li>
                    <span>商家名称</span>
                    <span>{{seller.name}}</span>
                </li>
                <li>
                    <span>商家地址</span>
                    <span>{{seller.address}}</span>
                </li>
                <li>
                    <span>商家电话</span>
                    <span>{{seller.tel}}</span>
                </li>
                <li>
                    <span>营业时间</span>
                    <span>{{seller.businessHours}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import * as storeApi from "../api/store";
export default {
  data() {
    return {
      seller: []
    };
  },
  created() {
    storeApi.getStore(this.$route.params.id).then(res => {
      this.seller = res;
      console.log(this.seller);
    });
  },
  computed: {
    Params() {
      return this.$route.params.id;
    }
  }
};
</script>

<style lang="less" scoped>

</style>

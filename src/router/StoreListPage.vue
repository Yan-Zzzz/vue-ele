<template>
  <div>
    <store-item v-for="store in storeList" :key="store.id" :data="store" @click="handleItemClick(store)" @toggleDetails="showDetails(store)"></store-item>
  </div>
</template>

<script>
import StoreItem from "../components/StoreItem";
import { fetchStoreList } from "../api/store";

export default {
  components: {
    "store-item": StoreItem
  },
  data() {
    return {
      storeList: []
    };
  },
  created() {
    fetchStoreList().then(res => (this.storeList = res.data));
  },
  methods: {
    handleItemClick(store) {
      this.$router.go("store-info", store.id); // 跳转到商店详情，路由参数带上商店id
    },
    showDetails(store) {
      // 显示商店详情
    }
  }
};
</script>

<style>

</style>

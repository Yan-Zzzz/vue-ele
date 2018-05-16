<template>
  <div class="store-info">
    <h3>{{ data.title }}</h3>
    <h5>{{data.description}}</h5>
    <button @click="emitDetails">详情</button>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitDetails: function() {
      this.$emit("toggleDetails");
    }
  }
};
</script>

<style>
/* .store-info {
}

.store-details {
} */
</style>

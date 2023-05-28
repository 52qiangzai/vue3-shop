<template>
  <RouterLink :to="`/product/${good.id}`" class="goods-item">
    <img
      v-img-lazy="good.picture"
      :alt="good.name"
    />
    <p class="name ellipsis">{{ good.name }}</p>
    <p class="desc ellipsis">{{ good.desc }}</p>
    <p class="price">&yen;{{ good.price }}</p>
  </RouterLink>
</template>

<script setup>
defineProps({
  good: {
    type: Object,
    default: {}
  }
})
</script>
<style lang="scss" scoped>
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;

  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>

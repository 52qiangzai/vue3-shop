<script setup>
import { defineProps } from 'vue'
defineProps({
  goodsList: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <ul>
    <li v-for="good in goodsList" :key="good.id">
      <router-link :to="`/product/${good.id}`" class="goods-item"
        ><img v-img-lazy="good.picture" />
        <p class="name ellipsis">{{ good.name }}</p>
        <p class="desc ellipsis">{{ good.desc }}</p>
        <p class="price">¥{{ good.price }}</p></router-link
      >
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  li {
    margin-right: 20px;
    margin-bottom: 20px;
    &:nth-of-type(5n) {
      margin-right: 0;
    }
    .goods-item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;
      transition: all 0.5s;
      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
      }
      p {
        padding-top: 10px;
      }
      img {
        width: 160px;
        height: 160px;
      }
      .desc {
        color: #999;
        height: 29px;
      }
      .price {
        color: #cf4444;
        font-size: 20px;
      }
    }
  }
}
</style>

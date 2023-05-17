<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template #right>
      <a
        class="iconfont icon-angle-left prev"
        href="javascript:;"
        @click="prevBrand"
        :class="{ disabled: isNext }"
      ></a>
      <a
        class="iconfont icon-angle-right next"
        href="javascript:;"
        @click="nextBrand"
        :class="{ disabled: !isNext }"
      ></a>
    </template>
    <template #main>
      <div class="content">
        <ul class="brand-list" ref="brandDom">
          <li v-for="brand in brandList" :key="brand.id">
            <a href="#"> <img v-img-lazy="brand.picture" :alt="brand.name" /></a>
          </li>
        </ul>
      </div>
    </template>
  </HomePanel>
</template>

<script setup>
import HomePanel from '@/components/home-panel.vue'
import {  ref } from 'vue'

defineProps({
  brandList: {
    type: Array,
    default: []
  }
})

const isNext = ref(true)


const brandDom = ref(null)

const prevBrand = () => {
  brandDom.value.style.transform = `translateX(0)`
  isNext.value = true
}

const nextBrand = () => {
  brandDom.value.style.transform = `translateX(-50%)`
  isNext.value = false
}

</script>
<style lang="scss" scoped>
.content {
  overflow: hidden;
  .brand-list {
    width: 200%;
    display: flex;
    flex-wrap: nowrap;
    transition: all 0.3s;

    li {
      height: 305px;
      flex: 1;
      width: 190px;
      &:not(li:last-child) {
        margin-right: 5px;
      }
      a,
      img {
        width: 240px;
        height: 305px;
        display: inline-block;
      }
    }
  }
}

a.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: #27ba9b;
}
.disabled {
  background-color: #ccc !important;
  cursor: not-allowed;
}
</style>

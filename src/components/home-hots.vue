<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <template #main>
      <ul class="goods-list">
        <li v-for="item in hotsList" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomePanel>
</template>

<script setup>
import { getAllHots } from '@/api/home'
import { onBeforeMount, ref } from 'vue'
import HomePanel from '@/components/home-panel.vue'

const hotsList = ref([])

const getHotsList = async () => {
  let { code, result } = await getAllHots()
  if (code === '1') {
    hotsList.value = result
  }
}
onBeforeMount(() => {
  getHotsList()
})
</script>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    transition: all 0.3s;
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>

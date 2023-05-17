<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #right>
      <MyMore />
    </template>
    <template #main>
      <Transition name="fade">
        <ul class="goods-list" v-if="newsList.length">
          <li v-for="item in newsList" :key="item.id">
            <RouterLink to="/">
              <img alt="" v-img-lazy="item.picture" />
              <p class="name">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else/>
      </Transition>
    </template>
  </HomePanel>
</template>

<script setup>
import { getAllNews } from '@/api/home'
import { onBeforeMount, ref } from 'vue'
import HomePanel from '@/components/home-panel.vue'
import MyMore from '@/components/my-more.vue'
import HomeSkeleton from './home-skeleton.vue'

const newsList = ref([])

const getNewsList = async () => {
  let { code, result } = await getAllNews()
  if (code === '1') {
    newsList.value = result
  }
}
onBeforeMount(() => {
 getNewsList()
})
</script>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    transition: all 0.3s;
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .price {
      color: $priceColor;
    }
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>

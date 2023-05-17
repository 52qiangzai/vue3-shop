<!-- 轮播图组件 -->
<template>
  <div class="xtx-carousel">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        v-for="banner in bannerList"
        :key="banner.id"
        :class="banner.id === bannerId ? 'fade' : ''"
      >
        <RouterLink :to="banner.hrefUrl">
          <img v-img-lazy="banner.imgUrl" :alt="banner.imgUrl" />
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="prevBanner"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a href="javascript:;" class="carousel-btn next" @click="nextBanner"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator" @click="switchBanner($event)">
      <span
        v-for="banner in bannerList"
        :key="banner.id"
        :class="banner.id === bannerId ? 'active' : ''"
        :data-id="banner.id"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  bannerList: {
    type: Array,
    default: () => {
      return [
        {
          hrefUrl: '/category/1005000',
          id: '20',
          imgUrl:
            'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/e83efb1b-309c-46f7-98a3-f1fefa694338.jpg',
          type: '1'
        }
      ]
    }
  }
})
const bannerId = ref('17')
// 定时切换
const timerId = setInterval(() => {
  nextBanner()
}, 1500)
// 上一页
const prevBanner = () => {
  const findIndex = props.bannerList.findIndex((item) => item.id === bannerId.value)
  if (findIndex - 1 < 0) {
    bannerId.value = props.bannerList.at(-1).id
  } else {
    bannerId.value = props.bannerList[findIndex - 1].id
  }
}
// 下一页
const nextBanner = () => {
  const findIndex = props.bannerList.findIndex((item) => item.id === bannerId.value)
  if (findIndex + 1 < props.bannerList.length) {
    bannerId.value = props.bannerList[findIndex + 1].id
  } else {
    bannerId.value = props.bannerList.at(0).id
  }
}
// 切换
const switchBanner = (e) => {
  if (e.target.nodeName !== 'SPAN') return
  bannerId.value = e.target.dataset.id
}

onBeforeUnmount(() => {
  clearInterval(timerId)
})
</script>
<style scoped lang="scss">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>

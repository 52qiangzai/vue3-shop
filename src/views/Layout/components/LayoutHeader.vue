<script setup>
import { userCateGoryStore } from '@/stores/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const categoryStore = userCateGoryStore()
categoryStore.getAllCateGoryFn()
const route = useRoute()
// 首页分类
const hoverFn = (e) => {
  if (e.target.children[1].classList.contains('open')) return
  e.target.children[1].classList.add('open')
}
const leaveFn = (e) => {
  if (!e.target.children[1].classList.contains('open')) return
  e.target.children[1].classList.remove('open')
}

// 吸顶效果
const y = ref(0)
onMounted(() => {
  window.onscroll = () => {
    const scrollTop = document.documentElement.scrollTop
    y.value = scrollTop
  }
})
</script>
<template>
  <header class="app-header" :class="{ show: y >= 78 }">
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/" class="title">首页</RouterLink>
        </li>
        <el-skeleton
          :loading="!categoryStore.categoryList.length"
          animated
          style="display: flex; align-items: center"
        >
          <template #template>
            <el-skeleton-item
              variant="text"
              style="flex: 1; margin-right: 40px"
              v-for="i in 9"
              :key="i"
            />
          </template>
          <template #default>
            <li
              v-for="item in categoryStore.categoryList"
              :key="item.id"
              @mouseenter="hoverFn($event)"
              @mouseleave="leaveFn"
              :class="{ 'current-style': item.id === route.params.id }"
            >
              <RouterLink :to="`/category/${item.id}`" class="title">{{ item.name }}</RouterLink>
              <div class="layer">
                <ul>
                  <li v-for="i in item.children" :key="i.id">
                    <router-link :to="`/category/sub/${i.id}`">
                      <img v-img-lazy="i.picture" alt="" />
                      <p>{{ i.name }}</p>
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </template>
        </el-skeleton>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <div class="cart">
        <a class="curr" href="#"> <i class="iconfont icon-cart"></i><em>2</em> </a>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background-color: #fff;
  position: sticky;
  top: -100%;
  left: 0;
  z-index: 9999;
  transition: all 0.5s;
  &.show {
    top: 0 !important;
  }
  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
      &:hover a {
        color: #27ba9b;
        border-bottom: 1px solid #27ba9b;
      }
      .title {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      .layer {
        width: 1240px;
        background-color: #fff;
        position: absolute;
        left: -200px;
        top: 56px;
        height: 0;
        overflow: hidden;
        opacity: 0;
        box-shadow: 0 0 5px #ccc;
        transition: all 0.2s 0.1s;
        ul {
          display: flex;
          flex-wrap: wrap;
          padding: 0 70px;
          align-items: center;
          height: 132px;
          li {
            width: 110px;
            text-align: center;
            img {
              width: 60px;
              height: 60px;
              vertical-align: middle;
            }
            p {
              padding-top: 10px;
            }
          }
        }
      }
    }
  }

  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: $helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
.open {
  height: 132px !important;
  opacity: 1 !important;
}
.current-style > a {
  color: #27ba9b;
  border-bottom: 1px solid #27ba9b;
}
</style>

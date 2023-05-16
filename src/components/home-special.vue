<script setup>
import MyMore from '@/components/my-more.vue'
import HomePanel from '@/components/home-panel.vue'
import { ref } from 'vue'
import { getAllSpecial } from '@/api/home'
const specialList = ref([])

const getSpecialList = async () => {
  let { code, result } = await getAllSpecial()
  if (code === '1') specialList.value = result
}

getSpecialList()
</script>

<template>
  <HomePanel title="最新专题" style="background-color: #f5f5f5">
    <template #right>
      <MyMore />
    </template>
    <template #main>
      <div class="special-list">
        <div class="special-item" v-for="item in specialList" :key="item.id">
          <a href="#">
            <img :src="item.cover" :alt="item.summary" />
            <div class="meta">
              <p class="title">
                <span class="top ellipsis">{{ item.title }}</span
                ><span class="sub ellipsis">{{ item.summary }}</span>
              </p>
              <span class="price">¥{{ item.lowestPrice }}起</span>
            </div>
          </a>
          <div class="footer">
            <span class="like"><i class="iconfont icon-hart1"></i>{{ item.collectNum }}</span
            ><span class="view"><i class="iconfont icon-see"></i>{{ item.viewNum }}</span
            ><span class="reply"><i class="iconfont icon-message"></i>{{ item.replyNum }}</span>
          </div>
        </div>
      </div>
    </template>
  </HomePanel>
</template>

<style lang="scss" scoped>
.special-list {
  height: 380px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .special-item {
    width: 404px;
    background: #fff;
    transition: all 0.5s;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }
    a {
      display: block;
      width: 100%;
      height: 288px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
      }
      .meta {
        p.title {
          position: absolute;
          bottom: 0;
          left: 0;
          padding-left: 16px;
          width: 70%;
          height: 70px;
          .top {
            color: #fff;
            font-size: 22px;
            display: block;
          }
          .sub {
            display: block;
            font-size: 19px;
            color: #999;
          }
        }
        .price {
          position: absolute;
          bottom: 25px;
          right: 16px;
          line-height: 1;
          padding: 4px 8px 4px 7px;
          color: #cf4444;
          font-size: 17px;
          background-color: #fff;
          border-radius: 2px;
        }
        .ellipsis,
        .ellipsis-2 {
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    .footer {
      height: 72px;
      line-height: 72px;
      padding: 0 20px;
      font-size: 16px;
      .view,
      .like {
        float: left;
        margin-right: 25px;
        vertical-align: middle;
      }
      .reply {
        float: right;
        vertical-align: middle;
      }
      i {
        display: inline-block;
        width: 15px;
        height: 14px;
        margin-right: 5px;
        color: #999;
      }
    }
  }
}
</style>

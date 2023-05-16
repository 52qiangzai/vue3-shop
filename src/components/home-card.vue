<template>
  <!-- card卡片 -->
  <div class="box">
    <router-link class="cover" to="/">
      <img :src="cardInfo.picture" :alt="cardInfo.name" />
      <strong class="label"
        ><span>{{ cardInfo.name }}</span
        ><span>{{ cardInfo.saleInfo }}</span></strong
      >
    </router-link>
    <ul class="good-list">
      <li v-for="item in goodsItemList" :key="item.id">
        <div class="goods-item">
          <router-link to="/">
            <img :alt="item.name" :src="item.picture" />
          </router-link>
          <p class="name ellipsis-2">{{ item.name }}</p>
          <p class="desc ellipsis">{{ item.desc }}</p>
          <p class="price">{{ item.price }}</p>
          <div class="extra">
            <router-link class="router-link-active router-link-exact-active" to="/">
              <span>找相似</span><span>发现现多宝贝 &gt;</span>
            </router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  cardInfo: {
    type: Object,
    default: {}
  },
  goodsItemList: {
    type: Array,
    default: []
  }
})

</script>
<style lang="scss" scoped>
.box {
  display: flex;
  .cover {
    width: 240px;
    height: 610px;
    margin-right: 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
    }
    strong {
      height: 66px;
      display: flex;
      font-size: 18px;
      color: #fff;
      line-height: 66px;
      font-weight: 400;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      span:first-child {
        width: 76px;
        text-align: center;
        background: rgba(0, 0, 0, 0.9);
      }
      span {
        background: rgba(0, 0, 0, 0.7);
      }
    }
  }
  .good-list {
    width: 990px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 240px;
      height: 300px;
      margin-right: 10px;
      margin-bottom: 10px;
      .goods-item {
        width: 240px;
        height: 300px;
        padding: 10px 30px;
        position: relative;
        overflow: hidden;
        border: 1px solid transparent;
        transition: all 0.5s;
        a {
          display: inline-block;
          width: 160px;
          height: 160px;
          margin: 0 auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          margin-top: 6px;
          font-size: 16px;
        }
        .ellipsis-2 {
          word-break: break-all;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .ellipsis,
        .ellipsis-2 {
          text-overflow: ellipsis;
          overflow: hidden;
        }
        p.price {
          margin-top: 10px;
          font-size: 20px;
          color: #cf4444;
        }
        .extra {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 0;
          width: 100%;
          background: $xtxColor;
          text-align: center;
          transition: all 0.5s;
          span:first-child {
            font-size: 18px;
            border-bottom: 1px solid #fff;
            line-height: 40px;
            margin-top: 5px;
          }
          span {
            display: block;
            color: #fff;
            width: 120px;
            margin: 0 auto;
            line-height: 30px;
          }
        }
        &:hover {
          border-color: $xtxColor;
          .extra {
            height: 86px;
          }
        }
      }
    }
  }
}
</style>

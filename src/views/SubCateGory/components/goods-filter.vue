<script setup>
import { ref, watch, defineEmits } from 'vue'

const sortField = ref(null)
const sortMethod = ref(null)

const checkSort = () => {
  sortField.value = 'price'
  sortMethod.value === 'asc' ? (sortMethod.value = 'desc') : (sortMethod.value = 'asc')
}
const emits = defineEmits(['changeSort'])
watch([sortField, sortMethod], (n, o) => {
  emits('changeSort', n)
})
</script>
<template>
  <div class="sort">
    <ul class="left">
      <li class="left-item" :class="{ active: sortField === null }" @click="sortField = null">
        默认排序
      </li>
      <li
        class="left-item"
        :class="{ active: sortField === 'publishTime' }"
        @click="sortField = 'publishTime'"
      >
        最新商品
      </li>
      <li
        class="left-item"
        :class="{ active: sortField === 'orderNum' }"
        @click="sortField = 'orderNum'"
      >
        最高人气
      </li>
      <li
        class="left-item"
        :class="{ active: sortField === 'evaluateNum' }"
        @click="sortField = 'evaluateNum'"
      >
        评论最多
      </li>
      <li class="left-item" @click="checkSort">
        价格排序
        <i
          class="arrow up"
          :class="{ active: sortMethod === 'asc' }"
          @click.stop="sortMethod = 'asc'"
        ></i>
        <i
          class="arrow down"
          :class="{ active: sortMethod === 'desc' }"
          @click.stop="sortMethod = 'desc'"
        ></i>
      </li>
    </ul>
    <ul class="right">
      <div class="checked-item">
        <i class="iconfont icon-checked"></i><span>仅显示有货商品</span>
      </div>
      <div class="checked-item"></div>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    margin: 10px 0;
    display: flex;
    .left-item {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      .up.active {
        border-bottom-color: $xtxColor;
        background-color: #fff;
      }
      .down.active {
        border-top-color: $xtxColor;
        background-color: #fff;
      }
      i.up {
        top: 2px;
        position: absolute;
        border: 5px solid transparent;
        border-bottom-color: #bbb;
        right: 5px;
      }
      i.down {
        position: absolute;
        border: 5px solid transparent;
        border-top-color: #bbb;
        right: 5px;
        bottom: 2px;
      }
    }
    .active {
      background-color: $xtxColor;
      border-color: $xtxColor;
      color: #fff;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .checked-item {
      margin-left: 20px;
      color: #999;
      span {
        margin-left: 2px;
      }
      .icon-checked,
      .icon-checked ~ span {
        color: $xtxColor;
      }
    }
  }
}
</style>

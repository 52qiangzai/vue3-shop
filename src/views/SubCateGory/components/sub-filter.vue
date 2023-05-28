<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  saleProperties: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['setAttrFn'])

const setAttr = (e, { name }) => {
  if (e.target.nodeName !== 'A') return
  const parentNode = e.target.parentNode
  ;[...parentNode.children].forEach((a) => {
    if (a === e.target) {
      e.target.classList.add('active')
      emits('setAttrFn', {
        groupName: name,
        propertyName: e.target.innerText
      })
    } else {
      a.classList.remove('active')
    }
  })
}
</script>
<template>
  <div class="sub-filter">
    <div class="item" v-for="i in saleProperties" :key="i.id" @click="setAttr($event, i)">
      <div class="head">{{ i.name }} ：</div>
      <div class="body">
        <a href="javascript:;" :class="{ active: true }">全部</a>
        <a href="javascript:;" v-for="j in i.properties" :key="j.id">{{ j.name }}</a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      .active {
        color: $xtxColor;
      }
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: $xtxColor;
        }
      }
    }
  }
}
</style>

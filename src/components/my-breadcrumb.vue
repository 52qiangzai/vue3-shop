<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :to="{ path: index === 0 ? `/category/${item.id}` : `/category/sub/${item.id}` }"
      :key="item.id"
    >
      {{ item?.name }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
defineProps({
  breadcrumbList: {
    type: Array,
    default: []
  }
})
</script>

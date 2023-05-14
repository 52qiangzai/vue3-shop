<script setup>
import { getCateGory } from '@/api/test'
const sendAjax = async () => {
  let res = await getCateGory()
  console.log(res)
}
</script>

<template>
  <el-button type="primary" @click="sendAjax">Primary</el-button>

  <RouterView />
</template>

<style scoped></style>

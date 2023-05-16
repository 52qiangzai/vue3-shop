<script setup>
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <LayoutNav v-if="route.meta?.isShow"/>
  <LayoutHeader v-if="route.meta?.isShow"/>
  <RouterView />
  <LayoutFooter v-if="route.meta?.isShow"/>
</template>

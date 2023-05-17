<script setup>
defineProps({
  bg: {
    type: String,
    default: '#fff'
  }
})
</script>
<template>
  <div class="home-skeleton">
    <div class="item" v-for="i in 4" :key="i" :style="{ backgroundColor: bg }">
      <el-skeleton style="width: 306px; height: 406px" animated :throttle="2000">
        <template #template>
          <el-skeleton-item variant="image" style="width: 306px; height: 306px" />
          <div
            style="
              padding: 12px 30px 12px 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            "
          >
            <el-skeleton-item
              variant="h3"
              style="width: 80%; font-size: 22px; margin-bottom: 10px"
            />
            <el-skeleton-item variant="h3" style="width: 80%; font-size: 22px" />
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .xtx-skeleton ~ .xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>

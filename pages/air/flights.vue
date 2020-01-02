<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem :data="item" v-for="(item,index) in flightsData.flights" :key="index"  />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'

export default {
  data() {
    return {
      flightsData: {
        flights:{}
      }
    }
  },
  components: {
    FlightsListHead,
    FlightsItem
  },
  mounted() {
    // 发送获取机票列表请求
    this.$axios({
      url: '/airs',
      params: this.$route.query
    }).then(res => {
      this.flightsData = res.data
    })
  }
}
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
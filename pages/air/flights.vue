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
        <FlightsItem :data="item" v-for="(item,index) in dataList" :key="index" />

        <!-- 分页页码 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
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
      // 航班总数据 { info, flights, total, options }
      flightsData: {
        flights: []
      },
      // 缓存的变量，当该变量一旦被赋值之后不会被修改
      cacheFlightsData: {
        flights: []
      },
      // 当前的页面
      pageIndex: 1,
      // 当然的条数
      pageSize: 5,
      // 总条数
      total: 0
    }
  },
  components: {
    FlightsListHead,
    FlightsItem
  },
  computed: {
    // 计算属性监听函数内部引用实例的属性变化，一旦发生了变化，该函数会重新计算，并且返回新的值
    dataList() {
      // 请求如果还没完成，返回空数组
      if (!this.flightsData.flights) return []
      // 计算分页的数据
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
    }
  },
  mounted() {
    // 发送获取机票列表请求
    this.$axios({
      url: '/airs',
      params: this.$route.query
    }).then(res => {
      // 将数据赋值flightsData
      this.flightsData = res.data
      // console.log(this.flightsData.flights)
      // 这个是缓存的变量，一旦赋值之后不能被改
      this.cacheFlightsData = { ...res.data }
      // 获取总条数total
      this.total = this.flightsData.total
    })
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      // console.log(`当前页: ${val}`)
    }
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
<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @snendSelect="snendSelect" />

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
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
import FlightsFilters from '@/components/air/flightsFilters'
import FlightsAside from '@/components/air/flightsAside'

export default {
  data() {
    return {
      // 航班总数据 { info, flights, total, options }
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // 缓存的变量，当该变量一旦被赋值之后不会被修改
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
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
    FlightsItem,
    FlightsFilters,
    FlightsAside
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
    // 修改分页条码当前页面显示的条数
    handleSizeChange(val) {
      this.pageSize = val
    },
    //修改分页条码的当前页码ss
    handleCurrentChange(val) {
      this.pageIndex = val
    },

    // 点击过滤条件上的下拉选择触发的事件
    snendSelect(arr) {
      // 将过滤后的数组赋值给this.flightsData.flights，这是computers监听的dataList值就会重新计算
      this.flightsData.flights = arr
      // 经过筛选，列表的条数页需要重新赋值
      this.total = arr.length
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
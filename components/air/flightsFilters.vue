<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item,index) in flightSize"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    data: {
      type: Object,
      // 默认是空数组
      default: {}
    }
  },
  data() {
    return {
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: '', // 机型大小
      // 飞机的大小
      flightSize: [
        { label: '大', value: 'L' },
        { label: '中', value: 'M' },
        { label: '小', value: 'S' }
      ]
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      // 过滤条件的过滤后的数组
      const arr = this.data.flights.filter(v => {
        return value === v.org_airport_name
      })
      // 向父组件发送给请求
      this.$emit('snendSelect', arr)
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      let [from, to] = value.split(',')
      // 过滤条件的过滤后的数组
      console.log(from)
      console.log(to)
      const arr = this.data.flights.filter(v => {
        const middle =
          +v.dep_time.split(':')[0] + +(v.dep_time.split(':')[1] / 60)
        console.log(middle)
        return from <= middle && middle < to
      })
      // 向父组件发送给请求
      this.$emit('snendSelect', arr)
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      // 过滤条件的过滤后的数组
      const arr = this.data.flights.filter(v => {
        return value === v.airline_name
      })
      // 向父组件发送给请求
      this.$emit('snendSelect', arr)
    },

    // 选择机型时候触发
    handleAirSize(value) {
      // 过滤条件的过滤后的数组
      const arr = this.data.flights.filter(v => {
        return value === v.plane_size
      })
      // 向父组件发送给请求
      this.$emit('snendSelect', arr)
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      // 格式化
      this.airport = ''
      this.flightTimes = ''
      this.company = ''
      this.airSize = ''
      // 向父组件发送给请求
      this.$emit('snendSelect', this.data.flights)
    }
  },
  mounted() {
    // console.log(this.data)
  }
}
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
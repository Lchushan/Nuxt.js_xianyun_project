<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm :data="infoData" @setAllPrice="setAllPrice" />
      </div>

      <!-- 侧边栏 -->
      <!-- <div class="aside"> -->
      <OrderAside :data="infoData" :allPrice="allPrice" />
      <!-- </div> -->
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
  data() {
    return {
      // 机票信息
      infoData: {
        insurances: [], // 初始化保险数据
        seat_infos: {}
      },
      // 侧边栏的总金额
      allPrice: 0
    }
  },
  components: {
    OrderForm,
    OrderAside
  },
  mounted() {
    const { query } = this.$route
    // console.log(this.infoData.data)
    // 获取保险数据(选择机票)
    this.$axios({
      url: `/airs/${query.id}`,
      params: {
        seat_xid: query.seat_xid
      }
    }).then(res => {
      console.log(res)
      this.infoData = res.data
    })
  },
  methods: {
    setAllPrice(price) {
      this.allPrice = price
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>
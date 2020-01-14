<template>
  <div class="hotelList">
    <!-- 旅店的图片 -->
    <div class="hotel-img" @click="$router.push({path:`/hotel/detail?hotelId=${dataList.id}`})">
      <img :src="dataList.photos" alt />
    </div>
    <!-- 旅店的信息 -->
    <div class="hotel-info">
      <h4>{{dataList.name}}</h4>
      <div class="hotel-info-content">
        <span>{{dataList.alias}}</span>
        <i class="el-icon-trophy"></i>
        <i class="el-icon-trophy"></i>
        <i class="el-icon-trophy"></i>
        <span>经济型</span>
      </div>
      <el-row>
        <el-col :span="10">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </el-col>
        <el-col :span="7">
          <span>83条评论</span>
        </el-col>
        <el-col :span="7">
          <span>99篇游记</span>
        </el-col>
      </el-row>
      <div class="user-comment"></div>
      <div class="location">
        <i class="el-icon-location"></i>
        <span>位于：{{dataList.address}}</span>
      </div>
    </div>
    <!-- 旅店相关的介绍 -->
    <div class="hotel-corren">
      <el-table :data="tableHotel" style="width: 100%" :show-header="false">
        <el-table-column prop="name" width="118"></el-table-column>
        <el-table-column prop="price" width="117"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dataList'],
  data() {
    return {
      // tableHotel: [],
      // value: 3.7
    }
  },
  computed: {
    tableHotel() {
      let arr = this.dataList.products.map(v => {
        v.price = '￥' + v.price + ' 元'
        return v
      })
      return arr
    },
    value() {
      return this.dataList.stars
    }
  },
  mounted(){
    console.log(this.dataList)
  }
}
</script>

<style lang="less" scoped>
.hotelList {
  display: flex;
  justify-content: space-between;
  margin: 0 -10px;
  padding: 25px 0;
  border-bottom: 1px solid #ddd;
  .hotel-img {
    padding: 0 10px;
    width: 320px;
    height: 210px;
    overflow: hidden;
    // background-color: yellow;
    > img {
      width: 100%;
    }
  }
  .hotel-info {
    padding: 0 10px;
    width: 425px;
    // background-color: blue;
    h4 {
      font-size: 24px;
      font-weight: normal;
    }
    .hotel-info-content {
      margin-bottom: 8px;
      color: #999;
      font-size: 16px;
    }
    .user-comment {
      margin: 0 -5px;
    }
    .location {
      font-size: 14px;
      color: #666;
    }
  }
  .hotel-corren {
    margin-top: 20px;
    padding: 0 10px;
    width: 255px;
    // background-color: green;
    thead.has-gutter {
      th {
        border-bottom: none;
      }
    }
  }
}
</style>
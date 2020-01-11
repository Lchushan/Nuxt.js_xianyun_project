<template>
  <div class="hotelList">
    <!-- 旅店的图片 -->
    <div class="hotel-img" @click="$router.push({path:'/hotel/detail'})">
      <img src="/hotel" alt />
    </div>
    <!-- 旅店的信息 -->
    <div class="hotel-info">
      <h4>7天连锁酒店</h4>
      <div class="hotel-info-content">
        <span>7 tian lian suo hotel7 tian lian suo hotel7 tian lian suo hotel7 tian lian suo hotel7 tian lian suo hotel7 tian lian suo hotel7 tian lian suo hotel7 tian lian suo hotel</span>
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
        <span>位于：官话路114号</span>
      </div>
    </div>
    <!-- 旅店相关的介绍 -->
    <div class="hotel-corren">
      <el-table :data="tableHotel" style="width: 100%" :show-header="false">
        <el-table-column prop="hotel" width="118"></el-table-column>
        <el-table-column prop="price" width="117"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHotel: [
        {
          hotel: '携程',
          price: '￥155'
        },
        {
          hotel: '携程',
          price: '￥155'
        },
        {
          hotel: '携程',
          price: '￥155'
        }
      ],
      value: 3.7
    }
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
    background-color: yellow;
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
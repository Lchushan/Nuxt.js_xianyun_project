<template>
  <div class="hotel-detail">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/hotel">南京酒店</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>好来商务宾馆</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 旅店名字信息 -->
    <div class="name-info">
      <h4>
        好来商务宾馆
        <i class="el-icon-trophy"></i>
        <i class="el-icon-trophy"></i>
        <i class="el-icon-trophy"></i>
      </h4>
      <div class="name-info-content">7 tian lian suo hotel</div>
      <div class="location">
        <i class="el-icon-location"></i>
        <span>位于：官话路114号</span>
      </div>
    </div>
    <!-- 旅店图片信息 -->
    <div class="pic-info">
      <el-row>
        <el-col :span="16">
          <div class="main-pic"></div>
        </el-col>
        <el-col :span="8">
          <div class="list-pic">
            <el-row>
              <el-col :span="12" class="list-item" v-for="(item,index) in picInfoImg" :key="index">
                <div>
                  <img :src="item" alt />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 旅店表格信息 -->
    <el-table class="table-info" :data="hotelData" style="width: 100%">
      <el-table-column prop="priceSource" label="价格来源" width="420"></el-table-column>
      <el-table-column prop="cheapRoom" label="低价房型" width="420"></el-table-column>
      <el-table-column prop="minPrice" label="最低价格/每晚"></el-table-column>
    </el-table>
    <!-- 附近的景点地图信息 -->
    <div class="spot-map">
      <div class="map"></div>
      <div class="poi-list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <ol>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
              <li>
                <span>用户管理</span>
                <span>1.6公里</span>
              </li>
            </ol>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 附近的景点表格信息 -->
    <div class="spot-table">
      <el-row>
        <el-col :span="4">
          <div class="spot-table-title">基本信息</div>
        </el-col>
        <el-col :span="20">
          <div class="spot-table-content">
            <div>入住时间：1400之后</div>
            <div>离店时间：12：00之前</div>
            <div>2010年开业/2015年装修</div>
            <div>酒店规模：148间客房</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="spot-table-title">主要设施</div>
        </el-col>
        <el-col :span="20">
          <div class="assets-info">
            <span class="assets-info-item">外币兑换服务</span>
            <span class="assets-info-item">电梯</span>
            <span class="assets-info-item">洗衣服务</span>
            <span class="assets-info-item">热水壶</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="spot-table-title">停车服务</div>
        </el-col>
        <el-col :span="20">
          <div class="spot-table-content">-</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="spot-table-title">品牌信息</div>
        </el-col>
        <el-col :span="20">
          <div class="spot-table-content">-</div>
        </el-col>
      </el-row>
    </div>
    <!-- 评论信息 -->
    <div class="hotel-comment">
      <h4>0条真实用户评论</h4>
      <div class="scores-row">
        <el-row>
          <el-col :span="4">
            <p>总评数：42</p>
            <p>好评数：11</p>
            <p>差评数：0</p>
          </el-col>
          <el-col :span="5">
            <div class="star">
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
            </div>
          </el-col>
          <el-col :span="3">
            
          </el-col>
          <el-col :span="3">
            
          </el-col>
          <el-col :span="3">
            
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picInfoImg: ['1', '2', '3', '4', '5', '6'],
      hotelData: [
        {
          priceSource: '携程',
          cheapRoom: '高级大床房A',
          minPrice: '￥46'
        },
        {
          priceSource: '携程',
          cheapRoom: '高级大床房A',
          minPrice: '￥46'
        },
        {
          priceSource: '携程',
          cheapRoom: '高级大床房A',
          minPrice: '￥46'
        }
      ],
      activeName: 'second',
      value: 4.5
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
.hotel-detail {
  margin: 0 auto;
  width: 1000px;
  .el-breadcrumb {
    margin: 20px 0;
  }
  .name-info {
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
    h4 {
      color: #000;
      font-size: 24px;
      font-weight: normal;
    }
    .name-info-content {
      margin-bottom: 7px;
    }
  }
  .pic-info {
    margin: 40px 0;
    .main-pic {
      width: 640px;
      height: 320px;
      background-color: pink;
      > img {
        width: 100%;
      }
    }
    .list-pic {
      .list-item {
        width: 160px;
        background-color: green;
        img {
          height: 110px;
        }
      }
    }
  }
  .spot-map {
    display: flex;
    justify-content: space-between;
    margin: 40px 0;
    .map {
      width: 650px;
      height: 360px;
      background-color: pink;
    }
    .poi-list {
      width: 350px;
      height: 360px;
      background-color: yellow;
      ol {
        height: 300px;
        li {
          display: flex;
          justify-content: space-between;
          margin: 0 20px 20px 10px;
        }
      }
    }
  }
  .spot-table {
    margin: 40px 0;
    font-size: 14px;
    .el-col {
      padding: 20px 10px;
      border-bottom: 1px solid #ddd;
    }
    .spot-table-content {
      display: flex;
      > div {
        flex: 1;
        color: #666;
      }
    }
    .assets-info {
      .assets-info-item {
        margin-right: 10px;
        padding: 4px 10px;
        color: #666;
        background-color: #eee;
      }
    }
  }
  .hotel-comment {
    h4 {
      font-size: 16px;
    }
    .scores-row {
      padding: 20px 0;
      color: #666;
      font-size: 16px;
    }
    .star {
      margin-top: 20px;
    }
  }
}
</style>
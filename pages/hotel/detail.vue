<template>
  <div class="hotel-detail">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/hotel">{{hotelDetailData.real_city}}{{hotelDetailData.big_cate}}</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{hotelDetailData.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 旅店名字信息 -->
    <div class="name-info">
      <h4>
        {{hotelDetailData.name}}
        <i class="el-icon-trophy"></i>
        <i class="el-icon-trophy"></i>
        <i class="el-icon-trophy"></i>
      </h4>
      <div class="name-info-content">{{hotelDetailData.alias}}</div>
      <div class="location">
        <i class="el-icon-location"></i>
        <span>位于：{{hotelDetailData.address}}</span>
      </div>
    </div>
    <!-- 旅店图片信息 -->
    <div class="pic-info">
      <el-row>
        <el-col :span="16">
          <div class="main-pic">
            <img :src="picInfoBigImg||picInfoImg[0]" alt />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="list-pic">
            <el-row :gutter="20">
              <el-col :span="12" class="list-item" v-for="(item,index) in picInfoImg" :key="index">
                <img :src="item" @click="toChangeImg(index)" alt />
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 旅店表格信息 -->
    <el-table class="table-info" :data="hotelDetailData.products" style="width: 100%">
      <el-table-column prop="name" label="价格来源" width="420"></el-table-column>
      <el-table-column prop="bestType" label="低价房型" width="420"></el-table-column>
      <el-table-column prop="price" label="最低价格/每晚"></el-table-column>
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
            <div>入住时间：14:00之后</div>
            <div>离店时间：12:00之前</div>
            <div>{{hotelDetailData.creation_time}}/{{hotelDetailData.renovat_time}}</div>
            <div>酒店规模：{{hotelDetailData.roomCount}}间客房</div>
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
            <p>总评数：{{hotelDetailData.very_good_remarks+hotelDetailData.very_bad_remarks}}</p>
            <p>好评数：{{hotelDetailData.very_good_remarks}}</p>
            <p>差评数：{{hotelDetailData.very_bad_remarks}}</p>
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
          <el-col :span="3"></el-col>
          <el-col :span="3"></el-col>
          <el-col :span="3"></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picInfoBigImg: '',
      picInfoImg: [
        'http://157.122.54.189:9093/images/hotel-pics/1.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/2.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/3.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/4.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/5.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/6.jpeg'
      ],
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
      value: 4.5,
      hotelDetailData: []
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 点击更换旅游图片的大图片
    toChangeImg(index) {
      this.picInfoBigImg = this.picInfoImg[index]
    }
  },
  mounted() {
    // console.log()
    this.$axios({
      url: '/hotels',
      params: {
        id: this.$route.query.hotelId
      }
    }).then(res => {
      this.hotelDetailData = res.data.data[0]
      this.value = this.hotelDetailData.stars
      console.log(this.hotelDetailData)
    })
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
      height: 360px;
      overflow: hidden;
      // background-color: pink;
      > img {
        width: 100%;
      }
    }
    .list-pic {
      .list-item {
        margin-bottom: 10px;
        img {
          height: 110px;
          cursor: pointer;
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
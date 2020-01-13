<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 查询搜索 -->
    <el-form :inline="true" :model="formHotel" class="demo-form-inline">
      <!-- 地点 -->
      <el-form-item>
        <el-input v-model="formHotel.city" placeholder="目的地"></el-input>
      </el-form-item>
      <!-- 入住时间和离店时间 -->
      <el-form-item>
        <el-col :span="11">
          <el-date-picker
            v-model="formHotel.date"
            type="daterange"
            range-separator="-"
            start-placeholder="入住日期"
            end-placeholder="离店日期"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <!-- 入住的人数 -->
      <el-form-item>
        <el-popover placement="bottom" width="400" trigger="click">
          <div class="personNumber">
            <!-- <div>每间</div> -->
            <!-- 成人人数 -->
            <!-- <el-select v-model="adultNum">
              <el-option label="1" value="01"></el-option>
              <el-option label="2" value="02"></el-option>
              <el-option label="3" value="03"></el-option>
            </el-select>-->
            <!-- 儿童人数 -->
            <!-- <el-select v-model="childNum">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>-->
          </div>
          <div class="btn-col">
            <el-button type="primary">确定</el-button>
          </div>

          <el-input placeholder="人数未定" suffix-icon="el-icon-user" slot="reference"></el-input>
        </el-popover>
      </el-form-item>
      <!-- 点击查询 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查看价格</el-button>
      </el-form-item>
    </el-form>
    <!-- 地图模块 -->
    <div class="hotel-option">
      <div class="hotel-info"></div>
      <div class="map"></div>
    </div>
    <!-- 过滤条件 -->
    <div class="list-filter">
      <div class="fliter-item1">
        <div class="fliter-title">
          <span>价格</span>
          <span>0-4000</span>
        </div>
        <el-slider v-model="value"></el-slider>
      </div>
      <div class="fliter-item" v-for="(item,index) in filter" :key="index">
        <div class="fliter-title">
          <span>{{item.title}}</span>
        </div>
        <el-popover placement="bottom" width="200" trigger="hover">
          <el-checkbox>备选项</el-checkbox>
          <el-checkbox>备选项</el-checkbox>
          <el-checkbox>备选项</el-checkbox>
          <el-checkbox>备选项</el-checkbox>
          <span class="el-dropdown-link" slot="reference">
            <span>{{item.res}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- <el-button >hover 激活</el-button> -->
        </el-popover>
      </div>
      <!-- <div class="fliter-item">
        <div class="fliter-title">
          <span>住宿类型</span>
        </div>
      </div>
      <div class="fliter-item">
        <div class="fliter-title">
          <span>酒店设施</span>
        </div>
      </div>
      <div class="fliter-item">
        <div class="fliter-title">
          <span>酒店品牌</span>
        </div>
      </div>-->
    </div>
    <!-- 酒店列表 -->
    <HotelPostList />
    <!-- 分页模块 -->
    <div class="paging">
      <el-pagination small layout="prev, pager, next" :total="50"></el-pagination>
    </div>
  </div>
</template>

<script>
import HotelPostList from '@/components/hotel/hotelPostList'
export default {
  data() {
    return {
      formHotel: {
        city: '南京',
        date: '',
        person: ''
      },
      adultNum: '',
      childNum: '',
      value: 100,
      // filter: ['住宿条件', '住宿类型', '酒店设施', '酒店品牌'],
      filter: [
        {
          title: '住宿条件',
          res: '不限'
        },
        {
          title: '住宿类型',
          res: '不限'
        },
        {
          title: '酒店设施',
          res: '不限'
        },
        {
          title: '酒店品牌',
          res: '不限'
        }
      ]
    }
  },
  components: {
    HotelPostList
  },
  methods: {
    onSubmit() {
      console.log(11)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  margin: 0 auto;
  width: 1000px;
  .el-breadcrumb {
    padding: 20px 0;
  }
  /deep/.el-popover .btn-col {
    display: flex;
    justify-content: flex-end;
  }
  .hotel-option {
    display: flex;
    justify-content: space-between;
    margin: 0 -5px 20px;
    .hotel-info {
      flex: 1;
      height: 260px;
      background-color: blue;
    }
    .map {
      width: 420px;
      height: 260px;
      background-color: pink;
    }
  }
  .list-filter {
    display: flex;
    padding: 5px 0;
    border: 1px solid #ddd;
    .fliter-item1 {
      flex: 8;
      .fliter-title {
      }
    }
    .fliter-item {
      flex: 6;
      border-left: 1px solid #ddd;
      .fliter-title {
        .el-dropdown-link {
          width: 38px;
          justify-content: space-between;
        }
      }
    }
    .fliter-item1,
    .fliter-item {
      padding: 5px 20px;
    }
  }
  .paging {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0 40px;
  }
}
</style>
<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 查询搜索 -->
    <el-form :inline="true" :model="hotelForm" class="demo-form-inline">
      <!-- 地点 -->
      <!-- <el-form-item>
        <el-input v-model="hotelForm.city" placeholder="目的地"></el-input>
      </el-form-item>-->
      <el-form-item>
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="目的地"
          @select="handleTravelCity"
          class="el-autocomplete"
          v-model="hotelForm.cityName"
          @blur="loseTravelSelect"
        ></el-autocomplete>
      </el-form-item>
      <!-- 入住时间和离店时间 -->
      <el-form-item>
        <el-col :span="11">
          <el-date-picker
            v-model="hotelForm.date"
            type="daterange"
            range-separator="-"
            start-placeholder="入住日期"
            end-placeholder="离店日期"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <!-- 入住的人数 -->
      <el-form-item>
        <el-popover placement="bottom-start" width="300" trigger="click" v-model="visible">
          <!-- <div class="personNumber"> -->
          <el-row type="flex" align="middle" :gutter="10">
            <el-col :span="8">
              <div class="each">每间</div>
            </el-col>
            <el-col :span="8">
              <el-select v-model="population.adultDigit" size="mini">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item,index) in population.adultNum"
                  :key="index"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-select v-model="population.childDigit" size="mini">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item,index) in population.childNum"
                  :key="index"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <!-- 点击确认 -->
          <div style="margin-top:20px;padding-top: 20px;border-top: 1px solid #ddd">
            <el-row type="flex" justify="end">
              <el-col :span="5">
                <el-button type="primary" size="mini" @click="comfigPopulation">确定</el-button>
              </el-col>
            </el-row>
          </div>

          <!-- 外面的输入框 -->
          <el-input
            placeholder="人数未定"
            suffix-icon="el-icon-user"
            slot="reference"
            v-model="hotelForm.population"
          ></el-input>
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
    <!-- <div > -->
    <el-row class="list-filter">
      <el-col :span="6">
        <!-- 价格 -->
        <div class="fliter-item1">
          <div class="fliter-title">
            <span>价格</span>
            <span>0-4000</span>
          </div>
          <el-slider v-model="value"></el-slider>
        </div>
      </el-col>

      <el-col :span="18">
        <el-row>
          <el-col :span="24">
            <el-col :span="6">
              <!-- 住宿条件 -->
              <div class="fliter-item">
                <div class="fliter-title">
                  <span>住宿条件</span>
                </div>

                <el-dropdown>
                  <span class="el-dropdown-link">
                    <span>不限</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in filter.levels" :key="index">
                      <i class="el-icon-remove-outline"></i>
                      <!-- <i class="el-icon-remove"></i> -->
                      <span>{{item.name}}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
            <el-col :span="6">
              <!-- 住宿类型 -->
              <div class="fliter-item">
                <div class="fliter-title">
                  <span>住宿类型</span>
                </div>

                <el-dropdown>
                  <span class="el-dropdown-link">
                    <span>不限</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in filter.types" :key="index">
                      <i class="el-icon-remove-outline"></i>
                      <!-- <i class="el-icon-remove"></i> -->
                      <span>{{item.name}}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
            <el-col :span="6">
              <!-- 酒店设施 -->
              <div class="fliter-item">
                <div class="fliter-title">
                  <span>酒店设施</span>
                </div>

                <el-dropdown>
                  <span class="el-dropdown-link">
                    <span>不限</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in filter.assets" :key="index">
                      <i class="el-icon-remove-outline"></i>
                      <!-- <i class="el-icon-remove"></i> -->
                      <span>{{item.name}}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
            <el-col :span="6">
              <!-- 酒店品牌 -->
              <div class="fliter-item">
                <div class="fliter-title">
                  <span>酒店品牌</span>
                </div>

                <el-dropdown>
                  <span class="el-dropdown-link">
                    <span>不限</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in filter.brands" :key="index">
                      <i class="el-icon-remove-outline"></i>
                      <!-- <i class="el-icon-remove"></i> -->
                      <span>{{item.name}}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- </div> -->
    <!-- 酒店列表 -->
    <div class="HotelPostLists">
      <HotelPostList :dataList="item" v-for="(item,index) in hotelsList" :key="index" />
    </div>
    <!-- <HotelPostList /> -->
    <!-- 分页模块 -->
    <div class="paging">
      <!-- <el-pagination small layout="prev, pager, next" :total="50"></el-pagination> -->
      <!-- <el-pagination layout="prev, pager, next" :total="total"></el-pagination> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 4, 6, 8, 10]"
        :page-size="currentSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import HotelPostList from '@/components/hotel/hotelPostList'
export default {
  data() {
    return {
      visible: false,
      hotelForm: {
        cityName: '南京',
        city: '',
        date: '',
        population: 1
      },
      hotelCityData: '',
      population: {
        adultDigit: 1,
        adultNum: [
          {
            value: 1,
            label: 1
          },
          {
            value: 2,
            label: 2
          },
          {
            value: 3,
            label: 3
          },
          {
            value: 4,
            label: 4
          },
          {
            value: 5,
            label: 5
          },
          {
            value: 6,
            label: 6
          }
        ],
        childDigit: 0,
        childNum: [
          {
            value: 0,
            label: 0
          },
          {
            value: 1,
            label: 1
          },
          {
            value: 2,
            label: 2
          },
          {
            value: 3,
            label: 3
          },
          {
            value: 4,
            label: 4
          },
          {
            value: 5,
            label: 5
          }
        ]
      },
      value: 100,
      // filter: ['住宿条件', '住宿类型', '酒店设施', '酒店品牌'],
      filter: {},
      hotelsList: [],
      currentPage: 1,
      currentSize: 2,
      total: 0
    }
  },
  components: {
    HotelPostList
  },
  methods: {
    // 酒店城市目的地下拉选项
    queryDepartSearch(value, callback) {
      // 输入的值为空的时候，不显示下拉列表
      if (value === '') {
        callback([])
        return
      }
      // console.log(value)
      // 根据输入的内容，发送请求获取 酒店的城市名称 的信息

      this.$axios({
        url: '/cities',
        params: {
          name: value
        }
      }).then(res => {
        console.log(res)
        const { data } = res.data
        // // 循环给data中每一项添加一个value属性，并且没有市字的
        this.hotelCityData = data.map(v => {
          v.value = v.name
          return v
        })
        // 返回下拉列表的数组（value值）
        callback(this.hotelCityData)
      })
    },
    // 目标城市下拉选择时触发
    handleTravelCity(item) {
      this.hotelForm.cityName = item.value
      this.hotelForm.city = item.id
    },
    // 到达城市输入框失去焦点时候默认选中第一个城市
    loseTravelSelect() {
      if (this.hotelCityData.length > 0) {
        this.hotelForm.cityName = this.hotelCityData[0].value
        this.hotelForm.city = this.hotelCityData[0].id
      }
    },
    // 点击确认入住人数
    comfigPopulation() {
      this.hotelForm.population =
        this.population.adultDigit + this.population.childDigit
      this.visible = false
    },
    // 点击查看价格绑定的事件
    onSubmit() {
      console.log(this.hotelForm)
    },
    handleSizeChange(val) {
      this.currentSize = val
      this.getHotelsList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getHotelsList()
    },
    // 获取酒店的列表
    getHotelsList() {
      return this.$axios({
        url: '/hotels',
        params: {
          city: 74,
          enterTime: '2020-06-12',
          leftTime: '2020-06-13',
          _limit: this.currentSize,
          _start: this.currentPage
        }
      }).then(res => {
        this.hotelsList = res.data.data
        this.total = res.data.total
      })
    }
  },
  mounted() {
    // 获取酒店的列表
    this.getHotelsList()
    // 获取酒店类型
    this.$axios({
      url: '/hotels/options'
    }).then(res => {
      if (res.status === 200) {
        console.log(res)
        this.filter = res.data.data
        console.log(this.filter)
      }
    })
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
    font-size: 14px;
    color: #666;
    .fliter-item1 {
      flex: 8;
    }
    .fliter-item {
      flex: 6;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      border-left: 1px solid #ddd;
      .el-dropdown-link {
        display: flex;
        justify-content: space-between;
        // width: 170px;
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
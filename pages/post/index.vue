<template>
  <!-- <div class="container"> -->
  <div class="container">
    <div class="layout">
      <!-- 左侧栏 -->
      <div width="200px" class="aside">
        <!-- 左侧的导航 -->
        <div class="menus-body" @mouseleave="toggleList">
          <!-- 主体 -->
          <div class="menus">
            <div
              class="menus-item"
              @mouseenter="showList(item.children,index)"
              v-for="(item,index) in citiesList"
              :key="index"
            >
              {{item.type}}
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <!-- 浮动布局 -->
          <div class="sub-munes" v-if="isShow">
            <ul>
              <li class="sub-munes-item" v-for="(item,index) in citiesChildrenList" :key="index">
                <!-- <a href="javascript(0):;"> -->
                <i>{{index+1}}</i>
                <strong @click="$router.push({path: `/post?city=${item.city}`})">{{item.city}}</strong>
                <span @click="$router.push({path: `/post?city=${item.city}`})">{{item.desc}}</span>
                <!-- </a> -->
              </li>
            </ul>
          </div>
        </div>
        <!-- 左侧的推荐城市 -->
        <div class="aside-recommend">
          <h4 class="aside-title">推荐城市</h4>
          <a href="#" class="aside-recommend-item" @click="$router.push({path:'/post'})">
            <!-- <img data-v-053600ae="" src=""> -->
            <img :src="recommentCityImg" alt />
          </a>
        </div>
      </div>
      <!-- 主体 -->
      <div class="main">
        <!-- 搜索 -->
        <div class="search">
          <div class="serach-inputs">
            <input
              type="text"
              class="search-input"
              ref="searchInp"
              placeholder="请输入想去的地方，比如：'广州'"
              value="北京"
            />
            <i class="el-icon-search" @click="toSearchPost"></i>
          </div>
          <div class="search-recommend">
            推荐：
            <span
              class="mouseEnter"
              v-for="(item,index) in recoCities"
              :key="index"
              @click="toSearch(item)"
            >{{item}}</span>
          </div>
        </div>
        <!-- 文章主题 -->
        <div class="post-title">
          <h4>推荐攻略</h4>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="$router.push({path: '/post/create'})"
          >写游记</el-button>
        </div>
        <!-- 文章列表 -->
        <div class="post-list"></div>
        <PostList :data="item" v-for="(item,index) in postsList.data" :key="index" />
        <!-- 分页模块 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 6, 9, 12]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="postsList.total"
        ></el-pagination>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import PostList from '@/components/post/postList'
export default {
  data() {
    return {
      citiesList: [],
      citiesChildrenList: [],
      isShow: false,
      currentPage: 1,
      currentSize: 3,
      postsList: [],
      recoCities: ['广州', '上海', '北京'],
      recommentCityImg: ''
    }
  },
  watch: {
    $route() {
      this.$axios({
        url: '/posts',
        params: this.$route.query
      }).then(res => {
        this.postsList = res.data
        console.log(this.postsList)
      })
    }
  },
  components: {
    PostList
  },
  methods: {
    // 鼠标移在左侧导航上
    showList(data, index) {
      this.isShow = true
      this.citiesChildrenList = data
      const num = document.querySelectorAll('.menus-item')
      for (let i = 0; i < num.length; i++) {
        num[i].classList.remove('show')
      }
      document.querySelectorAll('.menus-item')[index].classList.add('show')
    },
    // 鼠标移开左侧导航上
    toggleList() {
      const num = document.querySelectorAll('.menus-item')
      for (let i = 0; i < num.length; i++) {
        num[i].classList.remove('show')
      }
      this.isShow = false
    },
    // 获取文章列表
    getPostList(city) {
      this.$axios({
        url: '/posts',
        params: city
      }).then(res => {
        this.postsList = res.data
      })
    },
    // 点击搜索按钮搜索城市
    toSearchPost() {
      // console.log(this.$refs.searchInp.value)
      this.getPostList({ city: this.$refs.searchInp.value })
    },
    // 点击搜索框下的推荐
    toSearch(item) {
      this.$refs.searchInp.value = item
      this.toSearchPost()
    },
    // 点击分页的每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 点击分页的页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  },
  mounted() {
    // 获取导航上的旅游列表
    this.$axios({
      url: '/posts/cities'
    }).then(res => {
      if (res.status === 200) {
        this.citiesList = res.data.data
      }
    })

    this.$axios({
      url: '/posts/recommend'
    }).then(res => {
      console.log(res)
      this.recommentCityImg = res.data.data[0].images[0]
    })

    // 获取文章列表
    this.getPostList(this.$route.query)
  }
}
</script>

<style lang="less" scoped>
.container {
  margin: 0 auto;
  padding: 30px 0;
  width: 1000px;
  .layout {
    display: flex;
    justify-content: space-between;
    .aside {
      width: 260px !important;
      .menus-body {
        position: relative;
        height: 165px;
        .menus {
          height: 164px;
          border-left: 1px solid #ddd;
          border-top: 1px solid #ddd;
          .menus-item {
            position: relative;
            padding: 0 20px;
            height: 40px;
            line-height: 40px;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            z-index: 3;
            &.show {
              border-right-color: #fff;
              color: #ffa500;
            }
            i {
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-50%);
            }
          }
        }
        .sub-munes {
          position: absolute;
          top: 0;
          left: 259px;
          z-index: 2;
          padding: 10px 20px;
          width: 310px;
          height: 182px;
          background-color: #fff;
          border: 1px solid #ddd;
          .sub-munes-item {
            height: 36px;
            line-height: 36px;
            font: 14px 'Source Sans Pro';
            vertical-align: top;
            // a {
            color: #ffa500;
            cursor: pointer;
            i {
              position: relative;
              top: 5px;
              height: 32px;
              font-size: 24px;
              font-style: oblique;
            }
            strong {
              margin: 0 10px;
              &:hover {
                border-bottom: 1px solid #ffa500;
              }
            }
            span {
              color: #999;
              &:hover {
                border-bottom: 1px solid #999;
              }
            }
            // }
          }
        }
      }
      .aside-recommend {
        margin-top: 20px;
        .aside-title {
          margin-bottom: 10px;
          padding-bottom: 10px;
          font-size: 16px;
          font-weight: normal;
          border-bottom: 1px solid #ddd;
        }
        .aside-recommend-item {
          width: 100%;
          height: 170px;
          img {
            width: 100%;
            height: 170px;
            background-color: pink;
          }
        }
      }
    }
    .main {
      width: 700px;
      .search {
        width: 700px;
        // height: 40px;
        background-color: #fff;
        .serach-inputs {
          display: flex;
          width: 100%;
          border: 2px solid #ffa500;
          box-sizing: border-box;
          .search-input {
            padding: 0 20px;
            flex: 1;
            height: 40px;
            border: none;
            outline: none;
          }
          .el-icon-search {
            margin-right: 10px;
            font-size: 24px;
            color: #ffa500;
            line-height: 40px;
          }
        }
        .search-recommend {
          padding: 10px;
          font-size: 12px;
          color: #666;
          span {
            margin-right: 10px;
          }
        }
      }
      .post-title {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
        background-color: #fff;
        h4 {
          font: 18px 'Source Sans Pro';
          color: #ffa500;
          &::after {
            display: block;
            content: '';
            width: 72px;
            height: 2px;
            background: #ffa500;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
      }
    }
  }
}
.el-pagination {
  margin-top: 10px;
}
.mouseEnter:hover {
  cursor: pointer;
  color: #ffa500;
  border-bottom: 1px solid #ffa500;
}
</style>
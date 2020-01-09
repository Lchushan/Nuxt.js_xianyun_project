<template>
  <div class="detail">
    <!-- 主体 -->
    <div class="main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>{{postDetail.title}}</h1>
      <div class="post-info">
        <span>攻略：{{postDetail.created_at | dataFormat('-')}}</span>
        <span>阅读： {{postDetail.watch}}</span>
      </div>
      <div class="post-content" v-html="postDetail.content"></div>
      <div class="post-ctrl">
        <div class="ctrl-item">
          <i class="el-icon-edit-outline"></i>
          <p>评论</p>
        </div>
        <div class="ctrl-item">
          <i class="el-icon-star-off"></i>
          <p>收藏</p>
        </div>
        <div class="ctrl-item">
          <i class="el-icon-share"></i>
          <p>分享</p>
        </div>
        <div class="ctrl-item">
          <i class="el-icon-thumb"></i>
          <p>点赞</p>
        </div>
      </div>
      <!-- 评论区域 -->
      <cmtWrapper />
    </div>
    <!-- 右侧栏 -->
    <div class="aside">
      <h4 class="aside-title">相关攻略</h4>
      <div class="recomment-item" v-for="(item,index) in recommentPost" :key="index">
        <img :src="item.images[0]" alt />
        <div class="post-text">
          <div>{{item.title}}</div>
          <p>{{item.created_at | dataFormat('-')}} 阅读{{item.watch || 0}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cmtWrapper from '@/components/post/cmtWrapper'
import { dataFormat } from '@/store/filter'
export default {
  data() {
    return {
      postDetail: {},
      recommentPost: []
    }
  },
  components: {
    cmtWrapper
  },
  filters: {
    dataFormat
  },
  mounted() {
    // 获取文章详情
    const id = this.$route.query.id
    console.log(this.$route.query.id)
    this.$axios({
      url: `/posts/${id}`
    }).then(res => {
      this.postDetail = res.data
      console.log(this.postDetail)
    })
    // 获取推荐文章列表
    this.$axios({
      url: '/posts/recommend'
    }).then(res => {
      this.recommentPost = res.data.data
    })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.detail {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding-top: 20px;
  width: 1000px;
  .main {
    width: 700px;
    h1 {
      padding: 20px 0;
      font-size: 32px;
      border-bottom: 1px solid #ddd;
    }
    .post-info {
      display: flex;
      justify-content: flex-end;
      padding: 20px;
      font-size: 16px;
      color: #999;
      span {
        padding-left: 20px;
      }
    }
    .post-content {
      width: 100%;
      /deep/img {
        max-width: 100%;
      }
    }
    .post-ctrl {
      display: flex;
      justify-content: center;
      padding: 50px 0 30px;
      cursor: pointer;
      .ctrl-item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin: 0 20px;
        font-size: 20px;
        i {
          font-size: 28px;
          color: #ffa500;
        }
        p {
          margin-top: 5px;
          color: #999;
          font-size: 14px;
        }
      }
    }
    .cmt-wrapper {
      margin-bottom: 20px;
    }
  }
  .aside {
    width: 280px;
    .aside-title {
      padding-bottom: 10px;
      font-size: 18px;
      font-weight: normal;
      border-bottom: 1px solid #ddd;
    }
    .recomment-item {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
      > img {
        width: 100px;
        height: 80px;
        background-color: #fff;
      }
      .post-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 170px;
        div {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        p {
          color: #999;
          font: 12px 'Source Sans Pro';
        }
      }
    }
  }
}
</style>
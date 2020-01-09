<template>
  <!-- 文章格式1 -->
  <div class="post-list1" v-if="data.images.length>2">
    <h4 @click="toPostDetails">{{data.title}}</h4>
    <p v-html="data.summary" @click="toPostDetails"></p>
    <div class="post-imgs">
      <img :src="data.images[0]" alt @click="toPostDetails" />
      <img :src="data.images[1]" alt @click="toPostDetails" />
      <img :src="data.images[2]" alt @click="toPostDetails" />
    </div>
    <div class="post-info">
      <div class="post-info-left">
        <span>
          <i class="el-icon-location-outline"></i>
          {{data.cityName}} by
        </span>
        <span class="post-info-user" @click="$router.push({path: '/user/personal'})">
          <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt />
          {{data.account.nickname}}
        </span>
        <span>
          <i class="el-icon-view"></i>
          {{data.watch || 0}}
        </span>
      </div>
      <div class="users-like">{{data.like || 0}}赞</div>
    </div>
  </div>
  <!-- 文章格式2 -->
  <div class="post-list2" v-else-if="data.images.length<=2">
    <div class="img">
      <img :src="data.images[0]" alt @click="toPostDetails" />
    </div>
    <div class="post-container">
      <h4 @click="toPostDetails">{{data.title}}</h4>
      <p v-html="data.summary" @click="toPostDetails"></p>
      <div class="post-info">
        <div class="post-info-left">
          <span>
            <i class="el-icon-location-outline"></i>
            {{data.cityName}} by
          </span>
          <span class="post-info-user" @click="$router.push({path: '/user/personal'})">
            <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt />
            {{data.account.nickname}}
          </span>
          <span>
            <i class="el-icon-view"></i>
            {{data.watch || 0}}
          </span>
        </div>
        <div class="users-like">{{data.like || 0}}赞</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {}
  },
  methods: {
    toPostDetails() {
      this.$router.push({ path: `post/detail?id=${this.data.id}` })
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>

<style lang="less" scoped>
// 标题
h4 {
  margin: 0 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  cursor: pointer;
  &:hover {
    color: #ffa500;
  }
}
// 内容
p {
  margin: 0 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  cursor: pointer;
}
// 底部的用户信息
.post-info {
  display: flex;
  justify-content: space-between;
  .post-info-left {
    font: 12px 'Source Sans Pro';
    color: #999;
    .post-info-user {
      padding: 0 5px;
      cursor: pointer;
      color: #ffa500;
      > img {
        margin-bottom: 3px;
        height: 16px;
        width: 16px;
        vertical-align: middle;
        background-color: pink;
      }
    }
  }
  .users-like {
    font: 16px 'Source Sans Pro';
    color: #ffa500;
  }
}
// 文章列表格式1
.post-list1 {
  padding: 15px 0;
  border-bottom: 1px solid #999;

  .post-imgs {
    // position: relative;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    > img {
      width: 220px;
      height: 150px;
      cursor: pointer;
    }
  }
}
// 文章列表格式1
.post-list2 {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #999;
  .img {
    width: 220px;
    > img {
      width: 100%;
      height: 150px;
      cursor: pointer;
    }
  }
  .post-container {
    width: 470px;
  }
}
</style>
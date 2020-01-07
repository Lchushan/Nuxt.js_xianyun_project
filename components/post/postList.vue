<template>
  <!-- 文章格式1 -->
  <div class="post-list1" v-if="isNum==='1'">
    <!-- <div class="post-list1"> -->
    <h4>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h4>
    <p>大家对塞班岛总存在着这样的误解，知道他是美食地盘，就理所当然的觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么完？大家对塞班岛总存在着这样的误解，知道他是美食地盘，就理所当然的觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么完？大家对塞班岛总存在着这样的误解，知道他是美食地盘，就理所当然的觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么完？</p>
    <div class="post-imgs">
      <img src="/images/pic_sea.jpeg" alt />
      <img src="/images/pic_sea.jpeg" alt />
      <img src="/images/pic_sea.jpeg" alt />
    </div>
    <div class="post-info">
      <div class="post-info-left">
        <span>
          <i class="el-icon-location-outline"></i>北京市 by
        </span>
        <span class="post-info-user">
          <img src="/images/pic_sea.jpeg" alt /> 地球发动机
        </span>
        <span>
          <i class="el-icon-view"></i> 12833
        </span>
      </div>
      <div class="users-like">74赞</div>
    </div>
  </div>
  <!-- 文章格式2 -->
  <div class="post-list2" v-else-if="isNum==='2'">
    <!-- <div class="post-list2"> -->
    <div class="img">
      <img src="/images/pic_sea.jpeg" alt />
    </div>
    <div class="post-container">
      <h4>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h4>
      <p>大家对塞班岛总存在着这样的误解，知道他是美食地盘，就理所当然的觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么完？</p>
      <div class="post-info">
        <div class="post-info-left">
          <span>
            <i class="el-icon-location-outline"></i>北京市 by
          </span>
          <span class="post-info-user">
            <img src="/images/pic_sea.jpeg" alt /> 地球发动机
          </span>
          <span>
            <i class="el-icon-view"></i> 12833
          </span>
        </div>
        <div class="users-like">74赞</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNum: '1'
    }
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
}
// 内容
p {
  margin: 0 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
// 底部的用户信息
.post-info {
  display: flex;
  justify-content: space-between;
  .post-info-left {
    font: 12px 'Source Sans Pro';
    color: #999;
    .post-info-user {
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
      background-color: pink;
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
      background-color: pink;
    }
  }
  .post-container {
    width: 470px;
  }
}
</style>
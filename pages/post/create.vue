<template>
  <div class="create">
    <div class="main">
      <h2>发表新攻略</h2>
      <p class="create-desc">分享你的个人游记，让更多人看到哦！</p>
      <!-- form表单 -->
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="选择城市">
          <el-input v-model="form.city" placeholder="请搜索游玩城市" style="width: 30%;"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布</el-button>
          <span>或者</span>
          <a href="#">保存到草稿</a>
        </el-form-item>
      </el-form>
    </div>
    <div class="aside">
      <div class="draft-box">
        <h4 class="draft-title">草稿箱（0）</h4>
        <div class="draft-list">
          <div class="draft-item">
            <div class="draft-post-list">
              sss
              <i class="el-icon-edit"></i>
            </div>
            <p>2020-01-09</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(111)
    }
  }
}
</script>

<style lang="less" scoped>
.create {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  width: 1000px;
  .main {
    width: 750px;
    font-size: 16px;
    h2 {
      margin-bottom: 10px;
      font-size: 22px;
      font-weight: normal;
    }
    .create-desc {
      margin-bottom: 10px;
      font-size: 12px;
      color: #999;
    }
    .el-form-item {
      span {
        margin: 0 10px;
      }
      a {
        font-size: 14px;
        color: #ffa500;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .aside {
    width: 200px;
    .draft-box {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      .draft-title {
        margin-top: 10px;
        font-weight: normal;
      }
      .draft-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 10px;
        height: 38px;
        font-size: 14px;
        p {
          color: #999;
        }
      }
    }
  }
}
</style>
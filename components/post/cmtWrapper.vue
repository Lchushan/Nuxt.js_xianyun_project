<template>
  <div class="cmt-wrapper">
    <!-- 标题 -->
    <h4 class="cmt-title">评论</h4>
    <!-- 文本域 -->
    <div class="cmt-input">
      <textarea cols="30" rows="10" placeholder="说点什么吧..." v-model="ctmInput"></textarea>
    </div>
    <div class="cmt-input-ctrils">
      <!-- 上传图片 -->
      <div>
        <el-upload
          action="http://localhost:3000/upload"
          :headers="setToken()"
          :on-success="coverSuccess"
          :limit="3"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
      <!-- 提交按钮 -->
      <div>
        <el-button type="primary">提交</el-button>
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="cmt-items">
      <ctmItem />
    </div>
    <!-- 分页模块 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2,4,6,8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="10"
    ></el-pagination>
  </div>
</template>

<script>
import ctmItem from '@/components/post/cmtItem'
export default {
  data() {
    return {
      ctmInput: '',
      dialogImageUrl: '',
      dialogVisible: false,
      currentPage: 1
    }
  },
  components: {
    ctmItem
  },
  methods: {
    // 设置请求头（为了验证token值）
    setToken() {},
    // 上传图片的函数
    coverSuccess() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less" scoped>
.cmt-wrapper {
  .cmt-title {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: normal;
  }
  .cmt-input {
    margin-bottom: 10px;
    textarea {
      padding: 5px 15px;
      width: 700px;
      height: 54px;
      min-height: 33px;
      box-sizing: border-box;
      border: 1px solid #dcdfe6;
      border-radius: 10px;
      resize: none;
      outline: none;
      &:focus {
        border-color: #409eff;
      }
    }
  }
  .cmt-input-ctrils {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    width: 100%;
    font-size: 16px;
  }
  .cmt-items {
    font-size: 16px;
    border: 1px solid #ddd;
  }
  .el-pagination {
    margin-top: 10px;
  }
}
</style>
<template>
  <div class="cmt-wrapper">
    <!-- 标题 -->
    <h4 class="cmt-title">评论</h4>
    <!-- 回复按钮 -->
    <span class="showReply" v-if="replayUser">
      回复 @{{replaynickname}}
      <span class="det">
        <i class="el-icon-close" @click="replayUser=false"></i>
      </span>
    </span>
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
        <el-button type="primary" @click="submitFile">提交</el-button>
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="cmt-items">
      <ctmItem
        :data="item"
        v-for="(item,index) in dataList"
        :key="index"
        @replayComment="replayComment"
        @answerComment="replayComment"
      />
    </div>
    <!-- 分页模块 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2,4,6,8,10]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="10"
    ></el-pagination>
  </div>
</template>

<script>
import ctmItem from '@/components/post/cmtItem'
export default {
  props: ['commentList'],
  data() {
    return {
      ctmInput: '',
      dialogImageUrl: '',
      dialogVisible: false,
      currentPage: 1,
      currenSize: 2,
      replayUser: false,
      replaynickname: ''
    }
  },
  watch: {
    $router() {}
  },
  components: {
    ctmItem
  },
  computed: {
    dataList() {
      let arr = this.commentList.slice(
        (this.currentPage - 1) * this.currenSize,
        this.currentPage * this.currenSize
      )
      return arr
    }
  },
  methods: {
    // 设置请求头（为了验证token值）
    setToken() {},
    // 上传图片的函数
    coverSuccess() {},
    // 发表评论
    submitFile() {
      console.log(`11111`)
      // this.$emit('submitFile')
    },
    // 点击一级评论回复
    replayComment(e) {
      console.log(22222)
      this.replayUser = true
      this.replaynickname = e
      // this.$emit('replayComment', e)
    },
    // 确定页面的条数
    handleSizeChange(val) {
      this.currenSize = val
      console.log(`每页 ${val} 条`)
    },
    // 确定页码的页数
    handleCurrentChange(val) {
      this.currentPage = val
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
  .showReply {
    display: inline-block;
    margin-bottom: 10px;
    padding: 0 10px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #e0e0e3;
    border-radius: 5px;
    background-color: #f4f4f5;
    font-size: 12px;
    color: #999;
    .el-icon-close {
      margin-left: 5px;
      width: 16px;
      height: 16px;
      line-height: 16px;
      cursor: pointer;
      border-radius: 50%;
      text-align: center;
      &:hover {
        background-color: #909399;
        color: #fff;
      }
    }
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
    .cmt-item {
      border-bottom: 1px dashed #ddd;
      &:nth-last-child(1) {
        border: none;
      }
    }
  }
  .el-pagination {
    margin-top: 10px;
  }
}
</style>
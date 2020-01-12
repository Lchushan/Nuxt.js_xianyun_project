<template>
  <div class="create">
    <div class="main">
      <h2>发表新攻略</h2>
      <p class="create-desc">分享你的个人游记，让更多人看到哦！</p>
      <!-- form表单 -->
      <el-form ref="postForm" :model="postForm">
        <el-form-item>
          <el-input v-model="postForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="选择城市">
          <el-input v-model="postForm.city" placeholder="请搜索游玩城市" style="width: 30%;"></el-input>
        </el-form-item>

        <!-- 富文本框 -->
        <el-form-item>
          <!-- <VueEditor :config="config" ref="connentPost" /> -->
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布</el-button>
          <span>或者</span>
          <span class="draft" @click="toDraft">保存到草稿</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="aside">
      <div class="draft-box">
        <h4 class="draft-title">草稿箱（{{draftData.length}}）</h4>
        <div class="draft-list">
          <!-- 草稿列表 -->
          <div class="draft-item" v-for="(item,index) in draftData" :key="index">
            <div class="draft-post-list" @click="toEditDraft(item)">
              {{item.title}}
              <i class="el-icon-edit"></i>
            </div>
            <p>{{item.date}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VueEditor from 'vue-word-editor'
import moment from 'moment'
import 'quill/dist/quill.snow.css'
export default {
  data() {
    return {
      postForm: {
        title: '',
        content: '',
        city: '',
        date: ''
      },
      draftData: [],
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://127.0.0.1:1337/upload',
          name: 'file',
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert('http://127.0.0.1:1337' + res.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://127.0.0.1:1337/upload',
          name: 'file',
          uploadSuccess(res, insert) {
            insert('http://127.0.0.1:1337' + res.data.url)
          }
        }
      }
    }
  },
  components: {
    // VueEditor
  },
  methods: {
    onSubmit() {
      console.log(111)
      // 获取富文本的内容
      var quill = this.$refs.connentPost.editor
      quill.root.innerHTML
    },
    // 保存为草稿
    toDraft() {
      if (!this.postForm.title) return this.$message.warning('请输入游记的标题')
      if (!this.postForm.city) return this.$message.warning('请输入游记的城市')
      this.postForm.content = 'creat'
      // this.postForm.date = new Date()
      this.postForm.date = moment(new Date()).format('YYYY-MM-DD')
      // 从本地存储提取
      let draftLocalData = JSON.parse(
        window.localStorage.getItem('travelNotes') || '[]'
      )
      // 前添加
      draftLocalData.unshift(this.postForm)
      console.log(draftLocalData)
      // 覆盖本地存储
      window.localStorage.setItem('travelNotes', JSON.stringify(draftLocalData))
      // this.$store.commit('user/travelNotes', this.draftData)
      //
      if (this.draftData.length !== draftLocalData) {
        this.draftData = draftLocalData
      }
    },
    // 编辑草稿
    toEditDraft(data) {
      this.postForm = data
    }
  },
  mounted() {
    this.draftData = JSON.parse(
      window.localStorage.getItem('travelNotes') || '[]'
    )
  }
  // computed: {
  //   draftData() {
  //     let arr = JSON.parse(window.localStorage.getItem('travelNotes') || '[]')
  //     return arr
  //   }
  // }
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
      span.draft {
        cursor: pointer;
        font-size: 14px;
        color: #ffa500;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    /deep/#editor {
      height: 400px;
    }
  }
  .aside {
    width: 200px;
    .draft-box {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      .draft-title {
        margin-bottom: 10px;
        font-weight: normal;
        color: #666;
      }
      .draft-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 10px;
        height: 38px;
        font-size: 14px;
        div.draft-post-list {
          cursor: pointer;
          &:hover {
            color: #ffa500;
            text-decoration: underline;
          }
        }
        p {
          color: #999;
        }
      }
    }
  }
}
</style>
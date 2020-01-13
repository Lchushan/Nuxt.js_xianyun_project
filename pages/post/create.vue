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

        <!-- 富文本框 -->
        <el-form-item>
          <VueEditor :config="config" ref="connentPost" />
        </el-form-item>

        <el-form-item label="选择城市">
          <el-autocomplete
            :fetch-suggestions="queryDepartSearch"
            placeholder="请搜索游玩城市"
            @select="handleTravelCity"
            class="el-autocomplete"
            v-model="postForm.cityName"
            @blur="loseTravelSelect"
          ></el-autocomplete>
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
            <div class="draft-left">
              <div class="draft-post-list" @click="toEditDraft(item)">
                {{item.title}}
                <i class="el-icon-edit"></i>
              </div>
              <p>{{item.date}}</p>
            </div>
            <div class="draft-del" @click="toDelDraft(index)">
              <i class="el-icon-close"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueEditor from 'vue-word-editor'
import moment from 'moment'
import 'quill/dist/quill.snow.css'
export default {
  data() {
    return {
      postForm: {
        title: '',
        content: '',
        cityName: '',
        city: '',
        date: ''
      },
      travelCityData: [],
      draftData: [],
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://127.0.0.1:1337/upload',
          name: 'files',
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert('http://127.0.0.1:1337' + res.data[0].url)
          }
        },
        // 上传视频的配置
        uploadVideo: {
          url: 'http://127.0.0.1:1337/upload',
          name: 'file',
          uploadSuccess(res, insert) {
            insert('http://127.0.0.1:1337' + res.data[0].url)
          }
        }
      }
    }
  },
  components: {
    VueEditor
  },
  methods: {
    // 业务需求 输入的内容为空，不显示；输入内容，下拉列表显示（需要发送请求获取数据）
    queryDepartSearch(value, callback) {
      // 输入的值为空的时候，不显示下拉列表
      if (value === '') {
        callback([])
        return
      }
      // console.log(value)
      // 根据输入的内容，发送请求获取 游记的城市名称 的信息
      // 根据输入的内容，发送请求获取 出发实时机票城市 的信息
      this.$axios({
        url: '/airs/city',
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res)
        // this.travelCityData = res.data.data
        const { data } = res.data
        // console.log(data)
        // 循环给data中每一项添加一个value属性，并且没有市字的
        this.travelCityData = data.map(v => {
          v.value = v.name
          return v
        })
        // console.log(this.travelCityData)
        // this.travelCityData = [...data]
        // 返回下拉列表的数组（value值）
        callback(this.travelCityData)
      })
    },
    // 目标城市下拉选择时触发
    handleTravelCity(item) {
      this.postForm.cityName = item.value
      this.postForm.city = item.id
    },
    // 到达城市输入框失去焦点时候默认选中第一个城市
    loseTravelSelect() {
      if (this.travelCityData.length > 0) {
        this.postForm.cityName = this.travelCityData[0].value
        this.postForm.city = this.travelCityData[0].id
      }
    },
    // 点击发布按钮
    onSubmit() {
      // 获取token值
      const {
        user: { userInfo }
      } = this.$store.state
      // 未登录的状态
      if (!userInfo.token) {
        this.$message.warning('请先登录')
        this.$router.push({ path: `/user/login` })
        return
      }
      // 判断题目是否为空
      if (!this.postForm.title) {
        this.$alert('请填写标题', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      // 获取富文本的内容
      var quill = this.$refs.connentPost.editor
      this.postForm.content = quill.root.innerHTML
      // 判断内容是否为空
      if (!this.postForm.content) return this.$message.warning('请输入游记的内容')
      // 判断城市是否为空
      if (!this.postForm.cityName)
      return this.$message.warning('请输入游记的城市')
      if (!this.postForm.city)
        return this.$message.warning('请选择正确的城市名称')
      // console.log(this.postForm)
      const { date, cityName, ...form } = this.postForm
      // form.city = +form.city
      // 发布文章
      this.$axios({
        method: 'post',
        url: '/posts',
        data: form,
        headers: {
          Authorization: `Bearer ${userInfo.token || 'NO TOKEN'}`
        }
      }).then(res => {
        // console.log(res)
        if (res.data.message === '新增成功') {
          this.$message.success(res.data.message)
          this.postForm.title = ''
          this.postForm.cityName = ''
          var quill = this.$refs.connentPost.editor
          quill.root.innerHTML = ''
        }
      })
    },
    // 保存为草稿
    toDraft() {
      if (!this.postForm.title) return this.$message.warning('请输入游记的标题')
      if (!this.postForm.cityName)
        return this.$message.warning('请输入游记的城市')
      this.postForm.content = this.$refs.connentPost.editor.root.innerHTML
      // this.postForm.date = new Date()
      this.postForm.date = moment(new Date()).format('YYYY-MM-DD')
      // 从本地存储提取
      let draftLocalData = JSON.parse(
        window.localStorage.getItem('travelNotes') || '[]'
      )
      // 前添加
      draftLocalData.unshift(this.postForm)
      // console.log(draftLocalData)
      // 覆盖本地存储
      window.localStorage.setItem('travelNotes', JSON.stringify(draftLocalData))
      // 改变右侧栏的显示
      if (this.draftData.length !== draftLocalData) {
        this.draftData = draftLocalData
      }
    },
    // 编辑草稿
    toEditDraft(data) {
      this.postForm = data
      this.$refs.connentPost.editor.root.innerHTML = this.postForm.content
    },
    // 删除草稿
    toDelDraft(index) {
      console.log(index)
      // 从本地存储提取
      let draftLocalData = JSON.parse(
        window.localStorage.getItem('travelNotes')
      )
      // 删除当前数据
      draftLocalData.splice(index, 1)
      // 覆盖本地存储
      window.localStorage.setItem('travelNotes', JSON.stringify(draftLocalData))
      // 改变右侧栏的显示
      if (this.draftData.length !== draftLocalData) {
        this.draftData = draftLocalData
      }
    }
  },
  mounted() {
    this.draftData = JSON.parse(
      window.localStorage.getItem('travelNotes') || '[]'
    )
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
        justify-content: space-between;
        .draft-left {
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
}
</style>
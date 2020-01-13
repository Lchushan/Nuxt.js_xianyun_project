<template>
  <div class="cmt-item">
    <div class="cmt-info">
      <div class="user">
        <img :src="$axios.defaults.baseURL + data.account.defaultAvatar" alt />
        {{data.account.nickname}}
        <i>{{data.account.created_at|dataFormat('-')}}</i>
      </div>
      <span>{{commentNumber}} 楼</span>
    </div>
    <div class="ctm-content">
      <!-- 二级评论 -->
      <ctmArea :areaData="data.parent" v-if="data.parent" @answerComment="answerComment" />
      <div class="show">
        <p class="ctm-message">{{data.content}}</p>
        <div class="imgs">
          <div class="cmt-pic" v-for="(item,index) in data.pics" :key="index">
            <img :src="$axios.defaults.baseURL + item.url" alt />
          </div>
        </div>
        <div class="ctm-ctrl">
          <a href="javascript:;" @click="replayComment(data)">回复</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ctmArea from '@/components/post/cmtArea'
import { dataFormat } from '@/store/filter'
export default {
  props: ['data'],
  data() {
    return {
      localNum: 0
    }
  },
  computed: {
    commentNumber() {
      // 递归函数计算级别
      function countNum(v) {
        if (v.parent) {
          i++
          countNum(v.parent)
          return i
        }
      }
      let i = 1
      countNum(this.data)
      return i
    }
  },
  filters: {
    dataFormat
  },
  components: {
    ctmArea
  },
  mounted() {},
  methods: {
    // 一级评论
    replayComment(data) {
      this.$emit('replayComment', data)
    },
    // 二级评论
    answerComment(e) {
      this.$emit('answerComment', e)
    }
  }
}
</script>

<style lang="less" scoped>
.cmt-item {
  padding: 20px 20px 5px;
  .cmt-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .user {
      font-size: 12px;
      color: #666;
      > img {
        margin-bottom: 3px;
        height: 16px;
        width: 16px;
        vertical-align: middle;
        background-color: pink;
      }
      i {
        color: #999;
      }
    }
    > span {
      color: #666;
      font-size: 12px;
    }
  }
  .ctm-content {
    padding-left: 30px;
    .ctm-message {
      margin-top: 10px;
    }
    .ctm-ctrl {
      display: flex;
      justify-content: flex-end;
      height: 20px;
      font-size: 12px;
      color: #fff;
      a:hover {
        text-decoration: underline;
      }
    }
    .show:hover .ctm-ctrl {
      color: #1e50a2;
    }
    .imgs {
      display: flex;
      justify-content: flex-start;
      .cmt-pic {
        margin: 10px 5px 0 0;
        padding: 5px;
        width: 80px;
        height: 80px;
        border: 1px dashed #ddd;
        border-radius: 6px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
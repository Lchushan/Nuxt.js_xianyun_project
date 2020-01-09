<template>
  <div class="cmt-item">
    <div class="cmt-info">
      <div class="user">
        <img :src="$axios.defaults.baseURL + data.account.defaultAvatar" alt />
        {{data.account.nickname}}
        <i>{{data.account.created_at|dataFormat('-')}}</i>
      </div>
      <span>1</span>
    </div>
    <div class="ctm-content">
      <ctmArea :areaData="data.parent" v-if="data.parent" @answerComment="answerComment" />
      <div class="show">
        <p class="ctm-message">{{data.content}}</p>
        <div class="ctm-ctrl">
          <a href="javascript:;" @click="replayComment(data.account.nickname)">回复</a>
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
  filters: {
    dataFormat
  },
  components: {
    ctmArea
  },
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
  }
}
</style>
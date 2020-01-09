<template>
  <div class="cmt-area">
    <div class="cmt-info">
      <div class="user">
        {{areaData.account.nickname}}
        <i>{{areaData.account.created_at|dataFormat('-')}}</i>
      </div>
      <span>1</span>
    </div>
    <recursion
      v-if="areaData.parent"
      :areaData="areaData.parent"
      @answerComment="answerComment(areaData.parent.account.nickname)"
    ></recursion>
    <div class="ctm-content">
      <p class="ctm-message">{{areaData.content}}</p>
      <div class="ctm-ctrl" ref="ctmCtrl">
        <a href="javascript:;" @click="answerComment(areaData.account.nickname)">回复</a>
      </div>
    </div>
  </div>
</template>

<script>
import { dataFormat } from '@/store/filter'
export default {
  props: ['areaData'],
  name: 'recursion',
  filters: {
    dataFormat
  },
  methods: {
    answerComment(e) {
      this.$emit('answerComment', e)
    }
  }
}
</script>

<style lang="less" scoped>
.cmt-area {
  padding: 5px 10px 0px;
  border: 1px solid #ddd;
  .cmt-info {
    display: flex;
    justify-content: space-between;
    .user {
      font-size: 12px;
      color: #666;
      i {
        color: #999;
      }
    }
  }
  .ctm-content {
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
        color: #1e50a2;
      }
    }
  }
  .ctm-content:hover .ctm-ctrl {
    color: #1e50a2;
  }
}
</style>
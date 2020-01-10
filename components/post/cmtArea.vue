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
      @answerComment="answerComment(areaData.parent)"
    ></recursion>
    <div class="ctm-content">
      <p class="ctm-message">{{areaData.content}}</p>
      <div class="imgs">
        <div class="cmt-pic" v-for="(item,index) in areaData.pics" :key="index">
          <img :src="$axios.defaults.baseURL + item.url" alt />
        </div>
      </div>
      <div class="ctm-ctrl" ref="ctmCtrl">
        <a href="javascript:;" @click="answerComment(areaData)">回复</a>
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
  .ctm-content:hover .ctm-ctrl {
    color: #1e50a2;
  }
}
</style>
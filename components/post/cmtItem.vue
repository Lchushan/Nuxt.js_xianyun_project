<template>
  <div class="cmt-item">
    <div class="cmt-info">
      <div class="user">
        <img :src="$axios.defaults.baseURL" alt />地球发动机
        <i>2020-01-09 3:00</i>
      </div>
      <span>1</span>
    </div>
    <div class="ctm-content">
      <ctmArea />
      <p class="ctm-message">组件递归</p>
      <div class="ctm-ctrl"><a href="#">回复</a></div>
    </div>
    </div>
  </div>
</template>

<script>
import ctmArea from '@/components/post/cmtArea'
export default {
  components: {
    ctmArea
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
      color: #1e50a2;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
<template>
  <div class="cmt-area">
    <div class="cmt-info">
      <div class="user">
        地球发动机
        <i>2020-01-09 3:00</i>
      </div>
      <span>1</span>
    </div>
    <div class="ctm-content">
      <p class="ctm-message">组件递归</p>
      <div class="ctm-ctrl">
        <a href="#">回复</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
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
      color: #1e50a2;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
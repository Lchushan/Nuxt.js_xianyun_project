<template>
  <div class="tab">
    <div class="header">
      <span
        v-for="(item,index) in ['新闻','体育','娱乐']"
        :key="index"
        @click="handlerClick(index)"
        :class="{active:current===index}"
      >{{item}}</span>
    </div>
    <div class="main">
      <div v-if="current===0">
        <ul>
          <li>普通新闻1</li>
          <li>普通新闻2</li>
          <li>普通新闻3</li>
        </ul>
      </div>
      <div v-if="current===1">
        <ul>
          <li>体育新闻1</li>
          <li>体育新闻2</li>
          <li>体育新闻3</li>
        </ul>
      </div>
      <div v-if="current===2">
        <ul>
          <li>娱乐新闻1</li>
          <li>娱乐新闻2</li>
          <li>娱乐新闻3</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    }
  },
  methods: {
    handlerClick(index) {
      this.current = index
    }
  }
}
</script>

<style lang='less'>
.tab {
  margin: 0 auto;
  width: 600px;
  height: 300px;
  .active {
    color: #f00;
    border-bottom: 1px solid #f00;
  }
}
</style>
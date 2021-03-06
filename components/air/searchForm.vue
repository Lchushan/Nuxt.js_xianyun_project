<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
          @blur="loseDepartSelect"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
          @blur="loseDestSelect"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
          :picker-options="pickerDepartDate"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>

      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      currentTab: 0,
      form: {
        departCity: '', //出发城市
        departCode: '', //出发城市代码
        destCity: '', //到大城市
        destCode: '', //到达城市代码
        departDate: '' //日期字符串
      },
      departData: [],
      destData: [],
      pickerDepartDate: {
        // 禁用的范围：time.getTime()
        // 当天的日期：Date.now()
        // 一天的时间：3600 * 1000 * 24（毫秒）
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24
        }
      }
    }
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {},

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，callback 是回调函数，接收要展示的列表
    // 业务需求 输入的内容为空，不显示；输入内容，下拉列表显示（需要发送请求获取数据）
    queryDepartSearch(value, callback) {
      // 输入的值为空的时候，不显示下拉列表
      if (value === '') {
        callback([])
        return
      }
      // 根据输入的内容，发送请求获取 出发实时机票城市 的信息
      this.$axios({
        url: '/airs/city',
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data
        // 循环给data中每一项添加一个value属性，并且没有市字的
        this.departData = data.map(v => {
          v.value = v.name.replace('市', '')
          return v
        })
        // 返回下拉列表的数组（value值）
        callback(this.departData)
      })
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, callback) {
      // 输入的值为空的时候，不显示下拉列表
      if (value === '') {
        callback([])
        return
      }
      // 根据输入的内容，发送请求获取 出发实时机票城市 的信息
      this.$axios({
        url: '/airs/city',
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data
        // 循环给data中每一项添加一个value属性，并且没有市字的
        this.destData = data.map(v => {
          v.value = v.name.replace('市', '')
          return v
        })
        // 返回下拉列表的数组（value值）
        callback(this.destData)
      })
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      console.log(item)
      this.form.departCity = item.value
      this.form.departCode = item.sort
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value
      this.form.destCode = item.sort
    },

    // 出发城市没有点击下拉选择时就失去焦点时触发
    // 出发城市输入框失去焦点时候默认选中第一个城市
    loseDepartSelect() {
      if (this.departData.length > 0) {
        this.form.departCity = this.departData[0].value
        this.form.departCode = this.departData[0].sort
      }
    },

    // 到达城市输入框失去焦点时候默认选中第一个城市
    loseDestSelect() {
      if (this.destData.length > 0) {
        this.form.destCity = this.destData[0].value
        this.form.destCode = this.destData[0].sort
      }
    },

    // 确认选择日期时触发
    handleDate(value) {
      // 日期格式化
      value = moment().format('YYYY-MM-DD')
      // 把选中的日期赋值给表单的时间 departDate
      this.form.departDate = value
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, destCity } = this.form
      this.form.departCity = destCity
      this.form.destCity = departCity
    },

    // 提交表单是触发
    handleSubmit() {
      // 自定义校验规则（通过状态来判断）
      const rules = {
        departCity: {
          value: this.form.departCity,
          err_message: '出发城市不能为空'
        },
        destCity: {
          value: this.form.destCity,
          err_message: '到达城市不能为空'
        },
        departData: {
          value: this.form.departDate,
          err_message: '出发日期不能为空'
        }
      }
      // 验证的变量
      let valid = true

      // 循环判断rules属性的值是否为空
      Object.keys(rules).forEach(key => {
        // 只要valid时false就没有必要再循环
        if (valid === false) return
        // 如果只有一项为空，把valid设置为false
        if (rules[key].value === '') {
          this.$message.error(rules[key].err_message)
          valid = false
          return
        }
      })

      // 判断valid为false，就不再进行以下操作
      if (valid === false) return

      // 添加记录到本地
      // 读取本地的记录
      let airs = JSON.parse(window.localStorage.getItem('airs') || `[]`)
      // 前添加读取的记录
      airs.push(this.form)
      // 把记录储存到本地，覆盖之前的数据
      window.localStorage.setItem('airs', JSON.stringify(airs))

      // 跳转到机票的列表页
      this.$router.push({
        path: '/air/flights',
        query: this.form
      })
    }
  },
  mounted() {}
}
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: '';
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: '';
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>

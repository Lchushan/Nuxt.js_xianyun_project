<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item ,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}`"
            border
            @change="handleInsurance(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <!-- 隐藏域，为了computed中的属性 allPrice 能触发 -->
    <input type="hidden" :value="allPrice" />
  </div>
</template>

<script>
export default {
  props: {
    // 接收机票信息
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // 乘机人的数组
      users: [
        {
          username: '',
          id: ''
        }
      ],
      insurances: [], // 保险数据
      contactName: '', // 联系人名字
      contactPhone: '', // 联系人电话
      captcha: '000000', // 验证码
      invoice: false // 发票
    }
  },
  computed: {
    // 计算总价格
    allPrice() {
      // 初始化，总价钱为0
      let price = 0
      // len：乘机人的人数
      let len = this.users.length

      // 乘机人的总机票钱 = 单价 * 人数
      price += this.data.seat_infos.org_settle_price * len

      // 保险总价 = 一个人买的保险钱 * 人数
      this.insurances.forEach(v => {
        price += this.data.insurances[v - 1].price * len
      })

      // 飞机既有费 = 个人的油费 * 人数
      price += this.data.airport_tax_audlet * len

      // 触发设置总金额事件（发送给父组件，把价格price传送给侧边栏组件）
      this.$emit('setAllPrice', price)

      return price
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users = [
        ...this.users,
        {
          username: '',
          id: ''
        }
      ]
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1)
    },

    // 选择保险
    handleInsurance(id) {
      // this.insurances.indexOf(id)：判断this.insurances是否有id值
      //存在即去除
      if (this.insurances.indexOf(id) > -1) {
        //this.insurances 中有值id，说明重复点击，需要去除
        let arr = this.insurances.slice(0)
        arr.splice(this.insurances.indexOf(id), 1)
        this.insurances = arr
      } else {
        //this.insurances 中无值id
        // new Set：实现去重；使用格式 [ new Set(数组/对象)]
        this.insurances = [...new Set([...this.insurances, id])]
      }
    },

    // 发送手机验证码
    handleSendCaptcha() {
      // 判断手机号码不能为空
      if (this.contactPhone === '') {
        this.$message.error('手机号码不能为空')
        return
      }
      //发送请求获取手机验证码
      this.$store.dispatch('user/sendCaptcha', this.contactPhone).then(res => {
        //成功获取到验证码
        this.$message.success('验证码：' + res.data.code)
      })
    },

    // 提交订单
    handleSubmit() {
      // 表单数据拼接
      const orderData = {
        users: this.users, //用户列表
        insurances: this.insurances, //保险id
        contactName: this.contactName, //联系人名字
        contactPhone: this.contactPhone, //联系人电话
        captcha: this.captcha, //手机验证码
        invoice: this.invoice, //是否需要发票
        seat_xid: this.data.seat_infos.seat_xid, //作为id
        air: this.data.id //航班id
      }

      // 订单生成成功，告诉用户
      this.$message({
        message: '正在生成订单！请稍等',
        type: 'success'
      })

      // 获取token值
      const {
        user: { userInfo }
      } = this.$store.state

      // 发送生成订单请求
      this.$axios({
        method: 'post',
        url: '/airorders',
        data: orderData,
        headers: {
          Authorization: `Bearer ${userInfo.token || 'NO TOKEN'}`
        }
      })
        .then(res => {
          const {
            data: { id }
          } = res.data
          // 跳转到付款页
          this.$router.push({
            path: '/air/pay',
            query: {
              id
            }
          })
        })
        .catch(err => {
          const { message } = err.response.data
          // 警告提示
          this.$confirm(message, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
        })
    }
  }
}
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>
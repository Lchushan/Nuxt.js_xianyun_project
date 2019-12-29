<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 用户名的验证
    const validateUsername = (rule, value, callback) => {
      const reg = /^1[3-9][0-9]{9}$/
      if (value === '') {
        callback('请输入用户名')
      } else {
        if (reg.test(value)) {
          callback()
        } else {
          callback('手机号码格式错误')
        }
      }
    }
    // 第一次的密码验证
    const validatePassword = (rule, value, callback) => {
      // 判断第一次密码是否为空
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        //如果第二次密码不为空，校验第二次的密码
        // validateField：对部分表单字段进行校验的方法
        if (this.form.checkPassword !== '') {
          this.$refs.form.validateField('checkPassword')
        }
        callback()
      }
    }
    // 第二次的密码验证（确定两次密码是否相同）
    const validateCheckPassword = (rule, value, callback) => {
      //判断第二次密码是否为空
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        //判断两次密码是否一致
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据
      form: {
        username: '',
        nickname: '',
        captcha: '',
        password: '',
        checkPassword: ''
      },
      // 表单规则
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        captcha: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' }
        ],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        checkPassword: [{ validator: validateCheckPassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      //判断手机号码不能为空
      if (!this.form.username) {
        this.$message.warning('手机号码不能为空，请输入用户手机号')
        return
      }
      //判断手机号是否为11位数，直接发送请求
      let rule = /^1[3-9][0-9]{9}$/
      if (rule.test(this.form.username)) {
        //发送请求获取手机验证码
        this.$axios({
          url: '/captchas',
          method: 'post',
          data: {
            tel: this.form.username
          }
        }).then(res => {
          //成功获取到验证码
          this.$message.success('验证码：' + res.data.code)
        })
      }
    },

    // 注册
    handleRegSubmit() {
      console.log(this.form)
    }
  }
}
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
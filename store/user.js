// 保存user下的数据
export const state = {
  // 登录用户的信息
  userInfo: '',
  // // 写游记的草稿
  // travelNotes: ''
}


// 同步修改state的数据()
export const mutations = {
  //自定义一个函数，修改name属性
  // mutations函数的第一和参数必须是state，state就是上面的state对象
  // 同步修改登录用户信息
  setUserInfo(state, data) {
    // 函数的修改方式是为了方便修改的其他逻辑
    state.userInfo = data
  },
  // setTravelNotes(state, data) {
  //   // 函数的修改方式是为了方便修改的其他逻辑
  //   state.travelNotes = data
  // }
}


// 异步修改state的数据(this.$store.dispatch)
export const actions = {
  // 1. 发送登录请求
  login(state, data) {
    //登录接口提交，必须需要return，返回值
    return this.$axios({
      url: '/accounts/login',
      method: 'post',
      data
    }).then(res => {
      //登录成功返回上一页面
      this.$router.back()
      //把数据储存在state中
      state.commit('setUserInfo', res.data)
      // 返回true
      return true
    })
  },
  // 2. 发送验证码请求
  sendCaptcha(state, data) {
    return this.$axios({
      url: '/captchas',
      method: 'post',
      data: {
        tel: data
      }
    })
  },
  // 3. 发送注册请求,需要注册成功之后，直接登录
  register(state, data) {
    return this.$axios({
      url: '/accounts/register',
      method: 'post',
      data
    }).then(res => {
      //登录成功返回上一页面
      this.$router.back()
      //把数据储存在state中
      state.commit('setUserInfo', res.data)
      // 返回true
      return true
    })
  }
}
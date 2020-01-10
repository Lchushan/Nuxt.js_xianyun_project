
// 引入message消息插件
import { Message } from 'element-ui'

export default (nuxt) => {
  // axios中的错误处理
  nuxt.$axios.onError(err => {
    // response是js原生Error对象的属性
    const { statusCode, message } = res.response.data;

    if (statusCode === 400) {
      // 调用，Message相当于 this.$message
      Message.error(err.response.data.message)
    }

    if (statusCode === 401) {
      // Message相当于this.$message
      Message.error("登录过期，跳转到登录页");
      // 跳转到登录页
      nuxt.redirect(200, "/user/login");
    }
  })
}

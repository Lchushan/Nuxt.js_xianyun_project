
// 引入message消息插件
import { Message } from 'element-ui'

export default ({$axios})=>{
  // axios中的错误处理
  $axios.onError(err=>{
    // 调用，Message相当于 this.$message
    Message.error(err.response.data.message)
  })
}

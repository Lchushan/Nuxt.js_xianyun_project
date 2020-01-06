<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 生成二维码的包
import QRCode from 'qrcode'
export default {
  data() {
    return {
      price: '',
      timer: null
    }
  },
  mounted() {
    setTimeout(v => {
      // 获取id值
      const { id } = this.$route.query
      // 获取用户信息，但是用户信息无法赋值，需要在页面加载完才赋值
      const {
        user: { userInfo }
      } = this.$store.state
      // 请求获取二维码
      this.$axios({
        url: `airorders/${id}`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }).then(res => {
        // price 用于展示
        const { payInfo, price } = res.data
        this.price = price
        // 生成二维码到canvas
        const stage = document.querySelector('#qrcode-stage')
        QRCode.toCanvas(stage, payInfo.code_url, {
          width: 200
        })
        // 定时 检查付款状态（3000毫秒）
        this.timer = setInterval(async () => {
          // 调用函数(传入数据)
          const isResolve = await this.isPay(payInfo)
          console.log(isResolve)
          if (isResolve) {
            clearInterval(this.timer)
            return
          }
        }, 3000)
      })
    }, 200)
  },
  methods: {
    // 查询付款状态
    isPay(data) {
      // 获取参数
      const { id } = this.$route.query
      const {
        api,
        user: { userInfo }
      } = this.$store.state

      // 发送查询请求
      return this.$axios({
        url: '/airorders/checkpay',
        method: 'post',
        data: {
          id: id,
          nonce_str: data.nonce_str,
          out_trade_no: data.order_no
        },
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }).then(res => {
        // 将获取的订单状态赋值给 statusTxt
        const { statusTxt } = res.data

        if (statusTxt === '支付完成') {
          // 支付成功提示（消息提示）
          this.$confirm('订单支付成功', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'success'
          })
          
          // 返回 true ，让定时器停止
          return Promise.resolve(true)
        }

        return Promise.resolve(false)
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>
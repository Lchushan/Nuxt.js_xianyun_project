<template>
  <!-- <div class="container"> -->
  <div class="container">
    <div class="layout">
      <!-- 左侧栏 -->
      <div width="200px" class="aside">
        <!-- 左侧的导航 -->
        <div class="menus-body">
          <!-- 主体 -->
          <div class="menus">
            <div class="menus-item" @mouseenter="isShow=true" @mouseleave="isShow=false">
              热门城市
              <i class="el-icon-arrow-right"></i>
            </div>
            <div class="menus-item">
              推荐城市
              <i class="el-icon-arrow-right"></i>
            </div>
            <div class="menus-item">
              奔向海岛
              <i class="el-icon-arrow-right"></i>
            </div>
            <div class="menus-item">
              主体推荐
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <!-- 浮动布局 -->
          <div class="sub-munes" v-if="isShow">
            <ul>
              <li class="sub-munes-item">
                <a href="#">
                  <i>1</i>
                  <strong>北京</strong>
                  <span>世界著名古都和现代化国际城市</span>
                </a>
              </li>
              <li class="sub-munes-item">
                <a href="#">
                  <i>2</i>
                  <strong>广州</strong>
                  <span>粤澳港大湾区/反珠江三角洲经济区</span>
                </a>
              </li>
              <li class="sub-munes-item">
                <a href="#">
                  <i>3</i>
                  <strong>上海</strong>
                  <span>长江入海口，东隔东中国海</span>
                </a>
              </li>
              <li class="sub-munes-item">
                <a href="#">
                  <i>4</i>
                  <strong>成都</strong>
                  <span>国家历史文化名称</span>
                </a>
              </li>
              <li class="sub-munes-item">
                <a href="#">
                  <i>5</i>
                  <strong>西安</strong>
                  <span>中国国际形象最佳城市之一</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 左侧的推荐城市 -->
        <div class="aside-recommend">
          <h4 class="aside-title">推荐城市</h4>
          <a href="#" class="aside-recommend-item">
            <!-- <img data-v-053600ae="" src=""> -->
            <img src='/images/pic_sea.jpeg' alt />
          </a>
        </div>
      </div>
      <!-- 主体 -->
      <div class="main">Main</div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  margin: 0 auto;
  padding: 30px 0;
  width: 1000px;
  height: 1000px;
  .layout {
    position: relative;
    height: 100%;
    .aside {
      position: absolute;
      top: 0;
      left: 0;
      width: 260px !important;
      .menus-body {
        position: relative;
        height: 165px;
        .menus {
          height: 164px;
          border-left: 1px solid #ddd;
          border-top: 1px solid #ddd;
          .menus-item {
            position: relative;
            padding: 0 20px;
            height: 40px;
            line-height: 40px;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            z-index: 3;
            &:hover {
              border-right-color: #fff;
              color: #ffa500;
            }
            i {
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-50%);
            }
          }
        }
        .sub-munes {
          position: absolute;
          top: 0;
          left: 259px;
          z-index: 2;
          padding: 10px 20px;
          width: 310px;
          height: 182px;
          background-color: #fff;
          border: 1px solid #ddd;
          .sub-munes-item {
            height: 36px;
            line-height: 36px;
            font: 14px 'Source Sans Pro';
            vertical-align: top;
            a {
              color: #ffa500;
              i {
                position: relative;
                top: 5px;
                height: 32px;
                font-size: 24px;
                font-style: oblique;
              }
              strong {
                margin: 0 10px;
              }
              span {
                color: #999;
              }
            }
          }
        }
      }
      .aside-recommend {
        margin-top: 20px;
        .aside-title {
          margin-bottom: 10px;
          padding-bottom: 10px;
          font-size: 16px;
          font-weight: normal;
          border-bottom: 1px solid #ddd;
        }
        .aside-recommend-item {
          width: 100%;
          height: 170px;
          img {
            width: 100%;
            height: 170px;
            background-color: pink;
          }
        }
      }
    }
    .main {
      position: absolute;
      top: 0;
      right: 0;
      width: 700px;
      height: 100%;
      background-color: blue;
    }
  }
}
</style>
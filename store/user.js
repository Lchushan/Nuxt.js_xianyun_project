// 保存user下的数据
export const state = {
  userInfo: ''
}


// 同步修改state的数据
export const mutations = {
  //自定义一个函数，修改name属性
  // mutations函数的第一和参数必须是state，state就是上面的state对象
  setName(state, data) {
    // 函数的修改方式是为了方便修改的其他逻辑
    state.userInfo = data
  }
}


// 异步修改state的数据
// export const actions = {}
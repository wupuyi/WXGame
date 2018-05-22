// 进行小游戏API的测试
export class ApiExamples {
  getUerInfo () {
    const params = {
      success: function (res) {
        console.log(res);
      }
    }
    wx.getUserInfo(params);
  }

  login () {
    wx.login({
      success: function(res) {
        console.log(res)
      },
    })
  }

  getSettings () {
    wx.getSettings({
      success: function (res) {
        console.log(res)
      }
    })
  }

  // Http网络请求的调用
  httpExample () {
    // wx.request({
    //   url: 'http://127.0.0.1:8181',
    //   methods: 'POST',
    //   data: 'MyData',
    //   success: function (response) {
    //     console.log(response);
    //     // 这里可以根据服务器的只是，来做相应的动作
    //   }
    // })

    wx.request({
      url: 'https://www.baidu.com',
      methods: 'GET',
      success: function (response) {
        console.log(response);
        // 这里可以根据服务器的只是，来做相应的动作
      }
    })
  }
}
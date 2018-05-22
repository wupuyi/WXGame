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
}
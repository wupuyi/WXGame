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

  socketExample () {
    wx.connectSocket({
      // WebSocket协议为ws不是http
      url: 'ws://127.0.0.1:8282',
      success: function () {
        console.log('客户端链接成功')
      }
    });

    // 注意发送数据，必须在wx.onSocketOpen(callback)方法中进行

    wx.onSocketOpen(function () {
      wx.sendSocketMessage({
        data: '这个是来客户端的实时消息'
      });

      wx.onSocketMessage(function (message) {
        console.log(message)
      });
    });

  }

  download () {
    wx.downloadFile({
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526978636600&di=b16af6006a68e5d3fd2cee1e17714cc8&imgtype=0&src=http%3A%2F%2Fwww.hinews.cn%2Fpic%2F0%2F13%2F29%2F70%2F13297015_505700.jpg',
      success: function (temp) {
        console.log(JSON.stringify(temp))
      }

    })
  }
}
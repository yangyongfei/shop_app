const app = getApp()

Page({
  data: {
    sms:'笑话',
    avatarUrl:'https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg',
    dataList:[],
    userInfo:'',
    tips:'机器人小融'
  },

  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  sendmsg(){
    console.log(this.data.sms)
    var obj = {
      type:1,
      msg:this.data.sms
    }
     this.data.dataList.push(obj)
     this.setData({
       dataList: this.data.dataList
     })
    wx.request({
      url: 'https://api.qingyunke.com/api.php',
      method:'GET',
      data:{
        key:'free',
        appid:0,
        msg:this.data.sms
      },
      success:(res)=>{
         var obj = {
           type:2,
           msg:res.data.content.replace(/\{br}/g,'\n')
         }
          this.data.dataList.push(obj)
          this.setData({
            dataList: this.data.dataList
          })
          console.log(this.data.dataList)
      }
    })
  }
})

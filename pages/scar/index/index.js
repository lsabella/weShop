const observer = require('../../../libs/observer').observer;
const app = getApp();
Page(observer({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  props: {
    store: app.globalData.store
  },
  onLoad: function (options) {
    console.log(this.props.store.orgIfnos, '8888carcarcar', 'this store');
  },
  submit: function () {
    wx.navigateTo({
      url: '/pages/scar/order/index'
    });
  }
}));

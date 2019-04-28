const app = getApp();
const observer = require('../../../libs/observer').observer;
import apis from '../../../common/api.js';

Page(observer({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,
    current: 0, lines: 0,
    swiperlist: [],
    iconList: [],
    Headlines: [{
      id: 1,
      title: '测试标题1',
      type: 1
    }, {
      id: 2,
      title: '测试标题2',
      type: 2
    }, {
      id: 3,
      title: '测试标题3',
      type: 3
    }, {
      id: 4,
      title: '测试标题4',
      type: 4
    }],
    videosrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
  },
  props: {
    store: app.globalData.store
  },
  onLoad: function () {
    /* console.log(app.globalData.StatusBar);
		console.log(app.globalData.CustomBar); */
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            url: '/pages/auth/auth'
          });
        }
      }
    });
    this.getSwiperlist();
    this.getIconList();
    this.getOrgInfo();
    this.testRequest();
  },
  // 获取轮播区域内容
  getSwiperlist: function() {
    apis.getSwiperlist({}, { loading: true, catchError: false }).then(res => {
      this.setData({
        swiperlist: res
      });
    });
  },
  // 获取快速入口 iconList
  getIconList: function() {
    apis.getIconList({}, { loading: true, catchError: false }).then(res => {
      this.setData({
        iconList: res
      });
    });
  },
  // 获取商城信息 getOrgInfo
  getOrgInfo: function() {
    const { setOrgInfos } = this.props.store;
    apis.getOrgInfo({}, { loading: true, catchError: false }).then(res => {
      setOrgInfos(res);
    });
    console.log(this.props.store.orgIfnos, 'this store');
  },
  testRequest: function() {
    console.log(9999, 'testRequest');
    apis.getGoodsList({}, { loading: true, catchError: false }).then(result => {
      console.log(result);
    });
  },
  swiperchange: function (e) {
    this.setData({
      current: e.detail.current
    });
  },
  swipclick: function (e) {
    let that = this;
    let swip = that.data.swiperlist[that.data.current];
    console.log(swip);
    if (swip.type === 1) {
      wx.navigateTo({
        url: '/pages/home/doc/index?id=' + swip.id
      });
    }
  },
  lineschange: function (e) {
    this.setData({
      lines: e.detail.current
    });
  },
  linesclick: function (e) {
    let that = this;
    let swip = that.data.Headlines[that.data.current];
    console.log(swip);
    if (swip.type === 1) {
      wx.navigateTo({
        url: '/pages/home/doc/index?id=' + swip.id
      });
    }
  },
  itemckcred: function (e) {
    let that = this;
    let item = e.currentTarget.dataset;
    console.log(item.index, item.itemtype);
    if (item.itemtype === 1) {
      wx.navigateTo({
        url: '/pages/home/doc/index?id=' + item.index
      });
    }
    if (item.itemtype === 2) {
      wx.navigateTo({
        url: '/pages/home/joinus/index?id=' + item.index
      });
    }
  },
  search: function () {
    wx.navigateTo({
      url: '/pages/home/search/index'
    });
  }
}));

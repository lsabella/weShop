import './utils/wx-promise.js';
import config from './config';

// app.js
App({
  onLaunch: function (options) {
    const { query = {}} = options;
    if (query.debug) {
      wx.setEnableDebug({
        enableDebug: true
      });
    }
    let env = query.env;
    this.globalData.config = config[env] || config.default;
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        let CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        this.globalData.CustomBar = CustomBar;
        // 适配全面屏底部距离
        if (CustomBar > 75) {
          this.globalData.tabbar_bottom = 'y';
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
});


// Android 环境不支持Promise
// 使用Promise将微信API包装一下以减少代码中的嵌套
// import Promise from 'es6-promise.min.js'

const isDebug = true;
function promisify() {
  const wx_functions = [
    'login',
    'getUserInfo',
    'navigateTo',
    'checkSession',
    'getStorageInfo',
    'removeStorage',
    'clearStorage',
    'getNetworkType',
    'getSystemInfo',
    'chooseImage',
    'saveFile',
    'showToast',
    'getLocation'
  ];

  wx_functions.forEach(v => {
    wx[`$` + v] = (obj = {}) => {
      return new Promise((resolve, reject) => {
        obj.success = resolve;
        obj.fail = reject;
        wx[v](obj);
      });
    };
  });

  wx.$getStorage = key => {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key,
        success: res => {
          isDebug && console.log('==> sys log: ' + key, res.data);
          resolve(res.data);
        },
        fail: err => resolve(err)
      });
    });
  };

  wx.$setStorage = (key, data) => {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key,
        data,
        success: res => resolve(data),
        fail: reject
      });
    });
  };

  wx.$request = (options = {}, config = {}) => {
    const { url, method = 'GET', data } = options;

    const loading = !!config.loading;
    const stopPullRefresh = !!config.stopPullRefresh;
    const catchError = !!config.catchError;

    // 显示 Loading
    loading && wx.showLoading();
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method,
        header: { 'content-type': 'application/json;charset=UTF-8;' },
        success: res => {
          console.log(res, 'res');
          isDebug && console.log('==> sys log: ' + url, res.data);
          res.data.success ? resolve(res.data.data) : reject(res.data);
        },
        fail: reject,
        complete: () => {
          // 隐藏 Loading
          loading && wx.hideLoading();
          // 停止拖动
          stopPullRefresh && wx.stopPullDownRefresh();
        }
      });
    }).then(data => data, err => {
      catchError && wx.showToast({
        title: err.errDesc || err.errMsg || '服务器繁忙',
        icon: 'none'
      });
      throw err;
    });
  };

  // wx.$get, wx.$post, wx.$put, wx.$delete
  ['get', 'post', 'put', 'delete'].forEach(v => {
    wx[`$${v}`] = (options = {}, actions = {}) => {
      return wx.$request(Object.assign({ method: v.toUpperCase() }, options), actions);
    };
  });
}

promisify();

export default Promise;
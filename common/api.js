const apis = {
  getGoodsList: 'get /data/goods',
  // 获取首页轮播区域图片
  getSwiperlist: 'get /data/getSwiperlist',
};

/**
 * app.api.getGoodsList(data, config)
 * data:{}           // 是否显示loading, 默认 false
 * config: {
 *  loading,         // 是否显示loading, 默认 false
 *  catchError,      // 是否自动捕获异常, 默认 false
 *  stopPullRefresh  // 下拉刷新，更新完数据后禁止下拉, 默认 false
 * }
 */

// Api base URI    此处是mock的数据
const baseUrl = getApp().globalData.config.mock;

const createApis = apiConf => {
  Object.keys(apiConf).forEach(v => {
    const apiArr = apiConf[v].split(' ');
    const method = apiArr[0].toUpperCase();
    const url = apiArr[1];

    apiConf[v] = (data = {}, config = {}) => {
      return wx.$request({ url: baseUrl + url, method, data }, config);
    };
  });

  return apiConf;
};


export default createApis(apis);
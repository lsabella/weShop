// store.js
// 引入必须的库
const app = getApp();
const mobx = require('../libs/mobx');
const extendObservable = require('../libs/mobx').extendObservable;
const computed = require('../libs/mobx').computed;
const toJS = require('../libs/mobx').toJS;
// import apis from '../common/api.js';

let store = function () {
  extendObservable(this, {

    // observable data
    players: [1, 2],
    orgIfnos: {},

    // computed data
    get count() {
      return this.players.length;
    },
    get nums() {
      return 3;
    }
  });

  // action
  this.addPlayer = name => {
    let len = this.count;    // 此处调用computed data
    let id = len === 0 ? 1 : this.players[len - 1].id + 1;
    this.players = [1, 2, 3];
  };
  this.setOrgInfos = (data) => {
    this.orgIfnos = data;
  };
};

export default store;

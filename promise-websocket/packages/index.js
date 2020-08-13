'use strict';

export default class PromiseWebSocket {
  constructor(url, options) {
    options = options || {};
    this.url = url;
    this._websocket = undefined;
    this._promiseSubscribers = {};
    this._closeHandle = {
      close: true // 是否主动关闭
    };
    this._passiveCloseHandle = options['passiveCloseHandle'] || function (e) {
      console.error(e);
    };
  }

  open() {
    return new Promise((resolve, reject) => {

      if (typeof this._websocket === 'undefined') {
        this._websocket = new WebSocket(this.url);
        this._websocket.onopen = e => resolve(e);
        this._websocket.onerror = e => reject(e);
      }

      this._websocket.onmessage = e => {
        let jsonStr = e.data;
        let data = JSON.parse(jsonStr);
        if (data.uid) {
          let promiseSubscriber = this._promiseSubscribers[data.uid];
          if (promiseSubscriber) {
            promiseSubscriber.resolve(data);
          }
        }
      };

      this._websocket.onclose = e => {
        if (!this._closeHandle.close) { // 非主动关闭需要触发对应注册的时间
          if (typeof this._passiveCloseHandle === 'function') {
            this._passiveCloseHandle(e);
          }
        }
        this._closeHandle.close = true;
      };
    });
  }

  close() {
    this._closeHandle.close = true; // 主动关闭
    this._websocket.close();
  }

  send(data) {
    return new Promise((resolve, reject) => {
      data.uid = data.uid || new Date().toString();
      this._promiseSubscribers[data.uid] = {
        data,
        resolve,
        reject
      };
      this._websocket.send(JSON.stringify(data));
    });
  }

}

/*
 * @Description  : 创建Grid配置项 - events
 */

class EventsHelperClass {
  constructor() {
    this.events = {};
  }

  _getEvents() {
    return this.events;
  }
  /**
   * 注册事件监听
   * @param {string} event 事件名称
   * @param {function} callback 回调函数
   */
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = callback;
    }
  }
  /**
   * 移除指定事件监听
   * @param {string} event 事件名称
   */
  off(event) {
    delete this.events[event];
  }
}

function eventsHelper() {
  return new EventsHelperClass();
}

export default eventsHelper;

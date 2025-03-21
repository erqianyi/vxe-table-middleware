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

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = callback;
    }
  }
  off(event) {
    delete this.events[event];
  }
}

function eventsHelper() {
  return new EventsHelperClass();
}

export default eventsHelper;

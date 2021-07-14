'use strict';

function ChatEmmiter() {
  EventEmitter.call(this);
  this._peers = {};
}

ChatEmmiter.prototype = Object.create(EventEmitter.prototype);


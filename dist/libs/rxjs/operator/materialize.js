"use strict";function materialize(){return this.lift(new MaterializeOperator)}var __extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)},Subscriber_1=require("../Subscriber"),Notification_1=require("../Notification");exports.materialize=materialize;var MaterializeOperator=function(){function t(){}return t.prototype.call=function(t,e){return e.subscribe(new MaterializeSubscriber(t))},t}(),MaterializeSubscriber=function(t){function e(e){t.call(this,e)}return __extends(e,t),e.prototype._next=function(t){this.destination.next(Notification_1.Notification.createNext(t))},e.prototype._error=function(t){var e=this.destination;e.next(Notification_1.Notification.createError(t)),e.complete()},e.prototype._complete=function(){var t=this.destination;t.next(Notification_1.Notification.createComplete()),t.complete()},e}(Subscriber_1.Subscriber);
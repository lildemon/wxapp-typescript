"use strict";function take(t){return 0===t?new EmptyObservable_1.EmptyObservable:this.lift(new TakeOperator(t))}var __extends=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},Subscriber_1=require("../Subscriber"),ArgumentOutOfRangeError_1=require("../util/ArgumentOutOfRangeError"),EmptyObservable_1=require("../observable/EmptyObservable");exports.take=take;var TakeOperator=function(){function t(t){if(this.total=t,this.total<0)throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError}return t.prototype.call=function(t,e){return e.subscribe(new TakeSubscriber(t,this.total))},t}(),TakeSubscriber=function(t){function e(e,r){t.call(this,e),this.total=r,this.count=0}return __extends(e,t),e.prototype._next=function(t){var e=this.total,r=++this.count;r<=e&&(this.destination.next(t),r===e&&(this.destination.complete(),this.unsubscribe()))},e}(Subscriber_1.Subscriber);
"use strict";function debounceTime(e,t){return void 0===t&&(t=async_1.async),this.lift(new DebounceTimeOperator(e,t))}function dispatchNext(e){e.debouncedNext()}var __extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)},Subscriber_1=require("../Subscriber"),async_1=require("../scheduler/async");exports.debounceTime=debounceTime;var DebounceTimeOperator=function(){function e(e,t){this.dueTime=e,this.scheduler=t}return e.prototype.call=function(e,t){return t.subscribe(new DebounceTimeSubscriber(e,this.dueTime,this.scheduler))},e}(),DebounceTimeSubscriber=function(e){function t(t,i,n){e.call(this,t),this.dueTime=i,this.scheduler=n,this.debouncedSubscription=null,this.lastValue=null,this.hasValue=!1}return __extends(t,e),t.prototype._next=function(e){this.clearDebounce(),this.lastValue=e,this.hasValue=!0,this.add(this.debouncedSubscription=this.scheduler.schedule(dispatchNext,this.dueTime,this))},t.prototype._complete=function(){this.debouncedNext(),this.destination.complete()},t.prototype.debouncedNext=function(){this.clearDebounce(),this.hasValue&&(this.destination.next(this.lastValue),this.lastValue=null,this.hasValue=!1)},t.prototype.clearDebounce=function(){var e=this.debouncedSubscription;null!==e&&(this.remove(e),e.unsubscribe(),this.debouncedSubscription=null)},t}(Subscriber_1.Subscriber);
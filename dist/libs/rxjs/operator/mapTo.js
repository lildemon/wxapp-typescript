"use strict";function mapTo(t){return this.lift(new MapToOperator(t))}var __extends=this&&this.__extends||function(t,r){function e(){this.constructor=t}for(var n in r)r.hasOwnProperty(n)&&(t[n]=r[n]);t.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)},Subscriber_1=require("../Subscriber");exports.mapTo=mapTo;var MapToOperator=function(){function t(t){this.value=t}return t.prototype.call=function(t,r){return r.subscribe(new MapToSubscriber(t,this.value))},t}(),MapToSubscriber=function(t){function r(r,e){t.call(this,r),this.value=e}return __extends(r,t),r.prototype._next=function(t){this.destination.next(this.value)},r}(Subscriber_1.Subscriber);
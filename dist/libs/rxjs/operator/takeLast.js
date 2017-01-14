"use strict";function takeLast(t){return 0===t?new EmptyObservable_1.EmptyObservable:this.lift(new TakeLastOperator(t))}var __extends=this&&this.__extends||function(t,r){function e(){this.constructor=t}for(var n in r)r.hasOwnProperty(n)&&(t[n]=r[n]);t.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)},Subscriber_1=require("../Subscriber"),ArgumentOutOfRangeError_1=require("../util/ArgumentOutOfRangeError"),EmptyObservable_1=require("../observable/EmptyObservable");exports.takeLast=takeLast;var TakeLastOperator=function(){function t(t){if(this.total=t,this.total<0)throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError}return t.prototype.call=function(t,r){return r.subscribe(new TakeLastSubscriber(t,this.total))},t}(),TakeLastSubscriber=function(t){function r(r,e){t.call(this,r),this.total=e,this.ring=new Array,this.count=0}return __extends(r,t),r.prototype._next=function(t){var r=this.ring,e=this.total,n=this.count++;if(r.length<e)r.push(t);else{var i=n%e;r[i]=t}},r.prototype._complete=function(){var t=this.destination,r=this.count;if(r>0)for(var e=this.count>=this.total?this.total:this.count,n=this.ring,i=0;i<e;i++){var s=r++%e;t.next(n[s])}t.complete()},r}(Subscriber_1.Subscriber);
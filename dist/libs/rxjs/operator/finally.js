"use strict";function _finally(r){return this.lift(new FinallyOperator(r))}var __extends=this&&this.__extends||function(r,t){function i(){this.constructor=r}for(var n in t)t.hasOwnProperty(n)&&(r[n]=t[n]);r.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)},Subscriber_1=require("../Subscriber"),Subscription_1=require("../Subscription");exports._finally=_finally;var FinallyOperator=function(){function r(r){this.callback=r}return r.prototype.call=function(r,t){return t.subscribe(new FinallySubscriber(r,this.callback))},r}(),FinallySubscriber=function(r){function t(t,i){r.call(this,t),this.add(new Subscription_1.Subscription(i))}return __extends(t,r),t}(Subscriber_1.Subscriber);
"use strict";var __extends=this&&this.__extends||function(e,r){function t(){this.constructor=e}for(var i in r)r.hasOwnProperty(i)&&(e[i]=r[i]);e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)},Observable_1=require("../Observable"),Notification_1=require("../Notification"),ColdObservable_1=require("./ColdObservable"),HotObservable_1=require("./HotObservable"),SubscriptionLog_1=require("./SubscriptionLog"),VirtualTimeScheduler_1=require("../scheduler/VirtualTimeScheduler"),defaultMaxFrame=750,TestScheduler=function(e){function r(r){e.call(this,VirtualTimeScheduler_1.VirtualAction,defaultMaxFrame),this.assertDeepEqual=r,this.hotObservables=[],this.coldObservables=[],this.flushTests=[]}return __extends(r,e),r.prototype.createTime=function(e){var t=e.indexOf("|");if(t===-1)throw new Error('marble diagram for time should have a completion marker "|"');return t*r.frameTimeFactor},r.prototype.createColdObservable=function(e,t,i){if(e.indexOf("^")!==-1)throw new Error('cold observable cannot have subscription offset "^"');if(e.indexOf("!")!==-1)throw new Error('cold observable cannot have unsubscription marker "!"');var a=r.parseMarbles(e,t,i),o=new ColdObservable_1.ColdObservable(a,this);return this.coldObservables.push(o),o},r.prototype.createHotObservable=function(e,t,i){if(e.indexOf("!")!==-1)throw new Error('hot observable cannot have unsubscription marker "!"');var a=r.parseMarbles(e,t,i),o=new HotObservable_1.HotObservable(a,this);return this.hotObservables.push(o),o},r.prototype.materializeInnerObservable=function(e,r){var t=this,i=[];return e.subscribe(function(e){i.push({frame:t.frame-r,notification:Notification_1.Notification.createNext(e)})},function(e){i.push({frame:t.frame-r,notification:Notification_1.Notification.createError(e)})},function(){i.push({frame:t.frame-r,notification:Notification_1.Notification.createComplete()})}),i},r.prototype.expectObservable=function(e,t){var i=this;void 0===t&&(t=null);var a,o=[],n={actual:o,ready:!1},s=r.parseMarblesAsSubscriptions(t).unsubscribedFrame;return this.schedule(function(){a=e.subscribe(function(e){var r=e;e instanceof Observable_1.Observable&&(r=i.materializeInnerObservable(r,i.frame)),o.push({frame:i.frame,notification:Notification_1.Notification.createNext(r)})},function(e){o.push({frame:i.frame,notification:Notification_1.Notification.createError(e)})},function(){o.push({frame:i.frame,notification:Notification_1.Notification.createComplete()})})},0),s!==Number.POSITIVE_INFINITY&&this.schedule(function(){return a.unsubscribe()},s),this.flushTests.push(n),{toBe:function(e,t,i){n.ready=!0,n.expected=r.parseMarbles(e,t,i,!0)}}},r.prototype.expectSubscriptions=function(e){var t={actual:e,ready:!1};return this.flushTests.push(t),{toBe:function(e){var i="string"==typeof e?[e]:e;t.ready=!0,t.expected=i.map(function(e){return r.parseMarblesAsSubscriptions(e)})}}},r.prototype.flush=function(){for(var r=this.hotObservables;r.length>0;)r.shift().setup();e.prototype.flush.call(this);for(var t=this.flushTests.filter(function(e){return e.ready});t.length>0;){var i=t.shift();this.assertDeepEqual(i.actual,i.expected)}},r.parseMarblesAsSubscriptions=function(e){if("string"!=typeof e)return new SubscriptionLog_1.SubscriptionLog(Number.POSITIVE_INFINITY);for(var r=e.length,t=-1,i=Number.POSITIVE_INFINITY,a=Number.POSITIVE_INFINITY,o=0;o<r;o++){var n=o*this.frameTimeFactor,s=e[o];switch(s){case"-":case" ":break;case"(":t=n;break;case")":t=-1;break;case"^":if(i!==Number.POSITIVE_INFINITY)throw new Error("found a second subscription point '^' in a subscription marble diagram. There can only be one.");i=t>-1?t:n;break;case"!":if(a!==Number.POSITIVE_INFINITY)throw new Error("found a second subscription point '^' in a subscription marble diagram. There can only be one.");a=t>-1?t:n;break;default:throw new Error("there can only be '^' and '!' markers in a subscription marble diagram. Found instead '"+s+"'.")}}return a<0?new SubscriptionLog_1.SubscriptionLog(i):new SubscriptionLog_1.SubscriptionLog(i,a)},r.parseMarbles=function(e,r,t,i){if(void 0===i&&(i=!1),e.indexOf("!")!==-1)throw new Error('conventional marble diagrams cannot have the unsubscription marker "!"');for(var a=e.length,o=[],n=e.indexOf("^"),s=n===-1?0:n*-this.frameTimeFactor,c="object"!=typeof r?function(e){return e}:function(e){return i&&r[e]instanceof ColdObservable_1.ColdObservable?r[e].messages:r[e]},u=-1,b=0;b<a;b++){var f=b*this.frameTimeFactor+s,l=void 0,h=e[b];switch(h){case"-":case" ":break;case"(":u=f;break;case")":u=-1;break;case"|":l=Notification_1.Notification.createComplete();break;case"^":break;case"#":l=Notification_1.Notification.createError(t||"error");break;default:l=Notification_1.Notification.createNext(c(h))}l&&o.push({frame:u>-1?u:f,notification:l})}return o},r}(VirtualTimeScheduler_1.VirtualTimeScheduler);exports.TestScheduler=TestScheduler;
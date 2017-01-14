"use strict";function windowTime(i,n,e){return void 0===n&&(n=null),void 0===e&&(e=async_1.async),this.lift(new WindowTimeOperator(i,n,e))}function dispatchWindowTimeSpanOnly(i){var n=i.subscriber,e=i.windowTimeSpan,t=i.window;t&&t.complete(),i.window=n.openWindow(),this.schedule(i,e)}function dispatchWindowCreation(i){var n=i.windowTimeSpan,e=i.subscriber,t=i.scheduler,o=i.windowCreationInterval,s=e.openWindow(),r=this,c={action:r,subscription:null},d={subscriber:e,window:s,context:c};c.subscription=t.schedule(dispatchWindowClose,n,d),r.add(c.subscription),r.schedule(i,o)}function dispatchWindowClose(i){var n=i.subscriber,e=i.window,t=i.context;t&&t.action&&t.subscription&&t.action.remove(t.subscription),n.closeWindow(e)}var __extends=this&&this.__extends||function(i,n){function e(){this.constructor=i}for(var t in n)n.hasOwnProperty(t)&&(i[t]=n[t]);i.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)},Subject_1=require("../Subject"),async_1=require("../scheduler/async"),Subscriber_1=require("../Subscriber");exports.windowTime=windowTime;var WindowTimeOperator=function(){function i(i,n,e){this.windowTimeSpan=i,this.windowCreationInterval=n,this.scheduler=e}return i.prototype.call=function(i,n){return n.subscribe(new WindowTimeSubscriber(i,this.windowTimeSpan,this.windowCreationInterval,this.scheduler))},i}(),WindowTimeSubscriber=function(i){function n(n,e,t,o){if(i.call(this,n),this.destination=n,this.windowTimeSpan=e,this.windowCreationInterval=t,this.scheduler=o,this.windows=[],null!==t&&t>=0){var s=this.openWindow(),r={subscriber:this,window:s,context:null},c={windowTimeSpan:e,windowCreationInterval:t,subscriber:this,scheduler:o};this.add(o.schedule(dispatchWindowClose,e,r)),this.add(o.schedule(dispatchWindowCreation,t,c))}else{var d=this.openWindow(),w={subscriber:this,window:d,windowTimeSpan:e};this.add(o.schedule(dispatchWindowTimeSpanOnly,e,w))}}return __extends(n,i),n.prototype._next=function(i){for(var n=this.windows,e=n.length,t=0;t<e;t++){var o=n[t];o.closed||o.next(i)}},n.prototype._error=function(i){for(var n=this.windows;n.length>0;)n.shift().error(i);this.destination.error(i)},n.prototype._complete=function(){for(var i=this.windows;i.length>0;){var n=i.shift();n.closed||n.complete()}this.destination.complete()},n.prototype.openWindow=function(){var i=new Subject_1.Subject;this.windows.push(i);var n=this.destination;return n.next(i),i},n.prototype.closeWindow=function(i){i.complete();var n=this.windows;n.splice(n.indexOf(i),1)},n}(Subscriber_1.Subscriber);
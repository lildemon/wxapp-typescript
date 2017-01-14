"use strict";var __extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)},Scheduler_1=require("../Scheduler"),AsyncScheduler=function(e){function t(){e.apply(this,arguments),this.actions=[],this.active=!1,this.scheduled=void 0}return __extends(t,e),t.prototype.flush=function(e){var t=this.actions;if(this.active)return void t.push(e);var i;this.active=!0;do if(i=e.execute(e.state,e.delay))break;while(e=t.shift());if(this.active=!1,i){for(;e=t.shift();)e.unsubscribe();throw i}},t}(Scheduler_1.Scheduler);exports.AsyncScheduler=AsyncScheduler;
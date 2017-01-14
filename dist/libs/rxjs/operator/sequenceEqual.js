"use strict";function sequenceEqual(e,t){return this.lift(new SequenceEqualOperator(e,t))}var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},Subscriber_1=require("../Subscriber"),tryCatch_1=require("../util/tryCatch"),errorObject_1=require("../util/errorObject");exports.sequenceEqual=sequenceEqual;var SequenceEqualOperator=function(){function e(e,t){this.compareTo=e,this.comparor=t}return e.prototype.call=function(e,t){return t.subscribe(new SequenceEqualSubscriber(e,this.compareTo,this.comparor))},e}();exports.SequenceEqualOperator=SequenceEqualOperator;var SequenceEqualSubscriber=function(e){function t(t,r,o){e.call(this,t),this.compareTo=r,this.comparor=o,this._a=[],this._b=[],this._oneComplete=!1,this.add(r.subscribe(new SequenceEqualCompareToSubscriber(t,this)))}return __extends(t,e),t.prototype._next=function(e){this._oneComplete&&0===this._b.length?this.emit(!1):(this._a.push(e),this.checkValues())},t.prototype._complete=function(){this._oneComplete?this.emit(0===this._a.length&&0===this._b.length):this._oneComplete=!0},t.prototype.checkValues=function(){for(var e=this,t=e._a,r=e._b,o=e.comparor;t.length>0&&r.length>0;){var i=t.shift(),n=r.shift(),c=!1;o?(c=tryCatch_1.tryCatch(o)(i,n),c===errorObject_1.errorObject&&this.destination.error(errorObject_1.errorObject.e)):c=i===n,c||this.emit(!1)}},t.prototype.emit=function(e){var t=this.destination;t.next(e),t.complete()},t.prototype.nextB=function(e){this._oneComplete&&0===this._a.length?this.emit(!1):(this._b.push(e),this.checkValues())},t}(Subscriber_1.Subscriber);exports.SequenceEqualSubscriber=SequenceEqualSubscriber;var SequenceEqualCompareToSubscriber=function(e){function t(t,r){e.call(this,t),this.parent=r}return __extends(t,e),t.prototype._next=function(e){this.parent.nextB(e)},t.prototype._error=function(e){this.parent.error(e)},t.prototype._complete=function(){this.parent._complete()},t}(Subscriber_1.Subscriber);
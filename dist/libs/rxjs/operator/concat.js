"use strict";function concat(){for(var e=[],r=0;r<arguments.length;r++)e[r-0]=arguments[r];return this.lift.call(concatStatic.apply(void 0,[this].concat(e)))}function concatStatic(){for(var e=[],r=0;r<arguments.length;r++)e[r-0]=arguments[r];var t=null,l=e;return isScheduler_1.isScheduler(l[e.length-1])&&(t=l.pop()),null===t&&1===e.length?e[0]:new ArrayObservable_1.ArrayObservable(e,t).lift(new mergeAll_1.MergeAllOperator(1))}var isScheduler_1=require("../util/isScheduler"),ArrayObservable_1=require("../observable/ArrayObservable"),mergeAll_1=require("./mergeAll");exports.concat=concat,exports.concatStatic=concatStatic;
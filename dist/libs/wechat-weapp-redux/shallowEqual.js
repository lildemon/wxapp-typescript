"use strict";function shallowEqual(e,t){if(e===t)return!0;var r=Object.keys(e),l=Object.keys(t);if(r.length!==l.length)return!1;for(var n=Object.prototype.hasOwnProperty,o=0;o<r.length;o++)if(!n.call(t,r[o])||e[r[o]]!==t[r[o]])return!1;return!0}module.exports=shallowEqual;
"use strict";function publishBehavior(e){return multicast_1.multicast.call(this,new BehaviorSubject_1.BehaviorSubject(e))}var BehaviorSubject_1=require("../BehaviorSubject"),multicast_1=require("./multicast");exports.publishBehavior=publishBehavior;
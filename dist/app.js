!function(e){var n={};function r(o){if(n[o])return n[o].exports;var t=n[o]={i:o,l:!1,exports:{}};return e[o].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=e,r.c=n,r.d=function(e,n,o){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)r.d(o,t,function(n){return e[n]}.bind(null,t));return o},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=3)}([function(e,n){e.exports=require("mongoose")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("express")},function(e,n,r){"use strict";r.r(n);var o=r(2),t=r.n(o),s=r(1),a=r.n(s),u=r(0),i=r.n(u);const c=new i.a.Schema({name:String,password:String});var l=i.a.model("user",c);const d=t()();d.use(a.a.urlencoded({extended:!1})),d.use(a.a.json()),d.use((e,n,r)=>{console.log("req: ",e),console.log("Time: %d",Date.now()),r()});const f=(()=>{i.a.connect("mongodb://127.0.0.1:27017",{useUnifiedTopology:!0,useNewUrlParser:!0}).catch(e=>{console.log("error: ",e)});const e=i.a.connection;return e.on("error",console.error.bind(console,"connection error:")),e})();d.post("/register",async(e,n)=>{const{username:r,password:o}=e.body;if(!r||!o)return void n.status(400).send({error:"Username or password missing"});await l.findOne({name:r})?n.status(409).send({error:"Username already exists."}):(await(async({username:e,password:n})=>{const r=new l({name:e,password:n});return await r.save()})({db:f,username:r,password:o}),n.status(200).send({success:"All good"}))}),d.listen(3e3),console.log("The app is listening on port 3000")}]);
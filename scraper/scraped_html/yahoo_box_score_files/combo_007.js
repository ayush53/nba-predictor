
/* rapid-tracking.js 1733423 */ YUI.add("media-rapid-tracking",function(b){var f="rapid-tracker:",i=f+"click",h=f+"event",g=f+"reinit",e=f+"destroy-instance";var d;var a=null;function c(j){c.superclass.constructor.apply(this,arguments)}c.NAME="RapidTracking";c.ATTRS={};b.extend(c,b.Base,{config:null,rapidConfig:null,_globalEvents:{},moduleQueue:null,beaconQueue:[],initializer:function(k){var j=this;a=a||k.instance||null;j.moduleQueue=j.moduleQueue||k.moduleQueue||[];j.config=j.config||k.config||{};j.rapidConfig=j.rapidConfig||k.rapidConfig||{};j._initEventListeners();j._initPublish();if(a){j._processQueue()}},initRapid:function(){var j=this;j._initRapid();j._processQueue()},_initRapid:function(k){var j=this;if(a&&!k){return}if(a){a.destroy()}j.updateRequestAttributes();j.rapidConfig.tracked_mods=j._getTrackedMods();if(typeof YAHOO.i13n.Rapid!=="undefined"){a=new YAHOO.i13n.Rapid(j.rapidConfig);if(YAHOO&&YAHOO.i13n){YAHOO.i13n.currentSID=j.getCurrentSID()}}else{b.log("Could not create rapid instance","error",j.name)}},getCurrentSID:function(j){return(a&&a.getCurrentSID)?a.getCurrentSID():null},_getTrackedMods:function(){var j=this,l=j.rapidConfig&&j.rapidConfig.tracked_mods||[],k=[];if(b.Lang.isArray(l)){k=j._getModulesArrayFromQueue(true);l=k.concat(l);l=b.Array.dedupe(l)}return l},_initPublish:function(){b.publish("rapid:init",{fireOnce:true}).fire()},_initEventListeners:function(){var j=this;if(!j._globalEvents[i]){b.Global.on(i,j._handleBeaconing,j,"click");j._globalEvents[i]=true}if(!j._globalEvents[h]){b.Global.on(h,j._handleBeaconing,j,"event");j._globalEvents[h]=true}if(!j._globalEvents[g]){b.Global.on(g,j._handleReInit,j);j._globalEvents[g]=true}if(!j._globalEvents[e]){b.Global.on(e,j._handleDestroyInstance,j);j._globalEvents[e]=true}},updateRequestAttributes:function(){var j=this;if(window.YMEDIA_REQ_ATTR&&typeof YMEDIA_REQ_ATTR.instr==="object"){j.rapidConfig.keys=j.rapidConfig.keys||{};j.rapidConfig.keys.authfb=YMEDIA_REQ_ATTR.instr.authfb;j.rapidConfig.keys.rid=YMEDIA_REQ_ATTR.instr.request_id}},addModules:function(j,m,l){var k=this;if(a){a.addModules(j,m,l)}else{k._addModulesQueue(j);b.log("No rapid instance available for adding modules ... adding module id ["+j+"] to queue.","info",this.name)}},refreshModule:function(n,m,l,k){var j=this;if(a){a.refreshModule(n,m,l,k)}else{b.log("No rapid instance available for refreshing module #"+n+" ... initialize RapidTracking first.","error",this.name)}},refreshModuleAsRichView:function(k,j){if(a){if(b.Lang.isFunction(a.refreshModuleAsRichView)){a.refreshModuleAsRichView(k,j)}else{this.refreshModule(k)}}else{b.log("No rapid instance available for refreshing module #"+k+" as rich view... initialize RapidTracking first.","error",this.name)}},removeModule:function(k){var j=this;if(a){a.removeModule(k)}else{b.log("No rapid instance available for removing module #"+k+" ... initialize RapidTracking first.","error",this.name)}},isModuleTracked:function(k){var j=this;if(a){return a.isModuleTracked(k)}else{b.log("No rapid instance available for checking if module #"+k+" exists ... initialize RapidTracking first.","info",this.name)}},beaconPageview:function(k){var j=this;if(a){a.beaconPageview(k)}else{b.log("No rapid instance available for beaconing pageview","error",this.name)}},beaconClick:function(l,j,p,n,m){var k=this,o={};o.sec=l||"";o.linkname=j||"";o.pos=p&&typeof p==="number"?p:0;o.keys=typeof n==="object"?n:{};o.outcome=m||"";if(!o.sec){b.log("beaconClick called with insufficient data","error",this.name);return}if(!a){k._addBeaconQueue(o,"click");b.log("No rapid instance available for beaconing ... adding beacon click to queue.","info",this.name);return}if(o.outcome){a.beaconClick(o.sec,o.linkname,o.pos,o.keys,o.outcome)}else{a.beaconClick(o.sec,o.linkname,o.pos,o.keys)}b.log("beaconClick "+o.linkname,"info",this.name);b.log(o)},beaconEvent:function(k){var j=this;if(arguments.length>1){k={name:arguments[0],keys:arguments[1]};if(arguments.length>2&&arguments[2]){k.outcome=arguments[2]}}if(!a){j._addBeaconQueue(k,"event");b.log("No rapid instance available for beaconing ... adding beacon event to queue.","info",this.name);return}if(!k.name||!k.keys){b.log("beaconEvent called with insufficient data","error",this.name);return}k.keys=typeof k.keys==="object"?k.keys:{};if(k.outcome){a.beaconEvent(k.name,k.keys,k.outcome)}else{a.beaconEvent(k.name,k.keys)}b.log("beaconEvent "+k.name,"info",this.name);b.log(k)},updateConfig:function(j){if(a){a.reInit(j)}},_addModulesQueue:function(j){var k=this;if(j){k.moduleQueue.push(j)}},_addBeaconQueue:function(l,k){var j=this;j.beaconQueue.push({data:l,type:k})},_processQueue:function(){var j=this,m=j.beaconQueue.length,o,k,n=[],l;if(!a){b.log("No rapid instance available for queue processing ... initialize RapidTracking first.","error",j.name);return}n=j._getModulesArrayFromQueue(true);if(n.length>0){j.addModules(n)}o=j.moduleQueue.length;for(l=0;l<o;l++){if(typeof j.moduleQueue[l]==="object"){k=b.merge(k,j.moduleQueue[l])}}if(k){j.addModules(k)}for(l=0;l<m;l++){j._handleBeaconing(j.beaconQueue[l].data,j.beaconQueue[l].type)}j.moduleQueue=[];j.beaconQueue=[]},_getModulesArrayFromQueue:function(n){var k=this,o=k.moduleQueue.length,m=[],j=[],l;for(l=0;l<o;l++){if(b.Lang.isArray(k.moduleQueue[l])){m=m.concat(k.moduleQueue[l])}else{if(typeof k.moduleQueue[l]==="object"&&n){j.push(k.moduleQueue[l])}else{m.push(k.moduleQueue[l])}}}if(m.length>0&&n){k.moduleQueue=j}return m},_handleBeaconing:function(m,k){var j=this,l=m&&typeof m.data==="object"?m.data:null,n=m.mod_id?m.mod_id:"";if(!a){b.log("No rapid instance available.  Adding beacon["+k+"] to queue.","info",j.name);j._addBeaconQueue(m,k);return}if(!l){b.log("received no data for beaconing from #"+n,"warn",j.name);return}l.keys=j._addMpos(l.keys,n);if(k==="click"){j.beaconClick(l.sec,l.linkname,l.pos,l.keys,l.outcome)}else{j.beaconEvent(l)}},_handleDestroyInstance:function(){var j=this;if(a){j.rapidConfig={};a.destroy();a=null}else{b.log("No rapid instance available to destroy","error",this.name)}},_handleReInit:function(k){var j=this,l=true;j.rapidConfig=k;j._initRapid(l)},_addMpos:function(n,o){var k=this,l=k.config.selectors,m,j;if(!o||!n||n.mpos){return n}d=d||b.one(l.bd);m=d&&d.all(l.mods);j=o&&m?m.indexOf(b.one("#"+o))+1:0;if(typeof n==="object"){n.mpos=j}else{n={mpos:j}}return n}});b.namespace("Media").RapidTracking=c},"0.1",{requires:["event-custom","base","node"]});/*
YUI 3.14.0 (build a01e97d)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("base-pluginhost",function(e,t){var n=e.Base,r=e.Plugin.Host;e.mix(n,r,!1,null,1),n.plug=r.plug,n.unplug=r.unplug},"3.14.0",{requires:["base-base","pluginhost"]});
/*
YUI 3.14.0 (build a01e97d)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("base-build",function(e,t){function f(e,t,n){n[e]&&(t[e]=(t[e]||[]).concat(n[e]))}function l(e,t,n){n._ATTR_CFG&&(t._ATTR_CFG_HASH=null,f.apply(null,arguments))}function c(e,t,r){n.modifyAttrs(t,r.ATTRS)}var n=e.BaseCore,r=e.Base,i=e.Lang,s="initializer",o="destructor",u=["_PLUG","_UNPLUG"],a;r._build=function(t,n,i,u,a,f){var l=r._build,c=l._ctor(n,f),h=l._cfg(n,f,i),p=l._mixCust,d=c._yuibuild.dynamic,v,m,g,y,b,w;for(v=0,m=i.length;v<m;v++)g=i[v],y=g.prototype,b=y[s],w=y[o],delete y[s],delete y[o],e.mix(c,g,!0,null,1),p(c,g,h),b&&(y[s]=b),w&&(y[o]=w),c._yuibuild.exts.push(g);return u&&e.mix(c.prototype,u,!0),a&&(e.mix(c,l._clean(a,h),!0),p(c,a,h)),c.prototype.hasImpl=l._impl,d&&(c.NAME=t,c.prototype.constructor=c,c.modifyAttrs=n.modifyAttrs),c},a=r._build,e.mix(a,{_mixCust:function(t,n,r){var s,o,u,a,f,l;r&&(s=r.aggregates,o=r.custom,u=r.statics),u&&e.mix(t,n,!0,u);if(s)for(l=0,f=s.length;l<f;l++)a=s[l],!t.hasOwnProperty(a)&&n.hasOwnProperty(a)&&(t[a]=i.isArray(n[a])?[]:{}),e.aggregate(t,n,!0,[a]);if(o)for(l in o)o.hasOwnProperty(l)&&o[l](l,t,n)},_tmpl:function(t){function n(){n.superclass.constructor.apply(this,arguments)}return e.extend(n,t),n},_impl:function(e){var t=this._getClasses(),n,r,i,s,o,u;for(n=0,r=t.length;n<r;n++){i=t[n];if(i._yuibuild){s=i._yuibuild.exts,o=s.length;for(u=0;u<o;u++)if(s[u]===e)return!0}}return!1},_ctor:function(e,t){var n=t&&!1===t.dynamic?!1:!0,r=n?a._tmpl(e):e,i=r._yuibuild;return i||(i=r._yuibuild={}),i.id=i.id||null,i.exts=i.exts||[],i.dynamic=n,r},_cfg:function(t,n,r){var i=[],s={},o=[],u,a=n&&n.aggregates,f=n&&n.custom,l=n&&n.statics,c=t,h,p;while(c&&c.prototype)u=c._buildCfg,u&&(u.aggregates&&(i=i.concat(u.aggregates)),u.custom&&e.mix(s,u.custom,!0),u.statics&&(o=o.concat(u.statics))),c=c.superclass?c.superclass.constructor:null;if(r)for(h=0,p=r.length;h<p;h++)c=r[h],u=c._buildCfg,u&&(u.aggregates&&(i=i.concat(u.aggregates)),u.custom&&e.mix(s,u.custom,!0),u.statics&&(o=o.concat(u.statics)));return a&&(i=i.concat(a)),f&&e.mix(s,n.cfgBuild,!0),l&&(o=o.concat(l)),{aggregates:i,custom:s,statics:o}},_clean:function(t,n){var r,i,s,o=e.merge(t),u=n.aggregates,a=n.custom;for(r in a)o.hasOwnProperty(r)&&delete o[r];for(i=0,s=u.length;i<s;i++)r=u[i],o.hasOwnProperty(r)&&delete o[r];return o}}),r.build=function(e,t,n,r){return a(e,t,n,null,null,r)},r.create=function(e,t,n,r,i){return a(e,t,n,r,i)},r.mix=function(e,t){return e._CACHED_CLASS_DATA&&(e._CACHED_CLASS_DATA=null),a(null,e,t,null,null,{dynamic:!1})},n._buildCfg={aggregates:u.concat(),custom:{ATTRS:c,_ATTR_CFG:l,_NON_ATTRS_CFG:f}},r._buildCfg={aggregates:u.concat(),custom:{ATTRS:c,_ATTR_CFG:l,_NON_ATTRS_CFG:f}}},"3.14.0",{requires:["base-base"]});

/* header-uh3-desktop.js 1761458 */ YUI.add("media-header-uh3-desktop",function(a){a.namespace("Media");a.Media.HeaderUH3=function(c){var k=arguments;var f=false,m,n=[],l=[],i=null,g="#yog-nw",e="#yog-content";var d=k[1]?k[1]:{};if(d&&d.version==="v2sg"){g="#Navigation";e="#Main"}d.autoSetup=typeof d.autoSetup!=="undefined"?d.autoSetup:true;d.event=typeof d.event!=="undefined"?d.event:"available";d.waitForSelector=typeof d.waitForSelector!=="undefined"?d.waitForSelector:e;d.searchSelector=typeof d.searchSelector!=="undefined"?d.searchSelector:"#yucs-search";d.yogContentSelector=typeof d.yogContentSelector!=="undefined"?d.yogContentSelector:e;d.yogNavSelector=typeof d.yobNavSelector!=="undefined"?d.yogNavSelector:g;d.navMinWidth=35;d.navMaxWidth=160;d.breakPoint=1220;i=c.one("#yucsHead");function b(){if(d.autoSetup===true){c.on(d.event,function(o){j.setup()},d.waitForSelector)}}var h=function(){l[d.searchSelector]=c.one(d.searchSelector);l[d.yogContentSelector]=c.one(d.yogContentSelector);l[d.yogNavSelector]=c.one(d.yogNavSelector);if(l[d.searchSelector]&&l[d.yogContentSelector]){l[d.searchSelector].detach();var p;var o=function(){var r=function(){var v=c.one("window").get("viewportRegion"),x=l[d.yogNavSelector].get("offsetWidth"),u=(v.width<d.breakPoint||x<d.navMaxWidth)&&c.one("body").hasClass("yog-type-content")?d.navMaxWidth-d.navMinWidth:0,s=l[d.yogContentSelector].get("offsetWidth")-u+"px";if(s!=p){l[d.searchSelector].setAttribute("style","width:"+s+" !important;max-width:"+s+" !important;")}p=s;if(i){var t=v.width+"px "+v.height+"px";i.setStyle("backgroundSize",t)}clearTimeout(q)};var q=setTimeout(r,10)};n["uhsearch:load"]=c.on("load",o);n["uhsearch:resize"]=c.on("resize",o);n["uhsearch:layer-manager:loaded"]=c.Global.on("layer-manager:loaded",o);n["uhsearch:content:reveal"]=c.Global.on("content:reveal",o);n["uhsearch:ads:leaderboard:reflow"]=c.Global.on("ads:leaderboard:reflow",o);n["uhsearch:ads:billboard:reflow"]=c.Global.on("ads:billboard:reflow",o);n["uhsearch:ads:leaderboard:reflow"]=c.Global.on("ads:leaderboard:reflow",o);o()}};var j={setup:function(){if(f===false){h();f=true}}};b();return j}},"1.0.0",{requires:["node-base","event-custom"]});/*
YUI 3.14.0 (build a01e97d)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("intl",function(e,t){var n={},r="yuiRootLang",i="yuiActiveLang",s=[];e.mix(e.namespace("Intl"),{_mod:function(e){return n[e]||(n[e]={}),n[e]},setLang:function(e,t){var n=this._mod(e),s=n[i],o=!!n[t];return o&&t!==s&&(n[i]=t,this.fire("intl:langChange",{module:e,prevVal:s,newVal:t===r?"":t})),o},getLang:function(e){var t=this._mod(e)[i];return t===r?"":t},add:function(e,t,n){t=t||r,this._mod(e)[t]=n,this.setLang(e,t)},get:function(t,n,r){var s=this._mod(t),o;return r=r||s[i],o=s[r]||{},n?o[n]:e.merge(o)},getAvailableLangs:function(t){var n=e.Env._loader,r=n&&n.moduleInfo[t],i=r&&r.lang;return i?i.concat():s}}),e.augment(e.Intl,e.EventTarget),e.Intl.publish("intl:langChange",{emitFacade:!0})},"3.14.0",{requires:["intl-base","event-custom"]});

/* pt.js 1330214 */ (function(){var d={base:{}},f={base:{}},c={timeout:3000,path:"/__perf/b.gif?",host:"",console:false,logOnly:false},e=[],j=[],b=0,m;function a(){var n,z,t,C,v,s,x,w=0,p="",u="",B=f.base,o=B.site||"",y=B.region||"",A=B.colo||"",r=B.device||"";while(e.length>0){C=[];v=[];mod=e.shift();n=d[mod];z=f[mod];if(!n){continue}for(t in n){s=l(mod,t);if(s!==null){C.push(t+"|"+(n[t].end-s))}}for(t in z){v.push(t+"|"+z[t])}if(c.console){u+=k(mod,C,v)}else{p+="&m"+w+"="+mod+"&t"+w+"="+C.join(",")+"&d"+w+"="+v.join(",")}delete d[mod];w++}if(c.console){h(u)}else{p+="&n="+w+"&s="+o+"&r="+y+"&d="+r+"&c="+A;x=new Image();x.id="perfbeacon"+b++;j[x.id]=x;x.onload=x.onerror=function(){delete j[this.id]};if(c.logOnly){c.path="/__perf_log_only/b.gif";c.logOnly=false}else{c.path="/__perf/b.gif"}x.src=((c.host)?"http://":"")+c.host+c.path+p}m=null}function k(n,o,p){return"--------------------\nmodule: "+n+"\ntimers:\n"+o.join("\n")+"\n"+(p.length>0?("data:\n"+p.join("\n")+"\n"):"")}function h(n){try{console.log(n)}catch(o){}}function g(n){return((parseFloat(n)==parseInt(n))&&!isNaN(n))}function l(o,u){var t,s,n,p,v,r;try{s=d[o][u]||{};n=s.start||u;if(g(n)){t=n}else{p=n.split(".");v=p.pop();r=p[0]||o;t=l(r,v)}}catch(q){t=null}return t}window.MediaPerfTiming={startTimer:function(p,o,r){if(!p||!o){return this}var q=typeof r,n;if(q==="undefined"){r=new Date().getTime()}else{if(q==="string"){n=l(p,r);if(g(n)){r=n}}}if(!d[p]){d[p]={}}d[p][o]={start:r};return this},endTimer:function(o,n,p){if(!o||!n||!d[o]||!d[o][n]){return this}if(typeof(p)==="undefined"){p=new Date().getTime()}d[o][n].end=p;return this},cancelTimer:function(o,n){if(d[o]){delete d[o][n]}return this},record:function(o,p){if(o&&p){if(!f[o]){f[o]={}}for(var n in p){f[o][n]=p[n]}}return this},done:function(n){if(n&&d[n]){e.push(n);if(m){clearTimeout(m)}m=setTimeout(a,c.timeout)}return this},config:function(n){for(i in n){c[i]=n[i]}return this},getTimer:function(q,p){if(!q||!p||!d[q]||!d[q][p]){return this}var o=d[q][p],s=o.start,r=typeof s,n;if(r==="string"){n=l(q,s);if(g(n)){s=n;o.start=s}}return o}}})();
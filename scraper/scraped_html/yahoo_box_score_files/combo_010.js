
/* picks.js 1733453 */ YUI.add("media-picks",function(a){function b(){b.superclass.constructor.apply(this,arguments)}a.namespace("Sports.Picks");a.Sports.Picks=a.extend(b,a.Widget,{initializer:function(){var c=this.get("contentBox");c.delegate("click",this._showLoginOverlay,"li.login a",this);c.delegate("click",this._picksCallback,".ysp-picks-box a.yom-button",this)},_showLoginOverlay:function(f){if(f){f.halt()}var c=this.get("contentBox"),d=c.one(".signup");if(d){d.toggleClass("hidden")}},_picksCallback:function(g){g.halt();var f=g.currentTarget,d={game_id:f.getAttribute("data-gameid"),crumb:f.getAttribute("data-crumb"),pick:f.getAttribute("data-pick")},c="/_xhr/sports/picks/?"+a.QueryString.stringify(d);if(!this.get("logged_in")){this._showLoginOverlay()}else{if((!f.hasClass("selected"))){a.io(c,{context:this,on:{success:this._onSuccess},"arguments":{success:f}})}}},shareToFacebook:function(i){i.preventDefault();var g=this.get("facebook-data"),d,h,k,l,c,j=this.get("contentBox"),f=j.one(".ysp-picks-graph");if(f.one(".selected abbr")){d=f.one(".selected abbr").get("title");c=f.one(".home")?f.one(".home"):f.one(".selected");h=(c.hasClass("selected")&&c.hasClass("home"))?f.one(".away dt").get("title"):f.one(".home dt").get("title")}else{k=parseInt(f.one(".home .percent").get("text"),10);l=parseInt(f.one(".away .percent").get("text"),10);if(l>k){d=f.one(".away dt").get("title");h=f.one(".home dt").get("title")}else{d=f.one(".home dt").get("title");h=f.one(".away dt").get("title")}}g.attachment.name="I picked "+d+" over "+h;this.set("facebook-data",g);this._facebook.validateAndSend(this.get("facebook-data"))},_setGraphResults:function(d){var h=d.data,c=this.get("contentBox"),g=c.one(".ysp-picks-graph"),f=0,j=0,e,i;g.addClass("picked");if(h.picked_side==="away"){f=f+1}else{j=j+1}f=f+parseInt(g.one(".away .graph span").get("text"),10);j=j+parseInt(g.one(".home .graph span").get("text"),10);i=Math.round(100*j/(j+f));e=Math.round(100*f/(j+f));g.one(".away .graph span").set("innerHTML",f+" votes");g.one(".home .graph span").set("innerHTML",j+" votes");g.one(".away .percent").set("innerHTML",e+"%");g.one(".home .percent").set("innerHTML",i+"%");g.one(".away .graph span").setStyle("width",e+"%");g.one(".home .graph span").setStyle("width",i+"%")},_onSuccess:function(j,i,f){var h=f.success,c=h.ancestor("div"),d;try{d=a.JSON.parse(i.responseText);this._setGraphResults(d)}catch(g){a.log(g)}if(c&&c.one(".selected")){c.one(".selected").removeClass("selected")}h.addClass("selected")},_facebook:null},{NAME:"yom-picks",ATTRS:{"facebook-data":{value:{attachment:{name:"",description:"Pick the winner of this week&rsquo;s games and beat the Yahoo Sports experts",href:"",media:[{type:"image",src:"https://s.yimg.com/lq/i/us/sp/ysp-mod/boxscore/presented/yahoo2.jpg",href:""}]}}},logged_in:{value:false}}})},"3.0.0",{requires:["node-event-delegate","base","io-base","widget","json-parse","querystring-stringify-simple"]});
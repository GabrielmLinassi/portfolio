!function(e){"use strict";var s=function(){this.messages={},this.sources={}};s.prototype={load:function(s,t){var n,r,o=null,i=[],a=this;if("string"==typeof s)return e.i18n.log("Loading messages from: "+s),(n=s,r=e.Deferred(),e.getJSON(n).done(r.resolve).fail(function(s,t,o){e.i18n.log("Error in loading messages from "+n+" Exception: "+o),r.resolve()}),r.promise()).then(function(e){return a.load(e,t)});if(t)return a.set(t,s),e.Deferred().resolve();for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t=o,i.push(a.load(s[o],t)));return e.when.apply(e,i)},set:function(s,t){this.messages[s]?this.messages[s]=e.extend(this.messages[s],t):this.messages[s]=t},get:function(e,s){return this.messages[e]&&this.messages[e][s]}},e.extend(e.i18n.messageStore,new s)}(jQuery);
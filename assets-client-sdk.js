!function(e){var t={};function s(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=3)}([function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.INITIALIZE="assets.initialize",e.FETCH_RESPONSE="assets.fetch-response",e.UPDATE_CONTEXT="assets.update-context",e.LOGIN_COMPLETE="assets.login-complete"}(t.ResponseMessageType||(t.ResponseMessageType={})),function(e){e.INITIALIZE_OK="assets.initialize-ok",e.FETCH="assets.fetch",e.CANCEL_CHECKOUT="assets.cancel-checkout",e.CHECKIN="assets.checkin",e.CHECKOUT="assets.checkout",e.CLOSE="assets.close",e.LOGIN="assets.login",e.PIN_COLLECTIONS="assets.pin-collections",e.OPEN_COLLECTIONS="assets.open-collections",e.OPEN_ASSETS="assets.open-assets",e.OPEN_SEARCH="assets.open-search",e.OPEN_BROWSE="assets.open-browse"}(t.RequestMessageType||(t.RequestMessageType={}))},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))((function(i,r){function o(e){try{l(n.next(e))}catch(e){r(e)}}function a(e){try{l(n.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(o,a)}l((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const i=s(0);class r{constructor(e){this.serverUrl=e,this._listeners=[],this._subscribers=[],this.login=()=>this.wrapCommand(null,i.RequestMessageType.LOGIN,i.ResponseMessageType.LOGIN_COMPLETE),this.fetch=(e,t)=>{const s=this._context.app.serverUrl+e;return this.wrapCommand({url:s,options:t},i.RequestMessageType.FETCH,i.ResponseMessageType.FETCH_RESPONSE).then(e=>{if(e.error)throw e.error;return e})},this.processMessage=e=>{if(e.origin!==this.serverUrl)return;this.log("Received message: "+e.data.type,e.data);const t=e.data;this._listeners.filter(e=>e.messageType===t.type).forEach(e=>{e.callback(t.data),e.persistent||this.removeListener(e)})},this.onUpdateContext=e=>{this._context=e,this._subscribers.forEach(e=>e(this._context))}}get context(){return this._context}static get(e){return n(this,void 0,void 0,(function*(){return this._instance?Promise.resolve(this._instance):(this._instance=new r(e),yield this._instance.initialize(),this._instance)}))}subscribe(e){return this._subscribers.push(e),()=>{this._subscribers=this._subscribers.filter(t=>t!==e)}}hasSelection(){return!!this._context.activeTab.originalAssetSelection.length}hasFilteredSelection(){return!!this._context.activeTab.assetSelection.length}isSingleItem(){return 1===this._context.activeTab.originalAssetSelection.length}openSearch(e,t){this.wrapCommand({query:e,sort:t},i.RequestMessageType.OPEN_SEARCH)}openBrowse(e,t=!0,s=null,n=null){this.wrapCommand({folderPath:e,includeSubFolders:t,q:s,sort:n},i.RequestMessageType.OPEN_BROWSE)}openAssets(e){this.wrapCommand({assetIds:e},i.RequestMessageType.OPEN_ASSETS)}checkout(e){this.wrapCommand({assetIds:e},i.RequestMessageType.CHECKOUT)}checkin(e){this.wrapCommand({assetIds:e},i.RequestMessageType.CHECKIN)}cancelCheckout(e){this.wrapCommand({assetIds:e},i.RequestMessageType.CANCEL_CHECKOUT)}openCollections(e){this.wrapCommand({containerIds:e},i.RequestMessageType.OPEN_COLLECTIONS)}pinCollections(e){this.wrapCommand({containerIds:e},i.RequestMessageType.PIN_COLLECTIONS)}close(){this.wrapCommand(null,i.RequestMessageType.CLOSE)}wrapCommand(e,t,s){return this.postMessage({data:e,type:t}),s?new Promise(e=>this.addListener(s,e)):Promise.resolve(null)}addListener(e,t,s){const n={messageType:e,callback:t,persistent:s};return this._listeners.push(n),()=>this.removeListener(n)}removeListener(e){this._listeners=this._listeners.filter(t=>t!==e)}postMessage(e){this.log("Sending message: "+e.type,e.data),window.parent.postMessage(Object.assign(e,{id:this._context.plugin.id}),this.serverUrl)}initialize(){return new Promise(e=>{this.addListener(i.ResponseMessageType.INITIALIZE,t=>{this.onUpdateContext(t),this.postMessage({type:i.RequestMessageType.INITIALIZE_OK}),e()}),this.addListener(i.ResponseMessageType.UPDATE_CONTEXT,this.onUpdateContext,!0),window.addEventListener("message",this.processMessage)})}log(e,t){console.log("[Assets Plugin Context] "+e,t)}}t.AssetsPluginContext=r;t.LegacyElvisContextWrapper=class{constructor(e){this.pluginContext=e,this.hasSelection=this.pluginContext.hasSelection.bind(this.pluginContext),this.hasFilteredSelection=this.pluginContext.hasFilteredSelection.bind(this.pluginContext),this.isSingleItem=this.pluginContext.isSingleItem.bind(this.pluginContext),this.openSearch=this.pluginContext.openSearch.bind(this.pluginContext),this.openBrowse=this.pluginContext.openBrowse.bind(this.pluginContext),this.close=this.pluginContext.close.bind(this.pluginContext),Object.assign(this,this.pluginContext.context),e.subscribe(e=>{Object.assign(this,e),this.updateCallback&&"function"==typeof this.updateCallback&&this.updateCallback(e)})}openAssets(e){this.pluginContext.openAssets(e.split(","))}openContainers(e){this.pluginContext.openCollections(e.split(","))}checkout(e){this.pluginContext.checkout(e.split(","))}checkin(e){this.pluginContext.checkin(e.split(","))}cancelCheckout(e){this.pluginContext.cancelCheckout(e.split(","))}activateContainers(e){this.pluginContext.pinCollections(e.split(","))}login(){this.pluginContext.login().then(()=>{this.loginCompleteCallback&&"function"==typeof this.loginCompleteCallback&&this.loginCompleteCallback()})}}},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))((function(i,r){function o(e){try{l(n.next(e))}catch(e){r(e)}}function a(e){try{l(n.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(o,a)}l((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const i=s(5),r=s(6);class o{constructor(e){this._messages=e}getString(e,...t){let s=this._messages[e];return null==s?e:(t.length&&(s=this.substitute(s,t)),s)}substitute(e,t){return t.reduce((e,t,s)=>e.replace(new RegExp(`\\{${s}\\}`,"g"),t),e)}}class a{constructor(e,t){this._serverUrl=e,this._messages=new o({}),this._requestStrategy=t?new i.ProxyRequestStrategy(t):new i.FetchRequestStrategy(this.csrf.bind(this)),this._csrfToken=window.localStorage.getItem("assets.csrfToken")}get messages(){return this._messages}static standalone(e,t,s,n){const i=new a(e);return i.useAutoLogin(t,s,n),i}static fromPluginContext(e){const t=new a("",e.fetch);return t.useLoginHandler(e.login),t}useAutoLogin(e,t,s){this._loginStrategy=new r.ConcreteLoginStrategy(this._serverUrl,this._requestStrategy,s,e,t)}useLoginHandler(e){this._loginStrategy=new r.HandlerLoginStrategy(e)}login(e){if(this._loginAttemptPromise)return this._loginAttemptPromise;this._loginAttemptPromise=this._loginStrategy.login(e).then(e=>{e&&e.csrfToken&&(this._csrfToken=e.csrfToken),this._loginAttemptPromise=null})}getProfile(){return this.handleRequest(this._serverUrl+"/services/profile")}logout(){return this.handleRequest(this._serverUrl+"/services/logout")}search(e){return this.handleRequest(this._serverUrl+"/services/search",{body:Object.assign({num:"50",metadataToReturn:"all"},e)})}browse(e){return this.handleRequest(this._serverUrl+"/services/browse",{body:e})}update(e,t){return this.handleRequest(this._serverUrl+"/services/update",{body:Object.assign({id:e},t)})}updatebulk(e,t){return this.handleRequest(this._serverUrl+"/services/updatebulk",{body:Object.assign({q:e},t)})}create(e){return this.handleRequest(this._serverUrl+"/services/create",{body:e})}createFolder(e){return this.handleRequest(this._serverUrl+"/services/folder/create",{body:e})}copy(e){return this.handleRequest(this._serverUrl+"/services/copy",{body:e})}move(e){return this.handleRequest(this._serverUrl+"/services/move",{body:e})}createRelation(e){return this.handleRequest(this._serverUrl+"/services/createRelation",{body:e})}removeRelation(e){return this.handleRequest(this._serverUrl+"/services/removeRelation",{body:e})}remove(e){return this.handleRequest(this._serverUrl+"/services/remove",{body:e})}fieldinfo(){return this.handleRequest(this._serverUrl+"/services/fieldinfo")}csrf(e=!1){return this._csrfToken&&!e?Promise.resolve(this._csrfToken):this.handleRequest(this._serverUrl+"/services/csrf",{method:"GET",skipCsrf:!0}).then(e=>(this._csrfToken=e.csrfToken,window.localStorage.setItem("assets.csrfToken",e.csrfToken),e.csrfToken))}loadMessages(e=navigator.language){return this.handleRequest(this._serverUrl+"/services/messages",{body:{localeChain:e},skipCsrf:!0,method:"GET"}).then(e=>(this._messages=new o(e),Object.assign({},e)))}onSuccess(e){if(e.errorcode)throw e;return e}handleRequest(e,t={},s=!0){return n(this,void 0,void 0,(function*(){const n=()=>this._requestStrategy.handle(e,t).then(this.onSuccess);try{return yield n()}catch(n){if(!n.errorcode||![401,403].includes(n.errorcode))throw n;if(!this._loginStrategy)throw"Not logged in and no login strategy configured";if(!s)throw"Unable to perform call after logging in. This may be caused by cross-domain access issues.";return 403==n.errorcode&&"CsrfTokenMismatch"===n.errorname?yield this.csrf(!0):yield this.login(),yield this.handleRequest(e,t,!1)}}))}}t.AssetsApiClient=a;t.LegacyElvisApiWrapper=class{constructor(e){this.apiClient=e,this.useAutoLogin=this.apiClient.useAutoLogin.bind(this.apiClient),this.useLoginHandler=this.apiClient.useLoginHandler.bind(this.apiClient)}get messages(){return this.apiClient.messages}loadMessages(e,t,s){const n=this.apiClient.loadMessages(s);t&&n.then(t)}useLoginPage(e){this.apiClient.useLoginHandler(()=>new Promise(()=>{window.location.assign(e)}))}usePluginContextAuthentication(){throw"No longer used! Instantiate your AssetsApiClient with the fromPluginContext function."}login(e,t,s,n){e&&t&&(n=Object.assign(n||{},{cred:btoa(`${e}:${t}`)}));const i=this.apiClient.login(n);s&&i.then(s)}getProfile(e){const t=this.apiClient.getProfile();e&&t.then(e)}logout(e){if(e&&"function"!=typeof e)throw"Redirects after login are no longer supported, use the callback function for this purpose";const t=this.apiClient.logout();e&&t.then(e)}search(e,t){const s=this.apiClient.search(e);t&&s.then(t)}browse(e,t){const s=this.apiClient.browse(e);t&&s.then(t)}update(e,t,s){const n=this.apiClient.update(e,t);s&&n.then(s)}updatebulk(e,t,s){const n=this.apiClient.updatebulk(e,t);s&&n.then(s)}create(e,t){const s=this.apiClient.create(e);t&&s.then(t)}createFolder(e,t){const s=this.apiClient.createFolder(e);t&&s.then(t)}copy(e,t){const s=this.apiClient.copy(e);t&&s.then(t)}move(e,t){const s=this.apiClient.move(e);t&&s.then(t)}createRelation(e,t){const s=this.apiClient.createRelation(e);t&&s.then(t)}removeRelation(e,t){const s=this.apiClient.removeRelation(e);t&&s.then(t)}remove(e,t){const s=this.apiClient.remove(e);t&&s.then(t)}fieldinfo(e){const t=this.apiClient.fieldinfo();e&&t.then(e)}csrf(e){const t=this.apiClient.csrf();e&&t.then(e)}},t.queryForSelection=e=>{if(0===e.length)return"";return`(${e.map(e=>"id:"+e.id).join(" OR ")})`},t.queryForFolderSelection=e=>{if(0===e.length)return"";return`(${e.map(e=>`ancestorPaths:"${e.assetPath}"`).join(" OR ")})`};class l{static resolveElvisContext(){throw"Instantiate the LegacyElvisContextWrapper manually."}static resolveQueryString(){throw"Please use the queryString properties on the AssetsPluginContext object instead"}}t.LegacyElvisPlugin=l,l.queryForSelection=t.queryForSelection,l.queryForFolderSelection=t.queryForFolderSelection;t.AssetPermissions=class{static hasViewPreview(e){return e&&-1!=e.indexOf("P")}static hasUseOriginal(e){return e&&-1!=e.indexOf("U")}}},function(e,t,s){"use strict";function n(e){for(var s in e)t.hasOwnProperty(s)||(t[s]=e[s])}Object.defineProperty(t,"__esModule",{value:!0}),n(s(4)),n(s(1)),n(s(2));const i=s(1),r=s(2);window.AssetsPluginContext=i.AssetsPluginContext,window.LegacyElvisContextWrapper=i.LegacyElvisContextWrapper,window.AssetsApiClient=r.AssetsApiClient,window.LegacyElvisApiWrapper=r.LegacyElvisApiWrapper,window.LegacyElvisPlugin=r.LegacyElvisPlugin},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var s in e)t.hasOwnProperty(s)||(t[s]=e[s])}(s(0))},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))((function(i,r){function o(e){try{l(n.next(e))}catch(e){r(e)}}function a(e){try{l(n.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(o,a)}l((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});t.ProxyRequestStrategy=class{constructor(e){this.proxy=e}handle(e,t){const{method:s="POST",body:n,skipCsrf:i=!1,asJson:r=!1}=t;return this.proxy(e,{method:s,body:n,skipCsrf:i,asJson:r}).then(e=>{if(e.error)throw e.error;return e})}};t.FetchRequestStrategy=class{constructor(e){this.getCsrfToken=e}handle(e,t){return n(this,void 0,void 0,(function*(){const{method:s="POST",body:i,skipCsrf:r=!1,asJson:o=!1}=t,a={};r||(a["X-CSRF-TOKEN"]=yield this.getCsrfToken()),o&&(a["Content-Type"]="application/json;charset=utf-8");const l={method:s,body:o?JSON.stringify(i):this.asFormData(i),headers:a,credentials:"include"};return"GET"===s&&(e=`${e}?${new URLSearchParams(i).toString()}`,delete l.body),fetch(e,l).then(e=>n(this,void 0,void 0,(function*(){if(e.ok)return e.json();let t;try{t=yield e.json()}catch(s){t={errorcode:e.status,errorname:e.statusText}}throw t}))).then(e=>e)}))}asFormData(e){if(!e)return null;const t=new FormData;return Object.keys(e).forEach(s=>t.append(s,e[s])),t}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.HandlerLoginStrategy=class{constructor(e){this.loginHandler=e}login(e){return this.loginHandler(e)}};t.ConcreteLoginStrategy=class{constructor(e,t,s,n,i){this.serverUrl=e,this.requestStrategy=t,this.clientType=s,this.credentials=btoa(`${n}:${i}`)}login(e){return this.requestStrategy.handle(this.serverUrl+"/services/login",{method:"POST",body:Object.assign({cred:this.credentials,clientType:this.clientType},e),skipCsrf:!0}).then(e=>{if(!e.loginSuccess)throw e.loginFaultMessage;return e}).catch(e=>{console.error("Unable to authenticate, cause: "+JSON.stringify(e))})}}}]);
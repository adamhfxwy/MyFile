import"./modulepreload-polyfill-2ad73d06.js";import{r as e,g as l,h as n,i as a,j as i,t,k as s,u as o,o as u,p as c,e as r,z as d,v}from"./runtime-dom.esm-bundler-fc4be3d7.js";import{z as m,x as b,A as p,S as _,T as f,i as w}from"./util-accfc5f4.js";import{o as h,a as g,p as k,f as O}from"./tool-8fc7561f.js";import{J as C,s as y,i as T}from"./chrome-runtime-promise-0385ed0f.js";import"./stat-ffdf1247.js";const E={key:0,class:"xly-dialog-abnormal"},x=a("h2",null,"迅雷下载支持异常",-1),P=a("p",{class:"xly-dialog-abnormal__text"},"您还没安装迅雷，无法支持文件下载，请先安装最新版迅雷。。",-1),L=a("p",{class:"xly-dialog-abnormal__tips"},"安装后，重启浏览器生效",-1),N={key:1,class:"browser-plugin"},R=a("div",{class:"browser-plugin__header"},[a("h1",null,"迅雷")],-1),S={key:0},I=a("i",{class:"icon-internet"},null,-1),M=a("br",null,null,-1),A={key:0},W=a("br",null,null,-1),D={key:1},U={key:1},j=[a("div",{class:"browser-plugin__main is-active"},[a("i",{class:"icon-internet"}),a("p",null,[i("该站点不支持下载接管"),a("br")])],-1)],B={class:"browser-plugin__list"},q={__name:"popup-mac",setup(u){const c=e(!1),r=e(""),d=e(!1),v=e(!1),w=e(!1),C=e("");let y=e([]),T=void 0;const q=()=>{var e;(e=k.DOWNLOAD_PICTURE_ENTRANCE_CLICK)&&f(1022,931,"value1="+C.value+"&value2="+e+"&value5=mac"),chrome.tabs.query({active:!0,currentWindow:!0},e=>{if(e[0]){const l="xl-images.html?tabId="+e[0].id;window.open(chrome.runtime.getURL(l))}})},F=()=>{m({active:!0,currentWindow:!0},e=>{c.value?((...e)=>{chrome.runtime.sendMessage({name:h.xl_call_function,method:g.removeBlackListWebsite,args:e})})(r.value,e.id):G(r.value,e.id),c.value=!c.value}),setTimeout(()=>{window.close()},300)},G=(...e)=>{chrome.runtime.sendMessage({name:h.xl_call_function,method:g.addBlackListWebsite,args:e})},H=()=>{var e;d.value=!0,C.value=c.value?O.OPEN_NOT_CONTROL_SITE:O.OPEN_CONTROL_SITE,(e=C.value)&&f(1022,930,"value1="+e+"&value5=mac")};function z(){f(1022,927),setTimeout(()=>{chrome.tabs.create({url:"https://mac.xunlei.com/"})})}return document.addEventListener("DOMContentLoaded",()=>{m({active:!0,currentWindow:!0},e=>{e&&chrome.runtime.sendMessage({name:h.CheckEnabled,url:r.value,tabId:e.id,topFrame:!0},(async function(l){T=l.isInstallThunder,T?b(e.url)?(r.value=p.exec(e.url)[0],y.value=l.websiteBlacklist,c.value=!!y.value.includes(r.value),H()):v.value=!0:w.value=!0}))})}),(e,u)=>w.value?(l(),n("div",E,[x,P,a("button",{id:"install-thunder",class:"td-button",onClick:z},"立即安装"),L])):(l(),n("div",N,[R,v.value?(l(),n("div",U,j)):(l(),n("div",S,[a("div",{class:s(""+(c.value?"browser-plugin__main":"browser-plugin__main is-active"))},[I,a("p",null,[i(t(r.value),1),M,c.value?(l(),n("span",A,[i("该网站已取消下载接管"),W,i("开启后可使用迅雷高速下载")])):(l(),n("span",D,"已接管该网站的下载链接"))]),a("button",{id:"take-over-website-switch",class:"button",onClick:F},t(c.value?"开启接管本站点":"取消接管本站点"),1)],2)])),a("div",B,[a("ul",null,[a("li",{id:"start-thunder-li",onClick:u[0]||(u[0]=(...e)=>o(_)&&o(_)(...e))},"打开迅雷"),a("li",{id:"multi-sel-pic",onClick:q},"批量图片下载")])])]))}};let F=void 0;function G(e){F&&(clearTimeout(F),F=void 0);const l=document.body.children[0];document.body.removeChild(l),document.body.innerHTML=`\n      <div class="xl-tips">\n        <i class="icon-note"></i>${e}\n      </div>\n    `,F=setTimeout(()=>{F=void 0,window.close()},3e3)}const H=(...e)=>new Promise(l=>{chrome.runtime.sendMessage({name:"xl_call_function",method:"setPluginEnabled",args:e},e=>{l()})}),z=()=>new Promise(e=>{chrome.runtime.sendMessage({name:"xl_call_function",method:"startThunder"},l=>{e()})}),K=(...e)=>new Promise(l=>{chrome.runtime.sendMessage({name:"xl_call_function",method:"enterMultiDownload",args:e},e=>{l()})}),J=(...e)=>new Promise((l,n)=>{chrome.runtime.sendMessage({name:"xl_call_function",method:"removeBlackListWebsite",args:e},e=>{l()})}),V=(...e)=>new Promise((l,n)=>{chrome.runtime.sendMessage({name:"xl_call_function",method:"addBlackListWebsite",args:e},e=>{l()})}),X={class:"browser-plugin__list"},$=a("span",{class:"shortcut-key"},"Shift + D",-1),Q=a("span",{class:"text"},"(建议开启)",-1),Y={id:"version"},Z={__name:"popup-win-list",props:{bPluginEnabled:String,multiPic:Boolean,isShowOffPage:Boolean},emits:["confirmOff"],setup(o,{emit:u}){const c=e("");e("");const r=e("3.52.4"),d=o,v=u;function m(e){e&&f(1022,931,"value1="+c.value+"&value2="+e+"&value5=pc")}async function b(e){d.bPluginEnabled?(m(k.STOP_ALL_CONTROL),v("confirmOff")):(m(k.START_ALL_CONTROL),await H(!0),window.close())}function p(){m(k.ADVANCED_SETTING),window.open(chrome.runtime.getURL("options.html")),window.close()}function _(){z()}async function w(e){m(k.MORE_CHOICE_DOWNLOAD),d.bPluginEnabled&&chrome.tabs.query({active:!0,currentWindow:!0},(async function(e){if(e)for(let l=0;l<e.length;l++){const n=e[l];await K(n.id,n.url)}window.close()}))}return(e,u)=>(l(),n("div",X,[a("ul",null,[a("li",{id:"start-thunder-li",onClick:_},"打开迅雷"),a("li",{id:"multi-sel-pic",onClick:u[0]||(u[0]=e=>function(e){m(k.DOWNLOAD_PICTURE_ENTRANCE_CLICK);do{if(!d.bPluginEnabled)break;if(!e){G("该页面不支持下载");break}chrome.tabs.query({active:!0,currentWindow:!0},(function(e){if(e&&e.length>0)for(let l=0;l<e.length;l++){const n="xl-images.html?tabId="+e[l].id;window.open(chrome.runtime.getURL(n));break}}))}while(0)}(d.multiPic)),class:s({"is-disabled":!d.bPluginEnabled})}," 批量图片下载 ",2),a("li",{id:"enter-multi-sel",onClick:w,class:s({"is-disabled":!d.bPluginEnabled})},[i(" 多选下载 "),$],2),a("li",{id:"pop-setting-li",onClick:p},"高级设置"),o.isShowOffPage?(l(),n("li",{key:0,id:"take-over-switch-li",onClick:b},[i(" 开启全部接管"),Q])):(l(),n("li",{key:1,id:"take-over-switch-li",onClick:b},"暂停全部接管")),a("li",Y,"版本："+t(r.value),1)])]))}},ee={class:"popup-wrapper popup-wrapper-win"},le={key:0},ne=a("h2",null,"迅雷下载支持异常",-1),ae=a("p",{class:"xly-dialog-abnormal__text"},"您还没安装迅雷，无法支持文件下载，请先安装最新版迅雷。",-1),ie=a("p",{class:"xly-dialog-abnormal__tips"},"安装后，重启浏览器生效",-1),te={key:1},se=a("h2",null,"确定不让迅雷接管下载吗？",-1),oe=a("p",null,"不接管下载，将失去迅雷高速下载服务",-1),ue=a("a",{href:"javascript:;",title:"关闭",class:"xl-icon-close"},null,-1),ce={key:2},re={key:0,class:"browser-plugin"},de=a("div",{class:"browser-plugin__header"},[a("h1",null,"迅雷")],-1),ve=a("i",{class:"icon-internet"},null,-1),me=a("p",null,[i(" 已取消迅雷下载支持"),a("br"),i(" 将无法为你提供高速下载 ")],-1),be={key:1,class:"xly-dialog-abnormal"},pe=a("h2",null,"迅雷下载支持异常",-1),_e=a("p",{class:"xly-dialog-abnormal__text"},"您还没安装迅雷，无法支持文件下载，请先安装最新版迅雷。。",-1),fe=a("p",{class:"xly-dialog-abnormal__tips"},"安装后，重启浏览器生效",-1),we={key:2,class:"browser-plugin"},he=a("div",{class:"browser-plugin__header"},[a("h1",null,"迅雷")],-1),ge=a("i",{class:"icon-internet"},null,-1),ke=a("br",null,null,-1),Oe={key:0},Ce=a("br",null,null,-1),ye={key:1},Te=["black"],Ee={key:3,class:"browser-plugin"},xe=a("div",{class:"browser-plugin__header"},[a("h1",null,"迅雷")],-1),Pe=a("div",{class:"browser-plugin__main is-active"},[a("i",{class:"icon-internet"}),a("p",null,[i("迅雷下载支持"),a("br"),i("提供更快的链接和视频的下载")])],-1),Le={__name:"popup-win",setup(o){e(!1);const v=e(Boolean),m=e(Boolean),p=e(""),_=e(!1),w=e("");e("");const h=e(!1),g=e(!1),E=e(!1);e(!1);const x=e(!1),P=e(!1),L=e(!1);e(!1);const N=e(!1),R=e(""),S=e(""),I=e(!1),M=e({});let A=!1;function W(e){e&&f(1022,931,"value1="+p.value+"&value2="+e+"&value5=pc")}function D(e){e&&f(1022,930,"value1="+e+"&value5=pc")}async function U(e){w.value?(W(k.STOP_ALL_CONTROL),K()):(W(k.START_ALL_CONTROL),await H(!w.value),window.close())}function j(e){w.value&&F({active:!0,currentWindow:!0},async e=>{const l=e.url,n=l.indexOf("://");if(n>=0){let a;const i=l.indexOf("/",n+3);a=i>=0?l.substring(0,i):l,v.value?(_.value=!1,W(k.OPEN_CONTROL_CURRENT_SITE),await J(a,e.url,e.id)):(_.value=!0,W(k.CANCEL_CONTROL_CURRENT_SITE),await V(a,e.id)),$()}window.close()})}function B(e){const l=function(){let e="";do{const l=navigator.userAgent;if(l.match(/compatible/i)||l.match(/Windows/i)){e="https://down.sandai.net/thunder11/XunLeiWebSetup_ext.exe";break}if(l.match(/Macintosh/i)||l.match(/MacIntel/i)){e="https://down.sandai.net/mac/thunder.dmg";break}}while(0);return e}();l&&chrome.tabs.create({url:l},(function(){})),f(1022,927)}function q(){P.value=!0}function F(e,l){chrome.tabs.query(e,(function(e){if(e)for(let n=0;n<e.length;n++)e[n].id>=0&&l(e[n])}))}function G(e,l){N.value=!0,p.value=O.STOP_ALL_CONTROL,D(p.value),A&&e&&(E.value=!0,chrome.runtime.sendMessage({name:"xl_show_recall_entry",source:"panel_installed",url:l}))}function z(e,l,n,a){p.value=l?O.OPEN_NOT_CONTROL_SITE:O.OPEN_CONTROL_SITE,D(p.value),h.value=!0,n&&b&&(E.value=!0,chrome.runtime.sendMessage({name:"xl_show_recall_entry",source:"panel_installed",url:a}))}function K(){L.value=!0}function X(e){let l=e;do{let n=e.indexOf("://");if(-1===n)break;if(n=e.indexOf("/",n+3),-1===n)break;l=e.substring(0,n)}while(0);return l}function $(){chrome.storage.local.set({isHiddenRecallBadge:!0});const e=performance.now();F({active:!0,currentWindow:!0},(function(l){if(l){const n=l.url||"";S.value=n,async function(){var e;try{const l=await y({name:"GetConfig"});if(!l)return;I.value=T(S.value,l.jsqConfig),M.value=(null==(e=null==l?void 0:l.jsqConfig)?void 0:e.text)||{}}catch(l){}}(),chrome.runtime.sendMessage({name:"CheckEnabled",url:n,tabId:l.id,topFrame:!0},(async function(l){A=l.isShowRecallInfo;const a=b(n);do{if(l.exception){q();break}if(w.value=l.bPlugin,!w.value){G(a,n);break}if(!n||!a){p.value=O.NOT_OPEN_SITE,D(p.value),g.value=!0;break}R.value=X(n),v.value=!l.bWebsite,m.value=!l.bPage;if(((performance.now()-e)/1e3).toFixed(2),v.value||m.value){_.value=!0,z(R.value,!0,A,n);break}_.value=!1,z(R.value,!1,A,n)}while(0)}))}}))}function Q(){window.close()}async function Y(){await H(!1),window.close()}return window.showGuidePage=q,document.addEventListener("DOMContentLoaded",$),u(()=>{}),(e,o)=>(l(),n("div",ee,[P.value?(l(),n("div",le,[a("div",{class:"xly-dialog-abnormal"},[ne,ae,a("button",{id:"install-thunder",class:"td-button",onClick:B},"立即安装"),ie])])):c("",!0),L.value?(l(),n("div",te,[a("div",{class:"dialog-plugin"},[se,oe,ue,a("div",{class:"dialog-plugin__footer"},[a("button",{id:"off-take-over-sure",class:"button",onClick:Y},"确定"),a("button",{id:"off-take-over-cancel",class:"button button--other",onClick:Q},"取消")])])])):(l(),n("div",ce,[N.value?(l(),n("div",re,[a("div",null,[de,a("div",{class:"browser-plugin__main"},[ve,me,a("button",{id:"take-over-switch-btn",class:"button",onClick:U},"开启接管")]),r(Z,{bPluginEnabled:w.value,multiPic:"",onConfirmOff:K,isShowOffPage:N.value},null,8,["bPluginEnabled","isShowOffPage"])])])):c("",!0),x.value?(l(),n("div",be,[pe,_e,a("button",{id:"install-thunder",class:"td-button",onClick:B},"立即安装"),fe])):c("",!0),h.value?(l(),n("div",we,[he,a("div",{class:s(""+(_.value?"browser-plugin__main":"browser-plugin__main is-active"))},[ge,a("p",null,[i(t(R.value),1),ke,_.value?(l(),n("span",Oe,[i("该网站已取消下载接管"),Ce,i("开启后可使用迅雷高速下载")])):(l(),n("span",ye,"已接管该网站的下载链接"))]),a("button",{id:"take-over-website-switch",class:"button",black:_.value,onClick:j},t(_.value?"开启接管本站点":"取消接管本站点"),9,Te)],2),r(Z,{bPluginEnabled:w.value,multiPic:"true",onConfirmOff:K},null,8,["bPluginEnabled"]),I.value?(l(),d(C,{key:0,source:"popup",tabUrl:S.value,text:M.value},null,8,["tabUrl","text"])):c("",!0)])):c("",!0),g.value?(l(),n("div",Ee,[xe,Pe,r(Z,{bPluginEnabled:w.value,multiPic:"true",onConfirmOff:K},null,8,["bPluginEnabled"]),I.value?(l(),d(C,{key:0,source:"popup",tabUrl:S.value,text:M.value},null,8,["tabUrl","text"])):c("",!0)])):c("",!0)]))]))}};w?v(q).mount("#app"):v(Le).mount("#app");

!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=3)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={TITLE:"用中文直播的頻道"}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={TITLE:"The streams in English"}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=i(t(1)),o=i(t(0));function i(e){return e&&e.__esModule?e:{default:e}}n.default={en:r.default,"zh-tw":o.default}},function(e,n,t){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(t(2));var o=0,i=!1,l="zh-tw";window.onload=function(){a(),u(),document.querySelector(".zh-tw").addEventListener("click",function(){return c("zh-tw")}),document.querySelector(".en").addEventListener("click",function(){return c("en")}),window.onscroll=function(){var e=document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop,n=document.body,t=document.documentElement,r=Math.max(n.offsetHeight,n.scrollHeight,t.clientHeight,t.offsetHeight,t.scrollHeight);e+window.innerHeight>=r-200&&(i||a())}};var u=function(){document.querySelector(".title").innerHTML=r.default[l].TITLE},c=function(e){console.log("translate"),l=e,u(),function(){for(var e=document.querySelector(".row");e.firstChild;)e.removeChild(e.firstChild)}(),o=0,a()},a=function(){d(function(e,n){var t=n.streams,r=document.querySelector(".row"),l=!0,u=!1,c=void 0;try{for(var a,d=t[Symbol.iterator]();!(l=(a=d.next()).done);l=!0){var f=a.value;r.insertAdjacentHTML("beforeend",s(f))}}catch(e){u=!0,c=e}finally{try{!l&&d.return&&d.return()}finally{if(u)throw c}}o+=20,i=!1})},d=function(e){var n=f("https://api.twitch.tv/kraken/streams/",{game:"League%20of%20Legends",client_id:"80stfocyvne9dzzxyvz4j4x9yl75bd",offset:o,language:l}),t=new XMLHttpRequest;i=!0,t.open("GET",n),t.onload=function(){e(null,JSON.parse(t.responseText))},t.send()},s=function(e){return"\n    <div class='col'>\n      <div class='preview'>\n        <div class='placeholder'></div>\n        <img src='"+e.preview.medium+"' onload='this.style.opacity=1'/>\n      </div>\n      <div class='bottom'>\n        <div class=\"avatar\">\n          <img class='avatar_img' src='"+e.channel.logo+"' />\n        </div>\n        <div class='intro'>\n          <div class='channel_name'>"+e.channel.display_name+"</div>\n          <div class='owner_name'>"+e.channel.name+"</div>\n        </div>\n      </div>\n    </div>  \n    "},f=function(e,n){var t=!0,r=!0,o=!1,i=void 0;try{for(var l,u=Object.keys(n)[Symbol.iterator]();!(r=(l=u.next()).done);r=!0){var c=l.value,a="&";t&&(a="?",t=!1),e+=""+a+c+"="+n[c]}}catch(e){o=!0,i=e}finally{try{!r&&u.return&&u.return()}finally{if(o)throw i}}return e}}]);
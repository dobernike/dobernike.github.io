(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,function(e,t,a){e.exports=a(16)},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(4),c=a.n(l),u=(a(11),a(1));function o(){var e,t,a,l=Object(n.useState)((new Date).toLocaleDateString()),c=Object(u.a)(l,2),o=c[0],m=c[1],i=Object(n.useState)((e=1e4,t=1e5,Math.floor(Math.random()*(t-e+1))+e)),s=Object(u.a)(i,2),p=s[0],d=s[1],E=Object(n.useState)(o),h=Object(u.a)(E,2),b=h[0],f=h[1];return Object(n.useEffect)(function(){document.title="".concat(o," \u043d\u0430\u043a\u043b\u0430\u0434\u043d\u0430\u044f \u2116 ").concat(p)},[o,p]),r.a.createElement(r.a.Fragment,null,r.a.createElement("table",{id:"header"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("h1",null,"\u0420\u0430\u0441\u0445\u043e\u0434\u043d\u0430\u044f \u043d\u0430\u043a\u043b\u0430\u0434\u043d\u0430\u044f \u2116\xa0",r.a.createElement("span",{onClick:function(){return f(p)}},p,"\xa0"),"\u043e\u0442\xa0",r.a.createElement("span",{onClick:function(){return f(o)}},o),"\xa0",(a=b,r.a.createElement("input",{className:"printHide",type:"text",value:a,onChange:function(e){return a===o?function(e){m(e.target.value),f(e.target.value)}(e):function(e){d(e.target.value),f(e.target.value)}(e)}})))),r.a.createElement("td",{id:"pay_till"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",x:"0",y:"0",version:"1.1",viewBox:"0 0 178 70",width:"178px",height:"70px",alt:"\u0448\u0442\u0440\u0438\u0445\u043a\u043e\u0434 \u043d\u0430\u043a\u043b\u0430\u0434\u043d\u043e\u0439"},r.a.createElement("path",{fill:"#fff",d:"M0 0H178V70H0z"}),r.a.createElement("g",{transform:"translate(10 10)"},r.a.createElement("path",{d:"M0 0H4V50H0z"}),r.a.createElement("path",{d:"M6 0H8V50H6z"}),r.a.createElement("path",{d:"M12 0H18V50H12z"}),r.a.createElement("path",{d:"M22 0H30V50H22z"}),r.a.createElement("path",{d:"M32 0H34V50H32z"}),r.a.createElement("path",{d:"M36 0H38V50H36z"}),r.a.createElement("path",{d:"M44 0H46V50H44z"}),r.a.createElement("path",{d:"M52 0H54V50H52z"}),r.a.createElement("path",{d:"M60 0H64V50H60z"}),r.a.createElement("path",{d:"M66 0H72V50H66z"}),r.a.createElement("path",{d:"M74 0H76V50H74z"}),r.a.createElement("path",{d:"M78 0H86V50H78z"}),r.a.createElement("path",{d:"M88 0H94V50H88z"}),r.a.createElement("path",{d:"M96 0H98V50H96z"}),r.a.createElement("path",{d:"M102 0H106V50H102z"}),r.a.createElement("path",{d:"M110 0H114V50H110z"}),r.a.createElement("path",{d:"M116 0H122V50H116z"}),r.a.createElement("path",{d:"M124 0H130V50H124z"}),r.a.createElement("path",{d:"M132 0H136V50H132z"}),r.a.createElement("path",{d:"M142 0H148V50H142z"}),r.a.createElement("path",{d:"M150 0H152V50H150z"}),r.a.createElement("path",{d:"M154 0H158V50H154z"}))))))),r.a.createElement("table",{id:"info"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("ul",{id:"receiver"},r.a.createElement("b",null,r.a.createElement("li",null,"\u0410\u0434\u0440\u0435\u0441 \u043f\u043e\u0441\u0442\u0430\u0432\u043a\u0438: \u0421\u0442\u0440\u0435\u043b\u044c\u043d\u0430, \u0443\u043b. \u041d\u0438\u0436\u043d\u044f\u044f \u041a\u043e\u043b\u043e\u043d\u0438\u044f, \u0434. 49\u0411 +79626803377"),r.a.createElement("li",null,"\u041f\u043e\u0441\u0442\u0430\u0432\u0449\u0438\u043a: \u0418\u043d\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043b\u044c\u043d\u044b\u0439 \u041f\u0440\u0435\u0434\u043f\u0440\u0438\u043d\u0438\u043c\u0430\u0442\u0435\u043b\u044c \u0424\u0435\u0434\u044e\u0448\u0438\u043d \u041f.\u0414."))))))))}a(12);var m=a(2);a(13),a(14);function i(e){var t=e.index,a=e.name,n=e.count,l=e.price,c=e.onDelete;return r.a.createElement("tr",null,r.a.createElement("td",null,t,"."),r.a.createElement("td",{className:"item-name"},a),r.a.createElement("td",null,n),r.a.createElement("td",{className:"units"},"\u0448\u0442."),r.a.createElement("td",{className:"price"},(+l).toLocaleString()),r.a.createElement("td",{className:"price"},(l*n).toLocaleString()),r.a.createElement("td",{className:"printHide delete",onClick:c},"x"))}function s(e){var t=Object(n.useState)(""),a=Object(u.a)(t,2),l=a[0],c=a[1],o=Object(n.useState)(1),s=Object(u.a)(o,2),p=s[0],d=s[1],E=Object(n.useState)(""),h=Object(u.a)(E,2),b=h[0],f=h[1],H=Object(n.useState)([]),g=Object(u.a)(H,2),v=g[0],w=g[1],O=Object(n.useState)(1),j=Object(u.a)(O,2),M=j[0],y=j[1],z=Object(n.useState)([0]),S=Object(u.a)(z,2),V=S[0],x=S[1],N=function(e,t){return e+t};function F(e){e.target.parentNode.remove(),y(function(e){return e-1});var t=V.filter(function(e,t){return t!==M});x(t)}function k(e,t){t(e.target.value)}return Object(n.useEffect)(function(){var t=V.reduce(N);e.updateTotal(t),e.updateIndex(M-1)},[V]),r.a.createElement(r.a.Fragment,null,v,r.a.createElement("tr",{className:"printHide"},r.a.createElement("td",{className:"inputs-data",colSpan:"5",style:{textAlign:"left"}},r.a.createElement("input",{type:"text",style:{width:"300px",marginRight:"10px"},placeholder:"\u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",value:l,onChange:function(e){return k(e,c)},autoFocus:!0}),r.a.createElement("input",{type:"number",style:{width:"30px",marginRight:"10px"},placeholder:"1",value:p,onChange:function(e){return k(e,d)}}),r.a.createElement("input",{type:"number",min:"0",style:{width:"60px"},placeholder:"\u20bd",value:b,onChange:function(e){return k(e,f)}})),r.a.createElement("td",null,r.a.createElement("button",{className:"addBtn",onClick:function(){""!==l&&""!==p&&""!==b&&(w([].concat(Object(m.a)(v),[r.a.createElement(i,{key:Math.random()+l,index:M,name:l,count:p,price:b,onDelete:F})])),x([].concat(Object(m.a)(V),[b*p])),c(""),d(1),f(""),y(function(e){return e+1}))}},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"))))}function p(e,t){t=t||!1;var a=new Array;function n(e,t){var n="",r="";if(3==e.length&&(r=e.substr(0,1),e=e.substr(1,3),n=a[3][r]+" "),e<20)n+=a[1][parseFloat(e)]+" ";else{var l=e.substr(0,1),c=e.substr(1,2);n+=a[2][l]+" "+a[1][c]+" "}switch(t){case 0:if(2==e.length&&1==parseFloat(e.substr(0,1))){n+="\u0440\u0443\u0431\u043b\u0435\u0439";break}n+=1==(u=parseFloat(e.substr(-1)))?"\u0440\u0443\u0431\u043b\u044c":u>1&&u<5?"\u0440\u0443\u0431\u043b\u044f":"\u0440\u0443\u0431\u043b\u0435\u0439";break;case 1:if(2==(e=e.replace(/^[0]{1,}$/g,"0")).length&&1==parseFloat(e.substr(0,1))){n+="\u0442\u044b\u0441\u044f\u0447 ";break}var u;1==(u=parseFloat(e.substr(-1)))?n+="\u0442\u044b\u0441\u044f\u0447\u0430 ":u>1&&u<5?n+="\u0442\u044b\u0441\u044f\u0447\u0438 ":parseFloat(e)>0&&(n+="\u0442\u044b\u0441\u044f\u0447 "),n=(n=n.replace("\u043e\u0434\u0438\u043d ","\u043e\u0434\u043d\u0430 ")).replace("\u0434\u0432\u0430 ","\u0434\u0432\u0435 ")}return n}if(a[1]=new Array("","\u043e\u0434\u0438\u043d","\u0434\u0432\u0430","\u0442\u0440\u0438","\u0447\u0435\u0442\u044b\u0440\u0435","\u043f\u044f\u0442\u044c","\u0448\u0435\u0441\u0442\u044c","\u0441\u0435\u043c\u044c","\u0432\u043e\u0441\u0435\u043c\u044c","\u0434\u0435\u0432\u044f\u0442\u044c","\u0434\u0435\u0441\u044f\u0442\u044c","\u043e\u0434\u0438\u043d\u043d\u0430\u0434\u0446\u0430\u0442\u044c","\u0434\u0432\u0435\u043d\u0430\u0434\u0446\u0430\u0442\u044c","\u0442\u0440\u0438\u043d\u0430\u0434\u0446\u0430\u0442\u044c","\u0447\u0435\u0442\u044b\u0440\u043d\u0430\u0434\u0446\u0430\u0442\u044c","\u043f\u044f\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c","\u0448\u0435\u0441\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c","\u0441\u0435\u043c\u043d\u0430\u0434\u0446\u0430\u0442\u044c","\u0432\u043e\u0441\u0435\u043c\u043d\u0430\u0434\u0446\u0430\u0442\u044c","\u0434\u0435\u0432\u044f\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c"),a[2]=new Array("","","\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c","\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c","\u0441\u043e\u0440\u043e\u043a","\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442","\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442","\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442","\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442","\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e"),a[3]=new Array("","\u0441\u0442\u043e","\u0434\u0432\u0435\u0441\u0442\u0438","\u0442\u0440\u0438\u0441\u0442\u0430","\u0447\u0435\u0442\u044b\u0440\u0435\u0441\u0442\u0430","\u043f\u044f\u0442\u044c\u0441\u043e\u0442","\u0448\u0435\u0441\u0442\u044c\u0441\u043e\u0442","\u0441\u0435\u043c\u044c\u0441\u043e\u0442","\u0432\u043e\u0441\u0435\u043c\u044c\u0441\u043e\u0442","\u0434\u0435\u0432\u044f\u0442\u044c\u0441\u043e\u0442"),!e||0==e)return!1;if("number"!==typeof e&&(e=(e+="").replace(",","."),e=parseFloat(e),isNaN(e)))return!1;if(-1!=(e=e.toFixed(2)).indexOf("."))var r=e.split("."),l=(e=r[0],r[1]);for(var c="",u="",o=0,m=e.length-1;m>=0;m--){3!=(u=e.substr(m,1)+u).length&&0!=m||isNaN(parseFloat(u))||(c=n(u,o)+c,u="",o++)}return l&&(c+=function(e){var t=e.substr(0,1),a=parseFloat(e.substr(1,2)),n=" "+t+a;return n+=1==a?" \u043a\u043e\u043f\u0435\u0439\u043a\u0430":a>1&&a<5?" \u043a\u043e\u043f\u0435\u0439\u043a\u0438":" \u043a\u043e\u043f\u0435\u0435\u043a"}(l)),!0!==t&&"upper"!=t||(c=c.substr(0,1).toUpperCase()+c.substr(1)),c.replace(/[\s]{1,}/g," ")}function d(){var e=Object(n.useState)(0),t=Object(u.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(0),o=Object(u.a)(c,2),m=o[0],i=o[1],d=Object(n.useState)(!0),E=Object(u.a)(d,2),h=E[0],b=E[1],f=3e3,H=300;return r.a.createElement(r.a.Fragment,null,r.a.createElement("table",{id:"order"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"\u2116"),r.a.createElement("th",null,"\u0422\u043e\u0432\u0430\u0440"),r.a.createElement("th",null,"\u041a\u043e\u043b."),r.a.createElement("th",null,"\u0415\u0434."),r.a.createElement("th",null,"\u0426\u0435\u043d\u0430 (\u0440\u0443\u0431)"),r.a.createElement("th",null,"\u0421\u0443\u043c\u043c\u0430 (\u0440\u0443\u0431)"))),r.a.createElement("tfoot",null,h?r.a.createElement("tr",{className:"total"},r.a.createElement("td",{colSpan:"5"},"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430:"),r.a.createElement("td",null,H),r.a.createElement("td",{className:"printHide delete delete--delivery",onClick:function(){b(!1),l(function(e){return e-H})}},"x")):null,r.a.createElement("tr",{className:"total"},r.a.createElement("td",{colSpan:"5"},"\u0418\u0442\u043e\u0433\u043e:"),r.a.createElement("td",{className:"price"},a.toLocaleString()))),r.a.createElement("tbody",null,r.a.createElement(s,{updateTotal:function(e){e<f?(b(!0),e+=H):b(!1),l(e)},updateIndex:function(e){i(e)}}))),r.a.createElement("p",null,"\u0412\u0441\u0435\u0433\u043e \u043d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0439 ",m," \u043d\u0430 \u0441\u0443\u043c\u043c\u0443 ",r.a.createElement("span",{className:"price"},a.toLocaleString())," \u0440\u0443\u0431."),r.a.createElement("p",{id:"sum-names"},p(a)))}Number.prototype.numberToString=function(e){return p(this,e)},String.prototype.numberToString=function(e){return p(this,e)};a(15);function E(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("table",{id:"subscripts"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",null,"\u041e\u0442\u043f\u0443\u0441\u0442\u0438\u043b"),r.a.createElement("td",null,"\xa0"),r.a.createElement("th",null,"\u041f\u043e\u043b\u0443\u0447\u0438\u043b"),r.a.createElement("td",null,"\xa0")))),r.a.createElement("button",{className:"printBtn printHide",onClick:function(){return window.printpage()}},"\u041f\u0435\u0447\u0430\u0442\u044c"))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(o,null),r.a.createElement(d,null),r.a.createElement(E,null))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[5,1,2]]]);
//# sourceMappingURL=main.b4a140c5.chunk.js.map
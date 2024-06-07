import{s as A,Y as j,p as w,r as E,v as U,_ as M,Z as S,T as L,j as g,x as k,z as O,$ as _,l as h}from"./index-00aebc20.js";const B=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],F=l=>{const{classes:s,inset:i,primary:c,secondary:y,dense:d}=l;return O({root:["root",i&&"inset",d&&"dense",c&&y&&"multiline"],primary:["primary"],secondary:["secondary"]},_,s)},I=A("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(l,s)=>{const{ownerState:i}=l;return[{[`& .${j.primary}`]:s.primary},{[`& .${j.secondary}`]:s.secondary},s.root,i.inset&&s.inset,i.primary&&i.secondary&&s.multiline,i.dense&&s.dense]}})(({ownerState:l})=>w({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},l.primary&&l.secondary&&{marginTop:6,marginBottom:6},l.inset&&{paddingLeft:56})),P=E.forwardRef(function(s,i){const c=U({props:s,name:"MuiListItemText"}),{children:y,className:d,disableTypography:r=!1,inset:T=!1,primary:m,primaryTypographyProps:e,secondary:t,secondaryTypographyProps:a}=c,o=M(c,B),{dense:n}=E.useContext(S);let u=m??y,p=t;const f=w({},c,{disableTypography:r,inset:T,primary:!!u,secondary:!!p,dense:n}),v=F(f);return u!=null&&u.type!==L&&!r&&(u=g.jsx(L,w({variant:n?"body2":"body1",className:v.primary,component:e!=null&&e.variant?void 0:"span",display:"block"},e,{children:u}))),p!=null&&p.type!==L&&!r&&(p=g.jsx(L,w({variant:"body2",className:v.secondary,color:"text.secondary",display:"block"},a,{children:p}))),g.jsxs(I,w({className:k(v.root,d),ownerState:f,ref:i},o,{children:[u,p]}))}),H=P;var R={exports:{}};(function(l,s){(function(i,c){c()})(h,function(){function i(e,t){return typeof t>"u"?t={autoBom:!1}:typeof t!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\uFEFF",e],{type:e.type}):e}function c(e,t,a){var o=new XMLHttpRequest;o.open("GET",e),o.responseType="blob",o.onload=function(){m(o.response,t,a)},o.onerror=function(){console.error("could not download file")},o.send()}function y(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch{}return 200<=t.status&&299>=t.status}function d(e){try{e.dispatchEvent(new MouseEvent("click"))}catch{var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var r=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof h=="object"&&h.global===h?h:void 0,T=r.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),m=r.saveAs||(typeof window!="object"||window!==r?function(){}:"download"in HTMLAnchorElement.prototype&&!T?function(e,t,a){var o=r.URL||r.webkitURL,n=document.createElement("a");t=t||e.name||"download",n.download=t,n.rel="noopener",typeof e=="string"?(n.href=e,n.origin===location.origin?d(n):y(n.href)?c(e,t,a):d(n,n.target="_blank")):(n.href=o.createObjectURL(e),setTimeout(function(){o.revokeObjectURL(n.href)},4e4),setTimeout(function(){d(n)},0))}:"msSaveOrOpenBlob"in navigator?function(e,t,a){if(t=t||e.name||"download",typeof e!="string")navigator.msSaveOrOpenBlob(i(e,a),t);else if(y(e))c(e,t,a);else{var o=document.createElement("a");o.href=e,o.target="_blank",setTimeout(function(){d(o)})}}:function(e,t,a,o){if(o=o||open("","_blank"),o&&(o.document.title=o.document.body.innerText="downloading..."),typeof e=="string")return c(e,t,a);var n=e.type==="application/octet-stream",u=/constructor/i.test(r.HTMLElement)||r.safari,p=/CriOS\/[\d]+/.test(navigator.userAgent);if((p||n&&u||T)&&typeof FileReader<"u"){var f=new FileReader;f.onloadend=function(){var x=f.result;x=p?x:x.replace(/^data:[^;]*;/,"data:attachment/file;"),o?o.location.href=x:location=x,o=null},f.readAsDataURL(e)}else{var v=r.URL||r.webkitURL,b=v.createObjectURL(e);o?o.location=b:location.href=b,o=null,setTimeout(function(){v.revokeObjectURL(b)},4e4)}});r.saveAs=m.saveAs=m,l.exports=m})})(R);var N=R.exports;export{N as F,H as L};

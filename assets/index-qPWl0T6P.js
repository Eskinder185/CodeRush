var wg=Object.defineProperty;var bg=(e,t,n)=>t in e?wg(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ou=(e,t,n)=>bg(e,typeof t!="symbol"?t+"":t,n);function kg(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in e)){const i=Object.getOwnPropertyDescriptor(r,s);i&&Object.defineProperty(e,s,i.get?i:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function Sg(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var xf={exports:{}},Ui={},wf={exports:{}},O={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fs=Symbol.for("react.element"),Cg=Symbol.for("react.portal"),Ng=Symbol.for("react.fragment"),jg=Symbol.for("react.strict_mode"),Eg=Symbol.for("react.profiler"),Pg=Symbol.for("react.provider"),Tg=Symbol.for("react.context"),Rg=Symbol.for("react.forward_ref"),Mg=Symbol.for("react.suspense"),Ag=Symbol.for("react.memo"),Lg=Symbol.for("react.lazy"),Fu=Symbol.iterator;function _g(e){return e===null||typeof e!="object"?null:(e=Fu&&e[Fu]||e["@@iterator"],typeof e=="function"?e:null)}var bf={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},kf=Object.assign,Sf={};function cr(e,t,n){this.props=e,this.context=t,this.refs=Sf,this.updater=n||bf}cr.prototype.isReactComponent={};cr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};cr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Cf(){}Cf.prototype=cr.prototype;function gl(e,t,n){this.props=e,this.context=t,this.refs=Sf,this.updater=n||bf}var yl=gl.prototype=new Cf;yl.constructor=gl;kf(yl,cr.prototype);yl.isPureReactComponent=!0;var Uu=Array.isArray,Nf=Object.prototype.hasOwnProperty,vl={current:null},jf={key:!0,ref:!0,__self:!0,__source:!0};function Ef(e,t,n){var r,s={},i=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(i=""+t.key),t)Nf.call(t,r)&&!jf.hasOwnProperty(r)&&(s[r]=t[r]);var o=arguments.length-2;if(o===1)s.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];s.children=l}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)s[r]===void 0&&(s[r]=o[r]);return{$$typeof:fs,type:e,key:i,ref:a,props:s,_owner:vl.current}}function Dg(e,t){return{$$typeof:fs,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function xl(e){return typeof e=="object"&&e!==null&&e.$$typeof===fs}function Ig(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Bu=/\/+/g;function ha(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Ig(""+e.key):t.toString(36)}function Hs(e,t,n,r,s){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case fs:case Cg:a=!0}}if(a)return a=e,s=s(a),e=r===""?"."+ha(a,0):r,Uu(s)?(n="",e!=null&&(n=e.replace(Bu,"$&/")+"/"),Hs(s,t,n,"",function(c){return c})):s!=null&&(xl(s)&&(s=Dg(s,n+(!s.key||a&&a.key===s.key?"":(""+s.key).replace(Bu,"$&/")+"/")+e)),t.push(s)),1;if(a=0,r=r===""?".":r+":",Uu(e))for(var o=0;o<e.length;o++){i=e[o];var l=r+ha(i,o);a+=Hs(i,t,n,l,s)}else if(l=_g(e),typeof l=="function")for(e=l.call(e),o=0;!(i=e.next()).done;)i=i.value,l=r+ha(i,o++),a+=Hs(i,t,n,l,s);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function Cs(e,t,n){if(e==null)return e;var r=[],s=0;return Hs(e,r,"","",function(i){return t.call(n,i,s++)}),r}function Vg(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var je={current:null},Gs={transition:null},Og={ReactCurrentDispatcher:je,ReactCurrentBatchConfig:Gs,ReactCurrentOwner:vl};function Pf(){throw Error("act(...) is not supported in production builds of React.")}O.Children={map:Cs,forEach:function(e,t,n){Cs(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Cs(e,function(){t++}),t},toArray:function(e){return Cs(e,function(t){return t})||[]},only:function(e){if(!xl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};O.Component=cr;O.Fragment=Ng;O.Profiler=Eg;O.PureComponent=gl;O.StrictMode=jg;O.Suspense=Mg;O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Og;O.act=Pf;O.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=kf({},e.props),s=e.key,i=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,a=vl.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(l in t)Nf.call(t,l)&&!jf.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&o!==void 0?o[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];r.children=o}return{$$typeof:fs,type:e.type,key:s,ref:i,props:r,_owner:a}};O.createContext=function(e){return e={$$typeof:Tg,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Pg,_context:e},e.Consumer=e};O.createElement=Ef;O.createFactory=function(e){var t=Ef.bind(null,e);return t.type=e,t};O.createRef=function(){return{current:null}};O.forwardRef=function(e){return{$$typeof:Rg,render:e}};O.isValidElement=xl;O.lazy=function(e){return{$$typeof:Lg,_payload:{_status:-1,_result:e},_init:Vg}};O.memo=function(e,t){return{$$typeof:Ag,type:e,compare:t===void 0?null:t}};O.startTransition=function(e){var t=Gs.transition;Gs.transition={};try{e()}finally{Gs.transition=t}};O.unstable_act=Pf;O.useCallback=function(e,t){return je.current.useCallback(e,t)};O.useContext=function(e){return je.current.useContext(e)};O.useDebugValue=function(){};O.useDeferredValue=function(e){return je.current.useDeferredValue(e)};O.useEffect=function(e,t){return je.current.useEffect(e,t)};O.useId=function(){return je.current.useId()};O.useImperativeHandle=function(e,t,n){return je.current.useImperativeHandle(e,t,n)};O.useInsertionEffect=function(e,t){return je.current.useInsertionEffect(e,t)};O.useLayoutEffect=function(e,t){return je.current.useLayoutEffect(e,t)};O.useMemo=function(e,t){return je.current.useMemo(e,t)};O.useReducer=function(e,t,n){return je.current.useReducer(e,t,n)};O.useRef=function(e){return je.current.useRef(e)};O.useState=function(e){return je.current.useState(e)};O.useSyncExternalStore=function(e,t,n){return je.current.useSyncExternalStore(e,t,n)};O.useTransition=function(){return je.current.useTransition()};O.version="18.3.1";wf.exports=O;var w=wf.exports;const Bi=Sg(w),Fg=kg({__proto__:null,default:Bi},[w]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ug=w,Bg=Symbol.for("react.element"),$g=Symbol.for("react.fragment"),zg=Object.prototype.hasOwnProperty,Wg=Ug.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Hg={key:!0,ref:!0,__self:!0,__source:!0};function Tf(e,t,n){var r,s={},i=null,a=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)zg.call(t,r)&&!Hg.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:Bg,type:e,key:i,ref:a,props:s,_owner:Wg.current}}Ui.Fragment=$g;Ui.jsx=Tf;Ui.jsxs=Tf;xf.exports=Ui;var u=xf.exports,ro={},Rf={exports:{}},Ue={},Mf={exports:{}},Af={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(R,P){var _=R.length;R.push(P);e:for(;0<_;){var L=_-1>>>1,$=R[L];if(0<s($,P))R[L]=P,R[_]=$,_=L;else break e}}function n(R){return R.length===0?null:R[0]}function r(R){if(R.length===0)return null;var P=R[0],_=R.pop();if(_!==P){R[0]=_;e:for(var L=0,$=R.length,en=$>>>1;L<en;){var st=2*(L+1)-1,Tn=R[st],_e=st+1,tn=R[_e];if(0>s(Tn,_))_e<$&&0>s(tn,Tn)?(R[L]=tn,R[_e]=_,L=_e):(R[L]=Tn,R[st]=_,L=st);else if(_e<$&&0>s(tn,_))R[L]=tn,R[_e]=_,L=_e;else break e}}return P}function s(R,P){var _=R.sortIndex-P.sortIndex;return _!==0?_:R.id-P.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var a=Date,o=a.now();e.unstable_now=function(){return a.now()-o}}var l=[],c=[],f=1,d=null,m=3,g=!1,v=!1,x=!1,k=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function p(R){for(var P=n(c);P!==null;){if(P.callback===null)r(c);else if(P.startTime<=R)r(c),P.sortIndex=P.expirationTime,t(l,P);else break;P=n(c)}}function b(R){if(x=!1,p(R),!v)if(n(l)!==null)v=!0,J(S);else{var P=n(c);P!==null&&ke(b,P.startTime-R)}}function S(R,P){v=!1,x&&(x=!1,y(N),N=-1),g=!0;var _=m;try{for(p(P),d=n(l);d!==null&&(!(d.expirationTime>P)||R&&!U());){var L=d.callback;if(typeof L=="function"){d.callback=null,m=d.priorityLevel;var $=L(d.expirationTime<=P);P=e.unstable_now(),typeof $=="function"?d.callback=$:d===n(l)&&r(l),p(P)}else r(l);d=n(l)}if(d!==null)var en=!0;else{var st=n(c);st!==null&&ke(b,st.startTime-P),en=!1}return en}finally{d=null,m=_,g=!1}}var j=!1,C=null,N=-1,M=5,T=-1;function U(){return!(e.unstable_now()-T<M)}function W(){if(C!==null){var R=e.unstable_now();T=R;var P=!0;try{P=C(!0,R)}finally{P?Q():(j=!1,C=null)}}else j=!1}var Q;if(typeof h=="function")Q=function(){h(W)};else if(typeof MessageChannel<"u"){var z=new MessageChannel,ge=z.port2;z.port1.onmessage=W,Q=function(){ge.postMessage(null)}}else Q=function(){k(W,0)};function J(R){C=R,j||(j=!0,Q())}function ke(R,P){N=k(function(){R(e.unstable_now())},P)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(R){R.callback=null},e.unstable_continueExecution=function(){v||g||(v=!0,J(S))},e.unstable_forceFrameRate=function(R){0>R||125<R?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<R?Math.floor(1e3/R):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(R){switch(m){case 1:case 2:case 3:var P=3;break;default:P=m}var _=m;m=P;try{return R()}finally{m=_}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(R,P){switch(R){case 1:case 2:case 3:case 4:case 5:break;default:R=3}var _=m;m=R;try{return P()}finally{m=_}},e.unstable_scheduleCallback=function(R,P,_){var L=e.unstable_now();switch(typeof _=="object"&&_!==null?(_=_.delay,_=typeof _=="number"&&0<_?L+_:L):_=L,R){case 1:var $=-1;break;case 2:$=250;break;case 5:$=1073741823;break;case 4:$=1e4;break;default:$=5e3}return $=_+$,R={id:f++,callback:P,priorityLevel:R,startTime:_,expirationTime:$,sortIndex:-1},_>L?(R.sortIndex=_,t(c,R),n(l)===null&&R===n(c)&&(x?(y(N),N=-1):x=!0,ke(b,_-L))):(R.sortIndex=$,t(l,R),v||g||(v=!0,J(S))),R},e.unstable_shouldYield=U,e.unstable_wrapCallback=function(R){var P=m;return function(){var _=m;m=P;try{return R.apply(this,arguments)}finally{m=_}}}})(Af);Mf.exports=Af;var Gg=Mf.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yg=w,Oe=Gg;function E(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Lf=new Set,$r={};function Cn(e,t){Zn(e,t),Zn(e+"Capture",t)}function Zn(e,t){for($r[e]=t,e=0;e<t.length;e++)Lf.add(t[e])}var xt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),so=Object.prototype.hasOwnProperty,Kg=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,$u={},zu={};function Qg(e){return so.call(zu,e)?!0:so.call($u,e)?!1:Kg.test(e)?zu[e]=!0:($u[e]=!0,!1)}function qg(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Jg(e,t,n,r){if(t===null||typeof t>"u"||qg(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ee(e,t,n,r,s,i,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var he={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){he[e]=new Ee(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];he[t]=new Ee(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){he[e]=new Ee(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){he[e]=new Ee(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){he[e]=new Ee(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){he[e]=new Ee(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){he[e]=new Ee(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){he[e]=new Ee(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){he[e]=new Ee(e,5,!1,e.toLowerCase(),null,!1,!1)});var wl=/[\-:]([a-z])/g;function bl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(wl,bl);he[t]=new Ee(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(wl,bl);he[t]=new Ee(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(wl,bl);he[t]=new Ee(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){he[e]=new Ee(e,1,!1,e.toLowerCase(),null,!1,!1)});he.xlinkHref=new Ee("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){he[e]=new Ee(e,1,!1,e.toLowerCase(),null,!0,!0)});function kl(e,t,n,r){var s=he.hasOwnProperty(t)?he[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Jg(t,n,s,r)&&(n=null),r||s===null?Qg(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Ct=Yg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ns=Symbol.for("react.element"),Mn=Symbol.for("react.portal"),An=Symbol.for("react.fragment"),Sl=Symbol.for("react.strict_mode"),io=Symbol.for("react.profiler"),_f=Symbol.for("react.provider"),Df=Symbol.for("react.context"),Cl=Symbol.for("react.forward_ref"),ao=Symbol.for("react.suspense"),oo=Symbol.for("react.suspense_list"),Nl=Symbol.for("react.memo"),Et=Symbol.for("react.lazy"),If=Symbol.for("react.offscreen"),Wu=Symbol.iterator;function pr(e){return e===null||typeof e!="object"?null:(e=Wu&&e[Wu]||e["@@iterator"],typeof e=="function"?e:null)}var ne=Object.assign,ga;function Cr(e){if(ga===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ga=t&&t[1]||""}return`
`+ga+e}var ya=!1;function va(e,t){if(!e||ya)return"";ya=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var s=c.stack.split(`
`),i=r.stack.split(`
`),a=s.length-1,o=i.length-1;1<=a&&0<=o&&s[a]!==i[o];)o--;for(;1<=a&&0<=o;a--,o--)if(s[a]!==i[o]){if(a!==1||o!==1)do if(a--,o--,0>o||s[a]!==i[o]){var l=`
`+s[a].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=a&&0<=o);break}}}finally{ya=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Cr(e):""}function Xg(e){switch(e.tag){case 5:return Cr(e.type);case 16:return Cr("Lazy");case 13:return Cr("Suspense");case 19:return Cr("SuspenseList");case 0:case 2:case 15:return e=va(e.type,!1),e;case 11:return e=va(e.type.render,!1),e;case 1:return e=va(e.type,!0),e;default:return""}}function lo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case An:return"Fragment";case Mn:return"Portal";case io:return"Profiler";case Sl:return"StrictMode";case ao:return"Suspense";case oo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Df:return(e.displayName||"Context")+".Consumer";case _f:return(e._context.displayName||"Context")+".Provider";case Cl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Nl:return t=e.displayName||null,t!==null?t:lo(e.type)||"Memo";case Et:t=e._payload,e=e._init;try{return lo(e(t))}catch{}}return null}function Zg(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return lo(t);case 8:return t===Sl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Ht(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Vf(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ey(e){var t=Vf(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(a){r=""+a,i.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function js(e){e._valueTracker||(e._valueTracker=ey(e))}function Of(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Vf(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function ii(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function uo(e,t){var n=t.checked;return ne({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Hu(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Ht(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ff(e,t){t=t.checked,t!=null&&kl(e,"checked",t,!1)}function co(e,t){Ff(e,t);var n=Ht(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?fo(e,t.type,n):t.hasOwnProperty("defaultValue")&&fo(e,t.type,Ht(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Gu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function fo(e,t,n){(t!=="number"||ii(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Nr=Array.isArray;function Yn(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Ht(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function mo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(E(91));return ne({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Yu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(E(92));if(Nr(n)){if(1<n.length)throw Error(E(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Ht(n)}}function Uf(e,t){var n=Ht(t.value),r=Ht(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ku(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Bf(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function po(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Bf(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Es,$f=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Es=Es||document.createElement("div"),Es.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Es.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function zr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Tr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ty=["Webkit","ms","Moz","O"];Object.keys(Tr).forEach(function(e){ty.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Tr[t]=Tr[e]})});function zf(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Tr.hasOwnProperty(e)&&Tr[e]?(""+t).trim():t+"px"}function Wf(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=zf(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var ny=ne({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ho(e,t){if(t){if(ny[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(E(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(E(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(E(61))}if(t.style!=null&&typeof t.style!="object")throw Error(E(62))}}function go(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var yo=null;function jl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var vo=null,Kn=null,Qn=null;function Qu(e){if(e=hs(e)){if(typeof vo!="function")throw Error(E(280));var t=e.stateNode;t&&(t=Gi(t),vo(e.stateNode,e.type,t))}}function Hf(e){Kn?Qn?Qn.push(e):Qn=[e]:Kn=e}function Gf(){if(Kn){var e=Kn,t=Qn;if(Qn=Kn=null,Qu(e),t)for(e=0;e<t.length;e++)Qu(t[e])}}function Yf(e,t){return e(t)}function Kf(){}var xa=!1;function Qf(e,t,n){if(xa)return e(t,n);xa=!0;try{return Yf(e,t,n)}finally{xa=!1,(Kn!==null||Qn!==null)&&(Kf(),Gf())}}function Wr(e,t){var n=e.stateNode;if(n===null)return null;var r=Gi(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(E(231,t,typeof n));return n}var xo=!1;if(xt)try{var hr={};Object.defineProperty(hr,"passive",{get:function(){xo=!0}}),window.addEventListener("test",hr,hr),window.removeEventListener("test",hr,hr)}catch{xo=!1}function ry(e,t,n,r,s,i,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(f){this.onError(f)}}var Rr=!1,ai=null,oi=!1,wo=null,sy={onError:function(e){Rr=!0,ai=e}};function iy(e,t,n,r,s,i,a,o,l){Rr=!1,ai=null,ry.apply(sy,arguments)}function ay(e,t,n,r,s,i,a,o,l){if(iy.apply(this,arguments),Rr){if(Rr){var c=ai;Rr=!1,ai=null}else throw Error(E(198));oi||(oi=!0,wo=c)}}function Nn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function qf(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function qu(e){if(Nn(e)!==e)throw Error(E(188))}function oy(e){var t=e.alternate;if(!t){if(t=Nn(e),t===null)throw Error(E(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return qu(s),e;if(i===r)return qu(s),t;i=i.sibling}throw Error(E(188))}if(n.return!==r.return)n=s,r=i;else{for(var a=!1,o=s.child;o;){if(o===n){a=!0,n=s,r=i;break}if(o===r){a=!0,r=s,n=i;break}o=o.sibling}if(!a){for(o=i.child;o;){if(o===n){a=!0,n=i,r=s;break}if(o===r){a=!0,r=i,n=s;break}o=o.sibling}if(!a)throw Error(E(189))}}if(n.alternate!==r)throw Error(E(190))}if(n.tag!==3)throw Error(E(188));return n.stateNode.current===n?e:t}function Jf(e){return e=oy(e),e!==null?Xf(e):null}function Xf(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Xf(e);if(t!==null)return t;e=e.sibling}return null}var Zf=Oe.unstable_scheduleCallback,Ju=Oe.unstable_cancelCallback,ly=Oe.unstable_shouldYield,uy=Oe.unstable_requestPaint,se=Oe.unstable_now,cy=Oe.unstable_getCurrentPriorityLevel,El=Oe.unstable_ImmediatePriority,em=Oe.unstable_UserBlockingPriority,li=Oe.unstable_NormalPriority,dy=Oe.unstable_LowPriority,tm=Oe.unstable_IdlePriority,$i=null,lt=null;function fy(e){if(lt&&typeof lt.onCommitFiberRoot=="function")try{lt.onCommitFiberRoot($i,e,void 0,(e.current.flags&128)===128)}catch{}}var tt=Math.clz32?Math.clz32:hy,my=Math.log,py=Math.LN2;function hy(e){return e>>>=0,e===0?32:31-(my(e)/py|0)|0}var Ps=64,Ts=4194304;function jr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ui(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,i=e.pingedLanes,a=n&268435455;if(a!==0){var o=a&~s;o!==0?r=jr(o):(i&=a,i!==0&&(r=jr(i)))}else a=n&~s,a!==0?r=jr(a):i!==0&&(r=jr(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,i=t&-t,s>=i||s===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-tt(t),s=1<<n,r|=e[n],t&=~s;return r}function gy(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function yy(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-tt(i),o=1<<a,l=s[a];l===-1?(!(o&n)||o&r)&&(s[a]=gy(o,t)):l<=t&&(e.expiredLanes|=o),i&=~o}}function bo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function nm(){var e=Ps;return Ps<<=1,!(Ps&4194240)&&(Ps=64),e}function wa(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ms(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-tt(t),e[t]=n}function vy(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-tt(n),i=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~i}}function Pl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-tt(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var B=0;function rm(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var sm,Tl,im,am,om,ko=!1,Rs=[],Dt=null,It=null,Vt=null,Hr=new Map,Gr=new Map,Rt=[],xy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Xu(e,t){switch(e){case"focusin":case"focusout":Dt=null;break;case"dragenter":case"dragleave":It=null;break;case"mouseover":case"mouseout":Vt=null;break;case"pointerover":case"pointerout":Hr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Gr.delete(t.pointerId)}}function gr(e,t,n,r,s,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},t!==null&&(t=hs(t),t!==null&&Tl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function wy(e,t,n,r,s){switch(t){case"focusin":return Dt=gr(Dt,e,t,n,r,s),!0;case"dragenter":return It=gr(It,e,t,n,r,s),!0;case"mouseover":return Vt=gr(Vt,e,t,n,r,s),!0;case"pointerover":var i=s.pointerId;return Hr.set(i,gr(Hr.get(i)||null,e,t,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,Gr.set(i,gr(Gr.get(i)||null,e,t,n,r,s)),!0}return!1}function lm(e){var t=dn(e.target);if(t!==null){var n=Nn(t);if(n!==null){if(t=n.tag,t===13){if(t=qf(n),t!==null){e.blockedOn=t,om(e.priority,function(){im(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ys(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=So(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);yo=r,n.target.dispatchEvent(r),yo=null}else return t=hs(n),t!==null&&Tl(t),e.blockedOn=n,!1;t.shift()}return!0}function Zu(e,t,n){Ys(e)&&n.delete(t)}function by(){ko=!1,Dt!==null&&Ys(Dt)&&(Dt=null),It!==null&&Ys(It)&&(It=null),Vt!==null&&Ys(Vt)&&(Vt=null),Hr.forEach(Zu),Gr.forEach(Zu)}function yr(e,t){e.blockedOn===t&&(e.blockedOn=null,ko||(ko=!0,Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority,by)))}function Yr(e){function t(s){return yr(s,e)}if(0<Rs.length){yr(Rs[0],e);for(var n=1;n<Rs.length;n++){var r=Rs[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Dt!==null&&yr(Dt,e),It!==null&&yr(It,e),Vt!==null&&yr(Vt,e),Hr.forEach(t),Gr.forEach(t),n=0;n<Rt.length;n++)r=Rt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Rt.length&&(n=Rt[0],n.blockedOn===null);)lm(n),n.blockedOn===null&&Rt.shift()}var qn=Ct.ReactCurrentBatchConfig,ci=!0;function ky(e,t,n,r){var s=B,i=qn.transition;qn.transition=null;try{B=1,Rl(e,t,n,r)}finally{B=s,qn.transition=i}}function Sy(e,t,n,r){var s=B,i=qn.transition;qn.transition=null;try{B=4,Rl(e,t,n,r)}finally{B=s,qn.transition=i}}function Rl(e,t,n,r){if(ci){var s=So(e,t,n,r);if(s===null)Ra(e,t,r,di,n),Xu(e,r);else if(wy(s,e,t,n,r))r.stopPropagation();else if(Xu(e,r),t&4&&-1<xy.indexOf(e)){for(;s!==null;){var i=hs(s);if(i!==null&&sm(i),i=So(e,t,n,r),i===null&&Ra(e,t,r,di,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Ra(e,t,r,null,n)}}var di=null;function So(e,t,n,r){if(di=null,e=jl(r),e=dn(e),e!==null)if(t=Nn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=qf(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return di=e,null}function um(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(cy()){case El:return 1;case em:return 4;case li:case dy:return 16;case tm:return 536870912;default:return 16}default:return 16}}var At=null,Ml=null,Ks=null;function cm(){if(Ks)return Ks;var e,t=Ml,n=t.length,r,s="value"in At?At.value:At.textContent,i=s.length;for(e=0;e<n&&t[e]===s[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===s[i-r];r++);return Ks=s.slice(e,1<r?1-r:void 0)}function Qs(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ms(){return!0}function ec(){return!1}function Be(e){function t(n,r,s,i,a){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ms:ec,this.isPropagationStopped=ec,this}return ne(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ms)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ms)},persist:function(){},isPersistent:Ms}),t}var dr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Al=Be(dr),ps=ne({},dr,{view:0,detail:0}),Cy=Be(ps),ba,ka,vr,zi=ne({},ps,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ll,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==vr&&(vr&&e.type==="mousemove"?(ba=e.screenX-vr.screenX,ka=e.screenY-vr.screenY):ka=ba=0,vr=e),ba)},movementY:function(e){return"movementY"in e?e.movementY:ka}}),tc=Be(zi),Ny=ne({},zi,{dataTransfer:0}),jy=Be(Ny),Ey=ne({},ps,{relatedTarget:0}),Sa=Be(Ey),Py=ne({},dr,{animationName:0,elapsedTime:0,pseudoElement:0}),Ty=Be(Py),Ry=ne({},dr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),My=Be(Ry),Ay=ne({},dr,{data:0}),nc=Be(Ay),Ly={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_y={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Dy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Iy(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Dy[e])?!!t[e]:!1}function Ll(){return Iy}var Vy=ne({},ps,{key:function(e){if(e.key){var t=Ly[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Qs(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?_y[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ll,charCode:function(e){return e.type==="keypress"?Qs(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Qs(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Oy=Be(Vy),Fy=ne({},zi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),rc=Be(Fy),Uy=ne({},ps,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ll}),By=Be(Uy),$y=ne({},dr,{propertyName:0,elapsedTime:0,pseudoElement:0}),zy=Be($y),Wy=ne({},zi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Hy=Be(Wy),Gy=[9,13,27,32],_l=xt&&"CompositionEvent"in window,Mr=null;xt&&"documentMode"in document&&(Mr=document.documentMode);var Yy=xt&&"TextEvent"in window&&!Mr,dm=xt&&(!_l||Mr&&8<Mr&&11>=Mr),sc=" ",ic=!1;function fm(e,t){switch(e){case"keyup":return Gy.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function mm(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ln=!1;function Ky(e,t){switch(e){case"compositionend":return mm(t);case"keypress":return t.which!==32?null:(ic=!0,sc);case"textInput":return e=t.data,e===sc&&ic?null:e;default:return null}}function Qy(e,t){if(Ln)return e==="compositionend"||!_l&&fm(e,t)?(e=cm(),Ks=Ml=At=null,Ln=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return dm&&t.locale!=="ko"?null:t.data;default:return null}}var qy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ac(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!qy[e.type]:t==="textarea"}function pm(e,t,n,r){Hf(r),t=fi(t,"onChange"),0<t.length&&(n=new Al("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Ar=null,Kr=null;function Jy(e){Nm(e,0)}function Wi(e){var t=In(e);if(Of(t))return e}function Xy(e,t){if(e==="change")return t}var hm=!1;if(xt){var Ca;if(xt){var Na="oninput"in document;if(!Na){var oc=document.createElement("div");oc.setAttribute("oninput","return;"),Na=typeof oc.oninput=="function"}Ca=Na}else Ca=!1;hm=Ca&&(!document.documentMode||9<document.documentMode)}function lc(){Ar&&(Ar.detachEvent("onpropertychange",gm),Kr=Ar=null)}function gm(e){if(e.propertyName==="value"&&Wi(Kr)){var t=[];pm(t,Kr,e,jl(e)),Qf(Jy,t)}}function Zy(e,t,n){e==="focusin"?(lc(),Ar=t,Kr=n,Ar.attachEvent("onpropertychange",gm)):e==="focusout"&&lc()}function ev(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Wi(Kr)}function tv(e,t){if(e==="click")return Wi(t)}function nv(e,t){if(e==="input"||e==="change")return Wi(t)}function rv(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var rt=typeof Object.is=="function"?Object.is:rv;function Qr(e,t){if(rt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!so.call(t,s)||!rt(e[s],t[s]))return!1}return!0}function uc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function cc(e,t){var n=uc(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=uc(n)}}function ym(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ym(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function vm(){for(var e=window,t=ii();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ii(e.document)}return t}function Dl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function sv(e){var t=vm(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&ym(n.ownerDocument.documentElement,n)){if(r!==null&&Dl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!e.extend&&i>r&&(s=r,r=i,i=s),s=cc(n,i);var a=cc(n,r);s&&a&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var iv=xt&&"documentMode"in document&&11>=document.documentMode,_n=null,Co=null,Lr=null,No=!1;function dc(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;No||_n==null||_n!==ii(r)||(r=_n,"selectionStart"in r&&Dl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Lr&&Qr(Lr,r)||(Lr=r,r=fi(Co,"onSelect"),0<r.length&&(t=new Al("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=_n)))}function As(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Dn={animationend:As("Animation","AnimationEnd"),animationiteration:As("Animation","AnimationIteration"),animationstart:As("Animation","AnimationStart"),transitionend:As("Transition","TransitionEnd")},ja={},xm={};xt&&(xm=document.createElement("div").style,"AnimationEvent"in window||(delete Dn.animationend.animation,delete Dn.animationiteration.animation,delete Dn.animationstart.animation),"TransitionEvent"in window||delete Dn.transitionend.transition);function Hi(e){if(ja[e])return ja[e];if(!Dn[e])return e;var t=Dn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in xm)return ja[e]=t[n];return e}var wm=Hi("animationend"),bm=Hi("animationiteration"),km=Hi("animationstart"),Sm=Hi("transitionend"),Cm=new Map,fc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Qt(e,t){Cm.set(e,t),Cn(t,[e])}for(var Ea=0;Ea<fc.length;Ea++){var Pa=fc[Ea],av=Pa.toLowerCase(),ov=Pa[0].toUpperCase()+Pa.slice(1);Qt(av,"on"+ov)}Qt(wm,"onAnimationEnd");Qt(bm,"onAnimationIteration");Qt(km,"onAnimationStart");Qt("dblclick","onDoubleClick");Qt("focusin","onFocus");Qt("focusout","onBlur");Qt(Sm,"onTransitionEnd");Zn("onMouseEnter",["mouseout","mouseover"]);Zn("onMouseLeave",["mouseout","mouseover"]);Zn("onPointerEnter",["pointerout","pointerover"]);Zn("onPointerLeave",["pointerout","pointerover"]);Cn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Cn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Cn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Cn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Cn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Cn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Er="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),lv=new Set("cancel close invalid load scroll toggle".split(" ").concat(Er));function mc(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,ay(r,t,void 0,e),e.currentTarget=null}function Nm(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var a=r.length-1;0<=a;a--){var o=r[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==i&&s.isPropagationStopped())break e;mc(s,o,c),i=l}else for(a=0;a<r.length;a++){if(o=r[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==i&&s.isPropagationStopped())break e;mc(s,o,c),i=l}}}if(oi)throw e=wo,oi=!1,wo=null,e}function Y(e,t){var n=t[Ro];n===void 0&&(n=t[Ro]=new Set);var r=e+"__bubble";n.has(r)||(jm(t,e,2,!1),n.add(r))}function Ta(e,t,n){var r=0;t&&(r|=4),jm(n,e,r,t)}var Ls="_reactListening"+Math.random().toString(36).slice(2);function qr(e){if(!e[Ls]){e[Ls]=!0,Lf.forEach(function(n){n!=="selectionchange"&&(lv.has(n)||Ta(n,!1,e),Ta(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ls]||(t[Ls]=!0,Ta("selectionchange",!1,t))}}function jm(e,t,n,r){switch(um(t)){case 1:var s=ky;break;case 4:s=Sy;break;default:s=Rl}n=s.bind(null,t,n,e),s=void 0,!xo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Ra(e,t,n,r,s){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var o=r.stateNode.containerInfo;if(o===s||o.nodeType===8&&o.parentNode===s)break;if(a===4)for(a=r.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===s||l.nodeType===8&&l.parentNode===s))return;a=a.return}for(;o!==null;){if(a=dn(o),a===null)return;if(l=a.tag,l===5||l===6){r=i=a;continue e}o=o.parentNode}}r=r.return}Qf(function(){var c=i,f=jl(n),d=[];e:{var m=Cm.get(e);if(m!==void 0){var g=Al,v=e;switch(e){case"keypress":if(Qs(n)===0)break e;case"keydown":case"keyup":g=Oy;break;case"focusin":v="focus",g=Sa;break;case"focusout":v="blur",g=Sa;break;case"beforeblur":case"afterblur":g=Sa;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=tc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=jy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=By;break;case wm:case bm:case km:g=Ty;break;case Sm:g=zy;break;case"scroll":g=Cy;break;case"wheel":g=Hy;break;case"copy":case"cut":case"paste":g=My;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=rc}var x=(t&4)!==0,k=!x&&e==="scroll",y=x?m!==null?m+"Capture":null:m;x=[];for(var h=c,p;h!==null;){p=h;var b=p.stateNode;if(p.tag===5&&b!==null&&(p=b,y!==null&&(b=Wr(h,y),b!=null&&x.push(Jr(h,b,p)))),k)break;h=h.return}0<x.length&&(m=new g(m,v,null,n,f),d.push({event:m,listeners:x}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",g=e==="mouseout"||e==="pointerout",m&&n!==yo&&(v=n.relatedTarget||n.fromElement)&&(dn(v)||v[wt]))break e;if((g||m)&&(m=f.window===f?f:(m=f.ownerDocument)?m.defaultView||m.parentWindow:window,g?(v=n.relatedTarget||n.toElement,g=c,v=v?dn(v):null,v!==null&&(k=Nn(v),v!==k||v.tag!==5&&v.tag!==6)&&(v=null)):(g=null,v=c),g!==v)){if(x=tc,b="onMouseLeave",y="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(x=rc,b="onPointerLeave",y="onPointerEnter",h="pointer"),k=g==null?m:In(g),p=v==null?m:In(v),m=new x(b,h+"leave",g,n,f),m.target=k,m.relatedTarget=p,b=null,dn(f)===c&&(x=new x(y,h+"enter",v,n,f),x.target=p,x.relatedTarget=k,b=x),k=b,g&&v)t:{for(x=g,y=v,h=0,p=x;p;p=Rn(p))h++;for(p=0,b=y;b;b=Rn(b))p++;for(;0<h-p;)x=Rn(x),h--;for(;0<p-h;)y=Rn(y),p--;for(;h--;){if(x===y||y!==null&&x===y.alternate)break t;x=Rn(x),y=Rn(y)}x=null}else x=null;g!==null&&pc(d,m,g,x,!1),v!==null&&k!==null&&pc(d,k,v,x,!0)}}e:{if(m=c?In(c):window,g=m.nodeName&&m.nodeName.toLowerCase(),g==="select"||g==="input"&&m.type==="file")var S=Xy;else if(ac(m))if(hm)S=nv;else{S=ev;var j=Zy}else(g=m.nodeName)&&g.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(S=tv);if(S&&(S=S(e,c))){pm(d,S,n,f);break e}j&&j(e,m,c),e==="focusout"&&(j=m._wrapperState)&&j.controlled&&m.type==="number"&&fo(m,"number",m.value)}switch(j=c?In(c):window,e){case"focusin":(ac(j)||j.contentEditable==="true")&&(_n=j,Co=c,Lr=null);break;case"focusout":Lr=Co=_n=null;break;case"mousedown":No=!0;break;case"contextmenu":case"mouseup":case"dragend":No=!1,dc(d,n,f);break;case"selectionchange":if(iv)break;case"keydown":case"keyup":dc(d,n,f)}var C;if(_l)e:{switch(e){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else Ln?fm(e,n)&&(N="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(N="onCompositionStart");N&&(dm&&n.locale!=="ko"&&(Ln||N!=="onCompositionStart"?N==="onCompositionEnd"&&Ln&&(C=cm()):(At=f,Ml="value"in At?At.value:At.textContent,Ln=!0)),j=fi(c,N),0<j.length&&(N=new nc(N,e,null,n,f),d.push({event:N,listeners:j}),C?N.data=C:(C=mm(n),C!==null&&(N.data=C)))),(C=Yy?Ky(e,n):Qy(e,n))&&(c=fi(c,"onBeforeInput"),0<c.length&&(f=new nc("onBeforeInput","beforeinput",null,n,f),d.push({event:f,listeners:c}),f.data=C))}Nm(d,t)})}function Jr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function fi(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=Wr(e,n),i!=null&&r.unshift(Jr(e,i,s)),i=Wr(e,t),i!=null&&r.push(Jr(e,i,s))),e=e.return}return r}function Rn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function pc(e,t,n,r,s){for(var i=t._reactName,a=[];n!==null&&n!==r;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===r)break;o.tag===5&&c!==null&&(o=c,s?(l=Wr(n,i),l!=null&&a.unshift(Jr(n,l,o))):s||(l=Wr(n,i),l!=null&&a.push(Jr(n,l,o)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var uv=/\r\n?/g,cv=/\u0000|\uFFFD/g;function hc(e){return(typeof e=="string"?e:""+e).replace(uv,`
`).replace(cv,"")}function _s(e,t,n){if(t=hc(t),hc(e)!==t&&n)throw Error(E(425))}function mi(){}var jo=null,Eo=null;function Po(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var To=typeof setTimeout=="function"?setTimeout:void 0,dv=typeof clearTimeout=="function"?clearTimeout:void 0,gc=typeof Promise=="function"?Promise:void 0,fv=typeof queueMicrotask=="function"?queueMicrotask:typeof gc<"u"?function(e){return gc.resolve(null).then(e).catch(mv)}:To;function mv(e){setTimeout(function(){throw e})}function Ma(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),Yr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);Yr(t)}function Ot(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function yc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var fr=Math.random().toString(36).slice(2),ot="__reactFiber$"+fr,Xr="__reactProps$"+fr,wt="__reactContainer$"+fr,Ro="__reactEvents$"+fr,pv="__reactListeners$"+fr,hv="__reactHandles$"+fr;function dn(e){var t=e[ot];if(t)return t;for(var n=e.parentNode;n;){if(t=n[wt]||n[ot]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=yc(e);e!==null;){if(n=e[ot])return n;e=yc(e)}return t}e=n,n=e.parentNode}return null}function hs(e){return e=e[ot]||e[wt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function In(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(E(33))}function Gi(e){return e[Xr]||null}var Mo=[],Vn=-1;function qt(e){return{current:e}}function K(e){0>Vn||(e.current=Mo[Vn],Mo[Vn]=null,Vn--)}function H(e,t){Vn++,Mo[Vn]=e.current,e.current=t}var Gt={},be=qt(Gt),Re=qt(!1),xn=Gt;function er(e,t){var n=e.type.contextTypes;if(!n)return Gt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Me(e){return e=e.childContextTypes,e!=null}function pi(){K(Re),K(be)}function vc(e,t,n){if(be.current!==Gt)throw Error(E(168));H(be,t),H(Re,n)}function Em(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(E(108,Zg(e)||"Unknown",s));return ne({},n,r)}function hi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Gt,xn=be.current,H(be,e),H(Re,Re.current),!0}function xc(e,t,n){var r=e.stateNode;if(!r)throw Error(E(169));n?(e=Em(e,t,xn),r.__reactInternalMemoizedMergedChildContext=e,K(Re),K(be),H(be,e)):K(Re),H(Re,n)}var ft=null,Yi=!1,Aa=!1;function Pm(e){ft===null?ft=[e]:ft.push(e)}function gv(e){Yi=!0,Pm(e)}function Jt(){if(!Aa&&ft!==null){Aa=!0;var e=0,t=B;try{var n=ft;for(B=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ft=null,Yi=!1}catch(s){throw ft!==null&&(ft=ft.slice(e+1)),Zf(El,Jt),s}finally{B=t,Aa=!1}}return null}var On=[],Fn=0,gi=null,yi=0,We=[],He=0,wn=null,mt=1,pt="";function an(e,t){On[Fn++]=yi,On[Fn++]=gi,gi=e,yi=t}function Tm(e,t,n){We[He++]=mt,We[He++]=pt,We[He++]=wn,wn=e;var r=mt;e=pt;var s=32-tt(r)-1;r&=~(1<<s),n+=1;var i=32-tt(t)+s;if(30<i){var a=s-s%5;i=(r&(1<<a)-1).toString(32),r>>=a,s-=a,mt=1<<32-tt(t)+s|n<<s|r,pt=i+e}else mt=1<<i|n<<s|r,pt=e}function Il(e){e.return!==null&&(an(e,1),Tm(e,1,0))}function Vl(e){for(;e===gi;)gi=On[--Fn],On[Fn]=null,yi=On[--Fn],On[Fn]=null;for(;e===wn;)wn=We[--He],We[He]=null,pt=We[--He],We[He]=null,mt=We[--He],We[He]=null}var Ve=null,Ie=null,q=!1,et=null;function Rm(e,t){var n=Ge(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function wc(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ve=e,Ie=Ot(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ve=e,Ie=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=wn!==null?{id:mt,overflow:pt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ge(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ve=e,Ie=null,!0):!1;default:return!1}}function Ao(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Lo(e){if(q){var t=Ie;if(t){var n=t;if(!wc(e,t)){if(Ao(e))throw Error(E(418));t=Ot(n.nextSibling);var r=Ve;t&&wc(e,t)?Rm(r,n):(e.flags=e.flags&-4097|2,q=!1,Ve=e)}}else{if(Ao(e))throw Error(E(418));e.flags=e.flags&-4097|2,q=!1,Ve=e}}}function bc(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ve=e}function Ds(e){if(e!==Ve)return!1;if(!q)return bc(e),q=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Po(e.type,e.memoizedProps)),t&&(t=Ie)){if(Ao(e))throw Mm(),Error(E(418));for(;t;)Rm(e,t),t=Ot(t.nextSibling)}if(bc(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(E(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ie=Ot(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ie=null}}else Ie=Ve?Ot(e.stateNode.nextSibling):null;return!0}function Mm(){for(var e=Ie;e;)e=Ot(e.nextSibling)}function tr(){Ie=Ve=null,q=!1}function Ol(e){et===null?et=[e]:et.push(e)}var yv=Ct.ReactCurrentBatchConfig;function xr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(E(309));var r=n.stateNode}if(!r)throw Error(E(147,e));var s=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(a){var o=s.refs;a===null?delete o[i]:o[i]=a},t._stringRef=i,t)}if(typeof e!="string")throw Error(E(284));if(!n._owner)throw Error(E(290,e))}return e}function Is(e,t){throw e=Object.prototype.toString.call(t),Error(E(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function kc(e){var t=e._init;return t(e._payload)}function Am(e){function t(y,h){if(e){var p=y.deletions;p===null?(y.deletions=[h],y.flags|=16):p.push(h)}}function n(y,h){if(!e)return null;for(;h!==null;)t(y,h),h=h.sibling;return null}function r(y,h){for(y=new Map;h!==null;)h.key!==null?y.set(h.key,h):y.set(h.index,h),h=h.sibling;return y}function s(y,h){return y=$t(y,h),y.index=0,y.sibling=null,y}function i(y,h,p){return y.index=p,e?(p=y.alternate,p!==null?(p=p.index,p<h?(y.flags|=2,h):p):(y.flags|=2,h)):(y.flags|=1048576,h)}function a(y){return e&&y.alternate===null&&(y.flags|=2),y}function o(y,h,p,b){return h===null||h.tag!==6?(h=Fa(p,y.mode,b),h.return=y,h):(h=s(h,p),h.return=y,h)}function l(y,h,p,b){var S=p.type;return S===An?f(y,h,p.props.children,b,p.key):h!==null&&(h.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Et&&kc(S)===h.type)?(b=s(h,p.props),b.ref=xr(y,h,p),b.return=y,b):(b=ni(p.type,p.key,p.props,null,y.mode,b),b.ref=xr(y,h,p),b.return=y,b)}function c(y,h,p,b){return h===null||h.tag!==4||h.stateNode.containerInfo!==p.containerInfo||h.stateNode.implementation!==p.implementation?(h=Ua(p,y.mode,b),h.return=y,h):(h=s(h,p.children||[]),h.return=y,h)}function f(y,h,p,b,S){return h===null||h.tag!==7?(h=gn(p,y.mode,b,S),h.return=y,h):(h=s(h,p),h.return=y,h)}function d(y,h,p){if(typeof h=="string"&&h!==""||typeof h=="number")return h=Fa(""+h,y.mode,p),h.return=y,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Ns:return p=ni(h.type,h.key,h.props,null,y.mode,p),p.ref=xr(y,null,h),p.return=y,p;case Mn:return h=Ua(h,y.mode,p),h.return=y,h;case Et:var b=h._init;return d(y,b(h._payload),p)}if(Nr(h)||pr(h))return h=gn(h,y.mode,p,null),h.return=y,h;Is(y,h)}return null}function m(y,h,p,b){var S=h!==null?h.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return S!==null?null:o(y,h,""+p,b);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Ns:return p.key===S?l(y,h,p,b):null;case Mn:return p.key===S?c(y,h,p,b):null;case Et:return S=p._init,m(y,h,S(p._payload),b)}if(Nr(p)||pr(p))return S!==null?null:f(y,h,p,b,null);Is(y,p)}return null}function g(y,h,p,b,S){if(typeof b=="string"&&b!==""||typeof b=="number")return y=y.get(p)||null,o(h,y,""+b,S);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Ns:return y=y.get(b.key===null?p:b.key)||null,l(h,y,b,S);case Mn:return y=y.get(b.key===null?p:b.key)||null,c(h,y,b,S);case Et:var j=b._init;return g(y,h,p,j(b._payload),S)}if(Nr(b)||pr(b))return y=y.get(p)||null,f(h,y,b,S,null);Is(h,b)}return null}function v(y,h,p,b){for(var S=null,j=null,C=h,N=h=0,M=null;C!==null&&N<p.length;N++){C.index>N?(M=C,C=null):M=C.sibling;var T=m(y,C,p[N],b);if(T===null){C===null&&(C=M);break}e&&C&&T.alternate===null&&t(y,C),h=i(T,h,N),j===null?S=T:j.sibling=T,j=T,C=M}if(N===p.length)return n(y,C),q&&an(y,N),S;if(C===null){for(;N<p.length;N++)C=d(y,p[N],b),C!==null&&(h=i(C,h,N),j===null?S=C:j.sibling=C,j=C);return q&&an(y,N),S}for(C=r(y,C);N<p.length;N++)M=g(C,y,N,p[N],b),M!==null&&(e&&M.alternate!==null&&C.delete(M.key===null?N:M.key),h=i(M,h,N),j===null?S=M:j.sibling=M,j=M);return e&&C.forEach(function(U){return t(y,U)}),q&&an(y,N),S}function x(y,h,p,b){var S=pr(p);if(typeof S!="function")throw Error(E(150));if(p=S.call(p),p==null)throw Error(E(151));for(var j=S=null,C=h,N=h=0,M=null,T=p.next();C!==null&&!T.done;N++,T=p.next()){C.index>N?(M=C,C=null):M=C.sibling;var U=m(y,C,T.value,b);if(U===null){C===null&&(C=M);break}e&&C&&U.alternate===null&&t(y,C),h=i(U,h,N),j===null?S=U:j.sibling=U,j=U,C=M}if(T.done)return n(y,C),q&&an(y,N),S;if(C===null){for(;!T.done;N++,T=p.next())T=d(y,T.value,b),T!==null&&(h=i(T,h,N),j===null?S=T:j.sibling=T,j=T);return q&&an(y,N),S}for(C=r(y,C);!T.done;N++,T=p.next())T=g(C,y,N,T.value,b),T!==null&&(e&&T.alternate!==null&&C.delete(T.key===null?N:T.key),h=i(T,h,N),j===null?S=T:j.sibling=T,j=T);return e&&C.forEach(function(W){return t(y,W)}),q&&an(y,N),S}function k(y,h,p,b){if(typeof p=="object"&&p!==null&&p.type===An&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case Ns:e:{for(var S=p.key,j=h;j!==null;){if(j.key===S){if(S=p.type,S===An){if(j.tag===7){n(y,j.sibling),h=s(j,p.props.children),h.return=y,y=h;break e}}else if(j.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Et&&kc(S)===j.type){n(y,j.sibling),h=s(j,p.props),h.ref=xr(y,j,p),h.return=y,y=h;break e}n(y,j);break}else t(y,j);j=j.sibling}p.type===An?(h=gn(p.props.children,y.mode,b,p.key),h.return=y,y=h):(b=ni(p.type,p.key,p.props,null,y.mode,b),b.ref=xr(y,h,p),b.return=y,y=b)}return a(y);case Mn:e:{for(j=p.key;h!==null;){if(h.key===j)if(h.tag===4&&h.stateNode.containerInfo===p.containerInfo&&h.stateNode.implementation===p.implementation){n(y,h.sibling),h=s(h,p.children||[]),h.return=y,y=h;break e}else{n(y,h);break}else t(y,h);h=h.sibling}h=Ua(p,y.mode,b),h.return=y,y=h}return a(y);case Et:return j=p._init,k(y,h,j(p._payload),b)}if(Nr(p))return v(y,h,p,b);if(pr(p))return x(y,h,p,b);Is(y,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,h!==null&&h.tag===6?(n(y,h.sibling),h=s(h,p),h.return=y,y=h):(n(y,h),h=Fa(p,y.mode,b),h.return=y,y=h),a(y)):n(y,h)}return k}var nr=Am(!0),Lm=Am(!1),vi=qt(null),xi=null,Un=null,Fl=null;function Ul(){Fl=Un=xi=null}function Bl(e){var t=vi.current;K(vi),e._currentValue=t}function _o(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Jn(e,t){xi=e,Fl=Un=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Te=!0),e.firstContext=null)}function Ke(e){var t=e._currentValue;if(Fl!==e)if(e={context:e,memoizedValue:t,next:null},Un===null){if(xi===null)throw Error(E(308));Un=e,xi.dependencies={lanes:0,firstContext:e}}else Un=Un.next=e;return t}var fn=null;function $l(e){fn===null?fn=[e]:fn.push(e)}function _m(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,$l(t)):(n.next=s.next,s.next=n),t.interleaved=n,bt(e,r)}function bt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Pt=!1;function zl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Dm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function gt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Ft(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,F&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,bt(e,n)}return s=r.interleaved,s===null?(t.next=t,$l(r)):(t.next=s.next,s.next=t),r.interleaved=t,bt(e,n)}function qs(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Pl(e,n)}}function Sc(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=a:i=i.next=a,n=n.next}while(n!==null);i===null?s=i=t:i=i.next=t}else s=i=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function wi(e,t,n,r){var s=e.updateQueue;Pt=!1;var i=s.firstBaseUpdate,a=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?i=c:a.next=c,a=l;var f=e.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==a&&(o===null?f.firstBaseUpdate=c:o.next=c,f.lastBaseUpdate=l))}if(i!==null){var d=s.baseState;a=0,f=c=l=null,o=i;do{var m=o.lane,g=o.eventTime;if((r&m)===m){f!==null&&(f=f.next={eventTime:g,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var v=e,x=o;switch(m=t,g=n,x.tag){case 1:if(v=x.payload,typeof v=="function"){d=v.call(g,d,m);break e}d=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=x.payload,m=typeof v=="function"?v.call(g,d,m):v,m==null)break e;d=ne({},d,m);break e;case 2:Pt=!0}}o.callback!==null&&o.lane!==0&&(e.flags|=64,m=s.effects,m===null?s.effects=[o]:m.push(o))}else g={eventTime:g,lane:m,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(c=f=g,l=d):f=f.next=g,a|=m;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;m=o,o=m.next,m.next=null,s.lastBaseUpdate=m,s.shared.pending=null}}while(!0);if(f===null&&(l=d),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=f,t=s.shared.interleaved,t!==null){s=t;do a|=s.lane,s=s.next;while(s!==t)}else i===null&&(s.shared.lanes=0);kn|=a,e.lanes=a,e.memoizedState=d}}function Cc(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(E(191,s));s.call(r)}}}var gs={},ut=qt(gs),Zr=qt(gs),es=qt(gs);function mn(e){if(e===gs)throw Error(E(174));return e}function Wl(e,t){switch(H(es,t),H(Zr,e),H(ut,gs),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:po(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=po(t,e)}K(ut),H(ut,t)}function rr(){K(ut),K(Zr),K(es)}function Im(e){mn(es.current);var t=mn(ut.current),n=po(t,e.type);t!==n&&(H(Zr,e),H(ut,n))}function Hl(e){Zr.current===e&&(K(ut),K(Zr))}var X=qt(0);function bi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var La=[];function Gl(){for(var e=0;e<La.length;e++)La[e]._workInProgressVersionPrimary=null;La.length=0}var Js=Ct.ReactCurrentDispatcher,_a=Ct.ReactCurrentBatchConfig,bn=0,te=null,ue=null,de=null,ki=!1,_r=!1,ts=0,vv=0;function ye(){throw Error(E(321))}function Yl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!rt(e[n],t[n]))return!1;return!0}function Kl(e,t,n,r,s,i){if(bn=i,te=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Js.current=e===null||e.memoizedState===null?kv:Sv,e=n(r,s),_r){i=0;do{if(_r=!1,ts=0,25<=i)throw Error(E(301));i+=1,de=ue=null,t.updateQueue=null,Js.current=Cv,e=n(r,s)}while(_r)}if(Js.current=Si,t=ue!==null&&ue.next!==null,bn=0,de=ue=te=null,ki=!1,t)throw Error(E(300));return e}function Ql(){var e=ts!==0;return ts=0,e}function at(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return de===null?te.memoizedState=de=e:de=de.next=e,de}function Qe(){if(ue===null){var e=te.alternate;e=e!==null?e.memoizedState:null}else e=ue.next;var t=de===null?te.memoizedState:de.next;if(t!==null)de=t,ue=e;else{if(e===null)throw Error(E(310));ue=e,e={memoizedState:ue.memoizedState,baseState:ue.baseState,baseQueue:ue.baseQueue,queue:ue.queue,next:null},de===null?te.memoizedState=de=e:de=de.next=e}return de}function ns(e,t){return typeof t=="function"?t(e):t}function Da(e){var t=Qe(),n=t.queue;if(n===null)throw Error(E(311));n.lastRenderedReducer=e;var r=ue,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var a=s.next;s.next=i.next,i.next=a}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var o=a=null,l=null,c=i;do{var f=c.lane;if((bn&f)===f)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var d={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=d,a=r):l=l.next=d,te.lanes|=f,kn|=f}c=c.next}while(c!==null&&c!==i);l===null?a=r:l.next=o,rt(r,t.memoizedState)||(Te=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do i=s.lane,te.lanes|=i,kn|=i,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ia(e){var t=Qe(),n=t.queue;if(n===null)throw Error(E(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,i=t.memoizedState;if(s!==null){n.pending=null;var a=s=s.next;do i=e(i,a.action),a=a.next;while(a!==s);rt(i,t.memoizedState)||(Te=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Vm(){}function Om(e,t){var n=te,r=Qe(),s=t(),i=!rt(r.memoizedState,s);if(i&&(r.memoizedState=s,Te=!0),r=r.queue,ql(Bm.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||de!==null&&de.memoizedState.tag&1){if(n.flags|=2048,rs(9,Um.bind(null,n,r,s,t),void 0,null),fe===null)throw Error(E(349));bn&30||Fm(n,t,s)}return s}function Fm(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=te.updateQueue,t===null?(t={lastEffect:null,stores:null},te.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Um(e,t,n,r){t.value=n,t.getSnapshot=r,$m(t)&&zm(e)}function Bm(e,t,n){return n(function(){$m(t)&&zm(e)})}function $m(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!rt(e,n)}catch{return!0}}function zm(e){var t=bt(e,1);t!==null&&nt(t,e,1,-1)}function Nc(e){var t=at();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ns,lastRenderedState:e},t.queue=e,e=e.dispatch=bv.bind(null,te,e),[t.memoizedState,e]}function rs(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=te.updateQueue,t===null?(t={lastEffect:null,stores:null},te.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Wm(){return Qe().memoizedState}function Xs(e,t,n,r){var s=at();te.flags|=e,s.memoizedState=rs(1|t,n,void 0,r===void 0?null:r)}function Ki(e,t,n,r){var s=Qe();r=r===void 0?null:r;var i=void 0;if(ue!==null){var a=ue.memoizedState;if(i=a.destroy,r!==null&&Yl(r,a.deps)){s.memoizedState=rs(t,n,i,r);return}}te.flags|=e,s.memoizedState=rs(1|t,n,i,r)}function jc(e,t){return Xs(8390656,8,e,t)}function ql(e,t){return Ki(2048,8,e,t)}function Hm(e,t){return Ki(4,2,e,t)}function Gm(e,t){return Ki(4,4,e,t)}function Ym(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Km(e,t,n){return n=n!=null?n.concat([e]):null,Ki(4,4,Ym.bind(null,t,e),n)}function Jl(){}function Qm(e,t){var n=Qe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Yl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function qm(e,t){var n=Qe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Yl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Jm(e,t,n){return bn&21?(rt(n,t)||(n=nm(),te.lanes|=n,kn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Te=!0),e.memoizedState=n)}function xv(e,t){var n=B;B=n!==0&&4>n?n:4,e(!0);var r=_a.transition;_a.transition={};try{e(!1),t()}finally{B=n,_a.transition=r}}function Xm(){return Qe().memoizedState}function wv(e,t,n){var r=Bt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Zm(e))ep(t,n);else if(n=_m(e,t,n,r),n!==null){var s=Ne();nt(n,e,r,s),tp(n,t,r)}}function bv(e,t,n){var r=Bt(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Zm(e))ep(t,s);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var a=t.lastRenderedState,o=i(a,n);if(s.hasEagerState=!0,s.eagerState=o,rt(o,a)){var l=t.interleaved;l===null?(s.next=s,$l(t)):(s.next=l.next,l.next=s),t.interleaved=s;return}}catch{}finally{}n=_m(e,t,s,r),n!==null&&(s=Ne(),nt(n,e,r,s),tp(n,t,r))}}function Zm(e){var t=e.alternate;return e===te||t!==null&&t===te}function ep(e,t){_r=ki=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function tp(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Pl(e,n)}}var Si={readContext:Ke,useCallback:ye,useContext:ye,useEffect:ye,useImperativeHandle:ye,useInsertionEffect:ye,useLayoutEffect:ye,useMemo:ye,useReducer:ye,useRef:ye,useState:ye,useDebugValue:ye,useDeferredValue:ye,useTransition:ye,useMutableSource:ye,useSyncExternalStore:ye,useId:ye,unstable_isNewReconciler:!1},kv={readContext:Ke,useCallback:function(e,t){return at().memoizedState=[e,t===void 0?null:t],e},useContext:Ke,useEffect:jc,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Xs(4194308,4,Ym.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Xs(4194308,4,e,t)},useInsertionEffect:function(e,t){return Xs(4,2,e,t)},useMemo:function(e,t){var n=at();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=at();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=wv.bind(null,te,e),[r.memoizedState,e]},useRef:function(e){var t=at();return e={current:e},t.memoizedState=e},useState:Nc,useDebugValue:Jl,useDeferredValue:function(e){return at().memoizedState=e},useTransition:function(){var e=Nc(!1),t=e[0];return e=xv.bind(null,e[1]),at().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=te,s=at();if(q){if(n===void 0)throw Error(E(407));n=n()}else{if(n=t(),fe===null)throw Error(E(349));bn&30||Fm(r,t,n)}s.memoizedState=n;var i={value:n,getSnapshot:t};return s.queue=i,jc(Bm.bind(null,r,i,e),[e]),r.flags|=2048,rs(9,Um.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=at(),t=fe.identifierPrefix;if(q){var n=pt,r=mt;n=(r&~(1<<32-tt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=ts++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=vv++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Sv={readContext:Ke,useCallback:Qm,useContext:Ke,useEffect:ql,useImperativeHandle:Km,useInsertionEffect:Hm,useLayoutEffect:Gm,useMemo:qm,useReducer:Da,useRef:Wm,useState:function(){return Da(ns)},useDebugValue:Jl,useDeferredValue:function(e){var t=Qe();return Jm(t,ue.memoizedState,e)},useTransition:function(){var e=Da(ns)[0],t=Qe().memoizedState;return[e,t]},useMutableSource:Vm,useSyncExternalStore:Om,useId:Xm,unstable_isNewReconciler:!1},Cv={readContext:Ke,useCallback:Qm,useContext:Ke,useEffect:ql,useImperativeHandle:Km,useInsertionEffect:Hm,useLayoutEffect:Gm,useMemo:qm,useReducer:Ia,useRef:Wm,useState:function(){return Ia(ns)},useDebugValue:Jl,useDeferredValue:function(e){var t=Qe();return ue===null?t.memoizedState=e:Jm(t,ue.memoizedState,e)},useTransition:function(){var e=Ia(ns)[0],t=Qe().memoizedState;return[e,t]},useMutableSource:Vm,useSyncExternalStore:Om,useId:Xm,unstable_isNewReconciler:!1};function Xe(e,t){if(e&&e.defaultProps){t=ne({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Do(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ne({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Qi={isMounted:function(e){return(e=e._reactInternals)?Nn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ne(),s=Bt(e),i=gt(r,s);i.payload=t,n!=null&&(i.callback=n),t=Ft(e,i,s),t!==null&&(nt(t,e,s,r),qs(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ne(),s=Bt(e),i=gt(r,s);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ft(e,i,s),t!==null&&(nt(t,e,s,r),qs(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ne(),r=Bt(e),s=gt(n,r);s.tag=2,t!=null&&(s.callback=t),t=Ft(e,s,r),t!==null&&(nt(t,e,r,n),qs(t,e,r))}};function Ec(e,t,n,r,s,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,a):t.prototype&&t.prototype.isPureReactComponent?!Qr(n,r)||!Qr(s,i):!0}function np(e,t,n){var r=!1,s=Gt,i=t.contextType;return typeof i=="object"&&i!==null?i=Ke(i):(s=Me(t)?xn:be.current,r=t.contextTypes,i=(r=r!=null)?er(e,s):Gt),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Qi,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=i),t}function Pc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Qi.enqueueReplaceState(t,t.state,null)}function Io(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},zl(e);var i=t.contextType;typeof i=="object"&&i!==null?s.context=Ke(i):(i=Me(t)?xn:be.current,s.context=er(e,i)),s.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Do(e,t,i,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&Qi.enqueueReplaceState(s,s.state,null),wi(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function sr(e,t){try{var n="",r=t;do n+=Xg(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:s,digest:null}}function Va(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Vo(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Nv=typeof WeakMap=="function"?WeakMap:Map;function rp(e,t,n){n=gt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Ni||(Ni=!0,Yo=r),Vo(e,t)},n}function sp(e,t,n){n=gt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){Vo(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Vo(e,t),typeof r!="function"&&(Ut===null?Ut=new Set([this]):Ut.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function Tc(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Nv;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=Fv.bind(null,e,t,n),t.then(e,e))}function Rc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Mc(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=gt(-1,1),t.tag=2,Ft(n,t,1))),n.lanes|=1),e)}var jv=Ct.ReactCurrentOwner,Te=!1;function Ce(e,t,n,r){t.child=e===null?Lm(t,null,n,r):nr(t,e.child,n,r)}function Ac(e,t,n,r,s){n=n.render;var i=t.ref;return Jn(t,s),r=Kl(e,t,n,r,i,s),n=Ql(),e!==null&&!Te?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,kt(e,t,s)):(q&&n&&Il(t),t.flags|=1,Ce(e,t,r,s),t.child)}function Lc(e,t,n,r,s){if(e===null){var i=n.type;return typeof i=="function"&&!iu(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,ip(e,t,i,r,s)):(e=ni(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&s)){var a=i.memoizedProps;if(n=n.compare,n=n!==null?n:Qr,n(a,r)&&e.ref===t.ref)return kt(e,t,s)}return t.flags|=1,e=$t(i,r),e.ref=t.ref,e.return=t,t.child=e}function ip(e,t,n,r,s){if(e!==null){var i=e.memoizedProps;if(Qr(i,r)&&e.ref===t.ref)if(Te=!1,t.pendingProps=r=i,(e.lanes&s)!==0)e.flags&131072&&(Te=!0);else return t.lanes=e.lanes,kt(e,t,s)}return Oo(e,t,n,r,s)}function ap(e,t,n){var r=t.pendingProps,s=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},H($n,De),De|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,H($n,De),De|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,H($n,De),De|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,H($n,De),De|=r;return Ce(e,t,s,n),t.child}function op(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Oo(e,t,n,r,s){var i=Me(n)?xn:be.current;return i=er(t,i),Jn(t,s),n=Kl(e,t,n,r,i,s),r=Ql(),e!==null&&!Te?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,kt(e,t,s)):(q&&r&&Il(t),t.flags|=1,Ce(e,t,n,s),t.child)}function _c(e,t,n,r,s){if(Me(n)){var i=!0;hi(t)}else i=!1;if(Jn(t,s),t.stateNode===null)Zs(e,t),np(t,n,r),Io(t,n,r,s),r=!0;else if(e===null){var a=t.stateNode,o=t.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=Ke(c):(c=Me(n)?xn:be.current,c=er(t,c));var f=n.getDerivedStateFromProps,d=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";d||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==r||l!==c)&&Pc(t,a,r,c),Pt=!1;var m=t.memoizedState;a.state=m,wi(t,r,a,s),l=t.memoizedState,o!==r||m!==l||Re.current||Pt?(typeof f=="function"&&(Do(t,n,f,r),l=t.memoizedState),(o=Pt||Ec(t,n,o,r,m,l,c))?(d||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=c,r=o):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Dm(e,t),o=t.memoizedProps,c=t.type===t.elementType?o:Xe(t.type,o),a.props=c,d=t.pendingProps,m=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=Ke(l):(l=Me(n)?xn:be.current,l=er(t,l));var g=n.getDerivedStateFromProps;(f=typeof g=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==d||m!==l)&&Pc(t,a,r,l),Pt=!1,m=t.memoizedState,a.state=m,wi(t,r,a,s);var v=t.memoizedState;o!==d||m!==v||Re.current||Pt?(typeof g=="function"&&(Do(t,n,g,r),v=t.memoizedState),(c=Pt||Ec(t,n,c,r,m,v,l)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,v,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,v,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=v),a.props=r,a.state=v,a.context=l,r=c):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return Fo(e,t,n,r,i,s)}function Fo(e,t,n,r,s,i){op(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return s&&xc(t,n,!1),kt(e,t,i);r=t.stateNode,jv.current=t;var o=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=nr(t,e.child,null,i),t.child=nr(t,null,o,i)):Ce(e,t,o,i),t.memoizedState=r.state,s&&xc(t,n,!0),t.child}function lp(e){var t=e.stateNode;t.pendingContext?vc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&vc(e,t.context,!1),Wl(e,t.containerInfo)}function Dc(e,t,n,r,s){return tr(),Ol(s),t.flags|=256,Ce(e,t,n,r),t.child}var Uo={dehydrated:null,treeContext:null,retryLane:0};function Bo(e){return{baseLanes:e,cachePool:null,transitions:null}}function up(e,t,n){var r=t.pendingProps,s=X.current,i=!1,a=(t.flags&128)!==0,o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:(s&2)!==0),o?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),H(X,s&1),e===null)return Lo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,i?(r=t.mode,i=t.child,a={mode:"hidden",children:a},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=a):i=Xi(a,r,0,null),e=gn(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Bo(n),t.memoizedState=Uo,e):Xl(t,a));if(s=e.memoizedState,s!==null&&(o=s.dehydrated,o!==null))return Ev(e,t,a,r,o,s,n);if(i){i=r.fallback,a=t.mode,s=e.child,o=s.sibling;var l={mode:"hidden",children:r.children};return!(a&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=$t(s,l),r.subtreeFlags=s.subtreeFlags&14680064),o!==null?i=$t(o,i):(i=gn(i,a,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,a=e.child.memoizedState,a=a===null?Bo(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=e.childLanes&~n,t.memoizedState=Uo,r}return i=e.child,e=i.sibling,r=$t(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Xl(e,t){return t=Xi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Vs(e,t,n,r){return r!==null&&Ol(r),nr(t,e.child,null,n),e=Xl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ev(e,t,n,r,s,i,a){if(n)return t.flags&256?(t.flags&=-257,r=Va(Error(E(422))),Vs(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,s=t.mode,r=Xi({mode:"visible",children:r.children},s,0,null),i=gn(i,s,a,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&nr(t,e.child,null,a),t.child.memoizedState=Bo(a),t.memoizedState=Uo,i);if(!(t.mode&1))return Vs(e,t,a,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var o=r.dgst;return r=o,i=Error(E(419)),r=Va(i,r,void 0),Vs(e,t,a,r)}if(o=(a&e.childLanes)!==0,Te||o){if(r=fe,r!==null){switch(a&-a){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|a)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,bt(e,s),nt(r,e,s,-1))}return su(),r=Va(Error(E(421))),Vs(e,t,a,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=Uv.bind(null,e),s._reactRetry=t,null):(e=i.treeContext,Ie=Ot(s.nextSibling),Ve=t,q=!0,et=null,e!==null&&(We[He++]=mt,We[He++]=pt,We[He++]=wn,mt=e.id,pt=e.overflow,wn=t),t=Xl(t,r.children),t.flags|=4096,t)}function Ic(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),_o(e.return,t,n)}function Oa(e,t,n,r,s){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function cp(e,t,n){var r=t.pendingProps,s=r.revealOrder,i=r.tail;if(Ce(e,t,r.children,n),r=X.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ic(e,n,t);else if(e.tag===19)Ic(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(H(X,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&bi(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Oa(t,!1,s,n,i);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&bi(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Oa(t,!0,n,null,i);break;case"together":Oa(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Zs(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function kt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),kn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(E(153));if(t.child!==null){for(e=t.child,n=$t(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=$t(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Pv(e,t,n){switch(t.tag){case 3:lp(t),tr();break;case 5:Im(t);break;case 1:Me(t.type)&&hi(t);break;case 4:Wl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;H(vi,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(H(X,X.current&1),t.flags|=128,null):n&t.child.childLanes?up(e,t,n):(H(X,X.current&1),e=kt(e,t,n),e!==null?e.sibling:null);H(X,X.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return cp(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),H(X,X.current),r)break;return null;case 22:case 23:return t.lanes=0,ap(e,t,n)}return kt(e,t,n)}var dp,$o,fp,mp;dp=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};$o=function(){};fp=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,mn(ut.current);var i=null;switch(n){case"input":s=uo(e,s),r=uo(e,r),i=[];break;case"select":s=ne({},s,{value:void 0}),r=ne({},r,{value:void 0}),i=[];break;case"textarea":s=mo(e,s),r=mo(e,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=mi)}ho(n,r);var a;n=null;for(c in s)if(!r.hasOwnProperty(c)&&s.hasOwnProperty(c)&&s[c]!=null)if(c==="style"){var o=s[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&($r.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var l=r[c];if(o=s!=null?s[c]:void 0,r.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(i||(i=[]),i.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(i=i||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(i=i||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&($r.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&Y("scroll",e),i||o===l||(i=[])):(i=i||[]).push(c,l))}n&&(i=i||[]).push("style",n);var c=i;(t.updateQueue=c)&&(t.flags|=4)}};mp=function(e,t,n,r){n!==r&&(t.flags|=4)};function wr(e,t){if(!q)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ve(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Tv(e,t,n){var r=t.pendingProps;switch(Vl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ve(t),null;case 1:return Me(t.type)&&pi(),ve(t),null;case 3:return r=t.stateNode,rr(),K(Re),K(be),Gl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ds(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,et!==null&&(qo(et),et=null))),$o(e,t),ve(t),null;case 5:Hl(t);var s=mn(es.current);if(n=t.type,e!==null&&t.stateNode!=null)fp(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(E(166));return ve(t),null}if(e=mn(ut.current),Ds(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[ot]=t,r[Xr]=i,e=(t.mode&1)!==0,n){case"dialog":Y("cancel",r),Y("close",r);break;case"iframe":case"object":case"embed":Y("load",r);break;case"video":case"audio":for(s=0;s<Er.length;s++)Y(Er[s],r);break;case"source":Y("error",r);break;case"img":case"image":case"link":Y("error",r),Y("load",r);break;case"details":Y("toggle",r);break;case"input":Hu(r,i),Y("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},Y("invalid",r);break;case"textarea":Yu(r,i),Y("invalid",r)}ho(n,i),s=null;for(var a in i)if(i.hasOwnProperty(a)){var o=i[a];a==="children"?typeof o=="string"?r.textContent!==o&&(i.suppressHydrationWarning!==!0&&_s(r.textContent,o,e),s=["children",o]):typeof o=="number"&&r.textContent!==""+o&&(i.suppressHydrationWarning!==!0&&_s(r.textContent,o,e),s=["children",""+o]):$r.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&Y("scroll",r)}switch(n){case"input":js(r),Gu(r,i,!0);break;case"textarea":js(r),Ku(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=mi)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Bf(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[ot]=t,e[Xr]=r,dp(e,t,!1,!1),t.stateNode=e;e:{switch(a=go(n,r),n){case"dialog":Y("cancel",e),Y("close",e),s=r;break;case"iframe":case"object":case"embed":Y("load",e),s=r;break;case"video":case"audio":for(s=0;s<Er.length;s++)Y(Er[s],e);s=r;break;case"source":Y("error",e),s=r;break;case"img":case"image":case"link":Y("error",e),Y("load",e),s=r;break;case"details":Y("toggle",e),s=r;break;case"input":Hu(e,r),s=uo(e,r),Y("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=ne({},r,{value:void 0}),Y("invalid",e);break;case"textarea":Yu(e,r),s=mo(e,r),Y("invalid",e);break;default:s=r}ho(n,s),o=s;for(i in o)if(o.hasOwnProperty(i)){var l=o[i];i==="style"?Wf(e,l):i==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&$f(e,l)):i==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&zr(e,l):typeof l=="number"&&zr(e,""+l):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&($r.hasOwnProperty(i)?l!=null&&i==="onScroll"&&Y("scroll",e):l!=null&&kl(e,i,l,a))}switch(n){case"input":js(e),Gu(e,r,!1);break;case"textarea":js(e),Ku(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Ht(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Yn(e,!!r.multiple,i,!1):r.defaultValue!=null&&Yn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=mi)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ve(t),null;case 6:if(e&&t.stateNode!=null)mp(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(E(166));if(n=mn(es.current),mn(ut.current),Ds(t)){if(r=t.stateNode,n=t.memoizedProps,r[ot]=t,(i=r.nodeValue!==n)&&(e=Ve,e!==null))switch(e.tag){case 3:_s(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&_s(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[ot]=t,t.stateNode=r}return ve(t),null;case 13:if(K(X),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(q&&Ie!==null&&t.mode&1&&!(t.flags&128))Mm(),tr(),t.flags|=98560,i=!1;else if(i=Ds(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(E(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(E(317));i[ot]=t}else tr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ve(t),i=!1}else et!==null&&(qo(et),et=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||X.current&1?ce===0&&(ce=3):su())),t.updateQueue!==null&&(t.flags|=4),ve(t),null);case 4:return rr(),$o(e,t),e===null&&qr(t.stateNode.containerInfo),ve(t),null;case 10:return Bl(t.type._context),ve(t),null;case 17:return Me(t.type)&&pi(),ve(t),null;case 19:if(K(X),i=t.memoizedState,i===null)return ve(t),null;if(r=(t.flags&128)!==0,a=i.rendering,a===null)if(r)wr(i,!1);else{if(ce!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=bi(e),a!==null){for(t.flags|=128,wr(i,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,e=a.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return H(X,X.current&1|2),t.child}e=e.sibling}i.tail!==null&&se()>ir&&(t.flags|=128,r=!0,wr(i,!1),t.lanes=4194304)}else{if(!r)if(e=bi(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),wr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!q)return ve(t),null}else 2*se()-i.renderingStartTime>ir&&n!==1073741824&&(t.flags|=128,r=!0,wr(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(n=i.last,n!==null?n.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=se(),t.sibling=null,n=X.current,H(X,r?n&1|2:n&1),t):(ve(t),null);case 22:case 23:return ru(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?De&1073741824&&(ve(t),t.subtreeFlags&6&&(t.flags|=8192)):ve(t),null;case 24:return null;case 25:return null}throw Error(E(156,t.tag))}function Rv(e,t){switch(Vl(t),t.tag){case 1:return Me(t.type)&&pi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return rr(),K(Re),K(be),Gl(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Hl(t),null;case 13:if(K(X),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(E(340));tr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return K(X),null;case 4:return rr(),null;case 10:return Bl(t.type._context),null;case 22:case 23:return ru(),null;case 24:return null;default:return null}}var Os=!1,we=!1,Mv=typeof WeakSet=="function"?WeakSet:Set,A=null;function Bn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){re(e,t,r)}else n.current=null}function zo(e,t,n){try{n()}catch(r){re(e,t,r)}}var Vc=!1;function Av(e,t){if(jo=ci,e=vm(),Dl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,f=0,d=e,m=null;t:for(;;){for(var g;d!==n||s!==0&&d.nodeType!==3||(o=a+s),d!==i||r!==0&&d.nodeType!==3||(l=a+r),d.nodeType===3&&(a+=d.nodeValue.length),(g=d.firstChild)!==null;)m=d,d=g;for(;;){if(d===e)break t;if(m===n&&++c===s&&(o=a),m===i&&++f===r&&(l=a),(g=d.nextSibling)!==null)break;d=m,m=d.parentNode}d=g}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Eo={focusedElem:e,selectionRange:n},ci=!1,A=t;A!==null;)if(t=A,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,A=e;else for(;A!==null;){t=A;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var x=v.memoizedProps,k=v.memoizedState,y=t.stateNode,h=y.getSnapshotBeforeUpdate(t.elementType===t.type?x:Xe(t.type,x),k);y.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(E(163))}}catch(b){re(t,t.return,b)}if(e=t.sibling,e!==null){e.return=t.return,A=e;break}A=t.return}return v=Vc,Vc=!1,v}function Dr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var i=s.destroy;s.destroy=void 0,i!==void 0&&zo(t,n,i)}s=s.next}while(s!==r)}}function qi(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Wo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function pp(e){var t=e.alternate;t!==null&&(e.alternate=null,pp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ot],delete t[Xr],delete t[Ro],delete t[pv],delete t[hv])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function hp(e){return e.tag===5||e.tag===3||e.tag===4}function Oc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||hp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ho(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=mi));else if(r!==4&&(e=e.child,e!==null))for(Ho(e,t,n),e=e.sibling;e!==null;)Ho(e,t,n),e=e.sibling}function Go(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Go(e,t,n),e=e.sibling;e!==null;)Go(e,t,n),e=e.sibling}var me=null,Ze=!1;function Nt(e,t,n){for(n=n.child;n!==null;)gp(e,t,n),n=n.sibling}function gp(e,t,n){if(lt&&typeof lt.onCommitFiberUnmount=="function")try{lt.onCommitFiberUnmount($i,n)}catch{}switch(n.tag){case 5:we||Bn(n,t);case 6:var r=me,s=Ze;me=null,Nt(e,t,n),me=r,Ze=s,me!==null&&(Ze?(e=me,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):me.removeChild(n.stateNode));break;case 18:me!==null&&(Ze?(e=me,n=n.stateNode,e.nodeType===8?Ma(e.parentNode,n):e.nodeType===1&&Ma(e,n),Yr(e)):Ma(me,n.stateNode));break;case 4:r=me,s=Ze,me=n.stateNode.containerInfo,Ze=!0,Nt(e,t,n),me=r,Ze=s;break;case 0:case 11:case 14:case 15:if(!we&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,a=i.destroy;i=i.tag,a!==void 0&&(i&2||i&4)&&zo(n,t,a),s=s.next}while(s!==r)}Nt(e,t,n);break;case 1:if(!we&&(Bn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(o){re(n,t,o)}Nt(e,t,n);break;case 21:Nt(e,t,n);break;case 22:n.mode&1?(we=(r=we)||n.memoizedState!==null,Nt(e,t,n),we=r):Nt(e,t,n);break;default:Nt(e,t,n)}}function Fc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Mv),t.forEach(function(r){var s=Bv.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function qe(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=e,a=t,o=a;e:for(;o!==null;){switch(o.tag){case 5:me=o.stateNode,Ze=!1;break e;case 3:me=o.stateNode.containerInfo,Ze=!0;break e;case 4:me=o.stateNode.containerInfo,Ze=!0;break e}o=o.return}if(me===null)throw Error(E(160));gp(i,a,s),me=null,Ze=!1;var l=s.alternate;l!==null&&(l.return=null),s.return=null}catch(c){re(s,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)yp(t,e),t=t.sibling}function yp(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(qe(t,e),it(e),r&4){try{Dr(3,e,e.return),qi(3,e)}catch(x){re(e,e.return,x)}try{Dr(5,e,e.return)}catch(x){re(e,e.return,x)}}break;case 1:qe(t,e),it(e),r&512&&n!==null&&Bn(n,n.return);break;case 5:if(qe(t,e),it(e),r&512&&n!==null&&Bn(n,n.return),e.flags&32){var s=e.stateNode;try{zr(s,"")}catch(x){re(e,e.return,x)}}if(r&4&&(s=e.stateNode,s!=null)){var i=e.memoizedProps,a=n!==null?n.memoizedProps:i,o=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{o==="input"&&i.type==="radio"&&i.name!=null&&Ff(s,i),go(o,a);var c=go(o,i);for(a=0;a<l.length;a+=2){var f=l[a],d=l[a+1];f==="style"?Wf(s,d):f==="dangerouslySetInnerHTML"?$f(s,d):f==="children"?zr(s,d):kl(s,f,d,c)}switch(o){case"input":co(s,i);break;case"textarea":Uf(s,i);break;case"select":var m=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var g=i.value;g!=null?Yn(s,!!i.multiple,g,!1):m!==!!i.multiple&&(i.defaultValue!=null?Yn(s,!!i.multiple,i.defaultValue,!0):Yn(s,!!i.multiple,i.multiple?[]:"",!1))}s[Xr]=i}catch(x){re(e,e.return,x)}}break;case 6:if(qe(t,e),it(e),r&4){if(e.stateNode===null)throw Error(E(162));s=e.stateNode,i=e.memoizedProps;try{s.nodeValue=i}catch(x){re(e,e.return,x)}}break;case 3:if(qe(t,e),it(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Yr(t.containerInfo)}catch(x){re(e,e.return,x)}break;case 4:qe(t,e),it(e);break;case 13:qe(t,e),it(e),s=e.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(tu=se())),r&4&&Fc(e);break;case 22:if(f=n!==null&&n.memoizedState!==null,e.mode&1?(we=(c=we)||f,qe(t,e),we=c):qe(t,e),it(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!f&&e.mode&1)for(A=e,f=e.child;f!==null;){for(d=A=f;A!==null;){switch(m=A,g=m.child,m.tag){case 0:case 11:case 14:case 15:Dr(4,m,m.return);break;case 1:Bn(m,m.return);var v=m.stateNode;if(typeof v.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(x){re(r,n,x)}}break;case 5:Bn(m,m.return);break;case 22:if(m.memoizedState!==null){Bc(d);continue}}g!==null?(g.return=m,A=g):Bc(d)}f=f.sibling}e:for(f=null,d=e;;){if(d.tag===5){if(f===null){f=d;try{s=d.stateNode,c?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(o=d.stateNode,l=d.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=zf("display",a))}catch(x){re(e,e.return,x)}}}else if(d.tag===6){if(f===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(x){re(e,e.return,x)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===e)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===e)break e;for(;d.sibling===null;){if(d.return===null||d.return===e)break e;f===d&&(f=null),d=d.return}f===d&&(f=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:qe(t,e),it(e),r&4&&Fc(e);break;case 21:break;default:qe(t,e),it(e)}}function it(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(hp(n)){var r=n;break e}n=n.return}throw Error(E(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(zr(s,""),r.flags&=-33);var i=Oc(e);Go(e,i,s);break;case 3:case 4:var a=r.stateNode.containerInfo,o=Oc(e);Ho(e,o,a);break;default:throw Error(E(161))}}catch(l){re(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Lv(e,t,n){A=e,vp(e)}function vp(e,t,n){for(var r=(e.mode&1)!==0;A!==null;){var s=A,i=s.child;if(s.tag===22&&r){var a=s.memoizedState!==null||Os;if(!a){var o=s.alternate,l=o!==null&&o.memoizedState!==null||we;o=Os;var c=we;if(Os=a,(we=l)&&!c)for(A=s;A!==null;)a=A,l=a.child,a.tag===22&&a.memoizedState!==null?$c(s):l!==null?(l.return=a,A=l):$c(s);for(;i!==null;)A=i,vp(i),i=i.sibling;A=s,Os=o,we=c}Uc(e)}else s.subtreeFlags&8772&&i!==null?(i.return=s,A=i):Uc(e)}}function Uc(e){for(;A!==null;){var t=A;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:we||qi(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!we)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:Xe(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Cc(t,i,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Cc(t,a,n)}break;case 5:var o=t.stateNode;if(n===null&&t.flags&4){n=o;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var d=f.dehydrated;d!==null&&Yr(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(E(163))}we||t.flags&512&&Wo(t)}catch(m){re(t,t.return,m)}}if(t===e){A=null;break}if(n=t.sibling,n!==null){n.return=t.return,A=n;break}A=t.return}}function Bc(e){for(;A!==null;){var t=A;if(t===e){A=null;break}var n=t.sibling;if(n!==null){n.return=t.return,A=n;break}A=t.return}}function $c(e){for(;A!==null;){var t=A;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{qi(4,t)}catch(l){re(t,n,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(l){re(t,s,l)}}var i=t.return;try{Wo(t)}catch(l){re(t,i,l)}break;case 5:var a=t.return;try{Wo(t)}catch(l){re(t,a,l)}}}catch(l){re(t,t.return,l)}if(t===e){A=null;break}var o=t.sibling;if(o!==null){o.return=t.return,A=o;break}A=t.return}}var _v=Math.ceil,Ci=Ct.ReactCurrentDispatcher,Zl=Ct.ReactCurrentOwner,Ye=Ct.ReactCurrentBatchConfig,F=0,fe=null,oe=null,pe=0,De=0,$n=qt(0),ce=0,ss=null,kn=0,Ji=0,eu=0,Ir=null,Pe=null,tu=0,ir=1/0,dt=null,Ni=!1,Yo=null,Ut=null,Fs=!1,Lt=null,ji=0,Vr=0,Ko=null,ei=-1,ti=0;function Ne(){return F&6?se():ei!==-1?ei:ei=se()}function Bt(e){return e.mode&1?F&2&&pe!==0?pe&-pe:yv.transition!==null?(ti===0&&(ti=nm()),ti):(e=B,e!==0||(e=window.event,e=e===void 0?16:um(e.type)),e):1}function nt(e,t,n,r){if(50<Vr)throw Vr=0,Ko=null,Error(E(185));ms(e,n,r),(!(F&2)||e!==fe)&&(e===fe&&(!(F&2)&&(Ji|=n),ce===4&&Mt(e,pe)),Ae(e,r),n===1&&F===0&&!(t.mode&1)&&(ir=se()+500,Yi&&Jt()))}function Ae(e,t){var n=e.callbackNode;yy(e,t);var r=ui(e,e===fe?pe:0);if(r===0)n!==null&&Ju(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Ju(n),t===1)e.tag===0?gv(zc.bind(null,e)):Pm(zc.bind(null,e)),fv(function(){!(F&6)&&Jt()}),n=null;else{switch(rm(r)){case 1:n=El;break;case 4:n=em;break;case 16:n=li;break;case 536870912:n=tm;break;default:n=li}n=jp(n,xp.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function xp(e,t){if(ei=-1,ti=0,F&6)throw Error(E(327));var n=e.callbackNode;if(Xn()&&e.callbackNode!==n)return null;var r=ui(e,e===fe?pe:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Ei(e,r);else{t=r;var s=F;F|=2;var i=bp();(fe!==e||pe!==t)&&(dt=null,ir=se()+500,hn(e,t));do try{Vv();break}catch(o){wp(e,o)}while(!0);Ul(),Ci.current=i,F=s,oe!==null?t=0:(fe=null,pe=0,t=ce)}if(t!==0){if(t===2&&(s=bo(e),s!==0&&(r=s,t=Qo(e,s))),t===1)throw n=ss,hn(e,0),Mt(e,r),Ae(e,se()),n;if(t===6)Mt(e,r);else{if(s=e.current.alternate,!(r&30)&&!Dv(s)&&(t=Ei(e,r),t===2&&(i=bo(e),i!==0&&(r=i,t=Qo(e,i))),t===1))throw n=ss,hn(e,0),Mt(e,r),Ae(e,se()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(E(345));case 2:on(e,Pe,dt);break;case 3:if(Mt(e,r),(r&130023424)===r&&(t=tu+500-se(),10<t)){if(ui(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){Ne(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=To(on.bind(null,e,Pe,dt),t);break}on(e,Pe,dt);break;case 4:if(Mt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var a=31-tt(r);i=1<<a,a=t[a],a>s&&(s=a),r&=~i}if(r=s,r=se()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*_v(r/1960))-r,10<r){e.timeoutHandle=To(on.bind(null,e,Pe,dt),r);break}on(e,Pe,dt);break;case 5:on(e,Pe,dt);break;default:throw Error(E(329))}}}return Ae(e,se()),e.callbackNode===n?xp.bind(null,e):null}function Qo(e,t){var n=Ir;return e.current.memoizedState.isDehydrated&&(hn(e,t).flags|=256),e=Ei(e,t),e!==2&&(t=Pe,Pe=n,t!==null&&qo(t)),e}function qo(e){Pe===null?Pe=e:Pe.push.apply(Pe,e)}function Dv(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!rt(i(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Mt(e,t){for(t&=~eu,t&=~Ji,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-tt(t),r=1<<n;e[n]=-1,t&=~r}}function zc(e){if(F&6)throw Error(E(327));Xn();var t=ui(e,0);if(!(t&1))return Ae(e,se()),null;var n=Ei(e,t);if(e.tag!==0&&n===2){var r=bo(e);r!==0&&(t=r,n=Qo(e,r))}if(n===1)throw n=ss,hn(e,0),Mt(e,t),Ae(e,se()),n;if(n===6)throw Error(E(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,on(e,Pe,dt),Ae(e,se()),null}function nu(e,t){var n=F;F|=1;try{return e(t)}finally{F=n,F===0&&(ir=se()+500,Yi&&Jt())}}function Sn(e){Lt!==null&&Lt.tag===0&&!(F&6)&&Xn();var t=F;F|=1;var n=Ye.transition,r=B;try{if(Ye.transition=null,B=1,e)return e()}finally{B=r,Ye.transition=n,F=t,!(F&6)&&Jt()}}function ru(){De=$n.current,K($n)}function hn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,dv(n)),oe!==null)for(n=oe.return;n!==null;){var r=n;switch(Vl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&pi();break;case 3:rr(),K(Re),K(be),Gl();break;case 5:Hl(r);break;case 4:rr();break;case 13:K(X);break;case 19:K(X);break;case 10:Bl(r.type._context);break;case 22:case 23:ru()}n=n.return}if(fe=e,oe=e=$t(e.current,null),pe=De=t,ce=0,ss=null,eu=Ji=kn=0,Pe=Ir=null,fn!==null){for(t=0;t<fn.length;t++)if(n=fn[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var a=i.next;i.next=s,r.next=a}n.pending=r}fn=null}return e}function wp(e,t){do{var n=oe;try{if(Ul(),Js.current=Si,ki){for(var r=te.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}ki=!1}if(bn=0,de=ue=te=null,_r=!1,ts=0,Zl.current=null,n===null||n.return===null){ce=1,ss=t,oe=null;break}e:{var i=e,a=n.return,o=n,l=t;if(t=pe,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,f=o,d=f.tag;if(!(f.mode&1)&&(d===0||d===11||d===15)){var m=f.alternate;m?(f.updateQueue=m.updateQueue,f.memoizedState=m.memoizedState,f.lanes=m.lanes):(f.updateQueue=null,f.memoizedState=null)}var g=Rc(a);if(g!==null){g.flags&=-257,Mc(g,a,o,i,t),g.mode&1&&Tc(i,c,t),t=g,l=c;var v=t.updateQueue;if(v===null){var x=new Set;x.add(l),t.updateQueue=x}else v.add(l);break e}else{if(!(t&1)){Tc(i,c,t),su();break e}l=Error(E(426))}}else if(q&&o.mode&1){var k=Rc(a);if(k!==null){!(k.flags&65536)&&(k.flags|=256),Mc(k,a,o,i,t),Ol(sr(l,o));break e}}i=l=sr(l,o),ce!==4&&(ce=2),Ir===null?Ir=[i]:Ir.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var y=rp(i,l,t);Sc(i,y);break e;case 1:o=l;var h=i.type,p=i.stateNode;if(!(i.flags&128)&&(typeof h.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(Ut===null||!Ut.has(p)))){i.flags|=65536,t&=-t,i.lanes|=t;var b=sp(i,o,t);Sc(i,b);break e}}i=i.return}while(i!==null)}Sp(n)}catch(S){t=S,oe===n&&n!==null&&(oe=n=n.return);continue}break}while(!0)}function bp(){var e=Ci.current;return Ci.current=Si,e===null?Si:e}function su(){(ce===0||ce===3||ce===2)&&(ce=4),fe===null||!(kn&268435455)&&!(Ji&268435455)||Mt(fe,pe)}function Ei(e,t){var n=F;F|=2;var r=bp();(fe!==e||pe!==t)&&(dt=null,hn(e,t));do try{Iv();break}catch(s){wp(e,s)}while(!0);if(Ul(),F=n,Ci.current=r,oe!==null)throw Error(E(261));return fe=null,pe=0,ce}function Iv(){for(;oe!==null;)kp(oe)}function Vv(){for(;oe!==null&&!ly();)kp(oe)}function kp(e){var t=Np(e.alternate,e,De);e.memoizedProps=e.pendingProps,t===null?Sp(e):oe=t,Zl.current=null}function Sp(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Rv(n,t),n!==null){n.flags&=32767,oe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ce=6,oe=null;return}}else if(n=Tv(n,t,De),n!==null){oe=n;return}if(t=t.sibling,t!==null){oe=t;return}oe=t=e}while(t!==null);ce===0&&(ce=5)}function on(e,t,n){var r=B,s=Ye.transition;try{Ye.transition=null,B=1,Ov(e,t,n,r)}finally{Ye.transition=s,B=r}return null}function Ov(e,t,n,r){do Xn();while(Lt!==null);if(F&6)throw Error(E(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(E(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(vy(e,i),e===fe&&(oe=fe=null,pe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Fs||(Fs=!0,jp(li,function(){return Xn(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Ye.transition,Ye.transition=null;var a=B;B=1;var o=F;F|=4,Zl.current=null,Av(e,n),yp(n,e),sv(Eo),ci=!!jo,Eo=jo=null,e.current=n,Lv(n),uy(),F=o,B=a,Ye.transition=i}else e.current=n;if(Fs&&(Fs=!1,Lt=e,ji=s),i=e.pendingLanes,i===0&&(Ut=null),fy(n.stateNode),Ae(e,se()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Ni)throw Ni=!1,e=Yo,Yo=null,e;return ji&1&&e.tag!==0&&Xn(),i=e.pendingLanes,i&1?e===Ko?Vr++:(Vr=0,Ko=e):Vr=0,Jt(),null}function Xn(){if(Lt!==null){var e=rm(ji),t=Ye.transition,n=B;try{if(Ye.transition=null,B=16>e?16:e,Lt===null)var r=!1;else{if(e=Lt,Lt=null,ji=0,F&6)throw Error(E(331));var s=F;for(F|=4,A=e.current;A!==null;){var i=A,a=i.child;if(A.flags&16){var o=i.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(A=c;A!==null;){var f=A;switch(f.tag){case 0:case 11:case 15:Dr(8,f,i)}var d=f.child;if(d!==null)d.return=f,A=d;else for(;A!==null;){f=A;var m=f.sibling,g=f.return;if(pp(f),f===c){A=null;break}if(m!==null){m.return=g,A=m;break}A=g}}}var v=i.alternate;if(v!==null){var x=v.child;if(x!==null){v.child=null;do{var k=x.sibling;x.sibling=null,x=k}while(x!==null)}}A=i}}if(i.subtreeFlags&2064&&a!==null)a.return=i,A=a;else e:for(;A!==null;){if(i=A,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Dr(9,i,i.return)}var y=i.sibling;if(y!==null){y.return=i.return,A=y;break e}A=i.return}}var h=e.current;for(A=h;A!==null;){a=A;var p=a.child;if(a.subtreeFlags&2064&&p!==null)p.return=a,A=p;else e:for(a=h;A!==null;){if(o=A,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:qi(9,o)}}catch(S){re(o,o.return,S)}if(o===a){A=null;break e}var b=o.sibling;if(b!==null){b.return=o.return,A=b;break e}A=o.return}}if(F=s,Jt(),lt&&typeof lt.onPostCommitFiberRoot=="function")try{lt.onPostCommitFiberRoot($i,e)}catch{}r=!0}return r}finally{B=n,Ye.transition=t}}return!1}function Wc(e,t,n){t=sr(n,t),t=rp(e,t,1),e=Ft(e,t,1),t=Ne(),e!==null&&(ms(e,1,t),Ae(e,t))}function re(e,t,n){if(e.tag===3)Wc(e,e,n);else for(;t!==null;){if(t.tag===3){Wc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ut===null||!Ut.has(r))){e=sr(n,e),e=sp(t,e,1),t=Ft(t,e,1),e=Ne(),t!==null&&(ms(t,1,e),Ae(t,e));break}}t=t.return}}function Fv(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ne(),e.pingedLanes|=e.suspendedLanes&n,fe===e&&(pe&n)===n&&(ce===4||ce===3&&(pe&130023424)===pe&&500>se()-tu?hn(e,0):eu|=n),Ae(e,t)}function Cp(e,t){t===0&&(e.mode&1?(t=Ts,Ts<<=1,!(Ts&130023424)&&(Ts=4194304)):t=1);var n=Ne();e=bt(e,t),e!==null&&(ms(e,t,n),Ae(e,n))}function Uv(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Cp(e,n)}function Bv(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(E(314))}r!==null&&r.delete(t),Cp(e,n)}var Np;Np=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Re.current)Te=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Te=!1,Pv(e,t,n);Te=!!(e.flags&131072)}else Te=!1,q&&t.flags&1048576&&Tm(t,yi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Zs(e,t),e=t.pendingProps;var s=er(t,be.current);Jn(t,n),s=Kl(null,t,r,e,s,n);var i=Ql();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Me(r)?(i=!0,hi(t)):i=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,zl(t),s.updater=Qi,t.stateNode=s,s._reactInternals=t,Io(t,r,e,n),t=Fo(null,t,r,!0,i,n)):(t.tag=0,q&&i&&Il(t),Ce(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Zs(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=zv(r),e=Xe(r,e),s){case 0:t=Oo(null,t,r,e,n);break e;case 1:t=_c(null,t,r,e,n);break e;case 11:t=Ac(null,t,r,e,n);break e;case 14:t=Lc(null,t,r,Xe(r.type,e),n);break e}throw Error(E(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Xe(r,s),Oo(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Xe(r,s),_c(e,t,r,s,n);case 3:e:{if(lp(t),e===null)throw Error(E(387));r=t.pendingProps,i=t.memoizedState,s=i.element,Dm(e,t),wi(t,r,null,n);var a=t.memoizedState;if(r=a.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){s=sr(Error(E(423)),t),t=Dc(e,t,r,n,s);break e}else if(r!==s){s=sr(Error(E(424)),t),t=Dc(e,t,r,n,s);break e}else for(Ie=Ot(t.stateNode.containerInfo.firstChild),Ve=t,q=!0,et=null,n=Lm(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(tr(),r===s){t=kt(e,t,n);break e}Ce(e,t,r,n)}t=t.child}return t;case 5:return Im(t),e===null&&Lo(t),r=t.type,s=t.pendingProps,i=e!==null?e.memoizedProps:null,a=s.children,Po(r,s)?a=null:i!==null&&Po(r,i)&&(t.flags|=32),op(e,t),Ce(e,t,a,n),t.child;case 6:return e===null&&Lo(t),null;case 13:return up(e,t,n);case 4:return Wl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=nr(t,null,r,n):Ce(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Xe(r,s),Ac(e,t,r,s,n);case 7:return Ce(e,t,t.pendingProps,n),t.child;case 8:return Ce(e,t,t.pendingProps.children,n),t.child;case 12:return Ce(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,i=t.memoizedProps,a=s.value,H(vi,r._currentValue),r._currentValue=a,i!==null)if(rt(i.value,a)){if(i.children===s.children&&!Re.current){t=kt(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var o=i.dependencies;if(o!==null){a=i.child;for(var l=o.firstContext;l!==null;){if(l.context===r){if(i.tag===1){l=gt(-1,n&-n),l.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?l.next=l:(l.next=f.next,f.next=l),c.pending=l}}i.lanes|=n,l=i.alternate,l!==null&&(l.lanes|=n),_o(i.return,n,t),o.lanes|=n;break}l=l.next}}else if(i.tag===10)a=i.type===t.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(E(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),_o(a,n,t),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===t){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}Ce(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,Jn(t,n),s=Ke(s),r=r(s),t.flags|=1,Ce(e,t,r,n),t.child;case 14:return r=t.type,s=Xe(r,t.pendingProps),s=Xe(r.type,s),Lc(e,t,r,s,n);case 15:return ip(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Xe(r,s),Zs(e,t),t.tag=1,Me(r)?(e=!0,hi(t)):e=!1,Jn(t,n),np(t,r,s),Io(t,r,s,n),Fo(null,t,r,!0,e,n);case 19:return cp(e,t,n);case 22:return ap(e,t,n)}throw Error(E(156,t.tag))};function jp(e,t){return Zf(e,t)}function $v(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ge(e,t,n,r){return new $v(e,t,n,r)}function iu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function zv(e){if(typeof e=="function")return iu(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Cl)return 11;if(e===Nl)return 14}return 2}function $t(e,t){var n=e.alternate;return n===null?(n=Ge(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ni(e,t,n,r,s,i){var a=2;if(r=e,typeof e=="function")iu(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case An:return gn(n.children,s,i,t);case Sl:a=8,s|=8;break;case io:return e=Ge(12,n,t,s|2),e.elementType=io,e.lanes=i,e;case ao:return e=Ge(13,n,t,s),e.elementType=ao,e.lanes=i,e;case oo:return e=Ge(19,n,t,s),e.elementType=oo,e.lanes=i,e;case If:return Xi(n,s,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case _f:a=10;break e;case Df:a=9;break e;case Cl:a=11;break e;case Nl:a=14;break e;case Et:a=16,r=null;break e}throw Error(E(130,e==null?e:typeof e,""))}return t=Ge(a,n,t,s),t.elementType=e,t.type=r,t.lanes=i,t}function gn(e,t,n,r){return e=Ge(7,e,r,t),e.lanes=n,e}function Xi(e,t,n,r){return e=Ge(22,e,r,t),e.elementType=If,e.lanes=n,e.stateNode={isHidden:!1},e}function Fa(e,t,n){return e=Ge(6,e,null,t),e.lanes=n,e}function Ua(e,t,n){return t=Ge(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Wv(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=wa(0),this.expirationTimes=wa(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=wa(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function au(e,t,n,r,s,i,a,o,l){return e=new Wv(e,t,n,o,l),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Ge(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},zl(i),e}function Hv(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Mn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Ep(e){if(!e)return Gt;e=e._reactInternals;e:{if(Nn(e)!==e||e.tag!==1)throw Error(E(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Me(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(E(171))}if(e.tag===1){var n=e.type;if(Me(n))return Em(e,n,t)}return t}function Pp(e,t,n,r,s,i,a,o,l){return e=au(n,r,!0,e,s,i,a,o,l),e.context=Ep(null),n=e.current,r=Ne(),s=Bt(n),i=gt(r,s),i.callback=t??null,Ft(n,i,s),e.current.lanes=s,ms(e,s,r),Ae(e,r),e}function Zi(e,t,n,r){var s=t.current,i=Ne(),a=Bt(s);return n=Ep(n),t.context===null?t.context=n:t.pendingContext=n,t=gt(i,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Ft(s,t,a),e!==null&&(nt(e,s,a,i),qs(e,s,a)),a}function Pi(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Hc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ou(e,t){Hc(e,t),(e=e.alternate)&&Hc(e,t)}function Gv(){return null}var Tp=typeof reportError=="function"?reportError:function(e){console.error(e)};function lu(e){this._internalRoot=e}ea.prototype.render=lu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(E(409));Zi(e,t,null,null)};ea.prototype.unmount=lu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Sn(function(){Zi(null,e,null,null)}),t[wt]=null}};function ea(e){this._internalRoot=e}ea.prototype.unstable_scheduleHydration=function(e){if(e){var t=am();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Rt.length&&t!==0&&t<Rt[n].priority;n++);Rt.splice(n,0,e),n===0&&lm(e)}};function uu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ta(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Gc(){}function Yv(e,t,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var c=Pi(a);i.call(c)}}var a=Pp(t,r,e,0,null,!1,!1,"",Gc);return e._reactRootContainer=a,e[wt]=a.current,qr(e.nodeType===8?e.parentNode:e),Sn(),a}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var o=r;r=function(){var c=Pi(l);o.call(c)}}var l=au(e,0,!1,null,null,!1,!1,"",Gc);return e._reactRootContainer=l,e[wt]=l.current,qr(e.nodeType===8?e.parentNode:e),Sn(function(){Zi(t,l,n,r)}),l}function na(e,t,n,r,s){var i=n._reactRootContainer;if(i){var a=i;if(typeof s=="function"){var o=s;s=function(){var l=Pi(a);o.call(l)}}Zi(t,a,e,s)}else a=Yv(n,t,e,s,r);return Pi(a)}sm=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=jr(t.pendingLanes);n!==0&&(Pl(t,n|1),Ae(t,se()),!(F&6)&&(ir=se()+500,Jt()))}break;case 13:Sn(function(){var r=bt(e,1);if(r!==null){var s=Ne();nt(r,e,1,s)}}),ou(e,1)}};Tl=function(e){if(e.tag===13){var t=bt(e,134217728);if(t!==null){var n=Ne();nt(t,e,134217728,n)}ou(e,134217728)}};im=function(e){if(e.tag===13){var t=Bt(e),n=bt(e,t);if(n!==null){var r=Ne();nt(n,e,t,r)}ou(e,t)}};am=function(){return B};om=function(e,t){var n=B;try{return B=e,t()}finally{B=n}};vo=function(e,t,n){switch(t){case"input":if(co(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=Gi(r);if(!s)throw Error(E(90));Of(r),co(r,s)}}}break;case"textarea":Uf(e,n);break;case"select":t=n.value,t!=null&&Yn(e,!!n.multiple,t,!1)}};Yf=nu;Kf=Sn;var Kv={usingClientEntryPoint:!1,Events:[hs,In,Gi,Hf,Gf,nu]},br={findFiberByHostInstance:dn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Qv={bundleType:br.bundleType,version:br.version,rendererPackageName:br.rendererPackageName,rendererConfig:br.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ct.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Jf(e),e===null?null:e.stateNode},findFiberByHostInstance:br.findFiberByHostInstance||Gv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Us=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Us.isDisabled&&Us.supportsFiber)try{$i=Us.inject(Qv),lt=Us}catch{}}Ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Kv;Ue.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!uu(t))throw Error(E(200));return Hv(e,t,null,n)};Ue.createRoot=function(e,t){if(!uu(e))throw Error(E(299));var n=!1,r="",s=Tp;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=au(e,1,!1,null,null,n,!1,r,s),e[wt]=t.current,qr(e.nodeType===8?e.parentNode:e),new lu(t)};Ue.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(E(188)):(e=Object.keys(e).join(","),Error(E(268,e)));return e=Jf(t),e=e===null?null:e.stateNode,e};Ue.flushSync=function(e){return Sn(e)};Ue.hydrate=function(e,t,n){if(!ta(t))throw Error(E(200));return na(null,e,t,!0,n)};Ue.hydrateRoot=function(e,t,n){if(!uu(e))throw Error(E(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",a=Tp;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=Pp(t,null,e,1,n??null,s,!1,i,a),e[wt]=t.current,qr(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new ea(t)};Ue.render=function(e,t,n){if(!ta(t))throw Error(E(200));return na(null,e,t,!1,n)};Ue.unmountComponentAtNode=function(e){if(!ta(e))throw Error(E(40));return e._reactRootContainer?(Sn(function(){na(null,null,e,!1,function(){e._reactRootContainer=null,e[wt]=null})}),!0):!1};Ue.unstable_batchedUpdates=nu;Ue.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!ta(n))throw Error(E(200));if(e==null||e._reactInternals===void 0)throw Error(E(38));return na(e,t,n,!1,r)};Ue.version="18.3.1-next-f1338f8080-20240426";function Rp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Rp)}catch(e){console.error(e)}}Rp(),Rf.exports=Ue;var qv=Rf.exports,Yc=qv;ro.createRoot=Yc.createRoot,ro.hydrateRoot=Yc.hydrateRoot;/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function is(){return is=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},is.apply(this,arguments)}var _t;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(_t||(_t={}));const Kc="popstate";function Jv(e){e===void 0&&(e={});function t(r,s){let{pathname:i,search:a,hash:o}=r.location;return Jo("",{pathname:i,search:a,hash:o},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function n(r,s){return typeof s=="string"?s:Ti(s)}return Zv(t,n,null,e)}function le(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Mp(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Xv(){return Math.random().toString(36).substr(2,8)}function Qc(e,t){return{usr:e.state,key:e.key,idx:t}}function Jo(e,t,n,r){return n===void 0&&(n=null),is({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?mr(t):t,{state:n,key:t&&t.key||r||Xv()})}function Ti(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function mr(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Zv(e,t,n,r){r===void 0&&(r={});let{window:s=document.defaultView,v5Compat:i=!1}=r,a=s.history,o=_t.Pop,l=null,c=f();c==null&&(c=0,a.replaceState(is({},a.state,{idx:c}),""));function f(){return(a.state||{idx:null}).idx}function d(){o=_t.Pop;let k=f(),y=k==null?null:k-c;c=k,l&&l({action:o,location:x.location,delta:y})}function m(k,y){o=_t.Push;let h=Jo(x.location,k,y);c=f()+1;let p=Qc(h,c),b=x.createHref(h);try{a.pushState(p,"",b)}catch(S){if(S instanceof DOMException&&S.name==="DataCloneError")throw S;s.location.assign(b)}i&&l&&l({action:o,location:x.location,delta:1})}function g(k,y){o=_t.Replace;let h=Jo(x.location,k,y);c=f();let p=Qc(h,c),b=x.createHref(h);a.replaceState(p,"",b),i&&l&&l({action:o,location:x.location,delta:0})}function v(k){let y=s.location.origin!=="null"?s.location.origin:s.location.href,h=typeof k=="string"?k:Ti(k);return h=h.replace(/ $/,"%20"),le(y,"No window.location.(origin|href) available to create URL for href: "+h),new URL(h,y)}let x={get action(){return o},get location(){return e(s,a)},listen(k){if(l)throw new Error("A history only accepts one active listener");return s.addEventListener(Kc,d),l=k,()=>{s.removeEventListener(Kc,d),l=null}},createHref(k){return t(s,k)},createURL:v,encodeLocation(k){let y=v(k);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:m,replace:g,go(k){return a.go(k)}};return x}var qc;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(qc||(qc={}));function e0(e,t,n){return n===void 0&&(n="/"),t0(e,t,n)}function t0(e,t,n,r){let s=typeof t=="string"?mr(t):t,i=cu(s.pathname||"/",n);if(i==null)return null;let a=Ap(e);n0(a);let o=null;for(let l=0;o==null&&l<a.length;++l){let c=p0(i);o=d0(a[l],c)}return o}function Ap(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let s=(i,a,o)=>{let l={relativePath:o===void 0?i.path||"":o,caseSensitive:i.caseSensitive===!0,childrenIndex:a,route:i};l.relativePath.startsWith("/")&&(le(l.relativePath.startsWith(r),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(r.length));let c=zt([r,l.relativePath]),f=n.concat(l);i.children&&i.children.length>0&&(le(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Ap(i.children,t,f,c)),!(i.path==null&&!i.index)&&t.push({path:c,score:u0(c,i.index),routesMeta:f})};return e.forEach((i,a)=>{var o;if(i.path===""||!((o=i.path)!=null&&o.includes("?")))s(i,a);else for(let l of Lp(i.path))s(i,a,l)}),t}function Lp(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,s=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return s?[i,""]:[i];let a=Lp(r.join("/")),o=[];return o.push(...a.map(l=>l===""?i:[i,l].join("/"))),s&&o.push(...a),o.map(l=>e.startsWith("/")&&l===""?"/":l)}function n0(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:c0(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const r0=/^:[\w-]+$/,s0=3,i0=2,a0=1,o0=10,l0=-2,Jc=e=>e==="*";function u0(e,t){let n=e.split("/"),r=n.length;return n.some(Jc)&&(r+=l0),t&&(r+=i0),n.filter(s=>!Jc(s)).reduce((s,i)=>s+(r0.test(i)?s0:i===""?a0:o0),r)}function c0(e,t){return e.length===t.length&&e.slice(0,-1).every((r,s)=>r===t[s])?e[e.length-1]-t[t.length-1]:0}function d0(e,t,n){let{routesMeta:r}=e,s={},i="/",a=[];for(let o=0;o<r.length;++o){let l=r[o],c=o===r.length-1,f=i==="/"?t:t.slice(i.length)||"/",d=f0({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},f),m=l.route;if(!d)return null;Object.assign(s,d.params),a.push({params:s,pathname:zt([i,d.pathname]),pathnameBase:v0(zt([i,d.pathnameBase])),route:m}),d.pathnameBase!=="/"&&(i=zt([i,d.pathnameBase]))}return a}function f0(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=m0(e.path,e.caseSensitive,e.end),s=t.match(n);if(!s)return null;let i=s[0],a=i.replace(/(.)\/+$/,"$1"),o=s.slice(1);return{params:r.reduce((c,f,d)=>{let{paramName:m,isOptional:g}=f;if(m==="*"){let x=o[d]||"";a=i.slice(0,i.length-x.length).replace(/(.)\/+$/,"$1")}const v=o[d];return g&&!v?c[m]=void 0:c[m]=(v||"").replace(/%2F/g,"/"),c},{}),pathname:i,pathnameBase:a,pattern:e}}function m0(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Mp(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],s="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,o,l)=>(r.push({paramName:o,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),s+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":e!==""&&e!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,t?void 0:"i"),r]}function p0(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Mp(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function cu(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function h0(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:s=""}=typeof e=="string"?mr(e):e;return{pathname:n?n.startsWith("/")?n:g0(n,t):t,search:x0(r),hash:w0(s)}}function g0(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function Ba(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function y0(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function _p(e,t){let n=y0(e);return t?n.map((r,s)=>s===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Dp(e,t,n,r){r===void 0&&(r=!1);let s;typeof e=="string"?s=mr(e):(s=is({},e),le(!s.pathname||!s.pathname.includes("?"),Ba("?","pathname","search",s)),le(!s.pathname||!s.pathname.includes("#"),Ba("#","pathname","hash",s)),le(!s.search||!s.search.includes("#"),Ba("#","search","hash",s)));let i=e===""||s.pathname==="",a=i?"/":s.pathname,o;if(a==null)o=n;else{let d=t.length-1;if(!r&&a.startsWith("..")){let m=a.split("/");for(;m[0]==="..";)m.shift(),d-=1;s.pathname=m.join("/")}o=d>=0?t[d]:"/"}let l=h0(s,o),c=a&&a!=="/"&&a.endsWith("/"),f=(i||a===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||f)&&(l.pathname+="/"),l}const zt=e=>e.join("/").replace(/\/\/+/g,"/"),v0=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),x0=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,w0=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function b0(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Ip=["post","put","patch","delete"];new Set(Ip);const k0=["get",...Ip];new Set(k0);/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function as(){return as=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},as.apply(this,arguments)}const du=w.createContext(null),S0=w.createContext(null),jn=w.createContext(null),ra=w.createContext(null),Xt=w.createContext({outlet:null,matches:[],isDataRoute:!1}),Vp=w.createContext(null);function C0(e,t){let{relative:n}=t===void 0?{}:t;ys()||le(!1);let{basename:r,navigator:s}=w.useContext(jn),{hash:i,pathname:a,search:o}=Fp(e,{relative:n}),l=a;return r!=="/"&&(l=a==="/"?r:zt([r,a])),s.createHref({pathname:l,search:o,hash:i})}function ys(){return w.useContext(ra)!=null}function vs(){return ys()||le(!1),w.useContext(ra).location}function Op(e){w.useContext(jn).static||w.useLayoutEffect(e)}function N0(){let{isDataRoute:e}=w.useContext(Xt);return e?O0():j0()}function j0(){ys()||le(!1);let e=w.useContext(du),{basename:t,future:n,navigator:r}=w.useContext(jn),{matches:s}=w.useContext(Xt),{pathname:i}=vs(),a=JSON.stringify(_p(s,n.v7_relativeSplatPath)),o=w.useRef(!1);return Op(()=>{o.current=!0}),w.useCallback(function(c,f){if(f===void 0&&(f={}),!o.current)return;if(typeof c=="number"){r.go(c);return}let d=Dp(c,JSON.parse(a),i,f.relative==="path");e==null&&t!=="/"&&(d.pathname=d.pathname==="/"?t:zt([t,d.pathname])),(f.replace?r.replace:r.push)(d,f.state,f)},[t,r,a,i,e])}function fu(){let{matches:e}=w.useContext(Xt),t=e[e.length-1];return t?t.params:{}}function Fp(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=w.useContext(jn),{matches:s}=w.useContext(Xt),{pathname:i}=vs(),a=JSON.stringify(_p(s,r.v7_relativeSplatPath));return w.useMemo(()=>Dp(e,JSON.parse(a),i,n==="path"),[e,a,i,n])}function E0(e,t){return P0(e,t)}function P0(e,t,n,r){ys()||le(!1);let{navigator:s}=w.useContext(jn),{matches:i}=w.useContext(Xt),a=i[i.length-1],o=a?a.params:{};a&&a.pathname;let l=a?a.pathnameBase:"/";a&&a.route;let c=vs(),f;if(t){var d;let k=typeof t=="string"?mr(t):t;l==="/"||(d=k.pathname)!=null&&d.startsWith(l)||le(!1),f=k}else f=c;let m=f.pathname||"/",g=m;if(l!=="/"){let k=l.replace(/^\//,"").split("/");g="/"+m.replace(/^\//,"").split("/").slice(k.length).join("/")}let v=e0(e,{pathname:g}),x=L0(v&&v.map(k=>Object.assign({},k,{params:Object.assign({},o,k.params),pathname:zt([l,s.encodeLocation?s.encodeLocation(k.pathname).pathname:k.pathname]),pathnameBase:k.pathnameBase==="/"?l:zt([l,s.encodeLocation?s.encodeLocation(k.pathnameBase).pathname:k.pathnameBase])})),i,n,r);return t&&x?w.createElement(ra.Provider,{value:{location:as({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:_t.Pop}},x):x}function T0(){let e=V0(),t=b0(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return w.createElement(w.Fragment,null,w.createElement("h2",null,"Unexpected Application Error!"),w.createElement("h3",{style:{fontStyle:"italic"}},t),n?w.createElement("pre",{style:s},n):null,null)}const R0=w.createElement(T0,null);class M0 extends w.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?w.createElement(Xt.Provider,{value:this.props.routeContext},w.createElement(Vp.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function A0(e){let{routeContext:t,match:n,children:r}=e,s=w.useContext(du);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),w.createElement(Xt.Provider,{value:t},r)}function L0(e,t,n,r){var s;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let a=e,o=(s=n)==null?void 0:s.errors;if(o!=null){let f=a.findIndex(d=>d.route.id&&(o==null?void 0:o[d.route.id])!==void 0);f>=0||le(!1),a=a.slice(0,Math.min(a.length,f+1))}let l=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let f=0;f<a.length;f++){let d=a[f];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(c=f),d.route.id){let{loaderData:m,errors:g}=n,v=d.route.loader&&m[d.route.id]===void 0&&(!g||g[d.route.id]===void 0);if(d.route.lazy||v){l=!0,c>=0?a=a.slice(0,c+1):a=[a[0]];break}}}return a.reduceRight((f,d,m)=>{let g,v=!1,x=null,k=null;n&&(g=o&&d.route.id?o[d.route.id]:void 0,x=d.route.errorElement||R0,l&&(c<0&&m===0?(F0("route-fallback"),v=!0,k=null):c===m&&(v=!0,k=d.route.hydrateFallbackElement||null)));let y=t.concat(a.slice(0,m+1)),h=()=>{let p;return g?p=x:v?p=k:d.route.Component?p=w.createElement(d.route.Component,null):d.route.element?p=d.route.element:p=f,w.createElement(A0,{match:d,routeContext:{outlet:f,matches:y,isDataRoute:n!=null},children:p})};return n&&(d.route.ErrorBoundary||d.route.errorElement||m===0)?w.createElement(M0,{location:n.location,revalidation:n.revalidation,component:x,error:g,children:h(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):h()},null)}var Up=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Up||{}),Bp=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Bp||{});function _0(e){let t=w.useContext(du);return t||le(!1),t}function D0(e){let t=w.useContext(S0);return t||le(!1),t}function I0(e){let t=w.useContext(Xt);return t||le(!1),t}function $p(e){let t=I0(),n=t.matches[t.matches.length-1];return n.route.id||le(!1),n.route.id}function V0(){var e;let t=w.useContext(Vp),n=D0(),r=$p();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function O0(){let{router:e}=_0(Up.UseNavigateStable),t=$p(Bp.UseNavigateStable),n=w.useRef(!1);return Op(()=>{n.current=!0}),w.useCallback(function(s,i){i===void 0&&(i={}),n.current&&(typeof s=="number"?e.navigate(s):e.navigate(s,as({fromRouteId:t},i)))},[e,t])}const Xc={};function F0(e,t,n){Xc[e]||(Xc[e]=!0)}function U0(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Je(e){le(!1)}function B0(e){let{basename:t="/",children:n=null,location:r,navigationType:s=_t.Pop,navigator:i,static:a=!1,future:o}=e;ys()&&le(!1);let l=t.replace(/^\/*/,"/"),c=w.useMemo(()=>({basename:l,navigator:i,static:a,future:as({v7_relativeSplatPath:!1},o)}),[l,o,i,a]);typeof r=="string"&&(r=mr(r));let{pathname:f="/",search:d="",hash:m="",state:g=null,key:v="default"}=r,x=w.useMemo(()=>{let k=cu(f,l);return k==null?null:{location:{pathname:k,search:d,hash:m,state:g,key:v},navigationType:s}},[l,f,d,m,g,v,s]);return x==null?null:w.createElement(jn.Provider,{value:c},w.createElement(ra.Provider,{children:n,value:x}))}function $0(e){let{children:t,location:n}=e;return E0(Xo(t),n)}new Promise(()=>{});function Xo(e,t){t===void 0&&(t=[]);let n=[];return w.Children.forEach(e,(r,s)=>{if(!w.isValidElement(r))return;let i=[...t,s];if(r.type===w.Fragment){n.push.apply(n,Xo(r.props.children,i));return}r.type!==Je&&le(!1),!r.props.index||!r.props.children||le(!1);let a={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=Xo(r.props.children,i)),n.push(a)}),n}/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Zo(){return Zo=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Zo.apply(this,arguments)}function z0(e,t){if(e==null)return{};var n={},r=Object.keys(e),s,i;for(i=0;i<r.length;i++)s=r[i],!(t.indexOf(s)>=0)&&(n[s]=e[s]);return n}function W0(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function H0(e,t){return e.button===0&&(!t||t==="_self")&&!W0(e)}const G0=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Y0="6";try{window.__reactRouterVersion=Y0}catch{}const K0="startTransition",Zc=Fg[K0];function Q0(e){let{basename:t,children:n,future:r,window:s}=e,i=w.useRef();i.current==null&&(i.current=Jv({window:s,v5Compat:!0}));let a=i.current,[o,l]=w.useState({action:a.action,location:a.location}),{v7_startTransition:c}=r||{},f=w.useCallback(d=>{c&&Zc?Zc(()=>l(d)):l(d)},[l,c]);return w.useLayoutEffect(()=>a.listen(f),[a,f]),w.useEffect(()=>U0(r),[r]),w.createElement(B0,{basename:t,children:n,location:o.location,navigationType:o.action,navigator:a,future:r})}const q0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",J0=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ee=w.forwardRef(function(t,n){let{onClick:r,relative:s,reloadDocument:i,replace:a,state:o,target:l,to:c,preventScrollReset:f,viewTransition:d}=t,m=z0(t,G0),{basename:g}=w.useContext(jn),v,x=!1;if(typeof c=="string"&&J0.test(c)&&(v=c,q0))try{let p=new URL(window.location.href),b=c.startsWith("//")?new URL(p.protocol+c):new URL(c),S=cu(b.pathname,g);b.origin===p.origin&&S!=null?c=S+b.search+b.hash:x=!0}catch{}let k=C0(c,{relative:s}),y=X0(c,{replace:a,state:o,target:l,preventScrollReset:f,relative:s,viewTransition:d});function h(p){r&&r(p),p.defaultPrevented||y(p)}return w.createElement("a",Zo({},m,{href:v||k,onClick:x||i?r:h,ref:n,target:l}))});var ed;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(ed||(ed={}));var td;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(td||(td={}));function X0(e,t){let{target:n,replace:r,state:s,preventScrollReset:i,relative:a,viewTransition:o}=t===void 0?{}:t,l=N0(),c=vs(),f=Fp(e,{relative:a});return w.useCallback(d=>{if(H0(d,n)){d.preventDefault();let m=r!==void 0?r:Ti(c)===Ti(f);l(e,{replace:m,state:s,preventScrollReset:i,relative:a,viewTransition:o})}},[c,l,f,r,s,n,e,i,a,o])}const zp=w.createContext({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"}),sa=w.createContext({}),ia=w.createContext(null),aa=typeof document<"u",mu=aa?w.useLayoutEffect:w.useEffect,Wp=w.createContext({strict:!1}),pu=e=>e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),Z0="framerAppearId",Hp="data-"+pu(Z0);function ex(e,t,n,r){const{visualElement:s}=w.useContext(sa),i=w.useContext(Wp),a=w.useContext(ia),o=w.useContext(zp).reducedMotion,l=w.useRef();r=r||i.renderer,!l.current&&r&&(l.current=r(e,{visualState:t,parent:s,props:n,presenceContext:a,blockInitialAnimation:a?a.initial===!1:!1,reducedMotionConfig:o}));const c=l.current;w.useInsertionEffect(()=>{c&&c.update(n,a)});const f=w.useRef(!!(n[Hp]&&!window.HandoffComplete));return mu(()=>{c&&(c.render(),f.current&&c.animationState&&c.animationState.animateChanges())}),w.useEffect(()=>{c&&(c.updateFeatures(),!f.current&&c.animationState&&c.animationState.animateChanges(),f.current&&(f.current=!1,window.HandoffComplete=!0))}),c}function zn(e){return e&&typeof e=="object"&&Object.prototype.hasOwnProperty.call(e,"current")}function tx(e,t,n){return w.useCallback(r=>{r&&e.mount&&e.mount(r),t&&(r?t.mount(r):t.unmount()),n&&(typeof n=="function"?n(r):zn(n)&&(n.current=r))},[t])}function os(e){return typeof e=="string"||Array.isArray(e)}function oa(e){return e!==null&&typeof e=="object"&&typeof e.start=="function"}const hu=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],gu=["initial",...hu];function la(e){return oa(e.animate)||gu.some(t=>os(e[t]))}function Gp(e){return!!(la(e)||e.variants)}function nx(e,t){if(la(e)){const{initial:n,animate:r}=e;return{initial:n===!1||os(n)?n:void 0,animate:os(r)?r:void 0}}return e.inherit!==!1?t:{}}function rx(e){const{initial:t,animate:n}=nx(e,w.useContext(sa));return w.useMemo(()=>({initial:t,animate:n}),[nd(t),nd(n)])}function nd(e){return Array.isArray(e)?e.join(" "):e}const rd={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},ls={};for(const e in rd)ls[e]={isEnabled:t=>rd[e].some(n=>!!t[n])};function sx(e){for(const t in e)ls[t]={...ls[t],...e[t]}}const yu=w.createContext({}),Yp=w.createContext({}),ix=Symbol.for("motionComponentSymbol");function ax({preloadedFeatures:e,createVisualElement:t,useRender:n,useVisualState:r,Component:s}){e&&sx(e);function i(o,l){let c;const f={...w.useContext(zp),...o,layoutId:ox(o)},{isStatic:d}=f,m=rx(o),g=r(o,d);if(!d&&aa){m.visualElement=ex(s,g,f,t);const v=w.useContext(Yp),x=w.useContext(Wp).strict;m.visualElement&&(c=m.visualElement.loadFeatures(f,x,e,v))}return w.createElement(sa.Provider,{value:m},c&&m.visualElement?w.createElement(c,{visualElement:m.visualElement,...f}):null,n(s,o,tx(g,m.visualElement,l),g,d,m.visualElement))}const a=w.forwardRef(i);return a[ix]=s,a}function ox({layoutId:e}){const t=w.useContext(yu).id;return t&&e!==void 0?t+"-"+e:e}function lx(e){function t(r,s={}){return ax(e(r,s))}if(typeof Proxy>"u")return t;const n=new Map;return new Proxy(t,{get:(r,s)=>(n.has(s)||n.set(s,t(s)),n.get(s))})}const ux=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function vu(e){return typeof e!="string"||e.includes("-")?!1:!!(ux.indexOf(e)>-1||/[A-Z]/.test(e))}const Ri={};function cx(e){Object.assign(Ri,e)}const xs=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],En=new Set(xs);function Kp(e,{layout:t,layoutId:n}){return En.has(e)||e.startsWith("origin")||(t||n!==void 0)&&(!!Ri[e]||e==="opacity")}const Le=e=>!!(e&&e.getVelocity),dx={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},fx=xs.length;function mx(e,{enableHardwareAcceleration:t=!0,allowTransformNone:n=!0},r,s){let i="";for(let a=0;a<fx;a++){const o=xs[a];if(e[o]!==void 0){const l=dx[o]||o;i+=`${l}(${e[o]}) `}}return t&&!e.z&&(i+="translateZ(0)"),i=i.trim(),s?i=s(e,r?"":i):n&&r&&(i="none"),i}const Qp=e=>t=>typeof t=="string"&&t.startsWith(e),qp=Qp("--"),el=Qp("var(--"),px=/var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g,hx=(e,t)=>t&&typeof e=="number"?t.transform(e):e,Yt=(e,t,n)=>Math.min(Math.max(n,e),t),Pn={test:e=>typeof e=="number",parse:parseFloat,transform:e=>e},Or={...Pn,transform:e=>Yt(0,1,e)},Bs={...Pn,default:1},Fr=e=>Math.round(e*1e5)/1e5,ua=/(-)?([\d]*\.?[\d])+/g,Jp=/(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,gx=/^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;function ws(e){return typeof e=="string"}const bs=e=>({test:t=>ws(t)&&t.endsWith(e)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${e}`}),jt=bs("deg"),ct=bs("%"),I=bs("px"),yx=bs("vh"),vx=bs("vw"),sd={...ct,parse:e=>ct.parse(e)/100,transform:e=>ct.transform(e*100)},id={...Pn,transform:Math.round},Xp={borderWidth:I,borderTopWidth:I,borderRightWidth:I,borderBottomWidth:I,borderLeftWidth:I,borderRadius:I,radius:I,borderTopLeftRadius:I,borderTopRightRadius:I,borderBottomRightRadius:I,borderBottomLeftRadius:I,width:I,maxWidth:I,height:I,maxHeight:I,size:I,top:I,right:I,bottom:I,left:I,padding:I,paddingTop:I,paddingRight:I,paddingBottom:I,paddingLeft:I,margin:I,marginTop:I,marginRight:I,marginBottom:I,marginLeft:I,rotate:jt,rotateX:jt,rotateY:jt,rotateZ:jt,scale:Bs,scaleX:Bs,scaleY:Bs,scaleZ:Bs,skew:jt,skewX:jt,skewY:jt,distance:I,translateX:I,translateY:I,translateZ:I,x:I,y:I,z:I,perspective:I,transformPerspective:I,opacity:Or,originX:sd,originY:sd,originZ:I,zIndex:id,fillOpacity:Or,strokeOpacity:Or,numOctaves:id};function xu(e,t,n,r){const{style:s,vars:i,transform:a,transformOrigin:o}=e;let l=!1,c=!1,f=!0;for(const d in t){const m=t[d];if(qp(d)){i[d]=m;continue}const g=Xp[d],v=hx(m,g);if(En.has(d)){if(l=!0,a[d]=v,!f)continue;m!==(g.default||0)&&(f=!1)}else d.startsWith("origin")?(c=!0,o[d]=v):s[d]=v}if(t.transform||(l||r?s.transform=mx(e.transform,n,f,r):s.transform&&(s.transform="none")),c){const{originX:d="50%",originY:m="50%",originZ:g=0}=o;s.transformOrigin=`${d} ${m} ${g}`}}const wu=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Zp(e,t,n){for(const r in t)!Le(t[r])&&!Kp(r,n)&&(e[r]=t[r])}function xx({transformTemplate:e},t,n){return w.useMemo(()=>{const r=wu();return xu(r,t,{enableHardwareAcceleration:!n},e),Object.assign({},r.vars,r.style)},[t])}function wx(e,t,n){const r=e.style||{},s={};return Zp(s,r,e),Object.assign(s,xx(e,t,n)),e.transformValues?e.transformValues(s):s}function bx(e,t,n){const r={},s=wx(e,t,n);return e.drag&&e.dragListener!==!1&&(r.draggable=!1,s.userSelect=s.WebkitUserSelect=s.WebkitTouchCallout="none",s.touchAction=e.drag===!0?"none":`pan-${e.drag==="x"?"y":"x"}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(r.tabIndex=0),r.style=s,r}const kx=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","transformValues","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function Mi(e){return e.startsWith("while")||e.startsWith("drag")&&e!=="draggable"||e.startsWith("layout")||e.startsWith("onTap")||e.startsWith("onPan")||e.startsWith("onLayout")||kx.has(e)}let eh=e=>!Mi(e);function Sx(e){e&&(eh=t=>t.startsWith("on")?!Mi(t):e(t))}try{Sx(require("@emotion/is-prop-valid").default)}catch{}function Cx(e,t,n){const r={};for(const s in e)s==="values"&&typeof e.values=="object"||(eh(s)||n===!0&&Mi(s)||!t&&!Mi(s)||e.draggable&&s.startsWith("onDrag"))&&(r[s]=e[s]);return r}function ad(e,t,n){return typeof e=="string"?e:I.transform(t+n*e)}function Nx(e,t,n){const r=ad(t,e.x,e.width),s=ad(n,e.y,e.height);return`${r} ${s}`}const jx={offset:"stroke-dashoffset",array:"stroke-dasharray"},Ex={offset:"strokeDashoffset",array:"strokeDasharray"};function Px(e,t,n=1,r=0,s=!0){e.pathLength=1;const i=s?jx:Ex;e[i.offset]=I.transform(-r);const a=I.transform(t),o=I.transform(n);e[i.array]=`${a} ${o}`}function bu(e,{attrX:t,attrY:n,attrScale:r,originX:s,originY:i,pathLength:a,pathSpacing:o=1,pathOffset:l=0,...c},f,d,m){if(xu(e,c,f,m),d){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};const{attrs:g,style:v,dimensions:x}=e;g.transform&&(x&&(v.transform=g.transform),delete g.transform),x&&(s!==void 0||i!==void 0||v.transform)&&(v.transformOrigin=Nx(x,s!==void 0?s:.5,i!==void 0?i:.5)),t!==void 0&&(g.x=t),n!==void 0&&(g.y=n),r!==void 0&&(g.scale=r),a!==void 0&&Px(g,a,o,l,!1)}const th=()=>({...wu(),attrs:{}}),ku=e=>typeof e=="string"&&e.toLowerCase()==="svg";function Tx(e,t,n,r){const s=w.useMemo(()=>{const i=th();return bu(i,t,{enableHardwareAcceleration:!1},ku(r),e.transformTemplate),{...i.attrs,style:{...i.style}}},[t]);if(e.style){const i={};Zp(i,e.style,e),s.style={...i,...s.style}}return s}function Rx(e=!1){return(n,r,s,{latestValues:i},a)=>{const l=(vu(n)?Tx:bx)(r,i,a,n),f={...Cx(r,typeof n=="string",e),...l,ref:s},{children:d}=r,m=w.useMemo(()=>Le(d)?d.get():d,[d]);return w.createElement(n,{...f,children:m})}}function nh(e,{style:t,vars:n},r,s){Object.assign(e.style,t,s&&s.getProjectionStyles(r));for(const i in n)e.style.setProperty(i,n[i])}const rh=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function sh(e,t,n,r){nh(e,t,void 0,r);for(const s in t.attrs)e.setAttribute(rh.has(s)?s:pu(s),t.attrs[s])}function Su(e,t){const{style:n}=e,r={};for(const s in n)(Le(n[s])||t.style&&Le(t.style[s])||Kp(s,e))&&(r[s]=n[s]);return r}function ih(e,t){const n=Su(e,t);for(const r in e)if(Le(e[r])||Le(t[r])){const s=xs.indexOf(r)!==-1?"attr"+r.charAt(0).toUpperCase()+r.substring(1):r;n[s]=e[r]}return n}function Cu(e,t,n,r={},s={}){return typeof t=="function"&&(t=t(n!==void 0?n:e.custom,r,s)),typeof t=="string"&&(t=e.variants&&e.variants[t]),typeof t=="function"&&(t=t(n!==void 0?n:e.custom,r,s)),t}function ah(e){const t=w.useRef(null);return t.current===null&&(t.current=e()),t.current}const Ai=e=>Array.isArray(e),Mx=e=>!!(e&&typeof e=="object"&&e.mix&&e.toValue),Ax=e=>Ai(e)?e[e.length-1]||0:e;function ri(e){const t=Le(e)?e.get():e;return Mx(t)?t.toValue():t}function Lx({scrapeMotionValuesFromProps:e,createRenderState:t,onMount:n},r,s,i){const a={latestValues:_x(r,s,i,e),renderState:t()};return n&&(a.mount=o=>n(r,o,a)),a}const oh=e=>(t,n)=>{const r=w.useContext(sa),s=w.useContext(ia),i=()=>Lx(e,t,r,s);return n?i():ah(i)};function _x(e,t,n,r){const s={},i=r(e,{});for(const m in i)s[m]=ri(i[m]);let{initial:a,animate:o}=e;const l=la(e),c=Gp(e);t&&c&&!l&&e.inherit!==!1&&(a===void 0&&(a=t.initial),o===void 0&&(o=t.animate));let f=n?n.initial===!1:!1;f=f||a===!1;const d=f?o:a;return d&&typeof d!="boolean"&&!oa(d)&&(Array.isArray(d)?d:[d]).forEach(g=>{const v=Cu(e,g);if(!v)return;const{transitionEnd:x,transition:k,...y}=v;for(const h in y){let p=y[h];if(Array.isArray(p)){const b=f?p.length-1:0;p=p[b]}p!==null&&(s[h]=p)}for(const h in x)s[h]=x[h]}),s}const ie=e=>e;class od{constructor(){this.order=[],this.scheduled=new Set}add(t){if(!this.scheduled.has(t))return this.scheduled.add(t),this.order.push(t),!0}remove(t){const n=this.order.indexOf(t);n!==-1&&(this.order.splice(n,1),this.scheduled.delete(t))}clear(){this.order.length=0,this.scheduled.clear()}}function Dx(e){let t=new od,n=new od,r=0,s=!1,i=!1;const a=new WeakSet,o={schedule:(l,c=!1,f=!1)=>{const d=f&&s,m=d?t:n;return c&&a.add(l),m.add(l)&&d&&s&&(r=t.order.length),l},cancel:l=>{n.remove(l),a.delete(l)},process:l=>{if(s){i=!0;return}if(s=!0,[t,n]=[n,t],n.clear(),r=t.order.length,r)for(let c=0;c<r;c++){const f=t.order[c];f(l),a.has(f)&&(o.schedule(f),e())}s=!1,i&&(i=!1,o.process(l))}};return o}const $s=["prepare","read","update","preRender","render","postRender"],Ix=40;function Vx(e,t){let n=!1,r=!0;const s={delta:0,timestamp:0,isProcessing:!1},i=$s.reduce((d,m)=>(d[m]=Dx(()=>n=!0),d),{}),a=d=>i[d].process(s),o=()=>{const d=performance.now();n=!1,s.delta=r?1e3/60:Math.max(Math.min(d-s.timestamp,Ix),1),s.timestamp=d,s.isProcessing=!0,$s.forEach(a),s.isProcessing=!1,n&&t&&(r=!1,e(o))},l=()=>{n=!0,r=!0,s.isProcessing||e(o)};return{schedule:$s.reduce((d,m)=>{const g=i[m];return d[m]=(v,x=!1,k=!1)=>(n||l(),g.schedule(v,x,k)),d},{}),cancel:d=>$s.forEach(m=>i[m].cancel(d)),state:s,steps:i}}const{schedule:G,cancel:St,state:xe,steps:$a}=Vx(typeof requestAnimationFrame<"u"?requestAnimationFrame:ie,!0),Ox={useVisualState:oh({scrapeMotionValuesFromProps:ih,createRenderState:th,onMount:(e,t,{renderState:n,latestValues:r})=>{G.read(()=>{try{n.dimensions=typeof t.getBBox=="function"?t.getBBox():t.getBoundingClientRect()}catch{n.dimensions={x:0,y:0,width:0,height:0}}}),G.render(()=>{bu(n,r,{enableHardwareAcceleration:!1},ku(t.tagName),e.transformTemplate),sh(t,n)})}})},Fx={useVisualState:oh({scrapeMotionValuesFromProps:Su,createRenderState:wu})};function Ux(e,{forwardMotionProps:t=!1},n,r){return{...vu(e)?Ox:Fx,preloadedFeatures:n,useRender:Rx(t),createVisualElement:r,Component:e}}function ht(e,t,n,r={passive:!0}){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n)}const lh=e=>e.pointerType==="mouse"?typeof e.button!="number"||e.button<=0:e.isPrimary!==!1;function ca(e,t="page"){return{point:{x:e[t+"X"],y:e[t+"Y"]}}}const Bx=e=>t=>lh(t)&&e(t,ca(t));function yt(e,t,n,r){return ht(e,t,Bx(n),r)}const $x=(e,t)=>n=>t(e(n)),Wt=(...e)=>e.reduce($x);function uh(e){let t=null;return()=>{const n=()=>{t=null};return t===null?(t=e,n):!1}}const ld=uh("dragHorizontal"),ud=uh("dragVertical");function ch(e){let t=!1;if(e==="y")t=ud();else if(e==="x")t=ld();else{const n=ld(),r=ud();n&&r?t=()=>{n(),r()}:(n&&n(),r&&r())}return t}function dh(){const e=ch(!0);return e?(e(),!1):!0}class Zt{constructor(t){this.isMounted=!1,this.node=t}update(){}}function cd(e,t){const n="pointer"+(t?"enter":"leave"),r="onHover"+(t?"Start":"End"),s=(i,a)=>{if(i.pointerType==="touch"||dh())return;const o=e.getProps();e.animationState&&o.whileHover&&e.animationState.setActive("whileHover",t),o[r]&&G.update(()=>o[r](i,a))};return yt(e.current,n,s,{passive:!e.getProps()[r]})}class zx extends Zt{mount(){this.unmount=Wt(cd(this.node,!0),cd(this.node,!1))}unmount(){}}class Wx extends Zt{constructor(){super(...arguments),this.isActive=!1}onFocus(){let t=!1;try{t=this.node.current.matches(":focus-visible")}catch{t=!0}!t||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=Wt(ht(this.node.current,"focus",()=>this.onFocus()),ht(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}const fh=(e,t)=>t?e===t?!0:fh(e,t.parentElement):!1;function za(e,t){if(!t)return;const n=new PointerEvent("pointer"+e);t(n,ca(n))}class Hx extends Zt{constructor(){super(...arguments),this.removeStartListeners=ie,this.removeEndListeners=ie,this.removeAccessibleListeners=ie,this.startPointerPress=(t,n)=>{if(this.isPressing)return;this.removeEndListeners();const r=this.node.getProps(),i=yt(window,"pointerup",(o,l)=>{if(!this.checkPressEnd())return;const{onTap:c,onTapCancel:f,globalTapTarget:d}=this.node.getProps();G.update(()=>{!d&&!fh(this.node.current,o.target)?f&&f(o,l):c&&c(o,l)})},{passive:!(r.onTap||r.onPointerUp)}),a=yt(window,"pointercancel",(o,l)=>this.cancelPress(o,l),{passive:!(r.onTapCancel||r.onPointerCancel)});this.removeEndListeners=Wt(i,a),this.startPress(t,n)},this.startAccessiblePress=()=>{const t=i=>{if(i.key!=="Enter"||this.isPressing)return;const a=o=>{o.key!=="Enter"||!this.checkPressEnd()||za("up",(l,c)=>{const{onTap:f}=this.node.getProps();f&&G.update(()=>f(l,c))})};this.removeEndListeners(),this.removeEndListeners=ht(this.node.current,"keyup",a),za("down",(o,l)=>{this.startPress(o,l)})},n=ht(this.node.current,"keydown",t),r=()=>{this.isPressing&&za("cancel",(i,a)=>this.cancelPress(i,a))},s=ht(this.node.current,"blur",r);this.removeAccessibleListeners=Wt(n,s)}}startPress(t,n){this.isPressing=!0;const{onTapStart:r,whileTap:s}=this.node.getProps();s&&this.node.animationState&&this.node.animationState.setActive("whileTap",!0),r&&G.update(()=>r(t,n))}checkPressEnd(){return this.removeEndListeners(),this.isPressing=!1,this.node.getProps().whileTap&&this.node.animationState&&this.node.animationState.setActive("whileTap",!1),!dh()}cancelPress(t,n){if(!this.checkPressEnd())return;const{onTapCancel:r}=this.node.getProps();r&&G.update(()=>r(t,n))}mount(){const t=this.node.getProps(),n=yt(t.globalTapTarget?window:this.node.current,"pointerdown",this.startPointerPress,{passive:!(t.onTapStart||t.onPointerStart)}),r=ht(this.node.current,"focus",this.startAccessiblePress);this.removeStartListeners=Wt(n,r)}unmount(){this.removeStartListeners(),this.removeEndListeners(),this.removeAccessibleListeners()}}const tl=new WeakMap,Wa=new WeakMap,Gx=e=>{const t=tl.get(e.target);t&&t(e)},Yx=e=>{e.forEach(Gx)};function Kx({root:e,...t}){const n=e||document;Wa.has(n)||Wa.set(n,{});const r=Wa.get(n),s=JSON.stringify(t);return r[s]||(r[s]=new IntersectionObserver(Yx,{root:e,...t})),r[s]}function Qx(e,t,n){const r=Kx(t);return tl.set(e,n),r.observe(e),()=>{tl.delete(e),r.unobserve(e)}}const qx={some:0,all:1};class Jx extends Zt{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:t={}}=this.node.getProps(),{root:n,margin:r,amount:s="some",once:i}=t,a={root:n?n.current:void 0,rootMargin:r,threshold:typeof s=="number"?s:qx[s]},o=l=>{const{isIntersecting:c}=l;if(this.isInView===c||(this.isInView=c,i&&!c&&this.hasEnteredView))return;c&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",c);const{onViewportEnter:f,onViewportLeave:d}=this.node.getProps(),m=c?f:d;m&&m(l)};return Qx(this.node.current,a,o)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:t,prevProps:n}=this.node;["amount","margin","root"].some(Xx(t,n))&&this.startObserver()}unmount(){}}function Xx({viewport:e={}},{viewport:t={}}={}){return n=>e[n]!==t[n]}const Zx={inView:{Feature:Jx},tap:{Feature:Hx},focus:{Feature:Wx},hover:{Feature:zx}};function mh(e,t){if(!Array.isArray(t))return!1;const n=t.length;if(n!==e.length)return!1;for(let r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}function e1(e){const t={};return e.values.forEach((n,r)=>t[r]=n.get()),t}function t1(e){const t={};return e.values.forEach((n,r)=>t[r]=n.getVelocity()),t}function da(e,t,n){const r=e.getProps();return Cu(r,t,n!==void 0?n:r.custom,e1(e),t1(e))}let Nu=ie;const yn=e=>e*1e3,vt=e=>e/1e3,n1={current:!1},ph=e=>Array.isArray(e)&&typeof e[0]=="number";function hh(e){return!!(!e||typeof e=="string"&&gh[e]||ph(e)||Array.isArray(e)&&e.every(hh))}const Pr=([e,t,n,r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`,gh={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Pr([0,.65,.55,1]),circOut:Pr([.55,0,1,.45]),backIn:Pr([.31,.01,.66,-.59]),backOut:Pr([.33,1.53,.69,.99])};function yh(e){if(e)return ph(e)?Pr(e):Array.isArray(e)?e.map(yh):gh[e]}function r1(e,t,n,{delay:r=0,duration:s,repeat:i=0,repeatType:a="loop",ease:o,times:l}={}){const c={[t]:n};l&&(c.offset=l);const f=yh(o);return Array.isArray(f)&&(c.easing=f),e.animate(c,{delay:r,duration:s,easing:Array.isArray(f)?"linear":f,fill:"both",iterations:i+1,direction:a==="reverse"?"alternate":"normal"})}function s1(e,{repeat:t,repeatType:n="loop"}){const r=t&&n!=="loop"&&t%2===1?0:e.length-1;return e[r]}const vh=(e,t,n)=>(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e,i1=1e-7,a1=12;function o1(e,t,n,r,s){let i,a,o=0;do a=t+(n-t)/2,i=vh(a,r,s)-e,i>0?n=a:t=a;while(Math.abs(i)>i1&&++o<a1);return a}function ks(e,t,n,r){if(e===t&&n===r)return ie;const s=i=>o1(i,0,1,e,n);return i=>i===0||i===1?i:vh(s(i),t,r)}const l1=ks(.42,0,1,1),u1=ks(0,0,.58,1),xh=ks(.42,0,.58,1),c1=e=>Array.isArray(e)&&typeof e[0]!="number",wh=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,bh=e=>t=>1-e(1-t),ju=e=>1-Math.sin(Math.acos(e)),kh=bh(ju),d1=wh(ju),Sh=ks(.33,1.53,.69,.99),Eu=bh(Sh),f1=wh(Eu),m1=e=>(e*=2)<1?.5*Eu(e):.5*(2-Math.pow(2,-10*(e-1))),p1={linear:ie,easeIn:l1,easeInOut:xh,easeOut:u1,circIn:ju,circInOut:d1,circOut:kh,backIn:Eu,backInOut:f1,backOut:Sh,anticipate:m1},dd=e=>{if(Array.isArray(e)){Nu(e.length===4);const[t,n,r,s]=e;return ks(t,n,r,s)}else if(typeof e=="string")return p1[e];return e},Pu=(e,t)=>n=>!!(ws(n)&&gx.test(n)&&n.startsWith(e)||t&&Object.prototype.hasOwnProperty.call(n,t)),Ch=(e,t,n)=>r=>{if(!ws(r))return r;const[s,i,a,o]=r.match(ua);return{[e]:parseFloat(s),[t]:parseFloat(i),[n]:parseFloat(a),alpha:o!==void 0?parseFloat(o):1}},h1=e=>Yt(0,255,e),Ha={...Pn,transform:e=>Math.round(h1(e))},pn={test:Pu("rgb","red"),parse:Ch("red","green","blue"),transform:({red:e,green:t,blue:n,alpha:r=1})=>"rgba("+Ha.transform(e)+", "+Ha.transform(t)+", "+Ha.transform(n)+", "+Fr(Or.transform(r))+")"};function g1(e){let t="",n="",r="",s="";return e.length>5?(t=e.substring(1,3),n=e.substring(3,5),r=e.substring(5,7),s=e.substring(7,9)):(t=e.substring(1,2),n=e.substring(2,3),r=e.substring(3,4),s=e.substring(4,5),t+=t,n+=n,r+=r,s+=s),{red:parseInt(t,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:s?parseInt(s,16)/255:1}}const nl={test:Pu("#"),parse:g1,transform:pn.transform},Wn={test:Pu("hsl","hue"),parse:Ch("hue","saturation","lightness"),transform:({hue:e,saturation:t,lightness:n,alpha:r=1})=>"hsla("+Math.round(e)+", "+ct.transform(Fr(t))+", "+ct.transform(Fr(n))+", "+Fr(Or.transform(r))+")"},Se={test:e=>pn.test(e)||nl.test(e)||Wn.test(e),parse:e=>pn.test(e)?pn.parse(e):Wn.test(e)?Wn.parse(e):nl.parse(e),transform:e=>ws(e)?e:e.hasOwnProperty("red")?pn.transform(e):Wn.transform(e)},Z=(e,t,n)=>-n*e+n*t+e;function Ga(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function y1({hue:e,saturation:t,lightness:n,alpha:r}){e/=360,t/=100,n/=100;let s=0,i=0,a=0;if(!t)s=i=a=n;else{const o=n<.5?n*(1+t):n+t-n*t,l=2*n-o;s=Ga(l,o,e+1/3),i=Ga(l,o,e),a=Ga(l,o,e-1/3)}return{red:Math.round(s*255),green:Math.round(i*255),blue:Math.round(a*255),alpha:r}}const Ya=(e,t,n)=>{const r=e*e;return Math.sqrt(Math.max(0,n*(t*t-r)+r))},v1=[nl,pn,Wn],x1=e=>v1.find(t=>t.test(e));function fd(e){const t=x1(e);let n=t.parse(e);return t===Wn&&(n=y1(n)),n}const Nh=(e,t)=>{const n=fd(e),r=fd(t),s={...n};return i=>(s.red=Ya(n.red,r.red,i),s.green=Ya(n.green,r.green,i),s.blue=Ya(n.blue,r.blue,i),s.alpha=Z(n.alpha,r.alpha,i),pn.transform(s))};function w1(e){var t,n;return isNaN(e)&&ws(e)&&(((t=e.match(ua))===null||t===void 0?void 0:t.length)||0)+(((n=e.match(Jp))===null||n===void 0?void 0:n.length)||0)>0}const jh={regex:px,countKey:"Vars",token:"${v}",parse:ie},Eh={regex:Jp,countKey:"Colors",token:"${c}",parse:Se.parse},Ph={regex:ua,countKey:"Numbers",token:"${n}",parse:Pn.parse};function Ka(e,{regex:t,countKey:n,token:r,parse:s}){const i=e.tokenised.match(t);i&&(e["num"+n]=i.length,e.tokenised=e.tokenised.replace(t,r),e.values.push(...i.map(s)))}function Li(e){const t=e.toString(),n={value:t,tokenised:t,values:[],numVars:0,numColors:0,numNumbers:0};return n.value.includes("var(--")&&Ka(n,jh),Ka(n,Eh),Ka(n,Ph),n}function Th(e){return Li(e).values}function Rh(e){const{values:t,numColors:n,numVars:r,tokenised:s}=Li(e),i=t.length;return a=>{let o=s;for(let l=0;l<i;l++)l<r?o=o.replace(jh.token,a[l]):l<r+n?o=o.replace(Eh.token,Se.transform(a[l])):o=o.replace(Ph.token,Fr(a[l]));return o}}const b1=e=>typeof e=="number"?0:e;function k1(e){const t=Th(e);return Rh(e)(t.map(b1))}const Kt={test:w1,parse:Th,createTransformer:Rh,getAnimatableNone:k1},Mh=(e,t)=>n=>`${n>0?t:e}`;function Ah(e,t){return typeof e=="number"?n=>Z(e,t,n):Se.test(e)?Nh(e,t):e.startsWith("var(")?Mh(e,t):_h(e,t)}const Lh=(e,t)=>{const n=[...e],r=n.length,s=e.map((i,a)=>Ah(i,t[a]));return i=>{for(let a=0;a<r;a++)n[a]=s[a](i);return n}},S1=(e,t)=>{const n={...e,...t},r={};for(const s in n)e[s]!==void 0&&t[s]!==void 0&&(r[s]=Ah(e[s],t[s]));return s=>{for(const i in r)n[i]=r[i](s);return n}},_h=(e,t)=>{const n=Kt.createTransformer(t),r=Li(e),s=Li(t);return r.numVars===s.numVars&&r.numColors===s.numColors&&r.numNumbers>=s.numNumbers?Wt(Lh(r.values,s.values),n):Mh(e,t)},us=(e,t,n)=>{const r=t-e;return r===0?1:(n-e)/r},md=(e,t)=>n=>Z(e,t,n);function C1(e){return typeof e=="number"?md:typeof e=="string"?Se.test(e)?Nh:_h:Array.isArray(e)?Lh:typeof e=="object"?S1:md}function N1(e,t,n){const r=[],s=n||C1(e[0]),i=e.length-1;for(let a=0;a<i;a++){let o=s(e[a],e[a+1]);if(t){const l=Array.isArray(t)?t[a]||ie:t;o=Wt(l,o)}r.push(o)}return r}function Dh(e,t,{clamp:n=!0,ease:r,mixer:s}={}){const i=e.length;if(Nu(i===t.length),i===1)return()=>t[0];e[0]>e[i-1]&&(e=[...e].reverse(),t=[...t].reverse());const a=N1(t,r,s),o=a.length,l=c=>{let f=0;if(o>1)for(;f<e.length-2&&!(c<e[f+1]);f++);const d=us(e[f],e[f+1],c);return a[f](d)};return n?c=>l(Yt(e[0],e[i-1],c)):l}function j1(e,t){const n=e[e.length-1];for(let r=1;r<=t;r++){const s=us(0,t,r);e.push(Z(n,1,s))}}function E1(e){const t=[0];return j1(t,e.length-1),t}function P1(e,t){return e.map(n=>n*t)}function T1(e,t){return e.map(()=>t||xh).splice(0,e.length-1)}function _i({duration:e=300,keyframes:t,times:n,ease:r="easeInOut"}){const s=c1(r)?r.map(dd):dd(r),i={done:!1,value:t[0]},a=P1(n&&n.length===t.length?n:E1(t),e),o=Dh(a,t,{ease:Array.isArray(s)?s:T1(t,s)});return{calculatedDuration:e,next:l=>(i.value=o(l),i.done=l>=e,i)}}function Ih(e,t){return t?e*(1e3/t):0}const R1=5;function Vh(e,t,n){const r=Math.max(t-R1,0);return Ih(n-e(r),t-r)}const Qa=.001,M1=.01,A1=10,L1=.05,_1=1;function D1({duration:e=800,bounce:t=.25,velocity:n=0,mass:r=1}){let s,i,a=1-t;a=Yt(L1,_1,a),e=Yt(M1,A1,vt(e)),a<1?(s=c=>{const f=c*a,d=f*e,m=f-n,g=rl(c,a),v=Math.exp(-d);return Qa-m/g*v},i=c=>{const d=c*a*e,m=d*n+n,g=Math.pow(a,2)*Math.pow(c,2)*e,v=Math.exp(-d),x=rl(Math.pow(c,2),a);return(-s(c)+Qa>0?-1:1)*((m-g)*v)/x}):(s=c=>{const f=Math.exp(-c*e),d=(c-n)*e+1;return-Qa+f*d},i=c=>{const f=Math.exp(-c*e),d=(n-c)*(e*e);return f*d});const o=5/e,l=V1(s,i,o);if(e=yn(e),isNaN(l))return{stiffness:100,damping:10,duration:e};{const c=Math.pow(l,2)*r;return{stiffness:c,damping:a*2*Math.sqrt(r*c),duration:e}}}const I1=12;function V1(e,t,n){let r=n;for(let s=1;s<I1;s++)r=r-e(r)/t(r);return r}function rl(e,t){return e*Math.sqrt(1-t*t)}const O1=["duration","bounce"],F1=["stiffness","damping","mass"];function pd(e,t){return t.some(n=>e[n]!==void 0)}function U1(e){let t={velocity:0,stiffness:100,damping:10,mass:1,isResolvedFromDuration:!1,...e};if(!pd(e,F1)&&pd(e,O1)){const n=D1(e);t={...t,...n,mass:1},t.isResolvedFromDuration=!0}return t}function Oh({keyframes:e,restDelta:t,restSpeed:n,...r}){const s=e[0],i=e[e.length-1],a={done:!1,value:s},{stiffness:o,damping:l,mass:c,duration:f,velocity:d,isResolvedFromDuration:m}=U1({...r,velocity:-vt(r.velocity||0)}),g=d||0,v=l/(2*Math.sqrt(o*c)),x=i-s,k=vt(Math.sqrt(o/c)),y=Math.abs(x)<5;n||(n=y?.01:2),t||(t=y?.005:.5);let h;if(v<1){const p=rl(k,v);h=b=>{const S=Math.exp(-v*k*b);return i-S*((g+v*k*x)/p*Math.sin(p*b)+x*Math.cos(p*b))}}else if(v===1)h=p=>i-Math.exp(-k*p)*(x+(g+k*x)*p);else{const p=k*Math.sqrt(v*v-1);h=b=>{const S=Math.exp(-v*k*b),j=Math.min(p*b,300);return i-S*((g+v*k*x)*Math.sinh(j)+p*x*Math.cosh(j))/p}}return{calculatedDuration:m&&f||null,next:p=>{const b=h(p);if(m)a.done=p>=f;else{let S=g;p!==0&&(v<1?S=Vh(h,p,b):S=0);const j=Math.abs(S)<=n,C=Math.abs(i-b)<=t;a.done=j&&C}return a.value=a.done?i:b,a}}}function hd({keyframes:e,velocity:t=0,power:n=.8,timeConstant:r=325,bounceDamping:s=10,bounceStiffness:i=500,modifyTarget:a,min:o,max:l,restDelta:c=.5,restSpeed:f}){const d=e[0],m={done:!1,value:d},g=N=>o!==void 0&&N<o||l!==void 0&&N>l,v=N=>o===void 0?l:l===void 0||Math.abs(o-N)<Math.abs(l-N)?o:l;let x=n*t;const k=d+x,y=a===void 0?k:a(k);y!==k&&(x=y-d);const h=N=>-x*Math.exp(-N/r),p=N=>y+h(N),b=N=>{const M=h(N),T=p(N);m.done=Math.abs(M)<=c,m.value=m.done?y:T};let S,j;const C=N=>{g(m.value)&&(S=N,j=Oh({keyframes:[m.value,v(m.value)],velocity:Vh(p,N,m.value),damping:s,stiffness:i,restDelta:c,restSpeed:f}))};return C(0),{calculatedDuration:null,next:N=>{let M=!1;return!j&&S===void 0&&(M=!0,b(N),C(N)),S!==void 0&&N>S?j.next(N-S):(!M&&b(N),m)}}}const B1=e=>{const t=({timestamp:n})=>e(n);return{start:()=>G.update(t,!0),stop:()=>St(t),now:()=>xe.isProcessing?xe.timestamp:performance.now()}},gd=2e4;function yd(e){let t=0;const n=50;let r=e.next(t);for(;!r.done&&t<gd;)t+=n,r=e.next(t);return t>=gd?1/0:t}const $1={decay:hd,inertia:hd,tween:_i,keyframes:_i,spring:Oh};function Di({autoplay:e=!0,delay:t=0,driver:n=B1,keyframes:r,type:s="keyframes",repeat:i=0,repeatDelay:a=0,repeatType:o="loop",onPlay:l,onStop:c,onComplete:f,onUpdate:d,...m}){let g=1,v=!1,x,k;const y=()=>{k=new Promise(L=>{x=L})};y();let h;const p=$1[s]||_i;let b;p!==_i&&typeof r[0]!="number"&&(b=Dh([0,100],r,{clamp:!1}),r=[0,100]);const S=p({...m,keyframes:r});let j;o==="mirror"&&(j=p({...m,keyframes:[...r].reverse(),velocity:-(m.velocity||0)}));let C="idle",N=null,M=null,T=null;S.calculatedDuration===null&&i&&(S.calculatedDuration=yd(S));const{calculatedDuration:U}=S;let W=1/0,Q=1/0;U!==null&&(W=U+a,Q=W*(i+1)-a);let z=0;const ge=L=>{if(M===null)return;g>0&&(M=Math.min(M,L)),g<0&&(M=Math.min(L-Q/g,M)),N!==null?z=N:z=Math.round(L-M)*g;const $=z-t*(g>=0?1:-1),en=g>=0?$<0:$>Q;z=Math.max($,0),C==="finished"&&N===null&&(z=Q);let st=z,Tn=S;if(i){const pa=Math.min(z,Q)/W;let Ss=Math.floor(pa),nn=pa%1;!nn&&pa>=1&&(nn=1),nn===1&&Ss--,Ss=Math.min(Ss,i+1),!!(Ss%2)&&(o==="reverse"?(nn=1-nn,a&&(nn-=a/W)):o==="mirror"&&(Tn=j)),st=Yt(0,1,nn)*W}const _e=en?{done:!1,value:r[0]}:Tn.next(st);b&&(_e.value=b(_e.value));let{done:tn}=_e;!en&&U!==null&&(tn=g>=0?z>=Q:z<=0);const xg=N===null&&(C==="finished"||C==="running"&&tn);return d&&d(_e.value),xg&&R(),_e},J=()=>{h&&h.stop(),h=void 0},ke=()=>{C="idle",J(),x(),y(),M=T=null},R=()=>{C="finished",f&&f(),J(),x()},P=()=>{if(v)return;h||(h=n(ge));const L=h.now();l&&l(),N!==null?M=L-N:(!M||C==="finished")&&(M=L),C==="finished"&&y(),T=M,N=null,C="running",h.start()};e&&P();const _={then(L,$){return k.then(L,$)},get time(){return vt(z)},set time(L){L=yn(L),z=L,N!==null||!h||g===0?N=L:M=h.now()-L/g},get duration(){const L=S.calculatedDuration===null?yd(S):S.calculatedDuration;return vt(L)},get speed(){return g},set speed(L){L===g||!h||(g=L,_.time=vt(z))},get state(){return C},play:P,pause:()=>{C="paused",N=z},stop:()=>{v=!0,C!=="idle"&&(C="idle",c&&c(),ke())},cancel:()=>{T!==null&&ge(T),ke()},complete:()=>{C="finished"},sample:L=>(M=0,ge(L))};return _}function z1(e){let t;return()=>(t===void 0&&(t=e()),t)}const W1=z1(()=>Object.hasOwnProperty.call(Element.prototype,"animate")),H1=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),zs=10,G1=2e4,Y1=(e,t)=>t.type==="spring"||e==="backgroundColor"||!hh(t.ease);function K1(e,t,{onUpdate:n,onComplete:r,...s}){if(!(W1()&&H1.has(t)&&!s.repeatDelay&&s.repeatType!=="mirror"&&s.damping!==0&&s.type!=="inertia"))return!1;let a=!1,o,l,c=!1;const f=()=>{l=new Promise(p=>{o=p})};f();let{keyframes:d,duration:m=300,ease:g,times:v}=s;if(Y1(t,s)){const p=Di({...s,repeat:0,delay:0});let b={done:!1,value:d[0]};const S=[];let j=0;for(;!b.done&&j<G1;)b=p.sample(j),S.push(b.value),j+=zs;v=void 0,d=S,m=j-zs,g="linear"}const x=r1(e.owner.current,t,d,{...s,duration:m,ease:g,times:v}),k=()=>{c=!1,x.cancel()},y=()=>{c=!0,G.update(k),o(),f()};return x.onfinish=()=>{c||(e.set(s1(d,s)),r&&r(),y())},{then(p,b){return l.then(p,b)},attachTimeline(p){return x.timeline=p,x.onfinish=null,ie},get time(){return vt(x.currentTime||0)},set time(p){x.currentTime=yn(p)},get speed(){return x.playbackRate},set speed(p){x.playbackRate=p},get duration(){return vt(m)},play:()=>{a||(x.play(),St(k))},pause:()=>x.pause(),stop:()=>{if(a=!0,x.playState==="idle")return;const{currentTime:p}=x;if(p){const b=Di({...s,autoplay:!1});e.setWithVelocity(b.sample(p-zs).value,b.sample(p).value,zs)}y()},complete:()=>{c||x.finish()},cancel:y}}function Q1({keyframes:e,delay:t,onUpdate:n,onComplete:r}){const s=()=>(n&&n(e[e.length-1]),r&&r(),{time:0,speed:1,duration:0,play:ie,pause:ie,stop:ie,then:i=>(i(),Promise.resolve()),cancel:ie,complete:ie});return t?Di({keyframes:[0,1],duration:0,delay:t,onComplete:s}):s()}const q1={type:"spring",stiffness:500,damping:25,restSpeed:10},J1=e=>({type:"spring",stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),X1={type:"keyframes",duration:.8},Z1={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},ew=(e,{keyframes:t})=>t.length>2?X1:En.has(e)?e.startsWith("scale")?J1(t[1]):q1:Z1,sl=(e,t)=>e==="zIndex"?!1:!!(typeof t=="number"||Array.isArray(t)||typeof t=="string"&&(Kt.test(t)||t==="0")&&!t.startsWith("url(")),tw=new Set(["brightness","contrast","saturate","opacity"]);function nw(e){const[t,n]=e.slice(0,-1).split("(");if(t==="drop-shadow")return e;const[r]=n.match(ua)||[];if(!r)return e;const s=n.replace(r,"");let i=tw.has(t)?1:0;return r!==n&&(i*=100),t+"("+i+s+")"}const rw=/([a-z-]*)\(.*?\)/g,il={...Kt,getAnimatableNone:e=>{const t=e.match(rw);return t?t.map(nw).join(" "):e}},sw={...Xp,color:Se,backgroundColor:Se,outlineColor:Se,fill:Se,stroke:Se,borderColor:Se,borderTopColor:Se,borderRightColor:Se,borderBottomColor:Se,borderLeftColor:Se,filter:il,WebkitFilter:il},Tu=e=>sw[e];function Fh(e,t){let n=Tu(e);return n!==il&&(n=Kt),n.getAnimatableNone?n.getAnimatableNone(t):void 0}const Uh=e=>/^0[^.\s]+$/.test(e);function iw(e){if(typeof e=="number")return e===0;if(e!==null)return e==="none"||e==="0"||Uh(e)}function aw(e,t,n,r){const s=sl(t,n);let i;Array.isArray(n)?i=[...n]:i=[null,n];const a=r.from!==void 0?r.from:e.get();let o;const l=[];for(let c=0;c<i.length;c++)i[c]===null&&(i[c]=c===0?a:i[c-1]),iw(i[c])&&l.push(c),typeof i[c]=="string"&&i[c]!=="none"&&i[c]!=="0"&&(o=i[c]);if(s&&l.length&&o)for(let c=0;c<l.length;c++){const f=l[c];i[f]=Fh(t,o)}return i}function ow({when:e,delay:t,delayChildren:n,staggerChildren:r,staggerDirection:s,repeat:i,repeatType:a,repeatDelay:o,from:l,elapsed:c,...f}){return!!Object.keys(f).length}function Ru(e,t){return e[t]||e.default||e}const lw={skipAnimations:!1},Mu=(e,t,n,r={})=>s=>{const i=Ru(r,e)||{},a=i.delay||r.delay||0;let{elapsed:o=0}=r;o=o-yn(a);const l=aw(t,e,n,i),c=l[0],f=l[l.length-1],d=sl(e,c),m=sl(e,f);let g={keyframes:l,velocity:t.getVelocity(),ease:"easeOut",...i,delay:-o,onUpdate:v=>{t.set(v),i.onUpdate&&i.onUpdate(v)},onComplete:()=>{s(),i.onComplete&&i.onComplete()}};if(ow(i)||(g={...g,...ew(e,g)}),g.duration&&(g.duration=yn(g.duration)),g.repeatDelay&&(g.repeatDelay=yn(g.repeatDelay)),!d||!m||n1.current||i.type===!1||lw.skipAnimations)return Q1(g);if(!r.isHandoff&&t.owner&&t.owner.current instanceof HTMLElement&&!t.owner.getProps().onUpdate){const v=K1(t,e,g);if(v)return v}return Di(g)};function Ii(e){return!!(Le(e)&&e.add)}const Bh=e=>/^\-?\d*\.?\d+$/.test(e);function Au(e,t){e.indexOf(t)===-1&&e.push(t)}function Lu(e,t){const n=e.indexOf(t);n>-1&&e.splice(n,1)}class _u{constructor(){this.subscriptions=[]}add(t){return Au(this.subscriptions,t),()=>Lu(this.subscriptions,t)}notify(t,n,r){const s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](t,n,r);else for(let i=0;i<s;i++){const a=this.subscriptions[i];a&&a(t,n,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const uw=e=>!isNaN(parseFloat(e));class cw{constructor(t,n={}){this.version="10.18.0",this.timeDelta=0,this.lastUpdated=0,this.canTrackVelocity=!1,this.events={},this.updateAndNotify=(r,s=!0)=>{this.prev=this.current,this.current=r;const{delta:i,timestamp:a}=xe;this.lastUpdated!==a&&(this.timeDelta=i,this.lastUpdated=a,G.postRender(this.scheduleVelocityCheck)),this.prev!==this.current&&this.events.change&&this.events.change.notify(this.current),this.events.velocityChange&&this.events.velocityChange.notify(this.getVelocity()),s&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.scheduleVelocityCheck=()=>G.postRender(this.velocityCheck),this.velocityCheck=({timestamp:r})=>{r!==this.lastUpdated&&(this.prev=this.current,this.events.velocityChange&&this.events.velocityChange.notify(this.getVelocity()))},this.hasAnimated=!1,this.prev=this.current=t,this.canTrackVelocity=uw(this.current),this.owner=n.owner}onChange(t){return this.on("change",t)}on(t,n){this.events[t]||(this.events[t]=new _u);const r=this.events[t].add(n);return t==="change"?()=>{r(),G.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const t in this.events)this.events[t].clear()}attach(t,n){this.passiveEffect=t,this.stopPassiveEffect=n}set(t,n=!0){!n||!this.passiveEffect?this.updateAndNotify(t,n):this.passiveEffect(t,this.updateAndNotify)}setWithVelocity(t,n,r){this.set(n),this.prev=t,this.timeDelta=r}jump(t){this.updateAndNotify(t),this.prev=t,this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return this.current}getPrevious(){return this.prev}getVelocity(){return this.canTrackVelocity?Ih(parseFloat(this.current)-parseFloat(this.prev),this.timeDelta):0}start(t){return this.stop(),new Promise(n=>{this.hasAnimated=!0,this.animation=t(n),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function ar(e,t){return new cw(e,t)}const $h=e=>t=>t.test(e),dw={test:e=>e==="auto",parse:e=>e},zh=[Pn,I,ct,jt,vx,yx,dw],kr=e=>zh.find($h(e)),fw=[...zh,Se,Kt],mw=e=>fw.find($h(e));function pw(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,ar(n))}function hw(e,t){const n=da(e,t);let{transitionEnd:r={},transition:s={},...i}=n?e.makeTargetAnimatable(n,!1):{};i={...i,...r};for(const a in i){const o=Ax(i[a]);pw(e,a,o)}}function gw(e,t,n){var r,s;const i=Object.keys(t).filter(o=>!e.hasValue(o)),a=i.length;if(a)for(let o=0;o<a;o++){const l=i[o],c=t[l];let f=null;Array.isArray(c)&&(f=c[0]),f===null&&(f=(s=(r=n[l])!==null&&r!==void 0?r:e.readValue(l))!==null&&s!==void 0?s:t[l]),f!=null&&(typeof f=="string"&&(Bh(f)||Uh(f))?f=parseFloat(f):!mw(f)&&Kt.test(c)&&(f=Fh(l,c)),e.addValue(l,ar(f,{owner:e})),n[l]===void 0&&(n[l]=f),f!==null&&e.setBaseTarget(l,f))}}function yw(e,t){return t?(t[e]||t.default||t).from:void 0}function vw(e,t,n){const r={};for(const s in e){const i=yw(s,t);if(i!==void 0)r[s]=i;else{const a=n.getValue(s);a&&(r[s]=a.get())}}return r}function xw({protectedKeys:e,needsAnimating:t},n){const r=e.hasOwnProperty(n)&&t[n]!==!0;return t[n]=!1,r}function ww(e,t){const n=e.get();if(Array.isArray(t)){for(let r=0;r<t.length;r++)if(t[r]!==n)return!0}else return n!==t}function Wh(e,t,{delay:n=0,transitionOverride:r,type:s}={}){let{transition:i=e.getDefaultTransition(),transitionEnd:a,...o}=e.makeTargetAnimatable(t);const l=e.getValue("willChange");r&&(i=r);const c=[],f=s&&e.animationState&&e.animationState.getState()[s];for(const d in o){const m=e.getValue(d),g=o[d];if(!m||g===void 0||f&&xw(f,d))continue;const v={delay:n,elapsed:0,...Ru(i||{},d)};if(window.HandoffAppearAnimations){const y=e.getProps()[Hp];if(y){const h=window.HandoffAppearAnimations(y,d,m,G);h!==null&&(v.elapsed=h,v.isHandoff=!0)}}let x=!v.isHandoff&&!ww(m,g);if(v.type==="spring"&&(m.getVelocity()||v.velocity)&&(x=!1),m.animation&&(x=!1),x)continue;m.start(Mu(d,m,g,e.shouldReduceMotion&&En.has(d)?{type:!1}:v));const k=m.animation;Ii(l)&&(l.add(d),k.then(()=>l.remove(d))),c.push(k)}return a&&Promise.all(c).then(()=>{a&&hw(e,a)}),c}function al(e,t,n={}){const r=da(e,t,n.custom);let{transition:s=e.getDefaultTransition()||{}}=r||{};n.transitionOverride&&(s=n.transitionOverride);const i=r?()=>Promise.all(Wh(e,r,n)):()=>Promise.resolve(),a=e.variantChildren&&e.variantChildren.size?(l=0)=>{const{delayChildren:c=0,staggerChildren:f,staggerDirection:d}=s;return bw(e,t,c+l,f,d,n)}:()=>Promise.resolve(),{when:o}=s;if(o){const[l,c]=o==="beforeChildren"?[i,a]:[a,i];return l().then(()=>c())}else return Promise.all([i(),a(n.delay)])}function bw(e,t,n=0,r=0,s=1,i){const a=[],o=(e.variantChildren.size-1)*r,l=s===1?(c=0)=>c*r:(c=0)=>o-c*r;return Array.from(e.variantChildren).sort(kw).forEach((c,f)=>{c.notify("AnimationStart",t),a.push(al(c,t,{...i,delay:n+l(f)}).then(()=>c.notify("AnimationComplete",t)))}),Promise.all(a)}function kw(e,t){return e.sortNodePosition(t)}function Sw(e,t,n={}){e.notify("AnimationStart",t);let r;if(Array.isArray(t)){const s=t.map(i=>al(e,i,n));r=Promise.all(s)}else if(typeof t=="string")r=al(e,t,n);else{const s=typeof t=="function"?da(e,t,n.custom):t;r=Promise.all(Wh(e,s,n))}return r.then(()=>e.notify("AnimationComplete",t))}const Cw=[...hu].reverse(),Nw=hu.length;function jw(e){return t=>Promise.all(t.map(({animation:n,options:r})=>Sw(e,n,r)))}function Ew(e){let t=jw(e);const n=Tw();let r=!0;const s=(l,c)=>{const f=da(e,c);if(f){const{transition:d,transitionEnd:m,...g}=f;l={...l,...g,...m}}return l};function i(l){t=l(e)}function a(l,c){const f=e.getProps(),d=e.getVariantContext(!0)||{},m=[],g=new Set;let v={},x=1/0;for(let y=0;y<Nw;y++){const h=Cw[y],p=n[h],b=f[h]!==void 0?f[h]:d[h],S=os(b),j=h===c?p.isActive:null;j===!1&&(x=y);let C=b===d[h]&&b!==f[h]&&S;if(C&&r&&e.manuallyAnimateOnMount&&(C=!1),p.protectedKeys={...v},!p.isActive&&j===null||!b&&!p.prevProp||oa(b)||typeof b=="boolean")continue;let M=Pw(p.prevProp,b)||h===c&&p.isActive&&!C&&S||y>x&&S,T=!1;const U=Array.isArray(b)?b:[b];let W=U.reduce(s,{});j===!1&&(W={});const{prevResolvedValues:Q={}}=p,z={...Q,...W},ge=J=>{M=!0,g.has(J)&&(T=!0,g.delete(J)),p.needsAnimating[J]=!0};for(const J in z){const ke=W[J],R=Q[J];if(v.hasOwnProperty(J))continue;let P=!1;Ai(ke)&&Ai(R)?P=!mh(ke,R):P=ke!==R,P?ke!==void 0?ge(J):g.add(J):ke!==void 0&&g.has(J)?ge(J):p.protectedKeys[J]=!0}p.prevProp=b,p.prevResolvedValues=W,p.isActive&&(v={...v,...W}),r&&e.blockInitialAnimation&&(M=!1),M&&(!C||T)&&m.push(...U.map(J=>({animation:J,options:{type:h,...l}})))}if(g.size){const y={};g.forEach(h=>{const p=e.getBaseTarget(h);p!==void 0&&(y[h]=p)}),m.push({animation:y})}let k=!!m.length;return r&&(f.initial===!1||f.initial===f.animate)&&!e.manuallyAnimateOnMount&&(k=!1),r=!1,k?t(m):Promise.resolve()}function o(l,c,f){var d;if(n[l].isActive===c)return Promise.resolve();(d=e.variantChildren)===null||d===void 0||d.forEach(g=>{var v;return(v=g.animationState)===null||v===void 0?void 0:v.setActive(l,c)}),n[l].isActive=c;const m=a(f,l);for(const g in n)n[g].protectedKeys={};return m}return{animateChanges:a,setActive:o,setAnimateFunction:i,getState:()=>n}}function Pw(e,t){return typeof t=="string"?t!==e:Array.isArray(t)?!mh(t,e):!1}function rn(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Tw(){return{animate:rn(!0),whileInView:rn(),whileHover:rn(),whileTap:rn(),whileDrag:rn(),whileFocus:rn(),exit:rn()}}class Rw extends Zt{constructor(t){super(t),t.animationState||(t.animationState=Ew(t))}updateAnimationControlsSubscription(){const{animate:t}=this.node.getProps();this.unmount(),oa(t)&&(this.unmount=t.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:t}=this.node.getProps(),{animate:n}=this.node.prevProps||{};t!==n&&this.updateAnimationControlsSubscription()}unmount(){}}let Mw=0;class Aw extends Zt{constructor(){super(...arguments),this.id=Mw++}update(){if(!this.node.presenceContext)return;const{isPresent:t,onExitComplete:n,custom:r}=this.node.presenceContext,{isPresent:s}=this.node.prevPresenceContext||{};if(!this.node.animationState||t===s)return;const i=this.node.animationState.setActive("exit",!t,{custom:r??this.node.getProps().custom});n&&!t&&i.then(()=>n(this.id))}mount(){const{register:t}=this.node.presenceContext||{};t&&(this.unmount=t(this.id))}unmount(){}}const Lw={animation:{Feature:Rw},exit:{Feature:Aw}},vd=(e,t)=>Math.abs(e-t);function _w(e,t){const n=vd(e.x,t.x),r=vd(e.y,t.y);return Math.sqrt(n**2+r**2)}class Hh{constructor(t,n,{transformPagePoint:r,contextWindow:s,dragSnapToOrigin:i=!1}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const d=Ja(this.lastMoveEventInfo,this.history),m=this.startEvent!==null,g=_w(d.offset,{x:0,y:0})>=3;if(!m&&!g)return;const{point:v}=d,{timestamp:x}=xe;this.history.push({...v,timestamp:x});const{onStart:k,onMove:y}=this.handlers;m||(k&&k(this.lastMoveEvent,d),this.startEvent=this.lastMoveEvent),y&&y(this.lastMoveEvent,d)},this.handlePointerMove=(d,m)=>{this.lastMoveEvent=d,this.lastMoveEventInfo=qa(m,this.transformPagePoint),G.update(this.updatePoint,!0)},this.handlePointerUp=(d,m)=>{this.end();const{onEnd:g,onSessionEnd:v,resumeAnimation:x}=this.handlers;if(this.dragSnapToOrigin&&x&&x(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const k=Ja(d.type==="pointercancel"?this.lastMoveEventInfo:qa(m,this.transformPagePoint),this.history);this.startEvent&&g&&g(d,k),v&&v(d,k)},!lh(t))return;this.dragSnapToOrigin=i,this.handlers=n,this.transformPagePoint=r,this.contextWindow=s||window;const a=ca(t),o=qa(a,this.transformPagePoint),{point:l}=o,{timestamp:c}=xe;this.history=[{...l,timestamp:c}];const{onSessionStart:f}=n;f&&f(t,Ja(o,this.history)),this.removeListeners=Wt(yt(this.contextWindow,"pointermove",this.handlePointerMove),yt(this.contextWindow,"pointerup",this.handlePointerUp),yt(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(t){this.handlers=t}end(){this.removeListeners&&this.removeListeners(),St(this.updatePoint)}}function qa(e,t){return t?{point:t(e.point)}:e}function xd(e,t){return{x:e.x-t.x,y:e.y-t.y}}function Ja({point:e},t){return{point:e,delta:xd(e,Gh(t)),offset:xd(e,Dw(t)),velocity:Iw(t,.1)}}function Dw(e){return e[0]}function Gh(e){return e[e.length-1]}function Iw(e,t){if(e.length<2)return{x:0,y:0};let n=e.length-1,r=null;const s=Gh(e);for(;n>=0&&(r=e[n],!(s.timestamp-r.timestamp>yn(t)));)n--;if(!r)return{x:0,y:0};const i=vt(s.timestamp-r.timestamp);if(i===0)return{x:0,y:0};const a={x:(s.x-r.x)/i,y:(s.y-r.y)/i};return a.x===1/0&&(a.x=0),a.y===1/0&&(a.y=0),a}function Fe(e){return e.max-e.min}function ol(e,t=0,n=.01){return Math.abs(e-t)<=n}function wd(e,t,n,r=.5){e.origin=r,e.originPoint=Z(t.min,t.max,e.origin),e.scale=Fe(n)/Fe(t),(ol(e.scale,1,1e-4)||isNaN(e.scale))&&(e.scale=1),e.translate=Z(n.min,n.max,e.origin)-e.originPoint,(ol(e.translate)||isNaN(e.translate))&&(e.translate=0)}function Ur(e,t,n,r){wd(e.x,t.x,n.x,r?r.originX:void 0),wd(e.y,t.y,n.y,r?r.originY:void 0)}function bd(e,t,n){e.min=n.min+t.min,e.max=e.min+Fe(t)}function Vw(e,t,n){bd(e.x,t.x,n.x),bd(e.y,t.y,n.y)}function kd(e,t,n){e.min=t.min-n.min,e.max=e.min+Fe(t)}function Br(e,t,n){kd(e.x,t.x,n.x),kd(e.y,t.y,n.y)}function Ow(e,{min:t,max:n},r){return t!==void 0&&e<t?e=r?Z(t,e,r.min):Math.max(e,t):n!==void 0&&e>n&&(e=r?Z(n,e,r.max):Math.min(e,n)),e}function Sd(e,t,n){return{min:t!==void 0?e.min+t:void 0,max:n!==void 0?e.max+n-(e.max-e.min):void 0}}function Fw(e,{top:t,left:n,bottom:r,right:s}){return{x:Sd(e.x,n,s),y:Sd(e.y,t,r)}}function Cd(e,t){let n=t.min-e.min,r=t.max-e.max;return t.max-t.min<e.max-e.min&&([n,r]=[r,n]),{min:n,max:r}}function Uw(e,t){return{x:Cd(e.x,t.x),y:Cd(e.y,t.y)}}function Bw(e,t){let n=.5;const r=Fe(e),s=Fe(t);return s>r?n=us(t.min,t.max-r,e.min):r>s&&(n=us(e.min,e.max-s,t.min)),Yt(0,1,n)}function $w(e,t){const n={};return t.min!==void 0&&(n.min=t.min-e.min),t.max!==void 0&&(n.max=t.max-e.min),n}const ll=.35;function zw(e=ll){return e===!1?e=0:e===!0&&(e=ll),{x:Nd(e,"left","right"),y:Nd(e,"top","bottom")}}function Nd(e,t,n){return{min:jd(e,t),max:jd(e,n)}}function jd(e,t){return typeof e=="number"?e:e[t]||0}const Ed=()=>({translate:0,scale:1,origin:0,originPoint:0}),Hn=()=>({x:Ed(),y:Ed()}),Pd=()=>({min:0,max:0}),ae=()=>({x:Pd(),y:Pd()});function ze(e){return[e("x"),e("y")]}function Yh({top:e,left:t,right:n,bottom:r}){return{x:{min:t,max:n},y:{min:e,max:r}}}function Ww({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}function Hw(e,t){if(!t)return e;const n=t({x:e.left,y:e.top}),r=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}function Xa(e){return e===void 0||e===1}function ul({scale:e,scaleX:t,scaleY:n}){return!Xa(e)||!Xa(t)||!Xa(n)}function ln(e){return ul(e)||Kh(e)||e.z||e.rotate||e.rotateX||e.rotateY}function Kh(e){return Td(e.x)||Td(e.y)}function Td(e){return e&&e!=="0%"}function Vi(e,t,n){const r=e-n,s=t*r;return n+s}function Rd(e,t,n,r,s){return s!==void 0&&(e=Vi(e,s,r)),Vi(e,n,r)+t}function cl(e,t=0,n=1,r,s){e.min=Rd(e.min,t,n,r,s),e.max=Rd(e.max,t,n,r,s)}function Qh(e,{x:t,y:n}){cl(e.x,t.translate,t.scale,t.originPoint),cl(e.y,n.translate,n.scale,n.originPoint)}function Gw(e,t,n,r=!1){const s=n.length;if(!s)return;t.x=t.y=1;let i,a;for(let o=0;o<s;o++){i=n[o],a=i.projectionDelta;const l=i.instance;l&&l.style&&l.style.display==="contents"||(r&&i.options.layoutScroll&&i.scroll&&i!==i.root&&Gn(e,{x:-i.scroll.offset.x,y:-i.scroll.offset.y}),a&&(t.x*=a.x.scale,t.y*=a.y.scale,Qh(e,a)),r&&ln(i.latestValues)&&Gn(e,i.latestValues))}t.x=Md(t.x),t.y=Md(t.y)}function Md(e){return Number.isInteger(e)||e>1.0000000000001||e<.999999999999?e:1}function Tt(e,t){e.min=e.min+t,e.max=e.max+t}function Ad(e,t,[n,r,s]){const i=t[s]!==void 0?t[s]:.5,a=Z(e.min,e.max,i);cl(e,t[n],t[r],a,t.scale)}const Yw=["x","scaleX","originX"],Kw=["y","scaleY","originY"];function Gn(e,t){Ad(e.x,t,Yw),Ad(e.y,t,Kw)}function qh(e,t){return Yh(Hw(e.getBoundingClientRect(),t))}function Qw(e,t,n){const r=qh(e,n),{scroll:s}=t;return s&&(Tt(r.x,s.offset.x),Tt(r.y,s.offset.y)),r}const Jh=({current:e})=>e?e.ownerDocument.defaultView:null,qw=new WeakMap;class Jw{constructor(t){this.openGlobalLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=ae(),this.visualElement=t}start(t,{snapToCursor:n=!1}={}){const{presenceContext:r}=this.visualElement;if(r&&r.isPresent===!1)return;const s=f=>{const{dragSnapToOrigin:d}=this.getProps();d?this.pauseAnimation():this.stopAnimation(),n&&this.snapToCursor(ca(f,"page").point)},i=(f,d)=>{const{drag:m,dragPropagation:g,onDragStart:v}=this.getProps();if(m&&!g&&(this.openGlobalLock&&this.openGlobalLock(),this.openGlobalLock=ch(m),!this.openGlobalLock))return;this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),ze(k=>{let y=this.getAxisMotionValue(k).get()||0;if(ct.test(y)){const{projection:h}=this.visualElement;if(h&&h.layout){const p=h.layout.layoutBox[k];p&&(y=Fe(p)*(parseFloat(y)/100))}}this.originPoint[k]=y}),v&&G.update(()=>v(f,d),!1,!0);const{animationState:x}=this.visualElement;x&&x.setActive("whileDrag",!0)},a=(f,d)=>{const{dragPropagation:m,dragDirectionLock:g,onDirectionLock:v,onDrag:x}=this.getProps();if(!m&&!this.openGlobalLock)return;const{offset:k}=d;if(g&&this.currentDirection===null){this.currentDirection=Xw(k),this.currentDirection!==null&&v&&v(this.currentDirection);return}this.updateAxis("x",d.point,k),this.updateAxis("y",d.point,k),this.visualElement.render(),x&&x(f,d)},o=(f,d)=>this.stop(f,d),l=()=>ze(f=>{var d;return this.getAnimationState(f)==="paused"&&((d=this.getAxisMotionValue(f).animation)===null||d===void 0?void 0:d.play())}),{dragSnapToOrigin:c}=this.getProps();this.panSession=new Hh(t,{onSessionStart:s,onStart:i,onMove:a,onSessionEnd:o,resumeAnimation:l},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:c,contextWindow:Jh(this.visualElement)})}stop(t,n){const r=this.isDragging;if(this.cancel(),!r)return;const{velocity:s}=n;this.startAnimation(s);const{onDragEnd:i}=this.getProps();i&&G.update(()=>i(t,n))}cancel(){this.isDragging=!1;const{projection:t,animationState:n}=this.visualElement;t&&(t.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:r}=this.getProps();!r&&this.openGlobalLock&&(this.openGlobalLock(),this.openGlobalLock=null),n&&n.setActive("whileDrag",!1)}updateAxis(t,n,r){const{drag:s}=this.getProps();if(!r||!Ws(t,s,this.currentDirection))return;const i=this.getAxisMotionValue(t);let a=this.originPoint[t]+r[t];this.constraints&&this.constraints[t]&&(a=Ow(a,this.constraints[t],this.elastic[t])),i.set(a)}resolveConstraints(){var t;const{dragConstraints:n,dragElastic:r}=this.getProps(),s=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(t=this.visualElement.projection)===null||t===void 0?void 0:t.layout,i=this.constraints;n&&zn(n)?this.constraints||(this.constraints=this.resolveRefConstraints()):n&&s?this.constraints=Fw(s.layoutBox,n):this.constraints=!1,this.elastic=zw(r),i!==this.constraints&&s&&this.constraints&&!this.hasMutatedConstraints&&ze(a=>{this.getAxisMotionValue(a)&&(this.constraints[a]=$w(s.layoutBox[a],this.constraints[a]))})}resolveRefConstraints(){const{dragConstraints:t,onMeasureDragConstraints:n}=this.getProps();if(!t||!zn(t))return!1;const r=t.current,{projection:s}=this.visualElement;if(!s||!s.layout)return!1;const i=Qw(r,s.root,this.visualElement.getTransformPagePoint());let a=Uw(s.layout.layoutBox,i);if(n){const o=n(Ww(a));this.hasMutatedConstraints=!!o,o&&(a=Yh(o))}return a}startAnimation(t){const{drag:n,dragMomentum:r,dragElastic:s,dragTransition:i,dragSnapToOrigin:a,onDragTransitionEnd:o}=this.getProps(),l=this.constraints||{},c=ze(f=>{if(!Ws(f,n,this.currentDirection))return;let d=l&&l[f]||{};a&&(d={min:0,max:0});const m=s?200:1e6,g=s?40:1e7,v={type:"inertia",velocity:r?t[f]:0,bounceStiffness:m,bounceDamping:g,timeConstant:750,restDelta:1,restSpeed:10,...i,...d};return this.startAxisValueAnimation(f,v)});return Promise.all(c).then(o)}startAxisValueAnimation(t,n){const r=this.getAxisMotionValue(t);return r.start(Mu(t,r,0,n))}stopAnimation(){ze(t=>this.getAxisMotionValue(t).stop())}pauseAnimation(){ze(t=>{var n;return(n=this.getAxisMotionValue(t).animation)===null||n===void 0?void 0:n.pause()})}getAnimationState(t){var n;return(n=this.getAxisMotionValue(t).animation)===null||n===void 0?void 0:n.state}getAxisMotionValue(t){const n="_drag"+t.toUpperCase(),r=this.visualElement.getProps(),s=r[n];return s||this.visualElement.getValue(t,(r.initial?r.initial[t]:void 0)||0)}snapToCursor(t){ze(n=>{const{drag:r}=this.getProps();if(!Ws(n,r,this.currentDirection))return;const{projection:s}=this.visualElement,i=this.getAxisMotionValue(n);if(s&&s.layout){const{min:a,max:o}=s.layout.layoutBox[n];i.set(t[n]-Z(a,o,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:t,dragConstraints:n}=this.getProps(),{projection:r}=this.visualElement;if(!zn(n)||!r||!this.constraints)return;this.stopAnimation();const s={x:0,y:0};ze(a=>{const o=this.getAxisMotionValue(a);if(o){const l=o.get();s[a]=Bw({min:l,max:l},this.constraints[a])}});const{transformTemplate:i}=this.visualElement.getProps();this.visualElement.current.style.transform=i?i({},""):"none",r.root&&r.root.updateScroll(),r.updateLayout(),this.resolveConstraints(),ze(a=>{if(!Ws(a,t,null))return;const o=this.getAxisMotionValue(a),{min:l,max:c}=this.constraints[a];o.set(Z(l,c,s[a]))})}addListeners(){if(!this.visualElement.current)return;qw.set(this.visualElement,this);const t=this.visualElement.current,n=yt(t,"pointerdown",l=>{const{drag:c,dragListener:f=!0}=this.getProps();c&&f&&this.start(l)}),r=()=>{const{dragConstraints:l}=this.getProps();zn(l)&&(this.constraints=this.resolveRefConstraints())},{projection:s}=this.visualElement,i=s.addEventListener("measure",r);s&&!s.layout&&(s.root&&s.root.updateScroll(),s.updateLayout()),r();const a=ht(window,"resize",()=>this.scalePositionWithinConstraints()),o=s.addEventListener("didUpdate",({delta:l,hasLayoutChanged:c})=>{this.isDragging&&c&&(ze(f=>{const d=this.getAxisMotionValue(f);d&&(this.originPoint[f]+=l[f].translate,d.set(d.get()+l[f].translate))}),this.visualElement.render())});return()=>{a(),n(),i(),o&&o()}}getProps(){const t=this.visualElement.getProps(),{drag:n=!1,dragDirectionLock:r=!1,dragPropagation:s=!1,dragConstraints:i=!1,dragElastic:a=ll,dragMomentum:o=!0}=t;return{...t,drag:n,dragDirectionLock:r,dragPropagation:s,dragConstraints:i,dragElastic:a,dragMomentum:o}}}function Ws(e,t,n){return(t===!0||t===e)&&(n===null||n===e)}function Xw(e,t=10){let n=null;return Math.abs(e.y)>t?n="y":Math.abs(e.x)>t&&(n="x"),n}class Zw extends Zt{constructor(t){super(t),this.removeGroupControls=ie,this.removeListeners=ie,this.controls=new Jw(t)}mount(){const{dragControls:t}=this.node.getProps();t&&(this.removeGroupControls=t.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||ie}unmount(){this.removeGroupControls(),this.removeListeners()}}const Ld=e=>(t,n)=>{e&&G.update(()=>e(t,n))};class eb extends Zt{constructor(){super(...arguments),this.removePointerDownListener=ie}onPointerDown(t){this.session=new Hh(t,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Jh(this.node)})}createPanHandlers(){const{onPanSessionStart:t,onPanStart:n,onPan:r,onPanEnd:s}=this.node.getProps();return{onSessionStart:Ld(t),onStart:Ld(n),onMove:r,onEnd:(i,a)=>{delete this.session,s&&G.update(()=>s(i,a))}}}mount(){this.removePointerDownListener=yt(this.node.current,"pointerdown",t=>this.onPointerDown(t))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}function tb(){const e=w.useContext(ia);if(e===null)return[!0,null];const{isPresent:t,onExitComplete:n,register:r}=e,s=w.useId();return w.useEffect(()=>r(s),[]),!t&&n?[!1,()=>n&&n(s)]:[!0]}const si={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function _d(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}const Sr={correct:(e,t)=>{if(!t.target)return e;if(typeof e=="string")if(I.test(e))e=parseFloat(e);else return e;const n=_d(e,t.target.x),r=_d(e,t.target.y);return`${n}% ${r}%`}},nb={correct:(e,{treeScale:t,projectionDelta:n})=>{const r=e,s=Kt.parse(e);if(s.length>5)return r;const i=Kt.createTransformer(e),a=typeof s[0]!="number"?1:0,o=n.x.scale*t.x,l=n.y.scale*t.y;s[0+a]/=o,s[1+a]/=l;const c=Z(o,l,.5);return typeof s[2+a]=="number"&&(s[2+a]/=c),typeof s[3+a]=="number"&&(s[3+a]/=c),i(s)}};class rb extends Bi.Component{componentDidMount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r,layoutId:s}=this.props,{projection:i}=t;cx(sb),i&&(n.group&&n.group.add(i),r&&r.register&&s&&r.register(i),i.root.didUpdate(),i.addEventListener("animationComplete",()=>{this.safeToRemove()}),i.setOptions({...i.options,onExitComplete:()=>this.safeToRemove()})),si.hasEverUpdated=!0}getSnapshotBeforeUpdate(t){const{layoutDependency:n,visualElement:r,drag:s,isPresent:i}=this.props,a=r.projection;return a&&(a.isPresent=i,s||t.layoutDependency!==n||n===void 0?a.willUpdate():this.safeToRemove(),t.isPresent!==i&&(i?a.promote():a.relegate()||G.postRender(()=>{const o=a.getStack();(!o||!o.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:t}=this.props.visualElement;t&&(t.root.didUpdate(),queueMicrotask(()=>{!t.currentAnimation&&t.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r}=this.props,{projection:s}=t;s&&(s.scheduleCheckAfterUnmount(),n&&n.group&&n.group.remove(s),r&&r.deregister&&r.deregister(s))}safeToRemove(){const{safeToRemove:t}=this.props;t&&t()}render(){return null}}function Xh(e){const[t,n]=tb(),r=w.useContext(yu);return Bi.createElement(rb,{...e,layoutGroup:r,switchLayoutGroup:w.useContext(Yp),isPresent:t,safeToRemove:n})}const sb={borderRadius:{...Sr,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:Sr,borderTopRightRadius:Sr,borderBottomLeftRadius:Sr,borderBottomRightRadius:Sr,boxShadow:nb},Zh=["TopLeft","TopRight","BottomLeft","BottomRight"],ib=Zh.length,Dd=e=>typeof e=="string"?parseFloat(e):e,Id=e=>typeof e=="number"||I.test(e);function ab(e,t,n,r,s,i){s?(e.opacity=Z(0,n.opacity!==void 0?n.opacity:1,ob(r)),e.opacityExit=Z(t.opacity!==void 0?t.opacity:1,0,lb(r))):i&&(e.opacity=Z(t.opacity!==void 0?t.opacity:1,n.opacity!==void 0?n.opacity:1,r));for(let a=0;a<ib;a++){const o=`border${Zh[a]}Radius`;let l=Vd(t,o),c=Vd(n,o);if(l===void 0&&c===void 0)continue;l||(l=0),c||(c=0),l===0||c===0||Id(l)===Id(c)?(e[o]=Math.max(Z(Dd(l),Dd(c),r),0),(ct.test(c)||ct.test(l))&&(e[o]+="%")):e[o]=c}(t.rotate||n.rotate)&&(e.rotate=Z(t.rotate||0,n.rotate||0,r))}function Vd(e,t){return e[t]!==void 0?e[t]:e.borderRadius}const ob=eg(0,.5,kh),lb=eg(.5,.95,ie);function eg(e,t,n){return r=>r<e?0:r>t?1:n(us(e,t,r))}function Od(e,t){e.min=t.min,e.max=t.max}function $e(e,t){Od(e.x,t.x),Od(e.y,t.y)}function Fd(e,t,n,r,s){return e-=t,e=Vi(e,1/n,r),s!==void 0&&(e=Vi(e,1/s,r)),e}function ub(e,t=0,n=1,r=.5,s,i=e,a=e){if(ct.test(t)&&(t=parseFloat(t),t=Z(a.min,a.max,t/100)-a.min),typeof t!="number")return;let o=Z(i.min,i.max,r);e===i&&(o-=t),e.min=Fd(e.min,t,n,o,s),e.max=Fd(e.max,t,n,o,s)}function Ud(e,t,[n,r,s],i,a){ub(e,t[n],t[r],t[s],t.scale,i,a)}const cb=["x","scaleX","originX"],db=["y","scaleY","originY"];function Bd(e,t,n,r){Ud(e.x,t,cb,n?n.x:void 0,r?r.x:void 0),Ud(e.y,t,db,n?n.y:void 0,r?r.y:void 0)}function $d(e){return e.translate===0&&e.scale===1}function tg(e){return $d(e.x)&&$d(e.y)}function fb(e,t){return e.x.min===t.x.min&&e.x.max===t.x.max&&e.y.min===t.y.min&&e.y.max===t.y.max}function ng(e,t){return Math.round(e.x.min)===Math.round(t.x.min)&&Math.round(e.x.max)===Math.round(t.x.max)&&Math.round(e.y.min)===Math.round(t.y.min)&&Math.round(e.y.max)===Math.round(t.y.max)}function zd(e){return Fe(e.x)/Fe(e.y)}class mb{constructor(){this.members=[]}add(t){Au(this.members,t),t.scheduleRender()}remove(t){if(Lu(this.members,t),t===this.prevLead&&(this.prevLead=void 0),t===this.lead){const n=this.members[this.members.length-1];n&&this.promote(n)}}relegate(t){const n=this.members.findIndex(s=>t===s);if(n===0)return!1;let r;for(let s=n;s>=0;s--){const i=this.members[s];if(i.isPresent!==!1){r=i;break}}return r?(this.promote(r),!0):!1}promote(t,n){const r=this.lead;if(t!==r&&(this.prevLead=r,this.lead=t,t.show(),r)){r.instance&&r.scheduleRender(),t.scheduleRender(),t.resumeFrom=r,n&&(t.resumeFrom.preserveOpacity=!0),r.snapshot&&(t.snapshot=r.snapshot,t.snapshot.latestValues=r.animationValues||r.latestValues),t.root&&t.root.isUpdating&&(t.isLayoutDirty=!0);const{crossfade:s}=t.options;s===!1&&r.hide()}}exitAnimationComplete(){this.members.forEach(t=>{const{options:n,resumingFrom:r}=t;n.onExitComplete&&n.onExitComplete(),r&&r.options.onExitComplete&&r.options.onExitComplete()})}scheduleRender(){this.members.forEach(t=>{t.instance&&t.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function Wd(e,t,n){let r="";const s=e.x.translate/t.x,i=e.y.translate/t.y;if((s||i)&&(r=`translate3d(${s}px, ${i}px, 0) `),(t.x!==1||t.y!==1)&&(r+=`scale(${1/t.x}, ${1/t.y}) `),n){const{rotate:l,rotateX:c,rotateY:f}=n;l&&(r+=`rotate(${l}deg) `),c&&(r+=`rotateX(${c}deg) `),f&&(r+=`rotateY(${f}deg) `)}const a=e.x.scale*t.x,o=e.y.scale*t.y;return(a!==1||o!==1)&&(r+=`scale(${a}, ${o})`),r||"none"}const pb=(e,t)=>e.depth-t.depth;class hb{constructor(){this.children=[],this.isDirty=!1}add(t){Au(this.children,t),this.isDirty=!0}remove(t){Lu(this.children,t),this.isDirty=!0}forEach(t){this.isDirty&&this.children.sort(pb),this.isDirty=!1,this.children.forEach(t)}}function gb(e,t){const n=performance.now(),r=({timestamp:s})=>{const i=s-n;i>=t&&(St(r),e(i-t))};return G.read(r,!0),()=>St(r)}function yb(e){window.MotionDebug&&window.MotionDebug.record(e)}function vb(e){return e instanceof SVGElement&&e.tagName!=="svg"}function xb(e,t,n){const r=Le(e)?e:ar(e);return r.start(Mu("",r,t,n)),r.animation}const Hd=["","X","Y","Z"],wb={visibility:"hidden"},Gd=1e3;let bb=0;const un={type:"projectionFrame",totalNodes:0,resolvedTargetDeltas:0,recalculatedProjection:0};function rg({attachResizeListener:e,defaultParent:t,measureScroll:n,checkIsScrollRoot:r,resetTransform:s}){return class{constructor(a={},o=t==null?void 0:t()){this.id=bb++,this.animationId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,un.totalNodes=un.resolvedTargetDeltas=un.recalculatedProjection=0,this.nodes.forEach(Cb),this.nodes.forEach(Tb),this.nodes.forEach(Rb),this.nodes.forEach(Nb),yb(un)},this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=a,this.root=o?o.root||o:this,this.path=o?[...o.path,o]:[],this.parent=o,this.depth=o?o.depth+1:0;for(let l=0;l<this.path.length;l++)this.path[l].shouldResetTransform=!0;this.root===this&&(this.nodes=new hb)}addEventListener(a,o){return this.eventHandlers.has(a)||this.eventHandlers.set(a,new _u),this.eventHandlers.get(a).add(o)}notifyListeners(a,...o){const l=this.eventHandlers.get(a);l&&l.notify(...o)}hasListeners(a){return this.eventHandlers.has(a)}mount(a,o=this.root.hasTreeAnimated){if(this.instance)return;this.isSVG=vb(a),this.instance=a;const{layoutId:l,layout:c,visualElement:f}=this.options;if(f&&!f.current&&f.mount(a),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),o&&(c||l)&&(this.isLayoutDirty=!0),e){let d;const m=()=>this.root.updateBlockedByResize=!1;e(a,()=>{this.root.updateBlockedByResize=!0,d&&d(),d=gb(m,250),si.hasAnimatedSinceResize&&(si.hasAnimatedSinceResize=!1,this.nodes.forEach(Kd))})}l&&this.root.registerSharedNode(l,this),this.options.animate!==!1&&f&&(l||c)&&this.addEventListener("didUpdate",({delta:d,hasLayoutChanged:m,hasRelativeTargetChanged:g,layout:v})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const x=this.options.transition||f.getDefaultTransition()||Db,{onLayoutAnimationStart:k,onLayoutAnimationComplete:y}=f.getProps(),h=!this.targetLayout||!ng(this.targetLayout,v)||g,p=!m&&g;if(this.options.layoutRoot||this.resumeFrom&&this.resumeFrom.instance||p||m&&(h||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0),this.setAnimationOrigin(d,p);const b={...Ru(x,"layout"),onPlay:k,onComplete:y};(f.shouldReduceMotion||this.options.layoutRoot)&&(b.delay=0,b.type=!1),this.startAnimation(b)}else m||Kd(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=v})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const a=this.getStack();a&&a.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,St(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(Mb),this.animationId++)}getTransformTemplate(){const{visualElement:a}=this.options;return a&&a.getProps().transformTemplate}willUpdate(a=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let f=0;f<this.path.length;f++){const d=this.path[f];d.shouldResetTransform=!0,d.updateScroll("snapshot"),d.options.layoutRoot&&d.willUpdate(!1)}const{layoutId:o,layout:l}=this.options;if(o===void 0&&!l)return;const c=this.getTransformTemplate();this.prevTransformTemplateValue=c?c(this.latestValues,""):void 0,this.updateSnapshot(),a&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(Yd);return}this.isUpdating||this.nodes.forEach(Eb),this.isUpdating=!1,this.nodes.forEach(Pb),this.nodes.forEach(kb),this.nodes.forEach(Sb),this.clearAllSnapshots();const o=performance.now();xe.delta=Yt(0,1e3/60,o-xe.timestamp),xe.timestamp=o,xe.isProcessing=!0,$a.update.process(xe),$a.preRender.process(xe),$a.render.process(xe),xe.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,queueMicrotask(()=>this.update()))}clearAllSnapshots(){this.nodes.forEach(jb),this.sharedNodes.forEach(Ab)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,G.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){G.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure())}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let l=0;l<this.path.length;l++)this.path[l].updateScroll();const a=this.layout;this.layout=this.measure(!1),this.layoutCorrected=ae(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:o}=this.options;o&&o.notify("LayoutMeasure",this.layout.layoutBox,a?a.layoutBox:void 0)}updateScroll(a="measure"){let o=!!(this.options.layoutScroll&&this.instance);this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===a&&(o=!1),o&&(this.scroll={animationId:this.root.animationId,phase:a,isRoot:r(this.instance),offset:n(this.instance)})}resetTransform(){if(!s)return;const a=this.isLayoutDirty||this.shouldResetTransform,o=this.projectionDelta&&!tg(this.projectionDelta),l=this.getTransformTemplate(),c=l?l(this.latestValues,""):void 0,f=c!==this.prevTransformTemplateValue;a&&(o||ln(this.latestValues)||f)&&(s(this.instance,c),this.shouldResetTransform=!1,this.scheduleRender())}measure(a=!0){const o=this.measurePageBox();let l=this.removeElementScroll(o);return a&&(l=this.removeTransform(l)),Ib(l),{animationId:this.root.animationId,measuredBox:o,layoutBox:l,latestValues:{},source:this.id}}measurePageBox(){const{visualElement:a}=this.options;if(!a)return ae();const o=a.measureViewportBox(),{scroll:l}=this.root;return l&&(Tt(o.x,l.offset.x),Tt(o.y,l.offset.y)),o}removeElementScroll(a){const o=ae();$e(o,a);for(let l=0;l<this.path.length;l++){const c=this.path[l],{scroll:f,options:d}=c;if(c!==this.root&&f&&d.layoutScroll){if(f.isRoot){$e(o,a);const{scroll:m}=this.root;m&&(Tt(o.x,-m.offset.x),Tt(o.y,-m.offset.y))}Tt(o.x,f.offset.x),Tt(o.y,f.offset.y)}}return o}applyTransform(a,o=!1){const l=ae();$e(l,a);for(let c=0;c<this.path.length;c++){const f=this.path[c];!o&&f.options.layoutScroll&&f.scroll&&f!==f.root&&Gn(l,{x:-f.scroll.offset.x,y:-f.scroll.offset.y}),ln(f.latestValues)&&Gn(l,f.latestValues)}return ln(this.latestValues)&&Gn(l,this.latestValues),l}removeTransform(a){const o=ae();$e(o,a);for(let l=0;l<this.path.length;l++){const c=this.path[l];if(!c.instance||!ln(c.latestValues))continue;ul(c.latestValues)&&c.updateSnapshot();const f=ae(),d=c.measurePageBox();$e(f,d),Bd(o,c.latestValues,c.snapshot?c.snapshot.layoutBox:void 0,f)}return ln(this.latestValues)&&Bd(o,this.latestValues),o}setTargetDelta(a){this.targetDelta=a,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(a){this.options={...this.options,...a,crossfade:a.crossfade!==void 0?a.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==xe.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(a=!1){var o;const l=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=l.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=l.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=l.isSharedProjectionDirty);const c=!!this.resumingFrom||this!==l;if(!(a||c&&this.isSharedProjectionDirty||this.isProjectionDirty||!((o=this.parent)===null||o===void 0)&&o.isProjectionDirty||this.attemptToResolveRelativeTarget))return;const{layout:d,layoutId:m}=this.options;if(!(!this.layout||!(d||m))){if(this.resolvedRelativeTargetAt=xe.timestamp,!this.targetDelta&&!this.relativeTarget){const g=this.getClosestProjectingParent();g&&g.layout&&this.animationProgress!==1?(this.relativeParent=g,this.forceRelativeParentToResolveTarget(),this.relativeTarget=ae(),this.relativeTargetOrigin=ae(),Br(this.relativeTargetOrigin,this.layout.layoutBox,g.layout.layoutBox),$e(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)){if(this.target||(this.target=ae(),this.targetWithTransforms=ae()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),Vw(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):$e(this.target,this.layout.layoutBox),Qh(this.target,this.targetDelta)):$e(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget){this.attemptToResolveRelativeTarget=!1;const g=this.getClosestProjectingParent();g&&!!g.resumingFrom==!!this.resumingFrom&&!g.options.layoutScroll&&g.target&&this.animationProgress!==1?(this.relativeParent=g,this.forceRelativeParentToResolveTarget(),this.relativeTarget=ae(),this.relativeTargetOrigin=ae(),Br(this.relativeTargetOrigin,this.target,g.target),$e(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}un.resolvedTargetDeltas++}}}getClosestProjectingParent(){if(!(!this.parent||ul(this.parent.latestValues)||Kh(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){var a;const o=this.getLead(),l=!!this.resumingFrom||this!==o;let c=!0;if((this.isProjectionDirty||!((a=this.parent)===null||a===void 0)&&a.isProjectionDirty)&&(c=!1),l&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(c=!1),this.resolvedRelativeTargetAt===xe.timestamp&&(c=!1),c)return;const{layout:f,layoutId:d}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(f||d))return;$e(this.layoutCorrected,this.layout.layoutBox);const m=this.treeScale.x,g=this.treeScale.y;Gw(this.layoutCorrected,this.treeScale,this.path,l),o.layout&&!o.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(o.target=o.layout.layoutBox);const{target:v}=o;if(!v){this.projectionTransform&&(this.projectionDelta=Hn(),this.projectionTransform="none",this.scheduleRender());return}this.projectionDelta||(this.projectionDelta=Hn(),this.projectionDeltaWithTransform=Hn());const x=this.projectionTransform;Ur(this.projectionDelta,this.layoutCorrected,v,this.latestValues),this.projectionTransform=Wd(this.projectionDelta,this.treeScale),(this.projectionTransform!==x||this.treeScale.x!==m||this.treeScale.y!==g)&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",v)),un.recalculatedProjection++}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(a=!0){if(this.options.scheduleRender&&this.options.scheduleRender(),a){const o=this.getStack();o&&o.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}setAnimationOrigin(a,o=!1){const l=this.snapshot,c=l?l.latestValues:{},f={...this.latestValues},d=Hn();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!o;const m=ae(),g=l?l.source:void 0,v=this.layout?this.layout.source:void 0,x=g!==v,k=this.getStack(),y=!k||k.members.length<=1,h=!!(x&&!y&&this.options.crossfade===!0&&!this.path.some(_b));this.animationProgress=0;let p;this.mixTargetDelta=b=>{const S=b/1e3;Qd(d.x,a.x,S),Qd(d.y,a.y,S),this.setTargetDelta(d),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Br(m,this.layout.layoutBox,this.relativeParent.layout.layoutBox),Lb(this.relativeTarget,this.relativeTargetOrigin,m,S),p&&fb(this.relativeTarget,p)&&(this.isProjectionDirty=!1),p||(p=ae()),$e(p,this.relativeTarget)),x&&(this.animationValues=f,ab(f,c,this.latestValues,S,h,y)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=S},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(a){this.notifyListeners("animationStart"),this.currentAnimation&&this.currentAnimation.stop(),this.resumingFrom&&this.resumingFrom.currentAnimation&&this.resumingFrom.currentAnimation.stop(),this.pendingAnimation&&(St(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=G.update(()=>{si.hasAnimatedSinceResize=!0,this.currentAnimation=xb(0,Gd,{...a,onUpdate:o=>{this.mixTargetDelta(o),a.onUpdate&&a.onUpdate(o)},onComplete:()=>{a.onComplete&&a.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const a=this.getStack();a&&a.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(Gd),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const a=this.getLead();let{targetWithTransforms:o,target:l,layout:c,latestValues:f}=a;if(!(!o||!l||!c)){if(this!==a&&this.layout&&c&&sg(this.options.animationType,this.layout.layoutBox,c.layoutBox)){l=this.target||ae();const d=Fe(this.layout.layoutBox.x);l.x.min=a.target.x.min,l.x.max=l.x.min+d;const m=Fe(this.layout.layoutBox.y);l.y.min=a.target.y.min,l.y.max=l.y.min+m}$e(o,l),Gn(o,f),Ur(this.projectionDeltaWithTransform,this.layoutCorrected,o,f)}}registerSharedNode(a,o){this.sharedNodes.has(a)||this.sharedNodes.set(a,new mb),this.sharedNodes.get(a).add(o);const c=o.options.initialPromotionConfig;o.promote({transition:c?c.transition:void 0,preserveFollowOpacity:c&&c.shouldPreserveFollowOpacity?c.shouldPreserveFollowOpacity(o):void 0})}isLead(){const a=this.getStack();return a?a.lead===this:!0}getLead(){var a;const{layoutId:o}=this.options;return o?((a=this.getStack())===null||a===void 0?void 0:a.lead)||this:this}getPrevLead(){var a;const{layoutId:o}=this.options;return o?(a=this.getStack())===null||a===void 0?void 0:a.prevLead:void 0}getStack(){const{layoutId:a}=this.options;if(a)return this.root.sharedNodes.get(a)}promote({needsReset:a,transition:o,preserveFollowOpacity:l}={}){const c=this.getStack();c&&c.promote(this,l),a&&(this.projectionDelta=void 0,this.needsReset=!0),o&&this.setOptions({transition:o})}relegate(){const a=this.getStack();return a?a.relegate(this):!1}resetRotation(){const{visualElement:a}=this.options;if(!a)return;let o=!1;const{latestValues:l}=a;if((l.rotate||l.rotateX||l.rotateY||l.rotateZ)&&(o=!0),!o)return;const c={};for(let f=0;f<Hd.length;f++){const d="rotate"+Hd[f];l[d]&&(c[d]=l[d],a.setStaticValue(d,0))}a.render();for(const f in c)a.setStaticValue(f,c[f]);a.scheduleRender()}getProjectionStyles(a){var o,l;if(!this.instance||this.isSVG)return;if(!this.isVisible)return wb;const c={visibility:""},f=this.getTransformTemplate();if(this.needsReset)return this.needsReset=!1,c.opacity="",c.pointerEvents=ri(a==null?void 0:a.pointerEvents)||"",c.transform=f?f(this.latestValues,""):"none",c;const d=this.getLead();if(!this.projectionDelta||!this.layout||!d.target){const x={};return this.options.layoutId&&(x.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,x.pointerEvents=ri(a==null?void 0:a.pointerEvents)||""),this.hasProjected&&!ln(this.latestValues)&&(x.transform=f?f({},""):"none",this.hasProjected=!1),x}const m=d.animationValues||d.latestValues;this.applyTransformsToTarget(),c.transform=Wd(this.projectionDeltaWithTransform,this.treeScale,m),f&&(c.transform=f(m,c.transform));const{x:g,y:v}=this.projectionDelta;c.transformOrigin=`${g.origin*100}% ${v.origin*100}% 0`,d.animationValues?c.opacity=d===this?(l=(o=m.opacity)!==null&&o!==void 0?o:this.latestValues.opacity)!==null&&l!==void 0?l:1:this.preserveOpacity?this.latestValues.opacity:m.opacityExit:c.opacity=d===this?m.opacity!==void 0?m.opacity:"":m.opacityExit!==void 0?m.opacityExit:0;for(const x in Ri){if(m[x]===void 0)continue;const{correct:k,applyTo:y}=Ri[x],h=c.transform==="none"?m[x]:k(m[x],d);if(y){const p=y.length;for(let b=0;b<p;b++)c[y[b]]=h}else c[x]=h}return this.options.layoutId&&(c.pointerEvents=d===this?ri(a==null?void 0:a.pointerEvents)||"":"none"),c}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(a=>{var o;return(o=a.currentAnimation)===null||o===void 0?void 0:o.stop()}),this.root.nodes.forEach(Yd),this.root.sharedNodes.clear()}}}function kb(e){e.updateLayout()}function Sb(e){var t;const n=((t=e.resumeFrom)===null||t===void 0?void 0:t.snapshot)||e.snapshot;if(e.isLead()&&e.layout&&n&&e.hasListeners("didUpdate")){const{layoutBox:r,measuredBox:s}=e.layout,{animationType:i}=e.options,a=n.source!==e.layout.source;i==="size"?ze(d=>{const m=a?n.measuredBox[d]:n.layoutBox[d],g=Fe(m);m.min=r[d].min,m.max=m.min+g}):sg(i,n.layoutBox,r)&&ze(d=>{const m=a?n.measuredBox[d]:n.layoutBox[d],g=Fe(r[d]);m.max=m.min+g,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[d].max=e.relativeTarget[d].min+g)});const o=Hn();Ur(o,r,n.layoutBox);const l=Hn();a?Ur(l,e.applyTransform(s,!0),n.measuredBox):Ur(l,r,n.layoutBox);const c=!tg(o);let f=!1;if(!e.resumeFrom){const d=e.getClosestProjectingParent();if(d&&!d.resumeFrom){const{snapshot:m,layout:g}=d;if(m&&g){const v=ae();Br(v,n.layoutBox,m.layoutBox);const x=ae();Br(x,r,g.layoutBox),ng(v,x)||(f=!0),d.options.layoutRoot&&(e.relativeTarget=x,e.relativeTargetOrigin=v,e.relativeParent=d)}}}e.notifyListeners("didUpdate",{layout:r,snapshot:n,delta:l,layoutDelta:o,hasLayoutChanged:c,hasRelativeTargetChanged:f})}else if(e.isLead()){const{onExitComplete:r}=e.options;r&&r()}e.options.transition=void 0}function Cb(e){un.totalNodes++,e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||(e.isSharedProjectionDirty=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty)),e.isTransformDirty||(e.isTransformDirty=e.parent.isTransformDirty))}function Nb(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function jb(e){e.clearSnapshot()}function Yd(e){e.clearMeasurements()}function Eb(e){e.isLayoutDirty=!1}function Pb(e){const{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify("BeforeLayoutMeasure"),e.resetTransform()}function Kd(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function Tb(e){e.resolveTargetDelta()}function Rb(e){e.calcProjection()}function Mb(e){e.resetRotation()}function Ab(e){e.removeLeadSnapshot()}function Qd(e,t,n){e.translate=Z(t.translate,0,n),e.scale=Z(t.scale,1,n),e.origin=t.origin,e.originPoint=t.originPoint}function qd(e,t,n,r){e.min=Z(t.min,n.min,r),e.max=Z(t.max,n.max,r)}function Lb(e,t,n,r){qd(e.x,t.x,n.x,r),qd(e.y,t.y,n.y,r)}function _b(e){return e.animationValues&&e.animationValues.opacityExit!==void 0}const Db={duration:.45,ease:[.4,0,.1,1]},Jd=e=>typeof navigator<"u"&&navigator.userAgent.toLowerCase().includes(e),Xd=Jd("applewebkit/")&&!Jd("chrome/")?Math.round:ie;function Zd(e){e.min=Xd(e.min),e.max=Xd(e.max)}function Ib(e){Zd(e.x),Zd(e.y)}function sg(e,t,n){return e==="position"||e==="preserve-aspect"&&!ol(zd(t),zd(n),.2)}const Vb=rg({attachResizeListener:(e,t)=>ht(e,"resize",t),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),Za={current:void 0},ig=rg({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!Za.current){const e=new Vb({});e.mount(window),e.setOptions({layoutScroll:!0}),Za.current=e}return Za.current},resetTransform:(e,t)=>{e.style.transform=t!==void 0?t:"none"},checkIsScrollRoot:e=>window.getComputedStyle(e).position==="fixed"}),Ob={pan:{Feature:eb},drag:{Feature:Zw,ProjectionNode:ig,MeasureLayout:Xh}},Fb=/var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;function Ub(e){const t=Fb.exec(e);if(!t)return[,];const[,n,r]=t;return[n,r]}function dl(e,t,n=1){const[r,s]=Ub(e);if(!r)return;const i=window.getComputedStyle(t).getPropertyValue(r);if(i){const a=i.trim();return Bh(a)?parseFloat(a):a}else return el(s)?dl(s,t,n+1):s}function Bb(e,{...t},n){const r=e.current;if(!(r instanceof Element))return{target:t,transitionEnd:n};n&&(n={...n}),e.values.forEach(s=>{const i=s.get();if(!el(i))return;const a=dl(i,r);a&&s.set(a)});for(const s in t){const i=t[s];if(!el(i))continue;const a=dl(i,r);a&&(t[s]=a,n||(n={}),n[s]===void 0&&(n[s]=i))}return{target:t,transitionEnd:n}}const $b=new Set(["width","height","top","left","right","bottom","x","y","translateX","translateY"]),ag=e=>$b.has(e),zb=e=>Object.keys(e).some(ag),ef=e=>e===Pn||e===I,tf=(e,t)=>parseFloat(e.split(", ")[t]),nf=(e,t)=>(n,{transform:r})=>{if(r==="none"||!r)return 0;const s=r.match(/^matrix3d\((.+)\)$/);if(s)return tf(s[1],t);{const i=r.match(/^matrix\((.+)\)$/);return i?tf(i[1],e):0}},Wb=new Set(["x","y","z"]),Hb=xs.filter(e=>!Wb.has(e));function Gb(e){const t=[];return Hb.forEach(n=>{const r=e.getValue(n);r!==void 0&&(t.push([n,r.get()]),r.set(n.startsWith("scale")?1:0))}),t.length&&e.render(),t}const or={width:({x:e},{paddingLeft:t="0",paddingRight:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),height:({y:e},{paddingTop:t="0",paddingBottom:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),top:(e,{top:t})=>parseFloat(t),left:(e,{left:t})=>parseFloat(t),bottom:({y:e},{top:t})=>parseFloat(t)+(e.max-e.min),right:({x:e},{left:t})=>parseFloat(t)+(e.max-e.min),x:nf(4,13),y:nf(5,14)};or.translateX=or.x;or.translateY=or.y;const Yb=(e,t,n)=>{const r=t.measureViewportBox(),s=t.current,i=getComputedStyle(s),{display:a}=i,o={};a==="none"&&t.setStaticValue("display",e.display||"block"),n.forEach(c=>{o[c]=or[c](r,i)}),t.render();const l=t.measureViewportBox();return n.forEach(c=>{const f=t.getValue(c);f&&f.jump(o[c]),e[c]=or[c](l,i)}),e},Kb=(e,t,n={},r={})=>{t={...t},r={...r};const s=Object.keys(t).filter(ag);let i=[],a=!1;const o=[];if(s.forEach(l=>{const c=e.getValue(l);if(!e.hasValue(l))return;let f=n[l],d=kr(f);const m=t[l];let g;if(Ai(m)){const v=m.length,x=m[0]===null?1:0;f=m[x],d=kr(f);for(let k=x;k<v&&m[k]!==null;k++)g?Nu(kr(m[k])===g):g=kr(m[k])}else g=kr(m);if(d!==g)if(ef(d)&&ef(g)){const v=c.get();typeof v=="string"&&c.set(parseFloat(v)),typeof m=="string"?t[l]=parseFloat(m):Array.isArray(m)&&g===I&&(t[l]=m.map(parseFloat))}else d!=null&&d.transform&&(g!=null&&g.transform)&&(f===0||m===0)?f===0?c.set(g.transform(f)):t[l]=d.transform(m):(a||(i=Gb(e),a=!0),o.push(l),r[l]=r[l]!==void 0?r[l]:t[l],c.jump(m))}),o.length){const l=o.indexOf("height")>=0?window.pageYOffset:null,c=Yb(t,e,o);return i.length&&i.forEach(([f,d])=>{e.getValue(f).set(d)}),e.render(),aa&&l!==null&&window.scrollTo({top:l}),{target:c,transitionEnd:r}}else return{target:t,transitionEnd:r}};function Qb(e,t,n,r){return zb(t)?Kb(e,t,n,r):{target:t,transitionEnd:r}}const qb=(e,t,n,r)=>{const s=Bb(e,t,r);return t=s.target,r=s.transitionEnd,Qb(e,t,n,r)},Oi={current:null},Du={current:!1};function og(){if(Du.current=!0,!!aa)if(window.matchMedia){const e=window.matchMedia("(prefers-reduced-motion)"),t=()=>Oi.current=e.matches;e.addListener(t),t()}else Oi.current=!1}function Jb(e,t,n){const{willChange:r}=t;for(const s in t){const i=t[s],a=n[s];if(Le(i))e.addValue(s,i),Ii(r)&&r.add(s);else if(Le(a))e.addValue(s,ar(i,{owner:e})),Ii(r)&&r.remove(s);else if(a!==i)if(e.hasValue(s)){const o=e.getValue(s);!o.hasAnimated&&o.set(i)}else{const o=e.getStaticValue(s);e.addValue(s,ar(o!==void 0?o:i,{owner:e}))}}for(const s in n)t[s]===void 0&&e.removeValue(s);return t}const rf=new WeakMap,lg=Object.keys(ls),Xb=lg.length,sf=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],Zb=gu.length;class ek{constructor({parent:t,props:n,presenceContext:r,reducedMotionConfig:s,visualState:i},a={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.scheduleRender=()=>G.render(this.render,!1,!0);const{latestValues:o,renderState:l}=i;this.latestValues=o,this.baseTarget={...o},this.initialValues=n.initial?{...o}:{},this.renderState=l,this.parent=t,this.props=n,this.presenceContext=r,this.depth=t?t.depth+1:0,this.reducedMotionConfig=s,this.options=a,this.isControllingVariants=la(n),this.isVariantNode=Gp(n),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);const{willChange:c,...f}=this.scrapeMotionValuesFromProps(n,{});for(const d in f){const m=f[d];o[d]!==void 0&&Le(m)&&(m.set(o[d],!1),Ii(c)&&c.add(d))}}scrapeMotionValuesFromProps(t,n){return{}}mount(t){this.current=t,rf.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((n,r)=>this.bindToMotionValue(r,n)),Du.current||og(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:Oi.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){rf.delete(this.current),this.projection&&this.projection.unmount(),St(this.notifyUpdate),St(this.render),this.valueSubscriptions.forEach(t=>t()),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(const t in this.events)this.events[t].clear();for(const t in this.features)this.features[t].unmount();this.current=null}bindToMotionValue(t,n){const r=En.has(t),s=n.on("change",a=>{this.latestValues[t]=a,this.props.onUpdate&&G.update(this.notifyUpdate,!1,!0),r&&this.projection&&(this.projection.isTransformDirty=!0)}),i=n.on("renderRequest",this.scheduleRender);this.valueSubscriptions.set(t,()=>{s(),i()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}loadFeatures({children:t,...n},r,s,i){let a,o;for(let l=0;l<Xb;l++){const c=lg[l],{isEnabled:f,Feature:d,ProjectionNode:m,MeasureLayout:g}=ls[c];m&&(a=m),f(n)&&(!this.features[c]&&d&&(this.features[c]=new d(this)),g&&(o=g))}if((this.type==="html"||this.type==="svg")&&!this.projection&&a){this.projection=new a(this.latestValues,this.parent&&this.parent.projection);const{layoutId:l,layout:c,drag:f,dragConstraints:d,layoutScroll:m,layoutRoot:g}=n;this.projection.setOptions({layoutId:l,layout:c,alwaysMeasureLayout:!!f||d&&zn(d),visualElement:this,scheduleRender:()=>this.scheduleRender(),animationType:typeof c=="string"?c:"both",initialPromotionConfig:i,layoutScroll:m,layoutRoot:g})}return o}updateFeatures(){for(const t in this.features){const n=this.features[t];n.isMounted?n.update():(n.mount(),n.isMounted=!0)}}triggerBuild(){this.build(this.renderState,this.latestValues,this.options,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):ae()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,n){this.latestValues[t]=n}makeTargetAnimatable(t,n=!0){return this.makeTargetAnimatableFromInstance(t,this.props,n)}update(t,n){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=n;for(let r=0;r<sf.length;r++){const s=sf[r];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);const i=t["on"+s];i&&(this.propEventSubscriptions[s]=this.on(s,i))}this.prevMotionValues=Jb(this,this.scrapeMotionValuesFromProps(t,this.prevProps),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}getVariantContext(t=!1){if(t)return this.parent?this.parent.getVariantContext():void 0;if(!this.isControllingVariants){const r=this.parent?this.parent.getVariantContext()||{}:{};return this.props.initial!==void 0&&(r.initial=this.props.initial),r}const n={};for(let r=0;r<Zb;r++){const s=gu[r],i=this.props[s];(os(i)||i===!1)&&(n[s]=i)}return n}addVariantChild(t){const n=this.getClosestVariantNode();if(n)return n.variantChildren&&n.variantChildren.add(t),()=>n.variantChildren.delete(t)}addValue(t,n){n!==this.values.get(t)&&(this.removeValue(t),this.bindToMotionValue(t,n)),this.values.set(t,n),this.latestValues[t]=n.get()}removeValue(t){this.values.delete(t);const n=this.valueSubscriptions.get(t);n&&(n(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,n){if(this.props.values&&this.props.values[t])return this.props.values[t];let r=this.values.get(t);return r===void 0&&n!==void 0&&(r=ar(n,{owner:this}),this.addValue(t,r)),r}readValue(t){var n;return this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:(n=this.getBaseTargetFromProps(this.props,t))!==null&&n!==void 0?n:this.readValueFromInstance(this.current,t,this.options)}setBaseTarget(t,n){this.baseTarget[t]=n}getBaseTarget(t){var n;const{initial:r}=this.props,s=typeof r=="string"||typeof r=="object"?(n=Cu(this.props,r))===null||n===void 0?void 0:n[t]:void 0;if(r&&s!==void 0)return s;const i=this.getBaseTargetFromProps(this.props,t);return i!==void 0&&!Le(i)?i:this.initialValues[t]!==void 0&&s===void 0?void 0:this.baseTarget[t]}on(t,n){return this.events[t]||(this.events[t]=new _u),this.events[t].add(n)}notify(t,...n){this.events[t]&&this.events[t].notify(...n)}}class ug extends ek{sortInstanceNodePosition(t,n){return t.compareDocumentPosition(n)&2?1:-1}getBaseTargetFromProps(t,n){return t.style?t.style[n]:void 0}removeValueFromRenderState(t,{vars:n,style:r}){delete n[t],delete r[t]}makeTargetAnimatableFromInstance({transition:t,transitionEnd:n,...r},{transformValues:s},i){let a=vw(r,t||{},this);if(s&&(n&&(n=s(n)),r&&(r=s(r)),a&&(a=s(a))),i){gw(this,r,a);const o=qb(this,r,a,n);n=o.transitionEnd,r=o.target}return{transition:t,transitionEnd:n,...r}}}function tk(e){return window.getComputedStyle(e)}class nk extends ug{constructor(){super(...arguments),this.type="html"}readValueFromInstance(t,n){if(En.has(n)){const r=Tu(n);return r&&r.default||0}else{const r=tk(t),s=(qp(n)?r.getPropertyValue(n):r[n])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(t,{transformPagePoint:n}){return qh(t,n)}build(t,n,r,s){xu(t,n,r,s.transformTemplate)}scrapeMotionValuesFromProps(t,n){return Su(t,n)}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:t}=this.props;Le(t)&&(this.childSubscription=t.on("change",n=>{this.current&&(this.current.textContent=`${n}`)}))}renderInstance(t,n,r,s){nh(t,n,r,s)}}class rk extends ug{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1}getBaseTargetFromProps(t,n){return t[n]}readValueFromInstance(t,n){if(En.has(n)){const r=Tu(n);return r&&r.default||0}return n=rh.has(n)?n:pu(n),t.getAttribute(n)}measureInstanceViewportBox(){return ae()}scrapeMotionValuesFromProps(t,n){return ih(t,n)}build(t,n,r,s){bu(t,n,r,this.isSVGTag,s.transformTemplate)}renderInstance(t,n,r,s){sh(t,n,r,s)}mount(t){this.isSVGTag=ku(t.tagName),super.mount(t)}}const sk=(e,t)=>vu(e)?new rk(t,{enableHardwareAcceleration:!1}):new nk(t,{enableHardwareAcceleration:!0}),ik={layout:{ProjectionNode:ig,MeasureLayout:Xh}},ak={...Lw,...Zx,...Ob,...ik},D=lx((e,t)=>Ux(e,t,ak,sk));function cg(){const e=w.useRef(!1);return mu(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function ok(){const e=cg(),[t,n]=w.useState(0),r=w.useCallback(()=>{e.current&&n(t+1)},[t]);return[w.useCallback(()=>G.postRender(r),[r]),t]}class lk extends w.Component{getSnapshotBeforeUpdate(t){const n=this.props.childRef.current;if(n&&t.isPresent&&!this.props.isPresent){const r=this.props.sizeRef.current;r.height=n.offsetHeight||0,r.width=n.offsetWidth||0,r.top=n.offsetTop,r.left=n.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function uk({children:e,isPresent:t}){const n=w.useId(),r=w.useRef(null),s=w.useRef({width:0,height:0,top:0,left:0});return w.useInsertionEffect(()=>{const{width:i,height:a,top:o,left:l}=s.current;if(t||!r.current||!i||!a)return;r.current.dataset.motionPopId=n;const c=document.createElement("style");return document.head.appendChild(c),c.sheet&&c.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${i}px !important;
            height: ${a}px !important;
            top: ${o}px !important;
            left: ${l}px !important;
          }
        `),()=>{document.head.removeChild(c)}},[t]),w.createElement(lk,{isPresent:t,childRef:r,sizeRef:s},w.cloneElement(e,{ref:r}))}const eo=({children:e,initial:t,isPresent:n,onExitComplete:r,custom:s,presenceAffectsLayout:i,mode:a})=>{const o=ah(ck),l=w.useId(),c=w.useMemo(()=>({id:l,initial:t,isPresent:n,custom:s,onExitComplete:f=>{o.set(f,!0);for(const d of o.values())if(!d)return;r&&r()},register:f=>(o.set(f,!1),()=>o.delete(f))}),i?void 0:[n]);return w.useMemo(()=>{o.forEach((f,d)=>o.set(d,!1))},[n]),w.useEffect(()=>{!n&&!o.size&&r&&r()},[n]),a==="popLayout"&&(e=w.createElement(uk,{isPresent:n},e)),w.createElement(ia.Provider,{value:c},e)};function ck(){return new Map}function dk(e){return w.useEffect(()=>()=>e(),[])}const cn=e=>e.key||"";function fk(e,t){e.forEach(n=>{const r=cn(n);t.set(r,n)})}function mk(e){const t=[];return w.Children.forEach(e,n=>{w.isValidElement(n)&&t.push(n)}),t}const Iu=({children:e,custom:t,initial:n=!0,onExitComplete:r,exitBeforeEnter:s,presenceAffectsLayout:i=!0,mode:a="sync"})=>{const o=w.useContext(yu).forceRender||ok()[0],l=cg(),c=mk(e);let f=c;const d=w.useRef(new Map).current,m=w.useRef(f),g=w.useRef(new Map).current,v=w.useRef(!0);if(mu(()=>{v.current=!1,fk(c,g),m.current=f}),dk(()=>{v.current=!0,g.clear(),d.clear()}),v.current)return w.createElement(w.Fragment,null,f.map(h=>w.createElement(eo,{key:cn(h),isPresent:!0,initial:n?void 0:!1,presenceAffectsLayout:i,mode:a},h)));f=[...f];const x=m.current.map(cn),k=c.map(cn),y=x.length;for(let h=0;h<y;h++){const p=x[h];k.indexOf(p)===-1&&!d.has(p)&&d.set(p,void 0)}return a==="wait"&&d.size&&(f=[]),d.forEach((h,p)=>{if(k.indexOf(p)!==-1)return;const b=g.get(p);if(!b)return;const S=x.indexOf(p);let j=h;if(!j){const C=()=>{d.delete(p);const N=Array.from(g.keys()).filter(M=>!k.includes(M));if(N.forEach(M=>g.delete(M)),m.current=c.filter(M=>{const T=cn(M);return T===p||N.includes(T)}),!d.size){if(l.current===!1)return;o(),r&&r()}};j=w.createElement(eo,{key:cn(b),isPresent:!1,onExitComplete:C,custom:t,presenceAffectsLayout:i,mode:a},b),d.set(p,j)}f.splice(S,0,j)}),f=f.map(h=>{const p=h.key;return d.has(p)?h:w.createElement(eo,{key:cn(h),isPresent:!0,presenceAffectsLayout:i,mode:a},h)}),w.createElement(w.Fragment,null,d.size?f:f.map(h=>w.cloneElement(h)))};function dg(){!Du.current&&og();const[e]=w.useState(Oi.current);return e}/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var pk={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hk=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),V=(e,t)=>{const n=w.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:a,className:o="",children:l,...c},f)=>w.createElement("svg",{ref:f,...pk,width:s,height:s,stroke:r,strokeWidth:a?Number(i)*24/Number(s):i,className:["lucide",`lucide-${hk(e)}`,o].join(" "),...c},[...t.map(([d,m])=>w.createElement(d,m)),...Array.isArray(l)?l:[l]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const af=V("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fg=V("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fa=V("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gk=V("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const to=V("Award",[["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}],["path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fl=V("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mg=V("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yk=V("Brackets",[["path",{d:"M16 3h3v18h-3",key:"1yor1f"}],["path",{d:"M8 21H5V3h3",key:"1qrfwo"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vk=V("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xk=V("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lr=V("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cs=V("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const no=V("Cpu",[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"9",y:"9",width:"6",height:"6",key:"o3kz5p"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wk=V("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bk=V("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const of=V("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pg=V("Github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kk=V("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hg=V("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sk=V("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lf=V("HelpCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ck=V("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uf=V("Keyboard",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",ry:"2",key:"15u882"}],["path",{d:"M6 8h.001",key:"1ej0i3"}],["path",{d:"M10 8h.001",key:"1x2st2"}],["path",{d:"M14 8h.001",key:"1vkmyp"}],["path",{d:"M18 8h.001",key:"kfsenl"}],["path",{d:"M8 12h.001",key:"1sjpby"}],["path",{d:"M12 12h.001",key:"al75ts"}],["path",{d:"M16 12h.001",key:"931bgk"}],["path",{d:"M7 16h10",key:"wp8him"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nk=V("Library",[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jk=V("Linkedin",[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ek=V("List",[["line",{x1:"8",x2:"21",y1:"6",y2:"6",key:"7ey8pc"}],["line",{x1:"8",x2:"21",y1:"12",y2:"12",key:"rjfblc"}],["line",{x1:"8",x2:"21",y1:"18",y2:"18",key:"c3b1m8"}],["line",{x1:"3",x2:"3.01",y1:"6",y2:"6",key:"1g7gq3"}],["line",{x1:"3",x2:"3.01",y1:"12",y2:"12",key:"1pjlvk"}],["line",{x1:"3",x2:"3.01",y1:"18",y2:"18",key:"28t2mc"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pk=V("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tk=V("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rk=V("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ml=V("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gg=V("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mk=V("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cf=V("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ak=V("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lk=V("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ur=V("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _k=V("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dk=V("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pl=V("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hl=V("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yg=V("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ik=V("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ds=V("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]),Vk=()=>{const[e,t]=w.useState(!1),n=vs(),r=[{name:"Home",path:"/"},{name:"Languages",path:"/languages"},{name:"Stats",path:"/stats"},{name:"About",path:"/about"},{name:"FAQ",path:"/faq"}],s=()=>{t(!e)};return u.jsxs("nav",{className:"fixed left-0 right-0 top-0 z-50 border-b border-dark-border bg-dark-bg/88 shadow-nav backdrop-blur-md backdrop-saturate-150","aria-label":"Main navigation",children:[u.jsx("div",{className:"mx-auto max-w-page px-4 sm:px-6 lg:px-8",children:u.jsxs("div",{className:"flex justify-between items-center h-16",children:[u.jsx(ee,{to:"/",className:"flex items-center space-x-2 rounded-md focus-visible:outline-none",children:u.jsx(D.div,{className:"text-2xl font-bold text-gradient",whileHover:{scale:1.05},whileTap:{scale:.95},children:"CodeRush"})}),u.jsx("div",{className:"hidden md:flex items-center space-x-8",children:r.map(i=>u.jsxs(ee,{to:i.path,className:`relative flex min-h-[44px] items-center px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-ink ${n.pathname===i.path?"text-neon-blue":"text-ink-muted hover:text-ink"}`,children:[i.name,n.pathname===i.path&&u.jsx(D.div,{className:"absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue",layoutId:"activeTab",initial:!1,transition:{type:"spring",stiffness:500,damping:30}})]},i.name))}),u.jsx("div",{className:"md:hidden",children:u.jsx(D.button,{type:"button",id:"mobile-menu-button","aria-expanded":e,"aria-controls":"site-mobile-nav","aria-label":e?"Close menu":"Open menu",onClick:s,className:"flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg",whileTap:{scale:.98},children:e?u.jsx(Ik,{size:24,"aria-hidden":!0}):u.jsx(Tk,{size:24,"aria-hidden":!0})})})]})}),u.jsx(Iu,{children:e&&u.jsx(D.div,{initial:{opacity:0,x:-300},animate:{opacity:1,x:0},exit:{opacity:0,x:-300},transition:{duration:.3,ease:"easeOut"},id:"site-mobile-nav",role:"region","aria-label":"Mobile navigation",className:"fixed left-0 right-0 top-16 border-b border-dark-border bg-dark-card shadow-card md:hidden",children:u.jsx("div",{className:"px-4 py-6 space-y-4",children:r.map((i,a)=>u.jsx(D.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:a*.1},children:u.jsx(ee,{to:i.path,onClick:()=>t(!1),className:`block min-h-[44px] rounded-md px-3 py-3 text-base font-medium transition-colors duration-200 hover:text-neon-blue ${n.pathname===i.path?"text-neon-blue":"text-ink-muted hover:text-ink"}`,children:i.name})},i.name))})})})]})},df=()=>{const e={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.2,delayChildren:.3}}},t={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.45,ease:"easeOut"}}},n={hidden:{opacity:0,y:16},visible:{opacity:1,y:0,transition:{duration:.5,ease:"easeOut",delay:.2}}},r=[{icon:u.jsx(cs,{className:"w-8 h-8"}),title:"Structured Lessons",description:"Learn with beginner, intermediate, and advanced lessons for each programming language."},{icon:u.jsx(ds,{className:"w-8 h-8"}),title:"Free Practice Mode",description:"Customizable practice sessions with random code snippets and flexible settings."},{icon:u.jsx(ur,{className:"w-8 h-8"}),title:"Progress Tracking",description:"Monitor your improvement with detailed statistics, achievements, and performance metrics."}];return u.jsxs(D.div,{className:"min-h-screen w-full pt-20",variants:e,initial:"hidden",animate:"visible",children:[u.jsxs("section",{className:"relative isolate flex min-h-[calc(100vh-5rem)] items-center px-4 pb-20 pt-6 sm:min-h-[calc(100dvh-5rem)] sm:px-6 sm:pb-24 sm:pt-8 lg:px-8 lg:pb-28",children:[u.jsxs("div",{className:"pointer-events-none absolute inset-0 -z-10","aria-hidden":!0,children:[u.jsx("div",{className:"absolute left-1/2 top-[12%] h-[min(42rem,85vh)] w-[min(56rem,100vw)] -translate-x-1/2 rounded-full bg-gradient-to-b from-neon-blue/[0.12] via-neon-purple/[0.06] to-transparent blur-3xl"}),u.jsx("div",{className:"absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-dark-bg sm:h-40"})]}),u.jsx("div",{className:"relative mx-auto w-full max-w-page",children:u.jsxs("div",{className:"mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_min(20rem,34%)] lg:gap-14 xl:gap-20",children:[u.jsxs("div",{className:"text-center lg:max-w-none lg:text-left",children:[u.jsx(D.p,{className:"mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neon-blue/90 sm:mb-5 sm:text-sm sm:tracking-[0.22em]",variants:t,children:u.jsx("span",{className:"text-gradient",children:"CodeRush"})}),u.jsx(D.h1,{className:"mx-auto max-w-[min(100%,20rem)] text-balance text-display font-bold tracking-tight text-ink sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-[28rem]",variants:t,children:"Practice typing real code, faster."}),u.jsx(D.p,{className:"body-prose mx-auto mt-6 max-w-md text-ink-subtle sm:mt-7 sm:max-w-lg lg:mx-0 lg:max-w-xl",variants:t,children:"Master the art of coding by practicing with real-world code snippets. Improve your typing speed, accuracy, and muscle memory for programming languages."}),u.jsxs(D.div,{className:"mt-9 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 lg:mx-0",variants:t,children:[u.jsxs(ee,{to:"/languages",className:"btn-primary order-1 w-full justify-center px-8 py-3.5 text-base sm:w-auto sm:min-w-[12.5rem] sm:py-4 sm:text-lg",children:["Start Practicing",u.jsx(gk,{className:"ml-2 inline-block h-5 w-5 shrink-0","aria-hidden":!0})]}),u.jsx(ee,{to:"/about",className:"btn-secondary order-2 w-full justify-center px-8 py-3.5 text-base sm:w-auto sm:py-4 sm:text-lg",children:"Learn More"})]})]}),u.jsx(D.div,{className:"mx-auto hidden w-full max-w-sm md:block lg:max-w-none",variants:n,initial:"hidden",animate:"visible",children:u.jsxs("div",{className:"relative rounded-card border border-dark-border/90 bg-dark-surface/90 p-1 shadow-card backdrop-blur-sm",children:[u.jsxs("div",{className:"flex items-center gap-2 border-b border-dark-border/80 px-4 py-3",children:[u.jsx("span",{className:"h-2.5 w-2.5 rounded-full bg-red-500/70","aria-hidden":!0}),u.jsx("span",{className:"h-2.5 w-2.5 rounded-full bg-amber-400/70","aria-hidden":!0}),u.jsx("span",{className:"h-2.5 w-2.5 rounded-full bg-emerald-500/70","aria-hidden":!0}),u.jsx("span",{className:"ml-2 font-mono text-[10px] text-ink-faint sm:text-xs",children:"practice.py"})]}),u.jsxs("pre",{className:"overflow-x-auto p-4 text-left font-mono text-[11px] leading-relaxed text-ink-muted sm:text-xs",children:[u.jsx("span",{className:"text-neon-purple",children:"def "}),u.jsx("span",{className:"text-neon-blue",children:"rush"}),u.jsx("span",{className:"text-ink-muted",children:"():"}),`
    `,u.jsx("span",{className:"text-neon-purple",children:"return "}),u.jsx("span",{className:"text-emerald-400/90",children:'"wpm ↑"'})]}),u.jsx("div",{className:"pointer-events-none absolute -inset-px -z-10 rounded-[inherit] bg-gradient-to-br from-neon-blue/15 via-transparent to-neon-purple/10 opacity-80","aria-hidden":!0})]})})]})})]}),u.jsx("section",{className:"section-block section-flow px-4 sm:px-6 lg:px-8",children:u.jsxs("div",{className:"page-inner",children:[u.jsxs(D.div,{className:"section-head max-w-3xl md:mx-auto",variants:t,children:[u.jsxs("h2",{className:"heading-section mb-0 px-2",children:["Why Choose ",u.jsx("span",{className:"text-gradient",children:"CodeRush"}),"?"]}),u.jsx("div",{className:"section-rule","aria-hidden":!0}),u.jsx("p",{className:"body-lead mx-auto mt-5 max-w-2xl text-ink-subtle md:mt-6",children:"Built for developers who want to improve their coding efficiency and typing skills."})]}),u.jsx("div",{className:"grid auto-rows-fr gap-6 sm:gap-8 md:grid-cols-3",children:r.map((s,i)=>u.jsx(D.div,{variants:t,children:u.jsxs("div",{className:"group feature-card h-full",children:[u.jsx("div",{className:"feature-card__icon [&_svg]:h-7 [&_svg]:w-7",children:s.icon}),u.jsx("h3",{className:"feature-card__title",children:s.title}),u.jsx("p",{className:"feature-card__body",children:s.description})]})},i))})]})}),u.jsx("section",{className:"section-block section-flow-soft px-4 pb-20 sm:px-6 lg:px-8",children:u.jsx("div",{className:"page-inner-narrow",children:u.jsxs(D.div,{className:"cta-panel cta-panel-accent",variants:t,children:[u.jsxs("h2",{className:"heading-section mb-4 px-2 pt-1",children:["Ready to ",u.jsx("span",{className:"text-gradient",children:"Level Up"})," Your Coding?"]}),u.jsx("p",{className:"body-prose mx-auto mb-8 max-w-xl text-ink-muted md:max-w-2xl",children:"Join thousands of developers who are already improving their coding speed and accuracy."}),u.jsxs("div",{className:"cta-panel__actions",children:[u.jsx(ee,{to:"/languages",className:"btn-primary justify-center px-8 py-3.5 text-base sm:min-w-[11rem] sm:text-lg",children:"Choose Your Language"}),u.jsx(ee,{to:"/stats",className:"btn-secondary justify-center px-8 py-3.5 text-base sm:min-w-[11rem] sm:text-lg",children:"View Progress"})]})]})})})]})},Ok=()=>{const[e,t]=w.useState(""),n=[{id:"python",name:"Python",icon:u.jsx(cs,{className:"w-8 h-8"}),description:"High-level programming language for web development, data science, and automation",color:"from-yellow-400 to-orange-500"},{id:"javascript",name:"JavaScript",icon:u.jsx(cs,{className:"w-8 h-8"}),description:"Dynamic programming language for web development and server-side applications",color:"from-yellow-300 to-yellow-500"},{id:"java",name:"Java",icon:u.jsx(no,{className:"w-8 h-8"}),description:"Object-oriented programming language for enterprise applications and Android development",color:"from-red-500 to-red-700"},{id:"cpp",name:"C++",icon:u.jsx(no,{className:"w-8 h-8"}),description:"High-performance programming language for system programming and game development",color:"from-blue-500 to-blue-700"},{id:"html-css",name:"HTML/CSS",icon:u.jsx(yk,{className:"w-8 h-8"}),description:"Markup and styling languages for creating beautiful web pages and user interfaces",color:"from-orange-500 to-pink-500"},{id:"sql",name:"SQL",icon:u.jsx(wk,{className:"w-8 h-8"}),description:"Structured Query Language for managing and manipulating relational databases",color:"from-blue-400 to-blue-600"},{id:"bash",name:"Bash",icon:u.jsx(_k,{className:"w-8 h-8"}),description:"Command-line shell and scripting language for system administration and automation",color:"from-gray-600 to-gray-800"},{id:"typescript",name:"TypeScript",icon:u.jsx(hg,{className:"w-8 h-8"}),description:"Strongly typed superset of JavaScript for large-scale application development",color:"from-blue-400 to-blue-600"},{id:"go",name:"Go",icon:u.jsx(no,{className:"w-8 h-8"}),description:"Modern programming language for building efficient and scalable software",color:"from-cyan-400 to-blue-500"}],r=n.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())),s={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.1,delayChildren:.2}}},i={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.5,ease:"easeOut"}}};return u.jsx(D.div,{className:"page-shell",variants:s,initial:"hidden",animate:"visible",children:u.jsxs("div",{className:"page-inner",children:[u.jsxs(D.div,{className:"mb-12 text-center md:mb-14 md:mx-auto md:max-w-3xl",variants:i,children:[u.jsxs("h1",{className:"heading-page mb-0 px-2",children:["Choose Your ",u.jsx("span",{className:"text-gradient",children:"Language"})]}),u.jsx("div",{className:"section-rule","aria-hidden":!0}),u.jsx("p",{className:"body-lead mx-auto mt-5 max-w-3xl text-ink-subtle md:mt-6",children:"Select a programming language to start practicing your typing skills with real-world code snippets."}),u.jsxs("p",{className:"mx-auto mt-6 flex max-w-lg items-start justify-center gap-2.5 text-left text-sm leading-relaxed text-ink-muted sm:mt-7 sm:max-w-xl sm:text-center md:items-center",children:[u.jsx(mg,{className:"mt-0.5 h-4 w-4 shrink-0 text-neon-blue sm:mt-0","aria-hidden":!0}),u.jsxs("span",{children:[u.jsx("span",{className:"font-medium text-ink-subtle",children:"Next step:"})," pick a language below, then choose a lesson on the following page to begin typing."]})]})]}),u.jsxs(D.div,{className:"mx-auto mb-3 max-w-lg sm:mb-4",variants:i,children:[u.jsx("label",{htmlFor:"language-search",className:"mb-2 block text-center text-sm font-medium text-ink-muted",children:"Find a language"}),u.jsxs("div",{className:"search-shell",children:[u.jsx(cf,{className:"pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-subtle","aria-hidden":!0}),u.jsx("input",{id:"language-search",type:"search",name:"language-search",autoComplete:"off",placeholder:"Try Python, JavaScript, SQL…",value:e,onChange:a=>t(a.target.value),className:"focus-ring w-full border-0 bg-transparent py-3.5 pl-11 pr-4 text-ink placeholder:text-ink-faint focus:ring-0 focus:ring-offset-0"})]}),u.jsx("p",{className:"caption mt-2 text-center text-ink-faint","aria-live":"polite",children:r.length===n.length?`${n.length} languages available`:`${r.length} match${r.length===1?"":"es"}`})]}),u.jsx(D.div,{className:"mb-4 grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3",variants:s,"aria-label":"Programming languages",children:r.map(a=>u.jsx(D.div,{variants:i,children:u.jsx(ee,{to:`/languages/${a.id}/lessons`,className:"group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg rounded-card",children:u.jsxs("div",{className:"content-card h-full",children:[u.jsxs("div",{className:"mb-5 flex items-start gap-4",children:[u.jsx("div",{className:`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br p-2.5 shadow-inner ${a.color} text-white transition duration-200 group-hover:brightness-110`,children:u.jsx("span",{className:"[&_svg]:h-6 [&_svg]:w-6",children:a.icon})}),u.jsx("div",{className:"min-w-0 flex-1 pt-0.5",children:u.jsx("h3",{className:"text-lg font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-neon-blue md:text-xl",children:a.name})})]}),u.jsx("p",{className:"caption mb-5 flex-1 text-ink-subtle md:text-[0.9375rem] md:leading-relaxed",children:a.description}),u.jsxs("div",{className:"mt-auto flex items-center text-sm font-medium text-neon-blue transition-colors duration-200 group-hover:text-cyan-200",children:[u.jsx("span",{children:"Start Practicing"}),u.jsx("span",{className:"ml-2 transition-transform duration-200 group-hover:translate-x-0.5","aria-hidden":!0,children:"→"})]})]})})},a.id))}),r.length===0&&u.jsx(D.div,{className:"py-8 sm:py-10",variants:i,children:u.jsxs("div",{className:"empty-state-panel border-solid py-12 sm:py-14",children:[u.jsx(cf,{className:"mx-auto h-11 w-11 text-ink-faint",strokeWidth:1.25,"aria-hidden":!0}),u.jsxs("p",{className:"body-prose mt-5 text-ink-muted",children:["No languages match"," ",u.jsxs("span",{className:"font-medium text-ink",children:["“",e,"”"]})]}),u.jsx("p",{className:"caption mt-2 max-w-xs mx-auto text-ink-subtle",children:"Try another keyword or clear the search to see all languages again."}),u.jsx("button",{type:"button",onClick:()=>t(""),className:"btn-secondary mt-8 w-full max-w-xs justify-center sm:w-auto",children:"Clear search"})]})}),u.jsx(D.div,{className:"section-divide text-center",variants:i,children:u.jsxs("div",{className:"cta-panel cta-panel-accent",children:[u.jsx("h2",{className:"heading-section mb-4 px-2 pt-1",children:"Can't Find Your Language?"}),u.jsx("p",{className:"body-prose mx-auto mb-8 max-w-2xl text-ink-muted",children:"We're constantly adding new programming languages. If you don't see your preferred language, let us know and we'll consider adding it!"}),u.jsx("div",{className:"cta-panel__actions justify-center",children:u.jsx("button",{type:"button",className:"btn-secondary justify-center px-8 py-3.5 text-base sm:min-w-[12rem] sm:text-lg",children:"Request a Language"})})]})})]})})},Fi=[{language:"python",languageName:"Python",lessons:[{id:"python-basics-1",title:"Hello World & Variables",description:"Learn basic Python syntax with print statements and variable assignments",difficulty:"beginner",code:`# Hello World in Python
print("Hello, World!")

# Variables and basic data types
name = "Alice"
age = 25
height = 5.6
is_student = True

# String formatting
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height} feet")
print(f"Is student: {is_student}")`,expectedTime:5,concepts:["print statements","variables","data types","f-strings"]},{id:"python-basics-2",title:"Lists and Loops",description:"Master Python lists and basic loop structures",difficulty:"beginner",code:`# Creating and manipulating lists
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]

# Adding items to lists
fruits.append("grape")
numbers.insert(0, 0)

# For loops
for fruit in fruits:
    print(f"I like {fruit}")

# List comprehensions
squared_numbers = [x**2 for x in numbers]
print(squared_numbers)

# While loops
count = 0
while count < 3:
    print(f"Count: {count}")
    count += 1`,expectedTime:8,concepts:["lists","for loops","while loops","list comprehensions"]},{id:"python-intermediate-1",title:"Functions and Conditionals",description:"Create reusable functions and implement conditional logic",difficulty:"intermediate",code:`def calculate_grade(score):
    """Calculate letter grade based on score"""
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

def process_students(student_scores):
    """Process a list of student scores"""
    results = []
    for name, score in student_scores.items():
        grade = calculate_grade(score)
        results.append(f"{name}: {score} -> {grade}")
    return results

# Example usage
students = {"Alice": 95, "Bob": 78, "Charlie": 82}
grades = process_students(students)
for grade in grades:
    print(grade)`,expectedTime:10,concepts:["functions","conditionals","dictionaries","docstrings"]},{id:"python-intermediate-2",title:"Error Handling and Imports",description:"Handle errors gracefully and work with external modules",difficulty:"intermediate",code:`import math
from datetime import datetime, timedelta

def safe_divide(a, b):
    """Safely divide two numbers with error handling"""
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Cannot divide by zero")
        return None
    except TypeError:
        print("Error: Invalid input types")
        return None

def calculate_circle_area(radius):
    """Calculate circle area with input validation"""
    try:
        if radius < 0:
            raise ValueError("Radius cannot be negative")
        return math.pi * radius ** 2
    except ValueError as e:
        print(f"Value error: {e}")
        return None

# Working with dates
now = datetime.now()
future_date = now + timedelta(days=30)
print(f"Today: {now.strftime('%Y-%m-%d')}")
print(f"30 days from now: {future_date.strftime('%Y-%m-%d')}")`,expectedTime:12,concepts:["try-except","imports","datetime","input validation"]},{id:"python-advanced-1",title:"Classes and Objects",description:"Object-oriented programming with classes and inheritance",difficulty:"advanced",code:`class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
        self.energy = 100
    
    def eat(self, food_amount):
        self.energy += food_amount
        print(f"{self.name} ate and gained {food_amount} energy")
    
    def make_sound(self):
        return "Some generic animal sound"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Canine")
        self.breed = breed
    
    def make_sound(self):
        return "Woof!"
    
    def fetch(self):
        if self.energy >= 20:
            self.energy -= 20
            return f"{self.name} fetched the ball!"
        else:
            return f"{self.name} is too tired to fetch"

# Usage
my_dog = Dog("Buddy", "Golden Retriever")
print(my_dog.make_sound())
print(my_dog.fetch())`,expectedTime:15,concepts:["classes","inheritance","super()","method overriding"]}]},{language:"javascript",languageName:"JavaScript",lessons:[{id:"js-basics-1",title:"Variables and Console",description:"Learn JavaScript basics with variables and console output",difficulty:"beginner",code:`// Variables in JavaScript
let name = "Alice";
const age = 25;
var city = "New York";

// Console output
console.log("Hello, World!");
console.log(\`Name: \${name}\`);
console.log(\`Age: \${age}\`);
console.log(\`City: \${city}\`);

// Data types
let isStudent = true;
let score = 95.5;
let hobbies = ["reading", "coding", "gaming"];

console.log(typeof name);    // string
console.log(typeof age);     // number
console.log(typeof isStudent); // boolean`,expectedTime:6,concepts:["variables","console.log","template literals","data types"]},{id:"js-basics-2",title:"Arrays and Loops",description:"Work with arrays and different loop types",difficulty:"beginner",code:`// Creating arrays
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];

// Array methods
fruits.push("grape");
numbers.unshift(0);

// For loops
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// For...of loop
for (let fruit of fruits) {
    console.log(\`I like \${fruit}\`);
}

// Array methods
let doubled = numbers.map(num => num * 2);
let evens = numbers.filter(num => num % 2 === 0);

console.log("Doubled:", doubled);
console.log("Even numbers:", evens);`,expectedTime:8,concepts:["arrays","for loops","array methods","arrow functions"]},{id:"js-intermediate-1",title:"Functions and Objects",description:"Create functions and work with objects",difficulty:"intermediate",code:`// Function declarations
function greet(name, age) {
    return \`Hello, \${name}! You are \${age} years old.\`;
}

// Arrow functions
const calculateArea = (width, height) => {
    return width * height;
};

// Objects
const person = {
    name: "Alice",
    age: 30,
    city: "San Francisco",
    greet: function() {
        return \`Hi, I'm \${this.name}\`;
    }
};

// Object methods
person.introduce = function() {
    return \`I'm \${this.name}, \${this.age} years old, from \${this.city}\`;
};

// Usage
console.log(greet("Bob", 25));
console.log(calculateArea(10, 5));
console.log(person.greet());
console.log(person.introduce());`,expectedTime:10,concepts:["functions","arrow functions","objects","methods"]},{id:"js-intermediate-2",title:"Async/Await and Promises",description:"Handle asynchronous operations with modern JavaScript",difficulty:"intermediate",code:`// Promise-based function
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "John Doe",
                    email: "john@example.com"
                });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

// Async/await usage
async function getUserInfo(userId) {
    try {
        console.log("Fetching user data...");
        const user = await fetchUserData(userId);
        console.log("User found:", user);
        return user;
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
}

// Multiple async operations
async function processUsers(userIds) {
    const promises = userIds.map(id => fetchUserData(id));
    try {
        const users = await Promise.all(promises);
        console.log("All users:", users);
        return users;
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
}`,expectedTime:12,concepts:["promises","async/await","error handling","Promise.all"]},{id:"js-advanced-1",title:"Classes and Modules",description:"Object-oriented programming and module patterns",difficulty:"advanced",code:`// ES6 Classes
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }
    
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
    
    getInfo() {
        return {
            name: this.name,
            email: this.email,
            memberSince: this.createdAt.getFullYear()
        };
    }
}

class Admin extends User {
    constructor(name, email, permissions) {
        super(name, email);
        this.permissions = permissions;
    }
    
    greet() {
        return \`Hello, I'm \${this.name}, an admin\`;
    }
    
    hasPermission(permission) {
        return this.permissions.includes(permission);
    }
}

// Usage
const admin = new Admin("Alice", "alice@admin.com", ["read", "write", "delete"]);
console.log(admin.greet());
console.log(admin.hasPermission("delete"));`,expectedTime:15,concepts:["classes","inheritance","super()","ES6 modules"]}]},{language:"java",languageName:"Java",lessons:[{id:"java-basics-1",title:"Hello World & Variables",description:"Learn basic Java syntax with print statements and variable declarations",difficulty:"beginner",code:`public class HelloWorld {
    public static void main(String[] args) {
        // Hello World in Java
        System.out.println("Hello, World!");
        
        // Variables and basic data types
        String name = "Alice";
        int age = 25;
        double height = 5.6;
        boolean isStudent = true;
        
        // String formatting
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Height: " + height + " feet");
        System.out.println("Is student: " + isStudent);
    }
}`,expectedTime:8,concepts:["System.out.println","variables","data types","string concatenation"]},{id:"java-basics-2",title:"Arrays and Loops",description:"Master Java arrays and different loop structures",difficulty:"beginner",code:`public class ArraysAndLoops {
    public static void main(String[] args) {
        // Creating arrays
        String[] fruits = {"apple", "banana", "orange"};
        int[] numbers = {1, 2, 3, 4, 5};
        
        // For loops
        for (int i = 0; i < fruits.length; i++) {
            System.out.println(fruits[i]);
        }
        
        // Enhanced for loop
        for (String fruit : fruits) {
            System.out.println("I like " + fruit);
        }
        
        // While loop
        int count = 0;
        while (count < 3) {
            System.out.println("Count: " + count);
            count++;
        }
        
        // Array manipulation
        int[] doubled = new int[numbers.length];
        for (int i = 0; i < numbers.length; i++) {
            doubled[i] = numbers[i] * 2;
        }
        
        System.out.println("Doubled numbers:");
        for (int num : doubled) {
            System.out.print(num + " ");
        }
    }
}`,expectedTime:10,concepts:["arrays","for loops","enhanced for loops","while loops"]},{id:"java-intermediate-1",title:"Methods and Classes",description:"Create methods and basic class structures",difficulty:"intermediate",code:`public class Calculator {
    // Instance variables
    private double result;
    
    // Constructor
    public Calculator() {
        this.result = 0.0;
    }
    
    // Methods
    public double add(double a, double b) {
        result = a + b;
        return result;
    }
    
    public double subtract(double a, double b) {
        result = a - b;
        return result;
    }
    
    public double multiply(double a, double b) {
        result = a * b;
        return result;
    }
    
    public double divide(double a, double b) {
        if (b != 0) {
            result = a / b;
            return result;
        } else {
            System.out.println("Error: Division by zero!");
            return 0;
        }
    }
    
    public double getResult() {
        return result;
    }
    
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        
        System.out.println("Addition: " + calc.add(10, 5));
        System.out.println("Subtraction: " + calc.subtract(10, 5));
        System.out.println("Multiplication: " + calc.multiply(10, 5));
        System.out.println("Division: " + calc.divide(10, 5));
    }
}`,expectedTime:12,concepts:["methods","classes","constructors","instance variables"]},{id:"java-intermediate-2",title:"Exception Handling",description:"Handle errors gracefully with try-catch blocks",difficulty:"intermediate",code:`import java.util.Scanner;
import java.util.InputMismatchException;

public class ExceptionHandling {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter a number: ");
            int number = scanner.nextInt();
            
            System.out.print("Enter divisor: ");
            int divisor = scanner.nextInt();
            
            double result = safeDivide(number, divisor);
            System.out.println("Result: " + result);
            
        } catch (InputMismatchException e) {
            System.out.println("Error: Please enter a valid number!");
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
        } finally {
            scanner.close();
            System.out.println("Scanner closed successfully.");
        }
    }
    
    public static double safeDivide(int a, int b) throws ArithmeticException {
        if (b == 0) {
            throw new ArithmeticException("Cannot divide by zero!");
        }
        return (double) a / b;
    }
}`,expectedTime:10,concepts:["try-catch","exception handling","Scanner","finally block"]},{id:"java-advanced-1",title:"Inheritance and Polymorphism",description:"Object-oriented programming with inheritance and method overriding",difficulty:"advanced",code:`// Base class
class Animal {
    protected String name;
    protected int age;
    
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void makeSound() {
        System.out.println("Some generic animal sound");
    }
    
    public void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

// Derived class
class Dog extends Animal {
    private String breed;
    
    public Dog(String name, int age, String breed) {
        super(name, age); // Call parent constructor
        this.breed = breed;
    }
    
    @Override
    public void makeSound() {
        System.out.println("Woof! Woof!");
    }
    
    public void fetch() {
        System.out.println(name + " is fetching the ball!");
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo(); // Call parent method
        System.out.println("Breed: " + breed);
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Animal animal = new Animal("Generic", 5);
        Dog dog = new Dog("Buddy", 3, "Golden Retriever");
        
        // Polymorphism
        Animal[] animals = {animal, dog};
        
        for (Animal a : animals) {
            a.makeSound(); // Calls appropriate method based on actual type
            a.displayInfo();
            System.out.println("---");
        }
        
        // Dog-specific method
        dog.fetch();
    }
}`,expectedTime:15,concepts:["inheritance","polymorphism","super()","method overriding"]}]},{language:"cpp",languageName:"C++",lessons:[{id:"cpp-basics-1",title:"Hello World & Variables",description:"Learn basic C++ syntax with cout and variable declarations",difficulty:"beginner",code:`#include <iostream>
using namespace std;

int main() {
    // Hello World in C++
    cout << "Hello, World!" << endl;
    
    // Variables and basic data types
    string name = "Alice";
    int age = 25;
    double height = 5.6;
    bool isStudent = true;
    
    // Output with cout
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "Height: " << height << " feet" << endl;
    cout << "Is student: " << (isStudent ? "true" : "false") << endl;
    
    return 0;
}`,expectedTime:8,concepts:["#include","cout","variables","data types","endl"]},{id:"cpp-basics-2",title:"Arrays and Loops",description:"Master C++ arrays and different loop structures",difficulty:"beginner",code:`#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Traditional arrays
    string fruits[] = {"apple", "banana", "orange"};
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    // For loops with traditional arrays
    for (int i = 0; i < 3; i++) {
        cout << fruits[i] << endl;
    }
    
    // Range-based for loop (C++11)
    for (const string& fruit : fruits) {
        cout << "I like " << fruit << endl;
    }
    
    // While loop
    int count = 0;
    while (count < 3) {
        cout << "Count: " << count << endl;
        count++;
    }
    
    // Vector (dynamic array)
    vector<int> doubled;
    for (int i = 0; i < size; i++) {
        doubled.push_back(numbers[i] * 2);
    }
    
    cout << "Doubled numbers: ";
    for (int num : doubled) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`,expectedTime:10,concepts:["arrays","vectors","for loops","range-based loops","while loops"]},{id:"cpp-intermediate-1",title:"Functions and Classes",description:"Create functions and basic class structures",difficulty:"intermediate",code:`#include <iostream>
#include <string>
using namespace std;

class Calculator {
private:
    double result;
    
public:
    // Constructor
    Calculator() : result(0.0) {}
    
    // Methods
    double add(double a, double b) {
        result = a + b;
        return result;
    }
    
    double subtract(double a, double b) {
        result = a - b;
        return result;
    }
    
    double multiply(double a, double b) {
        result = a * b;
        return result;
    }
    
    double divide(double a, double b) {
        if (b != 0) {
            result = a / b;
            return result;
        } else {
            cout << "Error: Division by zero!" << endl;
            return 0;
        }
    }
    
    double getResult() const {
        return result;
    }
};

// Function outside class
void displayResult(const string& operation, double value) {
    cout << operation << ": " << value << endl;
}

int main() {
    Calculator calc;
    
    displayResult("Addition", calc.add(10, 5));
    displayResult("Subtraction", calc.subtract(10, 5));
    displayResult("Multiplication", calc.multiply(10, 5));
    displayResult("Division", calc.divide(10, 5));
    
    return 0;
}`,expectedTime:12,concepts:["classes","constructors","methods","const","function parameters"]},{id:"cpp-intermediate-2",title:"Pointers and References",description:"Work with pointers, references, and memory management",difficulty:"intermediate",code:`#include <iostream>
#include <memory>
using namespace std;

void demonstratePointers() {
    int value = 42;
    int* ptr = &value;  // Pointer to value
    
    cout << "Value: " << value << endl;
    cout << "Address: " << &value << endl;
    cout << "Pointer value: " << ptr << endl;
    cout << "Dereferenced: " << *ptr << endl;
    
    // Modify through pointer
    *ptr = 100;
    cout << "New value: " << value << endl;
}

void demonstrateReferences() {
    int original = 50;
    int& ref = original;  // Reference to original
    
    cout << "Original: " << original << endl;
    cout << "Reference: " << ref << endl;
    
    // Modify through reference
    ref = 200;
    cout << "Modified original: " << original << endl;
}

void demonstrateSmartPointers() {
    // Smart pointer (C++11)
    unique_ptr<int> smartPtr = make_unique<int>(300);
    
    cout << "Smart pointer value: " << *smartPtr << endl;
    // Automatically deallocated when out of scope
}

int main() {
    cout << "=== Pointers ===" << endl;
    demonstratePointers();
    
    cout << "
=== References ===" << endl;
    demonstrateReferences();
    
    cout << "
=== Smart Pointers ===" << endl;
    demonstrateSmartPointers();
    
    return 0;
}`,expectedTime:12,concepts:["pointers","references","smart pointers","memory management"]},{id:"cpp-advanced-1",title:"Templates and STL",description:"Generic programming with templates and Standard Template Library",difficulty:"advanced",code:`#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

// Function template
template<typename T>
T getMax(T a, T b) {
    return (a > b) ? a : b;
}

// Class template
template<typename T>
class Stack {
private:
    vector<T> elements;
    
public:
    void push(const T& element) {
        elements.push_back(element);
    }
    
    T pop() {
        if (elements.empty()) {
            throw runtime_error("Stack is empty!");
        }
        T element = elements.back();
        elements.pop_back();
        return element;
    }
    
    bool empty() const {
        return elements.empty();
    }
    
    size_t size() const {
        return elements.size();
    }
};

int main() {
    // Using function template
    cout << "Max of 10 and 20: " << getMax(10, 20) << endl;
    cout << "Max of 3.14 and 2.71: " << getMax(3.14, 2.71) << endl;
    cout << "Max of 'a' and 'z': " << getMax('a', 'z') << endl;
    
    // Using class template
    Stack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    intStack.push(30);
    
    cout << "Stack size: " << intStack.size() << endl;
    
    while (!intStack.empty()) {
        cout << "Popped: " << intStack.pop() << endl;
    }
    
    // STL algorithms
    vector<int> numbers = {5, 2, 8, 1, 9, 3};
    sort(numbers.begin(), numbers.end());
    
    cout << "Sorted numbers: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`,expectedTime:15,concepts:["templates","STL","generic programming","algorithms"]}]},{language:"html-css",languageName:"HTML/CSS",lessons:[{id:"html-css-basics-1",title:"Basic HTML Structure",description:"Learn fundamental HTML elements and document structure",difficulty:"beginner",code:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Home Section</h2>
            <p>This is the main content of my website.</p>
            <p>HTML provides the <strong>structure</strong> for web pages.</p>
        </section>
        
        <section id="about">
            <h2>About Section</h2>
            <p>Here's some information about me:</p>
            <ul>
                <li>Web Developer</li>
                <li>HTML Enthusiast</li>
                <li>CSS Lover</li>
            </ul>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
</body>
</html>`,expectedTime:8,concepts:["DOCTYPE","html structure","head","body","semantic elements"]},{id:"html-css-basics-2",title:"CSS Styling Basics",description:"Style HTML elements with CSS properties and selectors",difficulty:"beginner",code:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Basics</title>
    <style>
        /* Element selectors */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        
        h1 {
            color: #333;
            text-align: center;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }
        
        /* Class selectors */
        .highlight {
            background-color: yellow;
            padding: 2px 4px;
        }
        
        .card {
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        /* ID selectors */
        #special-text {
            color: #007bff;
            font-weight: bold;
            font-size: 1.2em;
        }
        
        /* Pseudo-classes */
        a:hover {
            color: #0056b3;
            text-decoration: underline;
        }
        
        /* Multiple selectors */
        h2, h3 {
            color: #555;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <h1>CSS Styling Examples</h1>
    
    <div class="card">
        <h2>Basic Styling</h2>
        <p>This paragraph has <span class="highlight">highlighted text</span> and demonstrates various CSS properties.</p>
        <p id="special-text">This text has special styling applied via ID selector.</p>
    </div>
    
    <div class="card">
        <h3>Links and Interactions</h3>
        <p>Hover over this <a href="#">link</a> to see the hover effect.</p>
    </div>
</body>
</html>`,expectedTime:10,concepts:["CSS selectors","properties","classes","IDs","pseudo-classes"]},{id:"html-css-intermediate-1",title:"Flexbox Layout",description:"Create flexible layouts using CSS Flexbox",difficulty:"intermediate",code:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flexbox Layout</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        .container {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
        }
        
        .header {
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .main-content {
            display: flex;
            flex: 1;
        }
        
        .sidebar {
            background-color: #34495e;
            color: white;
            padding: 20px;
            width: 250px;
            flex-shrink: 0;
        }
        
        .content {
            flex: 1;
            padding: 20px;
            background-color: #ecf0f1;
        }
        
        .card-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 20px;
        }
        
        .card {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            flex: 1;
            min-width: 200px;
        }
        
        .footer {
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .nav-list {
            list-style: none;
        }
        
        .nav-list li {
            margin: 10px 0;
        }
        
        .nav-list a {
            color: white;
            text-decoration: none;
            padding: 8px 12px;
            display: block;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        
        .nav-list a:hover {
            background-color: #3498db;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>Flexbox Layout Example</h1>
        </header>
        
        <div class="main-content">
            <aside class="sidebar">
                <h3>Navigation</h3>
                <ul class="nav-list">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </aside>
            
            <main class="content">
                <h2>Main Content Area</h2>
                <p>This layout uses CSS Flexbox to create a responsive design.</p>
                
                <div class="card-grid">
                    <div class="card">
                        <h3>Card 1</h3>
                        <p>This card demonstrates flexbox properties and responsive design.</p>
                    </div>
                    <div class="card">
                        <h3>Card 2</h3>
                        <p>Cards automatically adjust their width based on available space.</p>
                    </div>
                    <div class="card">
                        <h3>Card 3</h3>
                        <p>Flexbox makes it easy to create flexible layouts.</p>
                    </div>
                </div>
            </main>
        </div>
        
        <footer class="footer">
            <p>&copy; 2024 Flexbox Layout Example</p>
        </footer>
    </div>
</body>
</html>`,expectedTime:12,concepts:["flexbox","flex-direction","flex-wrap","responsive design","layout"]},{id:"html-css-intermediate-2",title:"CSS Grid Layout",description:"Create complex layouts using CSS Grid",difficulty:"intermediate",code:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid Layout</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        .grid-container {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            grid-template-rows: auto 1fr auto;
            grid-template-areas: 
                "header header header"
                "sidebar main aside"
                "footer footer footer";
            min-height: 100vh;
            gap: 20px;
            padding: 20px;
            background-color: #f8f9fa;
        }
        
        .header {
            grid-area: header;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        
        .sidebar {
            grid-area: sidebar;
            background-color: #343a40;
            color: white;
            padding: 20px;
            border-radius: 10px;
        }
        
        .main {
            grid-area: main;
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .aside {
            grid-area: aside;
            background-color: #e9ecef;
            padding: 20px;
            border-radius: 10px;
        }
        
        .footer {
            grid-area: footer;
            background-color: #6c757d;
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        
        .nested-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        
        .nested-item {
            background-color: #007bff;
            color: white;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
        }
        
        .nav-list {
            list-style: none;
        }
        
        .nav-list li {
            margin: 10px 0;
        }
        
        .nav-list a {
            color: white;
            text-decoration: none;
            padding: 8px 12px;
            display: block;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        
        .nav-list a:hover {
            background-color: #495057;
        }
        
        @media (max-width: 768px) {
            .grid-container {
                grid-template-columns: 1fr;
                grid-template-areas: 
                    "header"
                    "main"
                    "sidebar"
                    "aside"
                    "footer";
            }
        }
    </style>
</head>
<body>
    <div class="grid-container">
        <header class="header">
            <h1>CSS Grid Layout</h1>
            <p>Modern web layout with CSS Grid</p>
        </header>
        
        <aside class="sidebar">
            <h3>Navigation</h3>
            <ul class="nav-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </aside>
        
        <main class="main">
            <h2>Main Content</h2>
            <p>This is the main content area using CSS Grid layout. The grid system provides powerful control over positioning and sizing of elements.</p>
            
            <div class="nested-grid">
                <div class="nested-item">Item 1</div>
                <div class="nested-item">Item 2</div>
                <div class="nested-item">Item 3</div>
                <div class="nested-item">Item 4</div>
                <div class="nested-item">Item 5</div>
                <div class="nested-item">Item 6</div>
            </div>
        </main>
        
        <aside class="aside">
            <h3>Sidebar</h3>
            <p>Additional content and widgets can be placed here.</p>
            <ul>
                <li>Recent Posts</li>
                <li>Categories</li>
                <li>Tags</li>
                <li>Archives</li>
            </ul>
        </aside>
        
        <footer class="footer">
            <p>&copy; 2024 CSS Grid Layout Example. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>`,expectedTime:12,concepts:["CSS Grid","grid-template-areas","responsive design","nested grids"]},{id:"html-css-advanced-1",title:"CSS Animations and Transitions",description:"Create engaging animations and smooth transitions",difficulty:"advanced",code:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Animations</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            text-align: center;
            color: white;
        }
        
        .animated-title {
            font-size: 3rem;
            margin-bottom: 2rem;
            animation: fadeInUp 1s ease-out;
        }
        
        .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 2rem;
            margin: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            animation: slideIn 0.8s ease-out;
        }
        
        .card:hover {
            transform: translateY(-10px) scale(1.05);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .button {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .button:active {
            transform: translateY(0);
        }
        
        .button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }
        
        .button:hover::before {
            left: 100%;
        }
        
        .spinning-icon {
            display: inline-block;
            font-size: 2rem;
            animation: spin 2s linear infinite;
            margin: 1rem;
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        .bounce {
            animation: bounce 1s infinite;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
        
        .progress-bar {
            width: 100%;
            height: 20px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            overflow: hidden;
            margin: 1rem 0;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4ecdc4, #44a08d);
            border-radius: 10px;
            animation: progress 3s ease-in-out infinite;
        }
        
        @keyframes progress {
            0% {
                width: 0%;
            }
            50% {
                width: 100%;
            }
            100% {
                width: 0%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="animated-title">CSS Animations</h1>
        
        <div class="card">
            <h2>Interactive Elements</h2>
            <p>Hover over the button to see the animation effects!</p>
            <button class="button">Animated Button</button>
        </div>
        
        <div class="card">
            <h2>Icon Animations</h2>
            <div class="spinning-icon">⚡</div>
            <div class="pulse">💫</div>
            <div class="bounce">🎯</div>
        </div>
        
        <div class="card">
            <h2>Progress Animation</h2>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
    </div>
</body>
</html>`,expectedTime:15,concepts:["CSS animations","transitions","keyframes","transforms","hover effects"]}]},{language:"sql",languageName:"SQL",lessons:[{id:"sql-basics-1",title:"Basic Queries and Tables",description:"Learn fundamental SQL syntax with SELECT statements and table creation",difficulty:"beginner",code:`-- Create a sample database table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department VARCHAR(50),
    salary DECIMAL(10, 2),
    hire_date DATE
);

-- Insert sample data
INSERT INTO employees (first_name, last_name, email, department, salary, hire_date) VALUES
('John', 'Doe', 'john.doe@company.com', 'Engineering', 75000.00, '2023-01-15'),
('Jane', 'Smith', 'jane.smith@company.com', 'Marketing', 65000.00, '2023-02-20'),
('Bob', 'Johnson', 'bob.johnson@company.com', 'Engineering', 80000.00, '2022-11-10'),
('Alice', 'Brown', 'alice.brown@company.com', 'HR', 60000.00, '2023-03-05'),
('Charlie', 'Wilson', 'charlie.wilson@company.com', 'Engineering', 70000.00, '2023-01-30');

-- Basic SELECT queries
SELECT * FROM employees;

SELECT first_name, last_name, department 
FROM employees;

SELECT first_name, last_name, salary 
FROM employees 
WHERE salary > 70000;

SELECT department, COUNT(*) as employee_count
FROM employees 
GROUP BY department;`,expectedTime:10,concepts:["CREATE TABLE","INSERT","SELECT","WHERE","GROUP BY"]},{id:"sql-basics-2",title:"Joins and Relationships",description:"Master table relationships and JOIN operations",difficulty:"beginner",code:`-- Create related tables
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    manager_id INT,
    budget DECIMAL(12, 2)
);

CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    department_id INT,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10, 2),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Insert sample data
INSERT INTO departments (name, manager_id, budget) VALUES
('Engineering', 1, 500000.00),
('Marketing', 2, 200000.00),
('HR', 4, 100000.00);

INSERT INTO projects (name, department_id, start_date, end_date, budget) VALUES
('Website Redesign', 1, '2023-01-01', '2023-06-30', 50000.00),
('Mobile App', 1, '2023-02-01', '2023-08-31', 75000.00),
('Brand Campaign', 2, '2023-03-01', '2023-05-31', 30000.00),
('Employee Training', 3, '2023-04-01', '2023-07-31', 15000.00);

-- INNER JOIN
SELECT e.first_name, e.last_name, d.name as department_name
FROM employees e
INNER JOIN departments d ON e.department = d.name;

-- LEFT JOIN
SELECT d.name as department_name, p.name as project_name
FROM departments d
LEFT JOIN projects p ON d.id = p.department_id;

-- Multiple table JOIN
SELECT e.first_name, e.last_name, d.name as department, p.name as project
FROM employees e
INNER JOIN departments d ON e.department = d.name
LEFT JOIN projects p ON d.id = p.department_id;`,expectedTime:12,concepts:["FOREIGN KEY","INNER JOIN","LEFT JOIN","table relationships"]},{id:"sql-intermediate-1",title:"Aggregate Functions and Subqueries",description:"Use aggregate functions and nested queries for complex data analysis",difficulty:"intermediate",code:`-- Aggregate functions
SELECT 
    department,
    COUNT(*) as employee_count,
    AVG(salary) as average_salary,
    MAX(salary) as highest_salary,
    MIN(salary) as lowest_salary,
    SUM(salary) as total_salary
FROM employees 
GROUP BY department
HAVING COUNT(*) > 1;

-- Subqueries
SELECT first_name, last_name, salary
FROM employees 
WHERE salary > (
    SELECT AVG(salary) 
    FROM employees
);

-- EXISTS subquery
SELECT d.name as department_name
FROM departments d
WHERE EXISTS (
    SELECT 1 
    FROM projects p 
    WHERE p.department_id = d.id
);

-- IN subquery
SELECT first_name, last_name
FROM employees
WHERE department IN (
    SELECT name 
    FROM departments 
    WHERE budget > 150000
);

-- Correlated subquery
SELECT e.first_name, e.last_name, e.salary
FROM employees e
WHERE e.salary = (
    SELECT MAX(salary)
    FROM employees e2
    WHERE e2.department = e.department
);`,expectedTime:12,concepts:["aggregate functions","subqueries","EXISTS","HAVING","correlated subqueries"]},{id:"sql-intermediate-2",title:"Data Modification and Transactions",description:"Update, delete data and manage database transactions",difficulty:"intermediate",code:`-- UPDATE statements
UPDATE employees 
SET salary = salary * 1.1 
WHERE department = 'Engineering';

UPDATE employees 
SET email = CONCAT(LOWER(first_name), '.', LOWER(last_name), '@company.com')
WHERE email IS NULL;

-- DELETE statements
DELETE FROM projects 
WHERE end_date < '2023-01-01';

-- Transactions
START TRANSACTION;

INSERT INTO employees (first_name, last_name, email, department, salary, hire_date) 
VALUES ('New', 'Employee', 'new.employee@company.com', 'Engineering', 65000.00, '2023-12-01');

UPDATE departments 
SET budget = budget - 65000 
WHERE name = 'Engineering';

-- Rollback if needed (uncomment to test)
-- ROLLBACK;

-- Commit the transaction
COMMIT;

-- Conditional updates with CASE
UPDATE employees 
SET salary = CASE 
    WHEN department = 'Engineering' THEN salary * 1.15
    WHEN department = 'Marketing' THEN salary * 1.10
    ELSE salary * 1.05
END;

-- Safe DELETE with JOIN
DELETE e FROM employees e
LEFT JOIN projects p ON e.department = (
    SELECT name FROM departments WHERE id = p.department_id
)
WHERE p.id IS NULL AND e.hire_date < '2022-01-01';`,expectedTime:10,concepts:["UPDATE","DELETE","transactions","COMMIT","ROLLBACK","CASE statements"]},{id:"sql-advanced-1",title:"Advanced Queries and Window Functions",description:"Complex queries with window functions and advanced SQL features",difficulty:"advanced",code:`-- Window functions
SELECT 
    first_name,
    last_name,
    department,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank,
    RANK() OVER (ORDER BY salary DESC) as overall_rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) as dense_rank,
    LAG(salary, 1) OVER (PARTITION BY department ORDER BY salary) as prev_salary,
    LEAD(salary, 1) OVER (PARTITION BY department ORDER BY salary) as next_salary,
    AVG(salary) OVER (PARTITION BY department) as dept_avg_salary
FROM employees;

-- Common Table Expressions (CTEs)
WITH department_stats AS (
    SELECT 
        department,
        COUNT(*) as emp_count,
        AVG(salary) as avg_salary
    FROM employees
    GROUP BY department
),
high_performers AS (
    SELECT e.*, ds.avg_salary
    FROM employees e
    JOIN department_stats ds ON e.department = ds.department
    WHERE e.salary > ds.avg_salary * 1.2
)
SELECT 
    hp.first_name,
    hp.last_name,
    hp.department,
    hp.salary,
    hp.avg_salary,
    ROUND((hp.salary - hp.avg_salary) / hp.avg_salary * 100, 2) as salary_premium_pct
FROM high_performers hp;

-- Recursive CTE
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: employees with no manager
    SELECT id, first_name, last_name, 0 as level
    FROM employees 
    WHERE id IN (SELECT manager_id FROM departments WHERE manager_id IS NOT NULL)
    
    UNION ALL
    
    -- Recursive case: employees reporting to managers
    SELECT e.id, e.first_name, e.last_name, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.id = eh.id
    WHERE eh.level < 3
)
SELECT * FROM employee_hierarchy ORDER BY level, last_name;`,expectedTime:15,concepts:["window functions","CTEs","recursive queries","ROW_NUMBER","RANK","LAG/LEAD"]}]},{language:"bash",languageName:"Bash",lessons:[{id:"bash-basics-1",title:"Basic Commands and Variables",description:"Learn fundamental bash commands and variable usage",difficulty:"beginner",code:`#!/bin/bash

# Basic commands and variables
echo "Hello, World!"

# Variables
name="Alice"
age=25
city="New York"

echo "Name: $name"
echo "Age: $age"
echo "City: $city"

# Command substitution
current_date=$(date)
echo "Current date: $current_date"

# Environment variables
echo "User: $USER"
echo "Home directory: $HOME"
echo "Current directory: $PWD"

# Basic file operations
echo "Creating a test file..."
echo "This is a test file" > test.txt
echo "File created successfully"

# List files
echo "Files in current directory:"
ls -la

# Remove test file
rm test.txt
echo "Test file removed"`,expectedTime:8,concepts:["echo","variables","command substitution","environment variables","file operations"]},{id:"bash-basics-2",title:"Loops and Conditionals",description:"Master bash loops and conditional statements",difficulty:"beginner",code:`#!/bin/bash

# For loops
echo "=== For Loop Examples ==="
for i in {1..5}; do
    echo "Number: $i"
done

# For loop with array
fruits=("apple" "banana" "orange" "grape")
echo "Fruits:"
for fruit in "\${fruits[@]}"; do
    echo "  - $fruit"
done

# While loop
echo "=== While Loop Example ==="
count=1
while [ $count -le 3 ]; do
    echo "Count: $count"
    count=$((count + 1))
done

# If-else statements
echo "=== Conditional Examples ==="
number=10

if [ $number -gt 5 ]; then
    echo "$number is greater than 5"
elif [ $number -eq 5 ]; then
    echo "$number equals 5"
else
    echo "$number is less than 5"
fi

# String comparison
name="Alice"
if [ "$name" = "Alice" ]; then
    echo "Hello, Alice!"
else
    echo "Hello, stranger!"
fi

# File existence check
if [ -f "test.txt" ]; then
    echo "test.txt exists"
else
    echo "test.txt does not exist"
fi`,expectedTime:10,concepts:["for loops","while loops","if-else","comparisons","arrays"]},{id:"bash-intermediate-1",title:"Functions and Parameters",description:"Create reusable functions and handle command-line parameters",difficulty:"intermediate",code:`#!/bin/bash

# Function definition
greet() {
    local name=$1
    local time_of_day=$2
    echo "Good $time_of_day, $name!"
}

# Function with return value
calculate_sum() {
    local num1=$1
    local num2=$2
    local sum=$((num1 + num2))
    echo $sum
}

# Function with multiple parameters
create_user_info() {
    local username=$1
    local email=$2
    local department=$3
    
    echo "=== User Information ==="
    echo "Username: $username"
    echo "Email: $email"
    echo "Department: $department"
    echo "Created: $(date)"
}

# Function that checks if a number is even
is_even() {
    local num=$1
    if [ $((num % 2)) -eq 0 ]; then
        return 0  # true
    else
        return 1  # false
    fi
}

# Main script
echo "=== Function Examples ==="

# Call functions
greet "Alice" "morning"
greet "Bob" "evening"

# Use function return value
result=$(calculate_sum 15 25)
echo "Sum of 15 and 25: $result"

# Create user info
create_user_info "john_doe" "john@company.com" "Engineering"

# Check if number is even
number=8
if is_even $number; then
    echo "$number is even"
else
    echo "$number is odd"
fi

# Command line parameters
echo "=== Command Line Parameters ==="
echo "Script name: $0"
echo "Number of arguments: $#"
echo "All arguments: $@"

if [ $# -gt 0 ]; then
    echo "First argument: $1"
    echo "Second argument: $2"
fi`,expectedTime:12,concepts:["functions","parameters","return values","local variables","command line args"]},{id:"bash-intermediate-2",title:"File Operations and Text Processing",description:"Advanced file operations and text manipulation",difficulty:"intermediate",code:`#!/bin/bash

# Create sample files for demonstration
echo "Creating sample files..."
echo -e "apple\\nbanana\\norange\\ngrape\\nkiwi" > fruits.txt
echo -e "John,25,Engineer\\nJane,30,Designer\\nBob,28,Manager" > employees.csv

# File reading and processing
echo "=== File Operations ==="

# Read file line by line
echo "Fruits from file:"
while IFS= read -r line; do
    echo "  - $line"
done < fruits.txt

# Count lines in file
line_count=$(wc -l < fruits.txt)
echo "Number of fruits: $line_count"

# Search and replace in file
echo "=== Text Processing ==="
echo "Original fruits:"
cat fruits.txt

# Add prefix to each line
sed 's/^/Fruit: /' fruits.txt > fruits_with_prefix.txt
echo "Fruits with prefix:"
cat fruits_with_prefix.txt

# Extract specific columns from CSV
echo "=== CSV Processing ==="
echo "Employee names:"
cut -d',' -f1 employees.csv

echo "Employee ages:"
cut -d',' -f2 employees.csv

# Filter lines containing specific text
echo "Fruits containing 'a':"
grep 'a' fruits.txt

# Sort and unique
echo "Sorted unique fruits:"
sort fruits.txt | uniq

# File permissions and ownership
echo "=== File Management ==="
echo "Setting file permissions..."
chmod 644 fruits.txt
chmod 755 employees.csv

echo "File permissions:"
ls -l fruits.txt employees.csv

# Create directory and move files
mkdir -p backup
cp fruits.txt backup/
cp employees.csv backup/
echo "Files backed up to backup/ directory"

# Cleanup
rm fruits.txt employees.csv fruits_with_prefix.txt
rm -rf backup
echo "Cleanup completed"`,expectedTime:12,concepts:["file reading","text processing","sed","grep","cut","file permissions"]},{id:"bash-advanced-1",title:"Advanced Scripting and Error Handling",description:"Advanced bash features including error handling and process management",difficulty:"advanced",code:`#!/bin/bash

# Error handling
set -e  # Exit on any error
set -u  # Exit on undefined variables
set -o pipefail  # Exit on pipe failures

# Custom error handling function
handle_error() {
    echo "Error occurred in line $1"
    echo "Error code: $2"
    exit 1
}

# Set error trap
trap 'handle_error $LINENO $?' ERR

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a script.log
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to backup files with error handling
backup_files() {
    local source_dir=$1
    local backup_dir=$2
    
    if [ ! -d "$source_dir" ]; then
        log "ERROR: Source directory $source_dir does not exist"
        return 1
    fi
    
    # Create backup directory if it doesn't exist
    mkdir -p "$backup_dir"
    
    # Create timestamped backup
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="$backup_dir/backup_$timestamp"
    
    log "Starting backup from $source_dir to $backup_path"
    
    if cp -r "$source_dir" "$backup_path"; then
        log "Backup completed successfully: $backup_path"
        return 0
    else
        log "ERROR: Backup failed"
        return 1
    fi
}

# Function to monitor system resources
monitor_system() {
    log "=== System Monitoring ==="
    
    # Check disk usage
    log "Disk usage:"
    df -h | grep -E '^/dev/' | while read line; do
        log "  $line"
    done
    
    # Check memory usage
    log "Memory usage:"
    free -h | while read line; do
        log "  $line"
    done
    
    # Check running processes
    log "Top 5 processes by CPU usage:"
    ps aux --sort=-%cpu | head -6 | while read line; do
        log "  $line"
    done
}

# Function to send email notification (simulated)
send_notification() {
    local message=$1
    local recipient=\${2:-"admin@company.com"}
    
    log "Sending notification to $recipient: $message"
    # In real scenario, you would use mail command or curl to send email
    echo "Email notification: $message" >> notifications.log
}

# Main execution
main() {
    log "Script started"
    
    # Check required commands
    if ! command_exists "ps"; then
        log "ERROR: ps command not found"
        exit 1
    fi
    
    # Monitor system
    monitor_system
    
    # Create test directory and files
    test_dir="/tmp/bash_test_$$"
    mkdir -p "$test_dir"
    echo "Test file 1" > "$test_dir/file1.txt"
    echo "Test file 2" > "$test_dir/file2.txt"
    
    # Backup test directory
    if backup_files "$test_dir" "/tmp/backups"; then
        send_notification "Backup completed successfully"
    else
        send_notification "Backup failed" "admin@company.com"
    fi
    
    # Cleanup
    rm -rf "$test_dir"
    log "Script completed successfully"
}

# Run main function
main "$@"`,expectedTime:15,concepts:["error handling","logging","process monitoring","system commands","traps"]}]},{language:"typescript",languageName:"TypeScript",lessons:[{id:"typescript-basics-1",title:"Types and Interfaces",description:"Learn TypeScript type system and interface definitions",difficulty:"beginner",code:`// Basic types
let name: string = "Alice";
let age: number = 25;
let isStudent: boolean = true;
let hobbies: string[] = ["reading", "coding", "gaming"];

// Interface definition
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  isActive: boolean;
}

// Using the interface
const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  isActive: true
};

// Function with typed parameters
function greetUser(user: User): string {
  return \`Hello, \${user.name}! You are \${user.age || 'unknown'} years old.\`;
}

// Union types
type Status = "pending" | "approved" | "rejected";
let currentStatus: Status = "pending";

// Generic types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userResponse: ApiResponse<User> = {
  data: user,
  status: 200,
  message: "Success"
};

console.log(greetUser(user));
console.log("Current status:", currentStatus);`,expectedTime:10,concepts:["types","interfaces","optional properties","union types","generics"]},{id:"typescript-basics-2",title:"Classes and Inheritance",description:"Object-oriented programming with TypeScript classes",difficulty:"beginner",code:`// Base class
class Animal {
  protected name: string;
  protected age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  public makeSound(): string {
    return "Some generic animal sound";
  }
  
  public getInfo(): string {
    return \`\${this.name} is \${this.age} years old\`;
  }
}

// Derived class
class Dog extends Animal {
  private breed: string;
  
  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }
  
  public makeSound(): string {
    return "Woof! Woof!";
  }
  
  public fetch(): string {
    return \`\${this.name} is fetching the ball!\`;
  }
  
  public getBreed(): string {
    return this.breed;
  }
}

// Abstract class
abstract class Shape {
  protected color: string;
  
  constructor(color: string) {
    this.color = color;
  }
  
  abstract getArea(): number;
  abstract getPerimeter(): number;
  
  public getColor(): string {
    return this.color;
  }
}

// Concrete class implementing abstract class
class Rectangle extends Shape {
  private width: number;
  private height: number;
  
  constructor(color: string, width: number, height: number) {
    super(color);
    this.width = width;
    this.height = height;
  }
  
  public getArea(): number {
    return this.width * this.height;
  }
  
  public getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// Usage
const dog = new Dog("Buddy", 3, "Golden Retriever");
console.log(dog.makeSound());
console.log(dog.fetch());
console.log(dog.getInfo());

const rectangle = new Rectangle("blue", 10, 5);
console.log(\`Rectangle area: \${rectangle.getArea()}\`);
console.log(\`Rectangle perimeter: \${rectangle.getPerimeter()}\`);`,expectedTime:12,concepts:["classes","inheritance","abstract classes","access modifiers","super()"]},{id:"typescript-intermediate-1",title:"Advanced Types and Utility Types",description:"Master advanced TypeScript type features and utility types",difficulty:"intermediate",code:`// Utility types
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
}

// Partial - makes all properties optional
type PartialUser = Partial<User>;

// Required - makes all properties required
type RequiredUser = Required<PartialUser>;

// Pick - select specific properties
type UserBasicInfo = Pick<User, 'id' | 'name' | 'email'>;

// Omit - exclude specific properties
type UserWithoutDates = Omit<User, 'createdAt'>;

// Record - create object type with specific keys and values
type UserRoles = Record<string, string[]>;

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

// Mapped types
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// Template literal types
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ClickEvent = EventName<'click'>; // "onClick"

// Function overloads
function processValue(value: string): string;
function processValue(value: number): number;
function processValue(value: boolean): boolean;
function processValue(value: string | number | boolean): string | number | boolean {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else if (typeof value === 'number') {
    return value * 2;
  } else {
    return !value;
  }
}

// Generic constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Usage examples
const partialUser: PartialUser = { name: "Alice" };
const userBasicInfo: UserBasicInfo = {
  id: 1,
  name: "John",
  email: "john@example.com"
};

const userRoles: UserRoles = {
  admin: ['read', 'write', 'delete'],
  user: ['read']
};

console.log(processValue("hello")); // "HELLO"
console.log(processValue(5)); // 10
console.log(processValue(true)); // false

logLength("Hello World"); // 11
logLength([1, 2, 3, 4, 5]); // 5`,expectedTime:12,concepts:["utility types","conditional types","mapped types","function overloads","generic constraints"]},{id:"typescript-intermediate-2",title:"Async/Await and Error Handling",description:"Handle asynchronous operations and errors in TypeScript",difficulty:"intermediate",code:`// Promise-based function with proper typing
function fetchUserData(userId: number): Promise<{ id: number; name: string; email: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: "John Doe",
          email: "john@example.com"
        });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 1000);
  });
}

// Async/await with error handling
async function getUserInfo(userId: number): Promise<{ id: number; name: string; email: string } | null> {
  try {
    console.log("Fetching user data...");
    const user = await fetchUserData(userId);
    console.log("User found:", user);
    return user;
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : "Unknown error");
    return null;
  }
}

// Custom error class
class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  
  constructor(message: string, statusCode: number, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Function that throws custom error
async function validateUser(userId: number): Promise<void> {
  if (userId <= 0) {
    throw new ApiError("Invalid user ID", 400);
  }
  
  if (userId > 1000) {
    throw new ApiError("User not found", 404);
  }
}

// Multiple async operations
async function processUsers(userIds: number[]): Promise<Array<{ id: number; name: string; email: string } | null>> {
  const promises = userIds.map(async (id) => {
    try {
      await validateUser(id);
      return await fetchUserData(id);
    } catch (error) {
      console.error(\`Failed to process user \${id}:\`, error);
      return null;
    }
  });
  
  return Promise.all(promises);
}

// Error handling wrapper
async function safeAsyncOperation<T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error("Operation failed:", error);
    return fallback;
  }
}

// Usage
async function main() {
  // Single user
  const user = await getUserInfo(1);
  console.log("User result:", user);
  
  // Multiple users
  const users = await processUsers([1, 2, 3, -1, 1001]);
  console.log("Users result:", users);
  
  // Safe operation
  const safeResult = await safeAsyncOperation(
    () => fetchUserData(5),
    { id: 0, name: "Unknown", email: "unknown@example.com" }
  );
  console.log("Safe result:", safeResult);
}

main().catch(console.error);`,expectedTime:12,concepts:["async/await","error handling","custom errors","Promise.all","error boundaries"]},{id:"typescript-advanced-1",title:"Decorators and Advanced Patterns",description:"Advanced TypeScript features including decorators and design patterns",difficulty:"advanced",code:`// Decorator function
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${propertyName} with args:\`, args);
    const result = method.apply(this, args);
    console.log(\`\${propertyName} returned:\`, result);
    return result;
  };
}

// Class decorator
function Component(config: { selector: string; template: string }) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      selector = config.selector;
      template = config.template;
    };
  };
}

// Method decorator with parameters
function Validate(min: number, max: number) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    
    descriptor.value = function (value: number) {
      if (value < min || value > max) {
        throw new Error(\`Value must be between \${min} and \${max}\`);
      }
      return method.call(this, value);
    };
  };
}

// Property decorator
function Format(format: string) {
  return function (target: any, propertyName: string) {
    let value = target[propertyName];
    
    const getter = () => value;
    const setter = (newValue: any) => {
      if (format === 'uppercase' && typeof newValue === 'string') {
        value = newValue.toUpperCase();
      } else if (format === 'lowercase' && typeof newValue === 'string') {
        value = newValue.toLowerCase();
      } else {
        value = newValue;
      }
    };
    
    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

// Using decorators
@Component({
  selector: 'app-user',
  template: '<div>User Component</div>'
})
class UserService {
  @Format('uppercase')
  private name: string = '';
  
  constructor() {}
  
  @Log
  @Validate(1, 100)
  setAge(age: number): void {
    console.log(\`Setting age to \${age}\`);
  }
  
  @Log
  setName(name: string): void {
    this.name = name;
  }
  
  getName(): string {
    return this.name;
  }
}

// Factory pattern with TypeScript
interface Product {
  name: string;
  price: number;
  getDescription(): string;
}

class Book implements Product {
  constructor(public name: string, public price: number, public author: string) {}
  
  getDescription(): string {
    return \`Book: \${this.name} by \${this.author} - $\${this.price}\`;
  }
}

class Electronics implements Product {
  constructor(public name: string, public price: number, public brand: string) {}
  
  getDescription(): string {
    return \`Electronics: \${this.name} by \${this.brand} - $\${this.price}\`;
  }
}

class ProductFactory {
  static createProduct(type: 'book' | 'electronics', name: string, price: number, extra: string): Product {
    switch (type) {
      case 'book':
        return new Book(name, price, extra);
      case 'electronics':
        return new Electronics(name, price, extra);
      default:
        throw new Error(\`Unknown product type: \${type}\`);
    }
  }
}

// Usage
const userService = new UserService();
userService.setName('john doe');
userService.setAge(25);
console.log('User name:', userService.getName());

const book = ProductFactory.createProduct('book', 'TypeScript Guide', 29.99, 'John Smith');
const laptop = ProductFactory.createProduct('electronics', 'Gaming Laptop', 1299.99, 'TechBrand');

console.log(book.getDescription());
console.log(laptop.getDescription());`,expectedTime:15,concepts:["decorators","class decorators","method decorators","property decorators","factory pattern"]}]},{language:"go",languageName:"Go",lessons:[{id:"go-basics-1",title:"Variables and Basic Types",description:"Learn Go syntax with variables, types, and basic operations",difficulty:"beginner",code:`package main

import "fmt"

func main() {
    // Variable declarations
    var name string = "Alice"
    var age int = 25
    var height float64 = 5.6
    var isStudent bool = true
    
    // Short variable declaration
    city := "New York"
    score := 95.5
    
    // Multiple variable declaration
    var (
        firstName = "John"
        lastName  = "Doe"
        email     = "john@example.com"
    )
    
    // Constants
    const pi = 3.14159
    const company = "TechCorp"
    
    // Basic types
    var (
        intVal     int     = 42
        int8Val    int8    = 127
        int16Val   int16   = 32767
        int32Val   int32   = 2147483647
        int64Val   int64   = 9223372036854775807
        float32Val float32 = 3.14
        float64Val float64 = 3.14159265359
        boolVal    bool    = true
        stringVal  string  = "Hello, Go!"
    )
    
    // Arrays
    var numbers [5]int = [5]int{1, 2, 3, 4, 5}
    fruits := [3]string{"apple", "banana", "orange"}
    
    // Slices (dynamic arrays)
    colors := []string{"red", "green", "blue"}
    colors = append(colors, "yellow", "purple")
    
    // Maps
    person := map[string]interface{}{
        "name":  "Alice",
        "age":   25,
        "city":  "New York",
        "email": "alice@example.com",
    }
    
    // Output
    fmt.Println("Name:", name)
    fmt.Println("Age:", age)
    fmt.Println("Height:", height)
    fmt.Println("Is Student:", isStudent)
    fmt.Println("City:", city)
    fmt.Println("Score:", score)
    fmt.Println("Full Name:", firstName, lastName)
    fmt.Println("Email:", email)
    fmt.Println("PI:", pi)
    fmt.Println("Company:", company)
    
    fmt.Println("\\nNumbers array:", numbers)
    fmt.Println("Fruits array:", fruits)
    fmt.Println("Colors slice:", colors)
    fmt.Println("Person map:", person)
    
    // Type conversion
    var intFromFloat = int(float64Val)
    var stringFromInt = fmt.Sprintf("%d", intVal)
    
    fmt.Println("\\nType conversions:")
    fmt.Println("Int from float64:", intFromFloat)
    fmt.Println("String from int:", stringFromInt)
}`,expectedTime:10,concepts:["variables","types","constants","arrays","slices","maps","type conversion"]},{id:"go-basics-2",title:"Functions and Control Flow",description:"Master Go functions, loops, and conditional statements",difficulty:"beginner",code:`package main

import "fmt"

// Basic function
func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

// Function with multiple parameters and return values
func calculate(a, b int) (int, int, int, int) {
    sum := a + b
    diff := a - b
    product := a * b
    quotient := a / b
    return sum, diff, product, quotient
}

// Function with named return values
func divide(a, b float64) (result float64, err error) {
    if b == 0 {
        err = fmt.Errorf("division by zero")
        return
    }
    result = a / b
    return
}

// Variadic function
func sum(numbers ...int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}

// Function as parameter
func applyOperation(a, b int, operation func(int, int) int) int {
    return operation(a, b)
}

func main() {
    // Function calls
    greeting := greet("Alice")
    fmt.Println(greeting)
    
    sum, diff, product, quotient := calculate(10, 3)
    fmt.Printf("Sum: %d, Difference: %d, Product: %d, Quotient: %d\\n", 
               sum, diff, product, quotient)
    
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Division result:", result)
    }
    
    // Variadic function
    total := sum(1, 2, 3, 4, 5)
    fmt.Println("Sum of 1,2,3,4,5:", total)
    
    // Function as parameter
    add := func(a, b int) int { return a + b }
    multiply := func(a, b int) int { return a * b }
    
    fmt.Println("10 + 3 =", applyOperation(10, 3, add))
    fmt.Println("10 * 3 =", applyOperation(10, 3, multiply))
    
    // If-else statements
    age := 20
    if age >= 18 {
        fmt.Println("You are an adult")
    } else if age >= 13 {
        fmt.Println("You are a teenager")
    } else {
        fmt.Println("You are a child")
    }
    
    // Switch statement
    day := "Monday"
    switch day {
    case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday":
        fmt.Println("It's a weekday")
    case "Saturday", "Sunday":
        fmt.Println("It's a weekend")
    default:
        fmt.Println("Invalid day")
    }
    
    // For loops
    fmt.Println("\\nFor loop (traditional):")
    for i := 1; i <= 5; i++ {
        fmt.Printf("%d ", i)
    }
    fmt.Println()
    
    // For loop (while-style)
    fmt.Println("\\nWhile-style loop:")
    count := 1
    for count <= 3 {
        fmt.Printf("Count: %d\\n", count)
        count++
    }
    
    // Range loop
    fmt.Println("\\nRange loop over slice:")
    fruits := []string{"apple", "banana", "orange"}
    for index, fruit := range fruits {
        fmt.Printf("%d: %s\\n", index, fruit)
    }
    
    // Range loop over map
    fmt.Println("\\nRange loop over map:")
    person := map[string]string{
        "name":  "Alice",
        "city":  "New York",
        "email": "alice@example.com",
    }
    for key, value := range person {
        fmt.Printf("%s: %s\\n", key, value)
    }
}`,expectedTime:12,concepts:["functions","multiple return values","variadic functions","if-else","switch","for loops","range"]},{id:"go-intermediate-1",title:"Structs and Methods",description:"Object-oriented programming with Go structs and methods",difficulty:"intermediate",code:`package main

import (
    "fmt"
    "math"
)

// Basic struct
type Person struct {
    Name    string
    Age     int
    Email   string
    Address Address
}

type Address struct {
    Street  string
    City    string
    Country string
    ZipCode string
}

// Method with value receiver
func (p Person) GetFullInfo() string {
    return fmt.Sprintf("Name: %s, Age: %d, Email: %s, City: %s", 
                      p.Name, p.Age, p.Email, p.Address.City)
}

// Method with pointer receiver
func (p *Person) SetAge(age int) {
    if age > 0 && age < 150 {
        p.Age = age
    }
}

// Method with pointer receiver for updating
func (p *Person) UpdateEmail(email string) {
    p.Email = email
}

// Embedded struct (composition)
type Employee struct {
    Person
    EmployeeID int
    Department string
    Salary     float64
}

// Method for Employee
func (e Employee) GetEmployeeInfo() string {
    return fmt.Sprintf("Employee ID: %d, Department: %s, Salary: $%.2f", 
                      e.EmployeeID, e.Department, e.Salary)
}

// Interface definition
type Shape interface {
    Area() float64
    Perimeter() float64
    GetName() string
}

// Rectangle struct implementing Shape interface
type Rectangle struct {
    Width  float64
    Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}

func (r Rectangle) GetName() string {
    return "Rectangle"
}

// Circle struct implementing Shape interface
type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
    return 2 * math.Pi * c.Radius
}

func (c Circle) GetName() string {
    return "Circle"
}

// Function that works with interface
func printShapeInfo(shape Shape) {
    fmt.Printf("%s - Area: %.2f, Perimeter: %.2f\\n", 
               shape.GetName(), shape.Area(), shape.Perimeter())
}

// Constructor function
func NewPerson(name, email string, age int) *Person {
    return &Person{
        Name:  name,
        Email: email,
        Age:   age,
        Address: Address{
            City:    "Unknown",
            Country: "Unknown",
        },
    }
}

func main() {
    // Create Person using struct literal
    person1 := Person{
        Name:  "Alice",
        Age:   25,
        Email: "alice@example.com",
        Address: Address{
            Street:  "123 Main St",
            City:    "New York",
            Country: "USA",
            ZipCode: "10001",
        },
    }
    
    // Create Person using constructor
    person2 := NewPerson("Bob", "bob@example.com", 30)
    person2.Address = Address{
        Street:  "456 Oak Ave",
        City:    "Los Angeles",
        Country: "USA",
        ZipCode: "90210",
    }
    
    // Use methods
    fmt.Println("Person 1 Info:", person1.GetFullInfo())
    fmt.Println("Person 2 Info:", person2.GetFullInfo())
    
    // Update using pointer receiver
    person1.SetAge(26)
    person1.UpdateEmail("alice.new@example.com")
    fmt.Println("Updated Person 1:", person1.GetFullInfo())
    
    // Create Employee (embedded struct)
    employee := Employee{
        Person: Person{
            Name:  "Charlie",
            Age:   28,
            Email: "charlie@company.com",
            Address: Address{
                City: "San Francisco",
            },
        },
        EmployeeID: 1001,
        Department: "Engineering",
        Salary:     75000.00,
    }
    
    fmt.Println("\\nEmployee Info:")
    fmt.Println(employee.GetFullInfo())
    fmt.Println(employee.GetEmployeeInfo())
    
    // Interface usage
    shapes := []Shape{
        Rectangle{Width: 10, Height: 5},
        Circle{Radius: 7},
        Rectangle{Width: 3, Height: 4},
    }
    
    fmt.Println("\\nShape Information:")
    for _, shape := range shapes {
        printShapeInfo(shape)
    }
}`,expectedTime:12,concepts:["structs","methods","value receivers","pointer receivers","embedded structs","interfaces"]},{id:"go-intermediate-2",title:"Goroutines and Channels",description:"Concurrent programming with goroutines and channels",difficulty:"intermediate",code:`package main

import (
    "fmt"
    "sync"
    "time"
)

// Basic goroutine
func sayHello(name string) {
    for i := 0; i < 3; i++ {
        fmt.Printf("Hello %s! (goroutine %d)\\n", name, i+1)
        time.Sleep(100 * time.Millisecond)
    }
}

// Function that sends data to channel
func sendNumbers(ch chan int, count int) {
    for i := 1; i <= count; i++ {
        ch <- i
        fmt.Printf("Sent: %d\\n", i)
        time.Sleep(200 * time.Millisecond)
    }
    close(ch)
}

// Function that receives data from channel
func receiveNumbers(ch chan int, done chan bool) {
    for num := range ch {
        fmt.Printf("Received: %d\\n", num)
        time.Sleep(100 * time.Millisecond)
    }
    done <- true
}

// Worker function for worker pool pattern
func worker(id int, jobs <-chan int, results chan<- int) {
    for job := range jobs {
        fmt.Printf("Worker %d processing job %d\\n", id, job)
        time.Sleep(500 * time.Millisecond) // Simulate work
        results <- job * 2
    }
}

// Function using WaitGroup
func processWithWaitGroup(wg *sync.WaitGroup, id int) {
    defer wg.Done()
    fmt.Printf("Goroutine %d starting\\n", id)
    time.Sleep(1 * time.Second)
    fmt.Printf("Goroutine %d finished\\n", id)
}

// Function using Mutex for synchronization
type Counter struct {
    mu    sync.Mutex
    value int
}

func (c *Counter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.value++
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.value
}

func main() {
    fmt.Println("=== Basic Goroutines ===")
    
    // Start goroutines
    go sayHello("Alice")
    go sayHello("Bob")
    
    // Wait for goroutines to complete
    time.Sleep(1 * time.Second)
    
    fmt.Println("\\n=== Channels ===")
    
    // Create channels
    numbers := make(chan int, 3) // Buffered channel
    done := make(chan bool)
    
    // Start goroutines
    go sendNumbers(numbers, 5)
    go receiveNumbers(numbers, done)
    
    // Wait for completion
    <-done
    
    fmt.Println("\\n=== Worker Pool Pattern ===")
    
    // Create channels for worker pool
    jobs := make(chan int, 10)
    results := make(chan int, 10)
    
    // Start workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
    
    // Send jobs
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)
    
    // Collect results
    for r := 1; r <= 5; r++ {
        result := <-results
        fmt.Printf("Result: %d\\n", result)
    }
    
    fmt.Println("\\n=== WaitGroup ===")
    
    var wg sync.WaitGroup
    
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go processWithWaitGroup(&wg, i)
    }
    
    wg.Wait()
    fmt.Println("All goroutines completed")
    
    fmt.Println("\\n=== Mutex Synchronization ===")
    
    counter := &Counter{}
    var wg2 sync.WaitGroup
    
    // Start multiple goroutines that increment counter
    for i := 0; i < 10; i++ {
        wg2.Add(1)
        go func() {
            defer wg2.Done()
            for j := 0; j < 100; j++ {
                counter.Increment()
            }
        }()
    }
    
    wg2.Wait()
    fmt.Printf("Final counter value: %d\\n", counter.Value())
    
    fmt.Println("\\n=== Select Statement ===")
    
    ch1 := make(chan string)
    ch2 := make(chan string)
    
    go func() {
        time.Sleep(1 * time.Second)
        ch1 <- "Message from channel 1"
    }()
    
    go func() {
        time.Sleep(2 * time.Second)
        ch2 <- "Message from channel 2"
    }()
    
    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-ch1:
            fmt.Println("Received:", msg1)
        case msg2 := <-ch2:
            fmt.Println("Received:", msg2)
        case <-time.After(3 * time.Second):
            fmt.Println("Timeout!")
        }
    }
}`,expectedTime:12,concepts:["goroutines","channels","buffered channels","worker pools","WaitGroup","Mutex","select"]},{id:"go-advanced-1",title:"Error Handling and Advanced Patterns",description:"Advanced Go features including error handling, reflection, and design patterns",difficulty:"advanced",code:`package main

import (
    "errors"
    "fmt"
    "reflect"
    "time"
)

// Custom error type
type ValidationError struct {
    Field   string
    Message string
}

func (e ValidationError) Error() string {
    return fmt.Sprintf("validation error in field '%s': %s", e.Field, e.Message)
}

// Function that returns custom error
func validateUser(name, email string) error {
    if name == "" {
        return ValidationError{Field: "name", Message: "name is required"}
    }
    if email == "" {
        return ValidationError{Field: "email", Message: "email is required"}
    }
    if len(email) < 5 {
        return ValidationError{Field: "email", Message: "email is too short"}
    }
    return nil
}

// Generic function with type constraints
type Numeric interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 | ~float32 | ~float64
}

func Max[T Numeric](a, b T) T {
    if a > b {
        return a
    }
    return b
}

// Generic struct
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, error) {
    if len(s.items) == 0 {
        var zero T
        return zero, errors.New("stack is empty")
    }
    index := len(s.items) - 1
    item := s.items[index]
    s.items = s.items[:index]
    return item, nil
}

func (s *Stack[T]) IsEmpty() bool {
    return len(s.items) == 0
}

// Reflection example
func inspectValue(v interface{}) {
    t := reflect.TypeOf(v)
    val := reflect.ValueOf(v)
    
    fmt.Printf("Type: %s\\n", t)
    fmt.Printf("Kind: %s\\n", t.Kind())
    fmt.Printf("Value: %v\\n", val)
    
    if t.Kind() == reflect.Struct {
        fmt.Println("Fields:")
        for i := 0; i < t.NumField(); i++ {
            field := t.Field(i)
            fieldValue := val.Field(i)
            fmt.Printf("  %s: %v\\n", field.Name, fieldValue)
        }
    }
}

// Observer pattern
type Observer interface {
    Update(message string)
}

type Subject struct {
    observers []Observer
    message   string
}

func (s *Subject) Attach(observer Observer) {
    s.observers = append(s.observers, observer)
}

func (s *Subject) Notify() {
    for _, observer := range s.observers {
        observer.Update(s.message)
    }
}

func (s *Subject) SetMessage(message string) {
    s.message = message
    s.Notify()
}

type ConcreteObserver struct {
    name string
}

func (o ConcreteObserver) Update(message string) {
    fmt.Printf("Observer %s received: %s\\n", o.name, message)
}

// Context pattern for cancellation
func longRunningTask(done <-chan struct{}) {
    for {
        select {
        case <-done:
            fmt.Println("Task cancelled")
            return
        default:
            fmt.Println("Working...")
            time.Sleep(500 * time.Millisecond)
        }
    }
}

// Builder pattern
type UserBuilder struct {
    name    string
    email   string
    age     int
    address string
}

func NewUserBuilder() *UserBuilder {
    return &UserBuilder{}
}

func (b *UserBuilder) SetName(name string) *UserBuilder {
    b.name = name
    return b
}

func (b *UserBuilder) SetEmail(email string) *UserBuilder {
    b.email = email
    return b
}

func (b *UserBuilder) SetAge(age int) *UserBuilder {
    b.age = age
    return b
}

func (b *UserBuilder) SetAddress(address string) *UserBuilder {
    b.address = address
    return b
}

func (b *UserBuilder) Build() (string, error) {
    if b.name == "" {
        return "", errors.New("name is required")
    }
    if b.email == "" {
        return "", errors.New("email is required")
    }
    
    return fmt.Sprintf("User: %s, Email: %s, Age: %d, Address: %s", 
                      b.name, b.email, b.age, b.address), nil
}

func main() {
    fmt.Println("=== Error Handling ===")
    
    if err := validateUser("", "test@example.com"); err != nil {
        fmt.Printf("Validation error: %v\\n", err)
    }
    
    if err := validateUser("Alice", "short"); err != nil {
        fmt.Printf("Validation error: %v\\n", err)
    }
    
    fmt.Println("\\n=== Generics ===")
    
    fmt.Printf("Max of 10 and 20: %d\\n", Max(10, 20))
    fmt.Printf("Max of 3.14 and 2.71: %.2f\\n", Max(3.14, 2.71))
    
    // Generic stack
    intStack := &Stack[int]{}
    intStack.Push(1)
    intStack.Push(2)
    intStack.Push(3)
    
    for !intStack.IsEmpty() {
        item, err := intStack.Pop()
        if err != nil {
            fmt.Printf("Error: %v\\n", err)
            break
        }
        fmt.Printf("Popped: %d\\n", item)
    }
    
    fmt.Println("\\n=== Reflection ===")
    
    type Person struct {
        Name string
        Age  int
    }
    
    person := Person{Name: "Alice", Age: 25}
    inspectValue(person)
    inspectValue(42)
    inspectValue("Hello, Go!")
    
    fmt.Println("\\n=== Observer Pattern ===")
    
    subject := &Subject{}
    observer1 := &ConcreteObserver{name: "Observer1"}
    observer2 := &ConcreteObserver{name: "Observer2"}
    
    subject.Attach(observer1)
    subject.Attach(observer2)
    
    subject.SetMessage("Hello, Observers!")
    
    fmt.Println("\\n=== Context Cancellation ===")
    
    done := make(chan struct{})
    go longRunningTask(done)
    
    time.Sleep(2 * time.Second)
    close(done)
    time.Sleep(100 * time.Millisecond)
    
    fmt.Println("\\n=== Builder Pattern ===")
    
    user, err := NewUserBuilder().
        SetName("Alice").
        SetEmail("alice@example.com").
        SetAge(25).
        SetAddress("123 Main St").
        Build()
    
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
    } else {
        fmt.Println(user)
    }
}`,expectedTime:15,concepts:["custom errors","generics","reflection","observer pattern","context","builder pattern"]}]}],Vu=e=>Fi.find(t=>t.language===e),Fk=(e,t)=>{const n=Vu(e);return n==null?void 0:n.lessons.find(r=>r.id===t)},Uk=(e,t)=>{const n=Vu(e);return(n==null?void 0:n.lessons.filter(r=>r.difficulty===t))||[]},ma="coderush_user_stats",Bk=e=>{try{const n=[...vn(),e];localStorage.setItem(ma,JSON.stringify(n))}catch(t){console.error("Failed to save stats:",t)}},vn=()=>{try{const e=localStorage.getItem(ma);return e?JSON.parse(e).map(n=>({...n,completedAt:new Date(n.completedAt)})):[]}catch(e){return console.error("Failed to load stats:",e),[]}},vg=e=>{const n=vn().filter(l=>l.language===e);if(n.length===0)return{language:e,totalLessons:0,completedLessons:0,averageWpm:0,averageAccuracy:0,totalTimeSpent:0,lastPracticed:null};const r=new Set(n.map(l=>l.lessonId)).size,s=n.reduce((l,c)=>l+c.wpm,0)/n.length,i=n.reduce((l,c)=>l+c.accuracy,0)/n.length,a=n.reduce((l,c)=>l+c.timeSpent,0),o=n.reduce((l,c)=>c.completedAt>l?c.completedAt:l,new Date(0));return{language:e,totalLessons:n.length,completedLessons:r,averageWpm:Math.round(s),averageAccuracy:Math.round(i),totalTimeSpent:a,lastPracticed:o.getTime()>0?o:null}},ff=()=>{const e=vn();if(e.length===0)return{totalWpm:0,totalAccuracy:0,totalTimeSpent:0,totalLessonsCompleted:0,languagesPracticed:[]};const t=e.reduce((a,o)=>a+o.wpm,0)/e.length,n=e.reduce((a,o)=>a+o.accuracy,0)/e.length,r=e.reduce((a,o)=>a+o.timeSpent,0),s=new Set(e.map(a=>`${a.language}-${a.lessonId}`)).size,i=[...new Set(e.map(a=>a.language))];return{totalWpm:Math.round(t),totalAccuracy:Math.round(n),totalTimeSpent:r,totalLessonsCompleted:s,languagesPracticed:i}},$k=()=>{localStorage.removeItem(ma)},zk=1;function sn(e){if(typeof e.totalChars=="number"&&typeof e.correctChars=="number"&&typeof e.cpm=="number")return{totalTyped:e.totalChars,correct:e.correctChars,cpm:e.cpm};const t=Math.max(e.timeSpent/60,1/60),n=e.mistakes,r=e.accuracy/100;if(n===0){if(r>=.999){const o=Math.max(0,Math.round(e.wpm*t*5));return{totalTyped:o,correct:o,cpm:Math.round(o/t)}}return{totalTyped:0,correct:0,cpm:0}}const s=1-r;if(s<=1e-4){const o=n;return{totalTyped:o,correct:Math.max(0,o-n),cpm:Math.round(o/t)}}const i=Math.round(n/s),a=Math.max(0,i-n);return{totalTyped:i,correct:a,cpm:Math.round(i/t)}}function Wk(e){const t=Math.max(0,Math.floor(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),s=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${s}s`:`${s}s`}function Hk(){const e=vn(),t=e.map(g=>{const{totalTyped:v,correct:x,cpm:k}=sn(g);return{language:g.language,lessonId:g.lessonId,wpm:g.wpm,cpm:k,accuracy:g.accuracy,timeSpent:g.timeSpent,mistakes:g.mistakes,symbolsMissed:g.symbolsMissed,completedAt:g.completedAt.toISOString(),totalChars:g.totalChars??v,correctChars:g.correctChars??x}}),n=e.reduce((g,v)=>g+v.timeSpent,0),r=new Set(e.map(g=>`${g.language}-${g.lessonId}`)).size,s=e.length;let i=0,a=0,o=0,l=0,c=0,f=0;s>0&&(i=Math.round(e.reduce((g,v)=>g+v.wpm,0)/s),a=Math.round(e.reduce((g,v)=>g+v.accuracy,0)/s),o=Math.max(...e.map(g=>g.wpm)),l=Math.max(...e.map(g=>sn(g).cpm)),c=e.reduce((g,v)=>g+sn(v).totalTyped,0),f=e.reduce((g,v)=>g+sn(v).correct,0));const d={},m=[...new Set(e.map(g=>g.language))];for(const g of m){const v=e.filter(p=>p.language===g),x=v.length,k=v.reduce((p,b)=>p+b.timeSpent,0),y=v.reduce((p,b)=>p+sn(b).totalTyped,0),h=v.reduce((p,b)=>p+sn(b).correct,0);d[g]={sessionCount:x,totalPracticeTimeSeconds:k,averageWpm:x?Math.round(v.reduce((p,b)=>p+b.wpm,0)/x):0,averageAccuracy:x?Math.round(v.reduce((p,b)=>p+b.accuracy,0)/x):0,bestWpm:x?Math.max(...v.map(p=>p.wpm)):0,bestCpm:x?Math.max(...v.map(p=>sn(p).cpm)):0,typedCharacters:y,correctCharacters:h}}return{exportVersion:zk,app:"CodeRush",exportedAt:new Date().toISOString(),summary:{sessionCount:s,uniqueLessonCompletions:r,totalPracticeTimeSeconds:n,totalPracticeTimeDisplay:Wk(n),averageWpm:i,averageAccuracy:a,bestWpm:o,bestCpm:l,totalTypedCharacters:c,totalCorrectCharacters:f},byLanguage:d,sessions:t}}function Gk(){return JSON.stringify(Hk(),null,2)}function Yk(){const e=Gk(),t=new Blob([e],{type:"application/json;charset=utf-8"}),n=URL.createObjectURL(t),r=document.createElement("a"),s=new Date,i=s.getFullYear(),a=String(s.getMonth()+1).padStart(2,"0"),o=String(s.getDate()).padStart(2,"0");r.href=n,r.download=`coderush-stats-${i}-${a}-${o}.json`,r.rel="noopener",document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}const Kk=e=>{try{const t=JSON.parse(e);let n;if(Array.isArray(t))n=t;else if(t&&typeof t=="object"&&t!==null&&"sessions"in t&&Array.isArray(t.sessions))n=t.sessions;else return!1;if(!Array.isArray(n)||n.length===0)return!1;const r=n.map(s=>({language:s.language,lessonId:s.lessonId,wpm:s.wpm,accuracy:s.accuracy,timeSpent:s.timeSpent,completedAt:s.completedAt,mistakes:s.mistakes??0,symbolsMissed:Array.isArray(s.symbolsMissed)?s.symbolsMissed:[],...typeof s.cpm=="number"?{cpm:s.cpm}:{},...typeof s.totalChars=="number"?{totalChars:s.totalChars}:{},...typeof s.correctChars=="number"?{correctChars:s.correctChars}:{}}));for(const s of r)if(typeof s.language!="string"||typeof s.lessonId!="string"||s.completedAt==null||typeof s.wpm!="number"||typeof s.accuracy!="number"||typeof s.timeSpent!="number")return!1;return localStorage.setItem(ma,JSON.stringify(r)),!0}catch(t){return console.error("Failed to import stats:",t),!1}},Qk=e=>e==="beginner"?"badge-diff-beginner":e==="intermediate"?"badge-diff-intermediate":"badge-diff-advanced",qk=()=>{const{language:e}=fu(),[t,n]=w.useState("all"),r=Vu(e||""),s=vg(e||"");if(!r)return u.jsx("div",{className:"page-shell flex flex-col items-center justify-center px-4",children:u.jsxs("div",{className:"empty-state-panel max-w-lg border-solid",children:[u.jsx("h1",{className:"heading-section text-ink",children:"Language not found"}),u.jsx("p",{className:"body-prose mt-3 text-ink-subtle",children:"That language is not available. Return to the list and pick a supported track."}),u.jsx(ee,{to:"/languages",className:"btn-primary mt-8 inline-flex w-full justify-center sm:w-auto",children:"Back to Languages"})]})});const i=t==="all"?r.lessons:Uk(e||"",t),a={beginner:r.lessons.filter(d=>d.difficulty==="beginner").length,intermediate:r.lessons.filter(d=>d.difficulty==="intermediate").length,advanced:r.lessons.filter(d=>d.difficulty==="advanced").length},o={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.08,delayChildren:.15}}},l={hidden:{opacity:0,y:16},visible:{opacity:1,y:0,transition:{duration:.45,ease:"easeOut"}}},c=[{id:"all",label:"All",count:r.lessons.length,activeClass:"border-neon-blue/55 bg-neon-blue/15 text-ink ring-1 ring-neon-blue/35"},{id:"beginner",label:"Beginner",count:a.beginner,activeClass:"border-emerald-500/50 bg-emerald-500/10 text-emerald-100 ring-1 ring-emerald-500/25"},{id:"intermediate",label:"Intermediate",count:a.intermediate,activeClass:"border-amber-500/50 bg-amber-500/10 text-amber-50 ring-1 ring-amber-500/25"},{id:"advanced",label:"Advanced",count:a.advanced,activeClass:"border-rose-500/50 bg-rose-500/10 text-rose-100 ring-1 ring-rose-500/25"}],f="border-dark-border bg-dark-surface/60 text-ink-muted hover:border-dark-border hover:bg-dark-card hover:text-ink";return u.jsx(D.div,{className:"page-shell",variants:o,initial:"hidden",animate:"visible",children:u.jsxs("div",{className:"page-inner",children:[u.jsxs(D.header,{className:"mb-8 space-y-5 md:mb-10",variants:l,children:[u.jsxs(ee,{to:"/languages",className:"btn-secondary inline-flex w-fit max-w-full items-center text-sm sm:text-base",children:[u.jsx(fa,{className:"mr-2 h-4 w-4 shrink-0","aria-hidden":!0}),"All languages"]}),u.jsxs("div",{className:"max-w-3xl",children:[u.jsxs("h1",{className:"heading-page text-balance text-ink",children:[u.jsx("span",{className:"text-gradient",children:r.languageName}),u.jsx("span",{className:"text-ink",children:" lessons"})]}),u.jsx("div",{className:"section-rule ml-0 mr-auto mt-5 w-16 md:mt-6","aria-hidden":!0}),u.jsxs("p",{className:"body-lead mt-5 text-ink-subtle md:mt-6",children:["Pick a lesson to practice typing real ",r.languageName," code."," ",u.jsx("span",{className:"text-ink-muted",children:"New here? Start with a Beginner lesson, or use “All” to see everything."})]})]})]}),u.jsxs(D.div,{className:"mb-8 md:mb-10",variants:l,children:[u.jsxs("h2",{className:"mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-subtle",children:[u.jsx(Nk,{className:"h-4 w-4 text-neon-blue","aria-hidden":!0}),"Your progress"]}),u.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4",children:[u.jsxs("div",{className:"stat-slab",children:[u.jsx("div",{className:"stat-slab__icon",children:u.jsx(mg,{className:"h-5 w-5","aria-hidden":!0})}),u.jsxs("div",{className:"text-2xl font-bold tabular-nums text-ink",children:[s.completedLessons,"/",r.lessons.length]}),u.jsx("div",{className:"caption mt-1 text-ink-subtle",children:"Lessons completed"})]}),u.jsxs("div",{className:"stat-slab",children:[u.jsx("div",{className:"stat-slab__icon stat-slab__icon--muted",children:u.jsx(pl,{className:"h-5 w-5","aria-hidden":!0})}),u.jsx("div",{className:"text-2xl font-bold tabular-nums text-ink",children:s.averageWpm}),u.jsx("div",{className:"caption mt-1 text-ink-subtle",children:"Avg. WPM"})]}),u.jsxs("div",{className:"stat-slab",children:[u.jsx("div",{className:"stat-slab__icon",children:u.jsx(ur,{className:"h-5 w-5","aria-hidden":!0})}),u.jsxs("div",{className:"text-2xl font-bold tabular-nums text-ink",children:[s.averageAccuracy,"%"]}),u.jsx("div",{className:"caption mt-1 text-ink-subtle",children:"Avg. accuracy"})]}),u.jsxs("div",{className:"stat-slab",children:[u.jsx("div",{className:"stat-slab__icon stat-slab__icon--muted",children:u.jsx(lr,{className:"h-5 w-5","aria-hidden":!0})}),u.jsxs("div",{className:"text-2xl font-bold tabular-nums text-ink",children:[Math.round(s.totalTimeSpent/60),"m"]}),u.jsx("div",{className:"caption mt-1 text-ink-subtle",children:"Time practiced"})]})]})]}),u.jsxs(D.div,{className:"mb-6 md:mb-8",variants:l,children:[u.jsxs("h2",{className:"mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-subtle",children:[u.jsx(of,{className:"h-4 w-4 text-neon-blue","aria-hidden":!0}),"Filter by level"]}),u.jsx("div",{className:"flex flex-col gap-2 sm:flex-row sm:flex-wrap",role:"tablist","aria-label":"Lesson difficulty",children:c.map(d=>u.jsxs("button",{type:"button",role:"tab","aria-selected":t===d.id,onClick:()=>n(d.id),className:`filter-tab focus-ring ${t===d.id?d.activeClass:f}`,children:[u.jsx("span",{children:d.label}),u.jsxs("span",{className:"ml-1.5 tabular-nums opacity-80",children:["(",d.count,")"]})]},d.id))})]}),u.jsx(D.div,{className:"space-y-4",variants:o,children:i.length===0?u.jsxs(D.div,{className:"empty-state-panel max-w-lg border-solid py-12",variants:l,children:[u.jsx(of,{className:"mx-auto h-10 w-10 text-ink-faint","aria-hidden":!0}),u.jsx("p",{className:"body-prose mt-4 text-ink-muted",children:"No lessons in this level yet."}),u.jsx("p",{className:"caption mt-2 text-ink-subtle",children:"Try “All” or another difficulty to see available lessons."}),u.jsx("button",{type:"button",onClick:()=>n("all"),className:"btn-secondary mt-6 w-full sm:mx-auto sm:w-auto",children:"Show all lessons"})]}):i.map(d=>u.jsx(D.article,{className:"lesson-card",variants:l,children:u.jsxs("div",{className:"flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8",children:[u.jsxs("div",{className:"min-w-0 flex-1",children:[u.jsxs("div",{className:"mb-3 flex flex-wrap items-center gap-2 sm:gap-3",children:[u.jsx("span",{className:Qk(d.difficulty),children:d.difficulty.charAt(0).toUpperCase()+d.difficulty.slice(1)}),u.jsxs("span",{className:"inline-flex items-center gap-1.5 text-sm text-ink-subtle",children:[u.jsx(lr,{className:"h-4 w-4 shrink-0 text-ink-faint","aria-hidden":!0}),u.jsxs("span",{className:"tabular-nums",children:[d.expectedTime," min"]}),u.jsx("span",{className:"text-ink-faint",children:"·"}),u.jsx("span",{children:"estimated"})]})]}),u.jsx("h3",{className:"text-lg font-semibold tracking-tight text-ink md:text-xl",children:d.title}),u.jsx("p",{className:"body-prose mt-2 text-ink-subtle",children:d.description}),d.concepts.length>0&&u.jsx("ul",{className:"mt-4 flex flex-wrap gap-2","aria-label":"Concepts covered",children:d.concepts.map((m,g)=>u.jsx("li",{children:u.jsx("span",{className:"concept-chip",children:m})},g))})]}),u.jsx("div",{className:"shrink-0 md:pt-1",children:u.jsxs(ee,{to:`/languages/${e}/lesson/${d.id}`,className:"btn-primary flex w-full items-center justify-center gap-2 md:w-auto md:min-w-[10.5rem]",children:[u.jsx(ml,{className:"h-4 w-4 shrink-0","aria-hidden":!0}),"Start lesson"]})})]})},d.id))}),u.jsx(D.div,{className:"section-divide",variants:l,children:u.jsxs("div",{className:"cta-panel cta-panel-accent",children:[u.jsx("h2",{className:"heading-section mb-3 px-2 pt-1 text-ink",children:"Want more practice?"}),u.jsx("p",{className:"body-prose mx-auto mb-8 max-w-2xl text-ink-muted",children:"Use free practice mode for random snippets and open-ended sessions—same language, no lesson structure required."}),u.jsx("div",{className:"cta-panel__actions justify-center",children:u.jsxs(ee,{to:`/languages/${e}/practice`,className:"btn-secondary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base sm:min-w-[14rem] sm:text-lg",children:[u.jsx(hl,{className:"h-4 w-4 shrink-0","aria-hidden":!0}),"Open practice mode"]})})]})})]})})};function Jk(e,t){const n=Math.min(e.length,t.length);let r=0;for(let s=0;s<n;s++)e[s]===t[s]&&r++;return r}function mf(e,t,n){return n>=e.length?"pending":n<t.length?t[n]===e[n]?"correct":"incorrect":n===t.length?"current":"pending"}const Xk=1/60;function pf(e,t,n){const r=t.length,s=Jk(e,t),i=r-s,a=Math.max(n/6e4,Xk),o=r===0?100:Math.round(s/r*1e3)/10,l=Math.round(s/5/a),c=Math.round(r/a);return{correct:s,incorrect:i,totalTyped:r,accuracy:o,wpm:l,cpm:c,mistakes:i}}function Zk(e,t){return t.length===e.length&&t===e}function eS(e,t){return e.length>0&&t.length>=e.length}function hf(e){switch(e){case"correct":return"text-emerald-300/95";case"incorrect":return"bg-red-500/20 text-red-200 underline decoration-red-400/90 decoration-2 underline-offset-2";case"current":return"rounded-sm bg-cyan-500/25 text-white shadow-[inset_0_-2px_0_0_rgba(34,211,238,0.85)]";default:return"text-ink-subtle/45"}}function tS(e,t){return e.replace(/\r\n/g,`
`).slice(0,t)}const nS=w.forwardRef(function({targetCode:t,languageLabel:n,value:r,onValueChange:s,disabled:i=!1,showLineNumbers:a=!0},o){const l=w.useRef(null),c=w.useRef(null),f=w.useRef(null),d=w.useId();w.useImperativeHandle(o,()=>({focusInput:()=>{var p;(p=l.current)==null||p.focus({preventScroll:!0})}}),[]);const m=t.split(`
`).length,g=Math.max(2,String(m).length+1);w.useEffect(()=>{var p;i||r.length>=t.length||(p=f.current)==null||p.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[r.length,i,t.length]);const v=w.useCallback(()=>{var p;i||(p=l.current)==null||p.focus({preventScroll:!0})},[i]),x=p=>{if(i)return;const b=tS(p.target.value,t.length);s(b,Zk(t,b))},k=p=>{const b=c.current;b&&(b.scrollTop+=p.deltaY,p.preventDefault())},{lines:y,lineStarts:h}=w.useMemo(()=>{const p=t.split(`
`),b=[];let S=0;for(let j=0;j<p.length;j++)b.push(S),S+=p[j].length,j<p.length-1&&(S+=1);return{lines:p,lineStarts:b}},[t]);return u.jsxs("div",{className:"overflow-hidden rounded-lg border border-dark-border bg-[#070708] shadow-inner",children:[u.jsxs("div",{className:"flex items-center justify-between border-b border-dark-border bg-dark-card/90 px-3 py-2 sm:px-4",onClick:v,onKeyDown:p=>p.key==="Enter"&&v(),role:"presentation",children:[u.jsxs("div",{className:"flex min-w-0 items-center gap-3",children:[u.jsxs("div",{className:"flex shrink-0 gap-1.5",children:[u.jsx("span",{className:"h-2.5 w-2.5 rounded-full bg-red-500/90"}),u.jsx("span",{className:"h-2.5 w-2.5 rounded-full bg-amber-400/90"}),u.jsx("span",{className:"h-2.5 w-2.5 rounded-full bg-emerald-500/90"})]}),u.jsxs("span",{className:"truncate font-mono text-xs text-ink-subtle sm:text-sm",children:[n," · ",m," ",m===1?"line":"lines"," · ",t.length," ","chars"]})]}),u.jsx("span",{className:"hidden text-[10px] uppercase tracking-wide text-ink-subtle/70 sm:inline",children:"Click here to focus"})]}),u.jsxs("div",{className:"relative min-h-[12rem] max-h-[min(42vh,360px)] sm:max-h-[min(48vh,420px)]",children:[u.jsx("label",{htmlFor:d,className:"sr-only",children:"Type the code snippet. Use backspace to correct mistakes."}),u.jsx("textarea",{id:d,ref:l,value:r,onChange:x,onWheel:k,readOnly:i,tabIndex:i?-1:0,spellCheck:!1,autoComplete:"off",autoCorrect:"off",autoCapitalize:"off","aria-label":"Typing practice input",className:"absolute inset-0 z-[3] h-full min-h-[12rem] w-full cursor-text resize-none border-0 bg-transparent p-0 text-base text-transparent caret-transparent outline-none selection:bg-transparent disabled:cursor-not-allowed",style:{fontSize:"16px"}}),u.jsx("div",{ref:c,className:"relative z-[1] h-full select-none overflow-auto px-3 py-3 sm:px-4 sm:py-4","aria-hidden":!0,children:u.jsx("div",{className:"font-mono text-sm leading-relaxed tracking-normal sm:text-[15px] sm:leading-relaxed",style:{fontFamily:"JetBrains Mono, Fira Code, Consolas, monospace"},children:y.map((p,b)=>{const S=h[b];return u.jsxs("div",{className:"flex gap-2 sm:gap-3",children:[a&&u.jsx("div",{className:"shrink-0 select-none text-right text-ink-subtle/55 tabular-nums",style:{width:`${g}ch`,minWidth:`${g}ch`},children:b+1}),u.jsxs("div",{className:"min-w-0 flex-1 overflow-x-auto whitespace-pre",children:[Array.from(p).map((C,N)=>{const M=S+N,T=mf(t,r,M),U=!i&&r.length===M&&r.length<t.length;return u.jsx("span",{ref:U?f:void 0,className:`${hf(T)} transition-colors duration-75`,children:C===" "?" ":C},M)}),b<y.length-1&&(()=>{const C=S+p.length,N=mf(t,r,C),M=!i&&r.length===C&&r.length<t.length;return u.jsx("span",{ref:M?f:void 0,className:`${hf(N)} inline-flex min-w-[0.5ch] transition-colors duration-75`,children:"↵"},`nl-${C}`)})()]})]},b)})})})]})]})});function rS(e,t){const n=w.useRef(null),r=w.useRef(null),s=w.useRef(0),[i,a]=w.useState(0);w.useEffect(()=>{if(!e){n.current=null,r.current=null,s.current=0,a(c=>c+1);return}n.current===null&&(n.current=Date.now())},[e]),w.useEffect(()=>{t?r.current===null&&(r.current=Date.now()):r.current!==null&&(s.current+=Date.now()-r.current,r.current=null)},[t]),w.useEffect(()=>{if(!e||t)return;const c=window.setInterval(()=>a(f=>f+1),250);return()=>window.clearInterval(c)},[e,t]);const o=w.useCallback(()=>{if(n.current===null)return 0;const c=Date.now();let f=s.current;return r.current!==null&&(f+=c-r.current),Math.max(0,c-n.current-f)},[]),l=w.useCallback(()=>{n.current=null,r.current=null,s.current=0,a(c=>c+1)},[]);return{getActiveElapsedMs:o,reset:l,tick:i}}function sS(e){return{python:"Python",javascript:"JavaScript",typescript:"TypeScript",java:"Java",cpp:"C++",html:"HTML",css:"CSS",sql:"SQL",bash:"Bash",go:"Go",text:"Plain text"}[e]??e.charAt(0).toUpperCase()+e.slice(1)}const iS=()=>{const{language:e,lessonId:t}=fu(),[n,r]=w.useState(""),[s,i]=w.useState(!1),[a,o]=w.useState(!1),[l,c]=w.useState(!1),[f,d]=w.useState(null),[m,g]=w.useState(0),v=w.useRef(null),x=w.useRef(null),k=w.useRef(!1),y=Fk(e||"",t||""),h=n.length>0,{getActiveElapsedMs:p,reset:b,tick:S}=rS(h,a||l),j=w.useRef({language:e,lessonId:t});w.useEffect(()=>{const P=j.current;P.language===e&&P.lessonId===t||(j.current={language:e,lessonId:t},b(),r(""),i(!1),o(!1),c(!1),d(null),k.current=!1,g(_=>_+1))},[e,t,b]);const C=w.useMemo(()=>pf((y==null?void 0:y.code)??"",n,p()),[y==null?void 0:y.code,n,S,p]),N=`${e}-${t}-${m}`,M=w.useCallback(P=>{if(r(P),!y||k.current||!eS(y.code,P))return;k.current=!0;const _=p(),L=pf(y.code,P,_),$=P===y.code;d({wpm:L.wpm,cpm:L.cpm,accuracy:L.accuracy,mistakes:L.mistakes,correct:L.correct,totalTyped:L.totalTyped,targetLength:y.code.length,timeSeconds:Math.round(_/1e3),perfectMatch:$}),c(!0),Bk({language:e||"",lessonId:t||"",wpm:L.wpm,accuracy:L.accuracy,mistakes:L.mistakes,timeSpent:Math.round(_/1e3),completedAt:new Date,symbolsMissed:[],cpm:L.cpm,totalChars:L.totalTyped,correctChars:L.correct})},[p,y,e,t]),T=w.useCallback(()=>{b(),r(""),g(P=>P+1),i(!1),o(!1),c(!1),d(null),k.current=!1},[b]),U=w.useCallback(()=>{i(!0),o(!1)},[]),W=w.useRef(!1);w.useEffect(()=>{let P;return s&&!W.current&&(P=setTimeout(()=>{var _;return(_=v.current)==null?void 0:_.focusInput()},0)),W.current=s,()=>{P!==void 0&&clearTimeout(P)}},[s]);const Q=()=>{o(P=>!P)},z=!s||a||l;w.useEffect(()=>{if(!l)return;const P=window.setTimeout(()=>{var _;(_=x.current)==null||_.scrollIntoView({behavior:"smooth",block:"start"})},150);return()=>clearTimeout(P)},[l]);const ge=P=>{const _=Math.floor(P/60),L=P%60;return`${_}:${L.toString().padStart(2,"0")}`},J=Math.floor(p()/1e3),ke=()=>y?Math.round(n.length/y.code.length*100):0;if(!y)return u.jsx("div",{className:"page-shell flex items-center justify-center",children:u.jsxs("div",{className:"text-center",children:[u.jsx("h1",{className:"text-2xl font-bold text-white mb-4",children:"Lesson Not Found"}),u.jsx("p",{className:"text-ink-subtle mb-6",children:"The lesson you're looking for doesn't exist."}),u.jsx(ee,{to:"/languages",className:"btn-primary",children:"Back to Languages"})]})});const R=[{icon:lr,label:"Time",value:ge(J),accent:"text-neon-blue"},{icon:ds,label:"WPM",value:String(C.wpm),accent:"text-neon-blue"},{icon:uf,label:"CPM",value:String(C.cpm),accent:"text-cyan-400"},{icon:ur,label:"Accuracy",value:`${C.accuracy}%`,accent:"text-neon-purple"},{icon:af,label:"Errors",value:String(C.mistakes),accent:"text-red-400/90"}];return u.jsx(D.div,{className:"page-shell",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:u.jsxs("div",{className:"page-inner",children:[u.jsxs("div",{className:"mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between",children:[u.jsxs("div",{className:"flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 min-w-0",children:[u.jsxs(ee,{to:`/languages/${e}/lessons`,className:"btn-secondary inline-flex w-fit items-center shrink-0",children:[u.jsx(fa,{className:"mr-2 h-4 w-4"}),"Back to Lessons"]}),u.jsxs("div",{className:"min-w-0",children:[u.jsx("h1",{className:"text-xl font-bold sm:text-2xl md:text-3xl",children:u.jsx("span",{className:"text-gradient",children:y.title})}),u.jsx("p",{className:"text-sm text-ink-subtle sm:text-base line-clamp-2",children:y.description})]})]}),u.jsxs("div",{className:"flex shrink-0 flex-wrap items-center gap-2",children:[!l&&u.jsx(u.Fragment,{children:s?u.jsxs("button",{type:"button",onClick:Q,className:"btn-secondary inline-flex items-center",children:[a?u.jsx(ml,{className:"mr-2 h-4 w-4"}):u.jsx(Rk,{className:"mr-2 h-4 w-4"}),a?"Resume":"Pause"]}):u.jsxs("button",{type:"button",onClick:U,className:"btn-primary inline-flex items-center",children:[u.jsx(ml,{className:"mr-2 h-4 w-4"}),"Start"]})}),u.jsx("button",{type:"button",onClick:T,className:"btn-secondary inline-flex items-center",children:"Reset"})]})]}),u.jsxs("div",{className:"mb-4 sm:mb-5",children:[u.jsxs("div",{className:"mb-1.5 flex justify-between text-xs text-ink-subtle sm:text-sm",children:[u.jsx("span",{children:"Progress"}),u.jsxs("span",{children:[ke(),"%"]})]}),u.jsx("div",{className:"h-1.5 w-full rounded-full bg-dark-border sm:h-2",children:u.jsx(D.div,{className:"h-full rounded-full bg-gradient-to-r from-neon-blue to-neon-purple",initial:{width:0},animate:{width:`${ke()}%`},transition:{duration:.25}})})]}),u.jsx("div",{className:"mb-4 rounded-lg border border-dark-border bg-dark-card/40 px-2 py-2 sm:px-3 sm:py-2.5",children:u.jsx("div",{className:"flex flex-wrap gap-2 sm:gap-1 sm:justify-between",children:R.map(({icon:P,label:_,value:L,accent:$})=>u.jsxs("div",{className:"flex min-w-[4.5rem] flex-1 items-center gap-2 rounded-md bg-dark-bg/60 px-2 py-1.5 sm:min-w-0 sm:flex-1 sm:flex-col sm:items-center sm:justify-center sm:gap-0.5 sm:px-1 sm:py-2",children:[u.jsx(P,{className:`h-4 w-4 shrink-0 sm:mb-0.5 sm:h-5 sm:w-5 ${$}`,"aria-hidden":!0}),u.jsxs("div",{className:"flex min-w-0 flex-1 flex-col sm:items-center",children:[u.jsx("span",{className:"truncate text-lg font-bold tabular-nums text-white leading-none sm:text-xl",children:L}),u.jsx("span",{className:"text-[10px] uppercase tracking-wide text-ink-subtle sm:text-xs",children:_})]})]},_))})}),u.jsxs("div",{className:"space-y-5 sm:space-y-6",children:[u.jsxs(D.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{delay:.15},children:[u.jsxs("div",{className:"mb-3 flex flex-wrap items-center justify-between gap-2",children:[u.jsxs("div",{children:[u.jsx("h2",{className:"text-lg font-semibold text-white sm:text-xl",children:"Practice"}),!s&&!l&&u.jsx("p",{className:"mt-0.5 text-xs text-ink-subtle",children:"Press Start, then type in the panel below."}),s&&a&&!l&&u.jsx("p",{className:"mt-0.5 text-xs text-amber-400/90",children:"Paused — press Resume to continue."})]}),u.jsx("span",{className:`rounded-full px-2.5 py-0.5 text-xs font-medium ${y.difficulty==="beginner"?"bg-green-600/20 text-green-400":y.difficulty==="intermediate"?"bg-yellow-600/20 text-yellow-400":"bg-red-600/20 text-red-400"}`,children:y.difficulty.charAt(0).toUpperCase()+y.difficulty.slice(1)})]}),u.jsx(nS,{ref:v,targetCode:y.code,languageLabel:sS(e||"text"),value:n,onValueChange:M,disabled:z,showLineNumbers:!0},N)]}),l&&f&&u.jsxs(D.div,{ref:x,id:"exercise-summary",role:"status","aria-live":"polite",className:f.perfectMatch?"overflow-hidden rounded-xl border border-green-500/35 bg-gradient-to-b from-green-600/15 via-dark-card/95 to-dark-card ring-1 ring-green-500/20":"overflow-hidden rounded-xl border border-amber-500/35 bg-gradient-to-b from-amber-600/12 via-dark-card/95 to-dark-card ring-1 ring-amber-500/20",initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.4,ease:"easeOut"},children:[u.jsxs("div",{className:f.perfectMatch?"border-b border-green-500/20 bg-green-500/10 px-4 py-5 text-center sm:px-6 sm:py-6":"border-b border-amber-500/20 bg-amber-500/10 px-4 py-5 text-center sm:px-6 sm:py-6",children:[u.jsx("div",{className:f.perfectMatch?"mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 sm:h-16 sm:w-16":"mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/20 sm:h-16 sm:w-16",children:f.perfectMatch?u.jsx(vk,{className:"h-9 w-9 text-green-400 sm:h-10 sm:w-10","aria-hidden":!0}):u.jsx(fg,{className:"h-9 w-9 text-amber-400 sm:h-10 sm:w-10","aria-hidden":!0})}),u.jsx("h3",{className:"text-xl font-bold text-white sm:text-2xl",children:f.perfectMatch?"Exercise complete":"Exercise finished"}),u.jsx("p",{className:"mt-1 text-sm text-ink-subtle sm:text-base",children:f.perfectMatch?u.jsxs(u.Fragment,{children:["Nice work on ",u.jsx("span",{className:"font-medium text-ink",children:y.title})]}):u.jsxs(u.Fragment,{children:["You reached the end of ",u.jsx("span",{className:"font-medium text-ink",children:y.title})," with some mismatches — here’s your summary."]})}),u.jsx("p",{className:"mt-2 text-xs text-ink-subtle",children:"Here’s how you did:"})]}),u.jsxs("div",{className:"grid gap-2 p-3 sm:grid-cols-2 sm:gap-3 sm:p-4 lg:grid-cols-3",children:[u.jsxs("div",{className:"rounded-lg border border-dark-border bg-dark-bg/70 px-3 py-3 text-center",children:[u.jsx(ds,{className:"mx-auto mb-1 h-5 w-5 text-neon-blue","aria-hidden":!0}),u.jsx("div",{className:"text-2xl font-bold tabular-nums text-white",children:f.wpm}),u.jsx("div",{className:"text-xs uppercase tracking-wide text-ink-subtle",children:"Words per minute"})]}),u.jsxs("div",{className:"rounded-lg border border-dark-border bg-dark-bg/70 px-3 py-3 text-center",children:[u.jsx(uf,{className:"mx-auto mb-1 h-5 w-5 text-cyan-400","aria-hidden":!0}),u.jsx("div",{className:"text-2xl font-bold tabular-nums text-white",children:f.cpm}),u.jsx("div",{className:"text-xs uppercase tracking-wide text-ink-subtle",children:"Chars per minute"})]}),u.jsxs("div",{className:"rounded-lg border border-dark-border bg-dark-bg/70 px-3 py-3 text-center sm:col-span-2 lg:col-span-1",children:[u.jsx(ur,{className:"mx-auto mb-1 h-5 w-5 text-neon-purple","aria-hidden":!0}),u.jsxs("div",{className:"text-2xl font-bold tabular-nums text-white",children:[f.accuracy,"%"]}),u.jsx("div",{className:"text-xs uppercase tracking-wide text-ink-subtle",children:"Accuracy"})]}),u.jsxs("div",{className:"rounded-lg border border-dark-border bg-dark-bg/70 px-3 py-3 text-center",children:[u.jsx(lr,{className:"mx-auto mb-1 h-5 w-5 text-neon-blue","aria-hidden":!0}),u.jsx("div",{className:"text-2xl font-bold tabular-nums text-white",children:ge(f.timeSeconds)}),u.jsx("div",{className:"text-xs uppercase tracking-wide text-ink-subtle",children:"Time"})]}),u.jsxs("div",{className:"rounded-lg border border-dark-border bg-dark-bg/70 px-3 py-3 text-center",children:[u.jsx(af,{className:"mx-auto mb-1 h-5 w-5 text-red-400/90","aria-hidden":!0}),u.jsx("div",{className:"text-2xl font-bold tabular-nums text-white",children:f.mistakes}),u.jsx("div",{className:"text-xs uppercase tracking-wide text-ink-subtle",children:"Incorrect keystrokes"})]}),u.jsxs("div",{className:"rounded-lg border border-dark-border bg-dark-bg/70 px-3 py-3 text-center sm:col-span-2 lg:col-span-1",children:[u.jsx(hg,{className:"mx-auto mb-1 h-5 w-5 text-emerald-400/90","aria-hidden":!0}),u.jsxs("div",{className:"text-2xl font-bold tabular-nums text-white",children:[f.correct,u.jsxs("span",{className:"text-lg font-semibold text-ink-subtle",children:[" / ",f.targetLength]})]}),u.jsx("div",{className:"text-xs uppercase tracking-wide text-ink-subtle",children:"Correct characters"})]})]}),u.jsxs("div",{className:"flex flex-col gap-2 border-t border-dark-border bg-dark-bg/40 px-3 py-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3 sm:px-4 sm:py-4",children:[u.jsxs("button",{type:"button",onClick:T,className:"btn-primary inline-flex items-center justify-center gap-2",children:[u.jsx(Mk,{className:"h-4 w-4","aria-hidden":!0}),"Try again"]}),u.jsxs(ee,{to:`/languages/${e}/lessons`,className:"btn-secondary inline-flex items-center justify-center gap-2",children:[u.jsx(Ek,{className:"h-4 w-4","aria-hidden":!0}),"More lessons"]}),u.jsxs(ee,{to:"/stats",className:"btn-secondary inline-flex items-center justify-center gap-2",children:[u.jsx(fl,{className:"h-4 w-4","aria-hidden":!0}),"View stats"]})]})]}),u.jsxs(D.div,{className:"card",initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{delay:.25},children:[u.jsx("h3",{className:"mb-2 text-base font-semibold text-white sm:text-lg",children:"Concepts in this lesson"}),u.jsx("div",{className:"flex flex-wrap gap-2",children:y.concepts.map((P,_)=>u.jsx("span",{className:"rounded-full bg-neon-blue/20 px-2.5 py-0.5 text-xs text-neon-blue sm:text-sm",children:P},_))})]})]})]})})};function gf(e,t){let n=e.replace(/\r\n?/g,`
`).replace(/\t/g,"  ").replace(/[""]/g,'"').replace(/['']/g,"'");return t.collapseSpaces&&(n=n.replace(/ {2,}/g," ")),t.ignoreTrailing&&(n=n.replace(/[ \u00A0]+$/g,"")),n}function yf(e,t,n){return e===t||!n&&(e===" "||e===" ")&&(t===" "||t===" ")}function aS({text:e,windowSize:t=3,strict:n=!1,className:r=""}){const s=w.useMemo(()=>gf(e,{collapseSpaces:!1,ignoreTrailing:!1}).split(`
`),[e]),[i,a]=w.useState(0),[o,l]=w.useState(""),[c,f]=w.useState(null),[d,m]=w.useState(!1),g=w.useRef(null),v=w.useRef(null),x=s[i]??"",k=gf(x,{collapseSpaces:!n,ignoreTrailing:!n}),y=w.useMemo(()=>{const C=[],N=Math.max(o.length,k.length);for(let M=0;M<N;M++){const T=o[M],U=k[M];T===void 0?C.push("pending"):C.push(yf(T,U,n)?"ok":"bad")}return C},[o,k,n]);w.useEffect(()=>{var C;(C=v.current)==null||C.scrollIntoView({block:"center",behavior:"smooth"})},[i]),w.useEffect(()=>{const C=M=>{const T=M;if(!d){if(T.key==="Tab"){T.preventDefault(),l("");return}if((T.ctrlKey||T.metaKey)&&T.key==="Enter"){T.preventDefault(),h();return}if(T.key==="Backspace"){T.preventDefault(),o.length>0&&l(U=>U.slice(0,-1));return}if(T.key==="Enter"){T.preventDefault(),h();return}if(T.key.length===1){T.preventDefault(),c||f(Date.now()),l(z=>z+T.key);const U=o+T.key,W=n?U:U.replace(/[ \u00A0]+$/g,""),Q=n?k:k.replace(/[ \u00A0]+$/g,"");if(W.length===Q.length){let z=!0;for(let ge=0;ge<Q.length;ge++)if(!yf(W[ge],Q[ge],n)){z=!1;break}z&&setTimeout(()=>h(),0)}}}},N=g.current??window;return N.addEventListener("keydown",C),()=>N.removeEventListener("keydown",C)},[o,k,d,c,n]);function h(){l(""),i+1<s.length?a(C=>C+1):m(!0)}const p=Math.floor(Math.max(1,t)/2),b=Math.max(0,i-p),S=Math.min(s.length,i+p+1),j=s.slice(b,S);return u.jsxs("div",{ref:g,className:"w-full max-w-3xl mx-auto select-none "+r,tabIndex:0,"aria-label":"Interactive line-by-line typing area",children:[u.jsxs("header",{className:"flex items-center justify-between mb-3",children:[u.jsxs("h2",{className:"text-lg font-semibold text-ink",children:["Line Practice (window ",j.length," lines)"]}),u.jsxs("div",{className:"text-sm text-ink-subtle",children:[u.jsx("kbd",{className:"rounded border border-dark-border bg-dark-card px-1.5 py-0.5 text-xs text-ink-muted",children:"Enter"})," next",u.jsx("span",{className:"mx-2",children:"•"}),u.jsx("kbd",{className:"rounded border border-dark-border bg-dark-card px-1.5 py-0.5 text-xs text-ink-muted",children:"Tab"})," restart line",u.jsx("span",{className:"mx-2",children:"•"}),u.jsx("kbd",{className:"rounded border border-dark-border bg-dark-card px-1.5 py-0.5 text-xs text-ink-muted",children:"Backspace"})," delete"]})]}),u.jsx("div",{className:"max-h-[70vh] overflow-auto rounded-card border border-dark-border bg-dark-surface p-4 shadow-card",children:j.map((C,N)=>{const M=b+N;return M===i&&!d?u.jsx(vf,{number:M+1,className:"bg-neon-blue/5 ring-1 ring-neon-blue/25",innerRef:v,children:u.jsxs("span",{className:"whitespace-pre font-mono",children:[k.split("").map((U,W)=>{const Q=y[W]??"pending",z=Q==="pending"?"text-ink-faint":Q==="ok"?"text-green-600":"text-red-600 underline decoration-red-600";return u.jsx("span",{className:z,children:U},W)}),o.length>k.length&&u.jsx("span",{className:"text-red-600 underline decoration-red-600",children:o.slice(k.length)}),u.jsx("span",{className:"inline-block h-5 w-0.5 animate-pulse bg-neon-blue align-text-bottom"})]})},M):u.jsx(vf,{number:M+1,className:"text-ink-subtle",children:u.jsx("span",{className:"whitespace-pre font-mono",children:C||" "})},M)})}),d&&u.jsx("div",{className:"mt-4 rounded-card border border-emerald-500/30 bg-emerald-500/10 p-3",children:u.jsx("div",{className:"font-medium text-ink-muted",children:"Exercise complete. Press Tab to restart a line or refresh to start over."})})]})}function vf({number:e,children:t,className:n="",innerRef:r}){return u.jsxs("div",{ref:r,className:"flex items-start gap-3 px-3 py-1 rounded-md "+n,children:[u.jsx("div",{className:"w-10 select-none pr-2 text-right text-ink-faint",children:e}),u.jsx("div",{className:"flex-1",children:t})]})}const oS=["# Hello World in Python",'print("Hello, World!")',"",'name = "Alice"',"age = 25","height = 5.6","is_student = True","",'print(f"Name: {name}")','print(f"Age: {age}")','print(f"Height: {height} feet")','print(f"Is student: {is_student}")'].join(`
`),lS=()=>{const{language:e}=fu(),t=e||"javascript",r=(()=>{const s=Fi.find(i=>i.language===t);return s&&s.lessons.length>0?s.lessons[0].code:oS})();return u.jsx("div",{className:"page-shell",children:u.jsx("div",{className:"page-inner max-w-3xl",children:u.jsx(aS,{text:r,windowSize:3,strict:!1})})})},uS=()=>{const e=dg(),[t,n]=w.useState(ff()),[r,s]=w.useState([]);w.useEffect(()=>{const d=Fi.map(m=>vg(m.language));s(d),n(ff())},[]);const i={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:e?0:.06,delayChildren:e?0:.1}}},a={hidden:{opacity:0,y:e?0:12},visible:{opacity:1,y:0,transition:{duration:e?.15:.4,ease:"easeOut"}}},o=d=>d>=80?"from-emerald-500 to-emerald-600":d>=60?"from-cyan-500 to-cyan-600":d>=40?"from-amber-500 to-amber-600":"from-rose-500 to-rose-600",l=d=>{const m=Fi.find(g=>g.language===d);return(m==null?void 0:m.languageName)||d},c=t.totalLessonsCompleted===0,f=t.totalLessonsCompleted>=1||t.totalLessonsCompleted>=5||t.totalWpm>=30||t.totalAccuracy>=95||t.languagesPracticed.length>=3||t.totalTimeSpent>=3600;return u.jsxs(D.div,{className:"space-y-8 md:space-y-10",variants:i,initial:"hidden",animate:"visible",children:[c&&u.jsxs(D.div,{className:"empty-state-panel flex flex-col items-center border-solid text-center",variants:a,children:[u.jsx(Ak,{className:"h-10 w-10 text-neon-blue","aria-hidden":!0}),u.jsx("h2",{className:"heading-section mt-4 text-ink",children:"Start your first lesson"}),u.jsx("p",{className:"body-prose mt-2 max-w-lg text-ink-subtle",children:"When you complete lessons, your WPM, accuracy, and time practiced will show up here. Pick a language to begin."}),u.jsx(ee,{to:"/languages",className:"btn-primary mx-auto mt-6 inline-flex min-h-[44px] w-full max-w-xs justify-center sm:w-auto",children:"Choose a language"})]}),u.jsxs(D.section,{variants:a,"aria-labelledby":"stats-overview-heading",children:[u.jsx("h2",{id:"stats-overview-heading",className:"sr-only",children:"Overview"}),u.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4",children:[u.jsxs("div",{className:"stat-slab",children:[u.jsx("div",{className:"stat-slab__icon",children:u.jsx(pl,{className:"h-5 w-5","aria-hidden":!0})}),u.jsx("div",{className:"text-2xl font-bold tabular-nums text-ink sm:text-3xl",children:t.totalWpm}),u.jsx("div",{className:"caption mt-1 text-ink-subtle",children:"Avg. WPM"})]}),u.jsxs("div",{className:"stat-slab",children:[u.jsx("div",{className:"stat-slab__icon stat-slab__icon--muted",children:u.jsx(ur,{className:"h-5 w-5","aria-hidden":!0})}),u.jsxs("div",{className:"text-2xl font-bold tabular-nums text-ink sm:text-3xl",children:[t.totalAccuracy,"%"]}),u.jsx("div",{className:"caption mt-1 text-ink-subtle",children:"Avg. accuracy"})]}),u.jsxs("div",{className:"stat-slab",children:[u.jsx("div",{className:"stat-slab__icon",children:u.jsx(lr,{className:"h-5 w-5","aria-hidden":!0})}),u.jsxs("div",{className:"text-2xl font-bold tabular-nums text-ink sm:text-3xl",children:[Math.round(t.totalTimeSpent/60),"m"]}),u.jsx("div",{className:"caption mt-1 text-ink-subtle",children:"Total time"})]}),u.jsxs("div",{className:"stat-slab",children:[u.jsx("div",{className:"stat-slab__icon stat-slab__icon--muted",children:u.jsx(hl,{className:"h-5 w-5","aria-hidden":!0})}),u.jsx("div",{className:"text-2xl font-bold tabular-nums text-ink sm:text-3xl",children:t.totalLessonsCompleted}),u.jsx("div",{className:"caption mt-1 text-ink-subtle",children:"Lessons completed"})]})]})]}),u.jsxs(D.section,{className:"rounded-card border border-dark-border/90 bg-gradient-to-b from-dark-surface/40 to-dark-card p-5 shadow-card sm:p-6 md:p-8",variants:a,"aria-labelledby":"stats-languages-heading",children:[u.jsxs("div",{className:"mb-6 flex flex-wrap items-center gap-3 border-b border-dark-border/60 pb-5",children:[u.jsx(fl,{className:"h-6 w-6 shrink-0 text-neon-blue","aria-hidden":!0}),u.jsx("h2",{id:"stats-languages-heading",className:"text-xl font-bold tracking-tight text-ink md:text-2xl",children:"Language progress"})]}),u.jsx("ul",{className:"divide-y divide-dark-border/50",children:r.map((d,m)=>{const g=d.totalLessons>0?Math.round(d.completedLessons/d.totalLessons*100):0,v=l(d.language);return u.jsxs(D.li,{className:"py-6 first:pt-0 last:pb-0",initial:e?!1:{opacity:0,x:-8},animate:{opacity:1,x:0},transition:{duration:.35,delay:e?0:m*.05},children:[u.jsxs("div",{className:"flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6",children:[u.jsxs("div",{className:"min-w-0 flex-1",children:[u.jsxs("div",{className:"flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3",children:[u.jsx("h3",{className:"text-lg font-semibold text-ink",children:v}),u.jsxs("span",{className:"text-sm tabular-nums text-ink-subtle",children:[d.completedLessons,"/",d.totalLessons," lessons"]})]}),d.lastPracticed&&u.jsxs("p",{className:"caption mt-2 text-ink-subtle",children:["Last practiced ",d.lastPracticed.toLocaleDateString(void 0,{dateStyle:"medium"})]})]}),u.jsxs("div",{className:"shrink-0 text-left sm:text-right",children:[u.jsxs("p",{className:"text-lg font-bold tabular-nums text-ink",children:[g,"%"]}),u.jsxs("p",{className:"caption text-ink-subtle",children:[d.averageWpm," WPM · ",d.averageAccuracy,"% acc."]})]})]}),u.jsx("div",{className:"mt-4 h-3 w-full overflow-hidden rounded-full bg-dark-surface ring-1 ring-dark-border/80",role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":g,"aria-label":`${v}: ${g}% of lessons completed`,children:u.jsx(D.div,{className:`h-full rounded-full bg-gradient-to-r ${o(g)}`,initial:e?!1:{width:0},animate:{width:`${g}%`},transition:{duration:e?.2:.85,delay:e?0:m*.04,ease:"easeOut"}})}),u.jsx("div",{className:"mt-3",children:u.jsxs(ee,{to:`/languages/${d.language}/lessons`,className:"inline-flex min-h-[44px] items-center text-sm font-medium text-neon-blue transition-colors hover:text-cyan-200",children:["Open ",v," lessons →"]})})]},d.language)})})]}),u.jsxs(D.section,{className:"rounded-card border border-dark-border/90 bg-gradient-to-b from-dark-surface/40 to-dark-card p-5 shadow-card sm:p-6 md:p-8",variants:a,"aria-labelledby":"stats-achievements-heading",children:[u.jsxs("div",{className:"mb-6 flex flex-wrap items-center gap-3 border-b border-dark-border/60 pb-5",children:[u.jsx(to,{className:"h-6 w-6 shrink-0 text-neon-purple","aria-hidden":!0}),u.jsx("h2",{id:"stats-achievements-heading",className:"text-xl font-bold tracking-tight text-ink md:text-2xl",children:"Achievements"})]}),f?u.jsxs("ul",{className:"grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",children:[t.totalLessonsCompleted>=1&&u.jsxs("li",{className:"flex items-start gap-3 rounded-btn border border-emerald-500/35 bg-emerald-500/10 p-4",children:[u.jsx(hl,{className:"mt-0.5 h-6 w-6 shrink-0 text-emerald-400","aria-hidden":!0}),u.jsxs("div",{children:[u.jsx("div",{className:"text-sm font-semibold text-ink",children:"First steps"}),u.jsx("div",{className:"caption mt-0.5 text-ink-subtle",children:"Complete your first lesson"})]})]}),t.totalLessonsCompleted>=5&&u.jsxs("li",{className:"flex items-start gap-3 rounded-btn border border-neon-blue/35 bg-neon-blue/10 p-4",children:[u.jsx(to,{className:"mt-0.5 h-6 w-6 shrink-0 text-neon-blue","aria-hidden":!0}),u.jsxs("div",{children:[u.jsx("div",{className:"text-sm font-semibold text-ink",children:"Getting started"}),u.jsx("div",{className:"caption mt-0.5 text-ink-subtle",children:"Complete 5 lessons"})]})]}),t.totalWpm>=30&&u.jsxs("li",{className:"flex items-start gap-3 rounded-btn border border-amber-500/35 bg-amber-500/10 p-4",children:[u.jsx(pl,{className:"mt-0.5 h-6 w-6 shrink-0 text-amber-300","aria-hidden":!0}),u.jsxs("div",{children:[u.jsx("div",{className:"text-sm font-semibold text-ink",children:"Speed demon"}),u.jsx("div",{className:"caption mt-0.5 text-ink-subtle",children:"Reach 30+ WPM average"})]})]}),t.totalAccuracy>=95&&u.jsxs("li",{className:"flex items-start gap-3 rounded-btn border border-neon-purple/35 bg-neon-purple/10 p-4",children:[u.jsx(ur,{className:"mt-0.5 h-6 w-6 shrink-0 text-neon-purple","aria-hidden":!0}),u.jsxs("div",{children:[u.jsx("div",{className:"text-sm font-semibold text-ink",children:"Precision master"}),u.jsx("div",{className:"caption mt-0.5 text-ink-subtle",children:"Reach 95%+ accuracy"})]})]}),t.languagesPracticed.length>=3&&u.jsxs("li",{className:"flex items-start gap-3 rounded-btn border border-rose-500/35 bg-rose-500/10 p-4",children:[u.jsx(fl,{className:"mt-0.5 h-6 w-6 shrink-0 text-rose-300","aria-hidden":!0}),u.jsxs("div",{children:[u.jsx("div",{className:"text-sm font-semibold text-ink",children:"Polyglot"}),u.jsx("div",{className:"caption mt-0.5 text-ink-subtle",children:"Practice 3+ languages"})]})]}),t.totalTimeSpent>=3600&&u.jsxs("li",{className:"flex items-start gap-3 rounded-btn border border-indigo-500/35 bg-indigo-500/10 p-4",children:[u.jsx(lr,{className:"mt-0.5 h-6 w-6 shrink-0 text-indigo-300","aria-hidden":!0}),u.jsxs("div",{children:[u.jsx("div",{className:"text-sm font-semibold text-ink",children:"Dedicated learner"}),u.jsx("div",{className:"caption mt-0.5 text-ink-subtle",children:"Practice 1+ hours total"})]})]})]}):u.jsxs("div",{className:"empty-state-panel border-solid py-10",children:[u.jsx(to,{className:"mx-auto h-9 w-9 text-ink-faint",strokeWidth:1.25,"aria-hidden":!0}),u.jsx("p",{className:"body-prose mx-auto mt-4 max-w-md text-ink-muted",children:"Complete lessons and hit milestones to unlock achievements. Your first one appears after you finish a lesson."}),u.jsx(ee,{to:"/languages",className:"btn-secondary mx-auto mt-6 inline-flex min-h-[44px] justify-center px-6",children:"Go to languages"})]})]})]})},cS=()=>{const e=w.useRef(null),[t,n]=w.useState(()=>vn().length>0);w.useEffect(()=>{n(vn().length>0)},[]);const r=()=>{vn().length!==0&&Yk()},s=a=>{var l;const o=(l=a.target.files)==null?void 0:l[0];if(o){const c=new FileReader;c.onload=f=>{var g;const d=(g=f.target)==null?void 0:g.result;Kk(d)?(alert("Stats imported successfully!"),window.location.reload()):alert("Failed to import stats. Please check the file format.")},c.readAsText(o)}a.target.value=""},i=()=>{confirm("Are you sure you want to clear all your stats? This action cannot be undone.")&&($k(),alert("Stats cleared successfully!"),window.location.reload())};return u.jsx(D.div,{className:"page-shell",initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.35,ease:"easeOut"},children:u.jsxs("div",{className:"page-inner",children:[u.jsx("header",{className:"mb-8 space-y-6 lg:mb-10",children:u.jsxs("div",{className:"flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8",children:[u.jsxs("div",{className:"min-w-0 space-y-4",children:[u.jsxs(ee,{to:"/languages",className:"btn-secondary inline-flex w-fit max-w-full items-center text-sm sm:text-base",children:[u.jsx(fa,{className:"mr-2 h-4 w-4 shrink-0","aria-hidden":!0}),"Back to languages"]}),u.jsxs("div",{children:[u.jsxs("h1",{className:"heading-page text-balance text-ink",children:["Your ",u.jsx("span",{className:"text-gradient",children:"Progress"})]}),u.jsx("div",{className:"section-rule ml-0 mr-auto mt-4 w-16 sm:mt-5","aria-hidden":!0}),u.jsx("p",{className:"body-lead mt-4 max-w-2xl text-ink-subtle sm:mt-5",children:"Track lessons completed, speed, and accuracy. Data stays in your browser unless you export it."})]})]}),u.jsxs("div",{className:"flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:max-w-md lg:flex-col xl:max-w-none xl:flex-row xl:flex-wrap xl:justify-end",role:"toolbar","aria-label":"Stats actions",children:[u.jsxs("div",{className:"flex w-full flex-col gap-1 sm:w-auto sm:min-w-[8.5rem]",children:[u.jsxs("button",{type:"button",onClick:r,disabled:!t,title:t?"Download a JSON file with your summary and session history":"Complete a lesson first to export stats",className:"btn-secondary inline-flex min-h-[44px] w-full items-center justify-center disabled:pointer-events-none disabled:opacity-45",children:[u.jsx(bk,{className:"mr-2 h-4 w-4 shrink-0","aria-hidden":!0}),"Export stats"]}),!t&&u.jsx("p",{className:"text-center text-xs text-ink-subtle sm:text-left",children:"No saved sessions yet — finish a lesson to enable export."})]}),u.jsxs("button",{type:"button",onClick:()=>{var a;return(a=e.current)==null?void 0:a.click()},className:"btn-secondary inline-flex min-h-[44px] w-full items-center justify-center sm:w-auto sm:min-w-[8.5rem]",children:[u.jsx(gg,{className:"mr-2 h-4 w-4 shrink-0","aria-hidden":!0}),"Import"]}),u.jsx("input",{ref:e,type:"file",accept:".json,application/json",className:"sr-only","aria-label":"Choose a CodeRush stats JSON file to import",onChange:s}),u.jsxs("button",{type:"button",onClick:i,className:"btn-danger inline-flex min-h-[44px] w-full items-center justify-center sm:w-auto sm:min-w-[8.5rem]",children:[u.jsx(Dk,{className:"mr-2 h-4 w-4 shrink-0","aria-hidden":!0}),"Clear all"]})]})]})}),u.jsx(uS,{})]})})},dS=()=>{const e={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.2,delayChildren:.3}}},t={hidden:{opacity:0,y:30},visible:{opacity:1,y:0,transition:{duration:.6,ease:"easeOut"}}},n=[{icon:u.jsx(cs,{className:"w-8 h-8"}),title:"Real-World Code",description:"Practice with actual code snippets from popular open-source projects and common programming patterns."},{icon:u.jsx(yg,{className:"w-8 h-8"}),title:"Community Driven",description:"Built by developers, for developers. Contribute your own code snippets to help others learn."},{icon:u.jsx(Sk,{className:"w-8 h-8"}),title:"Open Source",description:"Completely free and open source. Help us improve CodeRush by contributing to the project."}],r=[{number:"1000+",label:"Code Snippets"},{number:"15+",label:"Languages"},{number:"50+",label:"Contributors"},{number:"10K+",label:"Practice Sessions"}];return u.jsx(D.div,{className:"page-shell",variants:e,initial:"hidden",animate:"visible",children:u.jsxs("div",{className:"page-inner",children:[u.jsxs(D.div,{className:"section-head max-w-4xl md:mx-auto",variants:t,children:[u.jsxs("h1",{className:"heading-page mb-0 px-2",children:["About ",u.jsx("span",{className:"text-gradient",children:"CodeRush"})]}),u.jsx("div",{className:"section-rule","aria-hidden":!0}),u.jsx("p",{className:"body-lead mx-auto mt-5 max-w-3xl text-ink-subtle md:mt-6",children:"CodeRush is an open-source typing practice platform designed specifically for developers who want to improve their coding speed and accuracy. We believe that typing code efficiently is a crucial skill that can significantly boost your productivity as a developer."})]}),u.jsxs(D.div,{className:"card mb-16 p-8 text-center md:p-10",variants:t,children:[u.jsx("h2",{className:"heading-section mb-6",children:"Our Mission"}),u.jsx("p",{className:"body-prose mx-auto max-w-4xl text-ink-muted md:text-lg",children:"To help developers master the art of coding by providing a platform where they can practice typing real-world code snippets. We focus on building muscle memory for common programming patterns, syntax, and structures across multiple programming languages."})]}),u.jsx(D.div,{className:"section-divide mb-16 grid auto-rows-fr gap-6 sm:gap-8 md:grid-cols-3",variants:t,children:n.map((s,i)=>u.jsxs("div",{className:"group feature-card h-full",children:[u.jsx("div",{className:"feature-card__icon [&_svg]:h-7 [&_svg]:w-7",children:s.icon}),u.jsx("h3",{className:"feature-card__title",children:s.title}),u.jsx("p",{className:"feature-card__body",children:s.description})]},i))}),u.jsxs(D.div,{className:"card mb-16 p-8 md:p-10",variants:t,children:[u.jsx("h2",{className:"heading-section mb-2 text-center",children:"By the Numbers"}),u.jsx("div",{className:"section-rule mx-auto mb-10","aria-hidden":!0}),u.jsx("div",{className:"grid grid-cols-2 gap-8 gap-y-10 md:grid-cols-4 md:gap-10",children:r.map((s,i)=>u.jsxs("div",{className:"text-center",children:[u.jsx("div",{className:"mb-2 text-4xl font-bold text-gradient",children:s.number}),u.jsx("div",{className:"caption",children:s.label})]},i))})]}),u.jsxs(D.div,{className:"section-divide mb-16 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14",variants:t,children:[u.jsxs("div",{children:[u.jsx("h2",{className:"heading-section mb-2",children:"Why CodeRush?"}),u.jsx("div",{className:"section-rule ml-0 mr-auto mb-8 w-14","aria-hidden":!0}),u.jsxs("div",{className:"space-y-6",children:[u.jsxs("div",{children:[u.jsx("h3",{className:"mb-2 text-xl font-semibold text-neon-blue",children:"Real Code Practice"}),u.jsx("p",{className:"body-prose text-ink-subtle",children:"Unlike traditional typing tests, CodeRush uses actual code snippets from real projects, helping you build muscle memory for programming syntax and patterns."})]}),u.jsxs("div",{children:[u.jsx("h3",{className:"mb-2 text-xl font-semibold text-neon-purple",children:"Multiple Languages"}),u.jsx("p",{className:"body-prose text-ink-subtle",children:"Practice with Python, JavaScript, TypeScript, Go, Rust, and many more languages. Each language has its own unique syntax and patterns to master."})]}),u.jsxs("div",{children:[u.jsx("h3",{className:"mb-2 text-xl font-semibold text-neon-blue",children:"Progress Tracking"}),u.jsx("p",{className:"body-prose text-ink-subtle",children:"Monitor your improvement with detailed statistics including typing speed, accuracy, and progress over time."})]})]})]}),u.jsxs("div",{className:"highlight-panel lg:sticky lg:top-24",children:[u.jsx("h3",{className:"mb-4 text-xl font-bold tracking-tight text-ink md:text-2xl",children:"Get Involved"}),u.jsx("p",{className:"body-prose mb-6 text-ink-muted",children:"CodeRush is an open-source project that thrives on community contributions. Whether you're a beginner or an experienced developer, there are many ways to contribute."}),u.jsxs("div",{className:"space-y-4",children:[u.jsxs("button",{className:"btn-primary w-full flex items-center justify-center",children:[u.jsx(pg,{className:"w-5 h-5 mr-2"}),"View on GitHub"]}),u.jsxs("button",{className:"btn-secondary w-full flex items-center justify-center",children:[u.jsx(Lk,{className:"w-5 h-5 mr-2"}),"Star the Project"]})]})]})]}),u.jsx(D.div,{className:"section-divide text-center",variants:t,children:u.jsxs("div",{className:"cta-panel cta-panel-accent",children:[u.jsxs("h2",{className:"heading-section mb-4 px-2 pt-1",children:["Ready to Start Your ",u.jsx("span",{className:"text-gradient",children:"Coding Journey"}),"?"]}),u.jsx("p",{className:"body-prose mx-auto mb-8 max-w-2xl text-ink-muted md:text-lg",children:"Join thousands of developers who are already improving their coding skills with CodeRush. Start practicing today and see the difference in your productivity."}),u.jsxs("div",{className:"cta-panel__actions",children:[u.jsx(ee,{to:"/languages",className:"btn-primary justify-center px-8 py-3.5 text-base sm:min-w-[11rem] sm:text-lg",children:"Choose Your Language"}),u.jsx(ee,{to:"/faq",className:"btn-secondary justify-center px-8 py-3.5 text-base sm:min-w-[11rem] sm:text-lg",children:"View FAQ"})]})]})})]})})},fS=()=>{const[e,t]=w.useState([0]),n=[{id:0,question:"What is CodeRush?",answer:"CodeRush is a typing practice platform specifically designed for developers. Unlike traditional typing tests that use random text, CodeRush uses real code snippets from popular programming languages. This helps developers build muscle memory for programming syntax, improve their coding speed, and enhance their overall productivity when writing code.",icon:u.jsx(lf,{className:"w-6 h-6"})},{id:1,question:"How does it work?",answer:"CodeRush presents you with real code snippets from various programming languages. You type the code exactly as shown, and the platform tracks your typing speed, accuracy, and progress over time. The system provides immediate feedback on your performance and helps you identify areas for improvement. You can practice with different difficulty levels and various programming languages to build comprehensive coding skills.",icon:u.jsx(cs,{className:"w-6 h-6"})},{id:2,question:"Can I contribute code snippets?",answer:"Absolutely! CodeRush is an open-source project that welcomes contributions from the developer community. You can contribute code snippets by submitting pull requests to our GitHub repository. We're always looking for high-quality, real-world code examples that can help other developers improve their typing skills. Check out our contribution guidelines on GitHub to get started.",icon:u.jsx(yg,{className:"w-6 h-6"})},{id:3,question:"Which programming languages are supported?",answer:"CodeRush currently supports Python, JavaScript, TypeScript, Go, Rust, Java, C++, and many more popular programming languages. We're constantly adding new languages based on community demand. Each language includes various difficulty levels and real-world code patterns to help you master the syntax and common programming structures.",icon:u.jsx(ds,{className:"w-6 h-6"})},{id:4,question:"Is CodeRush free to use?",answer:"Yes, CodeRush is completely free and open-source! We believe that learning and improving coding skills should be accessible to everyone. The platform is funded by community donations and sponsorships. All features are available at no cost, and we're committed to keeping it that way.",icon:u.jsx(lf,{className:"w-6 h-6"})},{id:5,question:"How can I track my progress?",answer:"CodeRush provides detailed statistics including your typing speed (WPM), accuracy percentage, time spent practicing, and progress over time. You can view your performance history, identify your strengths and weaknesses, and set personal goals. The platform also offers achievements and milestones to keep you motivated on your coding journey.",icon:u.jsx(ds,{className:"w-6 h-6"})}],r=a=>{t(o=>o.includes(a)?o.filter(l=>l!==a):[...o,a])},s={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.1,delayChildren:.2}}},i={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.5,ease:"easeOut"}}};return u.jsx(D.div,{className:"page-shell",variants:s,initial:"hidden",animate:"visible",children:u.jsxs("div",{className:"page-inner-narrow",children:[u.jsxs(D.div,{className:"section-head max-w-3xl md:mx-auto",variants:i,children:[u.jsxs("h1",{className:"heading-page mb-0 px-2",children:["Frequently Asked ",u.jsx("span",{className:"text-gradient",children:"Questions"})]}),u.jsx("div",{className:"section-rule","aria-hidden":!0}),u.jsx("p",{className:"body-lead mx-auto mt-5 max-w-2xl text-ink-subtle md:mt-6",children:"Everything you need to know about CodeRush and how to get the most out of your coding practice."})]}),u.jsx(D.div,{className:"space-y-3 sm:space-y-4",variants:i,children:n.map(a=>u.jsxs(D.div,{className:"accordion-card",children:[u.jsx("button",{type:"button",onClick:()=>r(a.id),className:"focus-ring w-full px-5 py-5 text-left sm:px-6 sm:py-5",children:u.jsxs("div",{className:"flex items-start justify-between gap-4",children:[u.jsxs("div",{className:"flex min-w-0 flex-1 items-start gap-4",children:[u.jsx("div",{className:"mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-neon-blue/25 bg-neon-blue/[0.08] text-neon-blue [&_svg]:h-5 [&_svg]:w-5",children:a.icon}),u.jsx("h3",{className:"text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl",children:a.question})]}),u.jsx(D.div,{animate:{rotate:e.includes(a.id)?180:0},transition:{duration:.25},className:"mt-1 shrink-0 text-ink-subtle",children:u.jsx(xk,{className:"h-5 w-5 sm:h-6 sm:w-6"})})]})}),u.jsx(Iu,{children:e.includes(a.id)&&u.jsx(D.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.3,ease:"easeInOut"},className:"overflow-hidden",children:u.jsx("div",{className:"border-t border-dark-border/80 px-5 pb-5 sm:px-6 sm:pb-6",children:u.jsx("div",{className:"pt-4",children:u.jsx("p",{className:"body-prose pl-[3.75rem] text-ink-muted sm:pl-16",children:a.answer})})})})})]},a.id))}),u.jsx(D.div,{className:"section-divide text-center",variants:i,children:u.jsxs("div",{className:"cta-panel cta-panel-accent",children:[u.jsx("h2",{className:"heading-section mb-4 px-2 pt-1",children:"Still Have Questions?"}),u.jsx("p",{className:"body-prose mx-auto mb-8 max-w-2xl text-ink-muted",children:"Can't find the answer you're looking for? We'd love to hear from you! Reach out to us through our GitHub repository or join our community discussions."}),u.jsxs("div",{className:"cta-panel__actions",children:[u.jsx("button",{type:"button",className:"btn-primary justify-center px-8 py-3.5 text-base sm:min-w-[10rem] sm:text-lg",children:"Visit GitHub"}),u.jsx("button",{type:"button",className:"btn-secondary justify-center px-8 py-3.5 text-base sm:min-w-[10rem] sm:text-lg",children:"Join Community"})]})]})})]})})},mS=()=>{const e=dg();return u.jsx(D.div,{className:"page-shell flex items-center justify-center",initial:{opacity:0,y:e?0:12},animate:{opacity:1,y:0},transition:{duration:e?.15:.4,ease:"easeOut"},children:u.jsxs("div",{className:"mx-auto max-w-md px-2 text-center",children:[u.jsx(D.div,{className:"mb-6 text-8xl font-bold text-gradient",animate:e?void 0:{scale:[1,1.06,1]},transition:e?void 0:{duration:2.5,repeat:1/0,ease:"easeInOut"},children:"404"}),u.jsx("h1",{className:"heading-section mb-4",children:"Page Not Found"}),u.jsx("p",{className:"body-prose mb-8 text-ink-subtle",children:"The page you're looking for doesn't exist or has been moved."}),u.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[u.jsxs(ee,{to:"/",className:"btn-primary flex min-h-[44px] items-center justify-center",children:[u.jsx(Ck,{className:"w-4 h-4 mr-2"}),"Go Home"]}),u.jsxs("button",{type:"button",onClick:()=>window.history.back(),className:"btn-secondary flex min-h-[44px] items-center justify-center",children:[u.jsx(fa,{className:"w-4 h-4 mr-2"}),"Go Back"]})]})]})})},pS=()=>{const[e,t]=w.useState([]);return w.useEffect(()=>{(()=>{const r=[];for(let s=0;s<50;s++)r.push({id:s,x:Math.random()*100,y:Math.random()*100,size:Math.random()*3+1,delay:Math.random()*6});t(r)})()},[]),u.jsxs("div",{className:"fixed inset-0 pointer-events-none overflow-hidden",children:[e.map(n=>u.jsx(D.div,{className:"absolute rounded-full bg-neon-blue opacity-20",style:{left:`${n.x}%`,top:`${n.y}%`,width:`${n.size}px`,height:`${n.size}px`},animate:{y:[0,-20,0],opacity:[.2,.5,.2]},transition:{duration:6,delay:n.delay,repeat:1/0,ease:"easeInOut"}},n.id)),u.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-neon-purple/5"})]})},hS=[{href:"https://eskinder.dev/",label:"Portfolio website (opens in a new tab)",short:"Portfolio",icon:kk},{href:"mailto:eskinderkassahun25@gmail.com",label:"Email eskinderkassahun25@gmail.com",short:"Email",icon:Pk},{href:"https://www.linkedin.com/in/eskinder-kassahun/",label:"LinkedIn profile (opens in a new tab)",short:"LinkedIn",icon:jk},{href:"https://github.com/Eskinder185",label:"GitHub profile (opens in a new tab)",short:"GitHub",icon:pg}],gS=()=>u.jsx("footer",{className:"mt-auto border-t border-dark-border/80 bg-dark-bg/85 backdrop-blur-md",role:"contentinfo",children:u.jsx("div",{className:"mx-auto max-w-page px-4 py-8 sm:px-6 lg:px-8",children:u.jsxs("div",{className:"flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between",children:[u.jsxs("div",{className:"max-w-md text-center sm:text-left",children:[u.jsx("p",{className:"text-xs font-semibold uppercase tracking-widest text-ink-subtle",children:"Creator"}),u.jsx("p",{className:"mt-1 text-sm text-ink-muted",children:"Built by Eskinder Kassahun — portfolio, email, and social links below."})]}),u.jsx("nav",{"aria-label":"Creator contact and social links",children:u.jsx("ul",{className:"flex flex-wrap items-center justify-center gap-2 sm:justify-end",children:hS.map(({href:e,label:t,short:n,icon:r})=>{const s=e.startsWith("http");return u.jsx("li",{children:u.jsxs("a",{href:e,className:"inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-dark-border/70 bg-dark-card/40 px-3 py-2 text-ink-muted transition-colors hover:border-neon-blue/40 hover:bg-neon-blue/10 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg sm:min-w-0 sm:px-4","aria-label":t,...s?{target:"_blank",rel:"noopener noreferrer"}:{},children:[u.jsx(r,{className:"h-5 w-5 shrink-0","aria-hidden":!0}),u.jsx("span",{className:"hidden text-sm font-medium sm:inline",children:n})]})},e)})})})]})})});class yS extends w.Component{constructor(){super(...arguments);Ou(this,"state",{hasError:!1})}static getDerivedStateFromError(n){return{hasError:!0,error:n}}componentDidCatch(n,r){console.error("Uncaught error:",n,r)}render(){return this.state.hasError?u.jsx("div",{className:"min-h-screen flex items-center justify-center bg-dark-bg px-4",children:u.jsxs("div",{className:"text-center max-w-md",children:[u.jsx(fg,{className:"w-16 h-16 text-red-500 mx-auto mb-4"}),u.jsx("h1",{className:"mb-4 text-2xl font-bold text-ink",children:"Oops! Something went wrong"}),u.jsx("p",{className:"body-prose mb-6 text-ink-subtle",children:"We're sorry, but something unexpected happened. Please try refreshing the page."}),u.jsxs("button",{onClick:()=>window.location.reload(),className:"btn-primary flex items-center mx-auto",children:[u.jsx(gg,{className:"w-4 h-4 mr-2"}),"Refresh Page"]})]})}):this.props.children}}function vS(){return w.useEffect(()=>{const t=window.location;if(t.pathname.includes("/CodeRush/")&&t.search.includes("?/")){const n=t.search.slice(t.search.indexOf("?/")+2);t.replace(t.protocol+"//"+t.hostname+(t.port?":"+t.port:"")+t.pathname.split("/").slice(0,1).join("/")+"/"+n.replace(/~and~/g,"&")+t.hash)}},[]),u.jsx(yS,{children:u.jsx(Q0,{basename:"/CodeRush",future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:u.jsxs("div",{className:"flex min-h-screen flex-col bg-dark-bg text-ink",children:[u.jsx(pS,{}),u.jsx(Vk,{}),u.jsx("div",{className:"flex min-h-0 flex-1 flex-col",children:u.jsx(Iu,{mode:"wait",children:u.jsxs($0,{children:[u.jsx(Je,{path:"/",element:u.jsx(df,{})}),u.jsx(Je,{path:"",element:u.jsx(df,{})}),u.jsx(Je,{path:"/languages",element:u.jsx(Ok,{})}),u.jsx(Je,{path:"/languages/:language/lessons",element:u.jsx(qk,{})}),u.jsx(Je,{path:"/languages/:language/lesson/:lessonId",element:u.jsx(iS,{})}),u.jsx(Je,{path:"/languages/:language/practice",element:u.jsx(lS,{})}),u.jsx(Je,{path:"/stats",element:u.jsx(cS,{})}),u.jsx(Je,{path:"/about",element:u.jsx(dS,{})}),u.jsx(Je,{path:"/faq",element:u.jsx(fS,{})}),u.jsx(Je,{path:"*",element:u.jsx(mS,{})})]})})}),u.jsx(gS,{})]})})})}ro.createRoot(document.getElementById("root")).render(u.jsx(Bi.StrictMode,{children:u.jsx(vS,{})}));

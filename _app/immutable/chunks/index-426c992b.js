function q(){}function H(t,n){for(const e in n)t[e]=n[e];return t}function B(t){return t()}function C(){return Object.create(null)}function p(t){t.forEach(B)}function I(t){return typeof t=="function"}function ot(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let g;function ut(t,n){return g||(g=document.createElement("a")),g.href=n,t===g.href}function G(t){return Object.keys(t).length===0}function at(t,n,e,i){if(t){const c=L(t,n,e,i);return t[0](c)}}function L(t,n,e,i){return t[1]&&i?H(e.ctx.slice(),t[1](i(n))):e.ctx}function st(t,n,e,i){if(t[2]&&i){const c=t[2](i(e));if(n.dirty===void 0)return c;if(typeof c=="object"){const a=[],l=Math.max(n.dirty.length,c.length);for(let o=0;o<l;o+=1)a[o]=n.dirty[o]|c[o];return a}return n.dirty|c}return n.dirty}function ft(t,n,e,i,c,a){if(c){const l=L(n,e,i,a);t.p(l,c)}}function _t(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}let $=!1;function J(){$=!0}function K(){$=!1}function Q(t,n,e,i){for(;t<n;){const c=t+(n-t>>1);e(c)<=i?t=c+1:n=c}return t}function R(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let u=0;u<n.length;u++){const f=n[u];f.claim_order!==void 0&&r.push(f)}n=r}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let c=0;for(let r=0;r<n.length;r++){const u=n[r].claim_order,f=(c>0&&n[e[c]].claim_order<=u?c+1:Q(1,c,y=>n[e[y]].claim_order,u))-1;i[r]=e[f]+1;const s=f+1;e[s]=r,c=Math.max(s,c)}const a=[],l=[];let o=n.length-1;for(let r=e[c]+1;r!=0;r=i[r-1]){for(a.push(n[r-1]);o>=r;o--)l.push(n[o]);o--}for(;o>=0;o--)l.push(n[o]);a.reverse(),l.sort((r,u)=>r.claim_order-u.claim_order);for(let r=0,u=0;r<l.length;r++){for(;u<a.length&&l[r].claim_order>=a[u].claim_order;)u++;const f=u<a.length?a[u]:null;t.insertBefore(l[r],f)}}function U(t,n){if($){for(R(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function dt(t,n,e){$&&!e?U(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function W(t){t.parentNode.removeChild(t)}function ht(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function V(t){return document.createElement(t)}function X(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function N(t){return document.createTextNode(t)}function mt(){return N(" ")}function pt(){return N("")}function yt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function Y(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function gt(t,n,e){n in t?t[n]=typeof t[n]=="boolean"&&e===""?!0:e:Y(t,n,e)}function xt(t,n,e){t.setAttributeNS("http://www.w3.org/1999/xlink",n,e)}function Z(t){return Array.from(t.childNodes)}function tt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function O(t,n,e,i,c=!1){tt(t);const a=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const o=t[l];if(n(o)){const r=e(o);return r===void 0?t.splice(l,1):t[l]=r,c||(t.claim_info.last_index=l),o}}for(let l=t.claim_info.last_index-1;l>=0;l--){const o=t[l];if(n(o)){const r=e(o);return r===void 0?t.splice(l,1):t[l]=r,c?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,o}}return i()})();return a.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,a}function P(t,n,e,i){return O(t,c=>c.nodeName===n,c=>{const a=[];for(let l=0;l<c.attributes.length;l++){const o=c.attributes[l];e[o.name]||a.push(o.name)}a.forEach(l=>c.removeAttribute(l))},()=>i(n))}function bt(t,n,e){return P(t,n,e,V)}function wt(t,n,e){return P(t,n,e,X)}function nt(t,n){return O(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>N(n),!0)}function $t(t){return nt(t," ")}function Et(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function kt(t,n){t.value=n==null?"":n}function vt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}let m;function h(t){m=t}function S(){if(!m)throw new Error("Function called outside component initialization");return m}function Nt(t){S().$$.on_mount.push(t)}function St(t){S().$$.after_update.push(t)}function jt(t,n){return S().$$.context.set(t,n),n}const d=[],M=[],b=[],T=[],z=Promise.resolve();let k=!1;function D(){k||(k=!0,z.then(F))}function At(){return D(),z}function v(t){b.push(t)}const E=new Set;let x=0;function F(){const t=m;do{for(;x<d.length;){const n=d[x];x++,h(n),et(n.$$)}for(h(null),d.length=0,x=0;M.length;)M.pop()();for(let n=0;n<b.length;n+=1){const e=b[n];E.has(e)||(E.add(e),e())}b.length=0}while(d.length);for(;T.length;)T.pop()();k=!1,E.clear(),h(t)}function et(t){if(t.fragment!==null){t.update(),p(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(v)}}const w=new Set;let _;function Ct(){_={r:0,c:[],p:_}}function Mt(){_.r||p(_.c),_=_.p}function it(t,n){t&&t.i&&(w.delete(t),t.i(n))}function Tt(t,n,e,i){if(t&&t.o){if(w.has(t))return;w.add(t),_.c.push(()=>{w.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}}function qt(t,n){const e={},i={},c={$$scope:1};let a=t.length;for(;a--;){const l=t[a],o=n[a];if(o){for(const r in l)r in o||(i[r]=1);for(const r in o)c[r]||(e[r]=o[r],c[r]=1);t[a]=o}else for(const r in l)c[r]=1}for(const l in i)l in e||(e[l]=void 0);return e}function Bt(t){return typeof t=="object"&&t!==null?t:{}}function Lt(t){t&&t.c()}function Ot(t,n){t&&t.l(n)}function rt(t,n,e,i){const{fragment:c,on_mount:a,on_destroy:l,after_update:o}=t.$$;c&&c.m(n,e),i||v(()=>{const r=a.map(B).filter(I);l?l.push(...r):p(r),t.$$.on_mount=[]}),o.forEach(v)}function ct(t,n){const e=t.$$;e.fragment!==null&&(p(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function lt(t,n){t.$$.dirty[0]===-1&&(d.push(t),D(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Pt(t,n,e,i,c,a,l,o=[-1]){const r=m;h(t);const u=t.$$={fragment:null,ctx:null,props:a,update:q,not_equal:c,bound:C(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(r?r.$$.context:[])),callbacks:C(),dirty:o,skip_bound:!1,root:n.target||r.$$.root};l&&l(u.root);let f=!1;if(u.ctx=e?e(t,n.props||{},(s,y,...j)=>{const A=j.length?j[0]:y;return u.ctx&&c(u.ctx[s],u.ctx[s]=A)&&(!u.skip_bound&&u.bound[s]&&u.bound[s](A),f&&lt(t,s)),y}):[],u.update(),f=!0,p(u.before_update),u.fragment=i?i(u.ctx):!1,n.target){if(n.hydrate){J();const s=Z(n.target);u.fragment&&u.fragment.l(s),s.forEach(W)}else u.fragment&&u.fragment.c();n.intro&&it(t.$$.fragment),rt(t,n.target,n.anchor,n.customElement),K(),F()}h(r)}class zt{$destroy(){ct(this,1),this.$destroy=q}$on(n,e){const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const c=i.indexOf(e);c!==-1&&i.splice(c,1)}}$set(n){this.$$set&&!G(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{qt as A,Bt as B,ct as C,H as D,At as E,at as F,ft as G,_t as H,st as I,U as J,yt as K,ht as L,gt as M,ut as N,X as O,wt as P,p as Q,M as R,zt as S,xt as T,kt as U,Z as a,Y as b,bt as c,W as d,V as e,vt as f,dt as g,nt as h,Pt as i,Et as j,mt as k,pt as l,$t as m,q as n,Ct as o,Tt as p,Mt as q,it as r,ot as s,N as t,jt as u,St as v,Nt as w,Lt as x,Ot as y,rt as z};

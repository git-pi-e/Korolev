import{S as $,i as j,s as x,e as m,t as z,k as y,c as p,a as g,h as D,m as b,d,b as u,f as E,g as w,J as _,K as I,L as A,M as L,v as q}from"../../chunks/vendor-1a8de27c.js";import{l as k}from"../../chunks/routes-9e8875f5.js";function M(c,e,n){const r=c.slice();return r[3]=e[n],r[5]=n,r}function S(c){let e,n=c[3][0]+"",r,i,o,v;return{c(){e=m("a"),r=z(n),i=y(),this.h()},l(a){e=p(a,"A",{"sveltekit:prefetch":!0,class:!0,href:!0,style:!0});var t=g(e);r=D(t,n),i=b(t),t.forEach(d),this.h()},h(){u(e,"sveltekit:prefetch",""),u(e,"class",o="li "+(c[3][1]===c[0]?"active":"")+" svelte-l8h0uf"),u(e,"href",v=c[3][1]),E(e,"animation-delay",c[5]/20+"s")},m(a,t){w(a,e,t),_(e,r),_(e,i)},p(a,t){t&1&&o!==(o="li "+(a[3][1]===a[0]?"active":"")+" svelte-l8h0uf")&&u(e,"class",o)},d(a){a&&d(e)}}}function B(c){let e,n,r,i,o,v,a=c[1],t=[];for(let s=0;s<a.length;s+=1)t[s]=S(M(c,a,s));return{c(){e=m("details"),n=m("summary"),r=y(),i=m("div");for(let s=0;s<t.length;s+=1)t[s].c();this.h()},l(s){e=p(s,"DETAILS",{id:!0,class:!0});var h=g(e);n=p(h,"SUMMARY",{class:!0,style:!0}),g(n).forEach(d),r=b(h),i=p(h,"DIV",{class:!0,onclick:!0});var l=g(i);for(let f=0;f<t.length;f+=1)t[f].l(l);l.forEach(d),h.forEach(d),this.h()},h(){u(n,"class","po-rel svelte-l8h0uf"),E(n,"z-index","9999"),u(i,"class","ul blur w-100 h-100 tx-c po-fix svelte-l8h0uf"),u(i,"onclick","this.parentElement.removeAttribute('open')"),u(e,"id","nav"),u(e,"class","po-stx z-5 svelte-l8h0uf")},m(s,h){w(s,e,h),_(e,n),_(e,r),_(e,i);for(let l=0;l<t.length;l+=1)t[l].m(i,null);o||(v=I(e,"click",c[2]),o=!0)},p(s,[h]){if(h&3){a=s[1];let l;for(l=0;l<a.length;l+=1){const f=M(s,a,l);t[l]?t[l].p(f,h):(t[l]=S(f),t[l].c(),t[l].m(i,null))}for(;l<t.length;l+=1)t[l].d(1);t.length=a.length}},i:A,o:A,d(s){s&&d(e),L(t,s),o=!1,v()}}}function C(c,e,n){let r;const i=[...Object.entries(k.internal),["Education",k.web.educelestia],["Blog",k.content.blog]],o=()=>n(0,r=window.location.pathname);return q(o),[r,i,o]}class K extends ${constructor(e){super();j(this,e,C,B,x,{})}}export{K as default};

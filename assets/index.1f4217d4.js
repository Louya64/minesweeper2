import{d as B,c as x,o as f,a as h,b as l,t as w,n as W,u as v,e as $,r as p,w as E,f as A,F as T,g as D,h as K,i as M,v as k,p as O,j as H,k as J,l as y,m as Q}from"./vendor.1973bc7a.js";const X=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&e(u)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}};X();var Y="https://louya64.github.io/minesweeper-vue/assets/croix.ac73a50d.png";var G=(n,r)=>{const s=n.__vccOpts||n;for(const[e,t]of r)s[e]=t;return s};const Z=["id"],C={key:0,class:"hidden"},R={key:1,class:"flag"},ee={key:2,class:"isTheLoosingBomb",width:"35",src:Y,alt:"dfg"},se=B({props:{content:null},setup(n){const r=n,s=x(()=>r.content.visible),e=x(()=>r.content.flag),t=x(()=>r.content.loosingBomb),o=x(()=>{switch(r.content.value){case 0:return"zero";case 1:return"one";case 2:return"two";case 3:return"three";case 4:return"four";case 5:return"five";case 6:return"six";case 7:return"seven";case 8:return"eight";case 10:return"bomb";default:return"unknown"}});return(u,d)=>(f(),h("div",{class:"cell",id:n.content.row.toString()+"-"+n.content.col.toString()},[l("div",{class:W(v(o))},w(n.content.value),3),v(s)?$("",!0):(f(),h("div",C)),v(e)?(f(),h("div",R,"!")):$("",!0),v(t)?(f(),h("img",ee)):$("",!0)],8,Z))}});var te=G(se,[["__scopeId","data-v-2255714b"]]);function S(n,r){let s=[];for(let e=0;e<n;e++){s.push([]);for(let t=0;t<r;t++)s[e].push({value:0,visible:!1,flag:!1,row:e,col:t,loosingBomb:!1})}return s}function N(n,r,s,e){let t=[];return s!==0&&(e!==0&&t.push({row:s-1,col:e-1}),t.push({row:s-1,col:e}),e!==r-1&&t.push({row:s-1,col:e+1})),e!==0&&t.push({row:s,col:e-1}),e!==r-1&&t.push({row:s,col:e+1}),s!==n-1&&(e!==0&&t.push({row:s+1,col:e-1}),t.push({row:s+1,col:e}),e!==r-1&&t.push({row:s+1,col:e+1})),t}function oe(n,r,s,e){if(e>r*s){alert("il y a plus de bombes que de cases");return}n.map(t=>t.map(o=>(o.value=0,o.visible=!1,o.flag=!1,o.loosingBomb=!1)));for(let t=0;t<e;t++){const o=Math.floor(Math.random()*r),u=Math.floor(Math.random()*s);n[o][u].value===10&&t--,n[o][u].value=10}return n.map(t=>t.map(o=>{o.value===10&&N(r,s,o.row,o.col).map(u=>{n[u.row][u.col].value!==10&&n[u.row][u.col].value++})})),n}const ae={class:"row"},ne=B({props:{rows:null,cols:null,mines:null,fill:{type:Boolean},flags:null},emits:["flagUpdate","endGame"],setup(n,{emit:r}){const s=n;let e=p(S(s.rows,s.cols));const t=x(()=>s.rows*s.cols-s.mines);let o=0;E(()=>s.fill,a=>{a&&(oe(e.value,s.rows,s.cols,s.mines),o=0)}),E(()=>s.rows,a=>{e.value=S(a,s.cols)}),E(()=>s.cols,a=>{e.value=S(s.rows,a)});const u=a=>{if(!a.flag&&!a.visible){if(a.visible=!0,a.value===10){a.loosingBomb=!0,e.value.map(c=>c.map(i=>{i.value===10&&!i.flag&&(i.visible=!0)})),r("endGame"),setTimeout(()=>alert("game over"),150);return}else o++;a.value===0&&N(s.rows,s.cols,a.row,a.col).map(c=>{e.value[c.row][c.col].visible||u(e.value[c.row][c.col])}),o===t.value&&(e.value.map(c=>c.map(i=>{i.flag||(i.visible=!0)})),r("endGame"),setTimeout(()=>alert("wiiin"),150))}},d=a=>{if(!s.flags)return;a.flag=!a.flag;const c=a.flag?-1:1;r("flagUpdate",c)},b=a=>{if(!a.visible||a.flag)return;let c=0;N(s.rows,s.cols,a.row,a.col).map(i=>{e.value[i.row][i.col].flag&&c++}),c===a.value&&N(s.rows,s.cols,a.row,a.col).map(i=>{e.value[i.row][i.col].visible||u(e.value[i.row][i.col])})};return(a,c)=>(f(!0),h(T,null,A(v(e).length,(i,_)=>(f(),h("div",ae,[(f(!0),h(T,null,A(v(e)[0].length,(F,m)=>(f(),D(te,{content:{value:v(e)[_][m].value,visible:v(e)[_][m].visible,row:v(e)[_][m].row,col:v(e)[_][m].col,flag:v(e)[_][m].flag,loosingBomb:v(e)[_][m].loosingBomb},onClick:I=>u(v(e)[_][m]),onContextmenu:K(I=>d(v(e)[_][m]),["prevent"]),onDblclick:I=>b(v(e)[_][m])},null,8,["content","onClick","onContextmenu","onDblclick"]))),256))]))),256))}});const L=n=>(O("data-v-d9fc758c"),n=n(),H(),n),le={class:"setting"},re={class:"settingsItem"},ue=L(()=>l("label",{for:"width"},"Changer la hauteur",-1)),ie={class:"settingsItem"},ce=L(()=>l("label",{for:"height"},"Changer la largeur",-1)),ve={class:"settingsItem"},de=L(()=>l("label",{for:"bombs"},"Changer les bombes",-1)),pe=B({emits:["newRows","newCols","newNbMines"],setup(n,{emit:r}){const s=p(9),e=p(9),t=p(10);return E(()=>s.value,o=>{r("newRows",o)}),E(()=>e.value,o=>{r("newCols",o)}),E(()=>t.value,o=>{r("newNbMines",o)}),(o,u)=>(f(),h("div",le,[l("div",re,[ue,M(l("input",{type:"number",id:"width","onUpdate:modelValue":u[0]||(u[0]=d=>s.value=d)},null,512),[[k,s.value]])]),l("div",ie,[ce,M(l("input",{type:"number",id:"height","onUpdate:modelValue":u[1]||(u[1]=d=>e.value=d)},null,512),[[k,e.value]])]),l("div",ve,[de,M(l("input",{type:"number",id:"bombs","onUpdate:modelValue":u[2]||(u[2]=d=>t.value=d)},null,512),[[k,t.value]])])]))}});var fe=G(pe,[["__scopeId","data-v-d9fc758c"]]);const j=n=>(O("data-v-18991ea4"),n=n(),H(),n),_e=j(()=>l("h1",null,"D\xE9mineur",-1)),me=y(" Click sur le petit bonhomme jaune pour d\xE9marrer une partie "),ge={class:"mainWrapper"},he={key:0,class:"rulesContainer"},be=j(()=>l("h2",null,"R\xE8gles du jeu",-1)),we=j(()=>l("p",{class:"rules"},[y(" * Le but du jeu est de d\xE9couvrir toutes les cases sans tomber sur une bombe"),l("br"),l("br"),y(' * Un click gauche sur une case "cach\xE9e" r\xE9v\xE8le son contenu '),l("br"),y(' * Un click droit sur une case "cach\xE9e" permet de d\xE9poser un drapeau'),l("br"),y(" * Un double click sur une case d\xE9couverte, si le nombre de drapeaux d\xE9pos\xE9e sur les cases adjacentes correspond au contenu de cette case, r\xE9v\xE8le les cases adjacentes"),l("br"),y(" * Le timer ... ne sert \xE0 rien mais il compte ^^"),l("br"),l("br"),y(" **** Click sur le petit bonhomme jaune pour d\xE9marrer une partie ")],-1)),ye=[be,we],Ee={class:"gameContainer"},xe={class:"gameHeader"},$e={class:"gameHeaderItem"},Ie={class:"icon"},Ne={class:"gameHeaderItem"},Be={id:"gameGrid"},Me=B({setup(n){const r=p(":)"),s=p(10),e=p(0),t=p(9),o=p(9),u=p(!1),d=p(!1),b=p(!1),a=p(s.value),c=()=>{b.value&&(b.value=!1),d.value=!d.value},i=()=>{d.value&&(d.value=!1),b.value=!b.value},_=g=>{t.value=g},F=g=>{o.value=g},m=g=>{s.value=g},I=g=>{a.value+=g};E(()=>s.value,g=>a.value=g);const q=()=>{u.value=!1,a.value=s.value,V(),setTimeout(()=>(u.value=!0,P()),150)},z=()=>{V()};let U;const P=()=>{e.value=0,U=setInterval(()=>e.value++,1e3)},V=()=>{clearInterval(U)};return(g,Se)=>(f(),h(T,null,[l("header",null,[_e,me,l("button",{class:"rulesBtn btn",onClick:i},"R\xE8gles du jeu"),l("button",{class:"settingsBtn btn",onClick:c},"R\xE9glages")]),l("div",ge,[b.value?(f(),h("div",he,ye)):$("",!0),d.value?(f(),D(fe,{key:1,onNewRows:_,onNewCols:F,onNewNbMines:m})):$("",!0),l("div",Ee,[l("div",xe,[l("div",$e,[l("span",null,w(a.value<100?"0":"")+w(a.value),1)]),l("div",{onClick:q,class:"gameHeaderItem"},[l("p",Ie,w(r.value),1)]),l("div",Ne,w(e.value<100?"0":"")+w(e.value<10?"0":"")+w(e.value),1)]),l("div",Be,[J(ne,{onFlagUpdate:I,onEndGame:z,rows:t.value,cols:o.value,mines:s.value,fill:u.value,flags:a.value},null,8,["rows","cols","mines","fill","flags"])])])])],64))}});var ke=G(Me,[["__scopeId","data-v-18991ea4"]]);Q(ke).mount("#app");
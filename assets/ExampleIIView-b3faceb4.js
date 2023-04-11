import{d as x,r as y,f as V,o as d,h as _,F as k,i as T,a as e,n as w,t as $,l as I,x as A,b as C,e as B,g as L,u as r,_ as S,C as u,c as M,w as m,V as P,y as E,z,A as D,p as b,q as g,B as F}from"./index-1886e7ec.js";const H=["id"],N=["id"],O=["data-bs-target","aria-controls","onClick"],W=["id","aria-labelledby","data-bs-parent"],q={class:"accordion-body"},j=x({__name:"VAccordion",props:{accordions:{default:()=>[]},initial:{default:null}},setup(a){const o=a,t=y(),l=y();function s(){t.value=`acc_${Math.random().toString().replace(".","_")}`,l.value=o.initial}function h(v){l.value===v?l.value=null:l.value=v}return V(s),(v,n)=>(d(),_("div",{id:t.value,class:"accordion"},[(d(!0),_(k,null,T(a.accordions,(c,p)=>(d(),_("div",{key:p,class:"accordion-item"},[e("h2",{id:`heading${p}_${c.id}`,class:"accordion-header"},[e("button",{class:w(["accordion-button",{collapsed:l.value!==c.id}]),type:"button","data-bs-toggle":"collapse","data-bs-target":`#${c.id}`,"aria-expanded":"true","aria-controls":c.id,onClick:i=>h(c.id)},$(c.label),11,O)],8,N),e("div",{id:c.id,class:w(["accordion-collapse",{collapse:l.value!==c.id}]),"aria-labelledby":`heading${p}_${c.id}`,"data-bs-parent":`#${t.value}`},[e("div",q,[I(v.$slots,c.id)])],10,W)]))),128))],8,H))}}),U={class:"nav nav-tabs",role:"tablist"},G=["href","onClick"],J={id:"myTabContent",class:"tab-content"},K=["id"],Q=x({__name:"VTab",props:{tabs:{default:()=>[]},initial:{default:null}},setup(a){const o=a,t=y("home");function l(h){t.value=h}function s(){o.initial?t.value=o.initial:o.tabs&&o.tabs.length>0&&(t.value=o.tabs[0].id)}return V(s),(h,v)=>(d(),_("div",null,[e("ul",U,[(d(!0),_(k,null,T(a.tabs,(n,c)=>(d(),_("li",{key:c,class:"nav-item",role:"presentation"},[e("a",{class:w(["nav-link",{active:n.id===t.value}]),"data-bs-toggle":"tab",href:`#${n.id}`,"aria-selected":"false",role:"tab",tabindex:"-1",onClick:A(p=>l(n.id),["prevent"])},$(n.label),11,G)]))),128))]),e("div",J,[(d(!0),_(k,null,T(a.tabs,(n,c)=>(d(),_("div",{id:n.id,key:c,class:w(["tab-pane fade",{"active show":t.value===n.id}]),role:"tabpanel"},[I(h.$slots,n.id)],10,K))),128))])]))}}),R={key:0},X={key:1},Y=x({__name:"VAlert",props:{message:{default:null},show:{type:Boolean,default:!1},color:null},emits:["close"],setup(a,{emit:o}){const t=a;let l=y();const s=C(()=>t.show),h=C(()=>`alert-${t.color}`),v=C(()=>s.value?"show":"");function n(){o("close",!1),l.value&&(clearTimeout(l.value),l.value=null)}return B(s,()=>{s.value===!0?l.value=setTimeout(()=>{o("close",!1)},5e3):n()}),L(()=>n()),(c,p)=>(d(),_("div",{class:w(["snackbar shadow position-fixed end-0 alert alert-dismissible",[r(h),r(v)]])},[e("button",{type:"button",class:"btn-close","data-bs-dismiss":"alert",onClick:n}),typeof a.message=="string"?(d(),_("span",R,$(a.message),1)):(d(),_("div",X,[(d(!0),_(k,null,T(a.message,(i,f)=>(d(),_("span",{key:f},$(i),1))),128))]))],2))}});const Z=S(Y,[["__scopeId","data-v-851dca53"]]),ee={class:"card-header"},ae={class:"card-body"},oe={class:"card-title"},se={class:"card-text"},te=x({__name:"VCard",props:{header:{default:"Header"},title:{default:"Title"},text:{default:"Text"},whiteText:{type:Boolean,default:!1},color:{default:u.Secondary}},setup(a){const o=a,t=C(()=>o.color?`bg-${o.color}`:"bg-secondary"),l=C(()=>o.whiteText===!0?"text-white":"");return(s,h)=>(d(),_("div",{class:w(["card custom-card mb-3",[r(t),r(l)]])},[e("div",ee,$(a.header),1),e("div",ae,[e("h4",oe,$(a.title),1),e("p",se,$(a.text),1)])],2))}});const le=a=>(E("data-v-bc0b5fad"),a=a(),z(),a),ne=le(()=>e("div",{class:"container-fluid"},[e("div",{class:"progress"},[e("div",{class:"progress-bar progress-bar-striped progress-bar-animated",role:"progressbar","aria-valuenow":"75","aria-valuemin":"0","aria-valuemax":"100",style:{width:"100%"}})])],-1)),ce=x({__name:"VLoader",props:{show:{type:Boolean,default:!1}},setup(a){return(o,t)=>(d(),M(P,{show:a.show===!0},{default:m(()=>[ne]),_:1},8,["show"]))}});const ie=S(ce,[["__scopeId","data-v-bc0b5fad"]]),re={class:"container"},de=e("p",null,"Exemplo de componentes II - Vários",-1),ue={class:"row"},_e=e("p",{class:"text-justify"},"Texto que será exibido no corpo da modal",-1),he=e("h5",{class:"mt-4"},"Accordion:",-1),be=e("p",null,"accordion 1",-1),ve=e("p",null,"accordion 2",-1),me=e("p",null,"accordion 3",-1),pe=e("h5",{class:"mt-4"},"Tabs:",-1),fe=e("p",null,"Tab 1",-1),ge=e("p",null,"Tab 2",-1),$e=e("p",null,"Tab 3",-1),ye=e("h5",null,"Alert:",-1),we={class:"row"},xe={class:"col"},Ce=e("h5",{class:"mt-4"},"Card:",-1),ke=e("h5",{class:"mt-4"},"Loader:",-1),Ve=x({__name:"ExampleIIView",setup(a){const o=y(!1),t=[{id:"acc1",label:"Item 1"},{id:"acc2",label:"Item 2"},{id:"acc3",label:"Item 3"}],l=[{id:"tab1",label:"Tab 1"},{id:"tab2",label:"Tab2"},{id:"tab3",label:"Tab3"}],s=D({color:u.Secondary,message:"",show:!1});function h(p,i){s.color=p,s.message=i,s.show=!0}function v(){s.color=u.Secondary,s.message="",s.show=!1}const n=y(!1);function c(){n.value=!0,setTimeout(()=>{n.value=!1},2e3)}return(p,i)=>(d(),_("div",re,[b(Z,{color:s.color,message:s.message,show:s.show,onClose:v},null,8,["color","message","show"]),de,e("div",ue,[b(F,{title:"Modal de teste",show:o.value},{body:m(()=>[_e]),footer:m(()=>[b(g,{label:"Fechar",color:r(u).Secondary,onClick:i[0]||(i[0]=f=>o.value=!1)},null,8,["color"])]),_:1},8,["show"]),b(g,{color:r(u).Primary,label:"Toggle modal",onClick:i[1]||(i[1]=f=>o.value=!o.value)},null,8,["color"]),he,b(j,{class:"mt-1",accordions:t,initial:"acc1"},{acc1:m(()=>[be]),acc2:m(()=>[ve]),acc3:m(()=>[me]),_:1}),pe,b(Q,{class:"mb-4",tabs:l,initial:"tab2"},{tab1:m(()=>[fe]),tab2:m(()=>[ge]),tab3:m(()=>[$e]),_:1}),ye,e("div",we,[e("div",xe,[b(g,{color:r(u).Success,label:"Sucesso",onClick:i[2]||(i[2]=f=>h(r(u).Success,"Operação executada com sucesso."))},null,8,["color"]),b(g,{color:r(u).Warning,label:"Atenção",onClick:i[3]||(i[3]=f=>h(r(u).Warning,"Atenção"))},null,8,["color"]),b(g,{color:r(u).Danger,label:"Erro",onClick:i[4]||(i[4]=f=>h(r(u).Danger,"Não foi possível realizar a operação. Por favor tente novamente mais tarde."))},null,8,["color"]),b(g,{color:r(u).Primary,label:"Informações",onClick:i[5]||(i[5]=f=>h(r(u).Primary,["Mensagem de Informação 01","Mensagem de Informação 02","Mensagem de Informação 03"]))},null,8,["color"])])]),Ce,b(te,{header:"Header",title:"Card Title",text:"Card text","white-text":!0,color:r(u).Primary},null,8,["color"]),ke,b(ie,{align:"center",show:n.value},null,8,["show"]),b(g,{color:r(u).Light,label:"Loader",onClick:c},null,8,["color"])])]))}});export{Ve as default};

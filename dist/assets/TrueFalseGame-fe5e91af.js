import{G as l}from"./get_assets-8814068a.js";import{_ as m,o as _,c as u,a as e,t as o,f as i,p,e as h}from"./index-fce9030c.js";const f={name:"TrueFalseGame",data(){return{imageUrl:""}},emits:["play-effect","add-record","next-question"],props:{GameData:{type:Object,required:!0},GameConfig:{type:Object,required:!0},id:{type:String,required:!0}},methods:{CheckAnswer(t){t==this.GameData.Answer?(this.$emit("play-effect","CorrectSound"),this.$emit("add-record",[this.GameData.Answer,t,"正確"]),this.$emit("next-question"),console.log("check answer : True")):(this.$emit("play-effect","WrongSound"),this.$emit("add-record",[this.GameData.Answer,t,"錯誤"]),console.log("check answer : False"))}},created(){this.imageUrl=l(this.id,this.GameData.img)}},c=t=>(p("data-v-e0e340b7"),t=t(),h(),t),b={class:"container d-flex align-items-center justify-content-center"},g={class:"row justify-content-center"},y={class:"col-md-8"},G={class:"card mx-auto"},v={class:"card-body"},x=["src"],k={class:"col-md-4 align-self-center"},w={class:"card row mx-auto mb-3"},C={class:"h3"},A={class:"card-body"},D={class:"d-flex justify-content-center mx-auto d-grid gap-4"},S=c(()=>e("i",{class:"bi bi-circle"},null,-1)),$=c(()=>e("i",{class:"bi bi-x-lg"},null,-1));function T(t,s,n,j,r,a){return _(),u("div",b,[e("div",g,[e("div",y,[e("div",G,[e("div",v,[e("img",{class:"card-img-top GameImg",src:r.imageUrl,alt:"Card image cap"},null,8,x)])])]),e("div",k,[e("div",w,[e("p",C,o(this.GameConfig.GlobalTitle),1),e("div",A,o(n.GameData.Question),1)]),e("div",D,[e("button",{type:"button",class:"btn btn-primary",onClick:s[0]||(s[0]=d=>a.CheckAnswer(!0))},[S,i(" 正確")]),e("button",{type:"button",class:"btn btn-primary",onClick:s[1]||(s[1]=d=>a.CheckAnswer(!1))},[$,i(" 錯誤")])])])])])}const I=m(f,[["render",T],["__scopeId","data-v-e0e340b7"]]);export{I as default};
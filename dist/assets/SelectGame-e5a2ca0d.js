import{l as r,_ as d,o as s,c as o,a as t,t as i,m,q as _,i as h,F as p,j as u,p as f,e as G}from"./index-84cea013.js";import{G as D}from"./get_assets-400025f8.js";import{_ as S}from"./_plugin-vue_export-helper-c27b6911.js";const C={name:"SelectGame",data(){return{imageUrl:"",question:[],SlotComponent:null,comp:null}},props:{GameData:{type:Object,required:!0},GameConfig:{type:Object,required:!0},id:{type:String,required:!0}},methods:{CheckAnswer(e){e==this.GameData.Answer?(this.$emit("play-effect","CorrectSound"),this.$emit("add-record",[this.GameData.Answer,e,"正確"]),this.$emit("next-question"),console.log("check answer : True")):(this.$emit("play-effect","WrongSound"),this.$emit("add-record",[this.GameData.Answer,e,"錯誤"]),console.log("check answer : False"))}},created(){for(var e in this.GameData.Question)this.question.push(this.GameData.Question[e]);if(this.imageUrl=D(this.id,this.GameData.img),this.comp,this.GameData.SlotComponents!=null){let a=this.GameData.SlotComponents[0];this.SlotData=a.Data,this.SlotComponent=a.Name}console.log(this.imageUrl)},components:{ImageContainer:r(()=>d(()=>import("./ImageContainer-a2f08c39.js"),["assets/ImageContainer-a2f08c39.js","assets/get_assets-400025f8.js","assets/_plugin-vue_export-helper-c27b6911.js","assets/index-84cea013.js","assets/index-797b4968.css","assets/ImageContainer-5a16021e.css"]))}},g=e=>(f("data-v-730b1c82"),e=e(),G(),e),v={class:"container"},y={class:"index"},b={class:"h1",style:{"font-weight":"bold"}},k=g(()=>t("br",null,null,-1)),x={class:"Info"},q={key:0,class:""},w={class:"card mx-auto"},A={class:"card-body d-flex justify-content-center"},I={class:"selection"},$={class:"h2"},j={class:"mb-2"},B=["onClick"];function F(e,a,T,E,c,l){return s(),o("div",v,[t("div",y,[t("p",b,i(this.GameConfig.GlobalTitle),1),k,t("div",x,[this.GameData.SlotComponents?(s(),o("div",q,[t("div",w,[t("div",A,[(s(),m(_(this.SlotComponent),{class:"w-100 h-100 GameImg",id:this.id,Data:this.SlotData},null,8,["id","Data"]))])])])):h("",!0),t("div",I,[t("p",$,i(this.GameData.Question_Text),1),(s(!0),o(p,null,u(c.question,n=>(s(),o("div",j,[t("button",{type:"button",onClick:N=>l.CheckAnswer(n)},i(n),9,B)]))),256))])])])])}const V=S(C,[["render",F],["__scopeId","data-v-730b1c82"]]);export{V as default};
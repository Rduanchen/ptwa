import{d as _}from"./vuedraggable.umd-b541afdd.js";import{c as G}from"./cardwithbutton-fb20d6ae.js";import{G as x}from"./get_assets-400025f8.js";import{_ as w}from"./_plugin-vue_export-helper-c27b6911.js";import{r as p,o as l,c,a as s,t as m,b as r,w as f,F as y,j as v}from"./index-84cea013.js";/* empty css                                                                    */const D={name:"ClassifyGame",components:{draggable:_,cardwithbutton:G},emits:["play-effect","add-record","next-level"],props:{GameData:{type:Object,required:!0},GameConfig:{type:Object,required:!0},id:{type:String,required:!0}},data(){return{QuestionWord:"",GroupID:0,Groups:[],Items:[]}},created(){this.QuestionWord=this.GameData.Question[0].Question;for(var e in this.GameData.Answer)this.Groups.push([]);console.log(this.QuestionWord);for(var e=1;e<this.GameData.Question.length;e++){let o={text:this.GameData.Question[e].text,img:x(this.id,this.GameData.Question[e].img),alt:this.GameData.Question[e].alt};console.log(o.img),this.Items.push(o)}},methods:{CheckAnswer(){var e=0;for(var t in this.Groups){if(this.Groups[t].length!=this.GameData.Answer[t].Items.length){console.log("ClassifyGame CheckAnswer :Wrong"),this.$emit("play-effect","WrongSound"),this.$emit("add-record",[this.Groups[t],this.GameData.Answer[t].Items,"錯誤"]),console.log("here");return}for(var o in this.Groups[t])this.GameData.Answer[t].Items.includes(this.Groups[t][o].text)&&e++;if(console.log(e),e!=this.GameData.Answer[t].Items.length){console.log("ClassifyGame CheckAnswer :Wrong"),this.$emit("play-effect","WrongSound"),this.$emit("add-record",[this.Groups[t],this.GameData.Answer[t].Items,"錯誤"]),console.log("there");return}e=0,this.$emit("add-record",[this.Groups[t],this.GameData.Answer[t].Items,"正確"]),this.$emit("play-effect","CorrectSound"),this.$emit("next-question")}}}},b={class:"container"},C={class:"d-flex flex-row justify-content-center"},A={class:"class h1 align-self-center"},I={class:"row justify-content-between d-flex flex-row align-items-stretch justify-content-center"},Q={class:"col-6 align-content-between"},k={class:"h2"},j={class:"col-6"},T={class:"row"},W={class:"row"};function $(e,t,o,S,i,g){const u=p("cardwithbutton"),d=p("draggable");return l(),c("div",b,[s("div",C,[s("p",A,m(i.QuestionWord),1)]),s("div",I,[s("div",Q,[s("p",k,m(this.GameData.Question[0].InitBox),1),r(d,{list:this.Items,"item-key":"id",sort:!1,group:"SelectItem",style:{width:"100%","min-height":"75%"},class:"card d-flex flex-row justify-content-center flex-wrap col-12 col-md-6 col-lg-4"},{item:f(({element:a})=>[r(u,{imageURL:a.img,Text:a.text,altText:a.alt,class:"mx-auto my-2"},null,8,["imageURL","Text","altText"])]),_:1},8,["list"])]),s("div",j,[(l(!0),c(y,null,v(i.Groups,(a,h)=>(l(),c("div",null,[s("h1",null,m(this.GameData.Answer[h].GroupName),1),s("div",T,[r(d,{list:i.Groups[h],"item-key":"id",sort:!1,group:"SelectItem",class:"card d-flex flex-row justify-content-center flex-wrap"},{item:f(({element:n})=>[r(u,{imageURL:n.img,Text:n.text,altText:n.alt,class:"mx-auto my-2"},null,8,["imageURL","Text","altText"])]),_:2},1032,["list"])])]))),256))]),s("div",W,[s("button",{type:"button",class:"btn btn-primary m-3",onClick:t[0]||(t[0]=a=>g.CheckAnswer())},"送出答案")])])])}const N=w(D,[["render",$]]);export{N as default};
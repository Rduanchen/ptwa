import{d as u}from"./vuedraggable.umd-249233aa.js";import{_ as l}from"./_plugin-vue_export-helper-c27b6911.js";import{r as p,o as h,c as d,a as s,t as i,b as _,w as m,p as b,e as w}from"./index-9351c4e1.js";const f={name:"SortGame",components:{draggable:u},props:{question:{type:Object,required:!0},answer:{type:Array,required:!0}},data(){return{QuestionWord:"",options:[]}},created(){if(this.QuestionWord=this.question.text,this.question.randomswitch==!0){var t=this.CheckAnswer();do this.question.options.sort(()=>Math.random()-.5),t=this.CheckAnswer();while(t==!0)}for(var e in this.question.options)this.options.push(this.question.options[e])},methods:{CheckAnswer(){var t=!0;for(var e in this.answer)this.answer[e]!=this.options[e]&&(t=!1);return t==!0?(console.log("SortGame ChenckAnswer: Right"),this.$emit("check-answer",!0),!0):(console.log("SortGame ChenckAnswer: Wrong"),this.$emit("check-answer",!1),!1)}}},o=t=>(b("data-v-390d8eca"),t=t(),w(),t),g={class:"container"},k=o(()=>s("hr",null,null,-1)),v={type:"button",class:"btn btn-primary m-1 my-btn"},y=o(()=>s("br",null,null,-1)),S=o(()=>s("hr",null,null,-1));function C(t,e,q,A,n,a){const c=p("draggable");return h(),d("div",g,[s("h1",null,i(n.QuestionWord),1),k,_(c,{list:n.options,group:"Sentense"},{item:m(({element:r})=>[s("button",v,i(r),1)]),_:1},8,["list"]),y,S,s("button",{type:"button",class:"btn btn-primary btn-lg btn-block",onClick:e[0]||(e[0]=r=>a.CheckAnswer())},"Submit")])}const W=l(f,[["render",C],["__scopeId","data-v-390d8eca"]]);export{W as default};
import{_ as n,a as l,b as m,c as d,d as g,e as p,f as u,g as b,h as v,i as h,j as f}from"./cover_story-396db36e.js";import{_ as S,a as G,b as P,c as y,d as w,e as k,f as x}from"./description-52f6e5ba.js";import{o as j,c as C,a as e,t as q,f as a,p as F,e as I}from"./index-76d147a3.js";import{_ as T}from"./_plugin-vue_export-helper-c27b6911.js";const U={name:"TrueFalseGame",data(){return{imageUrl:""}},props:{imgsrc:{type:String,required:!0},question:{type:String,required:!0},answer:{type:Boolean,required:!0}},methods:{CheckAnswer(s){console.log(s),console.log(typeof this.answer),s==this.answer?(this.$emit("check-answer",!0),console.log("check answer : True")):(this.$emit("check-answer",!0),console.log("check answer : False"))}},created(){this.imageUrl=new URL(Object.assign({"../../assets/GamePic/Cat.png":n,"../../assets/GamePic/FindItemGameSample1.jpg":l,"../../assets/GamePic/NumberningGameSample.png":m,"../../assets/GamePic/Source/S_1.png":S,"../../assets/GamePic/Source/S_2.png":G,"../../assets/GamePic/Source/S_3.png":P,"../../assets/GamePic/Source/S_4.png":y,"../../assets/GamePic/Source/S_5.png":w,"../../assets/GamePic/Source/S_6.png":k,"../../assets/GamePic/Source/correct.mp3":d,"../../assets/GamePic/Source/description.png":x,"../../assets/GamePic/Source/description2.png":g,"../../assets/GamePic/Source/fire.png":p,"../../assets/GamePic/Source/harry.mp3":u,"../../assets/GamePic/Source/imcorrect.mp3":b,"../../assets/GamePic/cover_info.jpeg":v,"../../assets/GamePic/cover_info.png":h,"../../assets/GamePic/cover_story.png":f})[`../../assets/GamePic/${this.imgsrc}`],self.location).href,console.log(this.imageUrl)}},o=s=>(F("data-v-24c25cd0"),s=s(),I(),s),$={class:"container d-flex align-items-center justify-content-center"},B={class:"row justify-content-center"},A={class:"col-md-8"},N={class:"card mx-auto"},V={class:"card-body"},D=["src"],E={class:"col-md-4 align-self-center"},L={class:"card row mx-auto mb-3"},O={class:"card-body"},R={class:"d-flex justify-content-center mx-auto d-grid gap-4"},z=o(()=>e("i",{class:"bi bi-circle"},null,-1)),H=o(()=>e("i",{class:"bi bi-x-lg"},null,-1));function J(s,t,c,K,i,_){return j(),C("div",$,[e("div",B,[e("div",A,[e("div",N,[e("div",V,[e("img",{class:"card-img-top",src:i.imageUrl,alt:"Card image cap"},null,8,D)])])]),e("div",E,[e("div",L,[e("div",O,q(c.question),1)]),e("div",R,[e("button",{type:"button",class:"btn btn-primary",onClick:t[0]||(t[0]=r=>_.CheckAnswer(!0))},[z,a(" 正確")]),e("button",{type:"button",class:"btn btn-primary",onClick:t[1]||(t[1]=r=>_.CheckAnswer(!1))},[H,a(" 錯誤")])])])])])}const Y=T(U,[["render",J],["__scopeId","data-v-24c25cd0"]]);export{Y as default};
import{_ as h}from"./_plugin-vue_export-helper-c27b6911.js";import{o as l,c as d,a as r,t as c,p as f,e as p}from"./index-4d742f7d.js";const _={props:{Data:{type:Object,required:!0}},data(){return{colors:Array(this.Data.Mother).fill(null),childScore:this.Data.Child,motherScore:this.Data.Mother,division:this.Data.Mother,centerX:0,centerY:0,radius:0,AnswerRecord:Array(this.Data.Mother).fill(!1)}},mounted(){this.resizeCanvas(),window.addEventListener("resize",this.resizeCanvas),this.drawPieChart(),this.AnswerRecord=[]},beforeDestroy(){window.removeEventListener("resize",this.resizeCanvas)},methods:{resizeCanvas(){const e=this.$refs.container,t=this.$refs.canvas;let s=Math.min(e.clientWidth,e.clientHeight);s=s*.8,t.width=s,t.height=s,this.centerX=s/2,this.centerY=s/2,this.radius=s/2-2,this.drawPieChart()},drawPieChart(){const e=this.$refs.canvas,t=e.getContext("2d");t.clearRect(0,0,e.width,e.height),t.fillStyle="white",t.lineWidth=3,t.fillRect(0,0,e.width,e.height);const s=2*Math.PI/this.division;for(let i=0;i<this.division;i++)t.beginPath(),t.moveTo(this.centerX,this.centerY),t.arc(this.centerX,this.centerY,this.radius,i*s,(i+1)*s),t.closePath(),t.fillStyle=this.colors[i]?this.colors[i]:"white",t.fill(),t.stroke()},getSegmentIndex(e,t){const s=e-this.centerX,i=t-this.centerY,a=Math.atan2(i,s),n=a>=0?a:2*Math.PI+a;return Math.floor(n/(2*Math.PI/this.division))},handleClick(e){const s=this.$refs.canvas.getBoundingClientRect(),i=e.clientX-s.left,a=e.clientY-s.top,n=this.getSegmentIndex(i,a);this.AnswerRecord[n]=!this.AnswerRecord[n],this.colors[n]=this.colors[n]?null:`hsl(${Math.random()*360}, 100%, 50%)`,this.drawPieChart(),this.ReplyAnswer()},ReplyAnswer(){let e=0;this.AnswerRecord.forEach(t=>{t==!0&&(e+=1)}),e==this.childScore?this.$emit("ReplyAnswer",!0):this.$emit("ReplyAnswer",!1)}}},v=e=>(f("data-v-bccf7179"),e=e(),p(),e),u={class:"OutterContainer"},w={class:"Division"},C={class:"Child"},m=v(()=>r("hr",{class:"Fraction-line"},null,-1)),g={class:"Mother"},y={class:"container",ref:"container"};function S(e,t,s,i,a,n){return l(),d("div",u,[r("div",w,[r("p",C,c(this.childScore),1),m,r("p",g,c(this.motherScore),1)]),r("p",null,c(this.Data.Unit),1),r("div",y,[r("canvas",{ref:"canvas",onClick:t[0]||(t[0]=(...o)=>n.handleClick&&n.handleClick(...o))},null,512)],512)])}const R=h(_,[["render",S],["__scopeId","data-v-bccf7179"]]);export{R as default};
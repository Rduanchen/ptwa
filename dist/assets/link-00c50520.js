import{$ as w}from"./jquery-e7e446c0.js";import{_ as m}from"./_plugin-vue_export-helper-c27b6911.js";import{o as D,c as v,a as u,p as f,e as R}from"./index-84cea013.js";const d="/ptwa/assets/Cat-9f44bc9d.png";const W={name:"Link",data(){return{Min_border:10,Min_RowGap:30,Min_ImgWidth:300,RWD_Img_Width:null,RWD_Gap_Width:null,TouchSensitive:1,DotRadius:7,isDrawing:!1,paths:[],ontouch_group:0,DotLocation:[],OnclickLocation:[],QuestionDataStructure:[["assets/GamePic/Cat.png","assets/GamePic/Cat.png","assets/GamePic/Cat.png"],["assets/GamePic/Cat.png","assets/GamePic/Cat.png","assets/GamePic/Cat.png","assets/GamePic/Cat.png","assets/GamePic/Cat.png"],["assets/GamePic/Cat.png","assets/GamePic/Cat.png"]],ans:[[[0,0],[1,0]],[[0,1],[1,2]],[[0,2],[1,1]]]}},mounted(){const t=w("#responsive-bg")[0],e=t.getContext("2d");t.width=window.innerWidth,t.height=window.innerHeight,e.clearRect(0,0,t.width,t.height);let i=this.CountRWDWidth(this.QuestionDataStructure);this.RWD_Img_Width=i.Img_width,this.RWD_Gap_Width=i.Gap_width,this.DrawImgOnCanvas(this.QuestionDataStructure,e),window.addEventListener("resize",()=>{e.clearRect(0,0,t.width,t.height),t.width=window.innerWidth,t.height=window.innerHeight;let s=this.CountRWDWidth(this.QuestionDataStructure);this.RWD_Img_Width=s.Img_width,this.RWD_Gap_Width=s.Gap_width,this.DrawImgOnCanvas(this.QuestionDataStructure,e)}),this.Runtimes=0,this.TotalAmount=3,this.canvas=this.$refs.line_keeper,this.context=this.canvas.getContext("2d"),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.canvas.addEventListener("mousedown",this.handleMouseDown),this.canvas.addEventListener("mousemove",this.handleMouseMove),this.canvas.addEventListener("mouseup",this.handleMouseUp),this.canvas.addEventListener("touchstart",this.handleTouchStart),this.canvas.addEventListener("touchmove",this.handleTouchMove),this.canvas.addEventListener("touchend",this.handleTouchEnd)},methods:{CountRWDWidth(t){let e=t.length,i=parseInt((window.innerWidth-this.Min_border*2)/(e*2+(e-1)*3));return{Img_width:i*2,Gap_width:i*3}},CountMaxImgSize(t){let e=(window.innerHeight-this.Min_border*2)/t,i=this.RWD_Img_Width;return{Max_Height:e,Max_Width:i}},ResizeRWDImg(t,e){let i,s,h=e.height/e.width;return i=t.Max_Height,s=t.Max_Height/h,s>t.Max_Width&&(s=t.Max_Width,i=t.Max_Width*h),{New_Height:i,New_Width:s}},CountRWDYGap(t){let e=0,i=this.CountMaxImgSize(t.length);for(var s in t){let h=new Image;h.src=d;let n=this.ResizeRWDImg(i,h);e+=n.New_Height}return(window.innerHeight-this.Min_border*2-e)/(t.length+1)},async DrawImgOnCanvas(t,e){let i=t.length,s=0;this.Group=1,this.DotLocation=[];for(let h=0;h<t.length;h++){const n=this.CountMaxImgSize(this.QuestionDataStructure[h].length);let g=this.CountRWDYGap(t[h]);for(let c=0;c<t[h].length;c++){let l=new Image,p=d;l.src=p;let a=this.ResizeRWDImg(n,l),o=this.Min_border+n.Max_Width*h+this.RWD_Gap_Width*h,r=this.Min_border+g+n.Max_Height*c;await new Promise(_=>l.onload=_),e.drawImage(l,o,r,a.New_Width,a.New_Height),e.beginPath(),h==0?(e.arc(o+a.New_Width+this.Min_border,r+a.New_Height/2,this.DotRadius,0,Math.PI*2,!0),this.DotLocation.push([[c,s,this.Group],[o+a.New_Width+this.Min_border,r+a.New_Height/2]]),e.fillStyle="black",e.fill()):h==i-1?(e.arc(o-this.Min_border,r+a.New_Height/2,this.DotRadius,0,Math.PI*2,!0),this.DotLocation.push([[c,s,this.Group],[o-this.Min_border,r+a.New_Height/2]]),e.fillStyle="black",e.fill()):(e.arc(o+a.New_Width+this.Min_border,r+a.New_Height/2,this.DotRadius,0,Math.PI*2,!0),this.DotLocation.push([[c,s+1,this.Group+1],[o+a.New_Width+this.Min_border,r+a.New_Height/2]]),e.arc(o-this.Min_border,r+a.New_Height/2,this.DotRadius,0,Math.PI*2,!0),this.DotLocation.push([[c,s,this.Group],[o-this.Min_border,r+a.New_Height/2]]),e.fillStyle="black",e.fill()),e.closePath()}s+=1,h!=0&&(this.Group++,s+=1)}},getEventPos(t){const e=this.canvas.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}},handleMouseDown(t){var e=this.JudgeRange(t.clientX,t.clientY);if(this.column=e.ColumnID,this.ontouch_group=e.Group,e.Locate&&!this.isDrawing){this.isDrawing=!0;const i=this.getEventPos(t);this.paths.push({startX:i.x,startY:i.y}),this.OnclickLocation=[e.ColumnID,e.RowID]}},handleMouseMove(t){if(this.isDrawing){const e=this.getEventPos(t);this.paths[this.paths.length-1].currentX=e.x,this.paths[this.paths.length-1].currentY=e.y,this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawPaths()}},handleMouseUp(t){var e=this.JudgeRange(t.clientX,t.clientY),i=this.CheckAnswer(this.OnclickLocation[0],this.OnclickLocation[1],e.ColumnID,e.RowID);if(e.Locate&&this.ontouch_group==e.Group&&this.column!=e.ColumnID&&i){if(this.isDrawing){this.isDrawing=!1;const s=this.getEventPos(t);this.paths[this.paths.length-1].endX=s.x,this.paths[this.paths.length-1].endY=s.y,this.drawPaths()}this.ontouch_group=0}else this.isDrawing=!1,this.clearLastPath()},handleTouchStart(t){var e=this.JudgeRange(t.touches[0].clientX,t.touches[0].clientY);if(this.column=e.ColumnID,this.ontouch_group=e.Group,e.Locate){t.preventDefault(),this.isDrawing=!0;const i=this.getEventPos(t.touches[0]);this.paths.push({startX:i.x,startY:i.y}),this.OnclickLocation=[e.ColumnID,e.RowID]}},handleTouchMove(t){if(this.isDrawing){t.preventDefault();const e=this.getEventPos(t.touches[0]);this.paths[this.paths.length-1].currentX=e.x,this.paths[this.paths.length-1].currentY=e.y,this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawPaths()}},handleTouchEnd(t){var e=this.JudgeRange(t.changedTouches[0].clientX,t.changedTouches[0].clientY),i=this.CheckAnswer(this.OnclickLocation[0],this.OnclickLocation[1],e.ColumnID,e.RowID);if(e.Locate&&this.ontouch_group==e.Group&&this.column!=e.ColumnID&&i){if(this.isDrawing){t.preventDefault(),this.isDrawing=!1;const s=this.getEventPos(t.changedTouches[0]);this.paths[this.paths.length-1].endX=s.x,this.paths[this.paths.length-1].endY=s.y,this.drawPaths(),this.ontouch_group=0}}else this.isDrawing=!1,this.clearLastPath()},drawPaths(){this.paths.forEach(t=>{this.context.beginPath(),this.context.moveTo(t.startX,t.startY),this.context.lineTo(t.currentX,t.currentY),this.context.stroke(),this.context.closePath()})},clearLastPath(){this.paths.pop(),this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawPaths()},JudgeRange(t,e){for(var i=0;i<this.DotLocation.length;i++)if(length=((this.DotLocation[i][1][0]-t)**2+(this.DotLocation[i][1][1]-e)**2)**.5,length<=this.DotRadius)return{Locate:!0,Group:this.DotLocation[i][0][2],RowID:this.DotLocation[i][0][0],ColumnID:this.DotLocation[i][0][1]};return{Locate:!1,Group:void 0}},CheckAnswer(t,e,i,s){let h=!1;for(var n in this.ans)(this.ans[n][0][0]==t&&this.ans[n][0][1]==e&&this.ans[n][1][0]==i&&this.ans[n][1][1]==s||this.ans[n][0][0]==i&&this.ans[n][0][1]==s&&this.ans[n][1][0]==t&&this.ans[n][1][1]==e)&&(h=!0);return h?(console.log("Link Template Return Correct"),this.Runtimes=this.Runtimes+1,this.Runtimes==this.TotalAmount?(this.GameOver(),this.$emit("add-record",[[[t,e],[i,s]],this.ans[n],"正確"])):(this.$emit("play-effect","CorrectSound"),this.$emit("add-record",[[[t,e],[i,s]],this.ans[n],"正確"])),!0):(console.log("Link Template Return Wrong"),this.$emit("play-effect","WrongSound"),this.$emit("add-record",[[[t,e],[i,s]],this.ans[n],"錯誤"]),!1)},GameOver(){console.log("Component 'Link' post GameOver,All Answer Right"),this.$emit("play-effect","CorrectSound"),this.$emit("add-record",["","","全對"]),this.$emit("next-question")}}},C=t=>(f("data-v-7f9fd712"),t=t(),R(),t),I={class:"canvas-container"},P=C(()=>u("canvas",{id:"responsive-bg",class:"position-absolute"},null,-1)),M={ref:"line_keeper",id:"line_keeper",class:"position-absolute"};function L(t,e,i,s,h,n){return D(),v("div",I,[P,u("canvas",M,null,512)])}const x=m(W,[["render",L],["__scopeId","data-v-7f9fd712"]]);export{x as default};
<template>
<div class="container">
<div class="justify-content-center">
    <div class="card mb-2">
        <div class="card-body">
            {{ question.Text }}
        </div>
    </div>
    <canvas id="cvs" class="center" width="800" height="600" style="border: 1px solid #000" v-on:click="judge_position($event)"></canvas>
    <p class="h4">尚未被找到的:</p>
    <div class="d-flex flex-row  flex-wrap">
      <button v-for="(button,index) in btn" class="btn btn-primary m-1 flex-grow-1" :class="{'active-button': answered[index]==0} ">
        {{ button }}
      </button>
    </div>
</div>
</div>
</template>
<script>
export default {
    name: 'FindTheItem',
    data(){
        return {
            ObjPosition: [],
            ObjPositionRange: [],
            answered:[],
            btn:{},
            inputNumber: ''
        }
    },
    props: {
        imgsrc:{
            type: String,
            required: true
        },
        question: {
            type: Object,
            required: true
        },
        answer: {
            type: Array,
            required: true
        },
        //Other Game Methods
    },
    created() {
        for(var i=0; i<this.question["ObjNum"]; i++){
            this.answered.push(0);
        }
        for(var i in this.question.ObjName){
            this.btn[i]=this.question.ObjName[i];
        }
    },
    mounted(){
        var cvs=document.getElementById("cvs");
        const ctx=cvs.getContext('2d');
        var img=new Image();
        img.src=this.imageUrl=new URL(`../../assets/GamePic/${this.imgsrc}`, import.meta.url).href
        img.addEventListener("load", function() {
            ctx.drawImage(this,0,0,cvs.width,cvs.height);
        }, false);

        var posX = $('#cvs').offset().left;
        var posY = $('#cvs').offset().top;
        console.log("page offset:",posX,posY);
        this.ObjPosition=this.question["ObjLocation"];
        this.ObjPositionRange=this.answer;
    },
    methods:{
        outCircle(x,y){
            // console.log("draw circle on number")//DEBUG
            var canvas = document.getElementById("cvs");
            var ctx = canvas.getContext("2d");
            // 設定圓形參數
            var radius = 50;//半徑
            var lineWidth = 2;
            var strokeColor = "red";
            // 繪製圓形
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2*Math.PI);
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = strokeColor;
            ctx.stroke();
        },
        judge_position(event){
            
            //DEBUG
            // console.log("detect the mouse position...");
            // console.log(event);
            // console.log(event.pageX,event.pageY);
            var posX = $('#cvs').offset().left;
            var posY = $('#cvs').offset().top;
            // console.log(event.pageX+posX,event.pageY+posY);//DEBUG
            // console.log(this.ObjPositionRange[0][0][0],this.ObjPositionRange[0][0][1]);//DEBUG
            for(var i=0;i<11;i++){
                if((event.pageX>=(this.ObjPositionRange[i][0][0]+posX))&&(event.pageX<=(this.ObjPositionRange[i][0][1]+posX))){
                    // console.log("x is right")//DEBUG
                    if((event.pageY>=(this.ObjPositionRange[i][1][0]+posY))&&(event.pageY<=(this.ObjPositionRange[i][1][1]+posY))){
                        // console.log("y is right")//DEBUG
                        this.RightAns(i);
                    }  
                }
                //judge does the mouse click on the right position.
            }   
        },
        RightAns(num){
            // console.log(num," was clicked!") //DEBUG
            var x=this.ObjPosition[num][0];
            var y=this.ObjPosition[num][1];
            //draw circle
            // record_time_data(num);
            // playAudio(num);//Play Right Answer Sound
            this.outCircle(this.ObjPosition[num][0],this.ObjPosition[num][1]);
            $("#bt-"+num).css("background-color","gray")
            this.detect_win(num);
        },
        detect_win(i){
            this.answered[i]=1;
            var unanswer=0;
            for(i in this.answered){
                if(this.answered[i]==0){
                    unanswer+=1
                }
            }
            if(unanswer==0){
                this.win();
            }
        },
        win(){
            console.log("FindTheItemGame CheckAnswer :Wrong")
            this.$emit('check-answer',true);
        }
        
    }
}
</script>

<style scoped>
.active-button {
  background-color: blue;
  color: white;
}
</style>

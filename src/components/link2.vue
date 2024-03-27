<template>
    <!-- {{ this.DotLocation }} -->
    <div class="canvas-container">
        <canvas id="myCanvas" class="position-absolute"></canvas>
        <canvas ref="myCanvas2" id="canvas2" class="position-absolute"></canvas>
    </div>
    <!-- <button @click="clearLastPath" id="myButton">清除上一个轨迹</button> -->
    </template>
    <script>
    import icon from '@/assets/GamePic/Cat.png';
import FindTheItemGame from '../views/GameTemplate/FindTheItemGame.vue';
    export default {
        props: {
            GameData: {
                type: Object,
                required: true
            },
            GameConfig:{
                type: Object,
                required: true
            },
            id:{
                type: String,
                required: true
            }
        },
        emits: ['play-effect','add-record','next-question'],
        data(){
            return{
                border: 30,
                ItemGap: 10,
                DotRadius: 10, //max
                DotLocation:[],
                QuestionDataStructure:[
                    ['imgsrc','imgsrc','imgsrc','imgsrc','imgsrc'],
                    ['imgsrc','imgsrc','imgsrc','imgsrc','imgsrc'],
                    ['imgsrc','imgsrc','imgsrc','imgsrc','imgsrc']
                ],
                isDrawing: false,
                paths: [],
                TouchSensitive: 1, //This should be bigger than 0 , and the smaller more sensitive
                Min_Gap:30,
                HeightWidth:{},
                runtimes:0,
                group:0,
                ontouch_group:0,
                row:0,
                index:0,
                question:[["/assets/GamePic/Cat.png","/assets/GamePic/Cat.png","/assets/GamePic/Cat.png","/assets/GamePic/Cat.png"],
                               ["/assets/GamePic/Cat.png","/assets/GamePic/Cat.png","/assets/GamePic/Cat.png","/assets/GamePic/Cat.png"],
                               ["/assets/GamePic/Cat.png","/assets/GamePic/Cat.png","/assets/GamePic/Cat.png","/assets/GamePic/Cat.png"]
                            ],
                ans:[
                    [[0,0],[1,0]],
                    [[0,1],[1,2]],
                    [[0,2],[1,1]]
                ],
                OnclickLocation:[],
                TotalAmount:0,
                Runtimes:0,
            }
        },
        mounted() {
            this.TotalAmount=this.ans.length;
            var canvas1 = $('#myCanvas')[0];
            var context1 = canvas1.getContext('2d');
            // Set Canvas size to full screen
            canvas1.width = window.innerWidth;
            canvas1.height = window.innerHeight;
            // this.CountRowGap(this.QuestionDataStructure,270)
            // this.DrawReaizesImgOnCanvas(context1,icon,3);
            var img = new Image();
            img.src = icon;
            // img.src = new URL(`../../assets/GamePic/Cat.png`, import.meta.url).href;
            img.onload= () => {
                this.DrawImgOnRow(context1,img,this.QuestionDataStructure);
            }
            // Listen for window resize event and update Canvas size
            window.addEventListener('resize', () => {
                canvas1.width = window.innerWidth;
                canvas1.height = window.innerHeight;
                this.DrawImgOnRow(context1,img,this.QuestionDataStructure);
            });
            this.canvas = this.$refs.myCanvas2;
            this.context = this.canvas.getContext('2d');
            this.canvas.width= window.innerWidth;
            this.canvas.height= window.innerHeight;
            this.canvas.addEventListener('mousedown', this.handleMouseDown);
            this.canvas.addEventListener('mousemove', this.handleMouseMove);
            this.canvas.addEventListener('mouseup', this.handleMouseUp);
            this.canvas.addEventListener('touchstart', this.handleTouchStart);
            this.canvas.addEventListener('touchmove', this.handleTouchMove);
            this.canvas.addEventListener('touchend', this.handleTouchEnd);
    
        },
        methods: {
            CountItemSize(Amount){ 
                /**
                 * 計算每個圖片的大小。(Compute Each Image's Size)
                 * @param {number} Amount - 圖片數量 (Amount of Images)
                 * @return {number} space - 回傳每個圖片的高度(Retrun Each Image's Height)
                 */
                var height = (window.innerHeight-(this.border*2 + this.ItemGap *(Amount-1))) / Amount;
                var width = (window.innerWidth-(this.border*2)) / Amount;
                if(width<this.Min_Gap)
                    width=(window.innerWidth-(this.border*2 + this.Min_Gap *(Amount-1))) / Amount;
                // return height;
                return {'height':height,'width':width};
            },
            CountRowGap(question,ImgWidth){
                var Amount=question.length;
                var space = (window.innerWidth-(this.border*2 + ImgWidth*Amount)) / (Amount-1);
                console.log("Each Row's Width:"+space);
                return space;
            },
    
            ResizeImg(Target,img,SwitchItem='Height'){
                /**
                 * 依照比例修正圖片大小。(Resize Image by Ratio)
                 * @param {number} Target - 目標長度 (Target Length)
                 * @param {object} img - 圖片物件 (Image Object)
                 * @param {string} SwitchItem - 傳入'Height'或'Width'，決定以哪個為基準。(Pass 'Height' or 'Width' to decide which one is the base)
                 * @return {object} resizedImg - 回傳新的圖片物件 (Return New Image Object)
                 */
                var ratio = img.height / img.width;
                const resizedImg = new Image();
    
                if (SwitchItem === 'Height') { // 提供目標高度
                    resizedImg.height = Target;
                    resizedImg.width = Target / ratio;
                } else { // 提供目標寬度
                    resizedImg.width = Target;
                    resizedImg.height = Target * ratio;
                }
    
                // 設定新的圖片來源
                resizedImg.src = img.src;
                console.log("Resized Image's Height:"+resizedImg.height);
                return resizedImg;
            },
            DrawReaizesImgOnCanvas(context,Amount,bais,Dot_Direction,RowID){
                /**
                 * 將圖片畫在Canvas上。(Draw Image on Canvas)
                 */
                var img = new Image();
                img.src = icon;//FIXME
                img.onload = () => {
                    // var Image_Height=this.CountItemSize(Amount);
                    var Img_data=this.CountItemSize(Amount);
                    var Image_Height=Img_data.height;   
                    var resizedImg=this.ResizeImg(Image_Height,img,'Height');   
    
                    this.DotRadius=resizedImg.height/15;
                    this.border=Image_Height/3;
                    var Sensitive=this.DotRadius/this.TouchSensitive
    
                    var height=this.border;
                    for(var i=0 ; i<Amount ; i++){
                        //繪製圖片、連接點於Canvas，並將圖片的位置存入DotLocation。
                        //用for 迴圈一次畫一排圖片
                        context.drawImage(resizedImg, bais, height , resizedImg.width, resizedImg.height);
                        context.beginPath();
                        if(Dot_Direction==='Right'){
                            context.arc((bais+resizedImg.width+this.border), (height+(resizedImg.height/2)), this.DotRadius, 0, 2 * Math.PI, false);
                            this.DotLocation.push([[RowID,this.group+1,this.index],[(bais+resizedImg.width+this.border-(this.DotRadius/2)-Sensitive),(height+(resizedImg.height/2)-(this.DotRadius/2)-Sensitive)],[(bais+resizedImg.width+this.border+(this.DotRadius/2)+Sensitive),(height+(resizedImg.height/2)+(this.DotRadius/2)+Sensitive)]])
                        }
                        else if(Dot_Direction==='Both'){
                            //Left Side
                            context.arc((bais-this.border), (height+(resizedImg.height/2)), this.DotRadius, 0, 2 * Math.PI, false);
                            this.DotLocation.push([[RowID,this.group+1,this.index],[((bais-this.border)-(this.DotRadius/2)-Sensitive),(height+(resizedImg.height/2)-(this.DotRadius/2)-Sensitive)],[(bais-this.border+(this.DotRadius/2)+Sensitive),(height+(resizedImg.height/2)+(this.DotRadius/2)+Sensitive)]]);
                            this.group=this.group+1;
    
                            //Right Side
    
                            context.arc((bais+resizedImg.width+this.border), (height+(resizedImg.height/2)), this.DotRadius, 0, 2 * Math.PI, false);
                            this.DotLocation.push([[RowID,this.group+1,this.index],[(bais+resizedImg.width+this.border-(this.DotRadius/2)-Sensitive),(height+(resizedImg.height/2)-(this.DotRadius/2)-Sensitive)],[(bais+resizedImg.width+this.border+(this.DotRadius/2)+Sensitive),(height+(resizedImg.height/2)+(this.DotRadius/2)+Sensitive)]])
                            this.group=this.group-1;
                        }
                        else{
                            context.arc((bais-this.border), (height+(resizedImg.height/2)), this.DotRadius, 0, 2 * Math.PI, false);
                            this.DotLocation.push([[RowID,this.group+1,this.index],[((bais-this.border)-(this.DotRadius/2)-Sensitive),(height+(resizedImg.height/2)-(this.DotRadius/2)-Sensitive)],[(bais-this.border+(this.DotRadius/2)+Sensitive),(height+(resizedImg.height/2)+(this.DotRadius/2)+Sensitive)]]);
                        }
                        context.fillStyle = 'black';
                        context.fill();
                        context.closePath();
                        height=height+(resizedImg.height+this.ItemGap);
                        this.index=this.index+1;
                    }
                    if(Dot_Direction==='Both'){
                            this.group=this.group+1;
                    }
                    this.index=0;
    
                }
    
                console.log(this.DotLocation);
            },
            DrawImgOnRow(context,img_obj,question){
                /**
                 * 以行為單位，將圖片畫在Canvas上。(Draw Image on Canvas by Row)
                 */
                // var Img_Height=this.CountItemSize(question[0].length);
                var Img_data=this.CountItemSize(question[0].length);
                var Img_Height=Img_data.height;
                var resizedImg=this.ResizeImg(Img_Height,img_obj,'Height');
                var space,RowAmount
                space=this.CountRowGap(question,resizedImg.width);
                RowAmount=question.length;
                var bais=0;
                for(var i=0; i<RowAmount ; i++){
                    var dir= question.length-1-i;
                    if(i==0){
                        this.DrawReaizesImgOnCanvas(context,question[0].length,bais,'Right',i);
                    }
                    else if(dir==0){
                        this.DrawReaizesImgOnCanvas(context,question[0].length,bais,'Left',i);
                    }
                    else{
                        this.DrawReaizesImgOnCanvas(context,question[0].length,bais,'Both',i);
                    }
                    bais=bais+space+resizedImg.width;
                }
            },
            getEventPos(evt) {
                const rect = this.canvas.getBoundingClientRect();
                return {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };
            },
            handleMouseDown(e) {
                var rep =this.JudgeRange(e.clientX,e.clientY);
                this.row=rep.RowID;
                this.ontouch_group=rep.Group;
                if(rep.Locate){
                    if (!this.isDrawing) {
                    this.isDrawing = true;
                    const startPos = this.getEventPos(e);
                    this.paths.push({ startX: startPos.x, startY: startPos.y });
                    this.OnclickLocation=[rep.RowID,rep.Index];
                } 
                }
            },
            handleMouseMove(e) {
                if (this.isDrawing) {
                    const currentPos = this.getEventPos(e);
                    this.paths[this.paths.length - 1].currentX = currentPos.x;
                    this.paths[this.paths.length - 1].currentY = currentPos.y;
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.drawPaths();
                }
            },
            handleMouseUp(e) {
                var rep =this.JudgeRange(e.clientX,e.clientY);
                var CA =this.CheckAnswer(this.OnclickLocation[0],this.OnclickLocation[1],rep.RowID,rep.Index)
                if(rep.Locate && this.ontouch_group==rep.Group && this.row!=rep.RowID && CA){
                    if (this.isDrawing) {
                        this.isDrawing = false;
                        const endPos = this.getEventPos(e);
                        this.paths[this.paths.length - 1].endX = endPos.x;
                        this.paths[this.paths.length - 1].endY = endPos.y;
                        this.drawPaths();
                    }
                    this.ontouch_group=0;
                }
                else{
                    this.isDrawing = false;
                    this.clearLastPath();
                }
            },
            handleTouchStart(e) {
                var rep =this.JudgeRange(e.touches[0].clientX,e.touches[0].clientY);
                this.row=rep.RowID;
                this.ontouch_group=rep.Group;
                if(rep.Locate){
                    e.preventDefault();
                    this.isDrawing = true;
                    const startPos = this.getEventPos(e.touches[0]);
                    this.paths.push({ startX: startPos.x, startY: startPos.y });
                    this.OnclickLocation=[rep.RowID,rep.Index];
                }
            },
            handleTouchMove(e) {
                if (this.isDrawing) {
                    e.preventDefault();
                    const currentPos = this.getEventPos(e.touches[0]);
                    this.paths[this.paths.length - 1].currentX = currentPos.x;
                    this.paths[this.paths.length - 1].currentY = currentPos.y;
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.drawPaths();
                }
            },
            handleTouchEnd(e) {
                var rep =this.JudgeRange(e.changedTouches[0].clientX,e.changedTouches[0].clientY);
                var CA =this.CheckAnswer(this.OnclickLocation[0],this.OnclickLocation[1],rep.RowID,rep.Index)
                if(rep.Locate && this.ontouch_group==rep.Group && this.row!=rep.RowID && CA){
                    if (this.isDrawing) {
                        e.preventDefault();
                        this.isDrawing = false;
                        const endPos = this.getEventPos(e.changedTouches[0]);
                        this.paths[this.paths.length - 1].endX = endPos.x;
                        this.paths[this.paths.length - 1].endY = endPos.y;
                        this.drawPaths();
                        this.ontouch_group=0;
                    }
                }
                else{
                    this.isDrawing = false;
                    this.clearLastPath();
                }
            },
            drawPaths() {
                this.paths.forEach(path => {
                    this.context.beginPath();
                    this.context.moveTo(path.startX, path.startY);
                    this.context.lineTo(path.currentX, path.currentY);
                    this.context.stroke();
                    this.context.closePath();
                });
            },
            clearLastPath() {
                this.paths.pop();
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.drawPaths();
            },
            JudgeRange(x,y){
                for(var i=0;i<this.DotLocation.length;i++){
                    if(x>=this.DotLocation[i][1][0] && x<=this.DotLocation[i][2][0] && y>=this.DotLocation[i][1][1] && y<=this.DotLocation[i][2][1]){
                        return {Locate:true , Group:this.DotLocation[i][0][1], RowID:this.DotLocation[i][0][0], Index:this.DotLocation[i][0][2]};
                    }
                }
                return {Locate:false , Group:undefined};
            },
            CheckAnswer(o_row,o_index,row,index){
                var find_ans=false;
                for(var i in this.ans){
                    if(this.ans[i][0][0]==o_row && this.ans[i][0][1]==o_index && this.ans[i][1][0]==row && this.ans[i][1][1]==index){
                        find_ans=true;
                        break;
                    }
                    else if(this.ans[i][1][0]==o_row && this.ans[i][1][1]==o_index && this.ans[i][0][0]==row && this.ans[i][0][1]==index){
                        find_ans=true;
                        break;
                    }
                }
                if(find_ans){
                    console.log("Link Template Return Correct");
                    this.Runtimes=this.Runtimes+1;
                    if(this.Runtimes==this.TotalAmount){
                        this.GameOver();
                        this.$emit('play-effect', 'CorrectSound',)
                        // this.$emit('add-record',[[[row,index],[]],[row,index],"正確"])
                        this.$emit('add-record',["","","正確"])

                    }
                    return true;
                }
                else{
                    console.log("Link Template Return Wrong");
                    this.$emit('play-effect', 'WrongSound',)
                    this.$emit('add-record',["","","錯誤"])
                    return false;
                }
    
            },
            GameOver(){
                console.log("Component 'Link' post GameOver,All Answer Right")
                // this.$emit('check-answer',true);
                this.$emit('play-effect', 'CorrectSound',)
                this.$emit('add-record',["","","全對"])
                this.$emit('next-question');
            }
            
        }
    }
    </script>
    
    <style scoped>
    /* Your component styles go here */
    .canvas-container {
        display: flex; /* 使用 Flexbox 布局 */
        flex-direction: column; /* 子元素垂直排列 */
        align-items: center; /* 子元素水平居中 */
        position: relative; /* 相對定位，作為子元素的定位參考 */
    }
    
    #myButton {
        margin-top: 20px; /* 按鈕與 canvas 區塊之間的距離 */
        /* 其他按鈕樣式 */
    }
    
    
    
    
    </style>
    
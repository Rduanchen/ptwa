<template>
    <div>
        {{this.QuestionDataStructure}}
        <p class="h1">{{ GameData.Question.text }}</p>
        <div class="canvas-container" id="canvas-container" ref="CanvasContainer">
            <canvas id="responsive-bg" class="position-absolute"></canvas>
            <canvas ref="line_keeper" id="line_keeper" class="position-absolute"></canvas>
        </div>  
        <div class="SlotComponent" ref="SlotComponent">
            <component :is="SlotComponent" :Data="SlotComponentData" :ID="this.id" @hook:mounted="test()" ></component>
        </div>
        <button @click="captureImages">Capture</button>
        <img :src="test">
    </div>
    </template>
    
    <script>
    import icon from '@/assets/GamePic/Cat.png';
    import { GamesGetAssetsFile } from '@/utilitys/get_assets.js';
    import LoadImageFromArray from '@/utilitys/load_images.js';
    import * as htmlToImage from 'html-to-image';
    import { toPng } from 'html-to-image';
    import { defineAsyncComponent } from 'vue';
    import ImageContainer from '../../components/ImageContainer.vue';
    export default {
        name: 'Link',
        props: {
            GameData: {
                type: Object,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            GameConfig: {
                type: Object,
                required: true
            }
        },
        components: {
            Clock : defineAsyncComponent(() => import('@/components/clock.vue')),
            ImageContainer: defineAsyncComponent(() => import('@/components/ImageContainer.vue'))
        },
        data(){
            return{
                WH: null,
                Canvasoffset: {},
                
                // RWD Setting
                Min_border: 10,
                Min_RowGap :30,
                Min_ImgWidth: 300,
                RWD_Img_Width: null,
                RWD_Gap_Width: null,
    
                // Game Setting
                TouchSensitive: 1, //This should be bigger than 0 , and the smaller more sensitive
                DotRadius: 7, //max
    
    
                //Line Drawer
                isDrawing: false,
                paths: [],
    
    
                //Line Checker
                ontouch_group:0,
                DotLocation:[],
                OnclickLocation:[], // [RowID,Index]
    
                //Check Answer
                //Fake Data
                QuestionDataStructure:[],
                ans:[
                    [[0,0],[1,0]],
                    [[0,1],[1,2]],
                    [[0,2],[1,1]]
                ],
                answered: [],
                SlotComponent: "",
                SlotComponentData: {
               
                },
                test: "",
            }
        },
        mounted() {
            // await this.captureImages();
            this.SlotComponent = 'clock'
            this.SlotComponentData = {
                sec: 0,
                min: 0,
                hour: 0
            }
            this.ans = this.GameData.Answer;
            let CanvasContainer = this.$refs.CanvasContainer
            this.Canvasoffset = {
                top: CanvasContainer.offsetTop,
                left: CanvasContainer.offsetLeft
            }
    
            let CanvasCSS = document.getElementsByTagName('canvas')[0];
            CanvasCSS.style.top = this.Canvasoffset.top + 'px';
            CanvasCSS.style.left = this.Canvasoffset.left + 'px';
            
            let linekeeper = this.$refs.line_keeper;
            let linekeeperCSS = document.getElementById('line_keeper');
            linekeeperCSS.style.top = this.Canvasoffset.top + 'px';
            linekeeperCSS.style.left = this.Canvasoffset.left + 'px';
    
    
            this.WH = CanvasContainer.getBoundingClientRect();
            
    
            const canvas1 = $('#responsive-bg')[0];
            const context1 = canvas1.getContext('2d');
            canvas1.width = this.WH.width;
            canvas1.height = this.WH.height;
    
            context1.clearRect(0, 0, canvas1.width, canvas1.height);
            
            
            let RWD_Info = this.CountRWDWidth(this.QuestionDataStructure);
            this.RWD_Img_Width = RWD_Info.Img_width;
            this.RWD_Gap_Width = RWD_Info.Gap_width;
            this.DrawImgOnCanvas(this.QuestionDataStructure,context1);
                
            this.canvas = this.$refs.line_keeper;
            this.context = this.canvas.getContext('2d');
            this.canvas.width = this.WH.width;
            this.canvas.height = this.WH.height;
            
            window.addEventListener('resize', () => {
                let CanvasContainer = this.$refs.CanvasContainer
                this.Canvasoffset = {
                    top: CanvasContainer.offsetTop,
                    left: CanvasContainer.offsetLeft
                }
    
                let CanvasCSS = document.getElementsByTagName('canvas')[0];
                CanvasCSS.style.top = this.Canvasoffset.top + 'px';
                CanvasCSS.style.left = this.Canvasoffset.left + 'px';
                
                let linekeeper = this.$refs.line_keeper;
                let linekeeperCSS = document.getElementById('line_keeper');
                linekeeperCSS.style.top = this.Canvasoffset.top + 'px';
                linekeeperCSS.style.left = this.Canvasoffset.left + 'px';
    
                this.WH = CanvasContainer.getBoundingClientRect();
                
                const canvas1 = $('#responsive-bg')[0];
                const context1 = canvas1.getContext('2d');
                canvas1.width = this.WH.width;
                canvas1.height = this.WH.height;
                context1.clearRect(0, 0, canvas1.width, canvas1.height);
                let RWD_Info = this.CountRWDWidth(this.QuestionDataStructure);
                this.RWD_Img_Width = RWD_Info.Img_width;
                this.RWD_Gap_Width = RWD_Info.Gap_width;
                this.DrawImgOnCanvas(this.QuestionDataStructure,context1);
                    
                this.canvas = this.$refs.line_keeper;
                this.context = this.canvas.getContext('2d');
                this.canvas.width = this.WH.width;
                this.canvas.height = this.WH.height;
                this.MapTransfer();
            });
    
            this.Runtimes=0;
            this.TotalAmount=this.ans.length;
            
            this.canvas.addEventListener('mousedown', this.handleMouseDown);
            this.canvas.addEventListener('mousemove', this.handleMouseMove);
            this.canvas.addEventListener('mouseup', this.handleMouseUp);
            this.canvas.addEventListener('touchstart', this.handleTouchStart);
            this.canvas.addEventListener('touchmove', this.handleTouchMove);
            this.canvas.addEventListener('touchend', this.handleTouchEnd);
        },
        methods: {
            test(){
                console.log("Hello");
            },
            async captureImages() {
                htmlToImage.toPng(document.getElementsByClassName('SlotComponent')[0])
                .then((dataUrl) => {
                    this.test = dataUrl;
                    let img = new Image();
                    img.src = dataUrl;
                    console.log(this.test);
                    img.onload = () => {
                        this.QuestionDataStructure[0][0] = img;
                    }
                })
            },
            CountRWDWidth(question){
                //利用比例計算出每個圖片的大小
                //如果太多列導致圖片太小則以圖片最小值為主
                let RowAmount=question.length;
                let column = parseInt((this.WH.width-this.Min_border*2)/(RowAmount*2+(RowAmount-1)*3)) // 扣掉邊界後，根據比例計算出圖片、間隔的大小(2:3)
                return {
                    Img_width : column*2,
                    Gap_width : column*3
                }
            },
            CountMaxImgSize(ImageRowAmount){
                //參數為每一欄圖片的數量 
                //計算出每個圖片的最大大小
                let Height= (this.WH.height-this.Min_border*2)/ImageRowAmount;
                let Width = this.RWD_Img_Width;
                return{
                    Max_Height: Height,
                    Max_Width: Width
                }
            },
            ResizeRWDImg(ImgMaxSizeInfo,Img){
                let Img_Final_Height;
                let Img_Final_Width;
                let ratio =Img.height/Img.width;
                Img_Final_Height = ImgMaxSizeInfo.Max_Height;
                Img_Final_Width = ImgMaxSizeInfo.Max_Height/ratio;
                if (Img_Final_Width > ImgMaxSizeInfo.Max_Width) {
                    Img_Final_Width = ImgMaxSizeInfo.Max_Width;
                    Img_Final_Height = ImgMaxSizeInfo.Max_Width*ratio;
                }
                return {
                    New_Height: Img_Final_Height,
                    New_Width: Img_Final_Width
                }   
            },
            CountRWDYGap(question){
                //回傳每一欄沒有用到的圖片的間隔
                let full_space = 0;
                let Max_Img_Size = this.CountMaxImgSize(question.length);
                
                for(var i in question){
                    let img = new Image();
                    // img.src = question[i];
                    // img.src = icon //FIXME: 這裡要改成vue動態匯入
                    img.src = GamesGetAssetsFile(this.id,question[i]);
                    let Img_Size = this.ResizeRWDImg(Max_Img_Size,img);
                    full_space += Img_Size.New_Height;
                }
                return (this.WH.height-this.Min_border*2-full_space)/(question.length+1)
                // return 0
            },
            FindDotXY(col,row){
                for(var i in this.DotLocation){
                    if(this.DotLocation[i][0][0]==row && this.DotLocation[i][0][1]==col){
                        return {
                            x:this.DotLocation[i][1][0],
                            y:this.DotLocation[i][1][1]
                        }    
                    }
                }
            },
            MapTransfer(){
                let paths=[]
                for(var i in this.answered){
                    let start = this.FindDotXY(this.answered[i][0][0],this.answered[i][0][1]);
                    let end = this.FindDotXY(this.answered[i][1][0],this.answered[i][1][1]);
                    paths.push({startX:start.x,startY:start.y,currentX:end.x,currentY:end.y});
                }
                this.paths=paths;
                this.drawPaths();
            },  
            async DrawImgOnCanvas(question, context1) {
                // let images = await LoadImageFromArray(question, this.id);
                let images = question;
                console.log(images);
                let Column_Amount = question.length;
                var onchangegroup = false;
                let Column_ID = 0;
                this.Group = 1;
                this.DotLocation = [];
                for (let col = 0; col < question.length; col++) {
                    const Max_Img_Size = this.CountMaxImgSize(this.QuestionDataStructure[col].length);
                    let RWD_Colum_Gap = this.CountRWDYGap(question[col]);
                    for (let Dot_Row_ID = 0; Dot_Row_ID < question[col].length; Dot_Row_ID++) {
                        let Img = images[col][Dot_Row_ID];
                        let Img_Size = this.ResizeRWDImg(Max_Img_Size, Img);
                        let x = this.Min_border + Max_Img_Size.Max_Width * col + this.RWD_Gap_Width * col;
                        let y = this.Min_border + RWD_Colum_Gap + Max_Img_Size.Max_Height * Dot_Row_ID;
                        
                        context1.drawImage(Img, x, y, Img_Size.New_Width, Img_Size.New_Height);
                        context1.beginPath();
                        if (col == 0) {
                            context1.arc(x + Img_Size.New_Width + this.Min_border, y + Img_Size.New_Height / 2, this.DotRadius, 0, Math.PI * 2, true);
                            this.DotLocation.push([[Dot_Row_ID, Column_ID, this.Group], [x + Img_Size.New_Width + this.Min_border,y + Img_Size.New_Height / 2]]);
                            context1.fillStyle = "black";
                            context1.fill();
                        } else if (col == Column_Amount - 1) {
                            context1.arc(x - this.Min_border, y + Img_Size.New_Height / 2, this.DotRadius, 0, Math.PI * 2, true);
                            this.DotLocation.push([[Dot_Row_ID, Column_ID, this.Group], [x - this.Min_border, y + Img_Size.New_Height / 2]]);
                            context1.fillStyle = "black";
                            context1.fill();
                        } else {
                            //Right
                            context1.arc(x + Img_Size.New_Width + this.Min_border, y + Img_Size.New_Height / 2, this.DotRadius, 0, Math.PI * 2, true);
                            this.DotLocation.push([[Dot_Row_ID, Column_ID + 1, this.Group + 1], [x + Img_Size.New_Width + this.Min_border,y + Img_Size.New_Height / 2]]);
                            //Left
                            context1.arc(x - this.Min_border, y + Img_Size.New_Height / 2, this.DotRadius, 0, Math.PI * 2, true);
                            this.DotLocation.push([[Dot_Row_ID, Column_ID, this.Group], [x - this.Min_border, y + Img_Size.New_Height / 2]]);
                            context1.fillStyle = "black";
                            context1.fill();
                        }
                        context1.closePath();
                    }
                    Column_ID += 1;
                    if (col != 0) {
                        this.Group++;
                        Column_ID += 1;
                    }
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
                const startPos = this.getEventPos(e);
                var rep =this.JudgeRange(startPos.x,startPos.y);
                this.column=rep.ColumnID;
                this.ontouch_group=rep.Group;
                if(rep.Locate){
                    if (!this.isDrawing) {
                        this.isDrawing = true;
                        this.paths.push({ startX: startPos.x, startY: startPos.y });
                        this.OnclickLocation=[rep.ColumnID,rep.RowID];
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
                console.log(this.isDrawing);
                const endPos = this.getEventPos(e);
                var rep =this.JudgeRange(endPos.x,endPos.y);
                var CAd =this.JudgeAnswered(this.OnclickLocation[0],this.OnclickLocation[1],rep.ColumnID,rep.RowID)
                if(!CAd){
                    var CA =this.CheckAnswer(this.OnclickLocation[0],this.OnclickLocation[1],rep.ColumnID,rep.RowID)
                    if(rep.Locate && this.ontouch_group == rep.Group && this.column != rep.ColumnID && CA){
                        if (this.isDrawing) {
                            this.isDrawing = false;
                            this.paths[this.paths.length - 1].endX = endPos.x;
                            this.paths[this.paths.length - 1].endY = endPos.y;
                            this.drawPaths();
                        }
                        this.ontouch_group=0;
                    }
                    else{
                        if (this.isDrawing) {
                            this.clearLastPath();
                        }
                        this.isDrawing = false;
                    }
                }
                else{
                    this.isDrawing = false;
                    if (this.isDrawing) {
                        this.clearLastPath();
                    }
                }
            },
            handleTouchStart(e) {
                const startPos = this.getEventPos(e.touches[0]);
                var rep =this.JudgeRange(startPos.x,startPos.y);
                this.column=rep.ColumnID;
                this.ontouch_group=rep.Group;
                if(rep.Locate){
                    e.preventDefault();
                    this.isDrawing = true;
                    this.paths.push({ startX: startPos.x, startY: startPos.y });
                    this.OnclickLocation=[rep.ColumnID,rep.RowID];
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
                console.log(this.isDrawing);
                const endPos = this.getEventPos(e.changedTouches[0]);
                var rep =this.JudgeRange(endPos.x,endPos.y);
                var CAd =this.JudgeAnswered(this.OnclickLocation[0],this.OnclickLocation[1],rep.ColumnID,rep.RowID)
                if(!CAd){
                    var CA =this.CheckAnswer(this.OnclickLocation[0],this.OnclickLocation[1],rep.ColumnID,rep.RowID)
                    if(rep.Locate && this.ontouch_group==rep.Group && this.column != rep.ColumnID && CA && !CAd){
                        if (this.isDrawing) {
                            e.preventDefault();
                            this.isDrawing = false;
                            
                            this.paths[this.paths.length - 1].endX = endPos.x;
                            this.paths[this.paths.length - 1].endY = endPos.y;
                            this.drawPaths();
                            this.ontouch_group=0;
                        }
                    }
                    else{
                        this.isDrawing = false;
                        if (this.isDrawing) {
                            this.clearLastPath();
                        }
                    }
                }
                else{
                    this.isDrawing = false;
                    if (this.isDrawing) {
                        this.clearLastPath();
                    }
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
                    // 利用兩線段的距離公式來判斷是否在點的範圍內
                    length =((this.DotLocation[i][1][0] - x )**2+(this.DotLocation[i][1][1] - y )**2)**0.5;
                    if(length<=(this.DotRadius)){
                        // console.log(this.DotLocation[i][0][0],this.DotLocation[i][0][1],this.DotLocation[i][0][2],i);
                        return {Locate:true , Group:this.DotLocation[i][0][2], RowID:this.DotLocation[i][0][0], ColumnID:this.DotLocation[i][0][1]};
                    }
                }
                return {Locate:false , Group:undefined};
            },
            JudgeAnswered(o_coulum,o_row,column,row){
                for(var i in this.answered){
                    if(this.answered[i][0][0]==o_coulum && this.answered[i][0][1]==o_row && this.answered[i][1][0]==column && this.answered[i][1][1]==row){
                        return true;
                    }
                    else if(this.answered[i][0][0]==column && this.answered[i][0][1]==row && this.answered[i][1][0]==o_coulum && this.answered[i][1][1]==o_row){
                        return true;
                    }
                }
                return false;
            },
            CheckAnswer(o_coulum,o_row,column,row){
                // ans = [[o_coulum,o_row],[column,row]]
                let find_ans=false;
                let count = 0;
                for(var i in this.ans){
                    if((this.ans[i][0][0]==o_coulum && this.ans[i][0][1]==o_row) && (this.ans[i][1][0]==column && this.ans[i][1][1]==row)){
                        find_ans=true;
                        this.answered.push(this.ans[i])
                        count =i;
                    }
                    else if(this.ans[i][0][0]==column && this.ans[i][0][1]==row && this.ans[i][1][0]==o_coulum && this.ans[i][1][1]==o_row){
                        find_ans=true;
                        this.answered.push(this.ans[i])
                        count =i;
                    }  
                }
                if(find_ans){
                    console.log("Link Template Return Correct");
                    this.Runtimes=this.Runtimes+1;
                    if(this.Runtimes==this.TotalAmount){
                        this.GameOver();
                        this.$emit('add-record',[[[o_coulum,o_row],[column,row]],this.ans[i],"正確"])
                    }
                    else{
                        this.$emit('play-effect', 'CorrectSound',)
                        this.$emit('add-record',[[[o_coulum,o_row],[column,row]],this.ans[i],"正確"])
                    }
                    return true;
                }
                else{
                    console.log("Link Template Return Wrong");
                    this.$emit('play-effect', 'WrongSound',);
                    this.$emit('add-record',[[[o_coulum,o_row],[column,row]],this.ans[i],"錯誤"])
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
        /* FIXME */
        /* Your component styles go here */
        /* canvas {
            position: absolute; 
            top: 0;
            left: 0;
        } */
        .canvas-container {
            height: 70vh;
        }
        /* #SlotComponent{
            position: relative;
            top: 0;
            left: 0;
            z-index: 10;
        } */
    </style>
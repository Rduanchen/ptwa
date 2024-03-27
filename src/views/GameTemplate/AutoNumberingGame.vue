<template>
    <div>
        <br>
        <br>
        <div class="container">
            <div class="d-flex justify-content-between flex-row">
                <canvas ref="canvas" width="700" height="400"></canvas>
                <div class="optionbar d-flex flex-column justify-content-center align-self-center" style="width: 100%;">
                    <p class="h3">{{ this.GameData.Question.Text }}</p>
                    <p class="h5">{{ this.GameConfig.OptionBarText }}</p>
                    <div id="error_msg">{{ errorMsg }}</div>
                    <div class="d-flex flex-column justify-content-center align-self-center d-gap gap-2 p-3" style="width: 100%;">
                        <button v-for="(items,index) in btn" class="btn btn-primary" @click="judgeAnswer(items)">
                            {{ items }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * Game Description:
 * The game will show random's amount of images on the canvas.
 * The player should count the amount of images and click the button to answer.
 * 
 * Game Data Structure Sample:
 * {
 *      "Question": {
 *          "Text": "數數看上面有幾個物品", //Question Text
 *          "Root": "Source", //Image Folder Name
 *          "ObjImgList": ["1", "2", "3", "4", "5", "6"], //Image Name. The type of image should be .png(Or you can change the type in ConfigParameters)
 *          "Range":[7,10] //The Range of the amount of images: [ Min, Max ]. Note that if you change the range, button & picture amount will change.
 *      },
 *      "Answer": [
 *          //No need to fill in
 *      ],
 * }
 * 
 * Option Feature:(Comming Soon)
 * "ConfigParameters":{
 *      "background":true, //The picture which display on the background
 *      "GiveHint":true, //Give the hint to player(We will circle the object and give the number to player)
 *      "InsideLevel":true, //The level will be inside the game
 *      "ImgType":"png" //The type of image
    },
**/

import { GamesGetAssetsFile } from '@/utilitys/get_assets.js';
export default {
    name: 'AutoNumberingGame',
    data() {
        return {
            picture_total: 0,
            QuestionRange: [],
            picture_type: '.png',
            targetWidth: 100,
            targetHeight: 100,
            minDistance: 100,
            positions: [],
            exist_image: 0,
            wrong_time: 0,
            level: 0,
            canvas: null,
            context: null,
            error_text: null,
            errorMsg: '',
            btn:[],
        };
    },
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
    created() {
        
        // this.picture_type="sth"//FIXME
        this.QuestionRange = this.GameData.Question.Range;
        for (var i in this.GameData.Question.ObjImgList) {
            this.picture_total += 1;
        }
        for(var i=this.GameData.Question.Range[0];i<=this.GameData.Question.Range[1];i++){
            this.btn.push(i);
        }
    },
    mounted() {
        //Create canvas object
        this.canvas = this.$refs.canvas;
        this.context = this.canvas.getContext('2d');
        //bind error text
        this.error_text = document.getElementById("error_msg");
        //load description image FIXME:This is a temporary solution, will be removed in the future
        var start = true;
        if (start === true) {
            this.clearCanvas();
            this.randomPicturePosition();
            start = false;
        }
        // this.loadDescriptionImage();
    },
    methods: {
        getRandPicture() {
            /**
             * Get random picture from the folder
             * @return {string} b - The path of the picture
             */
            const num = Math.floor(Math.random() * this.GameData.Question.ObjImgList.length) + 0; //Random number(Range: 0~picture_total-1)
            // var b = new URL(`../../assets/Games/`+this.id+`/S_${this.GameData.Question.ObjImgList[num]}${this.picture_type}`, import.meta.url).href; //load picture
            var name ='S_'+this.GameData.Question.ObjImgList[num]+this.picture_type;
            var b = GamesGetAssetsFile(this.id,name);
            
            console.log(b);
            return b
        },
        randomPicturePosition() {
            /**
             * 1. Random the position of the picture
             * 2. Draw the picture on the canvas
             */
            var numImages = Math.floor(Math.random() * (this.GameData.Question.Range[1]-this.GameData.Question.Range[0])) + this.GameData.Question.Range[0];
            const image = new Image();
            this.exist_image = 0;
            image.src = this.getRandPicture();
            this.positions = [];
            image.addEventListener('load', () => {
                for (let i = 0; i < numImages; i++) {
                    const x = Math.random() * (this.canvas.width - this.targetWidth);
                    const y = Math.random() * (this.canvas.height - this.targetHeight);
                    let isTooClose = false;
                    for (const d in this.positions) {
                        const existingX = this.positions[d][0];
                        const existingY = this.positions[d][1];
                        const distance = Math.sqrt((x - existingX) ** 2 + (y - existingY) ** 2);
                        if (distance < this.minDistance) {
                            isTooClose = true;
                            break;
                        }
                    }
                    if (!isTooClose) {
                        this.context.drawImage(image, x, y, this.targetWidth, this.targetHeight);
                        const position_of_image = [x, y];
                        this.positions.push(position_of_image);
                        this.exist_image += 1;
                    } else {
                        numImages += 1;
                    }
                }
                console.log(this.positions);
            });
        },
        drawCircleWithText(x, y, text) {
            /**
             * Draw the circle with text
             * @param {number} x - The x position of the circle
             * @param {number} y - The y position of the circle
             * @param {string} text - The text of the circle
             */
            this.context.beginPath();
            this.context.arc(x, y, 50, 0, 2 * Math.PI);
            this.context.strokeStyle = 'black';
            this.context.lineWidth = 1;  
            this.context.stroke();
            this.context.fillStyle = 'black';
            this.context.font = '20px Arial';
            this.context.textAlign = 'center';
            this.context.fillText(text, x, y + 70);
        },
        judgeAnswer(num) {
            /**
             * Judge the answer is correct or not(via the number of the image)
             * If the answer is correct, the game will start a new game
             * If the answer is wrong, the game will give the hint to player
             * If the player is wrong for 3 times, the game will give the hint to player
             * @param {number} num - The answer
             */
            console.log(num);
            //FIXME Wait for add Hint Swith
            if (num === this.exist_image) {
                console.log("Correct");
                this.$emit('play-effect', 'CorrectSound');
                this.$emit('add-record',[this.exist_image, num,"正確"]);
                this.newGame();
            } else if (this.wrong_time >= 3) {
                this.errorMsg = "請根據提示回答答案";
                this.drawClue();
            } else {
                num = 3 - this.wrong_time;
                this.errorMsg = `錯誤，請再試一次，剩餘${num}次機會`;
                this.$emit('play-effect', 'WrongSound');
                this.$emit('add-record',[this.exist_image, num,"錯誤"]);
                this.wrong_time += 1;
            }
        },
        clearCanvas() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        drawClue() {
            /**
             * Draw the hint on the canvas
             */
            let num = 1;
            for (const i in this.positions) {
                this.drawCircleWithText(this.positions[i][0] + 50, this.positions[i][1] + 50, num.toString());
                num++;
            }
        },
        win() {
            /**
             * If the player win the game, the game will show the message and reload the game
             * FIXME: Wait for add the level system, this game is endless now.
            */  
            this.$emit('play-effect', 'HarrySound');
            this.$emit('next-question')
            // setTimeout(() => {
            //         // location.reload();
            //         this.$emit('play-effect', 'HarrySound');
            //         this.$emit('next-question')
            //     }, 3000);
            // if (this.level == this.GameData.Question.Level) {

            // }
        },
        newGame() {
            /**
             * Start a new game
             */
            this.level += 1;
            if (this.level == this.GameData.Question.Level){
                this.win();
            }
                
            else{
                this.errorMsg = "";
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.context.font = '24px Arial';
                this.context.fillStyle = 'black';
                this.context.fillText('答對了', this.canvas.width / 2 - 50, this.canvas.height / 2);
                setTimeout(this.clearCanvas, 1500);
                setTimeout(this.randomPicturePosition, 1500);
            }
        },
    },
};
</script>
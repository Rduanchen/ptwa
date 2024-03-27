<template>
    <div>
        <div class="container">
            <div class="d-flex flex-row justify-content-center">
                <img :src="imageUrl" :alt="this.GameData.alt" class="GameImg">
                <div class="optionbar d-flex flex-column justify-content-center">
                    <p class="h3">{{ this.GameData.Question.Text }}</p>
                    <p class="h5">請點擊下方的按鈕選擇答案</p>
                    <div id="error_msg">{{ errorMsg }}</div>
                    <div class="d-flex flex-column">
                        <button v-for="(items,index) in btn" class="btn btn-primary m-1 flex-grow-1"  @click="judgeAnswer(items)">
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
 * The game will show the image that offered on canvas.
 * The player should click the button to answer.
 * 
 * Game Data Structure Sample:
 *         {   
            "Question": {
                "text": "請數數看題目中有多少支棒棒糖", // Question Text(This will be disply on the buttom of the canvas)
                "Range": [5, 10] //The Range of the button: [ Min, Max ] (Note That we strongly recommend that the range should be less than 10)
            },
            "Answer": 8, //The answer of the question
            "img": "NumberningGameSample.png" //The image that will be display on the canvas(Please make sure the image's route is right)
        }
 * 
 */
import Desribepng from '@/assets/GamePic/Source/description.png';
import { GamesGetAssetsFile } from '@/utilitys/get_assets.js';
export default {
    Name: 'NumberingGame',
    data(){
        return {
            imageUrl : '',
            btn:[],
            errorMsg: '',
        }
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
    mounted(){
        this.imageUrl=GamesGetAssetsFile(this.id,this.GameData.img)
        for(var i=this.GameData.Question.Range[0];i<=this.GameData.Question.Range[1];i++){
            this.btn.push(i);
        }
    },
    methods:{
        judgeAnswer(answer){
            if(answer == this.GameData.Answer){
                this.$emit('play-effect', 'CorrectSound')
                this.$emit('add-record',[this.GameData.Answer, answer,"正確"])
                this.$emit('next-question');
            }
            else{
                this.$emit('play-effect', 'WrongSound',)
                this.$emit('add-record',[this.GameData.Answer,answer,"錯誤"])
            }
        }
    }
}
</script>
<style>
.GameImg{
    height: auto;
    width: 60vw;
}
</style>
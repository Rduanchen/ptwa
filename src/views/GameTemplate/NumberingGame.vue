<template>
    <div>
        <p class="h3">{{ this.GameData.Question.text }}</p>
        <div class="container">
            <div class="component1">
                <component :is="this.slotcomponent.Name" :Data="this.slotcomponent.Data" :ID="this.id"></component>
            </div>
            <div class="optionbar">
                <p class="h5">{{ this.GameData.Question.SubQuestion }}</p>
                <div id="error_msg">{{ errorMsg }}</div>
                <div class="Buttons">
                    <button v-for="(items,index) in btn"  @click="judgeAnswer(items)">
                        {{ items }}
                    </button>
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
import { defineAsyncComponent } from 'vue';
export default {
    Name: 'NumberingGame',
    data(){
        return {
            imageUrl : '',
            btn:[],
            errorMsg: '',
            slotcomponent: {

            }
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
    created(){
        this.slotcomponent.Name = this.GameData.SlotComponents[0].Name;
        this.slotcomponent.Data = this.GameData.SlotComponents[0].Data;
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
    },
    components: {
        ImageContainer: defineAsyncComponent(() => import('@/components/ImageContainer.vue'))
    }
}
</script>
<style scoped>
.GameImg{
    height: auto;
}
p{
    margin-left: 1rem;
}
.container{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70vh;
    .component1{
        width: 60%;
        height: 100%;
        component{
            height: 100%;
        }
    }
    .optionbar{
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .Buttons{
            button{
                min-width: 5rem;
                margin: 10pt;
                height: 3rem;
                border-radius: 12px;
                background-color: #bdb2ff;
                border: none;
            }
        }
    }
}
</style>
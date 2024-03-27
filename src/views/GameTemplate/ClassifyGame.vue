<template>
    <div class="container">
        <div class=" d-flex flex-row justify-content-center">
            <p class="class h1 align-self-center">{{QuestionWord}}</p>
        </div>
        <div class="row justify-content-between d-flex flex-row align-items-stretch justify-content-center">
            <div class="col-6 align-content-between">
                <p class="h2">{{ this.GameData.Question[0].InitBox }}</p>
                <draggable :list="this.Items" item-key="id" :sort="false" group="SelectItem" style="width: 100%;" class="card d-flex flex-row justify-content-center flex-wrap col-12 col-md-6 col-lg-4">
                    <template #item="{ element }">
                        <cardwithbutton :imageURL="element['img']" :Text="element['text']" :altText="element['alt']" class="mx-auto my-2"></cardwithbutton>
                    </template>
                </draggable>
            </div>
            <div class="col-6"> 
                <div v-for="(items,index) in Groups">
                    <h1>{{ this.GameData.Answer[index].GroupName }}</h1>
                    <div class="row">
                        <draggable :list="Groups[index]" item-key="id" :sort="false" group="SelectItem" class="card d-flex flex-row justify-content-center flex-wrap">
                            <template #item="{ element }">
                                <cardwithbutton :imageURL="element['img']" :Text="element['text']" :altText="element['alt']" class="mx-auto my-2"></cardwithbutton>
                            </template>
                        </draggable>
                    </div>
                </div>
            </div>
            <div class="row">
                <button type="button" class="btn btn-primary m-3" v-on:click="CheckAnswer()">送出答案</button>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * FIXME:
 * 1. Now the Game only Support Two Groups.
 * 2. Now the Game only Support Text. We have toadd image here
 * 3. Add Opton Feature and Game Config Parameters.
 * 
 * Game Description:
 * You can classify the items into different groups.
 * 
 * Game Data Structure Sample:
 * "Question": [
                {
                    "Question":"請將下列物品分類"
                },
                {
                    "text": "1", //The text that display on card
                    "img": "../../assets/images/pics/cover_info.png"  //The image route. Please make sure the image is in the right place
                },
                // You can add more items if you want
            ],
            "Answer": [
                {
                    "GroupName": "組別目前只能兩個",
                    "Items":["1","2","3"]
                },
                {
                    "GroupName": "未加上照片功能",
                    "Items":["4","5"]
                }
                // Now we only support two groups
            ]
        }
 */
import draggable from 'vuedraggable';
import cardwithbutton from '@/components/cardwithbutton.vue'
import { GamesGetAssetsFile } from '@/utilitys/get_assets.js';
export default {
    name: 'ClassifyGame',
    components: {
        draggable,
        cardwithbutton
    },
    emits: ['play-effect','add-record','next-level'],
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
    data() {
        return {
            QuestionWord: '',
            GroupID:0,
            // Group1:[],
            // Group2:[],
            Groups:[],
            Items:[],
        }
    },
    created(){
        // this.icon= icon1;
        this.QuestionWord=this.GameData.Question[0].Question
        for(var i in this.GameData.Answer){
            this.Groups.push([])
        }
        // this.QuestionWord=this.question[0].Question
        console.log(this.QuestionWord)
        for(var i=1;i<this.GameData.Question.length;i++){
            let temp={
                "text":this.GameData.Question[i].text,
                "img":GamesGetAssetsFile(this.id,this.GameData.Question[i].img),
                "alt":this.GameData.Question[i].alt
            };
            console.log(temp.img)
            this.Items.push(temp);
        }
    },
    methods: {
        CheckAnswer(){
            // This code will walk through all the groups and check if the answer is right
            // Only when all the groups are right, the game will return true.

            var member=0;
            for(var i in this.Groups){
                if(this.Groups[i].length!=this.GameData.Answer[i]["Items"].length){
                    console.log('ClassifyGame CheckAnswer :Wrong')
                    this.$emit('play-effect', 'WrongSound',)
                    this.$emit('add-record',[this.Groups[i], this.GameData.Answer[i]["Items"],"錯誤"])
                    console.log('here')
                    return
                }
                for(var z in this.Groups[i]){
                    if(this.GameData.Answer[i]["Items"].includes(this.Groups[i][z].text)){
                        member++;
                    }
                }
                console.log(member)
                if (member!=this.GameData.Answer[i]["Items"].length){
                    console.log('ClassifyGame CheckAnswer :Wrong')
                    this.$emit('play-effect', 'WrongSound',)
                    this.$emit('add-record',[this.Groups[i], this.GameData.Answer[i]["Items"],"錯誤"])
                    console.log('there')
                    return
                }
                member=0;
                this.$emit('add-record',[this.Groups[i], this.GameData.Answer[i]["Items"],"正確"])
                this.$emit('play-effect', 'CorrectSound',)
                this.$emit('next-question')
            }
        }
    }
}
</script>
<style>

.card {
  min-height: 75px;
}

</style>


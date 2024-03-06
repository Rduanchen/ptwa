<template>
    <div class="container">
        <div class="card mb-3">
            <h1>{{QuestionWord}}</h1>
        </div>
        <div class="row justify-content-between">
            <div class="col-7 align-content-between">
                <h1>Chosen</h1>
                <draggable :list="this.Items" group="SelectItem" class="card">
                    <template #item="{ element }">
                        <button type="button" class="btn btn-primary m-1">{{ element }}</button>
                    </template>
                </draggable>
            </div>
            <div class="col-5">

                <h1>{{ this.GameData.Answer[0].GroupName }}</h1>
                <div class="row">
                    <draggable :list="Group1" group="SelectItem" class="card">
                        <template #item="{ element }">
                            <button type="button" class="btn btn-primary m-1">{{ element }}</button>
                        </template>
                    </draggable>
                </div>

                <h1>{{ this.GameData.Answer[1].GroupName }}</h1>
                <div class="row">
                    <draggable :list="Group2" group="SelectItem" class="card">
                        <template #item="{ element }">
                            <button type="button" class="btn btn-primary m-1">{{ element }}</button>
                        </template>
                    </draggable>
                </div>

            </div>
            <div class="row">
                <button type="button" class="btn btn-primary m-3" v-on:click="CheckAnswer()">Submit</button>
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
export default {
    name: 'ClassifyGame',
    components: {
        draggable
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
    data() {
        return {
            QuestionWord: '',
            GroupID:0,
            Group1:[],
            Group2:[],
            Items:[],
        }
    },
    created(){
        this.QuestionWord=this.GameData.Question[0].Question
        // this.QuestionWord=this.question[0].Question
        console.log(this.QuestionWord)
        for(var i=1;i<this.GameData.Question.length;i++){
            this.Items.push(this.GameData.Question[i].text)
        }
    },
    methods: {
        CheckAnswer(){

            // This code will walk through all the groups and check if the answer is right
            // Only when all the groups are right, the game will return true.
            if(this.Group1.length==this.GameData.Answer[0]["Items"].length && this.Group2.length==this.GameData.Answer[1]["Items"].length){
                var Group1Status=true
                var Group1Check=0
                var Group2Status=true
                var Group2Check=0
                for(var i in this.Group1){
                    for(var z in this.GameData.Answer[0]["Items"]){
                        if(this.Group1[i]==this.GameData.Answer[0]["Items"][z]){
                            Group1Check=1
                            break
                        }
                    }
                    if(Group1Check!=1){
                        Group1Status=false
                    }
                }
                for(var i in this.Group2){
                    for(var z in this.GameData.Answer[1]["Items"]){
                        if(this.Group2[i]==this.GameData.Answer[1]["Items"][z]){
                            Group2Check=1
                            break
                        }
                    }
                    if(Group2Check!=1){
                        Group2Status=false
                    }
                }
                let user_ans =[this.Group1,this.Group2]
                let correct_ans = [this.GameData.Answer[0]["Items"],this.GameData.Answer[1]["Items"]]
                if(Group1Status && Group2Status == true){
                    console.log('ClassifyGame CheckAnswer :Right')
                    this.$emit('play-effect', 'CorrectSound',)
                    this.$emit('add-record',[user_ans, correct_ans,"正確"])
                    this.$emit('next-question');
                }
                else{
                    console.log('ClassifyGame CheckAnswer :Wrong')
                    this.$emit('play-effect', 'WrongSound',)
                    this.$emit('add-record',[user_ans, correct_ans,"錯誤"])

                }
            }
            else{
                console.log('ClassifyGame CheckAnswer :Wrong')
                this.$emit('play-effect', 'WrongSound',)
                this.$emit('add-record',[user_ans, correct_ans,"錯誤"])
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


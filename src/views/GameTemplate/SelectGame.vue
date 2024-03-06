<template>
    <div class="container h-75 align-items-center justify-content-center">
        <h1>{{ this.GameData.Question_Text }}</h1>
        <br>
        <div class="row h-75 justify-content-center">
            <!-- 圖片的列 -->
            <div class="col-md-8 align-self-center">
                <div class="card mx-auto">
                    <div class="card-body">
                        <img class="card-img-top" :src="imageUrl" :alt="this.GameData.img_alt">
                    </div>
                </div>
            </div>

            <!-- 按鈕的列 -->
            <div class="col-md-4 align-self-center">
                <div v-for="i in question" class="mb-2">
                    <button type="button" class="btn btn-primary btn-block w-75" v-on:click="CheckAnswer(i)">{{ i }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetchJson from '@/utilitys/fetch-json.js';
export default {
    name: 'SelectGame',
    data(){
        return {
            imageUrl:'',
            question: [],
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

        //Other Game Methods
    },
    methods:{
        CheckAnswer(answer){
            if(answer == this.GameData.Answer){
                this.$emit('play-effect', 'CorrectSound')
                this.$emit('add-record',[this.GameData.Answer, answer,"正確"])
                this.$emit('next-question');
                console.log('check answer : True');
            }
            else{
                this.$emit('play-effect', 'WrongSound',)
                this.$emit('add-record',[this.GameData.Answer,answer,"錯誤"])
                console.log('check answer : False');
            }
        }
    },
    created() {
        for(var i in this.GameData.Question){
            this.question.push(this.GameData.Question[i]);
        }
        this.imageUrl=new URL(`../../assets/GamePic/${this.GameData.img}`, import.meta.url).href
        console.log(this.imageUrl);
    }
}
</script>
<style scoped>
.card {
    border-style: solid;
}
button {
    width: 150px;
}
</style>
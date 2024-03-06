<template>
<div class="container">
    <div class="row">
        <div class="col-8">
            <div class="card">
                <div class="card-body">
                    <img class="card-img-top" :src="imageUrl" :alt="GameData.img_alt">
                </div>
            </div>
        </div>
        <div class="col-4 align-self-center justify-content-center">
            <div class="card">
                <div class="card-body">
                    <p class="h2">{{ this.GameData.Question }}</p>
                </div>
            </div>
            <VirtualNumPad v-on:submit="GetSubmitData" ref="VirtualNumPad"></VirtualNumPad>
        </div>
    </div>
</div>
</template>

<script>
import VirtualNumPad from '@/components/VirtualNumPad.vue'; 
import * as CA from '@/utilitys/CheckAnswer.js';
export default {
    name: 'NumberInputGame',
    data() {
        return {
            imageUrl : ''
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
    methods: {
        GetSubmitData(data){
            console.log('Number Input Game Get:'+data);
            this.CheckAnswer(data);
        },
        CheckAnswer(data){
            var response=CA.CheckTrueFalseAnswer(data,this.GameData.Answer)
            console.log(response);
            if(response){
                this.$emit('play-effect', 'CorrectSound',)
                this.$emit('add-record',[this.answer, data,"正確"])
                this.$refs.VirtualNumPad.delete_num();
                this.$emit('next-question');
            }
            else{
                this.$emit('play-effect', 'WrongSound',)
                this.$emit('add-record',[this.answer, data,"錯誤"])
                this.$refs.VirtualNumPad.delete_num();
            }
            // this.$emit('check-answer',response,);
        }
    },
    created() {
        this.imageUrl=new URL(`../../assets/Games/`+this.id+`/${this.GameData.img}`, import.meta.url).href
        // console.log(this.imgsrc);
        // console.log(import.meta.url);
        // console.log(this.imageUrl);
    },
    components: {
        VirtualNumPad
    }
};
</script>

<style scoped>
/* Your component styles go here */
</style>

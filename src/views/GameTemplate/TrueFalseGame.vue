<template>
    <div class="container d-flex align-items-center justify-content-center">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card mx-auto">
                    <div class="card-body">
                        <img class="card-img-top GameImg" :src="imageUrl" alt="Card image cap">
                    </div>
                </div>
            </div>
            <div class="col-md-4 align-self-center">
                <div class="card row mx-auto mb-3">
                    <p class="h3">{{ this.GameConfig.GlobalTitle }}</p>
                    <div class="card-body">
                        {{ GameData.Question }}
                    </div>
                </div>
                <div class="d-flex justify-content-center mx-auto d-grid gap-4">
                    <button type="button" class="btn btn-primary" v-on:click="CheckAnswer(true)"><i class="bi bi-circle"></i>    正確</button>
                    <button type="button" class="btn btn-primary" v-on:click="CheckAnswer(false)"><i class="bi bi-x-lg"></i>    錯誤</button>
                </div>
            </div>
        </div>
    </div>
    <!-- <p>Control Panel</p>
    <button v-on:click="playrighteffect">playrighteffect</button>
    <button v-on:click="playwrongeffect">playwrongeffect</button>
    <button v-on:click="addrecodr">addrecodr</button>
    <button v-on:click="nextquestion">nextquestion</button> -->

</template>
<script>
import { GamesGetAssetsFile } from '@/utilitys/get_assets.js';
// import {hi} from "@/utilitys/jstest.js";
export default {
    name: 'TrueFalseGame',
    data(){
        return {
            imageUrl:""
        }
    },
    emits: ['play-effect','add-record','next-question'],
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
    methods:{
        CheckAnswer(answer){
            // typeof(answer);
            if(answer == this.GameData.Answer){
                this.$emit('play-effect', 'CorrectSound',)
                this.$emit('add-record',[this.GameData.Answer,answer,"正確"])
                this.$emit('next-question');
                console.log('check answer : True');
            }
            else{
                this.$emit('play-effect', 'WrongSound',)
                this.$emit('add-record',[this.GameData.Answer,answer,"錯誤"])
                console.log('check answer : False');
            }
        },

    },
    created() {
        this.imageUrl=GamesGetAssetsFile(this.id,this.GameData.img)
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
.GameImg{
    height: 60vh;
    width: auto;
}

</style>
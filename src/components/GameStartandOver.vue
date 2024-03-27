<template>
<div class="container d-flex justify-content-center align-content-center">
    <div v-if="Status=='NotStart'" class="d-flex flex-column justify-content-center m-5 d-grid gap-0">
        <h1>{{ GameName }}</h1>
        <div v-if="TextCheck">
            <h4 v-if="IntroType=='Html'" v-html="ShowContent"></h4>
            <h4 v-else-if="IntroType=='PlainText'">{{ShowContent}}</h4>
            <h4 v-else>無介紹文字</h4>
        </div>
        <button class="btn btn-primary" v-on:click="StartGame();MakeReadText('','',stop=true)">開始遊戲</button>
        <button class="btn btn-primary" v-on:click="MakeReadText(GameName,ShowContent)">朗讀</button>
    </div>
    <div v-else-if="Status=='Done'" class="d-flex flex-column justify-content-center m-5" id="Done">
        <img src="@/assets/Effects/Firework.gif" id="Effects">
        <div class="d-flex justify-content-center d-grid gap-3">
            <button class="btn btn-primary flex-grow-1" v-on:click="EndGame_WithoutDownload">結束遊戲</button>
            <button class="btn btn-primary flex-grow-1" v-on:click="EndGame">結束遊戲(下載紀錄)</button>
            <button class="btn btn-primary flex-grow-1" v-on:click="Restart">重新開始</button>
        </div>
    </div>
</div>
</template>
<script>
import * as RD from '@/utilitys/readtext.js';

export default {
    name: 'GameStartandOver',
    emits: ['start-game','download-record','restart'],
    data(){
        return {
            NameofThisComponent: 'GameStartandOver Component said:',
            TextCheck: false,
            IntroType: 'text',
            ShowContent: "",
            selectedVoice: null,
            voices: [],
        }
    },
    props: {
        GameName:{
            type: String,
        },
        intro: {
            type: Object,
        },
        Status: {
            type: String,
            required: true
        }
    },
    mounted(){
        RD.InitReadProccess();
        try{
            this.ShowContent = this.intro.Content;
            this.TextCheck = true;
            if (this.intro.Type=='Html' || this.intro.Type=='PlainText'){
                this.IntroType = this.intro.Type;
            }
        }
        catch(e){
            console.warn(this.NameofThisComponent + "No intro text found");
            console.log(e);
        }

    },
    methods:{
        MakeReadText(Title,Description,stop=false){
            let text =  `標題:${Title}。說明:${Description}。`;
            RD.ReadText(text,stop);
        },
        StartGame(){
            this.$emit('start-game');
        },
        EndGame(){
            this.$emit('download-record');
            this.$emit('previous-page');
        },
        EndGame_WithoutDownload(){
            this.$emit('previous-page');
        },
        Restart(){
            this.$emit('restart');
        }
    }
}
</script>
<style scoped>
.container{
    height: 75vh;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
#Effects{
    width: auto;
    height: 50vh;
}
</style>

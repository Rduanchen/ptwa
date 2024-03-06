<template>
<div class="container d-flex justify-content-center align-content-center">

    <div v-if="Status=='NotStart'" class="d-flex flex-column justify-content-around m-5">
        <h1>{{ GameName }}</h1>
        <h2>{{ Intro }}</h2>
        <button class="btn btn-primary" v-on:click="StartGame">開始遊戲</button>
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
export default {
    name: 'GameStartandOver',
    emits: ['start-game','download-record','restart'],
    data(){
        return {
         
        }
    },
    props: {
        GameName:{
            type: String,
            
        },
        Intro: {
            type: String,
        },
        Status: {
            type: String,
            required: true
        }
    },
    mounted(){
    },
    methods:{
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
/* #Done{
    height: 100%;
    width: 100%;
} */
</style>

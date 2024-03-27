<template>
<div class="container">
    <div class="row">
        <div class="col-8">
            <div class="card">
                <div class="card-body d-flex justify-content-center">
                    <img class="card-img-top GameImg" :src="imageUrl" :alt="GameData.img_alt">
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
import { GamesGetAssetsFile } from '@/utilitys/get_assets.js';
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
            var response=false;
            if(data == this.GameData.Answer){
                response=true;
            }
            else{
                response=false;
            }
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
        }
    },
    created() {
        this.imageUrl=GamesGetAssetsFile(this.id,this.GameData.img)
    },
    components: {
        VirtualNumPad
    }
};
</script>

<style scoped>
/* Your component styles go here */
.GameImg{
    overflow: hidden;
    height: 60vh;
    width: auto;
}
</style>

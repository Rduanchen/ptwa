<template>
<div class="container">
    
    <div class="row NumberContainer">
        <p>數字輸入鍵盤</p>
        <div class="NumRow">
            <button type="button" class="btn btn-primary" v-on:click="input('+')">+</button>
            <button type="button" class="btn btn-primary" v-on:click="input('1')">1</button>
            <button type="button" class="btn btn-primary" v-on:click="input('2')">2</button>
            <button type="button" class="btn btn-primary" v-on:click="input('3')">3</button>
        </div>
        <div class="NumRow">
            <button type="button" class="btn btn-primary" v-on:click="input('-')">-</button>
            <button type="button" class="btn btn-primary" v-on:click="input('4')">4</button>
            <button type="button" class="btn btn-primary" v-on:click="input('5')">5</button>
            <button type="button" class="btn btn-primary" v-on:click="input('6')">6</button>
        </div>
        <div class="NumRow">
            <button type="button" class="btn btn-primary" v-on:click="input('x')">x</button>
            <button type="button" class="btn btn-primary" v-on:click="input('7')">7</button>
            <button type="button" class="btn btn-primary" v-on:click="input('8')">8</button>
            <button type="button" class="btn btn-primary" v-on:click="input('9')">9</button>
        </div>
        <div class="NumRow">
            <button type="button" class="btn btn-primary" v-on:click="input('÷')">÷</button>
            <button type="button" class="btn btn-danger" v-on:click="delete_num()">清除</button>
            <button type="button" class="btn btn-primary" v-on:click="input('0')">0</button>
            <button type="button" class="btn btn-success" v-on:click="back()">倒退</button>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'VirtualNumPad',
    data(){
        return {
            Num:''
        }
    },
    emits:['virtualpadinput-Input','virtualpadinput-delete'],
    methods:{
        input(num){
            console.log('VirtualNumPad input:'+num);
            this.$emit('virtualpadinput-Input',num);
        },
        delete_num(){   
            this.$emit('virtualpadinput-delete');
        },
        back(){
            this.$emit('virtualpadinput-pop');
        }
    }
}
</script>

<style scoped>
.container{
    p{
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0.5rem 0;
        text-align: center;
    }
    button{
        width: 4rem;
        height: 3rem;
    }
}
.NumberContainer{

    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .NumRow{
        margin: 0.5rem 0;
        display: flex;
        gap: 0.5rem;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
}
</style>

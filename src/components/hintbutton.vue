<template>
    <p class="h3">錯誤次數{{WrongTimes}}</p>
    <div>
        <div class="progress">
            <div class="progress-bar bg-danger" role="progressbar" :class="{ p100:this.WrongTimes >= 2, p50:this.WrongTimes == 1, p0: this.WrongTimes ==0}" :aria-valuenow="percentage" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>
    <button class="btn btn-primary text-nowrap img-hover-zoom" data-bs-toggle="modal" data-bs-target="#hint" @click="gethint()" v-if="showhint">
        <div class="d-flex align-items-center">
            <div class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            </svg>
            </div>
            <div class="mx-auto">
                點我看提示
            </div>
        </div>
    </button>
</template>

<script>
export default {
    name: 'HintButton',
    data() {
        return {
            maxWrongTimes: 3,
            showhint: false,
            percentage: "50",
        };
    },
    props: {
        WrongTimes: {
            type: Number,
        },
    },
    watch: {
        WrongTimes: 'updated_hint_status',
    },
    methods: {
        PauseIntroVideo() {
            try{
            let video = document.getElementById("introvideo");
            video.pause();
            }catch{}
        },
        gethint() {
            this.$emit('provide-hint');
        },
        updated_hint_status() {
            if (this.WrongTimes >= this.maxWrongTimes) {
                this.showhint = true;
            };
            if (this.WrongTimes == 2){
                this.percentage = "100";
            }
            else if (this.WrongTimes == 1){
                this.percentage = "50";
            }
            else if (this.WrongTimes == 0){
                this.percentage = "0";
            }
        },
    },
    mounted() {
        // Code to run when the component is mounted goes here
    },
};
</script>

<style scoped>
.p100{
    width: 100%;
}
.p50{
    width: 50%;
}
.p0{
    width: 0%;
}
</style>
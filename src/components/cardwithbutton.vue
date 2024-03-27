<template>
<div>
    <div class="card">
    <img :src="imageURL" class="card-img-top" :alt="altText">
    <div class="card-body">
        <p class="card-text">{{ Text }}</p>
    </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'CardWithButton',
    data() {
        return {

        };
    },
    props: {
        Text: {
            type: String,
            required: true
        },
        altText: {
            type: String,
            required: true
        },
        imageURL: {
            type: String,
            required: true
        }
    },
    mounted() {
    },
};
</script>

<style scoped>
.card {
    width: 8rem;
}
</style>
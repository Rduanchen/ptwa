<template>
<div class="image-with-text">
    <ImageContainer :ID="this.ID" :Data="{ Src: this.Data.Src, Alt: this.Data.Alt }" ></ImageContainer>
    <p class="h1">{{ text }}</p>
</div>
</template>
<script>
import { GamesGetAssetsFile } from '@/utilitys/get_assets.js';
import ImageContainer from '@/components/ImageContainer.vue';
export default {
    name: 'ImageWithText',
    components: {
        ImageContainer
    },
    props: {
        Data: {
            type: Object,
            required: true
        },
        ID: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            imageUrl: '',
            text: ''
        };
    },
    mounted() {
        // Your code here
        this.imageUrl = GamesGetAssetsFile(this.ID, this.Data.Src);
        this.text = this.Data.Text;
    },
}
</script>

<style scoped>
.image-with-text {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    ImageContainer {
        width: 100%;
        height: 70%;
        border: solid;
    }
}
</style>
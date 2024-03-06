<template>

    <div class="container d-flex flex-column justify-content-center align-content-center"  id="main">
        <div class="row">
            <div class="spinner-border" role="status" style="width: 4rem; height: 4rem;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <br>
        <div class="row">
            <h2>頁面加載中....</h2>
        </div>
    </div>

</template>
<script>
export default {
    name: 'Loading',
}
</script>
<style scoped>
#main{
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>


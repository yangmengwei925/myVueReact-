<template>
    <ul class="booklist">
        <book-item v-for="(item, index) in books"  :book="item" :key="index"></book-item>
    </ul>
</template>
<script>
    import ajax from '../../js/api.js';
    import BookItem from './BookItem';
    export default {
        data() {
            return {
                storeBooks: null
            }
        },
        props: ['books'],
        components: {
            BookItem
        } 
    }
</script>
<style scoped lang="less">
    .booklist {     
        width: 100vw;
        background-color: #fff;
    }
</style>

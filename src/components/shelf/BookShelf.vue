<template>
    <div class="book-shelf">
        <ul>
            <li v-for="(item, index) in collectlist" :key="index" @click="onLinkToReader(item._id)">
                <img :src="staticUrl + item.cover">
                <span>{{item.title}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    import localStorage from '../../js/localStorage.js';
    export default {
        methods: {
            onLinkToReader(id) {
                this.$router.push({name: 'reader', params: {bookId: id}})
            }
        },
        data(){
            return {
                collectlist: [],
                staticUrl: 'http://statics.zhuishushenqi.com',
            }
        },
        created() {
            this.collectlist = localStorage.getLocalStorage('bookStorage');
            console.log(this.collectlist);
        }
    }
</script>
<style scoped lang="less">
    .book-shelf {
        ul {
            display: flex;
            flex-wrap: wrap;
            li {
                margin: 3vh 5vw;
                img { 
                    height: 17vh;
                    width: 22vw;
                }
                span {
                    display: block;
                    font-size: .5rem;
                }
            }
        }
    }
</style>
<template>
    <div class="mall-long">
        <MallTypeTitle :title="this.title" :major="this.content"></MallTypeTitle>
        <div class="mall-type-content" v-for="(item, index) in books" :key="index" @click="onLinkToInfo(item._id)">
            <img :src="staticUrl + item.cover">
            <div class="mall-type-content-introduce">
                <p class="introduce-1">{{item.title}}</p>
                <p class="introduce-2">{{item.minorCate}}|{{item.author}}</p>
                <p class="introduce-3">{{item.shortIntro}}</p>
            </div>
            <hr>
        </div>
    </div>
</template>
<script>
    import MallTypeTitle from './MallTypeTitle';
    import MallLongContent from './MallLongContent';
    import ajax from '../../js/api.js';
    export default {
        data(){
            return {
                staticUrl: 'http://statics.zhuishushenqi.com',
                books: null
            }
        },
        components: {
            MallTypeTitle,
            MallLongContent
        },
        props: [
            'title',
            'content'
        ],
        created(){
            ajax.getCategoryInfo('male', 'hot', this.content, '', 0, 3).then((res) => {
                console.log(res);
                this.books = res.data.books;
                console.log(this.books);
                this.books.length = 3;
            })
        },
        methods: {
            onLinkToInfo(id) {
                this.$router.push({name: 'bookinfo', params:{bookId: id}});
            }
        }
    }
</script>
<style scoped lang="less">
    .mall-type-content {
        position: relative;
        padding: 3vh 0px 0px 3.5vw;
        background-color: #fff;
        img {
            height: 16.5vh;
            width: 22vw;
        }
        .mall-type-content-introduce {
            width: 70vw;
            position: absolute;
            top: 1.5vh;
            left: 28vw;
            .introduce-1 {
                font-size: .8rem;
            }
            .introduce-2 {
                font-size: .7rem;
                color: #424242;
            }
            .introduce-3 {
                font-size: .5rem;
                color: #999490;
                white-space: nowrap;    
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        hr {
            background-color: #F5F4F5; 
            border: none;
            height: 2px;
            margin-bottom: 0;
        }
    }
</style>


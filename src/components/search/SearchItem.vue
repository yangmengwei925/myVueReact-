<template>
    <ul class="searchitem">
        <li tag="li" class="search-item-content" @click="onBookInfo(book)" v-for="(book, index) in books" :key="index">
            <img class="fontImg" :src="staticUrl + book.cover">
            <div class="search-item-content-introduce">
                <p class="introduce-1">{{book.title}}</p>
                <p class="introduce-2">{{book.lastChapter}}|{{book.author}}</p>
                <p class="introduce-3">{{book.shortIntro}}</p>
            </div>
            <img class="backImg" src="../../assets/greenyes.svg" v-if="joinList[book._id]" @click.stop="onMoveOut(book)">
            <img class="backImg" src="../../assets/join.svg" v-else @click.stop="onJoinIn(book)">
        </li>
    </ul>
</template>

<script>
    import localStorage from '../../js/localStorage.js';
    import {Toast} from 'mint-ui';

    export default {
        data () {
            return {
                staticUrl: 'http://statics.zhuishushenqi.com',
                joinList: {}
            }
        },
        computed: {
            books() {
                return this.$store.state.books;
            }   
        },
        created() {
            this.joinList = localStorage.getLocalStorage('bookStorage') ? localStorage.getLocalStorage('bookStorage') : {};
        },    
        methods: {
            onJoinIn(book) {
                let bookShelf = localStorage.getLocalStorage('bookStorage') ? localStorage.getLocalStorage('bookStorage') : {};
                bookShelf[book._id] = book;
                localStorage.setLocalStorage('bookStorage', bookShelf);
                this.$set(this.joinList, book._id, true);
                Toast({
                    message: '已添加到书架',
                    position: 'middle',
                    duration: 2000
                })
            },
            onMoveOut(book) {
                let bookShelf = localStorage.getLocalStorage('bookStorage');
                delete bookShelf[book._id];
                localStorage.setLocalStorage('bookStorage', bookShelf);
                this.$set(this.joinList, book._id, false);
            
                Toast({
                    message: '已移除书架',
                    position: 'middle',
                    duration: 2000
                })
            },
            onBookInfo(book) {
                this.$router.push({name: 'bookinfo', params:{bookId: book._id}});
            }
        }
    }
</script>
<style scoped lang="less">
    .searchitem {
        width: 100vw;
        background-color: #fff;
        .search-item-content{
            position: relative; 
            height: 18vh;
            margin-left: 5vw;
            background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
            background-size: 100% 2px;
            background-repeat: no-repeat;
            background-position: bottom; 
            .fontImg {
                height: 14vh;
                width: 18vw;
                position: absolute;
                top: 2vh;
                left: -2vw;
            }
            .search-item-content-introduce {
                width: 60vw;
                position: absolute;
                top: 1vh;
                left: 18.5vw;
                .introduce-1 {
                    font-size: .7rem;
                }
                .introduce-2 {
                    font-size: .6rem;
                    color: #424242;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .introduce-3 {
                    font-size: .4rem;
                    color: #999490;
                    /*box 第一代弹性盒子*/
                    display: -webkit-box;
                    /*块元素显示的文本行数*/
                    -webkit-line-clamp: 2;
                    /*水平排列还是竖直排列*/
                    -webkit-box-orient:vertical;
                    /*超出隐藏*/ 
                    overflow:hidden;
                }
            }
            .backImg {
                width: 7vw;
                position: absolute;
                z-index: 1;
                right: 5vw;
                top: 7vh;
            }
            .parclose {
                position: absolute;
                left: -5vw;
                width: 100vh;
                height: 18vh;
                background-color: rgba(0, 0, 0, 0);
                &:active {
                    background-color: rgba(0, 0, 0, .3); 
                }
            }
        }
    }
</style>

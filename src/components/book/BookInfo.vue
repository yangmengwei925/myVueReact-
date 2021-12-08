<template>
    <div class="book-info">
        <div class="book-info-header">
            <div class="search-header-left" style="display:flex;align-items: center" @click="onBack">
                <img src="../../assets/back.svg">
                <div class="search-header-left">返回</div>
            </div>
            <div class="search-header-right">
                <img src="../../assets/bookshelf.svg">
                <img src="../../assets/search.svg" @click="$router.push({name: 'search'})">
            </div>
            </div>
        <div class="mall-type-content">
            <img :src="this.staticUrl + book.cover" v-if="book.cover">
            <div class="mall-type-content-introduce">
                <p class="introduce-1">{{book.title}}</p>
                <p class="introduce-2">作者:{{book.author}}|更新:{{update}}</p>
                <p class="introduce-3">类型:{{book.minorCate}}</p>
            </div>
        </div>
        <div class="book-info-button">
            <mt-button type="primary" style="height: 30px; width: 28vw; font-size: .5rem" @click="onLinkToReader">立即阅读</mt-button>
            <mt-button type="primary" plain style="height: 30px; width: 28vw; font-size: .5rem" @click="onJoin">{{joinBookShelf ? '移出书架' : '加入书架'}}</mt-button>
            <mt-button type="primary" plain style="height: 30px; width: 28vw; font-size: .5rem">全本缓存</mt-button>
        </div>
        <div class="book-info-function">
            <div class="function-item">
                <img src="../../assets/ggood.png">
                <p>推荐</p>
            </div>
            <div class="function-item">
                <img src="../../assets/threeball.png">
                <p>分享</p>
            </div>
            <div class="function-item">
                <img src="../../assets/exclaim.png">
                <p>报错</p>
            </div>
            <div class="function-item">
                <img src="../../assets/talk.png">
                <p>评论</p>
            </div>
        </div>
        <div class="book-info-catalog">
            <mt-cell to="" is-link>
                <div class="book-info-catalog-content">
                    <span>目录 最经更新</span>
                    <span class="book-info-update">{{update}}</span>
                    <p>{{book.lastChapter}}</p>
                </div>
            </mt-cell>
        </div>
        <div class="book-info-introduce">
            <mt-cell title="作品简介" value="显示"></mt-cell>
            <p>{{book.longIntro}}</p>
        </div>
        <div class="book-info-usercomment">
            <mt-cell title="用户评论" value="更多">
            </mt-cell>
            <div class="info-usercomment-item" v-for="(item, index) in bookReviews" :key="index">
                <img :src="item.author.activityAvatar != '' ? staticUrl + item.author.activityAvatar : require('../../assets/head.svg')">
                <div class="usercomment-item-content">
                    <p class="p1">{{item.author.nickname}}</p>
                    <p class="p2">{{created(item.created)}}</p>
                </div>
                <div class="usercomment-item-footer">{{item.content}}</div>
            </div>
        </div>
        <div class="book-info-more">
            <div class="book-info-more-header">
                <img src="../../assets/blueuser.svg" alt="">
                <span>{{book.author}} 还写过</span>
            </div>
            <mt-cell class="mall-type-content" v-for="(item, index) in comAuthorBooks" :key="index">
                <img :src="staticUrl + item.cover">
                <div class="mall-type-content-introduce">
                    <p class="introduce-1">{{item.title}}</p>
                    <p class="introduce-2">作者: {{item.author}}</p>
                    <p class="introduce-3">{{item.lastChapter}}</p>
                </div>
            </mt-cell>
            <div class="book-info-more-footer">
                <span @click="more">{{ifmore ? '更多' : '收起'}}</span>
                <img src="../../assets/down.svg" v-if="ifmore">
                <img src="../../assets/up.svg" v-else>
            </div>  
        </div>
        <div class="book-info-sametype">
            <div class="book-info-sametype-header">
                <span class="header-left">同类推荐</span>
                <div class="header-right-wrapper" @click="exchange">
                    <img src="../../assets/refresh.svg">
                    <span class="header-right">换一换</span>
                </div>
            </div>
            <div class="book-info-sametype-content">
                <div v-for="(item, index) in aboutBooks" :key="index">
                    <img :src="staticUrl + item.cover">
                    <div>{{item.title}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import MallTypeTitle from '../mall/MallTypeTitle';
    import ajax from '../../js/api.js';
    import localStorage from '../../js/localStorage.js';
    import moment from 'moment';
    import {Indicator} from 'mint-ui';

    export default {
        name: 'bookinfo',
        data() {
            return {
                aboutIndex: 0,
                ifmore: true,
                joinBookShelf: false,
                book: {},
                reviews: [], 
                authorBooks: [],
                about: [],
                staticUrl: 'http://statics.zhuishushenqi.com',
            }
        },
        methods: {
            exchange() {
                console.log(this.about);
                console.log(this.aboutIndex, this.about.length);
                if(this.aboutIndex <= this.about.length - 5) {
                    this.aboutIndex += 4;
                }else {
                    this.aboutIndex = 0;
                }
            },
            more() {
                this.ifmore = !this.ifmore;
            },
            onBack() {
                this.$router.back();
                Indicator.close();
            },
            onJoin() {
                this.joinBookShelf = !this.joinBookShelf;
                let bookStorage = localStorage.getLocalStorage('bookStorage');
                if(this.joinBookShelf) {
                    if (bookStorage) {  
                            bookStorage[this.book._id] = this.book;
                    }else {
                        bookStorage = {};
                        bookStorage[this.book._id] = this.book;
                    }
                }else {
                    delete bookStorage[this.book._id];
                }
                localStorage.setLocalStorage('bookStorage', bookStorage);
            },
            created(time) {
                return moment(time).format('M-D hh:mm');
            },
            onLinkToReader() {
                this.$router.push({name: 'reader', params: {bookId: this.book._id}})
            }
        },
        computed: {
            update() {
                return moment(this.book.updated).format('GGGG/M/D hh:mm:ss');
            },
            comAuthorBooks() {
                if(this.ifmore) {
                    return this.authorBooks.slice(0, 3);
                }else {
                    return this.authorBooks;
                }
            },
            aboutBooks() {
                return this.about.slice(this.aboutIndex, this.aboutIndex + 4);
            },
            bookReviews() {
                return this.reviews.slice(0, 3);
            }
        },
        created() {
            let localShelf = localStorage.getLocalStorage('bookStorage');
            let bookId = this.$route.params.bookId;
            if(localShelf && localShelf[bookId]) {
                this.joinBookShelf = true;
            }
            Indicator.open();
            ajax.getBookInfo(bookId).then((res) => {
                this.book = res.data;
                console.log(this.book);
                ajax.getAuthorBooks(this.book.author).then((res) => {
                    console.log(res);
                    this.authorBooks = res.data.books;
                    console.log(this.authorBooks);
                    Indicator.close();
                })
            })
            
            ajax.getReviews(bookId, 'updated', 0, 2).then((res) => {
                this.reviews = res.data.reviews;
                console.log(this.reviews);
            })

            ajax.getBookRecommend(bookId).then((res) => {
                this.about = res.data.books;
            })
        },
        components: {
            MallTypeTitle
        }
    }
</script>
<style scoped lang="less">
    .book-info {
        background-color: #f6f6f6;
        // height: 200vh;
        width: 100vw;
        margin-top: 5vh;
        // margin-bottom: 6vh;
        .book-info-header {
            z-index: 10;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            align-items: center;
            justify-content: space-between;
            // box-sizing: border-box;
            background-color: #26a2ff;
            color: #fff;
            display: flex;
            font-size: 4vw;
            height: 10vw;
            // padding-left: 1vw;
            div {
                img {
                    width: 5vw;
                }
                width: 20vw;
                color: #fff;

                &.search-header-left {
                    margin-left: 2vw;
                    font-size: .8rem;
                    font-weight: bold;
                }
                &.search-header-right {
                    // width: 20vw;
                    line-height: 5vw;
                    img {
                        vertical-align: top;
                        font-size: .7rem;
                        margin-left: 8px;
                        font-weight: bold;
                    }
                }
            }
        }
        .mall-type-content {
            height: 19vh;
            background-color: #fff;
            position: relative;
            img {
                height: 15vh;
                width: 20vw;
                position: absolute;
                top: 2vh;
                left: 4vw;
            }
            .mall-type-content-introduce {
                position: absolute;
                top: 1.5vh;
                left: 28vw;
                .introduce-1 {
                    font-size: .8rem;
                    margin-bottom: 0px;
                }
                .introduce-2 {
                    font-size: .7rem;
                    color: #424242;
                    margin-bottom: 5px;
                    margin-top: 10px;
                }
                .introduce-3 {
                    font-size: .5rem;
                    color: #999490;
                    margin: 0px;
                }
            }
        }
        .book-info-button {
            background-color: #fff;
            display: flex;
            justify-content: space-around;
        }
        .book-info-function {   
            padding-top: 3vh;
            background-color: #fff;
            display: flex;
            justify-content: space-around;
            .function-item {
                img {
                    width: 7.5vw;
                }
                p {
                    font-size: .7rem;
                    color: #424242;
                    margin-top: 0;
                }
            }
        }
        .book-info-catalog {
            margin-top: 1.5vh;
            background-color: #fff;
            .book-info-catalog-content {
                padding-top: 1.5vh;
                .book-info-update {
                    margin-left: 37vw;
                    margin-right: 2vw; 
                }
            }
        }
        .book-info-introduce {
            background-color: #fff;
            p {
                font-size: .5rem;
                padding: 0 2vw 2.5vw 2vw;
                margin-top: 0;
                color: #424242;
            }
        }
        .book-info-usercomment {
            background-color: #fff;
            .info-usercomment-item {
                padding-top: 0.7vh;
                padding-left: 2vw;
                padding-right: 2vw;
                img {
                    width: 7.5vw;
                }
                .usercomment-item-content {
                    display: inline-block;
                    p {
                        color: #000;
                        margin: 0px;
                        &.p1{
                            font-size: .6rem;
                            font-weight: 900;
                        }
                        &.p2{
                            font-size: .5rem;
                            color: #424242;
                        }
                    }
                }
                .usercomment-item-footer {
                    padding-left: 1.5vw;
                    padding-bottom: 1.2vh;
                    font-size: .6rem;
                    color: #424242;
                    background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
                    background-size: 100% 1px;
                    background-repeat: no-repeat;
                    background-position: center bottom;
                }   
            }
        }
        .book-info-more {
            background-color: #fff;
            .book-info-more-header {
                padding: 0 2.5vw;
                height: 5vh;
                display: flex;
                align-items: center;
                img {
                    width: 5vw;
                }
                span {
                    margin-left: 1.2vw;
                    font-size: .6rem;
                }
            }
            .book-info-more-footer {
                padding: 2.5vw 0px;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                    width: 5vw;
                }
                span {
                    font-size: .7rem;
                }
            }
            .mall-type-content {
                margin-left: 5vw;
                position: relative;
                background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
                background-size: 100% 1px;
                background-repeat: no-repeat;
                background-position: center bottom;
                img {
                    height: 15vh;
                    width: 20vw;
                    position: absolute;
                    top: 1.5vh;
                    left: -2vw;
                }
                .mall-type-content-introduce {
                    position: absolute;
                    top: 1.2vh;
                    left: 23vw;
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
                    }
                }
            }
        }

        .book-info-sametype {
            background-color: #fff;
            .book-info-sametype-header {
                height: 3vh;
                line-height: 3vh;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .header-right-wrapper {
                    line-height: 17px;
                    img {
                        vertical-align: top;
                        width: 4vw;
                    }
                    .header-right {
                        // vertical-align: top;
                        font-size: .5rem;
                        color: #424242;
                    }
                    margin-right: 2vw;
                }
                .header-left {
                    font-size: .6rem;
                    margin-left:  10px;
                }
            }
            .book-info-sametype-content {
                display: flex;
                justify-content: space-between;
                padding: 1.2vh 5vw;
                img {
                    height: 15vh;
                    width: 20vw;
                }
                div {
                    font-size: .4rem;
                }
            }
        }

    }
</style>


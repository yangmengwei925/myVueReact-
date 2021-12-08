<template>
    <div class="bookreader" @click="onShowSettings" ref="container" v-scroll="onScroll">
        <div class="reader-title" ref="title">
            <span>{{chapterContents[readingChapter] ? chapterContents[readingChapter].title : ''}}</span>
        </div>
        <div class="reader-content" v-html="this.content" ref="content"></div>
        <div class="reader-footer" ref="footer">
            <span v-if="ifShowPage">第{{page}}/{{pages}}页</span>
        </div>
        <transition name="upshow">
            <div class="reader-upsetting" v-show="ifShowSettings">
                <img class="toleft" src="../../assets/left.svg" @click="onBack">
                <div class="reader-upsetting-right">
                    <button class="wrong">报错</button>
                    <button class="refresh">刷新</button>
                    <img class="nav" src="../../assets/nav.svg">
                </div>
            </div>  
        </transition>
        <transition name="downshow">
            <div class="reader-downsetting" v-show="ifShowSettings">
                <div class="reader-downsetting-up">
                    <span class="last" @click.stop="onLastChapter">上一章</span>
                    <span class="next" @click.stop="onNextChapter">下一章</span>
                </div>
                <div class="reader-downsetting-down">
                    <div @click.stop="onShowChapters">
                        <img src="../../assets/catalog.svg">
                        <span>目录</span>
                    </div>
                    <div>
                        <img src="../../assets/download.svg">
                        <span>缓存</span>
                    </div>
                    <div>
                        <img src="../../assets/word.svg">
                        <span>设置</span> 
                    </div>
                    <div>
                        <img src="../../assets/light.svg">
                        <span>亮度</span>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="chapters">
            <div class="reader-chapters" v-show="ifShowChapters">
                <div class="reader-chapters-wrapper">
                    <div class="reader-chapters-header">
                        <div class="reader-chapters-header-up">
                            <img src="../../assets/chaptersLeft.svg">
                            <span>大明望族</span>
                            <img src="../../assets/chaptersNav.svg" class="right" @click.stop="onReverse">
                        </div>
                        <div class="reader-chapters-header-middle">
                            <div>
                                <button class="left">目录</button>
                                <button class="right">书签</button>
                            </div>
                        </div>
                        <div class="reader-chapters-header-down">
                            <span>正文</span>
                        </div>
                    </div>
                    <ul class="reader-chapters-content">
                        <li v-for="(item, index) in chapters" :key="index" @click="onLinkToChapter(reverse ? chapters.length - index : index)">{{item.title}}<span v-if="ifCache(reverse ? chapters.length - index : index)">已缓存</span></li> 
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import ajax from '../../js/api.js';
    import {Indicator} from 'mint-ui';
    import Vue from 'vue';
    import localStorage from '../../js/localStorage.js';
    export default {
        created() {
            Indicator.open();
            this.bookId = this.$route.params.bookId;
            let chapterContents = localStorage.getLocalStorage(this.bookId);
            if(chapterContents) {
                this.chapterContents = chapterContents;
            }
            // 根据小说id获取小说源
            // 再根据小说源获取所有的章节
            ajax.getBookSources(this.bookId).then((res) => {
                let source = res.data[0]._id;
                ajax.getBookChapters(source).then((res) => {
                    console.log(res.data);
                    this.chapters = res.data.chapters;
                    this.readingChapter = 0;
                    Indicator.close();
                })
            })
        },
        watch: {
            readingChapter(to, from) {
                this.ifShowPage = false;
                this.$refs.container.scrollTop = 0;
            
                let last = to - 1;
                let next = to + 1;
                let length = this.chapters.length;
                let _to, _last, _next;
                if(this.reverse) {
                    _to = length - to;
                    _last = length - last;
                    _next = length - next;
                }else {
                    _to = to;
                    _last = last;
                    _next = next;
                }
                let ajaxs = [];
                if(!this.chapterContents[to] && (this.chapters[_to])) {
                    ajaxs.push(ajax.getBookChapterContent(this.chapters[_to].link))
                }else {
                    ajaxs.push(null);
                }
                if(!this.chapterContents[last] && this.chapters[_last]) {
                    ajaxs.push(ajax.getBookChapterContent(this.chapters[_last].link))
                }else {
                    ajaxs.push(null);
                }
                if(!this.chapterContents[next] && this.chapters[_next]) {
                    ajaxs.push(ajax.getBookChapterContent(this.chapters[_next].link))
                }else {
                    ajaxs.push(null);
                }
                Indicator.open('加载中...');
                Vue.http.all(ajaxs).then(Vue.http.spread( (a, b, c) => {
                    console.log(a, b, c);
                    if(a) {
                        this.chapterContents[to] = a.data.chapter;
                        this.chapterContents[to].body = this.chapterContents[to].body.replace(/\s+/g, '</br>&nbsp&nbsp&nbsp&nbsp&nbsp');
                    }
                    if(b) {
                        this.chapterContents[last] = b.data.chapter;
                        this.chapterContents[last].body = this.chapterContents[last].body.replace(/\s+/g, '</br>&nbsp&nbsp&nbsp&nbsp&nbsp');
                    }
                    if(c) {
                        this.chapterContents[next] = c.data.chapter;
                        this.chapterContents[next].body = this.chapterContents[next].body.replace(/\s+/g, '</br>&nbsp&nbsp&nbsp&nbsp&nbsp');
                    }
                    console.log(this.chapterContents);

                    // this.content = this.chapterContents[this.readingChapter].body;
                    this.content = this.chapterContents[this.readingChapter].cpContent;

                    this.$nextTick(() => {
                        let scrollHeight = this.$refs.container.scrollHeight - this.$refs.container.offsetHeight;
                        let containerHeight = this.$refs.container.offsetHeight - this.$refs.footer.offsetHeight - this.$refs.title.offsetHeight;
                        let pages = Math.ceil(scrollHeight / containerHeight);
                        this.containerHeight = containerHeight;
                        this.pages = pages;
                        this.ifShowPage = true;
                    })
                    Indicator.close();
                }))     
            }
        },
        beforeDestroy: function () {
            localStorage.setLocalStorage(this.bookId, this.chapterContents);
        },
        // 说好的this呢？
        methods: {
            onBack() {
                this.$router.back();
            },
            onScroll(e, pos) {
                let page = Math.ceil(pos.scrollTop / this.containerHeight);
                this.page =  page > 0 ? page : 1;
            },
            ifCache(index) {
                return this.chapterContents[index] ? true : false;
            },
            onLinkToChapter(index) {
                this.readingChapter = index;
            },
            onLastChapter() {
                if(this.readingChapter >= 1) {
                    this.readingChapter --;
                }
            },
            onNextChapter() {
                this.readingChapter ++;
            },
            loadingNextChapter() {
                let num = this.readingChapter + 1;
                ajax.getBookChapterContent(this.chapters[num].link).then((res) => {
                    this.chapterContents[this.readingChapter] = res.data.chapter.body;
                })
            },
            onReverse() {
                this.chapters = this.chapters.reverse();
                this.reverse = !this.reverse;
            },
            onShowSettings() {
                if(this.ifShowChapters === true) {
                    this.ifShowChapters = false;
                }else {
                    this.ifShowSettings = !this.ifShowSettings;
                }
            },
            onShowChapters() {
                this.ifShowChapters = true;
                this.ifShowSettings = false;
            }
        },
        data() {
            return {
                ifShowPage: false,
                readingChapter: null,
                chapters: [],
                ifShowSettings: false,
                ifShowChapters: false,
                content: ``,
                chapterContents: [],
                pages: null,
                page: 1,
                reverse: false
            }
        }
    }
</script>
<style scoped lang="less">
    .downshow-enter , .downshow-leave-to{
        transform: translateY(114vh);
    }
    .downshow-enter-active , .downshow-leave-active{
        transition: all .5s ease;
    }

    .upshow-enter, .upshow-leave-to {
        transform: translateY(-8vh);
    }
    .upshow-enter-active, .upshow-leave-active {
        transition: all .5s ease;
    }

    .chapters-enter, .chapters-leave-to {
        transform: translateX(-86vw);
    }
    .chapters-enter-active, .chapters-leave-active {
        transition: all .5s ease;
    }
    
    .bookreader {
        background-color: #F5EBC4;
        width: 100vw;
        height: 100vh;
	    overflow: auto;
        .reader-title {
            box-sizing: border-box;
            height: 5vh;
            padding: 1vh 2vw;
            background-color: #F5EBC4;
            width: inherit;
            color: #AFA794;
            font-size: .7rem;
            position: fixed;
            top: 0px;
        }
        .reader-content {
            // 这个属性在小说阅读中应该非常重要
            white-space: pre-wrap;
            padding: 5vh 4vw;
            height: auto;
            line-height: 4vh;
            font-size: 1rem;
        }
        .reader-footer {
            width: inherit;
            height: 5vh;
            background-color: #F5EBC4;
            color: #968F82;
            padding: 1vh 4vw;
            font-size: .6rem;
            position: fixed;
            box-sizing: border-box;
            bottom: 0px;
            span {
                float: right;
            }
        }
        .reader-upsetting {
            width: inherit;
            height: 8vh;
            background-color: rgba(0, 0, 0, .8);
            position: fixed;
            display: flex;
            justify-content: space-between;
            align-items: center;
            top: 0;
            .toleft {
                width: 5vw;
                margin-left: 1vw;
            }
            .reader-upsetting-right {
                display: flex;
                align-items: center;
                button {
                    color: #838383;
                    border: 1px solid #838383;
                    border-radius: 4px;
                    background-color: transparent;
                    // &.wrong {
                    //     margin-left: 50vw;
                    // }
                    &.refresh {
                        margin-left: 2vw;
                    }
                }
                .nav {
                    width: 5vw;
                    margin: 0 3vw;
                }
            }
        }
        .reader-downsetting {
            width: inherit;
            height: 14vh;
            background-color: rgba(0, 0, 0, .8);
            position: fixed;
            bottom: 0;
            .reader-downsetting-up {
                overflow: hidden;
                height: 7.5vh;
                border-bottom: 1px solid #838383;
                box-sizing: border-box;
                padding-top: 2.5vh;
                span {
                    color: #838383;
                    font-size: .7rem;
                    &.last {
                        margin-left: 3vw;
                        float: left;
                    }
                    &.next {
                        margin-right: 3vw;
                        float: right;
                    }
                }
            }
            .reader-downsetting-down {
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: .5vh 0;
                div {
                    height: 5vh;
                    width: 8vw;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    img {
                        width: 5vw;
                    }
                    span {
                        font-size: .6rem;
                        color: #838383;
                    }
                }
            }
        }
        .reader-chapters {
            position: fixed;
            top: 0;
            height: 100vh;
            width: 86vw;
            background-color: #DDD8CE;
            .reader-chapters-wrapper {
                margin-top: 4vh;
                .reader-chapters-header {
                    .reader-chapters-header-up {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        img {
                            width: 5vw;
                            margin: 0 3vw;
                            &.right {
                                width: 7vw;
                            }
                        }
                        span {
                            font-size: .8rem;
                        }
                    }
                    .reader-chapters-header-middle {
                        margin-top: 2vh;
                        display: flex;
                        justify-content: center;
                        div {
                            button {
                                height: 3.5vh;
                                width: 30vw;
                                background-color: transparent;
                                border-top: 1px solid #766359;
                                border-bottom: 1px solid #766359;
                                &.left {
                                    color: #fff;
                                    background-color: #7F6F65;
                                    border-left: 1px solid #766359;
                                    border-top-left-radius: 5px;
                                    border-bottom-left-radius: 5px;
                                }
                                &.right {
                                    color: #9F9288;
                                    border-right: 1px solid #766359;
                                    border-top-right-radius: 5px;
                                    border-bottom-right-radius: 5px;
                                    margin-left: -7px;
                                }
                            }
                        }
                    }
                    .reader-chapters-header-down {
                        margin-top: 1vh;
                        background-color: #C3BCB2;
                        span {
                            font-size: .6rem;
                            margin-left: 4vw;
                        }
                    }
                }
                .reader-chapters-content {
                    overflow: scroll;
                    height: 70vh;
                    li {
                        height: 3vh;
                        padding: 2vh 0;
                        font-size: .7rem;
                        margin-left: 5vw;
                        border-bottom: 1px solid #D5D1CC;
                        span {
                            color: #9E9E9D;
                            float: right;
                            margin-right: 1.5vw;
                        }
                    }
                }

            }
        }
    }
</style>

<template>
    <div class="beforesearch">
        <div class="search-content">
            <div class="book-info-sametype-header">
                <span class="header-left">热门搜索</span>
                <span class="header-right">换一换</span>
            </div>
            <div>
                <p class="hotbook" v-for="item in searchHot" :key="item">{{item}}</p>
            </div>
        </div>
        <div class="search-content down">
            <div class="book-info-sametype-header">
                <span class="header-left">搜索历史</span>
                <span class="header-right" @click="clearHistory">清空历史</span>
            </div>
            <ul>
                <li class="history" v-for="(item, key) in history" :key="key">
                    <img src="../../assets/clock.svg">
                    <span>{{item}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import localStorage from '../../js/localStorage.js';

    export default {
        data() {
            return {
                searchHot: ['我是至尊', '放开那个女巫', '修真四万年', '太古神王',
                '最强反派系统', '修真聊天群', '圣墟', '一念永恒'],
                searchHistory: ['凡人', '遮天'],
                history: []
            }
        },
        created() {
            let history = localStorage.getLocalStorage('history');
            this.history = history ? Array.from(history).reverse() : [];
        },
        methods: {
            clearHistory() {
                localStorage.setLocalStorage('history', []);
                this.history = [];
            }
        }
    }
</script>
<style scoped lang="less">
    .beforesearch {
        .search-content {
            &.down {
                min-height: 71vh;
            }
            margin-top: 1.5vh;
            padding-top: 1.5vh;
            padding-bottom: 1.5vh;
            background-color: #fff;
            .book-info-sametype-header {
                height: 3vh;
                overflow: hidden;
                .header-left {
                    float: left;
                    font-size: .7rem;
                    margin-left:  2.5vw;
                }
                .header-right {
                    float: right;
                    font-size: .5rem;
                    color: #424242;
                    margin-right: 2.5vw;
                }
            }

            .hotbook {
                font-size: .6rem;
                border-radius: 6px 6px;
                padding: 1vh 2.5vw;
                margin-left: 2.5vw;
                display: inline-block;
                background-color: #f6f6f6;
                color: #424242;
                margin-bottom: 0px;
            }

            .history {
                display: flex;
                align-items: center;
                margin-top: 1.5vh;
                margin-left: 2.5vw;
                padding-bottom: 1.5vh;
                background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
                background-size: 100% 1px;
                background-position: center bottom;
                background-repeat: no-repeat;
                // background-position: center center; 
                img {
                    margin-right: 2.5vw;
                    width: 3vw;
                }
                span {
                    font-size: .7rem;
                    color: #424242;
                }
            }
        }
    }
</style>

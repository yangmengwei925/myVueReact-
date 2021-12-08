<template>
    <div class="small-ranking-list">
        <mt-header fixed title="最热榜Top100">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>       
            <img style="height:20px;margin-left: 65px;" src="../../assets/search.svg" slot="right">
        </mt-header>
		<ul class="ranking-nav">    
			<router-link tag="li" :to="{name: 'smallrankinglist', params: {category: 'week'}}">周榜</router-link>
			<router-link tag="li" :to="{name: 'smallrankinglist', params: {category : 'month'}}" exact>月榜</router-link>
			<router-link tag="li" :to="{name: 'smallrankinglist', params: {category : 'total'}}" exact>总榜</router-link>
		</ul>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <book-list :books="books"></book-list>
            <div slot="bottom" class="mint-loadmore-bottom">
                <!-- 正常情况-->
                <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                <!-- 加载中 -->
                <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
        </mt-loadmore> 
    </div>

</template>
<script>
    import ajax from '../../js/api.js';
    import BookList from '../book/BookList';
    import {Indicator} from 'mint-ui';
    export default {
        data(){
            return {
                staticUrl: 'http://statics.zhuishushenqi.com',
                books: null,
                checked: 'hot',
                booknum: 1,
                allLoaded: false,
                topStatus: 'loading'
            }
        },
        components: {
            BookList
        },
        watch: {
            $route(to, from) {
                this.booknum = 1;
                console.log(to, from);
                Indicator.open('加载中...');
                let type = to.params.category;
                switch(type) {
                    case 'week':
                        this.checked = 'hot';
                        break;
                    case 'month':
                        this.checked = 'new';
                        break;
                    case 'total':
                        this.checked = 'over';
                        break;
                    default: 
                        console.log('no type');
                }
                ajax.getCategoryInfo('male', this.checked, this.major, '', 0, 20).then((res) => {
                    this.books = res.data.books;
                    Indicator.close()
                })
            }
        },
        methods: {
            loadTop() {
                this.$refs.loadmore.onTopLoaded();
            },

            loadBottom() {
                this.booknum ++;
                Indicator.open('加载中...');
                ajax.getCategoryInfo('male', this.checked, this.major, '', 0, this.booknum * 20).then(res => {
                    this.books = res.data.books;
                    this.topStatus = '';
                    Indicator.close();
                }).catch(err => {
                    console.log(err)
                })

                this.$refs.loadmore.onBottomLoaded();
            }
        },
        created(){
            this.major = this.$route.query.type;
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                Indicator.open('加载中')
                ajax.getCategoryInfo('male', 'hot' , vm.major, '', 0, 20).then((res) => {
                    vm.books = res.data.books;
                    Indicator.close()
                })
            })
        }
    }
</script>
<style scoped lang="less">
    .small-ranking-list {
        padding-top: 7vh;
        background-color: #f6f6f6;
        .ranking-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100vw;
            height: 5vh;
            li {
                margin: 0 11vw;
                box-sizing: border-box;
                text-align: center;
                height: inherit;
                line-height: 5vh;
                width: 33.3%;
                &.router-link-active {
	                border-bottom: 3px #04b1ff solid;
                }
            }
        }
    }
</style>


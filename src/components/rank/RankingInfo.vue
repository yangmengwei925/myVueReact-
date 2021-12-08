<template>
	<div class="rankinginfo">
		<mt-header fixed :title="title" @click.native="onBack">
			<router-link to="/" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
		<ul class="ranking-nav">
			<router-link tag="li" :to="{name: 'rankinginfo', params: {type: 'week'}}" exact>周榜</router-link>
			<router-link tag="li" :to="{name: 'rankinginfo', params: {type : 'month'}}" exact>月榜</router-link>
			<router-link tag="li" :to="{name: 'rankinginfo', params: {type : 'total'}}" exact>总榜</router-link>
		</ul>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <book-list :books="books"></book-list>
        </mt-loadmore>
	</div>
</template>

<script>
    import BookList from '../book/BookList';
    import ajax from '../../js/api.js';
    import {Indicator} from 'mint-ui';

    export default {
        data () {
            return {
                books: [],
                rankid: '',
                week: '',
                month: '',
                total: '',
                title: '',
                booknum: 1,
                allLoaded: false,
            }
        },
        components: {
            BookList
        },
        created() {
            let ranking = this.$store.state.ranking;
            this.week = ranking._id;
            this.month = ranking.monthRank;
            this.total = ranking.totalRank;
            this.title = ranking.title;
        },
        watch: {
            $route(to, from) {
                this.booknum = 1;
                Indicator.open('加载中');
                let type = to.params.type;
                switch(type) {
                    case 'week': 
                        this.rankid = this.week;
                        break;
                    case 'month': 
                        this.rankid = this.month;
                        break;
                    case 'total':
                        this.rankid = this.total;
                        break;
                    default:
                        console.log('no rank type');
                }
                ajax.getRank(this.rankid).then((res) => {
                    this.books = res.data.ranking.books.slice(0, 20);
                    Indicator.close();
                }).catch((err)=> {
                    Indicator.close();
                })
            }
        },
        methods: {
            onBack() {
                Indicator.close();
            },
            loadTop() {
                this.$refs.loadmore.onTopLoaded();
            },

            loadBottom() {
                this.booknum ++;
                Indicator.open('加载中...');

                ajax.getRank(this.rankid).then((res) => {
                    this.books = res.data.ranking.books.slice(0, 20 * this.booknum);
                    Indicator.close();
                }).catch((err)=> {
                    console.log(err);
                    Indicator.close();
                })

                this.$refs.loadmore.onBottomLoaded();
            }
        },
        beforeRouteEnter(to, from, next){
            next((vm) => {
                Indicator.open('加载中');
                let type = to.params.type;
                ajax.getRank(vm.week).then((res) => {
                    console.log(res);
                    vm.books = res.data.ranking.books.slice(0, 20);
                    Indicator.close();
                })
            })
        }
    }
</script>

<style scoped lang="less">
    .rankinginfo {
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

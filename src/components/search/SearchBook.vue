<template>
    <div class="search-book">
        <div class="search-header">
            <div style="display:flex;align-items: center" @click="onBack">
                <img src="../../assets/back.svg">
                <div class="search-header-left">返回</div>
            </div> 
            <input type="text" placeholder="搜索书名或者作者名" v-model="keyword">
            <div class="search-header-right" @click="onClickSearch">搜索</div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import ajax from '../../js/api.js';
    import {Indicator} from 'mint-ui';
    import localStorgae from '../../js/localStorage.js';

    export default {
        data(){
            return { 
                keyword: ''
            }
        },
        methods: {
            onBack() {
                this.$router.push({name: 'homepage'});
                Indicator.close();
            },
            onClickSearch() {
                let history = localStorgae.getLocalStorage('history');
                let set = history ? new Set(history) : new Set();
                set.add(this.keyword);
                localStorgae.setLocalStorage('history', set);

                Indicator.open();
                ajax.getSearch(this.keyword).then((res) => {
                    let books = res.data.books;
                    this.$store.commit('SET_BOOKS', books);
                    this.$router.push({name: 'aftersearch'});
                    Indicator.close();
                })
            }
        }
    }
</script>
<style scoped lang="less">
.search-book {
    padding-top: 5vh;
    height: 100vh;
    background-color: #f6f6f6;
    .search-header {
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
        width: 96vw;
        align-items: center;
        background-color: #26a2ff;
        color: #fff;
        display: flex;
        font-size: 5vw;
        height: 40px;
        padding: 0 2vw;
        img {
            width: 20px;
        }
        div {
            color: #fff;
            // outline: none;
            &.search-header-left {
                font-size: .8rem;
                font-weight: bold;
                padding-left: 0px;
            }
            &.search-header-right {
                font-size: .7rem;
                // margin-left: 8px;
                font-weight: bold;
            }
        }
        input {
            outline: none;
            flex: 1;
            height: 26px;
            border-radius: 5px 5px;
            border: 1px solid #fff;
            margin: 0 1vw;
        }
    }
}

</style>


<template>
    <div class="book-mall">
        <div class="mall-nav">
            <router-link to=""  class="mall-nav-link">
                <div class="mall-1"></div>
                <span>推荐</span>
            </router-link>
            <router-link to="" class="mall-nav-link">
                <div class="mall-2"></div>
                <span>收藏</span>
            </router-link>
            <router-link to="" class="mall-nav-link">
                <div class="mall-3"></div>
                <span>热更</span>
            </router-link>
            <router-link to="" class="mall-nav-link">
                <div class="mall-4"></div>
                <span>完结</span>
            </router-link>
        </div>
        <mall-type title="男生爱看" content="玄幻"></mall-type>
        <mall-type title="女生爱看" content="都市"></mall-type>
        <mall-long title="火热新书" content="历史"></mall-long>
        <mall-long title="热门连载" content="军事"></mall-long>
        <mall-long title="重磅推荐" content="游戏"></mall-long>
    </div> 
</template>
<script>
    import Vue from 'vue';
    import MallType from './MallType';
    import MallLong from './MallLong';
    import ajax from '../../js/api.js';
    import {Indicator} from 'mint-ui';
    export default {
        data(){
            return {
            }
        },     
        components: {
            MallType,
            MallLong
        },
        methods: {
            // 获取分类中的信息
            getCategoryInfo(gender, type, major, minor) {
                Indicator.open('加载中')
                ajax.getCategoryInfo(gender, type, major, minor).then(response => {
                    Indicator.close()
                    this.books = response.data.books
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
<style scoped lang="less">
    .book-mall {
    background-color: #f6f6f6;
    .mall-nav {
        height: 10vh;
        width: 100vw;
        padding-top: 2vh;
        padding-bottom: .8vh;
        display: flex;
        justify-content: space-around;
        background-color: #fff;
        font-size: 0.6rem;
        margin-bottom: 1.3vh;
        .mall-nav-link {
            width: 13vw;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            div {
                height: 12vw;
                width: 12vw;
                background-color: black;
                border-radius: 6vw;
                background-size: 7vw;
                background-repeat: no-repeat;
                background-position: center;
                &.mall-1 {
                    background-image: url(../../assets/mall-1.svg);
                    background-color: #EF999B;
                }
                &.mall-2 {
                    background-image: url(../../assets/mall-2.svg);
                    background-color: #F4B482;
                }
                &.mall-3 {
                    background-image: url(../../assets/mall-3.svg);
                    background-color: #88E5AD;
                }
                &.mall-4 {
                    background-image: url(../../assets/mall-4.svg);
                    background-color: #88E5AD;
                }
            }
        }
    }
    .mall-type{       
        .mall-type-title {
            background-color: #31a2fb;
            .mall-type-title-cell {
                margin-left: 1vw;
                span {
                    margin-right: -1.5vw;
                }
            }
        }
        .mall-type-content {
            height: 22vh; 
            width: 100%;
            padding-top: 3vh;
            margin-bottom: 1.5vh;
            background-color: #fff;
            display: flex;
            justify-content: space-around;
            img { 
                height: 16.5vh;
                width: 22vw;
            }
            span{
                display: block;
                font-size: .5rem;
            }
        }
    }
}
</style>
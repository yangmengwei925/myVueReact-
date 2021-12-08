<template>
    <div class="mall-type-content">
        <img src="http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F_1228859_441552.jpg%2F">
        <div class="mall-type-content-introduce">
            <p class="introduce-1">替天行道</p>
            <p class="introduce-2">历史军事|石章鱼</p>
            <p class="introduce-3">风本无形，我欲猎风！九州笑傲，替天行道！...</p>
        </div>
        <hr>
    </div>
</template>
<script>
    export default {
        name: 'MallLongContent',
        props: ['title', 'index'],
        data(){
            return {
                staticUrl: 'http://statics.zhuishushenqi.com',
                books: null
            }
        }  
    }
</script>
<style scoped lang="less">
    .mall-type-content {
        position: relative;
        padding: 20px 0px 0px 15px;
        background-color: #fff;
        img {
            height: 117px;
            width: 90px;
        }
        .mall-type-content-introduce {
            position: absolute;
            top: 10px;
            right: 45px;
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
        hr {
            background-color: #F5F4F5; 
            border: none;
            height: 2px;
            margin-bottom: 0;
        }
    }

</style>


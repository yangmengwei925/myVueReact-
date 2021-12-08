<template>
	<li class="mall-type-content" style="height: 146px;margin-left: 20px" @click="OnBookInfo">
        <img :src="staticUrl + book.cover">
        <div class="mall-type-content-introduce">
            <p class="introduce-1">{{book.title}}</p>
            <p class="introduce-2">{{book.minorCate}}|{{book.author}}</p>
            <p class="introduce-3">{{book.shortIntro}}</p>
        </div>
    </li>
</template>

<script>
export default {
    data () {
        return {
            staticUrl: 'http://statics.zhuishushenqi.com',
        }
    },
    props: ['book'],
    methods: {
        OnBookInfo() {
            this.$router.push({name: 'bookinfo', params:{bookId: this.book._id}});
        }
    }
}
</script>
<style scoped lang="less">
    .mall-type-content{
        position: relative; 
        background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 100% 2px;
        background-repeat: no-repeat;
        background-position: bottom; 
        img {
            height: 16vh;
            width: 22vw;
            position: absolute;
            top: 2vh;
            left: -2vw;
        }
        .mall-type-content-introduce {
            width: 70vw;
            position: absolute;
            top: 1vh;
            right: 2vw;
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
    }
</style>

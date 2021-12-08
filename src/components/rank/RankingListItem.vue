<template>
    <div class="ranking-list-item">
        <img :src="iconUrl" class="icon" v-if="iconUrl">
        <div :class="{iconmargin: !iconUrl}">{{this.title}}</div>
        <img class="ud" src="../../assets/down.svg" v-if="ifmore === false">
        <img class="ud" src="../../assets/up.svg" v-else-if="ifmore === true">
    </div>
</template>
<script>
    export default {
        data(){
            return {
                ificon: true
            }
        },
        props: ['title', 'iconUrl', 'ifmore'],
    }
</script>
<style scope lang="less">
    .ranking-list-item {
        background-color: #fff;
        height: 46px;
        display: flex;
        align-items: center;
        .icon {
            height: 30px;
            width: 34px;
            padding-left: 10px;
        }
        div {
            padding: 10px 0 10px 10px;
            width: 100%;
            border-bottom: 2px solid #F5F4F5;
            &.iconmargin {
                margin-left: 44px;
            }
        }
        .ud {
            height: 18px;
            margin-right: 15px;
        }
    }
</style>


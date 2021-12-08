<template>
  <div class="ranking-list">
        <span>男生</span>
        <ul>
            <li v-for="(item, index) in itemlist" :key="index" @click="onLinkToRanking(item.maleInfo)">
                <ranking-list-item :title="item.title" :iconUrl="item.iconUrl" :ifmore="item.ifmore"></ranking-list-item>
            </li>
            <v-touch @tap="onShowHidden(0)">
                <li>                              
                    <ranking-list-item :title="speItemMale.title" :iconUrl="speItemMale.iconUrl" :ifmore="speItemMale.ifmore"></ranking-list-item>
                </li>
            </v-touch>
            <ul v-if="ifshow[0]">
                <li v-for="(item, index) in hiddenlist" :key="index + 100" @click="onLinkToRanking(item.info)">
                    <ranking-list-item :title="item.title" :iconUrl="item.iconUrl" :ifmore="item.ifmore"></ranking-list-item>
                </li>
            </ul>
        </ul>
        <span>女生</span>
        <ul>
            <li v-for="(item, index) in itemlist" :key="index" @click="onLinkToRanking(item.femaleInfo)">
                <ranking-list-item :title="item.title" :iconUrl="item.iconUrl" :ifmore="item.ifmore"></ranking-list-item>
            </li>
            <v-touch @tap="onShowHidden(1)">
                <li>                              
                    <ranking-list-item :title="speItemFemale.title" :iconUrl="speItemFemale.iconUrl" :ifmore="speItemFemale.ifmore"></ranking-list-item>
                </li>
            </v-touch>
            <ul v-if="ifshow[1]">
                <li v-for="(item, index) in hiddenlist" :key="index + 100" @click="onLinkToRanking(item.info)">
                    <ranking-list-item :title="item.title" :iconUrl="item.iconUrl" :ifmore="item.ifmore"></ranking-list-item>
                </li>
            </ul>
        </ul>
  </div>
</template>
<script>
    import RankingListItem from './RankingListItem';
    import ajax from '../../js/api.js';
    export default {
        methods: {
            onShowHidden(id) {
                this.ifshow.splice(id, 1, !this.ifshow[id])
                if( id == 0) {
                    this.speItemMale.ifmore = !this.speItemMale.ifmore;
                } else if (id == 1) {
                    this.speItemFemale.ifmore = !this.speItemFemale.ifmore;
                }
            },
            onLinkToRanking(ranking) {
                this.$router.push({name: 'rankinginfo', params: {type: 'week'}});
                this.$store.commit('SET_RANKING', ranking);
            }
        },
        data(){
            return {
                ifshow: [false, false],
                rankinglist: null,
                itemlist: [{
                    title: '最热榜Top100',
                    iconUrl: require('../../assets/hot.png')
                }, {
                    title: '完结榜Top100',
                    iconUrl: require('../../assets/yes.png')
                }, {
                    title: '收藏榜Top100',
                    iconUrl: require('../../assets/newstar.png')
                }, {
                    title: '推荐榜Top100',
                    iconUrl: require('../../assets/newgood.png')
                }, {
                    title: '新书榜Top100',
                    iconUrl: require('../../assets/newbook.png')
                }],
                hiddenlist: [{
                    title: '纵横排行榜'
                }, {
                    title: '起点排行榜'
                }, {
                    title: '逐浪点击帮'
                }, {
                    title: '潇湘书院排行榜'
                }],
                speItemMale: {
                    title: '更多排行',
                    iconUrl: require('../../assets/morerank.png'),
                    ifmore: false
                },
                speItemFemale: {
                    title: '更多排行',
                    iconUrl: require('../../assets/morerank.png'),
                    ifmore: false
                }
            }
        },
        created() {
            ajax.getRankCategory().then(res => {
                const rankinglist = res.data;
                this.itemlist.forEach((item, index) => {
                    this.$set(this.itemlist, index, Object.assign(item, {
                        maleInfo: rankinglist.male[index],
                        femaleInfo: rankinglist.female[index]
                    }));
                })

                this.hiddenlist.forEach((item, index) => {
                    this.$set(this.hiddenlist, index, Object.assign(item, {
                        info: rankinglist.epub[index]
                    }));
                })
            }).catch(err => {
                console.log(err)
            })
        },
        components: {
            RankingListItem
        }
    }
</script>
<style scoped lang="less">
    .ranking-list {
        background-color: #f6f6f6;
        span {
            display: inline-block;
            margin-left: 18px;
            font-size: .5rem;
        }
    }
</style>


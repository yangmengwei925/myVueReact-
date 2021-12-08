<template>
  <div class="hello">
    <!-- 书架 放大镜 three 书城 放大镜 分类 排行榜是放大镜-->
    <mt-header fixed :title="selected">
      <img style="height: 28px;margin-left: 10px;" src="./../assets/touxiang.png" slot="left">
      <img style="height: 20px;margin-left: 65px;" src="./../assets/search.svg" slot="right" @click="linkToSearch" v-if="selected == '排行榜'">
      <img style="height: 20px;margin-left: 30px;" src="./../assets/search.svg" slot="right" @click="linkToSearch" v-else>
      <img style="height: 20px;margin-left: 20px;" src="./../assets/list.svg" slot="right" v-if="selected=='书架'">
      <router-link to="" slot="right" style="margin-left: 20px;" v-if="selected=='书城'">分类</router-link>
    </mt-header>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="书架">
        <book-shelf class="tab-container"></book-shelf>
      </mt-tab-container-item>
      <mt-tab-container-item id="书城">
        <keep-alive>
          <book-mall class="tab-container"></book-mall>
        </keep-alive>
      </mt-tab-container-item>
      <mt-tab-container-item id="排行榜">
        <ranking-list class="tab-container"></ranking-list>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected" fixed style="font-size: 1rem  "> 
      <mt-tab-item id="书架" footer>
          <img slot="icon" src="../assets/shujia.png" alt="">
        书架
      </mt-tab-item>
      <mt-tab-item id="书城">
        <img slot="icon" src="../assets/shucheng.png" alt="">
        书城
      </mt-tab-item>
      <mt-tab-item id="排行榜">
        <img slot="icon" src="../assets/paihangbang.png" alt="">
        排行榜
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>


<script>
import BookMall from './mall/Bookmall';
import RankingList from './rank/RankingList';
import BookShelf from './shelf/BookShelf';
import SmallRankingList from './rank/SmallRankingList';
import BookInfo from './book/BookInfo';
import SearchBook from './search/SearchBook';

export default {
  name: 'homepage',
  data () {
    return {
      selected: '书架',
    }
  },
  methods: {
    linkToSearch() {
      this.$router.push({name: 'search'});
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(vm);
      vm.selected = vm.$store.state.backPosition;
    })
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('SET_BACKPOSITION', this.selected);
    next();
  },
  components: { 
    BookMall,
    RankingList,
    BookShelf,
    SmallRankingList,
    BookInfo,
    SearchBook
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .tab-container {
    box-sizing: border-box;
    padding-top: 7vh;
    padding-bottom: 11vh;
    width: 100vw;
    min-height: 100vh;
}
</style>

import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage';

import BookInfo from '@/components/book/BookInfo';
// 神一样的问题
import BookMall from '@/components/mall/Bookmall';
import RankingList from '@/components/rank/RankingList';
import BookShelf from '@/components/shelf/BookShelf';

import SmallRankingList from '@/components/rank/SmallRankingList';
import RankingInfo from '@/components/rank/RankingInfo';
import SearchBook from '@/components/search/SearchBook';
import BeforeSearch from '@/components/search/BeforeSearch';
import SearchItem from '@/components/search/SearchItem';

import BookList from '@/components/book/BookList';
import BookReader from '@/components/book/BookReader';


// console.log(BookList);

// @是 resolve('src') 的别名
// 配置在webpack.base.conf.js中

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePage,
      // children: [{
      //   path: '',
      //   name: 'bookshelf',
      //   component: BookShelf
      // }, {
      //   path: 'bookmall',
      //   name: 'bookmall',
      //   component: BookMall
      // }, {
      //   path: 'rankinglist',
      //   name: 'rankinglist',
      //   component: RankingList
      // },]
    }, {
      path: '/reader/:bookId',
      name: 'reader',
      component: BookReader
    },{
      path: '/bookinfo/:bookId',
      name: 'bookinfo',
      component: BookInfo
    }, {
      path: '/smallrankinglist/:category',
      name: 'smallrankinglist',
      component: SmallRankingList
    }, 
    {
      path: '/rankinginfo/:type',
      name: 'rankinginfo',
      component: RankingInfo,  
    }, 
    {
      path: '/smallrankinginfo/:type',
      name: 'smallankinginfo',
      component: RankingInfo,
    }, 
    {
      // 会自动给你加上一个/
      path: '/search',
      component: SearchBook,
      children: [{
        path: '',
        name: 'search',
        component: BeforeSearch
      }, {
        path: 'aftersearch',
        name: 'aftersearch',
        component: SearchItem
      }]
    }
  ]
})

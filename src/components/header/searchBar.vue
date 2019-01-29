<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <a href="#">
          <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
        </a>
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="searchWord" placeholder="搜索商家或地点" @focus="focusFn" @blur="blurFn" @input="inputFn"></el-input>
          <el-button type="primary" icon="el-icon-search"></el-button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in hotPlaceList" :key="index">
              <router-link :to='{name: "goods", params: {name: item}}'>{{item}}</router-link>
            </dd>

            <!-- <dd>
              <router-link to="/">京东第一温泉度假村</router-link>
            </dd>
            <dd>
              <router-link to="/">99旅馆连锁</router-link>
            </dd>
            <dd>
              <router-link to="/">尚客优快捷酒店</router-link>
            </dd> -->
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item, index) in searchList" :key="index">
              <router-link :to="{name: 'goods', params: {name: item}}">{{item}}</router-link>
            </dd>
            <!-- <dd>
              <router-link to="/a">火锅</router-link>
            </dd>
            <dd>
              <router-link to="/">火锅外卖</router-link>
            </dd>
            <dd>
              <router-link to="/">火锅自助餐</router-link>
            </dd> -->
          </dl>
        </div>
        <p class="suggest">
          <a  v-for="(item, index) in suggestList" :key="index" :href="'/s/'+ item" @click="tongBuInput(item)">{{item}}</a>
          <!-- <a href="#">北京故宫博物院</a>
          <a href="#">北京欢乐谷</a>
          <a href="#">静之湖滑雪场</a>
          <a href="#">尚隐·泉都市生活馆</a>
          <a href="#">故宫珍宝馆</a>
          <a href="#">军都山滑雪场</a> -->
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import axios from '@/axios.js'
import api from '@/api/index.js'
export default {
  data () {
    return {
      searchWord: '',
      isFocus: false,
      hotPlaceList: ['京东第一温泉度假村', '99旅馆连锁', '尚客优快捷酒店'],
      searchList: ['火锅', '火锅外卖', '火锅自助餐'],
      suggestList: ['北京故宫博物院', '北京欢乐谷', '静之湖滑雪场', '尚隐·泉都市生活馆', '故宫珍宝馆', '军都山滑雪场']
    }
  },
  created() {
    // axios.get('http://api.duyiedu.com/api/meituan/header/searchHotWords.json', {
    //   params: {
    //     appkey: "wangtao_1546593590617"
    //   }
    // }).then( res => {
    //   this.hotPlaceList = res.data.data
    //   this.suggestList = res.data.data
    // })

    // axios.get('/api/meituan/header/searchHotWords.json').then(res => {
    //   // console.log(res)
    //   this.hotPlaceList = res.data.data
    //   this.suggestList = res.data.data
    // })

    api.searchHotWords().then(res => {
      this.hotPlaceList = res.data.data
      this.suggestList = res.data.data
    })
  },
  computed: {
    isHotPlace () {
      return this.isFocus && !this.searchWord
    },
    isSearchList () {
      return this.isFocus && this.searchWord
    }
  },
  methods: {
    focusFn () {
      this.isFocus = true
    },
    blurFn () {
      setTimeout(() => {
        this.isFocus = false
      }, 200)
    },
    tongBuInput(clickItem) {
      // this.searchWord = clickItem
    },
    inputFn() {
      api.getSearchList().then(res => {
        // 由于后端没有进行过滤，所以前端需要进行关键字过滤
        this.searchList = res.data.data.list.filter((item, index) => {
          return item.indexOf(this.searchWord) > -1
        })
      })
    }

  }
}
</script>

<style lang="scss">
  @import "@/assets/css/public/header/search.scss";
</style>

<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="menuLeave()">
      <dt>全部分类</dt>
      <dd v-for="(item, index) in menuList" :key="index" @mouseenter="menuEnter(item)">
        <i :class="item.type"></i>
        {{item.name}}
        <span class="arrow"></span>
      </dd>
      <!-- <dd>
        <i class="food"></i>
        美食
        <span class="arrow"></span>
      </dd>
      <dd>
        <i class="takeout"></i>
        外卖
        <span class="arrow"></span>
      </dd>
      <dd>
        <i class="hotel"></i>
        酒店
        <span class="arrow"></span>
      </dd>
      <dd>榛果民宿</dd>
      <dd>猫眼电影</dd>
      <dd>机票/火车票</dd>
      <dd>休闲娱乐/KTV</dd>
      <dd>生活服务</dd>
      <dd>丽人/美发/医学美容</dd> -->
    </dl>
    <div v-if="currentDetail" class="detail" @mouseenter="detailEnter()" @mouseleave="detailLeave()">
      <template v-for="(item, index) in currentDetail.items">
        <h4 :key="index">{{item.title}}</h4>
        <span v-for="(v, i) in item.items" :key="v + '_' + i">{{v}}</span>
        <!-- <h4>美食</h4>
        <span>代金券</span>
        <span>甜点美食</span>
        <span>火锅自助</span>
        <span>小吃快餐</span>
        <span>日韩料理</span>
        <span>西餐</span>
        <span>聚餐宴请</span>
        <span>烧烤烤肉</span>
        <span>东北菜</span>
        <span>浙江菜</span> -->
      </template>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  data () {
    return {
      currentDetail: null,
      menuList: [{
        title: '美食',
        icon: 'food',
        children: [{
          title: '美食',
          children: ['代金券','甜点饮品','火锅自助餐','小吃快餐','日韩料理','西餐','聚餐宴请','烧烤烤肉']
        }]
      },
      {
        title: '外卖',
        icon: 'takeout',
        children: [{
          title: '外卖',
          children: ['外卖','甜点饮品','火锅自助餐','小吃快餐','日韩料理','西餐','聚餐宴请','烧烤烤肉']
        }]
      },
      {
        title: '酒店',
        icon: 'hotel',
        children: [{
          title: '酒店',
          children: ['酒店','甜点饮品','火锅自助餐','小吃快餐','日韩料理','西餐','聚餐宴请','烧烤烤肉']
        }]
      }]
    }
  },
  created() {
    api.getNavList().then(res => {
      // console.log(res)
      this.menuList = res.data.data
    })
  },
  methods: {
    menuEnter (item) {
      this.currentDetail = item
    },
    menuLeave () {
      this.timer = setTimeout(() => {
        this.currentDetail = null
      }, 200);
    },
    detailEnter () {
      clearTimeout(this.timer)
    },
    detailLeave () {
      this.currentDetail = null
    }
  }
}
</script>

<style lang='scss'>
  @import '@/assets/css/index/index.scss';
</style>

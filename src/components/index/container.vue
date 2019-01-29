<template>
  <div class="m-istyle">
    <dl @mouseover="over($event)" :class="navList.class">
      <dt>{{navList.title}}</dt>
      <dd
        v-for="(v, i) in navList.list"
        :key="i"
        :class="{active: kind == v.tab}"
        :data-type="v.tab"
      >{{v.text}}</dd>
      <!-- <dd :class="{active: kind === 'all'}" data-type='all'>全部</dd>
      <dd :class="{active: kind === 'food'}" data-type='food'>约会聚餐</dd>
      <dd :class="{active: kind === 'spa'}" data-type='spa'>丽人SPA</dd>
      <dd :class="{active: kind === 'movie'}" data-type='movie'>电影演出</dd>
      <dd :class="{active: kind === 'travel'}" data-type='travel'>品质出游</dd>-->
    </dl>
    <ul class="ibody">
      <li v-for="(item, index) in resultsData[kind]" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.image" class="image">
          <div class="cbody">
            <div class="title" :title="item.title">{{item.title}}</div>
            <div class="sub-title" :title="item.sub_title">{{item.sub_title}}</div>
            <div class="price-info" v-if="item.rentNum && item.price_info.current_price">
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">¥</span>
                <span class="current-price numfont">{{item.price_info.current_price}}</span>
              </span>
              <span class="old-price">门市价¥{{item.price_info.old_price}}</span>
              <span class="sold bottom-right-info">{{item.address}}</span>
            </div>
            <div class="price-info" v-else-if="!item.rentNum">
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">¥</span>
                <span class="current-price numfont">抢光了</span>
              </span>
            </div>
            <div class="price-info" v-else>
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">¥</span>
                <span class="current-price numfont">{{item.price_info.avg_price}}/{{item.price_info.units}}</span>
              </span>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  data() {
    return {
      kind: "all",
      resultsData: {},
      // list: [
      //   {
      //     image:
      //       "//p0.meituan.net/mogu/1fa9ec4be645b2a0504391b400d6af49129070.png@368w_208h_1e_1c",
      //     title: "清真·燕兰楼西北菜新疆菜（人民广场店）",
      //     sub_title: "超值双人套餐，提供免费WiFi",
      //     price_info: {
      //       current_price: 128,
      //       old_price: 146,
      //       avg_price: null,
      //       units: null

      //     },
      //     rentNum: 0,
      //     address: "人民广场/南京路"
      //   },
      //   {
      //     image:
      //       "//p0.meituan.net/mogu/1fa9ec4be645b2a0504391b400d6af49129070.png@368w_208h_1e_1c",
      //     title: "清真·燕兰楼西北菜新疆菜（人民广场店）",
      //     sub_title: "超值双人套餐，提供免费WiFi",
      //     price_info: {
      //       current_price: null,
      //       old_price: null,
      //       avg_price: 18,
      //       units: '人'
      //     },
      //     rentNum: 10,
      //     address: "人民广场/南京路"
      //   },
      //   {
      //     image:
      //       "//p0.meituan.net/mogu/1fa9ec4be645b2a0504391b400d6af49129070.png@368w_208h_1e_1c",
      //     title: "清真·燕兰楼西北菜新疆菜（人民广场店）",
      //     sub_title: "超值双人套餐，提供免费WiFi",
      //     price_info: {
      //       current_price: 128,
      //       old_price: 146
      //     },
      //     rentNum: 11,
      //     address: "人民广场/南京路"
      //   },
      //   {
      //     image:
      //       "//p0.meituan.net/mogu/1fa9ec4be645b2a0504391b400d6af49129070.png@368w_208h_1e_1c",
      //     title: "清真·燕兰楼西北菜新疆菜（人民广场店）",
      //     sub_title: "超值双人套餐，提供免费WiFi",
      //     price_info: {
      //       current_price: 128,
      //       old_price: 146
      //     },
      //     address: "人民广场/南京路"
      //   }
      // ]
    };
  },
  props: ["navList"],
  created() {
    api.getResultProducts().then(res => {
      // console.log(res)
      this.resultsData = res.data.data

    })
  },
  methods: {
    over($event) {
      let tagName = $event.target.tagName.toLowerCase();
      if (tagName != "dd") {
        return false;
      }
      this.kind = $event.target.dataset.type;
      // 动态获取数据 ajax请求
    }
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/index/artistic.scss";
</style>

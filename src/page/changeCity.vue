<template>
  <div class="page-changeCity">
    <el-row>
      <!-- 省份选择 -->
      <province/>
    </el-row>
    <el-row>
      <!-- 热门城市 -->
      <hot title="热门城市:" :list='hotList'/>
    </el-row>
     <el-row>
      <!-- 最新访问 -->
      <hot title="最近访问:" :list="recentList"/>
    </el-row>
    <el-row>
      <!-- 城市列表 -->
      <category/>
    </el-row>
  </div>
</template>

<script>
import province from '@/components/changeCity/province.vue'
import hot from '@/components/changeCity/hot.vue'
import category from '@/components/changeCity/category.vue'
import api from '@/api/index.js'
export default {
  data () {
    return {
      hotList: ['北京', '上海', '广州', '深圳'],
      recentList: ['西安', '西安', '西安', '西安']
    }
  },
  created() {
    api.getHotCity().then( res => {
      // console.log(res)
      this.hotList = res.data.data.map( item => item.name)
    })
    api.getRecentCity().then( res => {
      // console.log(res)
      this.recentList = res.data.data.map( item => item.name)
    })
  },
  components: {
    province,
    hot,
    category
  }
}
</script>

<style>

</style>

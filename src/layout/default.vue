<template>
  <div class="layout-default">
    <el-container>
      <el-header height=''>
        <index-header/>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer height=''>
        <index-footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import indexHeader from '../components/header/index.vue'
import indexFooter from '../components/footer/index.vue'
export default {
  data () {
    return {
      msg: 'wangtao'
    }
  },
  components: {
    indexHeader,
    indexFooter
  }
}
</script>

<style lang='scss'>
  @import '@/assets/css/public/layout.scss'
</style>

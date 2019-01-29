<template>
  <dir class="categroy">
    <dl class="m-categroy">
      <dt>按拼音首字母选择</dt>
      <dd v-for="(item, index) in list" :key="index">
        <a :href="'#city-' + item">{{item}}</a>
      </dd>
    </dl>
    <dl class="m-categroy-section" v-for="(item, index) in cityGroup" :key="index" :id="'city-' + index ">
      <dt>{{index}}</dt>
      <dd>
        <span v-for="(v, i) in item" :key="i" @click="changeCity(v)">{{v.name}}</span>
      </dd>
    </dl>
  </dir>
</template>

<script>
import api from '@/api/index.js'
export default {
  data() {
    return {
      list: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      cityGroup: []
    };
  },
  created() {
    api.getCityList().then( res => {
      var obj = {}
      res.data.data.forEach((item, index) => {
        if (!obj[item.firstChar.toUpperCase()]) {
          obj[item.firstChar.toUpperCase()] = [item]
        } else {
          obj[item.firstChar.toUpperCase()].push(item)
        }
      })
      // console.log(obj)
      this.cityGroup = obj
    })
  },
  methods: {
    changeCity(item) {
      // console.log(11)
      this.$store.dispatch('setPosition', item)
      this.$router.push({name:'index'})
    }
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/changecity/categroy.scss";
</style>

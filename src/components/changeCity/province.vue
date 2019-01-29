<template>
  <div>
    <span class="name">按省份选择:</span>
    <m-select
      title="省份"
      :val="province"
      :list="provinceList"
      className='province'
      :showWrapperActive="provinceActive"
      @change_active="changeProvinceActive"
      @change='changeProvince'
    />
    <m-select
      title="城市"
      :val="city"
      :list="cityList"
      :disabled='cityDisabled'
      :showWrapperActive="cityActive"
      className="city"
      @change_active="changeCityActive"
      @change='changeCity'
    />
    <span>直接搜索：</span>
    <el-select
      v-model="searchWord"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option v-for="item in searchList" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  </div>
</template>

<script>
import mSelect from "./select.vue";
import api from '@/api/index.js'
export default {
  data() {
    return {
      provinceList: ["山东", "甘肃", "陕西", "黑龙江", "河南", "山西"],
      cityList: ["西安", "洛南", "商洛", "宝鸡", "安康"],
      province: "省份",
      city: "城市",
      cityActive: false,
      provinceActive: false,
      searchList: ["西安", "洛南", "商洛", "宝鸡", "安康"],
      searchWord: "",
      loading: false,
      cityDisabled: true
    };
  },
  created() {
    api.getProvince().then( res => {
      // console.log(res)
      this.provinceList = res.data.data.map( item => {
        item.name = item.provinceName
        return item
      })
      // console.log(this.provinceList)
    })
  },
  components: {
    mSelect
  },
  methods: {
    changeProvinceActive(flag) {
      this.provinceActive = flag;
      if (flag) {
        this.cityActive = false;
      }
    },
    changeCityActive(flag) {
      this.cityActive = flag;
      if (flag) {
        this.provinceActive = false;
      }
    },
    remoteMethod (val) {
      //请求后端接口

      console.log(val)
    },
    changeProvince (province) {
      // console.log(province)
      this.province = province.name
      this.cityList = province.cityInfoList
      this.cityDisabled = false
    },
    changeCity(city) {
      this.city = city.name
      this.$store.dispatch("setPosition", city)
      // 切换城市之后进行跳转
      this.$router.push({name: 'index'})
    }
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/changecity/iselect.scss";
</style>

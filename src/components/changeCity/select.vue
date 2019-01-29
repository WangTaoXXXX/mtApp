<template>
  <div :class="['choose-wrap', disabled ? 'disabled' : '']" @click.stop="showWrapper()" v-document-click='documentClick'>
    <div class="choose">
      <span>{{val}}</span>
      <i class="el-icon-caret-bottom"></i>
      <div :class="{'mt-content': true, 'active': showWrapperActive}">
        <h2>{{title}}</h2>
        <div :class="['wrapper', className]">
          <div class="col" v-for="(item, index) in renderList" :key="index">
            <span :class="{'mt-item': true, 'active': item.name == val}" v-for="(item, index) in renderList[index]" :key="index" @click="changeValue(item)">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // showWrapperActive: false
      img: ''
    }
  },
  props: [
    "list",
    "title",
    "val",
    "showWrapperActive",
    "disabled",
    "className"
  ],
  computed: {
    renderList() {
      let col = Math.ceil(this.list.length / 12)
      let resultList = []
      for (let i = 0; i < col; i ++) {
        let data = this.list.slice(i * 12, i * 12 + 12)
        resultList.push(data)
      }
      return resultList
    }
  },
  methods: {
    showWrapper() {
      // this.showWrapperActive = true

      if (!this.disabled) {
        this.$emit("change_active", true)
      }
    },
    documentClick() {
      // this.showWrapperActive = false
      this.$emit("change_active", false)
    },
    changeValue(item) {
      this.$emit('change', item)
    }
  }
}
</script>

<style lang='scss'>
  @import '@/assets/css/changecity/select.scss';
</style>
